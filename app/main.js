var React = require('react');

var MatchGame = require('./components/MatchGame.react');
var ProfileAPI = require('./utils/ProfileAPI');

ProfileAPI.getProfiles();

React.render(
  <MatchGame />,
  document.getElementById('matchgame')
);
