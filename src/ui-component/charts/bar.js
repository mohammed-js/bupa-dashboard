import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

const Bar = ({ data }) => {
  let labels = [];
  let values = [];
  Object.entries(data).map(([key, value]) => {
    labels.push(key.substring(0, 3));
    values.push(value);
  });

  const chartRef = useRef(null);

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
    },
  };

  const x = {
    labels: labels,
    datasets: [
      {
        // label: "Fully Rounded",
        label: "Translated Certificates Per Day",
        data: values,
        borderColor: "#0079C8",
        backgroundColor: "#0079C8",
        borderWidth: 0,
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 30,
        categoryPercentage: 1, // Set the category percentage to 1 to occupy the full available width
        barPercentage: 0.8, // Adjust the bar percentage to ensure spacing between bars
      },
    ],
  };
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Create the chart
      new Chart(ctx, {
        type: "bar", // Set the chart type
        data: x, // Use the data object you provided
        options: options,
      });
    }
  }, []);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <canvas ref={chartRef} style={{ width: "100%", height: "100%" }}></canvas>{" "}
      {/* Canvas element for rendering the chart */}
    </div>
  );
};

export default Bar;
