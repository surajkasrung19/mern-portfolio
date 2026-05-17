import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tech: [{ type: String, trim: true }],
    featured: { type: Boolean, default: false },
    live: { type: String, default: "#" },
    github: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
