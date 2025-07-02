"use client"
import React, { useEffect, useRef } from "react";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    DoughnutController,
    Title,
    ChartOptions,
    Plugin
} from "chart.js";

// Register necessary chart.js modules
Chart.register(ArcElement, Tooltip, Legend, DoughnutController, Title);

// 🧾 Props Interface
export interface DoughnutChartProps {
    dataValues: number[];
    dataLabels: string[];
    backgroundColors?: string[];
    size?: number;
    cutout?: string | number;
    centerText?: {
        text: string;
        value: string | number;
    };
}

// 🎨 Center Text Plugin
const centerTextPlugin: Plugin<"doughnut"> = {
    id: "centerTextPlugin",
    beforeDraw: (chart) => {
        const center = chart.config.options?.plugins?.centerText as DoughnutChartProps["centerText"];
        if (!center) return;

        const { width, height, ctx } = chart;
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#333";
        ctx.font = "bold 16px";
        ctx.fillText(center.text, width / 2, height / 2 - 10);
        ctx.font = "bold 20px";
        ctx.fillText(String(center.value), width / 2, height / 2 + 10);
        ctx.restore();
    }
};

// 📊 DoughnutChart Component
const DoughnutChart: React.FC<DoughnutChartProps> = ({
    dataValues,
    dataLabels,
    backgroundColors = ["#ff6384", "#36a2eb", "#ffcd56"],
    size = 300,
    cutout = "70%",
    centerText
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart<"doughnut"> | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        if (chartRef.current) {
            chartRef.current.destroy(); // destroy previous chart instance
        }

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        chartRef.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: dataLabels,
                datasets: [
                    {
                        data: dataValues,
                        backgroundColor: backgroundColors,
                        hoverOffset: 10
                    }
                ]
            },
            options: {
                responsive: true,
                cutout,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 500
                },
                plugins: {
                    legend: {
                        position: "bottom"
                    },
                    centerText
                }
            } as ChartOptions<"doughnut">,
            plugins: centerText ? [centerTextPlugin] : []
        });

        return () => {
            chartRef.current?.destroy();
        };
    }, [dataValues, dataLabels, backgroundColors, cutout, centerText]);

    return <canvas ref={canvasRef} width={size} height={size}></canvas>;
};

export default DoughnutChart;
