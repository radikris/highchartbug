import React from "react";
import ColumnChart from "./ColumnChart";

const Page3 = () => {
  return (
    <div>
      Page3
      <ColumnChart key={"3"} id={"3"} />
      <p className="mt-10">
        WITHOUT CUSTOM RADIUS WORKING: UNCOMMENT ColumnChart.jsx #111 line
      </p>{" "}
    </div>
  );
};

export default Page3;
