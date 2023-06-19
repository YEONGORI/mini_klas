import React from "react";
import ApexCharts from "react-apexcharts";

function Chart({ data }) {
  return (
    <div className="inline-block h-[100%] w-[90%]">
      <ApexCharts
        type="line"
        series={[{ data: data }]}
        options={{
          xaxis: {
            categories: [
              "1-1",
              "1-2",
              "2-1",
              "2-2",
              "3-1",
              "3-2",
              "4-1",
              "4-2",
            ],
          },
          yaxis: {
            min: 0,
            max: 4.5,
            tickAmount: 9,
          },
        }}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}

export default Chart;
