function setupGamePage() {
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
            setupPlayer(responseString, "game_player_data");
            setupPlayerChallenge();
        }
    }).catch((error) => {
        console.log("En error: " + error);
    });
}

function setupPlayerChallenge() {
    let token = window.localStorage.getItem("userToken");

    $.ajax({
        url: baseUrl + "/findChallenge",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: token,
        success: function (response) {
            let challenge = JSON.parse(response);
            document.getElementById("game_player_attack_headline").innerHTML = challenge.oponentUsername + " is attacking!";
            window.localStorage.setItem("oponent", challenge.oponentUsername);
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
            setupPlayer(response, "game_other_data");
            document.getElementById("game_enemy_attack").style.visibility = "visible";
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

function setupPlayer(data, id) {
    const user = JSON.parse(data);

    let ul = document.createElement('ul');
    ul.setAttribute('id', "gameList");
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(ul);

    let username = document.createElement('li');
    let level = document.createElement('li');
    let win = document.createElement('li');
    let lost = document.createElement('li');

    ul.appendChild(username);
    ul.appendChild(level);
    ul.appendChild(win);
    ul.appendChild(lost);

    username.innerHTML = "Bruker: ".bold() + user.username;
    level.innerHTML = "Level: ".bold() + user.level;
    win.innerHTML = "Win: ".bold() + user.win;
    lost.innerHTML = "Lose: ".bold() + user.lost;
}

function challengePlayer(gameAttack1, gameAttack2, gameAttack3, gameDefend1, gameDefend2, gameDefend3) {

    let oponent = window.localStorage.getItem("oponent");
    if(oponent == null) {
        oponent = document.getElementById("username").value;
    }

    let moves = {
        "token": window.localStorage.getItem("userToken"),
        "oponentUsername":  oponent, // TODO - Må endres

        "gameAttack1": document.querySelector('input[name=' + gameAttack1 + ']:checked').value,
        "gameAttack2": document.querySelector('input[name=' + gameAttack2 + ']:checked').value,
        "gameAttack3": document.querySelector('input[name=' + gameAttack3 + ']:checked').value,
        "gameDefend1": document.querySelector('input[name=' + gameDefend1 + ']:checked').value,
        "gameDefend2": document.querySelector('input[name=' + gameDefend2 + ']:checked').value,
        "gameDefend3": document.querySelector('input[name=' + gameDefend3 + ']:checked').value
    };

    $.ajax({
        url: baseUrl + "/challenge",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(moves),
        success: function (response) {
            document.getElementById("game-challenge-message").innerHTML = "Player challenged!";
            document.getElementById("game-player_challenge-message").innerHTML = "Challenge accepted!";
        },
        error: function (error) {
            console.log(error);
            if (error.status === 400) {
                document.getElementById("minSide-message").innerHTML = "Fant ikke bruker";
            } else {
                document.getElementById("game-challenge-message").innerHTML = "Ukjent feil";
            }
        }
    });
}