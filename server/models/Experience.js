import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    startYear: { type: Number, required: true },
    endYear: { type: Number },
    ongoing: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    link: { type: String, default: "" },
    linkLabel: { type: String, default: "" },
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
