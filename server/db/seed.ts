import { faker } from "@faker-js/faker";
import { db } from ".";
import { users } from "../model/user";
import { flights } from "../model/flight";

async function seedDatabase() {
  // Seed Users
  for (let i = 0; i < 10; i++) {
    await db.insert(users).values({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }

  console.log("Finished seeding users");

  // Seed Flights
  for (let i = 0; i < 10; i++) {
    //@ts-ignore
    await db.insert(flights).values({
      airline: faker.company.name(),
      origin: faker.address.city(),
      destination: faker.address.city(),
      departure: faker.date.future(),
      arrival: faker.date.future(),
      price: faker.commerce.price(),
      availableSeats: faker.number.int({ min: 50, max: 200 }),
    });
  }

  console.log("Seeding completed.");
}

seedDatabase().catch(console.error);
