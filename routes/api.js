const express = require('express');
const router = express.Router();
const firebase = require('firebase');



//fire base set up
const config = {
  apiKey: "AIzaSyC14fmm_M4nBHhMmcZCZBsTxK91P1GAbpk",
  authDomain: "post-it-app-6d382.firebaseapp.com",
  databaseURL: "https://post-it-app-6d382.firebaseio.com",
  projectId: "post-it-app-6d382",
  storageBucket: "post-it-app-6d382.appspot.com",
  messagingSenderId: "924382012408"
};

// firebase setup
firebase.initializeApp(config);
let db = firebase.database();
let usersRef = db.ref("users");
let groupRef = db.ref("group");



// BASE ROUTES 
app.get('/', function(req, res) {
    res.send('welcome to POST IT APP!');
});

//get a list of users from the database
router.get('/user', function(req, res){
	res.send({type: 'GET'});
});


router.post('/user/signup', function(req, res) {
    let users = { username: req.body.username,
                email: req.body.email,
                password: req.body.password
                };
    firebase.auth().createUserWithEmailAndPassword(users.email, users.password)
    .then(function(userRecord) {
        users.uid = userRecord.uid;
        res.send(users);
        //add a new user to the database
        usersRef.push().set(users);
        console.log("User has signed up");
    })
    .catch(function(error) {
        res.send({message: errror.message});
    })
});




//sign in user
router.post('/user/signin',function(req, res){
	
	let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    firebase.auth().signInWithEmailAndPassword(email, password)    
    console.log("User has logged in");
    res.send("Successfully logged in")

    .catch(function(error) {
        res.send({message: errror.message});
    })
	
});


//firebase.auth().onAuthStateChanged(function(user)){
    //if user{

        router.post('/users/group', function(req, res){
        let groupName = req.body.groupName;

    }


//update a user in the database
router.put('/user/:id', function(req, res){
	res.send({type: 'PUT'});
}); 

//delete a user from the database
router.delete('/user/:id', function(req, res){
	res.send({type: 'DELETE'});
});


module.exports = router;