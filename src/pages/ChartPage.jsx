import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// ✅ Custom Tooltip Component to Show Date & Time
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { dateTime, price } = payload[0].payload;
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-md">
        <p className="text-sm">{dateTime}</p>
        <p className="text-md font-semibold">Price: {price}</p>
      </div>
    );
  }
  return null;
};

const ChartPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    const storedStock = JSON.parse(localStorage.getItem("selectedStock"));
    const storedChartData = JSON.parse(localStorage.getItem("chartData"));

    if (
      !storedStock ||
      !storedChartData?.data ||
      storedChartData.data.length === 0
    ) {
      console.error("❌ Invalid stock/chart data. Redirecting...");
      navigate("/");
      return;
    }

    setStock(storedStock);

    // ✅ Format Data with Full Date-Time
    const formattedData = storedChartData.data.map((candle) => ({
      // time: new Date(candle.time).toLocaleTimeString([], {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // }), // HH:MM format for X-Axis
      dateTime: new Date(candle.time).toLocaleString(), // Full Date-Time for Tooltip
      price: candle.close, // Closing price
    }));

    setChartData(formattedData);
  }, [navigate]);

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <button
        onClick={() => {
          localStorage.removeItem("chartData"); // ✅ Clear chart data from localStorage
          navigate("/layout"); // ✅ Redirect to Live LTP page
        }}
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700"
      >
        ← Back to Live LTP
      </button>

      {stock && (
        <h2 className="mb-4 text-xl font-semibold">
          {stock.name} - Live Price Chart
        </h2>
      )}

      <div className="bg-gray-800 p-4 w-full max-w-4xl overflow-x-auto">
        {/* ✅ Zoom & Scroll Wrapper */}
        <TransformWrapper>
          <TransformComponent>
            <ResponsiveContainer width={1000} height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#555" />

                {/* ✅ X-Axis → Shows Only Time (HH:MM) */}
                <XAxis
                  dataKey="time"
                  stroke="#fff"
                  tick={{ fill: "#ddd" }}
                  minTickGap={20}
                />

                <YAxis stroke="#fff" tick={{ fill: "#ddd" }} />

                {/* ✅ Custom Tooltip to Show Full Date & Time */}
                <Tooltip content={<CustomTooltip />} />

                {/* ✅ Line Chart for Price */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#26a69a"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default ChartPage;
