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
router.get('/', (req, res) => {
    res.send('welcome to POST IT APP!');
});

//get a list of users from the database
router.get('/user', (req, res) => {
    res.send({type: 'GET'});
});


router.post('/user/signup', (req, res) => {
    let user = { username: req.body.username,
                email: req.body.email,
                password: req.body.password
                };
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
   
    .then(userRecord => {
        // Push the UserID into the user object
        user.uid = userRecord.uid;
        let userID = userRecord.uid
        //Push to the database using uid as key
        usersRef.update({[userID] :user});
        res.send(user)
        console.log("User has signed up");
    })
    .catch(error => {
        res.send({message: error.message});
    })
});




//sign in user
router.post('/user/signin',(req, res) => {
    
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    firebase.auth().signInWithEmailAndPassword(email, password) 
    .then(() => {

    console.log("User has logged in");
    res.send("Successfully logged in")
    })

    .catch(error => {
       res.send({message: error.message});
    });
    
});



//create group if you are signed in
firebase.auth().onAuthStateChanged(user => {
    if (user){

        router.post('/group', (req, res) => {
            let groupName = req.body.groupName;
            let groupCreator = user.uid;
            
            groupRef.push({name: groupName, members: {groupCreator}});
            res.send('Group Created Successfully!')
            console.log('User Created A Group');
        })
    }
              
    else{
        let message = "Please Login to create a group";
        message;
    }


});

//add users.group




//update a user in the database
router.put('/user/:id', (req, res) => {
    res.send({type: 'PUT'});
});

//delete a user from the database
router.delete('/user/:id', (req, res) => {
    res.send({type: 'DELETE'});
});


module.exports = router;