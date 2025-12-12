

const productsList = document.getElementById('products-list');
const API_URL = 'https://fakestoreapi.com/products';

function render(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product='${JSON.stringify({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image
            })}'>
                Add to cart
            </button>
        </div>
    `;
}


async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        productsList.innerHTML = products.map(render).join('');

     
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', handleAddToCart);
        });

    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        productsList.innerHTML = '<p>Не удалось загрузить товары.</p>';
    }
}

function handleAddToCart(event) {
    const productData = event.target.getAttribute('data-product');
    if (productData) {
        const product = JSON.parse(productData);
       
        const addToCartEvent = new CustomEvent('addToCart', { detail: product });
        window.dispatchEvent(addToCartEvent);
        console.log(`Товар "${product.title}" добавлен в корзину (через Vanilla JS -> Event)`);
    }
}

loadProducts();