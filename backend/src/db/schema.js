import {pgTable, serial, text, timestamp, integer , uniqueIndex } from 'drizzle-orm/pg-core';

export const songDetailsTable = pgTable("song_details", 
  {
   id: serial("id").primaryKey(),
   title: text("title").notNull(),
   name: text("name").notNull(),
  genre : text("genre").notNull(),
   nationality: text("nationality").notNull(),
   createdAt: timestamp("created_at").defaultNow(),
  })


export const votesTable = pgTable("votes", {
  id: serial("id").primaryKey(),
  songId: integer("song_id")
    .notNull()
    .references(() => songDetailsTable.id, { onDelete: "cascade" }),
  voteCount: integer("vote_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  songIdUnique: uniqueIndex("votes_song_id_unique").on(t.songId),
}));



export const userVotesTable = pgTable("user_votes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  songId: integer("song_id")
    .notNull()
    .references(() => songDetailsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
  userSongUnique: uniqueIndex("user_song_unique").on(t.userId, t.songId),
}));


export const userDetailsTable = pgTable("user_details", 
  {
   id: serial("id").primaryKey(),
   fullname: text("full_name").notNull(),
   age: integer("age").notNull(),
   nationality: text("nationality").notNull(),
   createdAt: timestamp("created_at").defaultNow(),
  })


  export const artisteDetailsTable = pgTable("artiste_details", 
  {
   id: serial("id").primaryKey(),
   fullname: text("full_name").notNull(),
   genre : text("genre").notNull(),
    band: text("band").notNull(),
  bio: text("bio").notNull(),
   age: integer("age").notNull(),
   nationality: text("nationality").notNull(),
   createdAt: timestamp("created_at").defaultNow(),
  })


