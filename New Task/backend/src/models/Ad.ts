import mongoose, { Schema, Document } from 'mongoose';

interface IAd extends Document {
  adTitle: string;
  description: string;
  price: number;
  images: string[];
  state: string;
  city: string;
  neighbourhood: string;
  name: string;
  profilePic: string;
  phoneNumber: string;
}

const AdSchema: Schema = new Schema({
  adTitle: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String], required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  neighbourhood: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String, required: false },
  phoneNumber: { type: String, required: true },
});

export default mongoose.model<IAd>('Ad', AdSchema);
