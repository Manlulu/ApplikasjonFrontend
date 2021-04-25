function fetchGame() {
    let userToken = window.localStorage.getItem("userToken");

    let token = {
        "token": userToken
    };

    fetch(baseUrl + "/user", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    }).then(function (response) {
        return response.text();
    }).then(function (responseString) {
        if (responseString.length !== 0) {
            setupPlayerData(responseString);
        }
    }).catch((error) => {
        console.log("En error: " + error);
    });

    startBackend(); // For å endre overskrift til "Backen statet"
}

function findUser() {
    let user = {
        "username": document.getElementById("username").value,
    };

    $.ajax({
        url: baseUrl + "/findUser",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (response) {
            document.getElementById("minSide-message").innerHTML = "";
            setupEnemyData(response);

        },
        error: function (error) {
            console.log(error);
            if (error.status === 400) {
                document.getElementById("minSide-message").innerHTML = "Fant ikke bruker";
            } else {
                document.getElementById("login-message").innerHTML = "Ukjent feil";
            }
        }
    });
}

function setupPlayerData(responseString) {
    const user = JSON.parse(responseString);

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'gameList');
    document.getElementById("game_player").appendChild(ul);
    let username = document.createElement('li');
    let level = document.createElement('li');
    ul.appendChild(username);
    ul.appendChild(level);

    username.innerHTML = "Bruker: ".bold() + user.username;
    level.innerHTML = "Level: ".bold() + user.level;

    return JSON.parse(responseString);
}

function setupEnemyData(responseString) {
    const user = JSON.parse(responseString);

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'gameList');
    document.getElementById("game_other").innerHTML = "";
    document.getElementById("game_other").appendChild(ul);
    let username = document.createElement('li');
    let level = document.createElement('li');
    ul.appendChild(username);
    ul.appendChild(level);

    username.innerHTML = "Bruker: ".bold() + user.username;
    level.innerHTML = "Level: ".bold() + user.level;

    return JSON.parse(responseString);
}