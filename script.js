// ============================================================
// NOVACART - LAB SHEET 2
// Vanilla JavaScript E-Commerce Functionality
// ============================================================


// ============================================================
// 1. PRODUCT DATA
// ============================================================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "WEARABLE TECHNOLOGY",
        price: 2499,
        image: "images/headphones.jpg",
        description: "Experience immersive sound and comfortable listening with NovaCart Wireless Headphones. Designed for everyday entertainment, work, study, and travel.",
        features: [
            "Immersive wireless audio",
            "Comfortable over-ear design",
            "Wireless Bluetooth connectivity",
            "Suitable for work, study and entertainment",
            "Portable design for travel"
        ]
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "WEARABLE TECHNOLOGY",
        price: 3499,
        image: "images/smartwatch.jpg",
        description: "Stay connected throughout the day with a modern Smart Watch designed for everyday convenience, activity tracking and quick access to useful features.",
        features: [
            "Modern wearable design",
            "Everyday activity tracking",
            "Smart notifications",
            "Comfortable wrist fit",
            "Useful everyday companion"
        ]
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "AUDIO & ELECTRONICS",
        price: 1799,
        image: "images/speaker.jpg",
        description: "Bring your music anywhere with the NovaCart Bluetooth Speaker. Its compact design makes it a practical choice for home, travel and everyday listening.",
        features: [
            "Wireless Bluetooth connectivity",
            "Compact portable design",
            "Clear everyday audio",
            "Easy wireless pairing",
            "Ideal for home and travel"
        ]
    },
    {
        id: 4,
        name: "Mechanical Keyboard",
        category: "COMPUTER ACCESSORIES",
        price: 2999,
        image: "images/keyboard.jpg",
        description: "Upgrade your desk setup with a Mechanical Keyboard designed for comfortable typing, gaming, study and everyday computer use.",
        features: [
            "Mechanical typing experience",
            "Comfortable key layout",
            "Modern desktop design",
            "Suitable for work and study",
            "Great for gaming setups"
        ]
    },
    {
        id: 5,
        name: "Wireless Mouse",
        category: "COMPUTER ACCESSORIES",
        price: 899,
        image: "images/mouse.jpg",
        description: "Enjoy a cleaner and more flexible workspace with the NovaCart Wireless Mouse, designed for everyday browsing, productivity and computer use.",
        features: [
            "Wireless convenience",
            "Compact ergonomic design",
            "Smooth everyday control",
            "Suitable for productivity",
            "Clean cable-free workspace"
        ]
    },
    {
        id: 6,
        name: "Power Bank",
        category: "MOBILE ACCESSORIES",
        price: 1299,
        image: "images/powerbank.jpg",
        description: "Keep your devices powered while you are away from a wall outlet with a practical NovaCart Power Bank designed for everyday portability.",
        features: [
            "Portable charging solution",
            "Convenient travel accessory",
            "Compact design",
            "Useful for everyday charging",
            "Easy to carry"
        ]
    },
    {
        id: 7,
        name: "USB-C Hub",
        category: "COMPUTER ACCESSORIES",
        price: 1499,
        image: "images/usbc-hub.jpg",
        description: "Expand the connectivity of compatible devices with a compact USB-C Hub, ideal for modern laptops and flexible desk setups.",
        features: [
            "USB-C connectivity",
            "Compact desk-friendly design",
            "Multiple connectivity options",
            "Useful for modern laptops",
            "Convenient portable accessory"
        ]
    },
    {
        id: 8,
        name: "Laptop Stand",
        category: "DESK ACCESSORIES",
        price: 1099,
        image: "images/laptop-stand.jpg",
        description: "Create a cleaner and more comfortable workspace with the NovaCart Laptop Stand, designed to elevate your laptop for everyday work and study.",
        features: [
            "Elevated laptop setup",
            "Space-saving desk accessory",
            "Stable desktop design",
            "Suitable for work and study",
            "Helps create a cleaner workspace"
        ]
    }
];


// ============================================================
// 2. CART DATA
// ============================================================

// Read existing cart from localStorage.
// If there is no cart, start with an empty array.

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


// ============================================================
// 3. SAVE CART TO LOCALSTORAGE
// ============================================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ============================================================
// 4. UPDATE CART COUNT BADGE
// ============================================================

