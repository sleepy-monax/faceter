export function makeRef() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getRandomUsername() {
    var nme = ["bounderby", "honeythunder", "rosa", "barbara", "sharp", "berry", "pott", "squod", "fladdock", "barley", "limpkins", "norris", "tiny", "dombey", "arabella", "turveydrop", "lambert", "filer", "morris", "present", "chopkins", "leeford", "strong", "major", "bobster", "cleaver", "borum", "pugstyles", "may", "edmund", "aunt", "children", "jenkins", "chicken", "tobias", "dot", "fanny", "marion", "scadder", "whimple", "biddy", "trabb", "pip", "fagin", "johnson", "simon", "phib", "horatio", "bradley", "miss", "simmonds", "young", "avenger", "drood", "priscilla", "wegg", "tupman", "flintwinch", "copperfield", "alfred"]
    var adj = ["Amazing", "Awesome", "Blithesome", "Excellent", "Fabulous", "Fantastic", "Favorable", "Fortuitous", "Great", "Incredible", "Ineffable", "Mirthful", "Outstanding", "Perfect", "Propitious", "Remarkable", "Smart", "Spectacular", "Splendid", "Stellar", "Stupendous", "Super", "Ultimate", "Unbelievable", "Wondrous"];

    const ran_a = Math.floor(Math.random() * nme.length)
    const ran_b = Math.floor(Math.random() * adj.length)
    const ran_suffix = Math.floor(Math.random() * 100)
    return `${adj[ran_b]}${nme[ran_a]}${ran_suffix}`
}

export function ajaxRequest(endpoint, args, onSuccess, onFailure) {
    let endpointURL = `/api/${endpoint}.php`;
    let argsURL = Object.entries(args).map((([key, value]) => key + "=" + encodeURIComponent(value)));

    let requestURL = `${endpointURL}?${argsURL.join('&')}`
    console.log(requestURL)

    fetch(requestURL)
        .then(function (response) { return response.json() })
        .then(data => onSuccess(data))
        .catch(() => onFailure())
}
