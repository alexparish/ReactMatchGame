var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var MatchGameConstants = require('../constants/MatchGameConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _profiles = [];


var ProfileStore = assign({}, EventEmitter.prototype, {

    init: function(profiles) {
        _profiles = profiles;
    },

    getAll: function() {
        return _profiles;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {

    switch(action.actionType) {
        case MatchGameConstants.RECEIVE_DATA:
            ProfileStore.init(action.profiles);
            ProfileStore.emitChange();
            break;

        case MatchGameConstants.LIKE_PROFILE:
            alert(action.userID + " liked");
            // remove first element
            _profiles.splice(0,1);
            ProfileStore.emitChange();
            break;

        case MatchGameConstants.SKIP_PROFILE:
            alert(action.userID + " skipped");
            // remove first element
            _profiles.splice(0,1);
            ProfileStore.emitChange();
            break;

        default:
        // no op
    }
});

module.exports = ProfileStore;
