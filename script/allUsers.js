function setupAllUsersPage() {
    fetch(baseUrl + "/allUsers")
        .then(function (response) {
            return response.text();
        }).then(function (responseString) {
        const allUsers = JSON.parse(responseString);
        createTable(allUsers, "allUsers_table");
        return allUsers.length;
    }).then(function (result) {
            document.getElementById("visAlle").innerHTML = "Det er " + result + " registrerte brukere";
        }
    )
}