import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Line = ({ data }) => {
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

  const tableData = {
    labels: labels,
    datasets: [
      // {
      //   pointRadius: 0,
      //   borderWidth: 0.5,
      //   label: "Dataset 1",
      //   // data: [10, 100, 60, 280, 80, 130, 26],
      //   data: values,
      //   borderColor: "#0079C8",
      //   backgroundColor: "#0079C8",
      //   lineTension: 0.25,
      //   borderDash: [1, 3],
      // },
      {
        pointRadius: 0,
        borderWidth: 0.3,
        label: "Translated Certificates Per Month",
        data: values,
        borderColor: "#000",
        backgroundColor: "#000",
        lineTension: 0.25,
        // borderDash: [1, 3]
      },
    ],
  };
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: tableData,
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

export default Line;
