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
    console.log("Setup player challenge")
    let token = window.localStorage.getItem("userToken");

    $.ajax({
        url: baseUrl + "/findChallenge",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: token,
        success: function (response) {
            try {
                let challenge = JSON.parse(response);
                document.getElementById("game_player_attack_headline").innerHTML = challenge.oponentUsername + " is attacking!";
                window.localStorage.setItem("oponent", challenge.oponentUsername);
                document.getElementById("game_player_attack").style.visibility = "visible";
            } catch (e) {
                // Svelger exeption. Endre dette.
            }
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

    let token = {
        "token": window.localStorage.getItem("userToken")
    };

    $.ajax({
        url: baseUrl + "/findUser",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(Object.assign({}, user, token)),
        success: function (response) {
            document.getElementById("minSide-message").innerHTML = "";
            document.getElementById("game_enemy_attack").style.visibility = "visible";
            setupOponent(response, "game_other_data");
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
    let draw = document.createElement('li');

    ul.appendChild(username);
    ul.appendChild(level);
    ul.appendChild(win);
    ul.appendChild(lost);
    ul.appendChild(draw);

    username.innerHTML = "Bruker: ".bold() + user.username;
    level.innerHTML = "Level: ".bold() + user.level;
    win.innerHTML = "Win: ".bold() + user.win;
    lost.innerHTML = "Lose: ".bold() + user.lost;
    draw.innerHTML = "Draw: ".bold() + user.draw;
}

function setupOponent(data, id) {
    const user = JSON.parse(data);

    let ul = document.createElement('ul');
    ul.setAttribute('id', "gameList");
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).appendChild(ul);

    let username = document.createElement('li');
    let level = document.createElement('li');
    let win = document.createElement('li');
    let lost = document.createElement('li');
    let draw = document.createElement('li');

    ul.appendChild(username);
    ul.appendChild(level);
    ul.appendChild(win);
    ul.appendChild(lost);
    ul.appendChild(draw);

    username.innerHTML = "Bruker: ".bold() + user.username;
    level.innerHTML = "Level: ".bold() + user.level;
    win.innerHTML = "Win: ".bold() + user.win;
    lost.innerHTML = "Lose: ".bold() + user.lost;
    draw.innerHTML = "Draw: ".bold() + user.draw;

    if(user.challengeEntity != null) {

        if (user.challengeEntity.gameAttack1 == 1) {
            document.getElementById('game_attack_upper_1').checked = true
        } else if (user.challengeEntity.gameAttack1 == 2) {
            document.getElementById('game_attack_mid_1').checked = true
        } else if (user.challengeEntity.gameAttack1 == 3) {
            document.getElementById('game_attack_down_1').checked = true
        }

        if (user.challengeEntity.gameAttack2 == 4) {
            document.getElementById('game_attack_upper_2').checked = true
        } else if (user.challengeEntity.gameAttack2 == 5) {
            document.getElementById('game_attack_mid_2').checked = true
        } else if (user.challengeEntity.gameAttack2 == 6) {
            document.getElementById('game_attack_down_2').checked = true
        }

        if (user.challengeEntity.gameAttack3 == 7) {
            document.getElementById('game_attack_upper_3').checked = true
        } else if (user.challengeEntity.gameAttack3 == 8) {
            document.getElementById('game_attack_mid_3').checked = true
        } else if (user.challengeEntity.gameAttack3 == 9) {
            document.getElementById('game_attack_down_3').checked = true
        }

        if (user.challengeEntity.gameDefend1 == 1) {
            document.getElementById('game_defend_upper_1').checked = true
        } else if (user.challengeEntity.gameDefend1 == 2) {
            document.getElementById('game_defend_mid_1').checked = true
        } else if (user.challengeEntity.gameDefend1 == 3) {
            document.getElementById('game_defend_down_1').checked = true
        }

        if (user.challengeEntity.gameDefend2 == 4) {
            document.getElementById('game_defend_upper_2').checked = true
        } else if (user.challengeEntity.gameDefend2 == 5) {
            document.getElementById('game_defend_mid_2').checked = true
        } else if (user.challengeEntity.gameDefend2 == 6) {
            document.getElementById('game_defend_down_2').checked = true
        }

        if (user.challengeEntity.gameDefend3 == 7) {
            document.getElementById('game_defend_upper_3').checked = true
        } else if (user.challengeEntity.gameDefend3 == 8) {
            document.getElementById('game_defend_mid_3').checked = true
        } else if (user.challengeEntity.gameDefend3 == 9) {
            document.getElementById('game_defend_down_3').checked = true
        }

        document.getElementById("game_challenge_button_deactivated").disabled = true;
    }
}


function challengePlayer(gameAttack1, gameAttack2, gameAttack3, gameDefend1, gameDefend2, gameDefend3) {

    let oponent = window.localStorage.getItem("oponent");
    // if(oponent == null) {
        oponent = document.getElementById("username").value;
    // }

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
            // document.getElementById("game-player_challenge-message").innerHTML = "Challenge accepted!";
            document.getElementById("game_challenge_button_deactivated").disabled = true;
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

// TODO: Skal dette inn i en egen .js fil?
function fightPlayer(gameAttack1, gameAttack2, gameAttack3, gameDefend1, gameDefend2, gameDefend3) {

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
        url: baseUrl + "/fight",
        dataType: "text",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(moves),
        success: function (response) {
            console.log("Response under:")
            console.log(response)
            document.getElementById("game-challenge-message").innerHTML = "Player challenged!";
            let jsonResponse = JSON.parse(response)
            document.getElementById("game-player_challenge-message_winner").innerHTML = "Winner: " + jsonResponse.winner;
            document.getElementById("game-player_challenge-message_player-score").innerHTML = "Your score: " + jsonResponse.accepterPoints;
            document.getElementById("game-player_challenge-message_oponent-score").innerHTML = "Opponent score: " + jsonResponse.challengerPoints;
        },
        error: function (error) {
            console.log(error);
            if (error.status === 400) {
                document.getElementById("minSide-message").innerHTML = "Fant ikke bruker";
            } else {
                document.getElementById("game-player_challenge-message").innerHTML = "Ukjent feil";
            }
        }
    });
}


// TODO: Bør gå mot en FightController
function setupFightList() {
    let userToken = window.localStorage.getItem("userToken");

    let token = {
        "token": userToken
    };


    fetch(baseUrl + "/allResults", {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(token)
    }).then(function (response) {
        return response.text();
    }).then(function (response) {
        setupResult(JSON.parse(response));
    }).catch((error) => {
        console.log(error);
        if (error.status === 400) {
            document.getElementById("minSide-message").innerHTML = "Fant ikke bruker";
        } else {
            document.getElementById("login-message").innerHTML = "Ukjent feil";
        }
    });
}

function setupResult(data) {
    let ul = document.createElement('ul');
    ul.setAttribute('id', "fightList");

    createTable(data, "game_result_list");
}