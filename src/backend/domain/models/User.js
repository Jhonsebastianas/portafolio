import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  name: { type: String, require: false, trim: true, },
  phone: { type: String, require: false, trim: true, },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);