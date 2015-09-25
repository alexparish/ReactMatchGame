var AppDispatcher = require('../dispatcher/AppDispatcher');
var MatchGameConstants = require('../constants/MatchGameConstants');

// Define action methods
var MatchGameActions = {

    // Receive inital profile data
    receiveProfiles: function(data) {
        AppDispatcher.dispatch({
            actionType: MatchGameConstants.RECEIVE_DATA,
            profiles: data
        });
    },

    likeProfile: function(userID) {
        AppDispatcher.dispatch({
            actionType: MatchGameConstants.LIKE_PROFILE,
            userID: userID
        });
        //var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        //ChatWebAPIUtils.createMessage(message);
    },

    skipProfile: function(userID) {
        AppDispatcher.dispatch({
            actionType: MatchGameConstants.SKIP_PROFILE,
            userID: userID
        });
        //var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
        //ChatWebAPIUtils.createMessage(message);
    }
};

module.exports = MatchGameActions;
