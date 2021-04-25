function createTable(data, id) {
    let table = document.getElementById(id);
    createUsertableHead(table, Object.keys(data[0]))
    createUsertableBody(table, data);
}

function createUsertableHead(table, headers) {
    let thead = table.createTHead()
    let row = thead.insertRow();

    for(let key of headers) {
        let th = document.createElement("th");
        let text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
        th.appendChild(text);
        row.appendChild(th);
    }
}

function createUsertableBody(table, allUsers) {
    for(let element of allUsers) {
        let row = table.insertRow();
        for(let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}