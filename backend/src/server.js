import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { votesTable, userVotesTable , userDetailsTable , artisteDetailsTable , songDetailsTable } from "./db/schema.js";
import { eq, and,  sql } from "drizzle-orm";
import job from "./config/cron.js";
import cors from "cors";
import { Webhook } from "svix";
import { Clerk } from "@clerk/clerk-sdk-node";


const app = express();
const PORT = ENV.PORT || 8001;
export const clerkClient = new Clerk({
  secretKey: ENV.CLERK_SECRET_KEY, // use the new secret key env variable
});
const CLERK_WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET;

// if (ENV.NODE_ENV === "production") job.start();

app.use(cors());

// ⚠️ IMPORTANT: Apply express.json() to all routes EXCEPT the webhook
app.use((req, res, next) => {
  if (req.url === '/api/clerk-webhook') {
    return next(); // Skip JSON parsing for webhook
  }
  express.json()(req, res, next); // Apply JSON parsing for other routes
});

// Add this before your API routes
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend API is running", 
    status: "healthy",
    endpoints: ["/api/health", "/api/votes", "/api/user_votes"]
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


// --- add song details ----

app.post("/api/song_details", async (req, res) => {
  try {
    const { title, name, genre, nationality } = req.body;

    if (!title || !name || !genre || !nationality) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const [insertedSong] = await db
      .insert(songDetailsTable)
      .values({
        title,
        name,
        genre ,
        nationality,
      })
      .returning();

    res.status(201).json({ success: true, data: insertedSong });
  } catch (error) {
    console.error("Error saving song details:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not save song details" });
  }
});



// ✅ Create a GET endpoint to fetch all song details
app.get("/api/song_details", async (req, res) => {
  try {
    // Query all rows from the table
    const songs = await db.select().from(songDetailsTable);

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching song details:", error);
    res.status(500).json({
      success: false,
      message: "Could not fetch song details",
    });
  }
});


// ---------- Clerk Webhook ----------
app.post(
  "/api/clerk-webhook",
  express.raw({ type: "application/json" }), // raw body
  async (req, res) => {
    try {
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      // req.body is a Buffer here
      const payload = req.body; // keep as Buffer

      console.log("📦 Raw payload string:", payload.toString("utf8"));

      const headers = {
        "svix-id": req.header("svix-id"),
        "svix-timestamp": req.header("svix-timestamp"),
        "svix-signature": req.header("svix-signature"),
      };

      console.log("🔑 Svix headers:", headers);

      // Verify webhook
      const evt = wh.verify(payload, headers);
      console.log("🔔 Webhook received:", evt.type);

      if (evt.type === "user.created") {
        const { id, unsafe_metadata } = evt.data;

        const role =
          unsafe_metadata?.chosenRole === "artiste" ? "artiste" : "listener";

        // Small delay to ensure user exists in Clerk backend
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          await clerkClient.users.updateUser(id, {
            publicMetadata: { role },
          });
          console.log(`✅ Assigned role "${role}" to user ${id}`);
        } catch (err) {
          console.error(
            `⚠️ Could not update user ${id}. They may not exist yet:`,
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




// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log("Server is running123 on PORT:", PORT);
});













