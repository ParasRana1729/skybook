# ✈️ SkyBook - Flight Booking Website

A modern, responsive flight booking website built with vanilla HTML, CSS, and JavaScript. SkyBook provides a sleek user interface for searching and booking flights with a professional aviation-themed design.

## 🌟 Features

### Core Functionality
- **Flight Search**: Search for flights by departure/destination cities, dates, passengers, and class
- **Real-time Validation**: Form validation with helpful error messages
- **Flight Results**: Display available flights with pricing and booking options
- **User Authentication**: Login and registration system with form validation
- **Responsive Design**: Fully responsive layout that works on all devices

### User Experience
- **Modern UI**: Dark theme with blue accent colors and smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and modal dialogs
- **Professional Design**: Aviation-themed with high-quality imagery
- **Accessibility**: Semantic HTML and keyboard navigation support

### Technical Features
- **Pure JavaScript**: No external frameworks or libraries required
- **CSS Grid & Flexbox**: Modern layout techniques for responsive design
- **Local Storage**: Session management for user authentication
- **Form Validation**: Client-side validation for all user inputs
- **Smooth Animations**: CSS transitions and keyframe animations

## 🚀 Demo

![SkyBook Hero Section](images/hero-airplane.jpg)

## 📋 Table of Contents

- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Features Overview](#-features-overview)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/skybook-flight-booking.git
   cd skybook-flight-booking
   ```

2. **Open in browser**
   Simply open `index.html` in your preferred web browser. No build process or server required!

   ```bash
   # Option 1: Open directly
   open index.html
   
   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 📖 Usage

### Searching for Flights
1. Navigate to the "Search Flights" section
2. Fill in the required fields:
   - **From**: Departure city
   - **To**: Destination city  
   - **Departure Date**: When you want to leave
   - **Return Date**: When you want to return (optional)
   - **Passengers**: Number of travelers
   - **Class**: Economy, Business, or First Class
3. Click "Search Flights" to view available options

### User Authentication
1. Click "Login" in the navigation
2. Choose between "Login" or "Register" tabs
3. Fill in the required information
4. Submit to access personalized features

### Booking Flights
1. After searching, browse available flights
2. Click "Book Now" on your preferred flight
3. Confirm your booking details

## 📁 Project Structure

```
skybook-flight-booking/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── script.js               # JavaScript functionality
├── images/                 # Image assets
│   ├── hero-airplane.jpg   # Hero section background
│   ├── airline-1.jpg       # Airline images
│   ├── airline-2.jpg
│   ├── airline-3.jpg
│   ├── airplane-sky.jpg
│   ├── search-bg.jpg
│   ├── shield-icon.svg     # Feature icons
│   ├── takeoff-icon.svg
│   └── target-icon.svg
└── README.md               # Project documentation
```

## 🎯 Features Overview

### Flight Search System
- **Smart Validation**: Prevents past dates, validates city names, ensures return date is after departure
- **Dynamic Results**: Real-time search results with flight details
- **Flexible Booking**: Support for multiple passengers and travel classes

### User Authentication
- **Registration**: Create new accounts with email validation
- **Login**: Secure login with password verification
- **Session Management**: Persistent login state during browsing session
- **Form Validation**: Email format validation, password requirements, confirmation matching

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for medium screens
- **Desktop Enhancement**: Full-featured desktop experience
- **Cross-Browser**: Compatible with modern browsers

### Performance Features
- **Optimized Images**: Compressed images for faster loading
- **Minimal Dependencies**: No external libraries for faster load times
- **Efficient CSS**: Modern CSS techniques for better performance
- **Smooth Animations**: Hardware-accelerated animations

## 🌐 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Colors
The color scheme can be customized by modifying CSS custom properties:

```css
:root {
  --primary-blue: #2563eb;
  --dark-bg: #0f172a;
  --card-bg: #1e293b;
  --text-light: #e2e8f0;
}
```

### Sample Flight Data
Add or modify flight data in `script.js`:

```javascript
const flightData = [
  {
    id: 1,
    airline: "Your Airline",
    from: "Origin City",
    to: "Destination City",
    departure: "08:30",
    arrival: "20:45", 
    duration: "7h 15m",
    price: 899
  }
  // Add more flights...
];
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style
- Use consistent indentation (2 spaces)
- Follow semantic HTML practices
- Use modern CSS features where appropriate
- Comment complex JavaScript functions
- Maintain responsive design principles

## 🐛 Known Issues

- Flight data is currently static (stored in JavaScript array)
- No backend integration for real bookings
- Authentication is client-side only (for demo purposes)

## 🔮 Future Enhancements

- [ ] Backend integration with real flight APIs
- [ ] Payment processing system
- [ ] Email confirmation system
- [ ] Advanced filtering options
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Booking history and user dashboard

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern airline websites
- Icons from SVG libraries
- Stock images for aviation themes
- CSS Grid and Flexbox for responsive layouts

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ for aviation enthusiasts and web developers*
