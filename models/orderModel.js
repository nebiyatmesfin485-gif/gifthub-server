const pool = require("../config/db");

// Create a new order
async function createOrder(user_id, total_price) {

    const result = await pool.query(
        `INSERT INTO orders (user_id, total_price)
         VALUES ($1, $2)
         RETURNING *`,
        [user_id, total_price]
    );

    return result.rows[0];
}

// Add product to order_items
async function addOrderItem(order_id, product_id, quantity, subtotal) {

    await pool.query(
        `INSERT INTO order_items
        (order_id, product_id, quantity, subtotal)
        VALUES ($1, $2, $3, $4)`,
        [order_id, product_id, quantity, subtotal]
    );

}

// Customer's orders
async function getMyOrders(user_id) {

    const result = await pool.query(
        `SELECT *
         FROM orders
         WHERE user_id = $1
         ORDER BY created_at DESC`,
        [user_id]
    );

    return result.rows;
}

// Admin: all orders
async function getAllOrders() {

    const result = await pool.query(
        `SELECT *
         FROM orders
         ORDER BY created_at DESC`
    );

    return result.rows;

}

// Update order status
async function updateOrderStatus(order_id, status) {

    const result = await pool.query(
        `UPDATE orders
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, order_id]
    );

    return result.rows[0];

}

module.exports = {
    createOrder,
    addOrderItem,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
};
