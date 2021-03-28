function createUser() {
    let url = "http://localhost:8080/createUser";
    let user = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };

    let options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    }
    console.log("Sender post")
    fetch(url, options)
        .then(() => window.location = "login.html")
        .catch(err => console.log("En error ble kasta: " + err))

}

function loginUser() {
    let user = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };

    $.ajax({
        url: "http://localhost:8080/login",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (response) {
            console.log("Success: " + response);
            document.getElementById("login-overskrift").innerHTML = "Du er logget inn med token: " + response;
            window.localStorage.setItem("userToken", response);
            window.location = "minSide.html";
        },
        error: function (error) {
            console.log(error);
            if(error.status === 401) {
                document.getElementById("login-message").innerHTML = "Feil brukernavn eller passord";
            } else {
                document.getElementById("login-message").innerHTML = "Ukjent feil";
            }
        }
    });
}

function fetchAllUsers() {
    const url = "http://localhost:8080/all";

    fetch(url)
        .then(function (response) {
            return response.text();
        }).then(function (responseString) {

        const allUsers = JSON.parse(responseString);

        allUsers.forEach(addUserToList);

        return allUsers;
    }).then(function (result) {
            document.getElementById("visAlle").innerHTML = "Det er " + result.length + " elementer i listen";
        }
    )
}

function addUserToList(element, index, arr) {
    const li = document.createElement('li');

    document.getElementById("alleUsers-listen").appendChild(li);
    li.innerHTML = element.username;
}

function fetchMinSide() {
    let userToken = window.localStorage.getItem('userToken');

    const url = "http://localhost:8080/hentBrukerData/" + userToken;

    fetch(url)
        .then(function (response) {
            return response.text();
        }).then(function (responseString) {
        return JSON.parse(responseString);
    }).then(function (result) {
        console.log(result);
        document.getElementById("minSide-overskrift").innerHTML = "Bruker: " + result.username + ". Token: " + userToken;
    }).catch((error) => {
        console.log("En error " + error);
    });
}