import { getSessionId } from "/app/model/Session.js";

let observers = {}

function notify() {
    for (const [observer, callback] of Object.entries(observers)) {
        callback()
    }
}

export function observePosts(object, callback) {
    observers[object] = callback;
}

export function stopObservePosts(object) {
    delete observers[object]
}

export function createTextPost(content, onSuccess, onFailure) {
    content = content.trim()

    if (content == '') {
        return onFailure("Vous ne pouvez pas publier de post vide");
    }

    fetch("/api/query-create-post.php?idUser=" + getSessionId() + "&newPost=" + newPost.value)
        .then(function (response) { return response.json() })
        .then(uploadPost => {
            if (uploadPost.success) {
                onSuccess();
                notify();
            } else {
                onFailure(uploadPost.message)
            }

            return uploadPost;
        })
}
