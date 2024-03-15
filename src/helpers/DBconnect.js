import mongoose from 'mongoose';

let isConnected = false;

export const DBconnect = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Database is already connected!');
    return;
  }

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/nextauth');
    isConnected = true;
    console.log('Database connected.');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
