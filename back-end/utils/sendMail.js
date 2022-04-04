import nodemailer from 'nodemailer';

async function sendVerifyMail(userMail, code) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const data = {
    from: process.env.EMAIL,
    to: userMail,
    subject: 'email verification',
    text: `this is the link to verify your mail
    use this Verification code: ${code}`,
  };

  transporter.sendMail(data, (err, info) => {
    if (err) return res.status(400).send({ status: false, message: err.message });

    res.status(200).send({
      status: 'Mail send 👍️',
      message: info.response,
    });
  });
}

export default sendVerifyMail;
