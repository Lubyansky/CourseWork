const ApiError = require('../exceptions/apiError');

module.exports = async function (req, res, next) {
    try {
        if(req.user.is_banned){
            return next(ApiError.ForbiddenRequest('Доступ заблокирован'));
        }
        next();
    } 
    catch (e) {
        return next(e);
    }
};