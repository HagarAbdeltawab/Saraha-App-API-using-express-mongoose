import nodemailer from "nodemailer";  
export const resetEmail = (email, resetToken)=>{ 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hagarabdeltawab9@gmail.com",
            pass: "fmmdvstwunadazoi",
        }
    }); 
    const info = transporter.sendMail({
        from: 'Sarahah App',
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, click on the following link: http://localhost:3000/resetPassword/${resetToken}`
    })
    console.log("Message sent: %s", info.messageId);
}