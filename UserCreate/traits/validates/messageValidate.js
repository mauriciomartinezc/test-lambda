/**
 *
 * @param field
 * @returns {string|null}
 */
const messages = (field = null) => {
    switch (field) {
        case "email-exist":
            return "El correo electrónico ya está en uso";
        case "resource-not-found":
            return "El recurso solicitado no existe";
        default:
            return null;
    }
}

module.exports = messages;