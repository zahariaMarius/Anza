const axios = require('axios');

module.exports = async (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'].split(' ')[1];

    const axiosRes = await axios({
      baseURL: 'http://localhost:3001/',
      url: '/auth',
      method: 'get',
      headers: {'Authorization': `Bearer ${accessToken}`},
      responseType: 'application/json',
      proxy: {
        host: '127.0.0.1',
        port: 3001
      }
    });

    next();

  } catch (e) {
    res.status(e.response.status).json({error: e.response.data});
  }

};
