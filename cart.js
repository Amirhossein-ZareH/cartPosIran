const cartItems = [
    { id: 1, name: "تی‌شرت", price: 250000, quantity: 1 },
    { id: 2, name: "شلوار جین", price: 450000, quantity: 1 },
    { id: 3, name: "کفش ورزشی", price: 800000, quantity: 1 },
];

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    // فقط آیتم هایی که تعداد آن ها بیشتر از صفر است را نمایش می دهیم
    cartItems.filter(item => item.quantity > 0).forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${item.price.toLocaleString()} تومان</span>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="delete-btn" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    updateTotal();
    updateTotalItems();
}

function updateQuantity(id, change) {
    const item = cartItems.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(0, item.quantity + change);
        // اگر تعداد به صفر رسید، آیتم را از لیست حذف کن
        if (item.quantity === 0) {
            deleteItem(id);
        }
        renderCart();
    }
}

function deleteItem(id) {
    const index = cartItems.findIndex(item => item.id === id);
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart();
    }
}

function updateTotal() {
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total-price').textContent = totalPrice.toLocaleString();
}

function updateTotalItems() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('total-items').textContent = totalItems;
}


renderCart();
