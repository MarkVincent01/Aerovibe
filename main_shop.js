document.addEventListener('DOMContentLoaded', function() {
    // Products data
    const products = [
        {
            id: 1,
            name: "Classic White Sneakers",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
            description: "Comfortable and stylish white sneakers for everyday wear",
            category: "Footwear"
        },
        {
            id: 2,
            name: "Leather Backpack",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
            description: "Premium leather backpack with multiple compartments",
            category: "Accessories"
        },
        {
            id: 3,
            name: "Smart Watch",
            price: 199.99,
            image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
            description: "Feature-rich smartwatch with health tracking",
            category: "Electronics"
        },
        {
            id: 4,
            name: "Wireless Headphones",
            price: 149.99,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
            description: "Noise-cancelling wireless headphones with premium sound",
            category: "Electronics"
        },
        {
            id: 5,
            name: "Designer Sunglasses",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
            description: "Stylish UV protection sunglasses",
            category: "Accessories"
        },
        {
            id: 6,
            name: "Running Shoes",
            price: 119.99,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
            description: "Lightweight running shoes with superior cushioning",
            category: "Footwear"
        }
    ];

    const productsContainer = document.getElementById('productsContainer');

    // Function to check if product is in wishlist
    function isInWishlist(productId) {
        const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
        return wishlistItems.some(item => item.id === productId);
    }

    // Function to toggle wishlist status
    function toggleWishlist(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
            
            if (isInWishlist(productId)) {
                // Remove from wishlist
                wishlistItems = wishlistItems.filter(item => item.id !== productId);
                showNotification('Product removed from wishlist!');
            } else {
                // Add to wishlist
                wishlistItems.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    category: product.category
                });
                showNotification('Product added to wishlist!');
            }
            
            // Save updated wishlist
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            
            // Update wishlist button appearance
            const wishlistBtn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
            if (wishlistBtn) {
                wishlistBtn.classList.toggle('in-wishlist');
            }

            // Update wishlist count if it exists
            const wishlistCount = document.querySelector('.wishlist-count');
            if (wishlistCount) {
                wishlistCount.textContent = wishlistItems.length;
            }
        }
    }

    // Function to display products
    function displayProducts() {
        productsContainer.innerHTML = `
            <div class="product-gallery">
                ${products.map(product => `
                    <div class="product-card" data-id="${product.id}">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}">
                            <button class="wishlist-btn ${isInWishlist(product.id) ? 'in-wishlist' : ''}" 
                                    data-product-id="${product.id}"
                                    onclick="window.toggleWishlist(${product.id})"
                                    title="${isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}">
                                <i class="fas fa-heart"></i>
                            </button>
                        </div>
                        <div class="product-info">
                            <span class="product-category">${product.category}</span>
                            <h3 class="product-name">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <button class="add-to-cart" onclick="window.addToCart(${product.id})">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Function to add to cart
    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItem = cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                cartItems.push({
                    ...product,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                cartCount.textContent = cartItems.length;
            }
            
            showNotification('Product added to cart!');
        }
    };

    // Make toggleWishlist available globally
    window.toggleWishlist = toggleWishlist;

    // Initial display of products
    displayProducts();
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 