let flashCart = localStorage.getItem('flashCart');
let primaryCart = [];
let products = [];


let username = localStorage.getItem('username');
let password = localStorage.getItem('password');
    
fetch('../assets/json/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => console.log(error))
