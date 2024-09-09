import { faker } from "@faker-js/faker";
import { db } from ".";
import { flights } from "../model/flight";
import { users } from "../model/user";

const dep = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "San Francisco",
  "London",
  "Paris",
  "Tokyo",
  "Mumbai",
  "Sydney",
];
const arr = [
  "Toronto",
  "Berlin",
  "Madrid",
  "Shanghai",
  "São Paulo",
  "Dubai",
  "Mexico City",
  "Singapore",
  "Bangkok",
  "Istanbul",
];

const startDate = new Date("2024-09-01");
const endDate = new Date("2024-09-30");

const fromDate = faker.date.between({ from: startDate, to: endDate });
const toDate = faker.date.between({ from: fromDate, to: endDate });

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
      origin: faker.helpers.arrayElement(dep),
      destination: faker.helpers.arrayElement(arr),
      departure: fromDate,
      arrival: toDate,
      price: faker.commerce.price(),
      availableSeats: faker.number.int({ min: 50, max: 200 }),
    });
  }

  console.log("Seeding completed.");
}

seedDatabase().catch(console.error);
