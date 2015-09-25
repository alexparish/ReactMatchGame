var MatchGameActions = require('../actions/MatchGameActions');

module.exports = {

  getProfiles: function() {

    //var url = 'https://secure.tastebuds.fm/mobile/v1/get_random_profile?num_profiles=10';
    var url = 'profiles.json';

    getJSON(url, function(data) {
        MatchGameActions.receiveProfiles(data.data);
    });

  }

};



function getJSON(url, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          var data = JSON.parse(this.responseText);
          callback(data);
        } else {
          // Error :(
        }
      }
    };

    request.send();
    request = null;
}
