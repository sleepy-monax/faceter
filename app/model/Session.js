import Cookies from '/lib/js-cookie.js'
import { route } from '/lib/preact-router.js'

let sessionId = undefined;
let sessionToken = undefined;

function setSessionId(id) {
    sessionId = id;
    if (id == undefined || id == -1) {
        Cookies.remove('sessionId')
    } else {
        Cookies.set('sessionId', id)
    }
}

export function getSessionId() {
    if (sessionId == undefined) {
        sessionId = Cookies.get('sessionId');

        if (sessionId == undefined) {
            sessionId = -1;
        }
    }

    return sessionId;
}

function setSessionToken(token) {
    sessionToken = token;
    if (token == undefined || token == -1) {
        Cookies.remove('sessionToken')
    } else {
        Cookies.set('sessionToken', token)
    }
}

export function getSessionToken() {
    if (sessionToken == undefined) {
        sessionToken = Cookies.get('sessionToken');

        if (sessionToken == undefined) {
            sessionToken = undefined;
        }
    }

    return sessionToken;
}

export function isLoggedIn() {
    return sessionId != undefined && sessionId != -1;
}

export function login(username, password, onSuccess, onFailure) {
    fetch(`/api/query-login.php?username=${username}&password=${password}`)
        .then(function (response) {
            return response.json()
        })
        .then(login => {
            if (login.success) {
                setSessionId(login.userId);
                setSessionToken(login.token);
                onSuccess();
            }
            else {
                onFailure(login.message)
            }
        })
}

export function logoff() {
    if (isLoggedIn()) {
        setSessionId(undefined);
        setSessionToken(undefined);
        route('/');
    }
}
