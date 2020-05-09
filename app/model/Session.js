let idSession = -1;

function setSessionId(id) {
    idSession = id;
}

function getSessionId() {
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

export { getSessionId, login }