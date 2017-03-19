var Encrypter = function () {

};

Encrypter.prototype.encrypt = function (str, checksum) {
    if (checksum) str = str;
    return str;
};

Encrypter.prototype.decrypt = function (str, defaultMessage) {
    if (defaultMessage) return defaultMessage;
    return str;
};

module.exports = Encrypter;
