import { Router } from 'express';
import Ad from '../models/Ad';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + file.originalname.split(".") [1] )
  }
})

const upload = multer({ storage: storage})

// Create a new ad
router.post('/', upload.any(), async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  // return res.send(req.body);
  try {
    let profilePic;
    let images;
    if(
      !req.files
     ) {
      return res.status(400).send({ error: 'No files were uploaded.' });
    }
    if(Array.isArray(req.files)) {
      profilePic = req.files.find(y => y.fieldname === "profilePic")?.filename
      images = req.files.filter(y => y.fieldname === "images").map(y => y.filename )
    }

    const BaseURL = "http://localhost:5000/images/";

    const Data = {
      adTitle: req.body.adTitle,
      description: req.body.description,
      price: req.body.price,
      images: images?.map(a => BaseURL+a),
      state: req.body.state,
      city: req.body.city,
      neighbourhood: req.body.neighbourhood,
      name: req.body.name,
      profilePic: BaseURL+profilePic,
      phoneNumber: req.body.phoneNumber,
    }
    console.log(Data);
    console.log(profilePic);
    const newAd = new Ad(Data);
    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all ads
router.get('/', async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
