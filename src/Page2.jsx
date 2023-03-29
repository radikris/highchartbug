import React from "react";
import ColumnChart from "./ColumnChart";

const Page2 = () => {
  return (
    <div>
      Page2
      <ColumnChart key={"2"} id={"2"} />
      <p className="mt-10">
        WITHOUT CUSTOM RADIUS WORKING: UNCOMMENT ColumnChart.jsx #111 line
      </p>{" "}
    </div>
  );
};

export default Page2;
