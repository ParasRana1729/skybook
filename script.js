// Flight booking website JavaScript functionality

// User authentication state
let currentUser = null;
let users = []; // In a real app, this would be stored in a database

// Sample flight data
const flightData = [
    {
        id: 1,
        airline: "SkyWings Airlines",
        from: "New York",
        to: "London", 
        departure: "08:30",
        arrival: "20:45",
        duration: "7h 15m",
        price: 899
    },
    {
        id: 2,
        airline: "CloudJet",
        from: "New York",
        to: "London",
        departure: "14:20",
        arrival: "02:35",
        duration: "7h 15m", 
        price: 1249
    },
    {
        id: 3,
        airline: "AeroLink",
        from: "London",
        to: "Paris",
        departure: "10:15",
        arrival: "11:30",
        duration: "1h 15m",
        price: 299
    },
    {
        id: 4,
        airline: "EuroFly",
        from: "Paris",
        to: "Tokyo",
        departure: "16:40",
        arrival: "11:20",
        duration: "12h 40m",
        price: 1599
    }
];

// DOM elements
const flightForm = document.getElementById('flight-form');
const resultsSection = document.getElementById('results');
const flightResults = document.getElementById('flight-results');
const authModal = document.getElementById('auth-modal');
const authLink = document.getElementById('auth-link');
const closeBtn = document.querySelector('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Authentication functions
function validateAuthForm(formData, isLogin = true) {
    const errors = {};
    
    if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
        errors.name = "Name must be at least 2 characters long";
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.email = "Please enter a valid email address";
    }
    
    if (!formData.password || formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
    }
    
    if (!isLogin && formData.password !== formData.confirm) {
        errors.confirm = "Passwords do not match";
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function findUser(email) {
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

function registerUser(userData) {
    const existingUser = findUser(userData.email);
    if (existingUser) {
        return { success: false, message: "User already exists with this email" };
    }
    
    const newUser = {
        id: users.length + 1,
        name: userData.name,
        email: userData.email,
        password: userData.password // In real app, this would be hashed
    };
    
    users.push(newUser);
    return { success: true, user: newUser };
}

function loginUser(email, password) {
    const user = findUser(email);
    if (!user || user.password !== password) {
        return { success: false, message: "Invalid email or password" };
    }
    
    return { success: true, user: user };
}

function updateAuthUI() {
    if (currentUser) {
        authLink.textContent = `Logout (${currentUser.name})`;
    } else {
        authLink.textContent = "Login";
    }
}

// Flight form validation functions
function validateForm(formData) {
    const errors = {};
    
    // Validate from field
    if (!formData.from.trim()) {
        errors.from = "Departure city is required";
    } else if (formData.from.trim().length < 2) {
        errors.from = "City name must be at least 2 characters";
    }
    
    // Validate to field
    if (!formData.to.trim()) {
        errors.to = "Destination city is required";
    } else if (formData.to.trim().length < 2) {
        errors.to = "City name must be at least 2 characters";
    }
    
    // Check if from and to are the same
    if (formData.from.trim().toLowerCase() === formData.to.trim().toLowerCase()) {
        errors.to = "Destination must be different from departure city";
    }
    
    // Validate departure date
    if (!formData.departure) {
        errors.departure = "Departure date is required";
    } else {
        const departureDate = new Date(formData.departure);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (departureDate < today) {
            errors.departure = "Departure date cannot be in the past";
        }
    }
    
    // Validate return date if provided
    if (formData.return) {
        const returnDate = new Date(formData.return);
        const departureDate = new Date(formData.departure);
        
        if (returnDate <= departureDate) {
            errors.return = "Return date must be after departure date";
        }
    }
    
    // Validate passengers
    if (!formData.passengers) {
        errors.passengers = "Number of passengers is required";
    }
    
    // Validate class
    if (!formData.class) {
        errors.class = "Travel class is required";
    }
    
    return errors;
}

// Display error messages
function displayErrors(errors) {
    // Clear all previous errors
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

// Search flights function
function searchFlights(from, to) {
    return flightData.filter(flight => {
        return flight.from.toLowerCase().includes(from.toLowerCase()) &&
               flight.to.toLowerCase().includes(to.toLowerCase());
    });
}

// Display flight results
function displayFlightResults(flights, searchData) {
    if (flights.length === 0) {
        flightResults.innerHTML = `
            <div class="no-results">
                <h4>No flights found</h4>
                <p>No flights available from ${searchData.from} to ${searchData.to} on the selected date.</p>
            </div>
        `;
    } else {
        flightResults.innerHTML = flights.map(flight => `
            <div class="flight-card">
                <div class="flight-info">
                    <h4>${flight.airline}</h4>
                    <div class="flight-details">
                        <p><strong>${flight.from}</strong> → <strong>${flight.to}</strong></p>
                        <p>Departure: ${flight.departure} | Arrival: ${flight.arrival}</p>
                        <p>Duration: ${flight.duration}</p>
                        <p>Passengers: ${searchData.passengers} | Class: ${searchData.class}</p>
                    </div>
                </div>
                <div class="flight-booking">
                    <div class="flight-price">$${flight.price}</div>
                    <button class="book-btn" onclick="bookFlight(${flight.id})">Book Now</button>
                </div>
            </div>
        `).join('');
    }
    
    // Show results section
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Book flight function
function bookFlight(flightId) {
    const flight = flightData.find(f => f.id === flightId);
    if (flight) {
        alert(`Flight booked successfully!\n\nFlight: ${flight.airline}\nRoute: ${flight.from} → ${flight.to}\nDeparture: ${flight.departure}\nPrice: $${flight.price}\n\nThank you for choosing SkyBook!`);
    }
}

// Form submit event handler
flightForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        departure: document.getElementById('departure').value,
        return: document.getElementById('return').value,
        passengers: document.getElementById('passengers').value,
        class: document.getElementById('class').value
    };
    
    // Validate form
    const errors = validateForm(formData);
    
    if (Object.keys(errors).length > 0) {
        displayErrors(errors);
        return;
    }
    
    // Clear errors if validation passes
    displayErrors({});
    
    // Search for flights
    const flights = searchFlights(formData.from, formData.to);
    
    // Display results
    displayFlightResults(flights, formData);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Authentication event handlers
authLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentUser) {
        // Logout
        currentUser = null;
        updateAuthUI();
        alert('Logged out successfully!');
    } else {
        // Show login modal
        authModal.style.display = 'block';
    }
});

closeBtn.addEventListener('click', function() {
    authModal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.getAttribute('data-tab');
        
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding form
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        if (tab === 'login') {
            loginForm.classList.add('active');
        } else {
            registerForm.classList.add('active');
        }
    });
});

