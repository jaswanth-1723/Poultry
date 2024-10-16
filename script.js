const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const products = document.querySelectorAll('.hen'); // Select product cards (updated to eggs)
const clearSearchButton = document.querySelector('.clear-search');
const searchResults = document.getElementById('searchResults'); // For dropdown list

clearSearchButton.style.display = 'none';
searchResults.style.display = 'none'; // Hide search results initially

// Fetch products from another HTML file (eggs.html)
fetch('eggs.html')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(data, 'text/html');
    const additionalProducts = htmlDocument.querySelectorAll('.hen'); // Get products from eggs.html

    additionalProducts.forEach((product) => {
      document.body.appendChild(product); // Append products to the current HTML
    });
  })
  .catch(error => {
    console.error('Error fetching additional products:', error);
  });

// Show the clear button and update dropdown as user types
searchInput.addEventListener('input', () => {
  if (searchInput.value !== '') {
    clearSearchButton.style.display = 'block';
    updateDropdown(); // Call to update the dropdown list
  } else {
    clearSearchButton.style.display = 'none';
    searchResults.style.display = 'none'; // Hide search results
    showAllProducts(); // Show all products when input is cleared
  }
});

clearSearchButton.addEventListener('click', () => {
  searchInput.value = '';
  clearSearchButton.style.display = 'none';
  searchResults.style.display = 'none'; // Hide search results
  showAllProducts(); // Show all products again
});

searchButton.addEventListener('click', searchProducts);

// Function to search and filter products
function searchProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase(); // Convert search term to lowercase
  const matchedProducts = [];

  products.forEach((product) => {
    const productName = product.querySelector('h2').textContent.toLowerCase(); // Convert product name to lowercase

    if (productName.includes(searchTerm)) {
      matchedProducts.push(product); // Collect matched products
    } 
  });

  if (matchedProducts.length > 0) {
    products.forEach(product => product.style.display = 'none'); // Hide all products
    matchedProducts.forEach(product => product.style.display = 'block'); // Display matched product(s)
  } else {
    showAllProducts(); // If no match, reset all products
  }

  searchResults.style.display = 'none'; // Hide dropdown after selection
}

// Function to update the dropdown with matched products
function updateDropdown() {
  const searchTerm = searchInput.value.trim().toLowerCase(); // Convert search term to lowercase
  const matchedProducts = [];

  searchResults.innerHTML = ''; // Clear previous results

  products.forEach((product) => {
    const productName = product.querySelector('h2').textContent.toLowerCase(); // Convert product name to lowercase

    if (productName.includes(searchTerm)) {
      matchedProducts.push(product.querySelector('h2').textContent); // Collect matched product names
    }
  });

  if (matchedProducts.length > 0) {
    searchResults.style.display = 'block'; // Show dropdown
    matchedProducts.forEach((productName) => {
      const li = document.createElement('li');
      li.textContent = productName; // Display original product name
      li.addEventListener('click', () => {
        searchInput.value = productName; // Set search input to clicked product
        searchProducts(); // Display the clicked product
      });
      searchResults.appendChild(li);
    });
  } else {
    searchResults.style.display = 'none'; // Hide dropdown if no matches
  }
}

// Function to show all products (when input is cleared or no search term)
function showAllProducts() {
  products.forEach((product) => {
    product.style.display = 'block'; // Show all products
  });
}




// Function to toggle the has-content class based on input
searchInput.addEventListener('input', () => {
  if (searchInput.value) {
    searchInput.classList.add('has-content');
  } else {
    searchInput.classList.remove('has-content');
  }
});

// Clear Search button functionality
clearSearchButton.addEventListener('click', () => {
  searchInput.value = ''; // Clear the input value
  searchInput.classList.remove('has-content'); // Remove the has-content class
  clearSearchButton.style.display = 'none'; // Optionally hide the clear button if needed
});





let cartCount = "0";
const cartButton = document.querySelector('.bxs-cart-alt');
const cartButtons = document.querySelectorAll('.btn button');
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];  


cartCount = cartProducts.length;
cartButton.innerHTML = `<sup style="color: red; font-size: 12px;">${cartCount}</sup>`;

cartButtons.forEach(button => {
  button.addEventListener('click', () => {
    event.stopPropagation();
    const henName = button.parentNode.parentNode.querySelector('.group h2').textContent;
    const existingProduct = cartProducts.find((product) => product.name === henName);
    
    
    if (!existingProduct) {
      cartProducts.push({ name: henName, quantity: 1 });
      cartCount++;
      cartButton.innerHTML = `<sup style="color: red; font-size: 12px;">${cartCount}</sup>`;
    }
    
    
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  });
});

document.getElementById('cartButton').addEventListener('click', () => {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
  window.location.href = 'cart.html';
});


document.getElementById("logout").title = "Logout";



const logoutButton = document.getElementById("logout");
const loginButton = document.getElementById("login");
const loadingAnimation = document.querySelector(".loading-animation");

logoutButton.addEventListener("click", () => {
  loadingAnimation.style.display = "block";
  setTimeout(() => {
    window.location.href = "";
  }, 3000);
});

logoutButton.addEventListener("click", function (event) {
  event.preventDefault();
  const body = document.body;
  body.style.transition = "opacity 1s ease";
  body.style.opacity = "0";
  setTimeout(function () {
    window.location.href = "home.html";
  }, 1000);
});

loginButton.addEventListener("click", () => {
  loadingAnimation.style.display = "block";
  setTimeout(() => {
    window.location.href = "";
  }, 3000);
});

loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  const body = document.body;
  body.style.transition = "opacity 1s ease";
  body.style.opacity = "0";
  setTimeout(function () {
    window.location.href = "login.html";
  }, 1000);
});




function flipCard(card) {
  card.classList.toggle('flipped');
}

// toggling the menu dropdown
document.getElementById('menuIcon').addEventListener('click', function() {
  var menuLinks = document.getElementById('menuLinks');
  menuLinks.classList.toggle('show');
});


function toggleDropdown(event) {
  event.preventDefault(); 
  let arrow = document.getElementById('arrow');
  let dropdownContent = document.getElementById('dropdownContent');

  // Toggle the dropdown visibility
  dropdownContent.classList.toggle('show');
}

// Add the click event listener to the arrow only once
let arrow = document.getElementById('arrow');
arrow.addEventListener('click', toggleDropdown);

// Close the dropdown content when clicking outside
document.addEventListener('click', function(event) {
  let dropdownContent = document.getElementById('dropdownContent');
  if (!event.target.closest('.dropdown')) {
    dropdownContent.classList.remove('show');
  }
});



