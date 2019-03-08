const nodeMailer = require('nodemailer');

module.exports = {

  transporter: nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'anzawetback@gmail.com', // generated ethereal user
      pass: 'Anza2019' // generated ethereal password
    }
  }),

  mailOptions: (user) => {
    return {
      from: 'AnzaFuckCoco', // sender address
      to: user.email, // list of receivers
      subject: "Hello to Anza! Please confirm email address", // Subject line
      text: "Confirm email address at this link mommafucka: " + "localhost:3000/user/active/" + user.temporarytoken, // plain text body
      html: "Confirm email address at this link: " + "<b> localhost:3000/user/active/" + user.temporarytoken + "</b>" // html body
    }
  }

};
