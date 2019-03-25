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

  activateEmailOptions: (user) => {
    return {
      from: 'Anza Account', // sender address
      to: user.email, // list of receivers
      subject: "Hello to Anza! Please confirm email address", // Subject line
      text: "Hi" + user.surname + ", thank you for registering at Anza. Please click on the following link to complete your activation: " + "localhost:3000/user/activate/" + user.activationtoken, // plain text body
      html: "Hello <strong>" + user.surname + ",</strong> <br> " +
        "thank you for registering at Anza. Please click on the following link to complete your activation:" +
        "<a href='http://localhost:3000/user/activate/" + user.activationtoken + "'> localhost:3000/activate </a>"
    }
  },

  activateEmailSuccessOptions: (user) => {
    return {
      from: 'Anza Account', // sender address
      to: user.email, // list of receivers
      subject: "Anza Email Account Confirmation", // Subject line
      text: "Hi" + user.surname + " your account was successfully activated!", // plain text body
      html: "Hello <strong>" + user.surname + ",</strong> <br> " + " You've received this email because your Account was successfully activated!"
    }
  }
};