function updateCartCount() {

    const cartLinks =
        document.querySelectorAll('a[href="cart.html"]');


    // Calculate total number of products.
    // Example:
    // Headphones quantity 2
    // Mouse quantity 1
    // Cart count = 3

    const totalItems = cart.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );


    cartLinks.forEach(function (link) {

        // Prevent duplicate badges
        const existingBadge =
            link.querySelector(".cart-count");


        if (existingBadge) {
            existingBadge.remove();
        }


        // Create badge only when cart has items

        if (totalItems > 0) {

            const badge =
                document.createElement("span");

            badge.className = "cart-count";

            badge.textContent =
                totalItems;

            link.appendChild(badge);

        }

    });

}


// ============================================================
// 5. ADD PRODUCT TO CART
// ============================================================

function addToCart(productId, quantity = 1) {

    const product =
        products.find(
            function (item) {
                return item.id === productId;
            }
        );


    // Stop if product doesn't exist

    if (!product) {
        return;
    }


    // Make sure quantity is valid

    quantity =
        parseInt(quantity);


    if (
        isNaN(quantity) ||
        quantity < 1
    ) {
        quantity = 1;
    }


    // Check if product already exists

    const existingProduct =
        cart.find(
            function (item) {
                return item.id === productId;
            }
        );


    if (existingProduct) {

        // Increase existing quantity

        existingProduct.quantity += quantity;

    } else {

        // Add new product

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            image: product.image,

            quantity: quantity

        });

    }


    // Save updated cart

    saveCart();


    // Update badge

    updateCartCount();


    // Show confirmation message

    showCartMessage(
        `${product.name} added to cart!`
    );

}


// ============================================================
// 6. SHOW "ADDED TO CART" MESSAGE
// ============================================================

function showCartMessage(message) {

    // Look for existing message

    let messageBox =
        document.querySelector(".cart-message");


    // Create message box if it doesn't exist

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "cart-message";

        document.body.appendChild(
            messageBox
        );

    }


    messageBox.textContent =
        "✓ " + message;


    messageBox.classList.add("show");


    // Remove previous timer if necessary

    clearTimeout(
        window.cartMessageTimer
    );


    window.cartMessageTimer =
        setTimeout(
            function () {

                messageBox.classList.remove(
                    "show"
                );

            },
            2500
        );

}


// ============================================================
// 7. RENDER PRODUCTS ON products.html
// ============================================================

