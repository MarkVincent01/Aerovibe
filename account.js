// Profile photo upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImageContainer = document.querySelector('.profile-image-container');
    const profileImage = profileImageContainer.querySelector('img');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Add click event to profile image container
    profileImageContainer.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profileImage.src = e.target.result;
                // Save to localStorage
                localStorage.setItem('profileImage', e.target.result);
                showNotification('Profile photo updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    });

    // Load saved profile image if exists
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }

    // Form submission handling
    const accountForm = document.querySelector('.account-form');
    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get form data
            const formData = new FormData(accountForm);
            const userData = {};
            formData.forEach((value, key) => {
                userData[key] = value;
            });
            
            // Save to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            showNotification('Account information updated successfully!');
        });
    }

    // Load saved user data if exists
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        Object.keys(userData).forEach(key => {
            const input = accountForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = userData[key];
            }
        });
    }

    // Cart count functionality
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
    }

    // Update cart count on page load
    updateCartCount();

    // Sidebar functionality
    const menuIcon = document.querySelector('.menu-icon-container');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');

    menuIcon.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchIcon = document.querySelector('.search-container i');

    searchIcon.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Store search term in localStorage for use in shop page
            localStorage.setItem('searchTerm', searchTerm);
            window.location.href = 'main_shop.html';
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                localStorage.setItem('searchTerm', searchTerm);
                window.location.href = 'main_shop.html';
            }
        }
    });

    // Payment Methods Functionality
    const paymentMethods = document.getElementById('paymentMethods');
    const paymentCards = document.getElementById('paymentCards');
    const addPaymentBtn = document.getElementById('addPaymentBtn');
    const paymentForm = document.getElementById('paymentForm');
    const newPaymentForm = document.getElementById('newPaymentForm');
    const cancelPayment = document.getElementById('cancelPayment');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');

    // Show payment methods when clicking the payment link
    document.querySelector('a[href="#payment"]').addEventListener('click', (e) => {
        e.preventDefault();
        paymentMethods.classList.add('active');
        loadPaymentMethods();
    });

    // Format card number with spaces
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        e.target.value = formattedValue;
    });

    // Format expiry date
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    });

    // Only allow numbers in CVV
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/gi, '');
    });

    // Show payment form
    addPaymentBtn.addEventListener('click', () => {
        paymentForm.classList.add('active');
        newPaymentForm.reset();
    });

    // Hide payment form
    cancelPayment.addEventListener('click', () => {
        paymentForm.classList.remove('active');
    });

    // Handle payment form submission
    newPaymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(newPaymentForm);
        const paymentData = {
            id: Date.now(),
            name: formData.get('cardName'),
            number: formData.get('cardNumber'),
            expiry: formData.get('expiryDate'),
            type: getCardType(formData.get('cardNumber'))
        };

        // Save to localStorage
        const savedPayments = JSON.parse(localStorage.getItem('paymentMethods')) || [];
        savedPayments.push(paymentData);
        localStorage.setItem('paymentMethods', JSON.stringify(savedPayments));

        // Update UI
        loadPaymentMethods();
        paymentForm.classList.remove('active');
        showNotification('Payment method added successfully!');
    });

    // Load saved payment methods
    function loadPaymentMethods() {
        const savedPayments = JSON.parse(localStorage.getItem('paymentMethods')) || [];
        paymentCards.innerHTML = '';

        savedPayments.forEach(payment => {
            const card = createPaymentCard(payment);
            paymentCards.appendChild(card);
        });
    }

    // Create payment card element
    function createPaymentCard(payment) {
        const card = document.createElement('div');
        card.className = 'payment-card';
        card.innerHTML = `
            <div class="payment-card-header">
                <div class="card-type">
                    <i class="fab fa-cc-${payment.type.toLowerCase()}"></i>
                    <span>${payment.type}</span>
                </div>
                <div class="card-actions">
                    <button class="edit" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="card-number">•••• •••• •••• ${payment.number.slice(-4)}</div>
            <div class="card-expiry">Expires ${payment.expiry}</div>
        `;

        // Add edit functionality
        card.querySelector('.edit').addEventListener('click', () => {
            editPaymentMethod(payment);
        });

        // Add delete functionality
        card.querySelector('.delete').addEventListener('click', () => {
            deletePaymentMethod(payment.id);
        });

        return card;
    }

    // Edit payment method
    function editPaymentMethod(payment) {
        paymentForm.classList.add('active');
        document.getElementById('cardName').value = payment.name;
        document.getElementById('cardNumber').value = payment.number;
        document.getElementById('expiryDate').value = payment.expiry;
        
        // Update form submission to handle edit
        newPaymentForm.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(newPaymentForm);
            const updatedPayment = {
                id: payment.id,
                name: formData.get('cardName'),
                number: formData.get('cardNumber'),
                expiry: formData.get('expiryDate'),
                type: getCardType(formData.get('cardNumber'))
            };

            // Update in localStorage
            const savedPayments = JSON.parse(localStorage.getItem('paymentMethods')) || [];
            const index = savedPayments.findIndex(p => p.id === payment.id);
            if (index !== -1) {
                savedPayments[index] = updatedPayment;
                localStorage.setItem('paymentMethods', JSON.stringify(savedPayments));
            }

            // Update UI
            loadPaymentMethods();
            paymentForm.classList.remove('active');
            showNotification('Payment method updated successfully!');
        };
    }

    // Delete payment method
    function deletePaymentMethod(id) {
        if (confirm('Are you sure you want to delete this payment method?')) {
            const savedPayments = JSON.parse(localStorage.getItem('paymentMethods')) || [];
            const updatedPayments = savedPayments.filter(payment => payment.id !== id);
            localStorage.setItem('paymentMethods', JSON.stringify(updatedPayments));
            loadPaymentMethods();
            showNotification('Payment method deleted successfully!');
        }
    }

    // Get card type based on number
    function getCardType(number) {
        number = number.replace(/\s+/g, '');
        if (number.startsWith('4')) return 'Visa';
        if (number.startsWith('5')) return 'Mastercard';
        if (number.startsWith('34') || number.startsWith('37')) return 'American Express';
        if (number.startsWith('6')) return 'Discover';
        return 'Unknown';
    }

    // Profile Information Update
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const orderCount = document.getElementById('orderCount');
    const wishlistCount = document.getElementById('wishlistCount');
    const reviewCount = document.getElementById('reviewCount');
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const settingsBtn = document.querySelector('.settings-btn');

    // Update profile information when form is submitted
    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(accountForm);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });
        
        // Update profile display
        profileName.textContent = `${userData.firstName} ${userData.lastName}`;
        profileEmail.textContent = userData.email;
        
        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        showNotification('Profile information updated successfully!');
    });

    // Load saved profile information
    if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        profileName.textContent = `${userData.firstName} ${userData.lastName}`;
        profileEmail.textContent = userData.email;
        
        // Update form fields
        Object.keys(userData).forEach(key => {
            const input = accountForm.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = userData[key];
            }
        });
    }

    // Update stats from localStorage
    function updateProfileStats() {
        // Get orders count
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orderCount.textContent = orders.length;

        // Get wishlist count
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlistCount.textContent = wishlist.length;

        // Get reviews count
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviewCount.textContent = reviews.length;
    }

    // Update stats on page load
    updateProfileStats();

    // Edit Profile button click
    editProfileBtn.addEventListener('click', () => {
        // Scroll to form
        accountForm.scrollIntoView({ behavior: 'smooth' });
        // Highlight form
        accountForm.style.animation = 'highlight 2s';
    });

    // Settings button click
    settingsBtn.addEventListener('click', () => {
        // Show settings modal or navigate to settings page
        showNotification('Settings feature coming soon!');
    });

    // Add highlight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes highlight {
            0% { background-color: #fff; }
            50% { background-color: #f0f7ff; }
            100% { background-color: #fff; }
        }
    `;
    document.head.appendChild(style);
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 