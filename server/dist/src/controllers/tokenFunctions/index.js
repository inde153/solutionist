"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { sign, verify, Secret } = require('jsonwebtoken');
const jwtToken = {
    accessToken: (data) => {
        return sign(data, process.env.ACCESS_SECRET, { expiresIn: '10m' });
    },
    refreshToken: (data) => {
        return sign(data, process.env.REFRESH_SECRET, { expiresIn: '1d' });
    },
    isAuthorized: (data) => {
        const authorization = data;
        if (!authorization) {
            return null;
        }
        const token = authorization.split(' ')[1];
        try {
            return verify(token, process.env.ACCESS_SECRET);
        }
        catch (err) {
            // return null if invalid token
            return null;
        }
    },
};
exports.default = jwtToken;
//# sourceMappingURL=index.js.map