const express = require('express');
const router = express.Router();
const axios = require('axios');

const { API_key } = require('../../private/YouTubeAPIKey');

router.post('/', (req, res, next) => {
  const channelName = req.body.channelName;
  channelName = encodeURI(channelName);
  console.log(channelName)
  return 0
});

module.exports = router