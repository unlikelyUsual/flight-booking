DO $$ BEGIN
 CREATE TYPE "public"."booking_status" AS ENUM('admin', 'user', 'cancelled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"status" "booking_status" DEFAULT 'admin' NOT NULL,
	"flight" uuid NOT NULL,
	"user" uuid NOT NULL,
	"payment" uuid,
	"seats" integer,
	"arrival" timestamp NOT NULL,
	CONSTRAINT "bookings_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flights" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"airline" varchar(30) NOT NULL,
	"origin" varchar(30) NOT NULL,
	"departure" timestamp NOT NULL,
	"arrival" timestamp NOT NULL,
	"price" numeric(100),
	"available_seats" integer,
	CONSTRAINT "flights_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user" uuid NOT NULL,
	"type" varchar,
	"gateway" varchar,
	"paymentInfo" numeric,
	"amount" numeric NOT NULL,
	"country" varchar NOT NULL,
	"timestamp" timestamp NOT NULL,
	CONSTRAINT "payments_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" role[] DEFAULT '{"user"}' NOT NULL,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_flight_flights_id_fk" FOREIGN KEY ("flight") REFERENCES "public"."flights"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_payment_payments_id_fk" FOREIGN KEY ("payment") REFERENCES "public"."payments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email");