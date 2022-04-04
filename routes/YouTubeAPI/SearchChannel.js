const express = require('express');
const router = express.Router();
const axios = require('axios');

const { API_key } = require('../../private/YouTubeAPIKey');

router.post('/', (req, res, next) => {
  try {
    const channelName = req.body.channelName;
    const enChannelName = encodeURI(channelName);
    // 取得頻道的 YouTube ID
    axios.get('https://www.googleapis.com/youtube/v3/search?q='+ enChannelName +'&type=channel&maxResults=1&key='+ API_key)
    .then( response => {
      const channelId = response.data.items[0].id.channelId;
      // 取得頻道資訊
      axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + channelId + '&key='+ API_key)
      .then( response => {
        const channelTitle = response.data.items[0].snippet.title;
        const channelSmallImg = response.data.items[0].snippet.thumbnails.default.url;
        const channelMediumImg = response.data.items[0].snippet.thumbnails.medium.url;
        const channelBigImg = response.data.items[0].snippet.thumbnails.high.url;
        res.json({ 'channelId': channelId, 'channelTitle': channelTitle, 'channelSmallImg': channelSmallImg, 'channelMediumImg': channelMediumImg, 'channelBigImg': channelBigImg })
      })
      .catch( err => {
        console.log( err )
      })
    })
    .catch( err => {
      console.log( err )
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;