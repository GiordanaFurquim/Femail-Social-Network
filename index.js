const express = require("express");
const compression = require("compression");
const db = require("./utils/db");
const { hash, compare } = require("./utils/bc");
const cookieSessions = require("cookie-session");
const s3 = require("./utils/s3");
const config = require("./utils/config");
const csurf = require("csurf");
const app = (exports.app = express());
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const http = require("http");

///  file upload boilerplate////

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },

    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
///////file upload boilerplate//////

//// middlewares //////
app.use(express.static("./public"));

app.use(express.json());

app.use("/favicon.ico", (req, res) => res.sendStatus(404));

app.use(
    express.urlencoded({
        extended: false
    })
);
console.log(require("./secrets"));

////// COOKIES + SOCKET BOILERPLATE /////
const cookieSessionMiddleware = cookieSessions({
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets").sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

///// PROXY //////

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

///// START  ////
app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

///////////REGISTER /////////
app.post("/welcome", (req, res) => {
    console.log("req.body:", req.body);
    hash(req.body.password)
        .then(hash => {
            console.log("hash:", hash);
            db.userFirstRegistrationInfo(
                req.body.first,
                req.body.last,
                req.body.email,
                hash
            )
                .then(id => {
                    console.log("id:", id);
                    req.session.userId = id;
                    res.json({
                        success: true
                    });
                })
                .catch(error => {
                    console.log("error in hash:", error);
                    res.sendStatus(500);
                });
        })
        .catch(error => {
            console.log("error in register:", error);
            res.sendStatus(500);
        });
});

//////////// LOGIN /////////////

app.post("/login", (req, res) => {
    db.getUserInfoForLogin(req.body.email)
        .then(results => {
            console.log(
                "REQ.BODY.PASSWORD:",
                req.body.password,
                results.rows[0].password
            );
            compare(req.body.password, results.rows[0].password)
                .then(match => {
                    if (match) {
                        console.log("REQ.SESSION.LOGIN:", req.session.userId);
                        req.session.userId = results.rows[0].id;
                        res.json({
                            success: true
                        });
                    }
                    console.log("PASSWORD MATCHES:", match);
                })
                .catch(error => {
                    console.log("ERROR IN LOGIN:", error);
                    res.sendStatus(500);
                });
        })
        .catch(error => {
            console.log("ERROR IN LOGIN:", error);
            res.sendStatus(500);
        });
});

////// USERS //////
app.get("/users", (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(data => {
            res.json(data);
        })
        .catch(error => console.log("error in getUserProfile:", error));
});

////////// USERS UPLOADING PROFILE PIC /////
app.post("/users", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const url = config.s3Url + filename;

    if (req.file) {
        db.uploadProfilePicture(req.session.userId, url)
            .then(data => {
                console.log("MY DATA:", data);
                res.json(data);
            })
            .catch(error => {
                console.log("ERROR UPLOADING PROFILE PICTURE:", error);
            });
    } else {
        res.json({
            success: false
        });
    }
});

//////////// UPDATE BIO ///////
app.post("/update-bio", (req, res) => {
    console.log(req.session.userId, req.body.bio);
    db.updateBio(req.session.userId, req.body.bio)
        .then(data => {
            console.log(data);
            res.json({
                success: true
            });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

///// OTHER PROFILE /////

app.get("/user/:id.json", (req, res) => {
    console.log("req.params.id:", req.params.id);
    db.getUserProfile(req.params.id)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

////// FIND MATCHES ////

app.get("/recomender/best-matches", (req, res) => {
    db.recentMathes()
        .then(data => {
            console.log("data from /recomender/best-matches:id.json", data);
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

/////// FIND USERS /////
app.get("/findusers", (req, res) => {
    db.recentUsers()
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

////// FIND MATCHING USERS //////

app.get("/findusers/:userSearch", (req, res) => {
    db.getMatchingUsers(req.params.userSearch)
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

////// CHECK FRIENDSHIP STATUS ////
app.get("/check-friendship/:id", (req, res) => {
    console.log(
        "req.session.userId, req.params.id",
        req.session.userId,
        req.params.id
    );
    db.checkFriendshipStatus(req.session.userId, req.params.id)
        .then(data => {
            console.log("data from /check-friendship:", data);
            if (data.length == 0) {
                res.json({ buttontext: "Make Friend Request" });
            } else if (data[0].accepted == true) {
                res.json({ buttontext: "End Friendship" });
            } else if (data[0].receiver_id == req.session.userId) {
                res.json({ buttontext: "Accept Friend Request" });
            } else {
                res.json({ buttontext: "Cancel Friend Request" });
            }
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

/////////// MAKE FRIENS REQUEST /////////////
app.post("/make-friend-request", (req, res) => {
    console.log("re.body in make friend request:", req.body);
    db.makeFriendRequest(req.session.userId, req.body.id, false)
        .then(data => {
            console.log(data);
            res.json({ buttontext: "Cancel Friend Request" });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

//// CANCEL FRIEND REQUEST ////
app.post("/cancel-friend-request", (req, res) => {
    db.cancelFriendRequest(req.session.userId, req.params.id)
        .then(data => {
            console.log(data);
            res.json({ buttontext: "Make Friend Request" });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

///// ACCEPP FRIEND REQUEST ////
app.post("/accept-friend-request", (req, res) => {
    console.log("data from /accept-friend-request:",req.body.id, req.session.userId);
    db.acceptFriendRequest(req.session.userId, req.body.id)
        .then(data => {
            console.log(data);
            res.json({ buttontext: "End Friendship" });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

//// END FRIENDSHIP ////
app.post("/end-friendship", (req, res) => {
    console.log("data from /end-friendship:", req.body.id, req.session.userId);
    db.endFriendship(req.session.userId, req.body.id)
        .then(data => {
            console.log(data);
            res.json({ buttontext: "Make Friend Request" });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

//// GET ALL FRIENDS //////

app.get("/friends/:get-all-friends.json", (req, res) => {
    console.log("hit the GET /friends-wannabes route");
    db.getAllFriends(req.session.userId)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

///// ACCEPT FRIEND REQUEST IN /FRIENDS ////
app.post("/accept-friend-request-in-friends/:id", (req, res) => {
    console.log(req.body);
    db.acceptFriendRequest(req.session.userId, req.body.id)
        .then(data => {
            console.log(data);
            res.json({ buttontext: "End Friendship" });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

//////// LOGOUT ////////////
app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

//////// ADD PROFILE INFO ////////////
app.post("/addinfo", (req, res) => {
    let body = req.body;
    console.log("req.session.userId on /add-info:", req.session.userId, body);
    db.addProfileInfo(
        req.session.userId,
        body.age,
        body.city,
        body.country,
        body.mother_tongue,
        body.idioms,
        body.link
    )
        .then(data => {
            console.log(data);
            res.json({
                success: true
            });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});

//// GET USER INFO //////
app.get("/profileinfo", (req, res) => {
    db.getProfileInfo(req.session.userId)
        .then(data => {
            console.log("data on getprofileinfo:", data);
            res.json(data);
        })
        .catch(error => console.log("error in getProfileInfo:", error));
});

///POST COLLABORATORS /////
app.post("/colabinformation", (req, res) => {
    let body = req.body;
    console.log("req.session.userId on /colabinformation:", req.body);
    db.insertCollaboratorsInfo(
        req.session.userId,
        body.learn,
        body.learn2,
        body.learn3,
        body.learn4,
        body.learn5,
        body.userSearch,
        body.userSearch2,
        body.userSearch3,
        body.userSearch4,
        body.userSearch5,
        body.level,
        body.level2,
        body.level3,
        body.level4,
        body.level5
    )
        .then(data => {
            console.log(data);
            res.json({
                success: true
            });
        })
        .catch(error => {
            console.log(error);
            res.json({
                success: false
            });
        });
});


//// URL FLASK REQUEST /////

http.get(
    "http://localhost:5000/?skill1=german&level1=5&learn1=-1&skill2=plumbing&level2=3&learn2=1&skill3=french&level3=2&learn3=1&skill4=python&level4=3&learn4=-1&skill5=javascript&level5=3&learn5=1",
    function(response) {
        let content = "";
        response.on("data", chunk => (content += chunk));
        response.on("end", () => {
            console.log(content);
        });
    }
);

///////STAR ROUTE /////

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

////// SERVER /////

server.listen(8080, function() {
    console.log("Peace to all wombats!");
});

//////// SOCKETS /////////

io.on("connection", socket => {
    console.log(`A socket with the id ${socket.id} just connected`);
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    let userId = socket.request.session.userId;

    socket.on("my amazing chat message", msg => {
        console.log("message received");
        console.log("this is the message:", msg);
        db.addMessages(userId, msg)
            .then(data => {
                console.log("my data from getMessage:", data);
                console.log("message from server", msg);
                db.getUserProfile(userId).then(data => {
                    console.log("my data from db.getUserProfile(userId)", data);
                    io.sockets.emit("message from server", {
                        id: data.id,
                        first: data.first,
                        last: data.last,
                        image: data.image,
                        message: msg,
                        sender_id: data.id
                    });
                });
            })
            .catch(error => {
                console.log(error);
            });
    });

    db.getMessages()
        .then(data => {
            io.sockets.emit("chatMessages", data);
        })
        .catch(error => {
            console.log(error);
        });
});
