const cantItems = document.getElementById('cantItems');
let cart = JSON.parse(localStorage.getItem('primaryCart'));

const d = new Date();
let month = d.getMonth() + 1;
let year = d.getFullYear();
if (month < 10) month = '0' + month;
const monthControl = document.querySelector('input[type="month"]');
monthControl.value = `${year}-${month}`;


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
                                        <input class="fw-normal mb-0 d-sm-block d-none" type="number" onchange="refreshCart(${id})" id="cant${id}" value="${cant}" min="1" max="15">
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
    products.forEach(function (product) {
        if (product.id == prodID) {
            let itemAnterior = document.getElementById(product.name);
            if (!itemAnterior) {
                document.getElementById('setProducts').innerHTML += createProduct(product.id, product.name, product.price, product.img, product.desc, cant);
            }
        }
    });
}

function removeCart(id) {
    let newCartRemoved = [];
    for (const itemID of cart) {
        if (id != itemID) {
            newCartRemoved.push(itemID);
        }
    }
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

function refreshCart(id) {
    let cant = document.getElementById('cant' + id).value;
    let newCartRefreshed = [];
    for (const itemID of cart) {
        if (id != itemID) {
            newCartRefreshed.push(itemID);
        }
    }
    for (let index = 0; index < cant; index++) {
        newCartRefreshed.push(id);
    }
    cart = newCartRefreshed;
    localStorage.setItem('primaryCart', JSON.stringify(cart));
    refreshCant(id)
    cargarCarrito();
}

window.onload = setTimeout(function () {
    cargarCarrito();
}, 500);

function cargarCarrito() {
    cart.sort();
    cantItems.innerHTML = `Tienes ${cart.length} items en el carrito.`;
    document.getElementById('setProducts').innerHTML = '';
    if (flashCart == null || flashCart == '') {
        if (cart != null) {
            let newCart = countCart(cart);
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
        refreshCant(flashCart);
        calcularCarrito(flashCart);
    }
}

function countCart(list) {
    newCart = {};
    for (const item of list) {
        if (newCart[item]) {
            newCart[item]++;
        } else {
            newCart[item] = 1;
        }
    }
    return newCart;
}

function calcularCarrito(list) {
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
        envio += 60 * contEnvio;
    if (contEnvio > 5)
        envio += 30 * contEnvio;
    if (contEnvio > 10)
        envio += 15 * contEnvio;
    if (subtotal > 4000)
        envio = 0;

    document.getElementById('total').innerHTML = ((subtotal + envio) * 1.22).toFixed(0);
    document.getElementById('subtotal').innerHTML = subtotal;
    document.getElementById('envio').innerHTML = envio;
}

function verificarTarjeta() {
    const VISA = /4(?:[0-9]{12}|[0-9]{15})/;
    const MASTERCARD = /5[1-5][0-9]{14}/;
    const PAYPAL = 'PAYPAL';

    let nombre = document.getElementById('nameCredit').value;
    let tarjeta = document.getElementById('card').value;

    if (nombre != '') {
        if (tarjeta != '') {
            if (validateCard()) {
                if (tarjeta.match(VISA)) {
                    swal("VISA", "El pago con su tarjeta VISA ha sido realizado con exito!", "success")
                    return true;
                } else {
                    if (tarjeta.match(MASTERCARD)) {
                        swal("MASTERCARD", "El pago con su tarjeta MASTERCARD ha sido realizado con exito!", "success")
                        return true;
                    } else {
                        if (tarjeta.toUpperCase().match(PAYPAL)) {
                            swal("PAYPAL", "El pago con su tarjeta PAYPAL ha sido realizado con exito!", "info")
                            return true;
                        } else {
                            mostrarErrores(1, 'TVal');
                        }
                    }
                }
            } else {
                mostrarErrores(1, 'ECVV');
            }
        } else {
            mostrarErrores(1, 'ETar');
        }
    } else {
        mostrarErrores(1, 'ENom');
    }
}

function validateCard() {
    let cvv = document.getElementById('pass').value;
    return (cvv != '');
}

function mostrarErrores(op, error) {
    switch (op) {
        //Tarjeta y Pago
        case 1:
            switch (error) {
                case 'ENom':
                    swal("Error en Formulario", "Porfavor Ingrese el Nombre de el Titular de la Tarjeta!", "error")
                    break;
                case 'TVal':
                    swal("Error en Formulario", "Porfavor Ingrese una Tarjeta Valida o PAYPAL.", "error")
                    break;
                case 'ECVV':
                    swal("Error en Formulario", "Porfavor Ingrese el CVV de su Tarjeta.", "error")
                    break;
                case 'ETar':
                    swal("Error en Formulario", "Porfavor Ingrese el Numero de su Tarjeta.", "error")
                    break;
                default:
                    break;
            }
            break;

        default:
            break;
    }
}

function checkPay() {
    let efectivo = document.getElementById('opPago');
    let payed = false;
    let deleteCart = [];
    if ((cart.length > 0) || flashCart) {
        if (efectivo.checked) {
            swal("Efectivo", "Pago Realizado con exito.", "success")
            payed = true;
        } else {
            payed = verificarTarjeta();
        }
        if (payed) {
            if (flashCart) {
                localStorage.setItem('flashCart', '');
            } else {
                localStorage.setItem('primaryCart', JSON.stringify(deleteCart));
            }
            setTimeout(function () {
                window.location.replace('../../index.html')
            }, 3000);
        }
    } else {
        swal("Error en Carrito", "Su Carrito NO Posee Articulos.", "error")
    }
}