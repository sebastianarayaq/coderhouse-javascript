let list = [];

function keepAsking () {
    let answer = "";
    do {
        answer = prompt("¿Desea seguir agregando productos? Ingrese 'si' o 'no':");
        answer = answer != null ? answer.trim().toLowerCase() : ""; // Convierte a minúsculas y elimina espacios en blanco

        if (answer !== "si" && answer !== "no") {
            alert("Por favor, ingrese 'si' o 'no'.");
        }
    } while (answer !== "si" && answer !== "no");

    return answer;
}

function addItems() {
    let answer = "si"; // Inicializa la respuesta para que el bucle se ejecute al menos una vez

    while (answer.toLowerCase() === "si") {
        let product = prompt("Ingrese el nombre del producto:");
        product = product ? product.trim() : "";

        while (product === "") {
            alert("El nombre del producto no es válido. Por favor, inténtelo de nuevo.");
            product = prompt("Ingrese el nombre del producto:");
            product = product ? product.trim() : "";
        }

        let quantity = parseInt(prompt("Ingrese la cantidad del producto:"));
        while (isNaN(quantity) || quantity <= 0) {
            alert("La cantidad ingresada no es válida. Por favor, ingrese un número mayor que cero.");
            quantity = parseInt(prompt("Ingrese la cantidad del producto:"));
        }

        let price = parseFloat(prompt("Ingrese el precio del producto:"));
        while (isNaN(price) || price <= 0) {
            alert("El precio ingresado no es válido. Por favor, ingrese un número mayor que cero.");
            price = parseFloat(prompt("Ingrese el precio del producto:"));
        }

        // Agregar el objeto a la lista
        list.push({ product, quantity, price });

        answer = keepAsking();
    }
}

function showList() {
    // Obtener el elemento en el que se mostrará la lista (suponiendo que haya un elemento con el id "shoppingList")
    const listContainer = document.getElementById("shoppingList");

    // Limpiar el contenido previo
    listContainer.innerHTML = "";

    // Iterar a través de los productos y crear elementos div para cada uno
    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        // Crear un elemento div con estilos de Bootstrap para cada producto
        const productDiv = document.createElement("div");
        productDiv.classList.add("row", "text-center", "d-flex", "justify-content-between");

        // Agregar información del producto al div
        productDiv.innerHTML = `
            <div class="col text-center"><p>${item.product}</p></div>
            <div class="col text-center"><p> ${item.quantity}</p></div>
            <div class="col text-center"><p>$${item.price}</p></div>
        `;

        // Agregar el elemento div del producto al contenedor
        listContainer.appendChild(productDiv);
    }

    // Agregar el contenedor al elemento de la lista
    listContainer.appendChild(containerDiv);
}

// Obtener el botón por su ID
const addItemsBtn = document.getElementById("addItems");

// Agregar un controlador de eventos al botón
addItemsBtn.addEventListener("click", function() {
    addItems();
    showList(); // Luego de agregar items, muestra la lista actualizada
});