import mongoose, { mongo } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a unique username.'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a unique email.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a strong password.'],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
