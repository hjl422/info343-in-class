//put the interpreter into strict mode
"use strict";

//create a new Firebase application using the Firebase
//console, https://console.firebase.google.com/

//setup OAuth with GitHub
//- on Firebase, enable the GitHub sign-in method
//- go to GitHub, and go to your account settings
//- under Developer Settings on the left, choose OAuth applications
//- fill out the form, setting the Authorization Callback URL
//  to the URL provided by Firebase 

//paste the Firebase initialization code here

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEss9Z-beECjgzp4k9llQxXhZ2cVOsZZU",
    authDomain: "tasks-demo-8cec6.firebaseapp.com",
    databaseURL: "https://tasks-demo-8cec6.firebaseio.com",
    storageBucket: "tasks-demo-8cec6.appspot.com",
    messagingSenderId: "469374009140"
};

// Daniel's Task List
// var config = {
//     apiKey: "AIzaSyCx1Igmro7xT0XZxLpjR9zhGgF1M-94IvA",
//     authDomain: "tasks-demo-ad2dd.firebaseapp.com",
//     databaseURL: "https://tasks-demo-ad2dd.firebaseio.com",
//     storageBucket: "tasks-demo-ad2dd.appspot.com",
//     messagingSenderId: "128979476790"
// };

firebase.initializeApp(config);

var currentUser;
var authProvider = new firebase.auth.GithubAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log(currentUser);
    } else {
        firebase.auth().signInWithRedirect(authProvider);
    }
});

var taskForm = document.querySelector(".new-task-form");
var taskTitleInput = taskForm.querySelector(".new-task-title");
var taskList = document.querySelector(".task-list");
var tasksRef = firebase.database().ref("tasks");
var purgeButton = document.querySelector(".btn-purge");

taskForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    var task = {
        title: taskTitleInput.value.trim(),
        done: false,
        createdOn: firebase.database.ServerValue.TIMESTAMP,
        createdBy: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            email: currentUser.email
        }
    };
    
    tasksRef.push(task);

    taskTitleInput.value = "";

    return false;
});

function renderTask(snapshot) {
    var task = snapshot.val();
    var li = document.createElement("li");
    // li.textContent = task.title;

    // The list of the tasks
    var spanTitle = document.createElement("span");
    spanTitle.textContent = task.title;
    spanTitle.classList.add("task-title");
    li.appendChild(spanTitle);

    // The time that it was created and the user who created it
    var spanCreation = document.createElement("span");
    spanCreation.textContent = moment(task.createdOn).fromNow() + " by " + (task.createdBy.displayName || task.createdBy.email);
    spanCreation.classList.add("task-creation");
    li.appendChild(spanCreation);

    if (task.done) {
        li.classList.add("done");
        purgeButton.classList.remove("hidden");
    }

    li.addEventListener("click", function() {
        //console.log("click for " + task.title);
        snapshot.ref.update({
            done: !task.done
        });
    });

    taskList.appendChild(li);
}

function render(snapshot) {
    taskList.innerHTML = "";
    // This will hide the button if the task is not done, removing the hidden button
    purgeButton.classList.add("hidden");
    snapshot.forEach(renderTask);
}

tasksRef.on("value", render);

purgeButton.addEventListener("click", function() {
    //console.log("purge button clicked!");
    tasksRef.once("value", function(snapshot) {
        snapshot.forEach(function(taskSnapshot) {
            if (taskSnapshot.val().done) {
                taskSnapshot.ref.remove();
            }
        });
    });
});