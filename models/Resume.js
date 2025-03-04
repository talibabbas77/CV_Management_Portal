import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personal: {
    name: String,
    email: String,
    contact: String,
  },
  education: {
    school: String,
    degree: String,
    graduationYear: String,
  },
  experience: {
    company: String,
    role: String,
    duration: String,
  },
  skills: [String],
});

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
