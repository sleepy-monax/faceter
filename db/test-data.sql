insert into User(userId, userName, userMail, userPassword)
values
    (1, 'Guillaume', 'guillaume.charlier.2017@gmail.com', ''),
    (2, 'Mathieu', 'la187374@student.helha.be', ''),
    (3, 'Nicolas', 'nicolas.vanbossuyt@gmail.com', ''),
    (4, 'Tintin', 'tintinDu94@outlook.com', '');

insert into Post(postId, postAuthor, postType, postContent, postDate)
values
    (1, 4, 'text', 'L''industrialisation au cours du moyen age... c''est bof', '2020-04-29'),
    (2, 2, 'link', 'https://www.google.com/search?q=bonjour', '2020-02-27'),
    (3, 3, 'text', 'Qui de l''oeuf ou la poule est arrivé en premier ?', '2019-03-15'),
    (4, 1, 'link', 'https://www.youtube.com/watch?v=17vFHKwq8B8', '2020-01-15');

insert into Tag(postId, tagText)
values
    (4, 'philosophie'),
    (1, 'connaisance'),
    (2, 'journee'),
    (4, 'top-lol'),
    (1, 'moyen-age'),
    (1, 'trop-bien');

insert into Reaction(postId, userId, reactionType)
values
    (1, 1, 'thonk'),
    (1, 2, 'like'),
    (1, 3, 'awesome'),
    (1, 4, 'like'),
    (4, 1, 'wow'),
    (4, 2, 'rain'),
    (4, 3, 'wow'),
    (4, 4, 'wow');

insert into Follow(followerId, followedId)
values
    (1, 2),
    (2, 4),
    (3, 1),
    (1, 3),
    (1, 4);
