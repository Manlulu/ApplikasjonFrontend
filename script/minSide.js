function setupMinSide() {
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
            return JSON.parse(responseString);
        }
    }).then(function (result) {
        console.log(result);
        document.getElementById("minSide-brukernavn").innerHTML = "Bruker: " + result.username;
        document.getElementById("minSide-email").innerHTML = "E-post: " + result.email;
    }).catch((error) => {
        console.log("En error: " + error);
    });

    startBackend(); // For å endre overskrift til "Backen statet"
}