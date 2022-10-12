const router = require('express').Router();
const needle = require('needle');

const token = process.env.TWITTER_BAREAR_TOKEN;

const endpointURLForUser = "https://api.twitter.com/2/users/by?usernames="
const endpointURLForTweet = "https://api.twitter.com/2/users/:user_id/tweets"

router.get('/user', async (req, res, next) => {
  // console.log('params', req.query);
  const params = {
    usernames: req.query.username, // Edit usernames to look up
    "user.fields": "created_at,description,profile_image_url", // Edit optional query parameters here
    "expansions": "pinned_tweet_id"
  }

  // this is the HTTP header that adds bearer token authentication
  const data = await needle('get', endpointURLForUser, params, {
    headers: {
        "User-Agent": "v2UserLookupJS",
        "authorization": `Bearer ${token}`
    }
  })

  if (data.body) {
    return res.send(data.body);
  } else {
    throw new Error('Unsuccessful request')
  }

});

router.get('/user/tweets', async (req, res, next) => {
  // console.log('params', req.query);
  const params = {
    // user_id: req.query.twitterId, // Edit usernames to look up
    "max_results": 100,
    "tweet.fields": "created_at", // Edit optional query parameters here
    "expansions": "author_id"
  }

  // this is the HTTP header that adds bearer token authentication
  const data = await needle('get', `https://api.twitter.com/2/users/${req.query.twitterId}/tweets`, params, {
    headers: {
        "User-Agent": "v2UserLookupJS",
        "authorization": `Bearer ${token}`
    }
  })

  if (data.body) {
    return res.send(data.body);
  } else {
    throw new Error('Unsuccessful request')
  }

});

module.exports = router;
