// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import multer from 'multer';
// import bodyParser from 'body-parser';
// import path from 'path';

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/eway', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// // Multer Setup for File Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage });

// // Mongoose Schema and Model
// const adSchema = new mongoose.Schema({
//   adTitle: String,
//   description: String,
//   price: Number,
//   state: String,
//   city: String,
//   neighbourhood: String,
//   name: String,
//   phoneNumber: String,
//   images: [String],
//   profilePic: String,
// });

// const Ad = mongoose.model('Ad', adSchema);

// // Route to Handle Form Submission
// app.post('/api/ads', upload.fields([{ name: 'images', maxCount: 12 }, { name: 'profilePic', maxCount: 1 }]), async (req, res) => {
//   try {
//     const {
//       adTitle, description, price, state, city, neighbourhood, name, phoneNumber,
//     } = req.body;

//     // const images = req.files['images'] ? (req.files['images'] as Express.Multer.File[]).map(file => file.path) : [];
//     // const profilePic = req.files['profilePic'] ? (req.files['profilePic'][0] as Express.Multer.File).path : '';

//     const newAd = new Ad({
//       adTitle,
//       description,
//       price,
//       state,
//       city,
//       neighbourhood,
//       name,
//       phoneNumber,
//     //   images,
//     //   profilePic,
//     });

//     await newAd.save();

//     res.status(200).json({ message: 'Ad posted successfully!' });
//   } catch (error) {
//     console.error('Error posting ad:', error);
//     res.status(500).json({ message: 'Failed to post ad' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
