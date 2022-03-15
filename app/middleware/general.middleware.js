'use strict';

const StandardError = require('standard-error'),
      passport = require('../config/passport');


function standardErrorResponse(res, err, type, statusCode) {
    return res.status(200).send({
        status: "Error",
        message: err
    });

}

function checkAuth(){
    return passport.authenticate('jwt', { session: false })
}


function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateUrl(url) {
    var r = new RegExp('/^(ftp|http|https):\/\/[^ "]+$/');
    return r.test(url);
}




exports.standardErrorResponse = standardErrorResponse;
exports.checkAuth = checkAuth;
exports.validateEmail = validateEmail;
exports.validateUrl = validateUrl;
