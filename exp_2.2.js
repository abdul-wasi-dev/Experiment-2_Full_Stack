// Product Data
const products = [
  { name: "Running Shoes", category: "Shoes", price: 2500 },
  { name: "Formal Shoes", category: "Shoes", price: 3500 },
  { name: "Casual Shirt", category: "Shirt", price: 1200 },
  { name: "Denim Shirt", category: "Shirt", price: 1800 },
  { name: "Jeans Trousers", category: "Trousers", price: 2200 },
  { name: "Cotton Trousers", category: "Trousers", price: 1600 },
  { name: "Winter Coat", category: "Coat", price: 5000 },
  { name: "Blazer Coat", category: "Coat", price: 6500 }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortPrice = document.getElementById("sortPrice");

// Display products
function displayProducts(items) {
  productList.innerHTML = "";

  if (items.length === 0) {
    productList.innerHTML = "<p>No products found</p>";
    return;
  }

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>${product.category}</p>
      <p class="price">₹${product.price}</p>
    `;

    productList.appendChild(card);
  });
}

// Apply filters
function applyFilters() {
  let filteredProducts = [...products];

  if (categoryFilter.value !== "all") {
    filteredProducts = filteredProducts.filter(
      p => p.category === categoryFilter.value
    );
  }

  if (priceFilter.value) {
    filteredProducts = filteredProducts.filter(
      p => p.price <= priceFilter.value
    );
  }

  if (sortPrice.value === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortPrice.value === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
}

// Event Listeners
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("input", applyFilters);
sortPrice.addEventListener("change", applyFilters);

// Initial render
displayProducts(products);
