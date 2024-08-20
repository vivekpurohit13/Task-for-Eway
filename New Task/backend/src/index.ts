import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import adRoutes from './routes/adRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Dummy', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.log(err));

app.use('/api/ads', adRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
