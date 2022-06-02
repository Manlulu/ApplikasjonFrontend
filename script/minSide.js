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
    }).then(function (response) {
        return response.text();
    }).then(function (responseString) {
        if (responseString.length !== 0) {
            return JSON.parse(responseString);
        }
    }).then(function (result) {
        if(result !== undefined) {
            console.log(result);
            document.getElementById("minSide-brukernavn").innerHTML = "Bruker: " + result.username;
            document.getElementById("minSide-email").innerHTML = "E-post: " + result.email;
            document.getElementById("minSide-win").innerHTML = "Antall win: " + result.win;
            document.getElementById("minSide-lose").innerHTML = "Antall lose: " + result.lost;
            document.getElementById("minSide-draw").innerHTML = "Antall draw: " + result.draw;
        }
    }).catch((error) => {
        console.log("En error: " + error);
    });
}