// Login form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };
    
    const errors = validateAuthForm(formData, true);
    
    if (Object.keys(errors).length > 0) {
        displayAuthErrors(errors, 'login');
        return;
    }
    
    const result = loginUser(formData.email, formData.password);
    
    if (result.success) {
        currentUser = result.user;
        updateAuthUI();
        authModal.style.display = 'none';
        alert(`Welcome back, ${currentUser.name}!`);
        // Clear form
        loginForm.reset();
        displayAuthErrors({}, 'login');
    } else {
        displayAuthErrors({ email: result.message }, 'login');
    }
});

// Register form submission
registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('register-name').value,
        email: document.getElementById('register-email').value,
        password: document.getElementById('register-password').value,
        confirm: document.getElementById('register-confirm').value
    };
    
    const errors = validateAuthForm(formData, false);
    
    if (Object.keys(errors).length > 0) {
        displayAuthErrors(errors, 'register');
        return;
    }
    
    const result = registerUser(formData);
    
    if (result.success) {
        currentUser = result.user;
        updateAuthUI();
        authModal.style.display = 'none';
        alert(`Welcome to SkyBook, ${currentUser.name}!`);
        // Clear form
        registerForm.reset();
        displayAuthErrors({}, 'register');
    } else {
        displayAuthErrors({ email: result.message }, 'register');
    }
});

// Display authentication errors
function displayAuthErrors(errors, formType) {
    const prefix = formType === 'login' ? 'login' : 'register';
    
    // Clear all previous errors for this form
    const errorElements = document.querySelectorAll(`#${prefix}-form .error-message`);
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    // Display new errors
    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${prefix}-${field}-error`);
        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}

// Set minimum date for departure and return inputs
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure').setAttribute('min', today);
    document.getElementById('return').setAttribute('min', today);
    
    // Update return date minimum when departure date changes
    document.getElementById('departure').addEventListener('change', function() {
        const departureDate = this.value;
        document.getElementById('return').setAttribute('min', departureDate);
    });
    
    // Initialize auth UI
    updateAuthUI();
});
