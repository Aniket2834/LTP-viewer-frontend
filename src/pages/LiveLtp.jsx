import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast } from "react-toastify";
import { MyContext } from "../hooks/DataContext";

const LiveLtp = () => {
  const { token } = useContext(MyContext);
  const [stockData, setStockData] = useState([]);
  const vite_wsUrl = import.meta.env.VITE_WSURL;
  const apiUrl = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate(); // Initialize navigate

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

  // Function to send selected stock data and navigate to ChartPage
  // const handleRowClick = async (stock) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/api/stocks/chartdata`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ token: stock.token, symbol: stock.symbol }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch stock chart data");
  //     }

  //     const chartData = await response.json(); // Get chart data from response
  //     toast.success(`📩 Fetched ${stock.name} data successfully!`);

  //     // Navigate to ChartPage.jsx with stock data
  //     navigate("/chartpage", { state: { stock, chartData } });
  //   } catch (error) {
  //     console.error("❌ Error fetching stock data:", error);
  //     toast.error("❌ Failed to fetch stock data");
  //   }
  // };

  const handleRowClick = async (stock) => {
    try {
      console.log("Fetching chart data for:", stock.symbol); // Debug log

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

      const chartData = await response.json(); // Parse API response
      console.log("Received Chart Data:", chartData); // Debugging log

      // Ensure chartData is valid
      if (!chartData || chartData.length === 0) {
        toast.error("❌ No chart data available");
        return;
      }

      // Navigate to ChartPage with valid stock & chart data
      toast.success(`📩 Fetched ${stock.name} data successfully!`);

      // ✅ Store stock & chart data in localStorage
      localStorage.setItem("selectedStock", JSON.stringify(stock));
      localStorage.setItem("chartData", JSON.stringify(chartData));

      // ✅ Navigate without sending state
      navigate("/chartpage");
    } catch (error) {
      console.error("❌ Error fetching stock data:", error);
      toast.error("❌ Failed to fetch stock data");
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-xl p-4">
        <table className="w-full border-collapse text-white">
          {/* Table Header */}
          <thead className="sticky top-0 bg-gray-800 shadow-md">
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
            {stockData.length > 0 ? (
              stockData.map((stock, index) => {
                const priceColor =
                  stock.livePrice > stock.prevLivePrice
                    ? "text-green-400 font-semibold"
                    : stock.livePrice < stock.prevLivePrice
                    ? "text-red-400 font-semibold"
                    : "text-white";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gradient-to-r from-gray-800 to-gray-700 transition duration-200 cursor-pointer"
                    onClick={() => handleRowClick(stock)}
                  >
                    <td className="py-3 px-4 font-semibold">{stock.name}</td>
                    <td className={`py-3 px-4 ${priceColor}`}>
                      ₹{stock.livePrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {stock.volume.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-green-400 font-semibold">{`₹${stock.high52}`}</td>
                    <td className="py-3 px-4 text-red-400 font-semibold">{`₹${stock.low52}`}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-400">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveLtp;

// import React, { useEffect, useState, useContext } from "react";
// import { toast } from "react-toastify";
// import { MyContext } from "../hooks/DataContext";

// const LiveLtp = () => {
//   const { token } = useContext(MyContext);
//   const [stockData, setStockData] = useState([]);
//   const vite_wsUrl = import.meta.env.VITE_WSURL;
//   const apiUrl = import.meta.env.VITE_BASEURL; // Backend API URL from env

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

//           setStockData((prevData) => {
//             return receivedData.map((newStock) => {
//               const oldStock = prevData.find(
//                 (s) => s.symbol === newStock.symbol
//               );
//               return {
//                 ...newStock,
//                 prevLivePrice: oldStock
//                   ? oldStock.livePrice
//                   : newStock.livePrice,
//               };
//             });
//           });
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

//   // Function to send selected row data via POST request
//   const handleRowClick = async (stock) => {
//     try {
//       const response = await fetch(`${apiUrl}/api/stocks/chartdata`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ token: stock.token, symbol: stock.symbol }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send stock data");
//       }

//       toast.success(`📩 Sent ${stock.name} data successfully!`);
//     } catch (error) {
//       console.error("❌ Error sending stock data:", error);
//       toast.error("❌ Failed to send stock data");
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

// import React, { useEffect, useState, useContext } from "react";
// import { MyContext } from "../hooks/DataContext";

// const LiveLtp = () => {
//   const { token } = useContext(MyContext);
//   const [stockData, setStockData] = useState([]); // Stores stock data
//   const vite_wsUrl = import.meta.env.VITE_WSURL;

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

//           setStockData((prevData) => {
//             return receivedData.map((newStock) => {
//               const oldStock = prevData.find(
//                 (s) => s.symbol === newStock.symbol
//               );
//               return {
//                 ...newStock,
//                 prevLivePrice: oldStock
//                   ? oldStock.livePrice
//                   : newStock.livePrice, // Store old price
//               };
//             });
//           });
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

//   return (
//     <div className="p-6">
//       {/* Title */}
//       {/* <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-6">
//         📊 Live Stock Data
//       </h2> */}

//       {/* Table */}
//       <div className="overflow-x-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl rounded-xl p-4">
//         <table className="w-full border-collapse text-white">
//           {/* Table Header */}
//           <thead>
//             <tr className="bg-gradient-to-r from-gray-700 to-gray-800 text-white uppercase text-sm">
//               <th className="py-3 px-4 text-left">Stock Name</th>
//               {/* <th className="py-3 px-4 text-left">Symbol</th> */}
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
//                     ? "text-green-400 font-semibold" // Price increased
//                     : stock.livePrice < stock.prevLivePrice
//                     ? "text-red-400 font-semibold" // Price decreased
//                     : "text-white"; // No change

//                 return (
//                   <tr
//                     key={index}
//                     className="border-b border-gray-700 hover:bg-gradient-to-r from-gray-800 to-gray-700 transition duration-200"
//                   >
//                     <td className="py-3 px-4 font-semibold">{stock.name}</td>
//                     {/* <td className="py-3 px-4">{stock.symbol}</td> */}
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
