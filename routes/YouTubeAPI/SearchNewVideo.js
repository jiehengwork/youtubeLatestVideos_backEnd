const express = require('express');
const router = express.Router();
const axios = require('axios');

const { API_key } = require('../../private/YouTubeAPIKey');

router.post('/', (req, res, next) => {
  try {
    const channelId = req.body.channelId;
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+ channelId +'&maxResults=1&order=date&type=video&key='+ API_key)
      .then(response => {
        const videoId = response.data.items[0].id.videoId;
        const videoTitle = response.data.items[0].snippet.title;
        const videoSmallImg = response.data.items[0].snippet.thumbnails.default.url;
        const videoMediumImg = response.data.items[0].snippet.thumbnails.medium.url;
        const videoBigImg = response.data.items[0].snippet.thumbnails.high.url;
        res.json({ 'videoId': videoId, 'videoTitle': videoTitle, 'videoSmallImg': videoSmallImg, 'videoMediumImg': videoMediumImg, 'videoBigImg': videoBigImg })
      })
      .catch( err => {
        console.log( err )
      })
  } catch (error) {
    next(error);
  }
});

module.exports = router;