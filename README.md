# 🎢 OmniPark: Smart Theme Park Assistant

**Challenge Goal:** This project is specifically designed to improve the physical event experience for attendees at large-scale venues. It directly addresses fundamental challenges such as crowd movement, long waiting times, and real-time coordination to ensure a seamless and enjoyable visit. 

OmniPark serves as a modern, real-time theme park companion application. It empowers visitors to optimize their routes and reduce wait times by equipping them with instant updates on ride queues, show schedules, food court loads, and dynamic crowd flow navigation. Featuring a stunning premium dark aesthetic, dynamic glow effects, and live data simulation.

## ✨ Features
- **Real-Time Data Simulation**: Experience live, fluctuating wait times for rides, washrooms, and food courts directly on the dashboard.
- **Premium UI/UX**: Built with high-end glassmorphism, responsive micro-animations, and modern Google Fonts (Inter & Outfit).
- **Cloud-Native Ready**: Designed to be containerized and deployed natively to Google Cloud Run as a stateless, highly scalable service.

## 🚀 How to Clone & Run Locally
To get this project running on your own machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zoelinsg/promptwars-projects.git
   ```
2. **Navigate into the project directory:**
   ```bash
   cd promptwars-projects/project-2026
   ```
3. **Install the required dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
Your app will be live at `http://localhost:5173/` by default.

## 🧪 Testing
This project includes a robust test suite powered by **Vitest** and **React Testing Library** to ensure component reliability and accessibility (`a11y`) interactions. 

To run the tests:
```bash
npm run test
```

## ☁️ Google Cloud Run Deployment
This project includes a perfectly optimized multi-stage Dockerfile making it plug-and-play for Google Cloud Run on port 8080.

To deploy straight from the Google Cloud Shell:

```bash
gcloud run deploy omnipark --source . --port 8080 --allow-unauthenticated --region us-central1
```

## Demo
[▶ Watch Demo on YouTube](https://youtu.be/sXvb0np38NI)

[![Demo Video](https://img.youtube.com/vi/sXvb0np38NI/0.jpg)](https://youtu.be/sXvb0np38NI)