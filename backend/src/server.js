import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { votesTable, userVotesTable , userDetailsTable , artisteDetailsTable , songDetailsTable } from "./db/schema.js";
import { eq, and,  sql } from "drizzle-orm";
import job from "./config/cron.js";
import cors from "cors";
import { Webhook } from "svix";
import { Clerk } from "@clerk/clerk-sdk-node";
import multer from "multer";
import path from "path";





const app = express();

const PORT = ENV.PORT || 8001;
export const clerkClient = new Clerk({
  secretKey: ENV.CLERK_SECRET_KEY, // use the new secret key env variable
});
const CLERK_WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET;
const router = express.Router();
const upload = multer({ dest: "uploads/" });

if (ENV.NODE_ENV === "production") job.start();

app.use(cors());
app.use("/uploads", express.static("uploads"));



// ⚠️ IMPORTANT: Apply express.json() to all routes EXCEPT the webhook
app.use((req, res, next) => {
  if (req.url === '/api/clerk-webhook') {
    return next(); // Skip JSON parsing for webhook
  }

    // Skip for file uploads (multer handles it)
  if (req.url === '/api/song_details' && req.method === 'POST') {
    return next();
  }


  express.json()(req, res, next); // Apply JSON parsing for other routes
});





// Add this before your API routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend API is running", 
    status: "healthy",
    endpoints: ["/api/health", "/api/votes", "/api/user_votes", "/api/artiste_details", "/api/user_details", "/api/song_details", "/api/check-role"]
  });
});


// ---------- Health Check ----------
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});


