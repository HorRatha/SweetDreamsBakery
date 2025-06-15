// Loading screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
        }, 1000);
    }
});

// Cake data with image data
const cakes = [
    {
        id: 1,
        name: "Chocolate Paradise",
        description: "Rich chocolate layers with smooth ganache and decadent cocoa flavor that melts in your mouth.",
        price: 45.99,
        tags: ["Birthday", "Chocolate"],
        emoji: "🍫",
        imageData: "./image/1.png"
    },
    {
        id: 2,
        name: "Vanilla Dreams",
        description: "Classic vanilla sponge with fresh strawberries and whipped cream, light and airy.",
        price: 39.99,
        tags: ["Wedding", "Vanilla"],
        emoji: "🍓",
        imageData: "./image/Vanilla_Dreams.png"
    },
    {
        id: 3,
        name: "Red Velvet Delight",
        description: "Moist red velvet with cream cheese frosting and elegant finish, a true classic.",
        price: 42.99,
        tags: ["Anniversary", "Red Velvet"],
        emoji: "❤️",
        imageData: "./image/3.png"
    },
    {
        id: 4,
        name: "Lemon Burst",
        description: "Zesty lemon cake with tangy frosting and citrus zest, refreshing and bright.",
        price: 38.99,
        tags: ["Summer", "Citrus"],
        emoji: "🍋",
        imageData: "./image/4.png"
    },
    {
        id: 5,
        name: "Caramel Supreme",
        description: "Decadent caramel layers with sea salt and buttery goodness, rich and indulgent.",
        price: 48.99,
        tags: ["Gourmet", "Caramel"],
        emoji: "🍯",
        imageData: "./image/5.png"
    },
    {
        id: 6,
        name: "Berry Bliss",
        description: "Mixed berry cake with whipped cream and fresh fruit, naturally sweet and healthy.",
        price: 41.99,
        tags: ["Healthy", "Berry"],
        emoji: "🫐",
        imageData: "./image/6.png"
    },
    {
        id: 7,
        name: "Tiramisu Tower",
        description: "Italian classic with coffee, mascarpone and ladyfingers, sophisticated and elegant.",
        price: 52.99,
        tags: ["Gourmet", "Coffee"],
        emoji: "☕",
        imageData: "./image/7.png"
    },
    {
        id: 8,
        name: "Coconut Cloud",
        description: "Tropical coconut cake with lime zest and exotic flavors, transport to paradise.",
        price: 44.99,
        tags: ["Summer", "Tropical"],
        emoji: "🥥",
        imageData: "./image/8.png"
    },
    {
        id: 9,
        name: "Black Forest Wonder",
        description: "Traditional German cake with cherries and whipped cream, authentic and delicious.",
        price: 46.99,
        tags: ["Gourmet", "Cherry"],
        emoji: "🍒",
        imageData: "./image/9.png"
    },
    {
        id: 10,
        name: "Matcha Zen",
        description: "Japanese green tea cake with delicate matcha flavor, zen-like tranquility in every bite.",
        price: 43.99,
        tags: ["Healthy", "Matcha"],
        emoji: "🍵",
        imageData: "./image/10.png"
    },
    {
        id: 11,
        name: "Strawberry Cheesecake",
        description: "Creamy cheesecake with fresh strawberry topping, the perfect balance of sweet and tangy.",
        price: 47.99,
        tags: ["Birthday", "Cheesecake"],
        emoji: "🍰",
        imageData: "./image/11.png"
    },
    {
        id: 12,
        name: "Carrot Garden",
        description: "Moist carrot cake with cream cheese frosting and walnut pieces, homestyle comfort.",
        price: 40.99,
        tags: ["Healthy", "Carrot"],
        emoji: "🥕",
        imageData: "./image/12.png"
    }
];

// Cart state - with persistent storage
let cart = [];
let filteredCakes = [...cakes];
let visibleCount = 8;

// Cart storage functions with fallback support
function saveCartToStorage() {
    try {
        // Save to browser storage for persistence across pages
        if (typeof(Storage) !== "undefined") {
            const cartData = JSON.stringify(cart);
            if (cartData !== "undefined") {
                sessionStorage.setItem('cakeShopCart', cartData);
            }
        }
    } catch (e) {
        console.warn('Could not save cart to storage:', e);
    }
}

function loadCartFromStorage() {
    try {
        if (typeof(Storage) !== "undefined") {
            const savedCart = sessionStorage.getItem('cakeShopCart');
            if (savedCart && savedCart !== "undefined") {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    cart = parsedCart;
                    return true;
                }
            }
        }
    } catch (e) {
        console.warn('Could not load cart from storage:', e);
    }
    return false;
}

