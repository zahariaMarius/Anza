module.exports = {

  serverConf: {
    port: '3000'
  },

  mongodbConf: {
    username: '',
    password: '',
    address: '127.0.0.1',
    port: '27017'
  },

  jwtSecret: 'Anza-Backend-Secret',

  regexp: {
    nameSurname: new RegExp(/^[A-Za-z\s]+$/),
    pwd: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&._])[A-Za-z\d@$!%?&._]{8,}$/)
  }

};
