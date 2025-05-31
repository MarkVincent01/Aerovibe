// Get DOM elements
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// Debug logs
console.log('Sidebar elements:', {
    sidebarToggle,
    sidebar,
    closeSidebar,
    sidebarOverlay
});

// Function to open sidebar
function openSidebar() {
    console.log('Opening sidebar');
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
}

// Function to close sidebar
function closeSidebarMenu() {
    console.log('Closing sidebar');
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Event listeners
if (sidebarToggle) {
    console.log('Adding click listener to sidebar toggle');
    sidebarToggle.addEventListener('click', openSidebar);
}

if (closeSidebar) {
    console.log('Adding click listener to close button');
    closeSidebar.addEventListener('click', closeSidebarMenu);
}

if (sidebarOverlay) {
    console.log('Adding click listener to overlay');
    sidebarOverlay.addEventListener('click', closeSidebarMenu);
}

// Close sidebar when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
        closeSidebarMenu();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Check if sidebar was already added (to prevent conflicts with other js files)
    if (!document.querySelector('.sidebar')) {
        // Create and append sidebar to the body
        const sidebar = document.createElement('div');
        sidebar.className = 'sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-content">
                <div class="sidebar-header">
                    <i class="fas fa-times close-sidebar"></i>
                </div>
                <ul class="sidebar-menu">
                    <li><a href="index.html">HOME</a></li>
                    <li><a href="main_shop.html">SHOP</a></li>
                    <li><a href="new_arrival.html">MENS</a></li>
                    <li><a href="womens_new_arrival.html">WOMENS</a></li>
                    <li><a href="kids_new_arrival.html">KIDS</a></li>
                    <li><a href="CART_PAGE.html">CART</a></li>
                    <li><a href="customer_service.html">CUSTOMER SERVICE</a></li>
                    <li><a href="about_us.html">ABOUT US</a></li>
                    <li><a href="contact_us.html">CONTACT US</a></li>
                    
                </ul>
            </div>
        `;
        document.body.appendChild(sidebar);
    }
    
    // Add click event listener to menu button
    const menuButton = document.querySelector('.menu-icon-container');
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('.sidebar').classList.add('active');
        });
    }
    
    // Toggle sidebar
    const closeIcon = document.querySelector('.close-sidebar');
    if (closeIcon) {
        closeIcon.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.remove('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const menuIcon = document.querySelector('.menu-icon-container');
        
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            menuIcon && !menuIcon.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
}); 