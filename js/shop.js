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
            <img src="${product.image}" alt="">
            <div class="content-product">
                <h4><a href="detailproduct.html">${product.name}</a></h4>
                <p>$${product.price}</p>
                <button class="cart-add">Add to cart <i class='bx bxs-cart-add' ></i></button>
            </div>
        </div>`;
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
            <img src="${product.image}" alt="">
            <div class="content-product">
                <h4><a href="detailproduct.html">${product.name}</a></h4>
                <p>$${product.price}</p>
                <button class="cart-add">Add to cart <i class='bx bxs-cart-add' ></i></button>
            </div>
        </div>`;
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