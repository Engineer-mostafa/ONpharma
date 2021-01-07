"use strict";
var read = require('fs').readFileSync;
var clientSource = read(__dirname + '/lib/flash-client.js', 'utf-8');

module.exports = function() {
	return function(req, res, next) {
		if (req.path == "/flash/flash-client.js") {
			res.setHeader('Content-Type', 'application/javascript');
			res.writeHead(200);
			res.end(clientSource);
		}else{
			res.flash = push;
			next();
		}
	}
}

var defaultOption = {
	position: "tr",
	duration: 1000 //in mili sec.
}

function push(text, type, option) {
	var value = {}
	var type = type || "success";
	var opts = option || defaultOption;
	if (typeof type == "object") {
		opts = type;
		type = "success";
	}
	value.msg = text;
	value.type = (type == "") ? "success" : type;
	value.option = extend(defaultOption, opts);
	var random = Math.random().toString(32).slice(2, 6);
	this.cookie("flash-" + random, JSON.stringify(value));
	//console.log(defaultOption)
	return this;
}

function extend(target, obj) {
	var object = {};
	for (var i in target) {
		if (target.hasOwnProperty(i)) {
			object[i] = target[i];
		}
	}
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			object[i] = obj[i];
		}
	}
	return object;
}
