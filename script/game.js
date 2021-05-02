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
        }
    }).catch((error) => {
        console.log("En error: " + error);
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

function challengePlayer() {
    let moves = {
        "token": window.localStorage.getItem("userToken"),
        "oponentUsername":  document.getElementById("username").value, // TODO - Må endres

        "gameAttack1": document.querySelector('input[name="game_attack_1"]:checked').value,
        "gameAttack2": document.querySelector('input[name="game_attack_2"]:checked').value,
        "gameAttack3": document.querySelector('input[name="game_attack_3"]:checked').value,
        "gameDefend1": document.querySelector('input[name="game_defend_1"]:checked').value,
        "gameDefend2": document.querySelector('input[name="game_defend_2"]:checked').value,
        "gameDefend3": document.querySelector('input[name="game_defend_3"]:checked').value
    };

    $.ajax({
        url: baseUrl + "/challenge",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(moves),
        success: function (response) {
            document.getElementById("game-challenge-message").innerHTML = "Player challenged!";
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