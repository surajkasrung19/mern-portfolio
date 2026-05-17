import mongoose from "mongoose";
import { defaultExperiences } from "../data/defaultExperiences.js";
import { defaultProjects } from "../data/defaultProjects.js";
import { defaultSkills } from "../data/defaultSkills.js";
import ContactMessage from "../models/ContactMessage.js";
import Experience from "../models/Experience.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";

let mongoReady = false;
let mongoError = "";

export const isMongoReady = () => mongoReady;
export const getMongoStatus = () => ({
  mongoReady,
  mongoError,
});

export const connectMongo = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Admin CRUD will be unavailable.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    mongoReady = true;

    await ContactMessage.createCollection();

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(defaultProjects);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(defaultSkills);
    }

    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      await Experience.insertMany(defaultExperiences);
    }

    mongoError = "";
    console.log("MongoDB connected.");
  } catch (error) {
    mongoReady = false;
    mongoError = error.message;
    console.error("MongoDB connection failed:", mongoError);
  }
};
