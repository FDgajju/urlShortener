import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'userId is mandatory filled'],
    },

    urlCode: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Enter a Short code',
      trim: true,
    },

    longUrl: {
      type: String,
      required: true,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('urlShorten', urlSchema);
