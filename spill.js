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
    })
        .then(function (response) {
            return response.text();
        }).then(function (responseString) {
        if (responseString.length !== 0) {
            // document.getElementById("minSide_sok_opp_bruker").style.visibility = "visible";
            return JSON.parse(responseString);
        }
    }).catch((error) => {
        console.log("En error: " + error);
    });

    startBackend(); // TODO kan denne fjernes?
}