import { pgTable, serial, text, timestamp, uniqueIndex, integer } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const userVotes = pgTable("user_votes", {
	id: serial().primaryKey().notNull(),
	userId: text("user_id").notNull(),
	songId: text("song_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const votes = pgTable("votes", {
	id: serial().primaryKey().notNull(),
	songId: text("song_id").notNull(),
	voteCount: integer("vote_count").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	uniqueIndex("votes_song_id_unique").using("btree", table.songId.asc().nullsLast().op("text_ops")),
]);

export const userDetails = pgTable("user_details", {
	id: serial().primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	age: integer().notNull(),
	nationality: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const artisteDetails = pgTable("artiste_details", {
	id: serial().primaryKey().notNull(),
	fullName: text("full_name").notNull(),
	age: integer().notNull(),
	nationality: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	genre: text().notNull(),
	band: text().notNull(),
	bio: text().notNull(),
});
