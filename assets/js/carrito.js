let cartProdCont = 0;
let flashCart = localStorage.getItem('flashCart');

const cantItems = document.getElementById('cantItems');
const ErrorPago = 'Contraseña Invalida.'


function createProduct(id, name, price, img, desc, cant) {
    let product = `<div id="prod${id}" class="p-3 rounded-4 mb-3 bg-light bg-opacity-50">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex align-items-center">
                                <img src="${img}"
                                    class="img-fluid rounded-3 d-sm-block d-none" alt="Shopping item"
                                    style="width: 65px;">
                                <div class="ms-3 mt-3">
                                    <h5 class="text-dark" id="${name}">${name}</h5>
                                    <p class="small mb-0 d-sm-block d-none">${desc.split('.')[0]}.</p>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 100px;">
                                    <div class="product-quantity">
                                        <input class="fw-normal mb-0 d-sm-block d-none" type="number" onchange="refreshCant(${id})" id="cant${id}" value="${cant}" min="1" max="15">
                                    </div>
                                </div>
                                <div class="xs-clear" style="width: 80px;">
                                    <h5 class="mb-0" id="price${id}">${price}</h5>
                                </div>
                                <a class="icon-link" href="#" onclick="removeCart('${id}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                        fill="black" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>`;
    return product;
}

function addCart(prodID, cant) {
    for (const product of products) {
        if (product.id == prodID) {
            cartProdCont++;
            cantItems.innerHTML = `Tienes ${cartProdCont} items en el carrito.`;
            let itemAnterior = document.getElementById(product.name);
            if (!itemAnterior){
                document.getElementById('setProducts').innerHTML += createProduct(product.id, product.name, product.price, product.img, product.desc, cant);
            }
        }
    }
}

function removeCart(id) {
    cartProdCont--;
    let cont = -1;
    let newCartRemoved = [];
    for (const itemID of cart) {
        let index = cart.indexOf(id);
        console.log(index);
        if ((id != itemID) || (cont >= 0)) {
            newCartRemoved[index] = id;
        } else {
            cont++;
        }
    }
    let childID = 'prod'+id;
    document.getElementById(childID).remove();
    cart = newCartRemoved;
    localStorage.setItem('primaryCart', JSON.stringify(cart));
    cargarCarrito();
}

function refreshCant(id) {
    let price = document.getElementById('price' + id);
    let cant = document.getElementById('cant' + id).value;
    let newPrice;
    for (const product of products) {
        if (product.id == id) {
            newPrice = cant * product.price;
        }
    }
    price.innerHTML = newPrice;
}

window.onload = cargarCarrito();

function cargarCarrito() {
    cantItems.innerHTML = `Tienes ${cartProdCont} items en el carrito.`;
    if (flashCart == null || flashCart == '') {
        if (cart != null) {
            newCart = countCart(cart);
            //muestra carrito primario
            for (const id of cart) {
                addCart(id, newCart[id]);
                refreshCant(id);
            }
            calcularCarrito(cart);
        }
    } else {
        //muestra carrito con compra flash
        addCart(flashCart, 1);
        calcularCarrito(flashCart);
    }
}

function countCart(list) {
    newCart = {};
    for (const item of list){
        if (newCart[item]) {
            newCart[item]++;
        } else {
            newCart[item] = 1;
        }
    }
    return newCart;
}

function calcularCarrito(list){
    let subtotal = 0;
    let envio = 0;
    let contEnvio = 0;

    for (const item of list) {
        for (const itemList of products) {
            if (item == itemList.id) {
                subtotal += itemList.price;
                contEnvio += 1;
            }
        }
    }
    if (contEnvio > 0)
        envio += 60*contEnvio;
    if (contEnvio > 5)
        envio += 30*contEnvio;
    if (contEnvio > 10)
        envio += 15*contEnvio;
    if (subtotal > 4000)
        envio = 0;

    document.getElementById('total').innerHTML = ((subtotal + envio)*1.22).toFixed(0);
    document.getElementById('subtotal').innerHTML = subtotal;
    document.getElementById('envio').innerHTML = envio;
}

function checkPay(){
    if (flashCart != null || flashCart != '' || cart != null) {
        total = document.getElementById('total').innerHTML;
    } else {
        alert('NO POSEE ARTICULOS EN EL CARRITO.');
    }
}