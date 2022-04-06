/** Показать popup при клике на кнопку запись и стереть указаннные данные */
function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");;
    setTimeout(() => { document.getElementById('degustaion-form').reset() }, 500);
    setTimeout(() => { popup.classList.toggle("show") }, 5000);
    return false;
}
/*********************************************************************** */

/**Убрать blur и popup с проверкой возраста при клике */
function confirmingAge() {
    var popupAge = document.querySelector(".age-confirm");
    popupAge.classList.toggle("active");
    var blur = document.querySelector(".age-container");
    blur.classList.toggle("blur");
}
/**************************************************** */

/**Массив продукции с данными для подсчета*/
let products = [{
        name: 'Napa Valley Cabernet Sauvignon',
        tag: 'napavalleycabernetsauvignon',
        price: 1335,
        inCart: 0
    }, {
        name: 'Sonoma Coast Syrah Red Car',
        tag: 'sonomacoastsyrahredcar',
        price: 4177,
        inCart: 0
    }, {
        name: 'Oakville Napa Cabernet Franc',
        tag: 'oakvillenapacabernetfranc',
        price: 3945,
        inCart: 0
    }, {
        name: 'CA HealdsBurg Ramey Claret',
        tag: 'cahealdsburgrameyclaret',
        price: 1335,
        inCart: 0
    }, {
        name: 'Sonoma Coast Ramey Pinot Noir',
        tag: 'sonomacoastrameypinotnoir',
        price: 2540,
        inCart: 0
    }, {
        name: 'Old Coach Road Sauvignon Blanc',
        tag: 'oldcoachroadsauvignonblanc',
        price: 2299,
        inCart: 0
    }]
    /************************************ */

/** Всем кнопкам добавляем слушателя с инкрементом по клику*/
let addToCartButtons = document.querySelectorAll('.to-cart-btn');
addToCartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        cartNumbers(products[index]);
        totalCost(products[index]);
    });
});
/**************************************************************/


/** Если в корзине есть товары, то их число отображается везде*/
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.getElementById('basket-items').value = productNumbers;
        document.getElementById('basket-items').style.display = 'inline-block';
    }
}
/**************************************************************/

/** Занесение числа товаров в локальное хранилище*/
function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (action) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.getElementById('basket-items').value = productNumbers - 1;
        document.getElementById('basket-items').style.display = 'inline-block';
        console.log("action running");
    } else if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.getElementById('basket-items').value = productNumbers + 1;
        document.getElementById('basket-items').style.display = 'inline-block';
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.getElementById('basket-items').value = 1;
        document.getElementById('basket-items').style.display = 'inline-block';
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems !== null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }



    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
/**************************************************************/

function totalCost(product, action) {
    // console.log("The products price is", product.price);
    let cart = localStorage.getItem('totalCost');


    if (action) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart - product.price);
    } else if (cart != null) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let orderSection = document.querySelector(".cart-right-part")
    let itemsSection = document.querySelector(".items");

    let totaly = localStorage.getItem('totalCost');
    totaly = parseInt(totaly);

    let totalyItem = localStorage.getItem('cartNumbers');
    totalyItem = parseInt(totalyItem);

    let sale = Math.round(totaly * 0.2);
    sale = sale.toString(10);

    if (cartItems && itemsSection && orderSection) {
        itemsSection.innerHTML = '';
        orderSection.innerHTML = '';
        Object.values(cartItems).map(item => {
            itemsSection.innerHTML += ` 
            <div class="item">
                <div class="picture">
                    <img src="../img/${item.tag}.png">
                    
                </div>
                <div class="name">
                    <h5>${item.name}</h5>
                    <div class="remove">
                        <img src="../img/trashcan.png">
                        <span class="tooltiptext">Удалить из <br>корзины</span>
                    </div> 
                </div>
                <div class="price">
                    <p>${item.price}&nbsp;р.</p>
                </div>
                 <div class="amount">
                    <button class="quantity-decrease">-</button>
                        <span class="amount-number">${item.inCart}</span>
                    <button class="quantity-increase">+</button>
                </div>
                <div class="total">
                    <p>${item.price * item.inCart}&nbsp;р.</p>
                </div> 
            </div>
            `;
        });

        orderSection.innerHTML += `
        <h3 class="total-title">Мой заказ</h3>
                <p class="total-article">Итоговая информация</p>
                <div class="amount-total ">
                    <p>Количество</p>
                    <p class="amount-total-number brown ">${totalyItem} шт.</p>
                </div>
                <div class="before-total ">
                    <p>Cумма:</p>
                    <p class="before-total-number brown">${totaly} р.</p>
                </div>
                <div class="sale">
                    <p>Ваша скидка: </p>
                    <p class="after-total-number brown">- ${sale} р.</p>
                </div>
                <div class="total-overall">
                    <p>Итого: </p>
                    <p class="after-overall-number brown">${totaly - sale} р.</p>
                </div>
                <button class="order-button ">Оформить заказ</button>
                <button onclick="location.href='collection.html'" class="back-button ">Вернуться к покупкам</button>
            </div>
        `

        // document.querySelector(".amount-total-number").innerText = totalyItem + ' шт.';
        // document.querySelector(".before-total-number").innerText = totaly + ' р.';
        // let sale = Math.round(totaly * 0.2);
        // sale = sale.toString(10);
        // document.querySelector(".after-total-number").innerText = '- ' + sale + ' р.';
        // document.querySelector(".after-overall-number").innerText = totaly - Math.round(totaly * 0.2) + ' р.';


        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.quantity-decrease');
    let increaseButtons = document.querySelectorAll('.quantity-increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);

            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('h5').textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            console.log(currentProduct);

            if (cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('h5').textContent.toLocaleLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.remove');
    console.log(deleteButtons);
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].previousElementSibling.textContent.toLocaleLowerCase().replace(/ /g, '').trim();

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}



onLoadCartNumbers();
displayCart();