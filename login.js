document.addEventListener('DOMContentLoaded', function() {
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

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchIcon = document.querySelector('.search-container i');

    searchIcon.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
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

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.querySelector('input[name="remember"]').checked;

            // Get saved users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Save login state
                localStorage.setItem('currentUser', JSON.stringify({
                    email: user.email,
                    name: user.name,
                    isLoggedIn: true
                }));

                // If remember me is checked, save for 30 days
                if (remember) {
                    const expiryDate = new Date();
                    expiryDate.setDate(expiryDate.getDate() + 30);
                    localStorage.setItem('loginExpiry', expiryDate.toISOString());
                }

                showNotification('Login successful!');
                setTimeout(() => {
                    window.location.href = 'account.html';
                }, 1000);
            } else {
                showNotification('Invalid email or password', true);
            }
        });
    }

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');

    googleBtn.addEventListener('click', () => {
        showNotification('Google login coming soon!');
    });

    facebookBtn.addEventListener('click', () => {
        showNotification('Facebook login coming soon!');
    });

    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Password reset feature coming soon!');
    });
});

// Notification function
function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    if (isError) {
        notification.style.backgroundColor = 'rgba(220, 53, 69, 0.9)';
    }
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