// Theme storage functions
function saveThemeToStorage(theme) {
    try {
        // Use localStorage for theme persistence across sessions
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('theme', theme);
        }
    } catch (e) {
        console.warn('Could not save theme to storage:', e);
    }
}

function loadThemeFromStorage() {
    try {
        if (typeof(Storage) !== "undefined") {
            return localStorage.getItem('theme');
        }
    } catch (e) {
        console.warn('Could not load theme from storage:', e);
    }
    return null;
}

// DOM elements - with null checks
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const cardsGrid = document.getElementById('cardsGrid');
const seeMoreBtn = document.getElementById('seeMoreBtn');
const noResults = document.getElementById('noResults');
const cartBadge = document.getElementById('cartBadge');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Create cake card HTML
// function createCakeCard(cake) {
//     const hasImage = cake.imageData && cake.imageData.trim() !== '';
    
//     return `
//         <div class="col-xl-3 col-lg-4 col-md-6 col-12">
//             <div class="card cake-card card-fixed-height" data-id="${cake.id}" onclick="openCakeDetail(${cake.id})" style="cursor: pointer;">
//                 <div class="cake-image">
//                     ${hasImage ? 
//                         `<img src="${cake.imageData}" alt="${cake.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
//                          <div class="cake-emoji" style="display: none;">${cake.emoji}</div>` :
//                         `<div class="cake-emoji">${cake.emoji}</div>`
//                     }
//                 </div>
//                 <div class="card-body d-flex flex-column">
//                     <h5 class="card-title fw-bold mb-2">${cake.name}</h5>
//                     <p class="card-text flex-grow-1 small text-muted">${cake.description}</p>
//                     <div class="mb-3">
//                         ${cake.tags.map(tag => `<span class="badge cake-tag me-1 mb-1 px-2 py-1">${tag}</span>`).join('')}
//                     </div>
//                     <div class="d-flex justify-content-between align-items-center mt-auto">
//                         <span class="price-text">$${cake.price.toFixed(2)}</span>
//                         <button class="btn btn-chocolate btn-sm px-3" onclick="event.stopPropagation(); addToCart(${cake.id})">
//                             <i class="fas fa-shopping-cart me-1"></i>Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

function createCakeCard(cake) {
    const hasImage = cake.imageData && cake.imageData.trim() !== '';

    return `
        <div class="col-xl-4 col-lg-4 col-md-6 col-12">
            <div class="card cake-card card-fixed-height" data-id="${cake.id}" onclick="openCakeDetail(${cake.id})" style="cursor: pointer;">
                <div class="cake-image">
                    ${hasImage ? 
                        `<img src="${cake.imageData}" alt="${cake.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                         <div class="cake-emoji" style="display: none;">${cake.emoji}</div>` :
                        `<div class="cake-emoji">${cake.emoji}</div>`
                    }
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold mb-2">${cake.name}</h5>
                    <p class="card-text flex-grow-1 small text-muted">${cake.description}</p>
                    <div class="mb-3">
                        ${cake.tags.map(tag => `<span class="badge cake-tag me-1 mb-1 px-2 py-1">${tag}</span>`).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="price-text">$${cake.price.toFixed(2)}</span>
                        <button class="btn btn-chocolate btn-sm px-3" onclick="event.stopPropagation(); addToCart(${cake.id})">
                            <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// Cake detail modal function
function openCakeDetail(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (!cake) return;

    const hasImage = cake.imageData && cake.imageData.trim() !== '';
    
    // Create modal HTML if it doesn't exist
    let detailModal = document.getElementById('cakeDetailModal');
    if (!detailModal) {
        detailModal = document.createElement('div');
        detailModal.className = 'modal fade';
        detailModal.id = 'cakeDetailModal';
        detailModal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold" id="cakeDetailTitle"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="cake-detail-image" id="cakeDetailImage"></div>
                            </div>
                            <div class="col-md-6">
                                <div class="cake-detail-info">
                                    <p class="cake-detail-description" id="cakeDetailDescription"></p>
                                    <div class="cake-detail-tags mb-3" id="cakeDetailTags"></div>
                                    <div class="cake-detail-price mb-3">
                                        <span class="h4 fw-bold text-primary" id="cakeDetailPrice"></span>
                                    </div>
                                    <div class="cake-detail-actions">
                                        <button class="btn btn-chocolate btn-lg w-100" id="cakeDetailAddToCart">
                                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(detailModal);
    }

    // Update modal content
    document.getElementById('cakeDetailTitle').textContent = cake.name;
    document.getElementById('cakeDetailDescription').textContent = cake.description;
    document.getElementById('cakeDetailPrice').textContent = `$${cake.price.toFixed(2)}`;
    
    // Update image
    const imageContainer = document.getElementById('cakeDetailImage');
    imageContainer.innerHTML = hasImage ? 
        `<img src="${cake.imageData}" alt="${cake.name}" class="img-fluid rounded" style="width: 100%; height: 300px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
         <div class="cake-detail-emoji" style="display: none; font-size: 8rem; text-align: center; padding: 2rem;">${cake.emoji}</div>` :
        `<div class="cake-detail-emoji" style="font-size: 8rem; text-align: center; padding: 2rem;">${cake.emoji}</div>`;
    
    // Update tags
    const tagsContainer = document.getElementById('cakeDetailTags');
    tagsContainer.innerHTML = cake.tags.map(tag => 
        `<span class="badge cake-tag me-2 mb-2 px-3 py-2">${tag}</span>`
    ).join('');
    
    // Update add to cart button
    const addToCartBtn = document.getElementById('cakeDetailAddToCart');
    addToCartBtn.onclick = () => {
        addToCart(cake.id);
        bootstrap.Modal.getInstance(detailModal).hide();
    };

    // Show modal
    new bootstrap.Modal(detailModal).show();
}

// Cart functions
function addToCart(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    if (!cake) return;
    
    const existingItem = cart.find(item => item.id === cakeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...cake,
            quantity: 1
        });
    }
    
    saveCartToStorage(); // Save cart after adding item
    updateCartBadge();
    showNotification(`${cake.name} added to cart!`);
}

