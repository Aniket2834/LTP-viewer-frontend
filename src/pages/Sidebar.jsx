import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useCustomQuery from "../hooks/useCustomQuery";

const Sidebar = () => {
  const navigate = useNavigate();
  const { sendRequest, data, loading } = useCustomQuery();
  const [sidebarData, setSidebarData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("top20High_Volumes"); // Default category

  useEffect(() => {
    sendRequest("GET", "/api/stocks/sidebar");
  }, []);

  useEffect(() => {
    if (data) {
      setSidebarData(data);
    }
  }, [data]);

  const handleClickLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("encoded_token");
    localStorage.removeItem("public_token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("disclaimerAgreed");
    localStorage.clear();
    navigate("/signin");
    toast.success("Logged Out");
  };


  const menuItems = [
    { title: "High Volumes", key: "top20High_Volumes" },
    { title: "Low Volumes", key: "top20Low_Volumes" },
    { title: "Highest Prices", key: "top20Highest_Prices" },
    { title: "Low Prices", key: "top20Lowest_Prices" },
  ];

  const handleMenuClick = (key) => {
    setSelectedCategory(key);
  };

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold text-center mb-5">Stock Data</h2>

      {/* Sidebar Menu Items */}
      <nav>
        {menuItems.map((item) => (
          <div
            key={item.key}
            className={`p-3 hover:bg-gray-700 rounded cursor-pointer ${
              selectedCategory === item.key ? "bg-gray-700" : ""
            }`}
            onClick={() => handleMenuClick(item.key)}
          >
            {loading ? "Loading..." : item.title}
          </div>
        ))}
      </nav>

      {/* Display Selected Category Data */}
      <div className="mt-4 p-3 bg-gray-800 rounded">
        <h3 className="text-lg font-semibold">
          {selectedCategory.replace("top20", "")}
        </h3>
        <ul className="mt-2">
          {sidebarData[selectedCategory]?.length > 0 ? (
            sidebarData[selectedCategory].map((stock, index) => (
              <li key={index} className="p-2 border-b border-gray-700">
                <span className=" text=1px font-bold">{stock.name}</span> - ₹
                {stock.livePrice.toFixed(2)}
              </li>
            ))
          ) : (
            <li className="text-gray-400">No data available</li>
          )}
        </ul>
      </div>

      {/* Logout Button */}
      <div
        className="mt-auto p-3 hover:bg-red-700 rounded cursor-pointer text-center"
        onClick={handleClickLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
