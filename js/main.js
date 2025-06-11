
        // Loading screen
        window.addEventListener('load', function() {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
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

        // Cart state
        let cart = [];
        let filteredCakes = [...cakes];
        let visibleCount = 8;
        let currentEditingId = null;

        // DOM elements
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
        function createCakeCard(cake) {
            const hasImage = cake.imageData && cake.imageData.trim() !== '';
            
            return `
                <div class="col-xl-3 col-lg-4 col-md-6 col-12">
                    <div class="card cake-card card-fixed-height" data-id="${cake.id}">
                        <div class="cake-image" onclick="openImageModal(${cake.id})">
                            ${hasImage ? 
                                `<img src="${cake.imageData}" alt="${cake.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                                 <div class="cake-emoji" style="display: none;">${cake.emoji}</div>` :
                                `<div class="cake-emoji">${cake.emoji}</div>`
                            }
                            <div class="position-absolute top-0 end-0 p-2">
                                <button class="btn btn-sm btn-light rounded-circle" onclick="event.stopPropagation(); openImageModal(${cake.id})" title="Add/Change Image">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title fw-bold mb-2">${cake.name}</h5>
                            <p class="card-text flex-grow-1 small text-muted">${cake.description}</p>
                            <div class="mb-3">
                                ${cake.tags.map(tag => `<span class="badge cake-tag me-1 mb-1 px-2 py-1">${tag}</span>`).join('')}
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <span class="price-text">$${cake.price.toFixed(2)}</span>
                                <button class="btn btn-chocolate btn-sm px-3" onclick="addToCart(${cake.id})">
                                    <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Cart functions
        function addToCart(cakeId) {
            const cake = cakes.find(c => c.id === cakeId);
            const existingItem = cart.find(item => item.id === cakeId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...cake,
                    quantity: 1
                });
            }
            
            updateCartBadge();
            showNotification(`${cake.name} added to cart!`);
        }

        function removeFromCart(cakeId) {
            cart = cart.filter(item => item.id !== cakeId);
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
                    updateCartBadge();
                    renderCart();
                }
            }
        }

        function updateCartBadge() {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartBadge.textContent = totalItems;
            cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
        }

        function openCart() {
            renderCart();
            new bootstrap.Modal(document.getElementById('cartModal')).show();
        }

        function renderCart() {
            const cartItems = document.getElementById('cartItems');
            const emptyCart = document.getElementById('emptyCart');
            const cartTotal = document.getElementById('cartTotal');
            const checkoutBtn = document.getElementById('checkoutBtn');
            const totalAmount = document.getElementById('totalAmount');

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
                                <small class="text-muted">${item.price.toFixed(2)} each</small>
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
                                <div class="fw-bold text-end">${(item.price * item.quantity).toFixed(2)}</div>
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
            showNotification(`Order placed! Total: ${total.toFixed(2)}`, 'success');
            cart = [];
            updateCartBadge();
            bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
        }

        function showNotification(message, type = 'success') {
            notificationText.textContent = message;
            
            // Change notification style based on type
            if (type === 'removed') {
                notification.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
                notification.querySelector('i').className = 'fas fa-trash me-2';
            } else if (type === 'success') {
                notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                notification.querySelector('i').className = 'fas fa-check-circle me-2';
            } else {
                notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                notification.querySelector('i').className = 'fas fa-check-circle me-2';
            }
            
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Theme toggle
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            
            if (body.classList.contains('dark-theme')) {
                body.classList.remove('dark-theme');
                themeIcon.className = 'fas fa-moon';
            } else {
                body.classList.add('dark-theme');
                themeIcon.className = 'fas fa-sun';
            }
        }

        // Filter and sort functions
        function filterAndSortCakes() {
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
            const cakesToShow = filteredCakes.slice(0, visibleCount);
            
            if (filteredCakes.length === 0) {
                noResults.style.display = 'block';
                cardsGrid.style.display = 'none';
                seeMoreBtn.style.display = 'none';
                return;
            }

            noResults.style.display = 'none';
            cardsGrid.style.display = 'flex';
            cardsGrid.innerHTML = cakesToShow.map(createCakeCard).join('');
            
            // Show/hide see more button
            seeMoreBtn.style.display = filteredCakes.length > visibleCount ? 'inline-block' : 'none';

            // Add scroll animations
            observeElements();
        }

        // Show more cakes
        function showMore() {
            visibleCount += 8;
            renderCakes();
        }

        // Image modal functions
        function openImageModal(cakeId) {
            currentEditingId = cakeId;
            document.getElementById('imageFile').value = '';
            document.getElementById('imagePreview').style.display = 'none';
            new bootstrap.Modal(document.getElementById('imageModal')).show();
        }

        function previewImage(input) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('previewImg').src = e.target.result;
                    document.getElementById('imagePreview').style.display = 'block';
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        function saveImage() {
            if (currentEditingId) {
                const fileInput = document.getElementById('imageFile');
                if (fileInput.files && fileInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const cake = cakes.find(c => c.id === currentEditingId);
                        if (cake) {
                            cake.imageData = e.target.result;
                            renderCakes();
                            showNotification('Image updated successfully!');
                        }
                    };
                    reader.readAsDataURL(fileInput.files[0]);
                }
                bootstrap.Modal.getInstance(document.getElementById('imageModal')).hide();
            }
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

        // Event listeners
        searchInput.addEventListener('input', filterAndSortCakes);
        categoryFilter.addEventListener('change', filterAndSortCakes);
        sortFilter.addEventListener('change', filterAndSortCakes);
        seeMoreBtn.addEventListener('click', showMore);

        // Initial render
        document.addEventListener('DOMContentLoaded', function() {
            renderCakes();
            observeElements();
            updateCartBadge();
        });

        // Smooth scrolling for navigation links
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

        // Add dark theme styles
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
        `;
        
        // Add dark theme styles to head  
        const styleSheet = document.createElement('style');
        styleSheet.textContent = darkThemeStyles;
        document.head.appendChild(styleSheet);
