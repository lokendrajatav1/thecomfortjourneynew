import nodemailer from "nodemailer";

export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
};

// Simulate sending OTP (Replace with real SMS service like Twilio or Fast2SMS)
export const sendOTP = async (phone, otp) => {
    console.log(`📲 Sending OTP ${otp} to phone ${phone}`);
};




export const sendOTPEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE || "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"The Comfort Journey" <${process.env.MAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: sans-serif; font-size: 16px;">
          <p>Hello,</p>
          <p>Your OTP is:</p>
          <h2 style="color: #1e40af;">${otp}</h2>
          <p>This code is valid for 5 minutes.</p>
          <br />
          <p>Thank you,<br/>The Comfort Journey Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent to ${to}`);
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    throw new Error("Could not send OTP email.");
  }
};