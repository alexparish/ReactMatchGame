
var React = require('react');
var Profile = require('./Profile.react');
var ProfileStore = require('../stores/ProfileStore');
var MatchGameActions = require('../actions/MatchGameActions');

function getStateFromStores() {
  return {
    profiles: ProfileStore.getAll()
  };
}

var MatchGame = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        ProfileStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ProfileStore.removeChangeListener(this._onChange);
    },

    likeProfile: function(userID) {
        MatchGameActions.likeProfile(userID);
    },

    skipProfile: function(userID) {
        MatchGameActions.skipProfile(userID);
    },

    render: function() {

        var profile;

        if (this.state.profiles.length !== 0) {
            var user = this.state.profiles[0].user;

            profile = (
                <Profile
                    key={user.id}
                    user={user}
                    onLikeProfile={this.likeProfile.bind(this, user.id)}
                    onSkipProfile={this.skipProfile.bind(this, user.id)}
                />
            );
        }

        return (
            <div>
                There are {this.state.profiles.length} profiles in the queue
                <br />
                {profile}
            </div>
        );
    },

    /**
     * Event handler for 'change' events coming from the stores
     */
    _onChange: function() {
      this.setState(getStateFromStores());
    }

});

module.exports = MatchGame;