function removeFromCart(cakeId) {
    cart = cart.filter(item => item.id !== cakeId);
    saveCartToStorage(); // Save cart after removing item
    updateCartBadge();
    renderCart();
    showNotification('Item removed from cart!', 'removed');
}

function updateQuantity(cakeId, change) {
    const item = cart.find(item => item.id === cakeId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(cakeId);
        } else {
            saveCartToStorage(); // Save cart after updating quantity
            updateCartBadge();
            renderCart();
        }
    }
}

function updateCartBadge() {
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function openCart() {
    renderCart();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        new bootstrap.Modal(cartModal).show();
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const totalAmount = document.getElementById('totalAmount');

    if (!cartItems || !emptyCart || !cartTotal || !checkoutBtn || !totalAmount) return;

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.style.display = 'block';
        cartTotal.style.display = 'none';
        checkoutBtn.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartTotal.style.display = 'block';
    checkoutBtn.style.display = 'block';

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `${total.toFixed(2)}`;

    cartItems.innerHTML = cart.map(item => {
        const hasImage = item.imageData && item.imageData.trim() !== '';
        return `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        ${hasImage ? 
                            `<img src="${item.imageData}" alt="${item.name}" class="cart-item-image">` :
                            `<div class="cart-item-emoji">${item.emoji}</div>`
                        }
                    </div>
                    <div class="col-4">
                        <h6 class="mb-1 fw-bold">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} each</small>
                    </div>
                    <div class="col-3">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="fw-bold text-end">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="col-1">
                        <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Remove item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function checkout() {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Order placed! Total: $${total.toFixed(2)}`, 'success');
    cart = [];
    saveCartToStorage(); // Clear cart from storage
    updateCartBadge();
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        bootstrap.Modal.getInstance(cartModal).hide();
    }
}

// Enhanced notification function with better mobile support
function showNotification(message, type = 'success') {
    if (!notification || !notificationText) return;
    
    // Clear any existing timeouts
    if (window.notificationTimeout) {
        clearTimeout(window.notificationTimeout);
    }
    
    // Force hide first (important for mobile)
    notification.classList.remove('show');
    
    // Small delay to ensure the hide animation completes
    setTimeout(() => {
        notificationText.textContent = message;
        
        // Change notification style based on type
        if (type === 'removed') {
            notification.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
            const icon = notification.querySelector('i');
            if (icon) icon.className = 'fas fa-trash me-2';
        } else if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            const icon = notification.querySelector('i');
            if (icon) icon.className = 'fas fa-check-circle me-2';
        } else {
            notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            const icon = notification.querySelector('i');
            if (icon) icon.className = 'fas fa-check-circle me-2';
        }
        
        // Show notification
        notification.classList.add('show');
        
        // Hide after delay with better mobile support
        window.notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
            // Force reflow on mobile devices
            if (window.innerWidth <= 768) {
                notification.offsetHeight; // Force reflow
            }
        }, 3000);
    }, 100);
}

// Enhanced theme toggle with better storage handling
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        saveThemeToStorage('light');
    } else {
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        saveThemeToStorage('dark');
    }
}

// Enhanced theme loading with fallback
function loadTheme() {
    const savedTheme = loadThemeFromStorage();
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
}

