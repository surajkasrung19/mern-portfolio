import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    level: { type: String, default: "" },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
