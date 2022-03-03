"use strict";
exports.__esModule = true;
exports.decodeMd5 = exports.decodeBase64 = exports.getServerIp = void 0;
var os_1 = require("os");
var js_base64_1 = require("js-base64");
var crypto_1 = require("crypto");
/**
 * 获取服务端IP
 * @export
 * @return {*}
 */
function getServerIp() {
    var interfaces = (0, os_1.networkInterfaces)();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal) {
                return alias.address;
            }
        }
    }
}
exports.getServerIp = getServerIp;
/**
 * Base64 编码
 * @export
 * @param {string} value
 * @return {*}  {string}
 */
function decodeBase64(value) {
    return value ? js_base64_1.Base64.decode(value) : value;
}
exports.decodeBase64 = decodeBase64;
/**
 * md5 编码
 * @export
 * @param {string} value
 * @return {*}  {string}
 */
function decodeMd5(value) {
    return (0, crypto_1.createHash)('md5').update(value).digest('hex');
}
exports.decodeMd5 = decodeMd5;
