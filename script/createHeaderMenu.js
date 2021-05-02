function createHeader(isLoggedIn) {
    let feilmeldingLogout = createParagraphForFeilmelding("headline-message", "Her vises feil ved utlogging")
    let overskrift = createOverskrift("Tilbake til start", "index.html", "index-message", "Dette er en enkel frontend (Backend ikke startet. Vent litt..)");
    let menuLinks = createHeaderMenuLinks(isLoggedIn);
    let divHeadline = createDiv("headline");

    divHeadline.appendChild(overskrift);
    divHeadline.appendChild(feilmeldingLogout);
    let navBar = createDiv("nav");

    navBar.appendChild(menuLinks);

    if (document.contains(document.getElementById("header_menu_content"))) {
        document.getElementById("header_menu_content").remove();
    }
    let headerMenuContent = createDiv("header_menu_content");
    headerMenuContent.appendChild(divHeadline);
    headerMenuContent.appendChild(navBar);

    let headerMenu = document.getElementById("header_menu");
    headerMenu.appendChild(headerMenuContent);
}

function createButton(onclick, div) {
    let btnLogout = createButtonWithOnClick(onclick);
    let divLogout = createDiv(div);
    divLogout.appendChild(btnLogout);
    return divLogout;
}

function createOverskrift(title, href, id, text) {
    let linkIndex = createLink(title, href, null);
    let h1headline = createh1(id, text)
    linkIndex.appendChild(h1headline);
    return linkIndex;
}

function createHeaderMenuLinks(isLoggedIn) {
    let liCreateUser = document.createElement("li");
    let liAlleUsers = document.createElement("li");

    let linkCreateUser = createLink("Opprett bruker", "createUser.html", "Opprett brukere");
    let linkVisAlle = createLink("Alle brukere", "alleUsers.html", "Vis alle brukere");

    liCreateUser.appendChild(linkCreateUser);
    liAlleUsers.appendChild(linkVisAlle);

    let ul = document.createElement("ul");
    ul.appendChild(liCreateUser);
    ul.appendChild(liAlleUsers);

    if (isLoggedIn) {
        // Logout
        let btnLogout = createButton("logoutUser()", "logoutUser");
        ul.appendChild(btnLogout);

        let liGame = document.createElement("li");
        let linkSpill = createLink("Spill", "game.html", "Spill");
        liGame.appendChild(linkSpill);
        ul.appendChild(liGame);

        // Min side
        let liMinSide = document.createElement("li");
        let linkMinSide = createLink("Min side", "minSide.html", "Min side");
        liMinSide.appendChild(linkMinSide);
        ul.appendChild(liMinSide);
    } else {
        // Login
        let linkLogin = createLink("Logg inn", "login.html", "Logg inn");
        let liLogin = document.createElement("li");
        liLogin.appendChild(linkLogin);
        ul.appendChild(liLogin);
    }
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