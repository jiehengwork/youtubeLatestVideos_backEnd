const express = require('express');
const router = express.Router();
const axios = require('axios');

let { API_key } = require('../../private/YouTubeAPIKey');

router.get('/', (req, res, next) => {
  
  // axios.get('https://www.googleapis.com/youtube/v3/videos?id=jeqH4eMGjhY&key='+ API_key +'&part=snippet')

  const enID = encodeURI("羅傑 Roger")
  axios.get('https://www.googleapis.com/youtube/v3/search?q='+ enID +'&type=channel&maxResults=1&key='+ API_key)
  .then(response => {
      return response.data.items[0].id.channelId;
  })
  .then(ret => {
    // 取得頻道資訊
    // axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + ret + '&key='+ API_key)
    // .then(response => {
    //   console.log(response.data.items[0].snippet.thumbnails.default)
    // })
    // 取得最新影片
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+ ret +'&maxResults=1&order=date&type=video&key='+ API_key)
    .then(response => {
      console.log(response.data.items[0])
    })
  })
  .catch(err => {
    // console.log(err)
    console.log("err")
  })
  
  // res.send("API is working!");
});

module.exports = router;