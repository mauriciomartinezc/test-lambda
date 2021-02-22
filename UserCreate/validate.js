const Validator = require('validatorjs');
Validator.useLang('es');
//
const {validateExistEmail} = require('./helpers/validates/User/validateExistsEmail');
const messageValidate = require('./traits/validates/messageValidate');


const rules = {
    name: "required|string|min:1|max:255",
    email: "required|email|min:1|max:255",
};

exports.validate = async (body) => {
    let errors = null;
    const validation = new Validator(body, rules);
    const validateEmail = await validateExistEmail(body.email);
    if (validation.fails()) {
        const errorsValidate = validation.errors.errors;
        if (errorsValidate.hasOwnProperty('email') && validateEmail) {
            errorsValidate.email.push(messageValidate("email-exist"));
        }
        if (!errorsValidate.hasOwnProperty('email') && validateEmail) {
            errorsValidate["email"] = [messageValidate("email-exist")];
        }
        errors = errorsValidate;
    } else {
        let customErrors = {};
        if (validateEmail) {
            customErrors["email"] = [messageValidate("email-exist")];
        }
        if (JSON.stringify(customErrors) !== JSON.stringify({})) {
            errors = customErrors;
        }
    }
    return errors;
};