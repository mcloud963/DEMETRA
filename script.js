// Данные товаров (в реальном приложении будут браться с сервера)
let products = [
    {
        id: 1,
        name: "React Admin Panel",
        description: "Полнофункциональная панель администратора на React",
        price: "$49.99",
        category: "Программы",
        image: "fa-react"
    },
    {
        id: 2,
        name: "UI Kit для Figma",
        description: "Современный дизайн-система компонентов",
        price: "$29.99",
        category: "Дизайн",
        image: "fa-figma"
    },
    {
        id: 3,
        name: "Курс по JavaScript",
        description: "Полный курс от основ до продвинутого уровня",
        price: "$99.99",
        category: "Обучение",
        image: "fa-js"
    },
    {
        id: 4,
        name: "3D Модель здания",
        description: "Детализированная модель для архитектурной визуализации",
        price: "$79.99",
        category: "3D Модели",
        image: "fa-cube"
    }
];

// Загрузка товаров на главную страницу
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fab ${product.image}"></i>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <p class="product-description">${product.description}</p>
                <div class="product-category">${product.category}</div>
                <button class="btn btn-primary" onclick="viewProduct(${product.id})">Подробнее</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Загрузка товаров в дашборде
function loadDashboardProducts() {
    const tableBody = document.querySelector('.products-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>
                <div class="actions">
                    <button class="action-btn edit-btn" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i> Изменить
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> Удалить
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Функции для работы с товарами
function viewProduct(id) {
    alert(`Просмотр товара ${id}`);
    // В реальном приложении: переход на страницу товара
}

function editProduct(id) {
    alert(`Редактирование товара ${id}`);
    // В реальном приложении: открытие формы редактирования
}

function deleteProduct(id) {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
        products = products.filter(p => p.id !== id);
        loadDashboardProducts();
        alert('Товар удален!');
    }
}

// Добавление нового товара
function addProduct(event) {
    event.preventDefault();
    
    const form = event.target;
    const newProduct = {
        id: products.length + 1,
        name: form.querySelector('#productName').value,
        description: form.querySelector('#productDescription').value,
        price: form.querySelector('#productPrice').value,
        category: form.querySelector('#productCategory').value,
        image: getImageForCategory(form.querySelector('#productCategory').value)
    };
    
    products.push(newProduct);
    alert('Товар успешно добавлен!');
    form.reset();
    window.location.href = 'dashboard.html';
}

function getImageForCategory(category) {
    const images = {
        'Программы': 'fa-code',
        'Дизайн': 'fa-palette',
        'Обучение': 'fa-graduation-cap',
        '3D Модели': 'fa-cube'
    };
    return images[category] || 'fa-box';
}

// Регистрация
function register(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    const confirmPassword = form.querySelector('#confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }
    
    // Сохранение в localStorage (в реальном приложении - отправка на сервер)
    const user = {
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    alert('Регистрация успешна!');
    window.location.href = 'dashboard.html';
}

// Вход
function login(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;
    
    // В реальном приложении - проверка на сервере
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === email && user.password === password) {
            alert('Вход выполнен успешно!');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
            return;
        }
    }
    
    alert('Неверный email или пароль!');
}

// Проверка авторизации
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;
    
    // Если пользователь не авторизован и пытается зайти в дашборд
    if ((currentPage.includes('dashboard.html') || currentPage.includes('add-product.html')) 
        && !isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadDashboardProducts();
    checkAuth();
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Форма регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
    
    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }
    
    // Форма добавления товара
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', addProduct);
    }
});
