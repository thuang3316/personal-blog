#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(20),
  content TEXT,
  type VARCHAR(10),
  publish_date DATE
);

INSERT INTO blogs (title, content, type, publish_date) 
VALUES
  ('A Day in My Life', 'Hello world!', 'life', 'Jan 15, 2025'),
  ('Tech Review', 'Hello world!', 'tech', 'Feb 1, 2026'),
  ('Pasta Recipe', 'Hello world!', 'life', 'Feb 8, 2026');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
