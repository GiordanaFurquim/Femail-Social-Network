const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbuser, dbpass } = require("../secrets.json");
    db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/social_network`);
}

////////////////// do not change the code above /////////////////////////////

exports.userFirstRegistrationInfo = function(first, last, email, hash) {
    return db
        .query(
            `INSERT INTO users (first, last, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
            [first, last, email, hash]
        )
        .then(({ rows }) => {
            return rows[0].id;
        });
};

exports.getUserInfoForLogin = function(email) {
    return db.query(
        `SELECT password, id FROM users
            WHERE email = $1`,
        [email]
    );
};

exports.getUserProfile = function(id) {
    return db
        .query(
            `SELECT id, first, last, image, bio
            FROM users
            WHERE id = $1`,
            [id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.uploadProfilePicture = function(id, image) {
    return db
        .query(
            `UPDATE users SET image = $2
            WHERE id=$1
            RETURNING *`,
            [id, image]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.updateBio = function(id, bio) {
    return db
        .query(
            `UPDATE users SET bio =$2
            WHERE id=$1`,
            [id, bio]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.recentUsers = function() {
    return db
        .query(
            `SELECT *
            FROM users
            ORDER BY created_at DESC
            LIMIT 5
        `
        )
        .then(data => {
            return data.rows;
        });
};

exports.recentMathes = function() {
    return db
        .query(
            `SELECT *
            FROM users
            ORDER BY created_at DESC
            LIMIT 10
        `
        )
        .then(data => {
            return data.rows;
        });
};

exports.getMatchingUsers = function(que) {
    return db
        .query(
            `SELECT * FROM users
            WHERE first ILIKE $1 OR last ILIKE $1;`,
            [que + "%"]
        )
        .then(data => {
            return data.rows;
        });
};

exports.checkFriendshipStatus = function(receiver_id, sender_id) {
    return db
        .query(
            `SELECT * FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1);`,
            [receiver_id, sender_id]
        )
        .then(data => {
            return data.rows;
        });
};

exports.makeFriendRequest = function(receiver_id, sender_id, accepted) {
    return db
        .query(
            `INSERT INTO friendships (receiver_id, sender_id, accepted)
            VALUES ($1, $2, $3)`,
            [receiver_id, sender_id, accepted]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.cancelFriendRequest = function(receiver_id, sender_id) {
    return db
        .query(
            `DELETE FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1)
            RETURNING *;`,
            [receiver_id, sender_id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.endFriendship = function(receiver_id, sender_id) {
    return db
        .query(
            `DELETE FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1)
            RETURNING id;`,
            [receiver_id, sender_id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.acceptFriendRequest = function(receiver_id, sender_id) {
    return db
        .query(
            `   UPDATE friendships
            SET accepted = true
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1)
            RETURNING *;`,
            [receiver_id, sender_id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.getAllFriends = function(id) {
    return db
        .query(
            `
        SELECT first, last, image, users.id, accepted FROM friendships
        JOIN users
        ON(accepted = false AND receiver_id =$1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
            [id]
        )
        .then(data => {
            return data.rows;
        });
};

exports.rejectFriendRequest = function(receiver_id, sender_id) {
    return db
        .query(
            `DELETE FROM friendships
            WHERE (receiver_id = $1 AND sender_id = $2)
            OR (receiver_id = $2 AND sender_id = $1)
            RETURNING *;`,
            [receiver_id, sender_id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.addMessages = function(message, sender_id, posted_date) {
    return db
        .query(
            `INSERT INTO chats (sender_id, message, posted_date)
        VALUES ($1, $2, $3)`,
            [message, sender_id, posted_date]
        )
        .then(data => {
            return data.rows;
        });
};

exports.getMessages = function() {
    return db
        .query(
            `
        SELECT chats.id, users.first, users.last, users.image, chats.message, chats.sender_id
        FROM chats
        JOIN users
        ON (users.id = chats.sender_id)
        ORDER BY chats.created_at DESC
        LIMIT 10
        `
        )
        .then(data => {
            return data.rows.reverse();
        });
};

exports.addProfileInfo = function(
    user_id,
    age,
    city,
    country,
    mother_tongue,
    idioms,
    link
) {
    console.log("just about addProfileInfo");
    return db
        .query(
            `INSERT INTO profile (user_id, age, city, country, mother_tongue, idioms, link)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (user_id)
            DO UPDATE SET age =$2, city=$3, country=$4, mother_tongue=$5, idioms=$6, link=$7
            RETURNING *`,
            [user_id, Number(age), city, country, mother_tongue, idioms, link]
        )
        .then(data => {
            return data.rows;
        });
};

exports.getProfileInfo = function(id) {
    return db
        .query(
            `SELECT * FROM profile
            WHERE user_id = $1`,
            [id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.insertCollaboratorsInfo = function(
    user_id,
    learn1,
    learn2,
    learn3,
    learn4,
    learn5,
    skill1,
    skill2,
    skill3,
    skill4,
    skill5,
    level1,
    level2,
    level3,
    level4,
    level5
) {
    return db
        .query(
            `INSERT INTO collaborators (user_id, learn1, learn2, learn3, learn4, learn5, skill1,
            skill2, skill3, skill4,  skill5, level1, level2, level3, level4, level5)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING id`,
            [
                user_id,
                learn1,
                learn2,
                learn3,
                learn4,
                learn5,
                skill1,
                skill2,
                skill3,
                skill4,
                skill5,
                level1,
                level2,
                level3,
                level4,
                level5
            ]
        )
        .then(({ rows }) => {
            return rows[0].id;
        });
};

exports.getCollaboratorInfo = function(id) {
    return db
        .query(
            `SELECT * FROM collaborator
            WHERE user_id = $1`,
            [id]
        )
        .then(data => {
            return data.rows[0];
        });
};

exports.deleteChatMessages = function(message) {
    return db
        .query(
            `DELETE FROM chats
            WHERE message = $1
            RETURNING *;`,
            [message]
        )
        .then(data => {
            return data.rows[0];
        });
};
