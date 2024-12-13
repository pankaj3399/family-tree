import mongoose, { ConnectOptions } from "mongoose";

class Database {
  private static instance: Database;
  private uri: string;
  private options: ConnectOptions;
  private isConnected = false;

  private constructor() {
    this.uri = process.env.MONGODB_URI!;
    this.options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    if (this.isConnected) {
      console.log("Using existing database connection");
      return;
    }

    try {
      await mongoose.connect(this.uri, this.options);
      this.isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      this.isConnected = false;
      console.error("Database connection failed:", error);
      throw error;
    }
  }

  async disconnect() {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("Database disconnected successfully");
    } catch (error) {
      console.error("Database disconnection failed:", error);
      throw error;
    }
  }
}

export const db = Database.getInstance();