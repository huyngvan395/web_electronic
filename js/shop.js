// Thêm dữ liệu lấy từ file json đã tạo 
let Laptopproducts=[];
let listLaptop=document.querySelector('.list-laptop');
let Phoneproducts=[];
let listPhone=document.querySelector('.list-phone');

const addLaptopDataToHTML=()=>{
    if(Laptopproducts.length>0){
        Laptopproducts.forEach(product=>{
            let newProduct=document.createElement('div');
            newProduct.classList.add(...['col-lg-4', 'col-md-6']);
            newProduct.innerHTML=`<div class="card-product">
            <div class="img-contain"><a href="detailproduct.html"><img src="${product.image}" alt=""></a></div>
            <div class="content-product">
                <h4><a href="detailproduct.html">${product.name}</a></h4>
                <p>${product.price}VND</p>
                <button class="cart-add">Thêm vào giỏ hàng <i class='bx bxs-cart-add' ></i></button>
            </div>
        </div>`;
            newProduct.querySelector('.cart-add').addEventListener('click', addToCart);
            newProduct.querySelector('.img-contain a').addEventListener('click', event=>{seenDetailProduct(event, 'laptop')});
            newProduct.querySelector('h4 a').addEventListener('click', event=>{seenDetailProduct(event, 'laptop')});
            listLaptop.appendChild(newProduct);
        })
    }
}

const addPhoneDataToHTML=()=>{
    if(Phoneproducts.length>0){
        Phoneproducts.forEach(product=>{
            let newProduct=document.createElement('div');
            newProduct.classList.add(...['col-lg-4', 'col-md-6']);
            newProduct.innerHTML=`<div class="card-product">
            <div class="img-contain"><a href="detailproduct.html"><img src="${product.image}" alt=""></a></div>
            <div class="content-product">
                <h4 ><a href="detailproduct.html">${product.name}</a></h4>
                <p >${product.price}VND</p>
                <button class="cart-add">Thêm vào giỏ hàng <i class='bx bxs-cart-add' ></i></button>
            </div>
        </div>`;
            newProduct.querySelector('.cart-add').addEventListener('click', addToCart);
            newProduct.querySelector('.img-contain').addEventListener('click', event=>{seenDetailProduct(event, 'phone')});
            newProduct.querySelector('h4').addEventListener('click', event=>{seenDetailProduct(event, 'phone')});
            listPhone.appendChild(newProduct);
        })
    }
}

const getLaptopData = () =>{
    fetch("json/laptop.json").then(reponse=>reponse.json()).then(data=>{
        Laptopproducts=data;
        addLaptopDataToHTML();
    }).catch(error => console.error('Error fetching data:', error));
}

const getPhoneData = () =>{
    fetch("json/phone.json").then(reponse=>reponse.json()).then(data=>{
        Phoneproducts=data;
        addPhoneDataToHTML();
    }).catch(error=> console.error('Errot fetching data:', error));
}

getLaptopData();
getPhoneData();

// Xét hành động để thêm sản phẩm vào giỏ hàng
function addToCart(event){
    event.stopPropagation();
    var product=event.target.closest('.card-product');
    let cart=JSON.parse(localStorage.getItem('cart')) || [];
    if(product){
        var image=product.querySelector('img').getAttribute('src');
        var name=product.querySelector('h4').innerText;
        var price = parseFloat(product.querySelector('p').innerText.match(/\d+(\.\d+)?/)[0]);

        const existProduct=cart.findIndex(product=> product.name===name);
        if(existProduct >=0){
            cart[existProduct].quantity+=1;
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

function seenDetailProduct(event, type){
    event.stopPropagation();
    var product=event.target.closest('.card-product');

    if(product){
        var name=product.querySelector('h4').innerText;
        var detail={
            name:name,
            type:type
        };
    }
    localStorage.setItem('detail', JSON.stringify(detail));
}