const express = require('express');

const app = express();
const PORT = 3000;

const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
    { id: 3, name: 'Sam Smith' },
];

const orders = [
    { orderId: 1, userId: 1, item: 'Laptop' },
    { orderId: 2, userId: 2, item: 'Phone' },
    { orderId: 3, userId: 1, item: 'Tablet' },
];

app.get('/users', (req, res) => {
    const { name } = req.query;
    const filteredUsers = name ? users.filter(user => user.name.includes(name)) : users;
    res.json(filteredUsers);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

app.get('/users/:id/orders', (req, res) => {
    const userId = parseInt(req.params.id);
    const userOrders = orders.filter(order => order.userId === userId);
    if (userOrders.length === 0) return res.status(404).send('Orders not found for this user');
    res.json(userOrders);
});

// TODO: Implement advanced error handling middleware for 500 error with message 'Something broke!'
app.use((err, req, res, next) => {
    // Your error handling code here
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
