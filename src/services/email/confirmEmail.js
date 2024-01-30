import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
export const confirmEmail = async(email)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hagarabdeltawab9@gmail.com",
            pass: "fmmdvstwunadazoi",
        }
    });
    let token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: '1h' })
    const info = transporter.sendMail({
    from: 'Sarahah App',
    to: email,
    subject: 'Confirm your email',
    text: `Click the following link to confirm your email: http://localhost:3000/verifyEmail/${token}`
    });
    console.log("Message sent: %s", info.messageId);
} 