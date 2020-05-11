import Cookies from '/lib/js-cookie.js'

let idSession = undefined;

function setSessionId(id) {
    idSession = id;
    Cookies.set('sessionId', id)
}

function getSessionId() {
    if (idSession == undefined) {
        idSession = Cookies.get('sessionId');

        if (idSession == undefined) {
            idSession = -1;
        }
    }

    return idSession;
}

function login(username, password, onSuccess, onFailure) {
    console.log(`Login with: ${username}`)

    fetch(`/api/query-login.php?username=${username}&password=${password}`)
        .then(function (response) {
            return response.json()
        })
        .then(login => {
            if (login.success) {
                console.log('Login succeeded!')
                setSessionId(login.userId);
                onSuccess();
            }
            else {
                console.log(`Login Failed: ${login.message}!`)
                onFailure(login.message)
            }
        })
}

export { getSessionId, login, setSessionId }