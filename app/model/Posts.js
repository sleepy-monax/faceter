import { getSessionId } from "/app/model/Session.js";

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
            } else {
                onFailure(uploadPost.message)
            }

            return uploadPost;
        })
}