function renderProducts() {

    const productGrid =
        document.querySelector(".products-section .product-grid");


    // If product grid doesn't exist,
    // we're not on products.html.

    if (!productGrid) {
        return;
    }


    // Clear existing hardcoded products

    productGrid.innerHTML = "";


    // Create one card for every product

    products.forEach(
        function (product) {

            const card =
                document.createElement("article");

            card.className =
                "product-card";


            card.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h2>
                        ${product.name}
                    </h2>

                    <p class="price">
                        ₹${product.price.toLocaleString("en-IN")}
                    </p>

                    <button
                        type="button"
                        class="product-button add-to-cart-button"
                        data-product-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                    <a
                        href="product-detail.html?id=${product.id}"
                        class="product-detail-link"
                    >
                        View Details
                    </a>

                </div>

            `;


            productGrid.appendChild(card);

        }
    );


    // Add click events to Add to Cart buttons

    const addButtons =
        document.querySelectorAll(
            ".add-to-cart-button"
        );


    addButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const productId =
                        parseInt(
                            button.dataset.productId
                        );


                    addToCart(productId);

                }
            );

        }
    );

}


// ============================================================
// 8. GET PRODUCT FROM URL
// ============================================================

function getProductFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        parseInt(
            params.get("id")
        );


    if (isNaN(productId)) {
        return products[0];
    }


    return (
        products.find(
            function (product) {
                return product.id === productId;
            }
        ) || products[0]
    );

}


// ============================================================
// 9. RENDER PRODUCT DETAIL PAGE
// ============================================================

function renderProductDetail() {

    const productName =
        document.getElementById(
            "productName"
        );


    // If productName doesn't exist,
    // we're not on product-detail.html.

    if (!productName) {
        return;
    }


    const product =
        getProductFromURL();


    const productImage =
        document.getElementById(
            "productImage"
        );

    const productCategory =
        document.getElementById(
            "productCategory"
        );

    const productPrice =
        document.getElementById(
            "productPrice"
        );

    const productDescription =
        document.getElementById(
            "productDescription"
        );

    const quantityInput =
        document.getElementById(
            "quantity"
        );


    // Product image

    if (productImage) {

        productImage.src =
            product.image;

        productImage.alt =
            product.name;

    }


    // Product name

    productName.textContent =
        product.name;


    // Category

    if (productCategory) {

        productCategory.textContent =
            product.category || "NOVACART COLLECTION";

    }


    // Price

    if (productPrice) {

        productPrice.textContent =
            "₹" +
            product.price.toLocaleString("en-IN");

    }


    // Description

    if (productDescription) {

        productDescription.textContent =
            product.description || `Experience the quality and convenience of the ${product.name}.`;

    }


    // Features

    const productFeatures =
        document.getElementById(
            "productFeatures"
        );


    if (productFeatures && product.features) {

        productFeatures.innerHTML = "";

        product.features.forEach(
            function (feature) {

                const li =
                    document.createElement("li");

                li.textContent = feature;

                productFeatures.appendChild(li);

            }
        );

    }


    // Document Title

    document.title =
        "NovaCart | " + product.name;


    // Add to Cart button

    const addButton =
        document.querySelector(
            ".product-detail-info .product-button"
        );


    if (addButton) {

        // Remove old inline onclick behaviour

        addButton.removeAttribute(
            "onclick"
        );


        addButton.addEventListener(
            "click",
            function () {

                let quantity = 1;


                if (quantityInput) {

                    quantity =
                        parseInt(
                            quantityInput.value
                        );

                }


                addToCart(
                    product.id,
                    quantity
                );

            }
        );

    }

}


// ============================================================
// 10. RENDER CART PAGE
// ============================================================

function renderCart() {

    const container =
        document.querySelector(
            ".cart-table-container"
        );


    // If cart container doesn't exist,
    // we're not on cart.html.

    if (!container) {
        return;
    }


    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart" style="text-align: center; padding: 50px 20px; background: rgba(255, 255, 255, 0.45); border-radius: var(--radius-medium); backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur); border: 1px solid rgba(255, 255, 255, 0.85); box-shadow: var(--shadow);">
                <h2 style="margin-bottom: 15px; color: #171717;">Your cart is empty</h2>
                <p style="margin-bottom: 25px; color: var(--muted-text);">Add some products to your cart and they will appear here.</p>
                <a href="products.html" class="secondary-button">Continue Shopping</a>
            </div>
        `;


        // Hide checkout actions container if cart is empty

        const cartActions =
            document.querySelector(".cart-actions");


        if (cartActions) {
            cartActions.style.display = "none";
        }


        return;

    }


    // Show checkout actions if cart has items

    const cartActions =
        document.querySelector(".cart-actions");


    if (cartActions) {
        cartActions.style.display = "flex";
    }


    let rowsHTML = "";


    cart.forEach(function (item) {

        rowsHTML += `
            <tr>
                <td>
                    <div class="cart-product">
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>₹${item.price.toLocaleString("en-IN")}</td>
                <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <input
                            type="number"
                            min="1"
                            value="${item.quantity}"
                            class="cart-quantity"
                            data-id="${item.id}"
                            aria-label="Quantity of ${item.name}"
                        >
                        <button
                            type="button"
                            class="remove-cart-item"
                            data-id="${item.id}"
                            style="padding: 6px 12px; background: rgba(220, 53, 69, 0.08); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.15); border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: background 0.25s ease;"
                            onmouseover="this.style.background='rgba(220, 53, 69, 0.15)'"
                            onmouseout="this.style.background='rgba(220, 53, 69, 0.08)'"
                        >
                            Remove
                        </button>
                    </div>
                </td>
                <td>₹${(item.price * item.quantity).toLocaleString("en-IN")}</td>
            </tr>
        `;

    });


    const total = calculateTotal();


    container.innerHTML = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHTML}
                <tr class="grand-total">
                    <td colspan="3"><strong>Grand Total</strong></td>
                    <td><strong>₹${total.toLocaleString("en-IN")}</strong></td>
                </tr>
            </tbody>
        </table>
    `;


    // Re-attach event listeners

    const quantityInputs =
        container.querySelectorAll(".cart-quantity");


    quantityInputs.forEach(function (input) {

        input.addEventListener("change", function () {

            updateCartQuantity(
                parseInt(input.dataset.id),
                parseInt(input.value)
            );

        });

    });


    const removeButtons =
        container.querySelectorAll(".remove-cart-item");


    removeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            removeFromCart(
                parseInt(button.dataset.id)
            );

        });

    });

}


// ============================================================
// 11. UPDATE CART QUANTITY
// ============================================================

function updateCartQuantity(
    productId,
    quantity
) {

    const item =
        cart.find(
            function (cartItem) {
                return cartItem.id === productId;
            }
        );


    if (!item) {
        return;
    }


    quantity =
        parseInt(quantity);


    if (
        isNaN(quantity) ||
        quantity < 1
    ) {

        quantity = 1;

    }


    item.quantity =
        quantity;


    saveCart();


    renderCart();


    updateCartCount();

}


// ============================================================
// 12. REMOVE FROM CART
// ============================================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            function (item) {
                return item.id !== productId;
            }
        );


    saveCart();


    renderCart();


    updateCartCount();

}


// ============================================================
// 13. CALCULATE TOTAL
// ============================================================

function calculateTotal() {

    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    (
                        item.price *
                        item.quantity
                    )
                );

            },
            0
        );


    return total;

}


// ============================================================
// 14. CHECKOUT FORM VALIDATION
// ============================================================

function setupCheckout() {

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );


    // If form doesn't exist,
    // we're not on checkout.html.

    if (!checkoutForm) {
        return;
    }


    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Remove old errors

            clearCheckoutErrors();


            // Get form values

            const name =
                document.getElementById(
                    "name"
                ).value.trim();


            const address =
                document.getElementById(
                    "address"
                ).value.trim();


            const pincode =
                document.getElementById(
                    "pincode"
                ).value.trim();


            const phone =
                document.getElementById(
                    "phone"
                ).value.trim();


            let isValid = true;


            // Name validation

            if (name === "") {

                showCheckoutError(
                    "name",
                    "Name is required."
                );

                isValid = false;

            }


            // Address validation

            if (address === "") {

                showCheckoutError(
                    "address",
                    "Address is required."
                );

                isValid = false;

            }


            // Pincode validation

            if (!/^\d{6}$/.test(pincode)) {

                showCheckoutError(
                    "pincode",
                    "Pincode must be exactly 6 digits."
                );

                isValid = false;

            }


            // Phone validation

            if (!/^\d{10}$/.test(phone)) {

                showCheckoutError(
                    "phone",
                    "Phone must be exactly 10 digits."
                );

                isValid = false;

            }


            // Stop if validation failed

            if (!isValid) {
                return;
            }


            // Successful order

            showOrderConfirmation();


            // Clear cart

            cart = [];


            localStorage.removeItem(
                "cart"
            );


            updateCartCount();

        }
    );

}


// ============================================================
// 15. SHOW CHECKOUT ERROR
// ============================================================

function showCheckoutError(
    fieldId,
    message
) {

    const field =
        document.getElementById(
            fieldId
        );


    if (!field) {
        return;
    }


    // Create error element

    const error =
        document.createElement(
            "small"
        );


    error.className =
        "checkout-error";


    error.textContent =
        message;


    // Insert after field

    field.insertAdjacentElement(
        "afterend",
        error
    );


    // Highlight invalid field

    field.classList.add(
        "input-error"
    );

}


// ============================================================
// 16. CLEAR CHECKOUT ERRORS
// ============================================================

function clearCheckoutErrors() {

    const errors =
        document.querySelectorAll(
            ".checkout-error"
        );


    errors.forEach(
        function (error) {
            error.remove();
        }
    );


    const invalidInputs =
        document.querySelectorAll(
            ".input-error"
        );


    invalidInputs.forEach(
        function (input) {

            input.classList.remove(
                "input-error"
            );

        }
    );

}


// ============================================================
// 17. SHOW ORDER CONFIRMATION
// ============================================================

function showOrderConfirmation() {

    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );


    if (!checkoutForm) {
        return;
    }


    checkoutForm.innerHTML = `

        <div class="order-confirmation">

            <h1>
                ✓ Order Placed!
            </h1>

            <p>
                Thank you for shopping with NovaCart.
            </p>

            <p>
                Your order has been successfully placed.
            </p>

            <a
                href="index.html"
                class="product-button"
            >
                Continue Shopping
            </a>

        </div>

    `;

}


// ============================================================
// 18. INITIALIZE EVERYTHING
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Product listing

        renderProducts();


        // Product detail

        renderProductDetail();


        // Cart page

        renderCart();


        // Checkout

        setupCheckout();


        // Cart badge on every page

        updateCartCount();

    }
);