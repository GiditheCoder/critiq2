CREATE TABLE "artiste_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"genre" text NOT NULL,
	"band" text NOT NULL,
	"bio" text NOT NULL,
	"age" integer NOT NULL,
	"nationality" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "song_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"name" text NOT NULL,
	"genre" text NOT NULL,
	"nationality" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"age" integer NOT NULL,
	"nationality" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"song_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"song_id" integer NOT NULL,
	"vote_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "user_votes" ADD CONSTRAINT "user_votes_song_id_song_details_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."song_details"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_song_id_song_details_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."song_details"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_song_unique" ON "user_votes" USING btree ("user_id","song_id");--> statement-breakpoint
CREATE UNIQUE INDEX "votes_song_id_unique" ON "votes" USING btree ("song_id");