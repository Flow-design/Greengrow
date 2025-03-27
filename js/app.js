function loadProducts() {
    fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById("product-list");
            productList.innerHTML = "";

            data.forEach(product => {
                let productDiv = document.createElement("div");
                productDiv.classList.add("col-md-4", "mb-4");

                productDiv.innerHTML = `
                    <div class="card h-100 shadow-sm mx-3">
                        <div class="ratio ratio-4x3">
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
                            <button class="btn btn-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error loading products:", error));
}

function updateCartUI() {
    let cartCount = document.getElementById("cart-count");
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = ""; 
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        li.innerHTML = `
            ${item.name} (x${item.quantity})
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">✖</button>
        `;

        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.length;
}

let cart = [];

function addToCart(id, name, price) {
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

function updateCartUI() {
    let cartCount = document.getElementById("cart-count");
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = ""; 
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
    cartCount.innerText = cart.length;
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function toggleCart() {
    document.getElementById("cart-container").classList.toggle("hidden");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    updateCartUI();
    toggleCart();
}

document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
    updateCartUI();
    document.getElementById("cart-btn").addEventListener("click", toggleCart);
    document.getElementById("close-cart").addEventListener("click", toggleCart);
    document.getElementById("checkout-btn").addEventListener("click", checkout);
});
