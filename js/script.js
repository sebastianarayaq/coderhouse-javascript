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

        let price = parseFloat(prompt("Ingrese el precio unitario del producto:"));
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
    // Obtener el nodo en el que se mostrará la lista
    const listContainer = document.getElementById("shoppingList");

    // Limpiar el contenido previo
    listContainer.innerHTML = "";

    // Iterar a través de los productos y crear elementos div para cada uno
    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        // Crear un elemento div con estilos de Bootstrap para cada producto
        const productDiv = document.createElement("div");
        productDiv.classList.add("row", "text-center", "d-flex", "justify-content-between", "flex-no-wrap");

        // Agregar información del producto al div
        productDiv.innerHTML = `
            <div class="col text-center text-break"><p>${item.product}</p></div>
            <div class="col text-center text-break"><p> ${item.quantity}</p></div>
            <div class="col text-center text-break"><p>$${item.price}</p></div>
        `;

        // Agregar el elemento div del producto al contenedor
        listContainer.appendChild(productDiv);
    }
}

function calculateReceipt() {
    // Obtener el nodo en el que se mostrará el recibo
    const receipt = document.getElementById("receipt");

    // Limpiar el contenido previo
    receipt.innerHTML = "";

    //Variable para almacenar el total de la compra y total de productos
    let totalValue = 0
    let totalProducts = 0
    // Iterar a través de los productos y crear elementos div para cada uno
    for (let i = 0; i < list.length; i++) {
        totalValue+=list[i].price*list[i].quantity
        totalProducts+=list[i].quantity
    }

    // Crear un elemento div con estilos de Bootstrap para cada producto
    const receiptDiv = document.createElement("div");
    receiptDiv.classList.add("row", "text-center", "d-flex", "justify-content-between", "pt-3");

    // Agregar información del producto al div
    receiptDiv.innerHTML = `
        <div class="col text-center"><p>Total de su compra:</p>     <p class="text-break">$${totalValue}</p></div>
        <div class="col text-center"><p>Cantidad de productos:</p>  <p class="text-break">${totalProducts}</p></div>
    `;

    // Agregar el elemento div del producto al contenedor
    receipt.appendChild(receiptDiv);
}

// Obtener el botón por su ID
const addItemsBtn = document.getElementById("addItems");

// Agregar un controlador de eventos al botón
addItemsBtn.addEventListener("click", function() {
    addItems();
    showList();
    calculateReceipt(); // Luego de agregar items, muestra la lista actualizada y genera el recibo
});