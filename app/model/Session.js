let idSession = -1;

function setSessionId(id) {
    idSession = id;
}

function getSessionId() {
    return idSession;
}

export { setSessionId, getSessionId}