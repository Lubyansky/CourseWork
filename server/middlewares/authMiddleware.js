const ApiError = require('../exceptions/apiError');
const tokenService = require('../service/tokenService');

module.exports = async function (req, res, next) {
    try {
        const token = req.headers.cookie.split('=')[1]
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateToken(token);
        const tokenFromDb = await tokenService.findToken(token);
        if (!userData || !tokenFromDb) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } 
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
