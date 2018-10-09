'use strict';

var ipRegex = require('ip-regex');

var tlds = require('tlds');

module.exports = function (opts) {
  opts = Object.assign({
    strict: true
  }, opts);
  var protocol = "(?:(?:[a-z]+:)?//)".concat(opts.strict ? '' : '?');
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ip = ipRegex.v4().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.".concat(opts.strict ? "(?:[a-z\\u00a1-\\uffff]{2,})" : "(?:".concat(tlds.sort(function (a, b) {
    return b.length - a.length;
  }).join('|'), ")"), ")\\.?");
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:".concat(protocol, "|www\\.)").concat(auth, "(?:localhost|").concat(ip, "|").concat(host).concat(domain).concat(tld, ")").concat(port).concat(path);
  return opts.exact ? new RegExp("(?:^".concat(regex, "$)"), 'i') : new RegExp(regex, 'ig');
};
