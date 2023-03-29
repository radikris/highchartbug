import React from "react";
import ColumnChart from "./ColumnChart";

const Page1 = () => {
  return (
    <div>
      PAGE1
      <ColumnChart key={"1"} id={"1"} />
      <p className="mt-10">
        WITHOUT CUSTOM RADIUS WORKING: UNCOMMENT ColumnChart.jsx #111 line
      </p>
    </div>
  );
};

export default Page1;
