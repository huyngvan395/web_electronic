let Laptopproducts=[];
let Phoneproducts=[];
let Headphoneproducts=[];
let cartBtn=document.querySelector('.cart-add');
let increaseBtn=document.querySelector('.increase');
let decreaseBtn=document.querySelector('.decrease');

const getLaptopData = () =>{
    return fetch("json/laptop.json").then(reponse=>reponse.json()).then(data=>{
        Laptopproducts=data;
    }).catch(error => console.error('Error fetching data:', error));
}

const getPhoneData = () =>{
    return fetch("json/phone.json").then(reponse=>reponse.json()).then(data=>{
        Phoneproducts=data;
    }).catch(error=> console.error('Errot fetching data:', error));
}

const getHeadPhoneData = () =>{
    return fetch("json/headphone.json").then(reponse=>reponse.json()).then(data=>{
        Headphoneproducts=data;
    }).catch(error => console.error('Error fetching data:', error));
}

function showDetailProduct(){
    let detail=JSON.parse(localStorage.getItem('detail')) || [];

    const name= detail.name;
    const type=detail.type;

    let products;
    if (type === 'laptop') {
        products = Laptopproducts;
    } else if (type === 'phone') {
        products = Phoneproducts;
    } else if (type === 'headphone'){
        products = Headphoneproducts;
    }

    if (products) {
        const product = products.find(p => p.name === name);
        if (product) {
            if(type === 'headphone'){
                const productInfo = document.querySelector('.product-info');
                productInfo.querySelector('.name').textContent = product.name;
                productInfo.querySelector('.des').textContent = product.description;
                productInfo.querySelector('.price').textContent = product.price + ' VND';
                productInfo.querySelector('.battery-life').textContent = product.batteryLife;
                productInfo.querySelector('.charging-port').textContent = product.chargingPort;
                productInfo.querySelector('.operating-system-title').textContent='Hệ điều hành tương thích';
                productInfo.querySelector('.operating-system').textContent = product.compatibleOperatingSystem;
                productInfo.querySelector('.connect').textContent = product.connectivity;
                productInfo.querySelector('.control').textContent = product.control;
                const imageContain=document.querySelector('.image-contain');
                imageContain.querySelector('img').setAttribute('src', product.image);
                cartBtn.addEventListener('click', addToCart);
                increaseBtn.addEventListener('click', increaseQuantity);
                decreaseBtn.addEventListener('click', decreaseQuantity);
            }
            else{
                const productInfo = document.querySelector('.product-info');
                productInfo.querySelector('.name').textContent = product.name;
                productInfo.querySelector('.des').textContent = product.description;
                productInfo.querySelector('.price').textContent = product.price + ' VND';
                productInfo.querySelector('.battery-life').textContent = product.batteryLife;
                productInfo.querySelector('.charging-port').textContent = product.chargingPort;
                productInfo.querySelector('.operating-system').textContent = product.operatingSystem;
                productInfo.querySelector('.connect').textContent = Array.isArray(product.connectivity) ? product.connectivity.join(', ') : 'N/A';
                productInfo.querySelector('.control').textContent = Array.isArray(product.control) ? product.control.join(', ') : 'N/A';
                const imageContain=document.querySelector('.image-contain');
                imageContain.querySelector('img').setAttribute('src', product.image);
                cartBtn.addEventListener('click', addToCart);
                increaseBtn.addEventListener('click', increaseQuantity);
                decreaseBtn.addEventListener('click', decreaseQuantity);
            }
        }
    }
}

function addToCart(event){
    event.stopPropagation();
    var product=event.target.closest('.product-detail');
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    let quantity=parseInt(product.querySelector('.number').innerText);
    if(product){
        var image=product.querySelector('img').getAttribute('src');
        var name=product.querySelector('.name').innerText;
        var price = parseFloat(product.querySelector('.price').innerText.match(/\d+(\.\d+)?/)[0]);

        const existProduct=cart.findIndex(product=> product.name===name);
        if(existProduct >=0){
            cart[existProduct].quantity+=quantity;
            cart[existProduct].subtotal=cart[existProduct].price*cart[existProduct].quantity;
        }
        else{
            const newProduct={
                image,
                name,
                price,
                quantity:1,
                subtotal:price
            };
            cart.push(newProduct);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function decreaseQuantity(event){
    var product=event.target.closest('.product-detail');
    let number_text=product.querySelector('.number');
    let number=parseInt(product.querySelector('.number').innerText);
    if(number>1){
        number--;
        number_text.textContent=number;
    }
    else{
        alert('Số lượng không hợp lệ! Số lượng phải lớn hơn 0');
    }
}

function increaseQuantity(event){
    var product=event.target.closest('.product-detail');
    let number_text=product.querySelector('.number')
    let number=parseInt(product.querySelector('.number').innerText);
    number++;
    number_text.textContent=number;
}

document.addEventListener('DOMContentLoaded', () => {
    Promise.all([getLaptopData(), getPhoneData(), getHeadPhoneData()]).then(showDetailProduct)});

