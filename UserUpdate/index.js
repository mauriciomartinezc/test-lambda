const {validate} = require('./validate');
const {setDataUpdateUser} = require('./helpers/User/setDataUpdateUser');
const {apiResponse} = require('./traits/apiResponse');

exports.handler = async (event) => {
    try {
        const body = event;
        const validateReq = await validate(body);
        if (validateReq) {
            return apiResponse(validateReq, 422);
        }
        const user = await setDataUpdateUser(body);
        return apiResponse(user, 200);
    } catch (e) {
        return apiResponse(e, 500);
    }
};