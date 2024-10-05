let menu = {
    food: [
        {name: 'Burger', price: 10},
        {name: 'Pasta', price: 12},
        {name: 'Pizza', price: 15},
    ],
    drinks: [
        {name: 'Coke', price: 3},
        {name: 'Juice', price: 4},
        {name: 'Coffee', price: 5},
    ],
    desserts: [
        {name: 'Ice Cream', price: 6},
        {name: 'Cake', price: 7},
        {name: 'Pie', price: 8},
    ]
};

let order = [];

function showMenu(category) {
    const menuItemsDiv = document.getElementById('menuItems');
    menuItemsDiv.innerHTML = ''; // Clear previous menu items

    menu[category].forEach(item => {
        let itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');

        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <label for="quantity">Quantity:</label>
            <input type="number" class="quantity" id="${item.name}-quantity" min="1" value="1">
            <button onclick="addToOrder('${item.name}', ${item.price})">Add to Order</button>
        `;

        menuItemsDiv.appendChild(itemDiv);
    });
}

function addToOrder(name, price) {
    let quantity = document.getElementById(`${name}-quantity`).value;
    quantity = parseInt(quantity);

    let orderItem = order.find(item => item.name === name);
    if (orderItem) {
        orderItem.quantity += quantity;
    } else {
        order.push({name, price, quantity});
    }

    updateOrderSummary();
}

function updateOrderSummary() {
    const orderList = document.getElementById('orderList');
    const totalPriceSpan = document.getElementById('totalPrice');
    
    orderList.innerHTML = ''; // Clear previous orders

    let totalPrice = 0;
    order.forEach(item => {
        let itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        let orderItemDiv = document.createElement('div');
        orderItemDiv.textContent = `${item.name} x${item.quantity} - $${itemTotal}`;
        orderList.appendChild(orderItemDiv);
    });

    totalPriceSpan.textContent = `$${totalPrice}`;
}

document.getElementById('payNowBtn').addEventListener('click', function() {
    const tableNumber = document.getElementById('tableNumber').value;

    if (!tableNumber) {
        alert('Please enter your table number');
        return;
    }

    if (order.length === 0) {
        alert('Please add items to your order.');
        return;
    }

    alert('Proceeding to payment...');
    // Here, you can integrate with a payment gateway like Stripe, PayPal, etc.
});
