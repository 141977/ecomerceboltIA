// Product data
const products = [
    // Camisetas
    {
        id: 1,
        name: "Camiseta Básica Rosa",
        price: 45.90,
        category: "camisetas",
        image: "https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Camiseta básica em algodão macio, perfeita para o dia a dia. Corte moderno e confortável."
    },
    {
        id: 2,
        name: "Camiseta Listrada",
        price: 52.90,
        category: "camisetas",
        image: "https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Camiseta listrada clássica com design atemporal. Ideal para looks casuais e elegantes."
    },
    {
        id: 3,
        name: "Blusa Manga Longa",
        price: 68.90,
        category: "camisetas",
        image: "https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Blusa manga longa em tecido premium. Perfeita para os dias mais frescos."
    },
    {
        id: 4,
        name: "Camiseta Cropped",
        price: 39.90,
        category: "camisetas",
        image: "https://images.pexels.com/photos/5480689/pexels-photo-5480689.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Camiseta cropped moderna e descolada. Ideal para combinar com calças de cintura alta."
    },
    
    // Bermudas
    {
        id: 5,
        name: "Bermuda Jeans Clara",
        price: 89.90,
        category: "bermudas",
        image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Bermuda jeans clara com lavagem especial. Corte moderno e muito confortável."
    },
    {
        id: 6,
        name: "Bermuda Alfaiataria",
        price: 75.90,
        category: "bermudas",
        image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Bermuda de alfaiataria elegante para looks mais sofisticados. Tecido de alta qualidade."
    },
    {
        id: 7,
        name: "Bermuda Estampada",
        price: 65.90,
        category: "bermudas",
        image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Bermuda com estampa tropical vibrante. Perfeita para o verão e dias ensolarados."
    },
    {
        id: 8,
        name: "Bermuda Moletom",
        price: 55.90,
        category: "bermudas",
        image: "https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Bermuda de moletom confortável para atividades físicas e momentos de relaxamento."
    },
    
    // Calças
    {
        id: 9,
        name: "Calça Jeans Skinny",
        price: 129.90,
        category: "calcas",
        image: "https://images.pexels.com/photos/5480854/pexels-photo-5480854.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Calça jeans skinny com elastano para maior conforto. Modelagem que valoriza a silhueta."
    },
    {
        id: 10,
        name: "Calça Wide Leg",
        price: 149.90,
        category: "calcas",
        image: "https://images.pexels.com/photos/5480846/pexels-photo-5480846.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Calça wide leg moderna e elegante. Tendência em alta com muito estilo e conforto."
    },
    {
        id: 11,
        name: "Legging Fitness",
        price: 79.90,
        category: "calcas",
        image: "https://images.pexels.com/photos/4498318/pexels-photo-4498318.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Legging fitness com tecnologia dry-fit. Ideal para exercícios e atividades físicas."
    },
    {
        id: 12,
        name: "Calça Social",
        price: 169.90,
        category: "calcas",
        image: "https://images.pexels.com/photos/5480859/pexels-photo-5480859.jpeg?auto=compress&cs=tinysrgb&w=400",
        description: "Calça social elegante para ambientes profissionais. Tecido de alta qualidade e caimento perfeito."
    }
];

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentFilter = 'all';
let filteredProducts = [...products];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const searchInput = document.getElementById('searchInput');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartCount();
    setupEventListeners();
    updateFavoritesDisplay();
});

// Event listeners setup
function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.filter-btn, [data-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });

    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Cart modal
    cartBtn.addEventListener('click', openCartModal);
    document.getElementById('closeCartModal').addEventListener('click', closeCartModal);
    document.getElementById('clearCart').addEventListener('click', clearCart);

    // Product modal
    document.getElementById('closeProductModal').addEventListener('click', closeProductModal);

    // Search functionality
    searchInput.addEventListener('input', handleSearch);

    // Hero CTA button
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
        if (e.target === productModal) closeProductModal();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCartModal();
            closeProductModal();
            closeMobileMenu();
        }
    });
}

