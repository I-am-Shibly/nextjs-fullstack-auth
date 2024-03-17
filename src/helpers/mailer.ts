import bcrypt from 'bcrypt';
import { User } from '@/models/User';
import nodemailer from 'nodemailer';

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b68037d58cd6ef',
        pass: '26ecf00ccf5697',
      },
    });

    const mailOptions = {
      from: 'shibly@email.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'verify email' : 'reset the password',
      html: `<p>Click <a href='${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}'>here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset password'
      } <br> or copy and paste the link in your browser ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}}/</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error);
  }
}
