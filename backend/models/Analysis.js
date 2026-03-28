import mongoose from 'mongoose';
const analysisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeName: String,
  result: Object,
}, { timestamps: true });
export default mongoose.model('Analysis', analysisSchema);