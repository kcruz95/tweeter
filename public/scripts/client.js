/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const renderTweets = tweets => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for(let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('.tweets').prepend($tweet);
  }};
  
  const createTweetElement = tweet => {
    
    const $tweet = $(`<article class="tweet">
    <header id="posted-tweets-header">
    <div class="tweet-prof">
    <img id="tweet-userProf" src="${tweet.user.avatars}" alt="user-avatar">
    <span id="tweet-user">${tweet.user.name}</span>
    </div>
    <span id="tweet-handle">${tweet.user.handle}
    </span>
    </header>
    <div class="content">
    <p class="tweet-content">
    ${tweet.content.text}
    </p>
    </div>
    <footer id="tweet-footer">
    <span>
    <p id="tweet-date">${timeago.format(tweet.created_at)}</p> 
    </span>
    <span id="tweet-icons">
    <i class="fas fa-flag fa-xs"></i>
    <i class="fas fa-retweet fa-xs"></i>
    <i class="fas fa-heart fa-xs"></i>
    </span>
    </footer>
    </article>`);
    return $tweet;
  }

  $(document).ready(function() {
    // renderTweets(`${}`);

    $('#error-null').hide();
    $('#error-over').hide();
  // Load tweets to the body using AJAX to POST data

  // submit a new tweet
  $('form').submit(function(event) {
    console.log('event', event);
    // stops HTML from running a POST request and reloading the whole page
    event.preventDefault();

  // keep text to <=140
    if ($('textarea').val().length === 0) {
      $('#error-over').hide();
      return $('#error-null').slideDown(500);
    }
    if ($('textarea').val().length > 140) {
      $('#error-null').hide();
      return $('#error-over').slideDown(500);
    }

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $('form').serialize()
    }).then(loadtweets);
  })
  const loadtweets = function() {
    $.ajax("/tweets", { method: "GET" })
    .then(renderTweets);
  };
  loadtweets()
});

$('.fa-angle-double-down').on('click', () => {
  $('.new-tweet').slideToggle('slow');
});