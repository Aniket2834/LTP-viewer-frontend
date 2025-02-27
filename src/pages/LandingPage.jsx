import { Link } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import featureImage from "../assets/feature_topimg.png";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true);

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
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="text-yellow-400" /> : <Moon />}
          </button>
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

      {/* Hero Section with Image */}
      <motion.main
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center lg:items-start justify-between text-left p-8 max-w-6xl mx-auto"
      >
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
            Real-Time NSE Stock Market Tracker
          </h2>
          <p className="text-lg text-gray-500 max-w-xl dark:text-white max-w-xl">
            Track the top 200 NSE stocks, view real-time price movements, and
            analyze market trends effortlessly.
          </p>
          <div className="mt-12 ml-40">
            <Link to="/signup">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-end mt-6 lg:mt-0">
          <img
            src={featureImage}
            alt="Feature Image"
            className="w-80 lg:w-96"
          />
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
          slidesPerView={4} // Show 4 slides at a time
          loop={true}
          autoplay={{ delay: 3000 }} // Adjust delay as needed
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 }, // 2 slides on small screens
            1024: { slidesPerView: 3 }, // 3 slides on medium screens
            1280: { slidesPerView: 4 }, // 4 slides on large screens
          }}
          className="max-w-6xl mx-auto"
        >
          {[
            { name: "ITC", price: "₹430.85", volume: "18.8M" },
            { name: "INFY", price: "₹1,903.65", volume: "4.1M" },
            { name: "INDIGO", price: "₹4,364.55", volume: "1M" },
            { name: "IOC", price: "₹125.11", volume: "8.8M" },
            { name: "TCS", price: "₹3,920.10", volume: "2.3M" },
            { name: "HDFC Bank", price: "₹1,615.75", volume: "5.2M" },
            { name: "Reliance", price: "₹2,850.45", volume: "6.7M" },
            { name: "SBI", price: "₹605.20", volume: "7.4M" },
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
// import { motion } from "framer-motion";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import { Autoplay, Pagination } from "swiper/modules";

// export default function LandingPage() {
//   const [darkMode, setDarkMode] = useState(false);

//   return (
//     <div
//       className={`${
//         darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//       } min-h-screen`}
//     >
//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
//         <h1 className="text-3xl font-bold">📈 NSE Stock Tracker</h1>
//         <div className="flex items-center gap-4">
//           {/* Dark Mode Toggle */}
//           <button onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? <Sun className="text-yellow-400" /> : <Moon />}
//           </button>
//           {/* Sign Up & Sign In */}
//           <Link
//             to="/signin"
//             className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition"
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
//       <motion.main
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="flex flex-col items-center text-center p-8"
//       >
//         <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 text-transparent bg-clip-text mb-4">
//           Real-Time NSE Stock Market Tracker
//         </h2>
//         <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
//           Track the top 200 NSE stocks, view real-time price movements, and
//           analyze market trends effortlessly.
//         </p>

//         {/* Get Started Button */}
//         <div className="mt-8">
//           <Link to="/signup">
//             <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg hover:scale-105 transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </motion.main>

//       {/* Stock Carousel */}
//       <motion.section
//         initial={{ opacity: 0, x: -30 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 1 }}
//         className="p-6"
//       >
//         <h3 className="text-2xl font-semibold text-center mb-4">
//           🔥 Trending NSE Stocks
//         </h3>
//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={20}
//           slidesPerView={1}
//           loop={true}
//           autoplay={{ delay: 3000 }}
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className="max-w-4xl mx-auto"
//         >
//           {[
//             { name: "ITC", price: "₹430.85", volume: "18.8M" },
//             { name: "INFY", price: "₹1,903.65", volume: "4.1M" },
//             { name: "INDIGO", price: "₹4,364.55", volume: "1M" },
//             { name: "IOC", price: "₹125.11", volume: "8.8M" },
//           ].map((stock, index) => (
//             <SwiperSlide key={index}>
//               <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-center">
//                 <h4 className="text-xl font-semibold">{stock.name}</h4>
//                 <p className="text-lg">Price: {stock.price}</p>
//                 <p className="text-md">Volume: {stock.volume}</p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </motion.section>

//       {/* Information Section */}
//       <motion.section
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="p-8 text-center"
//       >
//         <h3 className="text-2xl font-semibold mb-4">
//           Why Choose Our Platform?
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-lg">
//             ✅ Live Price Updates
//           </div>
//           <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg">
//             ✅ Top 200 NSE Stocks
//           </div>
//           <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
//             ✅ Real-Time Volume Insights
//           </div>
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <footer className="text-center p-4 text-sm text-gray-500">
//         © 2025 NSE Stock Tracker. All Rights Reserved.
//       </footer>
//     </div>
//   );
// }
