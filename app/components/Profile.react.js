var React = require('react');

var Profile = React.createClass({

  render: function() {
    var user = this.props.user;

    return (
      <div>
        <img src={user.picture.medium_url} />
        
        <br />
        <strong>{user.login}</strong>
        <br />

        <button onClick={this.props.onLikeProfile}>Like</button>
        <button onClick={this.props.onSkipProfile}>Skip</button>
      </div>
    );
  },

});

module.exports = Profile;
