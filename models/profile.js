const mongoose = require('mongoose');

// User Schema
const ProfileSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  contactNo: {
    type: String
  },
  address: {
    type: String
  }
});

const Profile = module.exports = mongoose.model('Profile', ProfileSchema);

module.exports.getUserProfile = function (param, callback) {
  Profile.findOne({ userid: param.id }, function (err, doc) {
    if (err) throw err;
    callback(null, doc);
  });
}

module.exports.addUserProfile = function (newUserProf, callback) {
  newUserProf.save(callback);
}

module.exports.updateUserProfile = function (param, updateUserProf, callback) {
  Profile.findOne({ userid: param.id }, function (err, prof) {
    if (!err) {
      if (prof) {
        prof.firstName = updateUserProf.firstName;
        prof.lastName = updateUserProf.lastName;
        prof.email = updateUserProf.email;
        prof.contactNo = updateUserProf.contactNo;
        prof.address = updateUserProf.address;
        prof.save(callback);           
      } 
    }
  });
}