// Filter and sort functions
function filterAndSortCakes() {
    if (!searchInput || !categoryFilter || !sortFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const sortBy = sortFilter.value;

    // Filter
    filteredCakes = cakes.filter(cake => {
        const matchesSearch = cake.name.toLowerCase().includes(searchTerm) ||
                            cake.description.toLowerCase().includes(searchTerm) ||
                            cake.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || cake.tags.includes(category);
        
        return matchesSearch && matchesCategory;
    });

    // Sort
    filteredCakes.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    visibleCount = 8;
    renderCakes();
}

// Render cakes
function renderCakes() {
    if (!cardsGrid) return;
    
    const cakesToShow = filteredCakes.slice(0, visibleCount);
    
    if (filteredCakes.length === 0) {
        if (noResults) noResults.style.display = 'block';
        cardsGrid.style.display = 'none';
        if (seeMoreBtn) seeMoreBtn.style.display = 'none';
        return;
    }

    if (noResults) noResults.style.display = 'none';
    cardsGrid.style.display = 'flex';
    cardsGrid.innerHTML = cakesToShow.map(createCakeCard).join('');
    
    // Show/hide see more button
    if (seeMoreBtn) {
        seeMoreBtn.style.display = filteredCakes.length > visibleCount ? 'inline-block' : 'none';
    }

    // Add scroll animations
    observeElements();
}

// Show more cakes
function showMore() {
    visibleCount += 8;
    renderCakes();
}

// Scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .cake-card').forEach(el => {
        observer.observe(el);
    });
}

// Event listeners - with null checks
function initializeEventListeners() {
    if (searchInput) searchInput.addEventListener('input', filterAndSortCakes);
    if (categoryFilter) categoryFilter.addEventListener('change', filterAndSortCakes);
    if (sortFilter) sortFilter.addEventListener('change', filterAndSortCakes);
    if (seeMoreBtn) seeMoreBtn.addEventListener('click', showMore);
}

// Enhanced initialization function
function initializePage() {
    loadTheme(); // Load saved theme
    loadCartFromStorage(); // Load saved cart data
    initializeEventListeners();
    
    // Only render cakes if we're on a page that has the cake grid
    if (cardsGrid) {
        renderCakes();
        observeElements();
    }
    
    updateCartBadge(); // Always update cart badge on all pages
}

// Enhanced DOMContentLoaded initialization
document.addEventListener('DOMContentLoaded', initializePage);
document.addEventListener('DOMContentLoaded', function() {
    loadTheme(); // Load saved theme
    initializeEventListeners();
    renderCakes();
    observeElements();
    updateCartBadge();
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Enhanced dark theme styles with better modal support
const darkThemeStyles = `
    .dark-theme {
        --chocolate-dark: #f5f5f5;
        --chocolate-medium: #e0e0e0;
        --chocolate-light: #cccccc;
        --vanilla: #2d2d2d;
        --strawberry: #ff69b4;
        --cream: #1a1a1a;
    }
    
    .dark-theme body {
        background-color: var(--cream);
        color: var(--chocolate-dark);
    }
    
    .dark-theme .navbar {
        background: rgba(45, 45, 45, 0.95);
    }
    
    .dark-theme .filter-card,
    .dark-theme .cake-card {
        background: var(--vanilla);
        border-color: var(--chocolate-light);
    }
    
    .dark-theme .search-input,
    .dark-theme .filter-select {
        background: var(--cream);
        color: var(--chocolate-dark);
        border-color: var(--chocolate-light);
    }
    
    .dark-theme .cart-item {
        background: var(--cream);
        border-color: var(--chocolate-light);
    }
    
    .dark-theme .cart-total {
        background: var(--vanilla);
        border-color: var(--chocolate-light);
    }
    
    .dark-theme .modal-content {
        background: var(--vanilla);
        color: var(--chocolate-dark);
    }
    
    .dark-theme .modal-header {
        border-color: var(--chocolate-light);
    }
    
    .dark-theme .btn-close {
        filter: invert(1);
    }
`;

// Enhanced notification styles for better mobile and cross-browser support
const notificationStyles = `
    /* Enhanced notification styles for better mobile support */
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 90vw;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        opacity: 0;
        border-radius: 8px;
        padding: 12px 16px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    /* Mobile specific notification styles */
    @media (max-width: 768px) {
        .notification {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100%);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
    
    /* Ensure proper stacking above Bootstrap modals */
    .notification {
        z-index: 9999;
    }
`;

// Add all styles to head with better organization
const styleSheet = document.createElement('style');
styleSheet.textContent = darkThemeStyles + notificationStyles;
document.head.appendChild(styleSheet);