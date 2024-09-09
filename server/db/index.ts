import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { users } from "../model/user";
import { DATABASE_URL } from "../config/env";
import { flights } from "../model/flight";
import { bookings } from "../model/booking";
import { payments } from "../model/payments";

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const db = drizzle(pool, {
  schema: {
    users,
    flights,
    bookings,
    payments,
  },
});

export { db };

//npx drizzle-kit push  : push db changes to db
//npx drizzle-kit generate : generate db schema
//npx drizzle-kit migrate : migrate db schema
//npx drizzle-kit studio : open db studio
