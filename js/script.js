let list = [];

function keepAsking () {
    let answer = "";
    do {
        answer = prompt("¿Desea seguir agregando productos? Ingrese 'si' o 'no':");
        answer = answer ? answer.trim().toLowerCase() : ""; // Convierte a minúsculas y elimina espacios en blanco

        if (answer !== "si" && answer !== "no") {
            alert("Por favor, ingrese 'si' o 'no'.");
        }
    } while (answer !== "si" && answer !== "no");

    return answer;
}

function addItems() {
    let answer = "si"; // Inicializa la respuesta para que el bucle se ejecute al menos una vez

    while (answer === "si") {
        let addItem = prompt("Agregue un producto a su lista");
        addItem = addItem ? addItem.trim() : "";
        
        while (addItem === "" || addItem === null) {
            alert("El producto ingresado no es válido, vuelva a intentarlo");
            addItem = prompt("Agregue un producto a su lista");
            addItem = addItem ? addItem.trim() : "";
        }

        list.push(addItem);
        answer = keepAsking();
    }
}

function showList() {
    console.log("Tu lista es la siguiente:");
    for (let i = 0; i < list.length; i++) {
        console.log(list[i]);
    }
}

addItems();
showList();