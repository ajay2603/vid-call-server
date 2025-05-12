import dotenv from "dotenv";
dotenv.config();

import { createRequire } from "module";
import admin from "firebase-admin";

const require = createRequire(import.meta.url); // For using `require` in ES module
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS); // Uses path from .env

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log("Firebase Admin SDK initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error);
  throw error;
}

export default admin;
