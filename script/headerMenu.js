function createHeader() {
    startBackend();
    createHeaderMenu();
}

function createHeaderMenu() {
    let feilmeldingLogout = createParagraphForFeilmelding("headline-message", "Her vises feil ved utlogging")
    let overskrift = createOverskrift();
    let menuLinks = createHeaderMenuLinks();
    let btnLogout = createLogoutButton();

    let divHeadline = createDiv("headline");
    divHeadline.appendChild(overskrift);
    divHeadline.appendChild(feilmeldingLogout);

    let navBar = createDiv("nav");
    navBar.appendChild(menuLinks);
    navBar.appendChild(btnLogout);

    let headerMenu = document.getElementById("header_menu");
    headerMenu.appendChild(divHeadline);
    headerMenu.appendChild(navBar);
}

function createLogoutButton() {
    let btnLogout = createButtonWithOnClick("logoutUser()");
    let divLogout = createDiv("logoutUser");
    divLogout.appendChild(btnLogout);
    return divLogout;
}

function createOverskrift() {
    let linkIndex = createLink("Tilbake til start", "index.html", null);
    let h1headline = createh1("index-message", "Dette er en enkel frontend (Backend ikke startet. Vent litt..)")
    linkIndex.appendChild(h1headline);
    return linkIndex;
}

function createHeaderMenuLinks() {
    let liCreateUser = document.createElement("li");
    let liLogin = document.createElement("li");
    let liAlleUsers = document.createElement("li");
    let liMinSide = document.createElement("li");
    let liGame = document.createElement("li");

    let linkCreateUser = createLink("Opprett bruker", "createUser.html", "Opprett brukere");
    let linkLogin = createLink("Logg inn", "login.html", "Logg inn");
    let linkVisAlle = createLink("Alle brukere", "alleUsers.html", "Vis alle brukere");
    let linkMinSide = createLink("Min side", "minSide.html", "Min side");
    let linkSpill = createLink("Spill", "game.html", "Spill");

    liCreateUser.appendChild(linkCreateUser);
    liLogin.appendChild(linkLogin);
    liAlleUsers.appendChild(linkVisAlle);
    liMinSide.appendChild(linkMinSide);
    liGame.appendChild(linkSpill);

    let ul = document.createElement("ul");
    ul.appendChild(liCreateUser);
    ul.appendChild(liLogin);
    ul.appendChild(liAlleUsers);
    ul.appendChild(liMinSide);
    ul.appendChild(liGame);
    return ul;
}

function createParagraphForFeilmelding(id, text) {
    let paragraph = document.createElement("p");
    paragraph.style.float = "right";
    paragraph.setAttribute("id", id);
    paragraph.innerHTML = text;
    return paragraph;
}

function createh1(id, text) {
    let h1headline = document.createElement("h1");
    h1headline.innerHTML = text;
    h1headline.setAttribute("id", id);
    return h1headline;
}

function createDiv(id) {
    let nav = document.createElement("div");
    nav.setAttribute("id", id);
    return nav;
}

function createLink(title, href, innerHtml) {
    let anchorGame = document.createElement("a");
    anchorGame.title = title;
    anchorGame.href = href;
    anchorGame.innerHTML = innerHtml;
    return anchorGame;
}

function createButtonWithOnClick(onclick) {
    let btnLogout = document.createElement("button");
    btnLogout.setAttribute("onclick", onclick);
    // btnLogout.onclick = logoutUser;
    btnLogout.innerHTML = "Logg out";
    return btnLogout;
}