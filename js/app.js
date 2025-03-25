function loadProducts() {
    fetch("http://localhost:4000/products") 
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById("product-list");
            productList.innerHTML = "";

            data.forEach(product => {
                let productDiv = document.createElement("div");
                productDiv.classList.add("product");
                
                let button = document.createElement("button");
                button.innerText = "Add to Cart";
                button.addEventListener("click", () => addToCart(product.id, product.name, product.price));

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <span class="price">$${product.price.toFixed(2)}</span>
                `;
                productDiv.appendChild(button);
                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error loading products:", error));
}

