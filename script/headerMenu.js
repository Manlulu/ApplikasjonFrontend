function createPage() {
    startBackend();
    createHeaderMenu();
}

function createHeaderMenu() {
    let headerMenu = document.getElementById("header_menu");

    let headline = document.createElement("div");
    headline.setAttribute("id", "headline");
    headerMenu.appendChild(headline);

    let htmlAnchorElement = document.createElement("a");
    let htmlHeadingElement = document.createElement("h1");
    htmlHeadingElement.innerHTML = "Dette er en enkel frontend (Backend ikke startet. Vent litt..)";
    htmlHeadingElement.setAttribute("id", "index-message");

    htmlAnchorElement.appendChild(htmlHeadingElement);
    htmlAnchorElement.href = "index.html";

    headline.appendChild(htmlAnchorElement);

    let htmlParagraphElement = document.createElement("p");
    htmlParagraphElement.style.float = "right";
    htmlParagraphElement.setAttribute("id", "headline-message");
    htmlParagraphElement.innerHTML = "Her vises feil ved utlogging";

    headline.appendChild(htmlParagraphElement);

    let nav = document.createElement("div");
    nav.setAttribute("id", "nav");
    let htmluListElement = document.createElement("ul");
    let listElementCreateUser = document.createElement("li");
    let listElementLogin = document.createElement("li");
    let listElementAlleUsers = document.createElement("li");
    let listElementMinSide = document.createElement("li");
    let listElementGame = document.createElement("li");

    let anchorCreateUser = document.createElement("a");
    anchorCreateUser.title = "Opprett bruker";
    anchorCreateUser.href = "createUser.html";
    anchorCreateUser.innerHTML = "Opprett bruker";

    let anchorLogin = document.createElement("a");
    anchorLogin.title = "Logg inn";
    anchorLogin.href = "login.html";
    anchorLogin.innerHTML = "Logg inn";

    let anchorVisAlle = document.createElement("a");
    anchorVisAlle.title = "Alle brukere";
    anchorVisAlle.href = "alleUsers.html";
    anchorVisAlle.innerHTML = "Vis alle brukere";

    let anchorMinSide = document.createElement("a");
    anchorMinSide.title = "Min side";
    anchorMinSide.href = "minSide.html";
    anchorMinSide.innerHTML = "Min side";

    let anchorGame = document.createElement("a");
    anchorGame.title = "Spill";
    anchorGame.href = "game.html";
    anchorGame.innerHTML = "Spill";

    listElementCreateUser.appendChild(anchorCreateUser);
    listElementLogin.appendChild(anchorLogin);
    listElementAlleUsers.appendChild(anchorVisAlle);
    listElementMinSide.appendChild(anchorMinSide);
    listElementGame.appendChild(anchorGame);
    htmluListElement.appendChild(listElementCreateUser);
    htmluListElement.appendChild(listElementLogin);
    htmluListElement.appendChild(listElementAlleUsers);
    htmluListElement.appendChild(listElementMinSide);
    htmluListElement.appendChild(listElementGame);
    nav.appendChild(htmluListElement);
    headerMenu.appendChild(nav);

    let divLogout = document.createElement("div");
    divLogout.setAttribute("class", "logoutUser");
    let btnLogout = document.createElement("button");
    btnLogout.setAttribute("onclick", "logoutUser()");
    // btnLogout.onclick = logoutUser;
    btnLogout.innerHTML = "Logg out";

    divLogout.appendChild(btnLogout);
    nav.appendChild(divLogout);
}