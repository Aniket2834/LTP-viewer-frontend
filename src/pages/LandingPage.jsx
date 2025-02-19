import { Link } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } min-h-screen`}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <h1 className="text-3xl font-bold">📈 NSE Stock Tracker</h1>
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>
          {/* Sign Up & Sign In */}
          <Link
            to="/signin"
            className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.main
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center p-8"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
          Real-Time NSE Stock Market Tracker
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Track the top 200 NSE stocks, view real-time price movements, and
          analyze market trends effortlessly.
        </p>

        {/* Get Started Button */}
        <div className="mt-8">
          <Link to="/signup">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition">
              Get Started
            </button>
          </Link>
        </div>
      </motion.main>

      {/* Stock Carousel */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="p-6"
      >
        <h3 className="text-2xl font-semibold text-center mb-4">
          🔥 Trending NSE Stocks
        </h3>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="max-w-4xl mx-auto"
        >
          {[
            { name: "ITC", price: "₹430.85", volume: "18.8M" },
            { name: "INFY", price: "₹1,903.65", volume: "4.1M" },
            { name: "INDIGO", price: "₹4,364.55", volume: "1M" },
            { name: "IOC", price: "₹125.11", volume: "8.8M" },
          ].map((stock, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-center">
                <h4 className="text-xl font-semibold">{stock.name}</h4>
                <p className="text-lg">Price: {stock.price}</p>
                <p className="text-md">Volume: {stock.volume}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.section>

      {/* Information Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="p-8 text-center"
      >
        <h3 className="text-2xl font-semibold mb-4">
          Why Choose Our Platform?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg">
            ✅ Live Price Updates
          </div>
          <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg">
            ✅ Top 200 NSE Stocks
          </div>
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
            ✅ Real-Time Volume Insights
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center p-4 text-sm text-gray-500">
        © 2025 NSE Stock Tracker. All Rights Reserved.
      </footer>
    </div>
  );
}

// import { Link } from "react-router-dom";
// import { useState } from "react";
// import { Sun, Moon } from "lucide-react";

// export default function LandingPage() {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div
//       className={`${
//         darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       } min-h-screen`}
//     >
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 shadow-md">
//         <h1 className="text-3xl font-bold">Stock Market Insights</h1>
//         <div className="flex items-center gap-4">
//           {/* Toggle Dark Mode */}
//           <button onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? (
//               <Sun className="text-yellow-400" />
//             ) : (
//               <Moon className="text-gray-700" />
//             )}
//           </button>
//           {/* Sign Up & Sign In */}
//           <Link
//             to="/signin"
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Sign In
//           </Link>
//           <Link
//             to="/signup"
//             className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </header>

//       {/* Hero Section */}

//       <main className="flex flex-col items-center text-center p-8">
//         <h2 className="text-4xl font-bold mb-4">
//           Welcome to Real-Time Stock Market Insights
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
//           Stay ahead with live market updates, top 200 NSE stock analysis, and
//           expert insights. Get real-time price movements, volumes, and trends to
//           make informed trading decisions.
//         </p>

//         {/* Stock Market Image */}

//         {/* Get Started Button */}
//         <div className="mt-8">
//           <Link to="/signup">
//             <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </main>

//       {/* Information Section */}
//       <section className="p-8 text-center">
//         <h3 className="text-2xl font-semibold mb-4">
//           Why Choose Our Platform?
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
//             ✔ Real-time Stock Prices
//           </div>
//           <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg">
//             ✔ 200+ NSE Stocks Coverage
//           </div>
//           <div className="p-6 bg-purple-500 text-white rounded-lg shadow-lg">
//             ✔ Data-backed Market Insights
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
