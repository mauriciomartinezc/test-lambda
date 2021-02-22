const Validator = require('validatorjs');
Validator.useLang('es');
//
const {validateExistResource} = require('./helpers/validates/User/validateExistResource');
const messageValidate = require('./traits/messageValidate');


const rules = {
    id: "required|integer",
};

exports.validate = async (body) => {
    let errors = null;
    const validation = new Validator(body, rules);
    const validateResource = await validateExistResource(body.id);
    if (validation.fails()) {
        const errorsValidate = validation.errors.errors;
        if (errorsValidate.hasOwnProperty('id') && !validateResource) {
            errorsValidate.id.push(messageValidate("resource-not-found"));
        }
        if (!errorsValidate.hasOwnProperty('id') && !validateResource) {
            errorsValidate["id"] = [messageValidate("resource-not-found")];
        }
        errors = errorsValidate;
    } else {
        let customErrors = {};
        if (!validateResource) {
            customErrors["id"] = [messageValidate("resource-not-found")];
        }
        if (JSON.stringify(customErrors) !== JSON.stringify({})) {
            errors = customErrors;
        }
    }
    return errors;
};