// Filter functionality
function setActiveFilter(filter) {
    currentFilter = filter;
    
    // Update active button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === filter) {
            btn.classList.add('active');
        }
    });

    // Close mobile menu if open
    closeMobileMenu();

    // Filter and render products
    filterProducts();
}

function filterProducts() {
    if (currentFilter === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === currentFilter);
    }
    
    // Apply search filter if there's a search term
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts();
}

function handleSearch() {
    filterProducts();
}

// Product rendering
function renderProducts() {
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3 style="color: #FFD700; margin-bottom: 1rem;">Nenhum produto encontrado</h3>
                <p style="color: rgba(255,255,255,0.8);">Tente ajustar seus filtros ou termos de busca.</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Add animation class
    productsGrid.classList.add('fade-in');
    setTimeout(() => productsGrid.classList.remove('fade-in'), 500);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card scale-in';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <button class="favorite-btn ${favorites.includes(product.id) ? 'favorited' : ''}" 
                    onclick="toggleFavorite(${product.id})" 
                    title="${favorites.includes(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                ${favorites.includes(product.id) ? '❤️' : '🤍'}
            </button>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="openProductDetail(${product.id})">
                    Ver Detalhes
                </button>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCart();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartDisplay();
            saveCart();
        }
    }
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        updateCartDisplay();
        saveCart();
        showNotification('Carrinho limpo!');
    }
}

function updateCartDisplay() {
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
}

function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.6);">
                <p>Seu carrinho está vazio</p>
                <p>Adicione alguns produtos para começar!</p>
            </div>
        `;
        cartTotal.textContent = '0,00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.5rem;">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" 
                            style="background: rgba(255,255,255,0.1); border: none; color: #fff; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">-</button>
                    <span style="color: #FFD700; font-weight: 600;">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" 
                            style="background: rgba(255,255,255,0.1); border: none; color: #fff; width: 30px; height: 30px; border-radius: 50%; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" 
                            style="background: #FF69B4; border: none; color: #000; padding: 0.3rem 0.6rem; border-radius: 15px; cursor: pointer; margin-left: auto;">
                        Remover
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Favorites functionality
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showNotification(`${product.name} removido dos favoritos!`);
    } else {
        favorites.push(productId);
        showNotification(`${product.name} adicionado aos favoritos!`);
    }
    
    saveFavorites();
    updateFavoritesDisplay();
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoritesDisplay() {
    // Update all favorite buttons
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.getAttribute('onclick').match(/\d+/)[0]);
        const isFavorited = favorites.includes(productId);
        
        btn.classList.toggle('favorited', isFavorited);
        btn.innerHTML = isFavorited ? '❤️' : '🤍';
        btn.title = isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
    });
}

// Modal functionality
function openCartModal() {
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderCartItems();
}

function closeCartModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    const favoriteBtn = document.getElementById('modalFavoriteBtn');
    const isFavorited = favorites.includes(productId);
    favoriteBtn.innerHTML = `${isFavorited ? '❤️' : '🤍'} ${isFavorited ? 'Favorito' : 'Favoritar'}`;
    favoriteBtn.onclick = () => toggleFavorite(productId);
    
    document.getElementById('modalAddToCartBtn').onclick = () => {
        addToCart(productId);
        closeProductModal();
    };
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Mobile menu functionality
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    
    if (mobileNav.style.display === 'block') {
        closeMobileMenu();
    } else {
        mobileNav.style.display = 'block';
        mobileNav.style.animation = 'fadeIn 0.3s ease';
    }
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileNav.style.display = 'none';
}

// Notification system
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #FF69B4, #FFD700);
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize search with debouncing
searchInput.addEventListener('input', debounce(handleSearch, 300));

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    // Apply lazy loading to product images when they're created
    const originalCreateProductCard = createProductCard;
    createProductCard = function(product) {
        const card = originalCreateProductCard(product);
        const img = card.querySelector('img');
        img.dataset.src = img.src;
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PC9zdmc+';
        img.classList.add('lazy');
        imageObserver.observe(img);
        return card;
    };
}