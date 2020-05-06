let users = {}
let pendingUsers = {}

function getUser(id, onSuccess, onError) {
    if (users[id] !== undefined)
    {
        onSuccess(users[id])
    }

    if (pendingUsers[id] === undefined)
    {
        pendingUsers[id] = [];
    }

    pendingUsers[id].push({onSuccess, onError})

    fetch("/api/query-user.php?userId=" + id)
    .then(function (response) { return response.json()})
    .then(user =>
        pendingUsers[id].forEach(pending => {
            users[id] = user;

            if (pending.onSuccess)
                pending.onSuccess(user)
        })
    )
    .catch(error =>
        pendingUsers[id].forEach(pending => {
            if (pending.onError)
                pending.onError(error)
        })
    );
}

export { getUser };
