// Function to handle product navigation
function navigateToProduct(productData) {
    // Store the product data in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(productData));
    // Navigate to the product detail page
    window.location.href = 'solo_product.html';
}

// Function to create product data object from a product card
function createProductData(card) {
    return {
        image: card.querySelector('.product-image')?.src || '',
        name: card.querySelector('.product-name')?.textContent || '',
        brand: card.querySelector('.product-brand')?.textContent || '',
        price: card.querySelector('.current-price')?.textContent || card.querySelector('.product-price')?.textContent || '',
        originalPrice: card.querySelector('.original-price')?.textContent || null,
        sizes: Array.from(card.querySelectorAll('.size-option')).map(opt => opt.textContent),
        material: card.querySelector('[data-spec="material"]')?.textContent || 'Premium Quality Material',
        care: card.querySelector('[data-spec="care"]')?.textContent || 'Follow care label instructions',
        style: card.querySelector('[data-spec="style"]')?.textContent || 'Contemporary Fashion',
        origin: card.querySelector('[data-spec="origin"]')?.textContent || 'Philippines',
        description: card.querySelector('[data-spec="description"]')?.textContent || 
            `${card.querySelector('.product-name')?.textContent} by ${card.querySelector('.product-brand')?.textContent}. A premium quality product that combines style and comfort.`
    };
}

// Add click event listeners to all product cards
document.addEventListener('DOMContentLoaded', function() {
    // Handle product card clicks
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons or quick view link
            if (e.target.closest('.add-to-cart-btn') || 
                e.target.closest('.buy-now-btn') ||
                e.target.closest('.quick-view-btn')) {
                return;
            }
            const productData = createProductData(card);
            navigateToProduct(productData);
        });
    });

    // Handle quick view button clicks
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const productData = createProductData(card);
            navigateToProduct(productData);
        });
    });
}); 