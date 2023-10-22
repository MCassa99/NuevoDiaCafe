let cart = JSON.parse(localStorage.getItem('primaryCart'));
localStorage.setItem('flashCart', '');

if (cart == null) {
    primaryCart = [];
} else {
    primaryCart = cart;
}

function createProductCard(title, img, description, id) {
    let card =
        `
    <!-- ${title} --> 
    <div class="col">
        <div class="card card-capsulas h-100 bg-light bg-opacity-25">
            <img src="${img}" class="card-img-top mt-2"
                alt="${title}" />
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                    ${description}
                </p>
            </div>
            <div class="card-body">
                <div class="d-flex flex-column align-items-center">
                    <button class="btn btn-danger col-12 text-center mb-1" onclick=(compararProducto('${id}'))>COMPRAR</button>
                    <button class="btn btn-primary col-12 text-center mb-1" onclick=(agregarAlCarrito('${id}'))>AGREGAR AL CARRITO</button>
                </div>
            </div>
        </div>
    </div>
    `;
    return card;
}

window.onload = setTimeout(function () {
    let productosCapsulas = document.getElementById('productosCapsulas');
    products.forEach(function (obj) { productosCapsulas.innerHTML += createProductCard(obj.name, obj.img, obj.desc, obj.id) });
}, 500);

function compararProducto(itemID) {
    localStorage.setItem('flashCart', itemID);
    window.location.replace('../../pages/carrito.html');
}

function agregarAlCarrito(itemID) {
    primaryCart.push(itemID);
    localStorage.setItem('primaryCart', JSON.stringify(primaryCart));
}