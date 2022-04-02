import mongoose from 'mongoose';

const mailVerify = new mongoose.Schema({
  code: {
    type: String,
  },
});

// export default mongoose.model('verificationCode', mailVerify);
