let list = [];

loadListFromLocalStorage();
showList();
calculateReceipt();

function keepAsking() {
    return new Promise((resolve) => {
        function askUser() {
            Swal.fire({
                title: "¿Desea seguir agregando productos?",
                showDenyButton: true,
                confirmButtonText: "Sí",
                denyButtonText: "No",
            }).then((result) => {
                if (result.isConfirmed) {
                    resolve("si");
                } else if (result.isDenied) {
                    resolve("no");
                } else {
                    askUser(); // Preguntar nuevamente si no se selecciona Sí ni No
                }
            });
        }

        askUser(); // Comenzar el proceso preguntando al usuario
    });
}

function addItems() {
    let answer = "si"; // Inicializa la respuesta para que el bucle se ejecute al menos una vez

    async function askProductName() {
        while (answer.toLowerCase() === "si") {
            const result = await Swal.fire({
                title: "Ingrese el nombre del producto:",
                input: "text",
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                inputValidator: (value) => {
                    return value.trim() === "" ? "El nombre del producto no es válido. Por favor, inténtelo de nuevo." : null;
                },
            });

            if (result.isConfirmed) {
                let product = result.value.trim();
                await askQuantity(product);
            } else {
                break; // Salir del bucle si el usuario cancela
            }
        }
    }

    async function askQuantity(product) {
        const result = await Swal.fire({
            title: "Ingrese la cantidad del producto:",
            input: "number",
            inputAttributes: {
                min: 1,
                step: 1,
            },
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                return isNaN(value) || parseInt(value) <= 0 ? "La cantidad ingresada no es válida. Por favor, ingrese un número mayor que cero." : null;
            },
        });

        if (result.isConfirmed) {
            let quantity = parseInt(result.value);
            await askPrice(product, quantity);
        }
    }

    async function askPrice(product, quantity) {
        const result = await Swal.fire({
            title: "Ingrese el precio unitario del producto:",
            input: "number",
            inputAttributes: {
                min: 0.01,
                step: 0.01,
            },
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputValidator: (value) => {
                return isNaN(value) || parseFloat(value) <= 0 ? "El precio ingresado no es válido. Por favor, ingrese un número mayor que cero." : null;
            },
        });

        if (result.isConfirmed) {
            let price = parseFloat(result.value);
            // Agregar el objeto a la lista
            list.push({ product, quantity, price });

            answer = await keepAsking();

            if (answer.toLowerCase() === "si") {
                askProductName(); // Preguntar por el próximo producto
            } else {
                showList(); // Mostrar la lista actualizada después de agregar productos
                calculateReceipt(); // Luego de agregar items, muestra la lista actualizada y genera el recibo
                saveListToLocalStorage(); // Guarda la lista en localStorage al final de la operación
            }
        }
    }

    
    askProductName(); // Comenzar el proceso preguntando por el nombre del producto
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

// Función para guardar la lista en localStorage
function saveListToLocalStorage() {
    // Convierte la lista a formato JSON y guárdala en localStorage
    localStorage.setItem('productList', JSON.stringify(list));
}

// Función para cargar la lista desde localStorage
function loadListFromLocalStorage() {
    // Obtiene la lista en formato JSON desde localStorage
    const savedListJSON = localStorage.getItem('productList');

    // Si hay una lista almacenada, conviértela de JSON a objeto y asígnala a la variable list
    if (savedListJSON) {
        list = JSON.parse(savedListJSON);
    }
}

// Obtener el botón por su ID
const addItemsBtn = document.getElementById("addItems");

// Agregar un controlador de eventos al botón
addItemsBtn.addEventListener("click", async function () {
    await addItems();
});