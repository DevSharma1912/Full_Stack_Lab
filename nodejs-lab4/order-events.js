const EventEmitter = require("events").EventEmitter;

const orderEvents = new EventEmitter();

orderEvents.on("orderPlaced", ({ id, item, amount }) => {
    console.log(`Order ID: ${id} | Item: ${item} | Amount: ₹${amount}`);
});

orderEvents.emit("orderPlaced", { id: 101, item: "Wireless Headphones", amount: 2499 });
orderEvents.emit("orderPlaced", { id: 102, item: "Smart Watch", amount: 3499 });
orderEvents.emit("orderPlaced", { id: 103, item: "Mechanical Keyboard", amount: 2999 });
