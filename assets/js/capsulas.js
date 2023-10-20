// El ID para identificar las capsulas sera x001
const products = [
    {   name: 'Espresso Intenso', 
        price: 500, 
        img: '../assets/img/capsulas/Espresso Intenso.png', 
        desc: 'Elaborado con granos de café de tueste oscuro, este espresso ofrece un sabor robusto con notas a chocolate amargo\
        y un final suave y duradero. Ideal para aquellos que buscan una experiencia de café potente y satisfactoria.',
        id: 1001
    },
    {   name: 'Cappuccino Caramelo', 
        price: 500, 
        img: '../assets/img/capsulas/Cappuccino Caramelo.png', 
        desc: 'Esta cápsula combina un espresso suave y cremoso con una deliciosa espuma de leche\
        y un toque de caramelo. Perfecto para quienes disfrutan de una bebida con equilibrio entre lo dulce y lo amargo.',
        id: 2001
    },
    {   name: 'Mocha Almendra', 
        price: 500, 
        img: '../assets/img/capsulas/Mocha Almendra.png', 
        desc: 'Esta cápsula ofrece un espresso rico y aromático combinado\
        con chocolate oscuro y leche cremosa. todo realzado con el toque distintivo de almendras tostadas.',
        id: 3001
    },
    {   name: 'Vanilla Latte', 
        price: 500, 
        img: '../assets/img/capsulas/Vanilla Latte.png', 
        desc: 'Un espresso suave y fragante se combina con leche sedosa y un toque de vainilla. \
        Creando una bebida reconfortante con un sabor dulce y envolvente. Perfecto para momentos de relajación y placer.',
        id: 4001
    },
    {   name: 'Café Menta Delicia', 
        price: 500, 
        img: '../assets/img/capsulas/Café Menta Delicia.png', 
        desc: 'Esta cápsula combina la intensidad del espresso con la frescura de la menta y un toque de cacao.\
        El resultado es una bebida vigorizante con un equilibrio perfecto entre la amargura del café y el frescor de la menta.',
        id: 5001
    },
    {   name: 'Café Nicaragua', 
        price: 500, 
        img: '../assets/img/capsulas/Café Nicaragua.png', 
        desc: 'Esta cápsula ofrece un café de origen único, cultivado en la región de Yirgacheffe. Su sabor distintivo se\
        caracteriza por sus notas de cítricos, flores y un toque de chocolate negro, creando una experiencia aromática y exótica.',
        id: 6001
    },
    {   name: 'Café de Colombia', 
        price: 500, 
        img: '../assets/img/capsulas/Café de Colombia Suave.png', 
        desc: 'Elaborado con granos de café de tueste oscuro, este espresso ofrece un sabor robusto con notas a chocolate\
        amargo y un final suave y duradero. Ideal para aquellos que buscan una experiencia de café potente y satisfactoria.',
        id: 7001
    },
    {   name: 'Descafeinado Delicado', 
        price: 500, 
        img: '../assets/img/capsulas/Descafeinado Delicado.png', 
        desc: 'Esta cápsula ofrece un espresso descafeinado con cuerpo y suavidad, preservando la riqueza de los sabores sin la\
        estimulación de la cafeína. Perfecto para disfrutar de un café relajante en cualquier momento del día.',
        id: 8001
    }
];



let cart = JSON.parse(localStorage.getItem('primaryCart'));

if (cart == null) {
    primaryCart = [];
} else {
    primaryCart = cart; 
}

function createProductCard(title, img, description, id){
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

window.onload = function cargarProductos() {
    if (document.getElementById('productosCapsulas') != null){
        let productosCapsulas = document.getElementById('productosCapsulas');
        products.forEach(function(obj) { productosCapsulas.innerHTML += createProductCard(obj.name, obj.img, obj.desc, obj.id) });
    }
    localStorage.setItem('flashCart', '');
}

function compararProducto(itemID){
    localStorage.setItem('flashCart', itemID);
    window.location.replace('../../pages/carrito.html');
}

function agregarAlCarrito(itemID){
    primaryCart.push(itemID);
    localStorage.setItem('primaryCart', JSON.stringify(primaryCart));
}