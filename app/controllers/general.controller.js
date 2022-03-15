'use strict';

function successResponse(res, message, data, type) {
    return res.jsonp({
        status: "Success",
        message: message,
        data: data,
    });
}

function errorResponse(res, err, msg, type, statusCode) {
    var message = "";
    if(err && err.message){
        message = err.message;
    } else if(msg){
        message = msg;
    }else{
        message = err.stack ? err.stack.split("\n") : "Error Occured";
    }
    return res.jsonp({
        status: "Error",
        message: message
    });
}

exports.successResponse = successResponse;
exports.errorResponse = errorResponse;