// ---------- Add a vote (user + total) ----------
app.post("/api/user_votes", async (req, res) => {
  try {
    const { userId, songId } = req.body;

    // 1) Insert into user_votes
    await db.insert(userVotesTable)
      .values({ userId, songId })
      .onConflictDoNothing({
        target: [userVotesTable.userId, userVotesTable.songId],
      });

    // 2) Increment vote count (or create row)
    await db.insert(votesTable)
      .values({ songId, voteCount: 1 })
      .onConflictDoUpdate({
        target: votesTable.songId,
        set: { voteCount: sql`${votesTable.voteCount} + 1` },
      });

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error adding vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ---------- Remove a user’s vote ----------
app.delete("/api/user_votes", async (req, res) => {
  try {
    const { userId, songId } = req.body;
    if (!userId || !songId) {
      return res.status(400).json({ error: "Missing or invalid userId/songId" });
    }

    // 1️⃣ Delete from user_votes
    const deleted = await db
      .delete(userVotesTable)
      .where(and(eq(userVotesTable.userId, userId), eq(userVotesTable.songId, songId)))
      .returning();

    if (deleted.length === 0) {
      return res.status(404).json({ error: "Vote not found for this user" });
    }

    // 2️⃣ Fetch current total votes
    const [current] = await db
      .select()
      .from(votesTable)
      .where(eq(votesTable.songId, songId));

    if (current) {
      if (current.voteCount > 1) {
        // Decrement the count
        await db
          .update(votesTable)
          .set({ voteCount: sql`${votesTable.voteCount} - 1` })
          .where(eq(votesTable.songId, songId));
      } else {
        // Remove the votes row if this was the last vote
        await db.delete(votesTable).where(eq(votesTable.songId, songId));
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error removing vote:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ---------- Get total votes ----------
app.get("/api/votes", async (_req, res) => {
  try {
    const allVotes = await db.select().from(votesTable);
    res.status(200).json(allVotes);
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ---------- Check if a user has voted ----------
app.get("/api/user_votes", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const votes = await db
      .select()
      .from(userVotesTable)
      .where(eq(userVotesTable.userId, userId));

    res.json(votes);
  } catch (error) {
    console.error("Error fetching user votes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});



// --- add user detials ---

app.post("/api/user_details", async(req, res)=>{
  try {
    const { fullName, age, nationality } = req.body;

    // Insert into DB
    const result = await db
      .insert(userDetailsTable)
      .values({
        fullname: fullName,
        age: parseInt(age, 10),
        nationality,
      })
      .returning(); // optional: returns the inserted row

    res.status(201).json({ success: true, data: result[0] });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Could not save details" });
    
  }
})

// -- add artiste details --
app.post("/api/artiste_details", async (req, res) => {
  try {
    const { fullName, genre, band, bio, age, nationality } = req.body;

    // --- Validate bio length (max 80 words)
    const words = bio?.trim().split(/\s+/) || [];
    if (words.length > 80) {
      return res
        .status(400)
        .json({ success: false, message: "Bio cannot exceed 80 words" });
    }

    // --- Insert into artiste_details
    const result = await db
      .insert(artisteDetailsTable)
      .values({
        fullname: fullName,
        genre,
        band,
        bio,
        age: parseInt(age, 10),
        nationality,
      })
      .returning(); // returns inserted row

    res.status(201).json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Error saving artiste details:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not save artiste details" });
  }
});


// Song details upload endpoint
app.post("/api/song_details", upload.single("image"), async (req, res) => {
  try {
    console.log("=== SONG DETAILS ENDPOINT HIT ===");
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { title, name, genre, nationality } = req.body;
    const file = req.file;

    if (!title || !name || !genre || !nationality) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, name, genre, nationality) are required",
      });
    }

    // Build full image URL if file exists
    const imageUrl = file
      ? `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
      : null;

    // Save song details into DB
    const [insertedSong] = await db
      .insert(songDetailsTable)
      .values({
        title,
        name,
        genre,
        nationality,
        imageUrl,
      })
      .returning();

    console.log("✅ Song saved:", insertedSong);

    res.status(201).json({
      success: true,
      message: "Song details uploaded successfully",
      data: insertedSong,
    });
  } catch (error) {
    console.error("❌ Error saving song details:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/api/song_details", async (req, res) => {
  try {
    const songs = await db.select().from(songDetailsTable);
  console.log("Sending song details to frontend:", songs);

    // Keep imageUrl as-is (already full URL)
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({
      success: false,
      message: "Could not fetch song details",
    });
  }
});



// backend webhook to assign roles 
app.post(
  "/api/clerk-webhook",
  express.raw({ type: "application/json" }), // raw body
  async (req, res) => {
    try {
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      const payload = req.body; // Buffer

      const headers = {
        "svix-id": req.header("svix-id"),
        "svix-timestamp": req.header("svix-timestamp"),
        "svix-signature": req.header("svix-signature"),
      };

      // ✅ Verify Clerk webhook
      const evt = wh.verify(payload, headers);
      console.log("🔔 Webhook received:", evt.type);

      if (evt.type === "user.created") {
        const { id, unsafe_metadata } = evt.data;

        // default role is "listener"
        const role =
          unsafe_metadata?.chosenRole === "artiste" ? "artiste" : "listener";

        // delay ensures Clerk finishes user provisioning
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          // ✅ Update Clerk user metadata
          await clerkClient.users.updateUser(id, {
            publicMetadata: { role },
          });

          console.log(`✅ Assigned role "${role}" to user ${id}`);
        } catch (err) {
          console.error(
            `⚠️ Could not update user ${id}:`,
            err.errors || err.message
          );
        }
      }

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Webhook error:", err);
      res.status(400).json({ error: err.message || "Invalid webhook" });
    }
  }
);


// -- check role
app.post("/api/check-role", async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) {
      return res.status(400).json({ error: "Missing sessionId" });
    }

    const session = await clerkClient.sessions.getSession(sessionId);
    if (!session || !session.userId) {
      return res.status(400).json({ error: "Invalid or expired session" });
    }

    const user = await clerkClient.users.getUser(session.userId);
    const role = user?.publicMetadata?.role || "listener";

    return res.json({ role });
  } catch (err) {
    console.error("❌ Error checking role:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});


// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log("Server is running123 on PORT:", PORT);
});













