// src/components/charts/RevenueChart.jsx
import React from "react";
import Chart from "react-apexcharts";

const RevenueChart = () => {
    const series = [
        {
            name: "Revenue",
            data: [420, 680, 510, 750, 320, 600, 450],
        },
        {
            name: "Orders",
            data: [120, 18, 140, 210, 90, 170, 130],
        },
    ];

    const options = {
        chart: {
            type: "bar",
            stacked: true,
            toolbar: { show: false },
        },
        colors: ["var(--primary)", "var(--secondary)"], // কালো + হালকা নীল
        plotOptions: {
            bar: {
                borderRadius: 6,
                columnWidth: "40%",
            },
        },
        dataLabels: { enabled: false },
        grid: {
            borderColor: "var(--neutral-300)",
            strokeDashArray: 3,
        },
        xaxis: {
            categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            labels: { style: { fontSize: "13px" } },
        },
        yaxis: {
            labels: { style: { fontSize: "13px" } },
        },
        legend: { show: false },
        tooltip: {
            shared: true,
            intersect: false,
        },
    };

    return (
        <div className="bg-neutral-100 rounded-sm shadow p-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Revenue / Sales Chart
            </h2>
            <Chart options={options} series={series} type="bar" width="100%" height={300} />
        </div>
    );
};

export default RevenueChart;
