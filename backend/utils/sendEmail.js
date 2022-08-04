const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
const OAUTH2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauthClient = new OAUTH2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET_KEY,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauthClient.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });
  const accessToken = await oauthClient.getAccessToken();
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAUTH2",
      user: process.env.SMPT_MAIL,
      accessToken,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
      clientId: process.env.GOOGLE_CLIENT_ID,
    },
  });
  return transporter;
};
const sendEmail = async (options) => {
  let emailTransporter = await createTransporter();
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await emailTransporter.sendMail(mailOptions);
};
module.exports = sendEmail;
