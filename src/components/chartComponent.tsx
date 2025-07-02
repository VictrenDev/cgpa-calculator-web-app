import React from "react";
import DoughnutChart from "@/components/chartLayout";

const Chart: React.FC = () => {
    const values = [20, 10, 20, 38, 10, 2];
    const labels = ["A", "B", "C", "D", "E", "F"];
    const colors = ["#4CAF50", "#8BC34A", "#FFEB3B", "#FF9800", "#FF5722", "#F44336"];
    // const total = values.reduce((acc, v) => acc + v, 0);

    return (
        <div >
            <DoughnutChart
                dataValues={values}
                dataLabels={labels}
                backgroundColors={colors}
                size={300}
                cutout="86%"
            // centerText={{ text: "Total", value: total }}
            />
        </div>
    );
};

export default Chart;
