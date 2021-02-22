const Validator = require('validatorjs');
Validator.useLang('es');
//
const {validateExistResource} = require('./helpers/validates/User/validateExistResource');
const {validateExistEmail} = require('./helpers/validates/User/validateExistsEmail');
const messageValidate = require('./traits/messageValidate');


const rules = {
    id: "required|integer",
    name: "required|string|min:1|max:255",
    email: "required|email|min:1|max:255",
};

exports.validate = async (body) => {
    let errors = null;
    const validation = new Validator(body, rules);
    const validateResource = await validateExistResource(body.id);
    const validateEmail = await validateExistEmail(body.email, body.id);
    if (validation.fails()) {
        const errorsValidate = validation.errors.errors;
        if (errorsValidate.hasOwnProperty('id') && !validateResource) {
            errorsValidate.id.push(messageValidate("resource-not-found"));
        }
        if (!errorsValidate.hasOwnProperty('id') && !validateResource) {
            errorsValidate["id"] = [messageValidate("resource-not-found")];
        }
        if (errorsValidate.hasOwnProperty('email') && validateEmail) {
            errorsValidate.email.push(messageValidate("email-exist"));
        }
        if (!errorsValidate.hasOwnProperty('email') && validateEmail) {
            errorsValidate["email"] = [messageValidate("email-exist")];
        }
        errors = errorsValidate;
    } else {
        let customErrors = {};
        if (!validateResource) {
            customErrors["id"] = [messageValidate("resource-not-found")];
        }
        if (validateEmail) {
            customErrors["email"] = [messageValidate("email-exist")];
        }
        if (JSON.stringify(customErrors) !== JSON.stringify({})) {
            errors = customErrors;
        }
    }
    return errors;
};