import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MyContext } from "../hooks/DataContext";

const LiveLtp = () => {
  const { token } = useContext(MyContext);
  const [stockData, setStockData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const vite_wsUrl = import.meta.env.VITE_WSURL;
  const apiUrl = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    const encodedToken = encodeURIComponent(token);
    const wsUrl = `${vite_wsUrl}?token=${encodedToken}`;

    let ws;
    try {
      ws = new WebSocket(wsUrl);

      ws.onopen = () => console.log("✅ WebSocket Connected");

      ws.onmessage = (event) => {
        try {
          const receivedData = JSON.parse(event.data);
          setStockData((prevData) =>
            receivedData.map((newStock) => {
              const oldStock = prevData.find(
                (s) => s.symbol === newStock.symbol
              );
              return {
                ...newStock,
                prevLivePrice: oldStock
                  ? oldStock.livePrice
                  : newStock.livePrice,
              };
            })
          );
        } catch (err) {
          console.error("❌ Error parsing WebSocket message:", err);
        }
      };

      ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
      ws.onclose = () => console.log("❌ WebSocket Disconnected");

      return () => ws && ws.close();
    } catch (e) {
      console.error("❌ WebSocket Connection Failed", e);
    }
  }, [token]);

  const handleRowClick = async (stock) => {
    try {
      console.log("Fetching chart data for:", stock.symbol);

      const response = await fetch(`${apiUrl}/api/stocks/chartdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token: stock.token, symbol: stock.symbol }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stock chart data: ${response.status}`);
      }

      const chartData = await response.json();
      console.log("Received Chart Data:", chartData);

      if (!chartData || chartData.length === 0) {
        toast.error("❌ No chart data available");
        return;
      }

      toast.success(`📩 Fetched ${stock.name} data successfully!`);

      localStorage.setItem("selectedStock", JSON.stringify(stock));
      localStorage.setItem("chartData", JSON.stringify(chartData));

      navigate("/chartpage");
    } catch (error) {
      console.error("❌ Error fetching stock data:", error);
      toast.error("❌ Failed to fetch stock data");
    }
  };

  // Filter data based on search input
  const filteredData = stockData.filter(
    (stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-xl p-4 flex flex-col h-full">
        {/* 🔹 Search Bar */}
        <div className="relative w-full mb-4">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search stock by name or symbol..."
            className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Table Wrapper */}
        <div className="h-[500px] overflow-auto">
          <table className="w-full border-collapse text-white">
            {/* Table Header */}
            <thead className="sticky top-0 bg-gray-800 shadow-md hidden md:table-header-group">
              <tr className="text-white uppercase text-sm">
                <th className="py-3 px-4 text-left">Stock Name</th>
                <th className="py-3 px-4 text-left">Live Price</th>
                <th className="py-3 px-4 text-left">Volume</th>
                <th className="py-3 px-4 text-left">52W High</th>
                <th className="py-3 px-4 text-left">52W Low</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((stock, index) => {
                  const priceColor =
                    stock.livePrice > stock.prevLivePrice
                      ? "text-green-400 font-semibold"
                      : stock.livePrice < stock.prevLivePrice
                      ? "text-red-400 font-semibold"
                      : "text-white";

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-800 transition duration-200 cursor-pointer md:table-row block w-full mb-4 md:mb-0"
                      onClick={() => handleRowClick(stock)}
                    >
                      {/* Mobile View (Stacked Layout) */}
                      <td className="md:hidden block p-4">
                        <div className="text-lg font-semibold">
                          {stock.name}
                        </div>
                        <div className={`text-sm ${priceColor}`}>
                          ₹{stock.livePrice.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">
                          Volume: {stock.volume.toLocaleString()}
                        </div>
                        <div className="flex justify-between text-xs mt-2">
                          <span className="text-green-400">
                            High: ₹{stock.high52}
                          </span>
                          <span className="text-red-400">
                            Low: ₹{stock.low52}
                          </span>
                        </div>
                      </td>

                      {/* Desktop View (Standard Table) */}
                      <td className="py-3 px-4 hidden md:table-cell font-semibold">
                        {stock.name}
                      </td>
                      <td
                        className={`py-3 px-4 hidden md:table-cell ${priceColor}`}
                      >
                        ₹{stock.livePrice.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        {stock.volume.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-green-400 font-semibold">
                        ₹{stock.high52}
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell text-red-400 font-semibold">
                        ₹{stock.low52}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-400">
                    Data Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveLtp;

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import { toast } from "react-toastify";
// import { MyContext } from "../hooks/DataContext";

// const LiveLtp = () => {
//   const { token } = useContext(MyContext);
//   const [stockData, setStockData] = useState([]);
//   const vite_wsUrl = import.meta.env.VITE_WSURL;
//   const apiUrl = import.meta.env.VITE_BASEURL;
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     if (!token) return;

//     const encodedToken = encodeURIComponent(token);
//     const wsUrl = `${vite_wsUrl}?token=${encodedToken}`;

//     let ws;
//     try {
//       ws = new WebSocket(wsUrl);

//       ws.onopen = () => console.log("✅ WebSocket Connected");

//       ws.onmessage = (event) => {
//         try {
//           const receivedData = JSON.parse(event.data);
//           setStockData((prevData) =>
//             receivedData.map((newStock) => {
//               const oldStock = prevData.find(
//                 (s) => s.symbol === newStock.symbol
//               );
//               return {
//                 ...newStock,
//                 prevLivePrice: oldStock
//                   ? oldStock.livePrice
//                   : newStock.livePrice,
//               };
//             })
//           );
//         } catch (err) {
//           console.error("❌ Error parsing WebSocket message:", err);
//         }
//       };

//       ws.onerror = (error) => console.error("❌ WebSocket Error:", error);
//       ws.onclose = () => console.log("❌ WebSocket Disconnected");

//       return () => ws && ws.close();
//     } catch (e) {
//       console.error("❌ WebSocket Connection Failed", e);
//     }
//   }, [token]);

//   const handleRowClick = async (stock) => {
//     try {
//       console.log("Fetching chart data for:", stock.symbol); // Debug log

//       const response = await fetch(`${apiUrl}/api/stocks/chartdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ token: stock.token, symbol: stock.symbol }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch stock chart data: ${response.status}`);
//       }

//       const chartData = await response.json(); // Parse API response
//       console.log("Received Chart Data:", chartData); // Debugging log

//       // Ensure chartData is valid
//       if (!chartData || chartData.length === 0) {
//         toast.error("❌ No chart data available");
//         return;
//       }

//       // Navigate to ChartPage with valid stock & chart data
//       toast.success(`📩 Fetched ${stock.name} data successfully!`);

//       // ✅ Store stock & chart data in localStorage
//       localStorage.setItem("selectedStock", JSON.stringify(stock));
//       localStorage.setItem("chartData", JSON.stringify(chartData));

//       // ✅ Navigate without sending state
//       navigate("/chartpage");
//     } catch (error) {
//       console.error("❌ Error fetching stock data:", error);
//       toast.error("❌ Failed to fetch stock data");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="overflow-x-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-xl p-4">
//         <table className="w-full border-collapse text-white">
//           {/* Table Header */}
//           <thead className="sticky top-0 bg-gray-800 shadow-md">
//             <tr className="text-white uppercase text-sm">
//               <th className="py-3 px-4 text-left">Stock Name</th>
//               <th className="py-3 px-4 text-left">Live Price</th>
//               <th className="py-3 px-4 text-left">Volume</th>
//               <th className="py-3 px-4 text-left">52W High</th>
//               <th className="py-3 px-4 text-left">52W Low</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {stockData.length > 0 ? (
//               stockData.map((stock, index) => {
//                 const priceColor =
//                   stock.livePrice > stock.prevLivePrice
//                     ? "text-green-400 font-semibold"
//                     : stock.livePrice < stock.prevLivePrice
//                     ? "text-red-400 font-semibold"
//                     : "text-white";

//                 return (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-700 hover:bg-gradient-to-r from-gray-800 to-gray-700 transition duration-200 cursor-pointer"
//                     onClick={() => handleRowClick(stock)}
//                   >
//                     <td className="py-3 px-4 font-semibold">{stock.name}</td>
//                     <td className={`py-3 px-4 ${priceColor}`}>
//                       ₹{stock.livePrice.toFixed(2)}
//                     </td>
//                     <td className="py-3 px-4">
//                       {stock.volume.toLocaleString()}
//                     </td>
//                     <td className="py-3 px-4 text-green-400 font-semibold">{`₹${stock.high52}`}</td>
//                     <td className="py-3 px-4 text-red-400 font-semibold">{`₹${stock.low52}`}</td>
//                   </tr>
//                 );
//               })
//             ) : (
//               <tr>
//                 <td colSpan={6} className="py-4 text-center text-gray-400">
//                   No Data Available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LiveLtp;
