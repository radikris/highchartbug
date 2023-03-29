import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import CustomEvents from "highcharts-custom-events";
import borderRadius from "highcharts-border-radius";
import { useEffect, useState } from "react";

CustomEvents(Highcharts);
borderRadius(Highcharts);

const customColumnRadius = (Highcharts) => {
  (function (H) {
    H.wrap(H.seriesTypes.column.prototype, "translate", function (proceed) {
      const options = this.options;
      const topMargin = options.topMargin || 0;
      const bottomMargin = options.bottomMargin || 0;

      proceed.call(this);

      H.each(this.points, function (point) {
        console.log(point);
        if (options.customRadius) {
          const w = point.shapeArgs.width;
          const h = point.shapeArgs.height;
          const x = point.shapeArgs.x;
          const y = point.shapeArgs.y;

          let radiusTopLeft,
            radiusTopRight,
            radiusBottomRight,
            radiusBottomLeft;

          if (point.y > 0) {
            radiusTopLeft = H.relativeLength(options.customRadius, w);
            radiusTopRight = H.relativeLength(options.customRadius, w);
            radiusBottomLeft = 2;
            radiusBottomRight = 2;
          } else {
            radiusTopLeft = 2;
            radiusTopRight = 2;
            radiusBottomRight = H.relativeLength(options.customRadius, w);
            radiusBottomLeft = H.relativeLength(options.customRadius, w);
          }

          const maxR = Math.min(w, h) / 2;

          radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft;
          radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight;
          radiusBottomRight =
            radiusBottomRight > maxR ? maxR : radiusBottomRight;
          radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft;

          point.dlBox = point.shapeArgs;

          point.shapeType = "path";
          point.shapeArgs = {
            d: [
              "M",
              x + radiusTopLeft,
              y + topMargin,
              "L",
              x + w - radiusTopRight,
              y + topMargin,
              "C",
              x + w - radiusTopRight / 2,
              y,
              x + w,
              y + radiusTopRight / 2,
              x + w,
              y + radiusTopRight,
              "L",
              x + w,
              y + h - radiusBottomRight,
              "C",
              x + w,
              y + h - radiusBottomRight / 2,
              x + w - radiusBottomRight / 2,
              y + h,
              x + w - radiusBottomRight,
              y + h + bottomMargin,
              "L",
              x + radiusBottomLeft,
              y + h + bottomMargin,
              "C",
              x + radiusBottomLeft / 2,
              y + h,
              x,
              y + h - radiusBottomLeft / 2,
              x,
              y + h - radiusBottomLeft,
              "L",
              x,
              y + radiusTopLeft,
              "C",
              x,
              y + radiusTopLeft / 2,
              x + radiusTopLeft / 2,
              y,
              x + radiusTopLeft,
              y,
              "Z",
            ],
          };
        }
      });
    });
  })(Highcharts);
};

function ColumnChart({ id }) {
  useEffect(() => {
    customColumnRadius(Highcharts); //TODO IF UNCOMMENT WORKING FINE
  }, []);

  Highcharts.AST.allowedAttributes.push("data-container");

  const options = {
    chart: {
      styledMode: false,
      type: "column",
    },
    title: {
      text: "",
    },
    yAxis: {
      title: {
        text: "",
      },
      plotLines: [
        {
          color: "#FF0000",
          width: 1,
          value: 0,
          zIndex: 2,
          dashStyle: "ShortDash",
        },
      ],
      labels: {
        style: {
          color: "#D1D5DB;",
        },
        formatter: function () {
          // Use a custom formatter function to style the label for the 0 level differently
          if (this.value === 0) {
            return (
              '<span style="font-size: 14px; line-height: 20px;color: #9CA3AF;">' +
              this.value +
              "</span>"
            );
          } else {
            return (
              '<span style="font-size: 14px; line-height: 20px;color: #D1D5DB;">' +
              this.value / 1000 +
              "k" +
              "</span>"
            );
          }
        },
      },
      gridLineColor: "#E5E7EB",
    },
    xAxis: {
      gridLineWidth: 0,
      gridLineColor: "#00000000",
      lineColor: "#E5E7EB",
      text: "",
      categories: ["Cat1", "Cat2", "Cat3"],
      labels: {
        useHTML: true, // enable HTML rendering
        formatter: function () {
          // format the labels with an icon
          return `
          <div class="flex flex-col space-y-1.5 items-center justify-center p-2 bg-white shadow rounded-lg">
    
          <p class="text-xs font-medium leading-none text-center text-gray-600">${this.value}</p>
      </div>
          
          `;
        },
        style: {
          textAlign: "center", // center the label text
        },
      },
    },
    plotOptions: {
      column: {
        pointWidth: 26,
        // borderRadius: 5, // Set a default value for the border radius
        customRadius: 31,
        pointPadding: 0.005,
        grouping: true,
        borderWidth: 0,
        point: {
          events: {
            mouseOver: function (e) {
              var targetX = e.target.x,
                from = targetX - 0.5,
                to = targetX + 0.5;

              this.series.chart.xAxis[0].addPlotBand({
                id: "plot-band-1",
                from: from,
                to: to,
                zIndex: 1,
                color: {
                  linearGradient: {
                    x1: 0,
                    x2: 1,
                    y1: 0,
                    y2: 1,
                  },
                  stops: [
                    [0, "rgb(235, 242, 255)"],
                    [1, "rgb(235, 242, 255)"],
                  ],
                },
              });
            },
            mouseOut: function (e) {
              this.series.chart.xAxis[0].removePlotBand("plot-band-1");
            },
          },
        },
      },
    },
    legend: { enabled: false },
    tooltip: {
      shared: true,
      useHTML: true,
      borderWidth: 0,
      padding: 8,
      shadow: false,
      backgroundColor: "transparent",

      formatter: function () {
        // console.log(this.points);
        const primary = this.points[0];
        const secondary = this.points[1];

        return this.points.reduce(function (s, point) {
          return `     <div class="bg-white p-4 flex flex-col w-64 shadow-md rounded-lg">
          <div class="w-fit flex gap-x-2 mb-4 items-center">
            <img src="/redesign/general/${s.x}.svg" class="w-5 h-5" />
            <div class="text-xs font-bold leading-none text-center text-gray-600">
              ${s.x}
            </div>
          </div>
          <div class="flex items-center gap-x-1 w-fit">
            <div style="background-color: ${primary.color}" class="w-5 h-1.5  rounded-full" ></div>
            <div class="text-xs leading-none text-gray-600">
              ${primary.series.name}:
            </div>
            <div class="text-gray-600 text-xs font-semibold">$ ${primary.y}</div>
          </div>
          <div class="flex items-center gap-x-1 w-fit">
          <div style="background-color: ${secondary.color}" class="w-5 h-1.5  rounded-full" ></div>
          <div class="text-xs leading-none text-gray-600">
            ${secondary.series.name}:
          </div>
          <div class="text-gray-600 text-xs font-semibold">$ ${secondary.y}</div>
        </div>
        </div>`;
        });
      },
    },
    series: [
      {
        name: "Thing1",
        data: [10000, 30000, 40000],
        color: "#0EA5E9",
      },
      {
        name: "Thing2",
        data: [5000, 12212, -8000],
        color: "#8B5CF6",
        grouping: "group2",
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        key={id}
        highcharts={Highcharts}
        options={options}
        containerProps={{ id: id }}
      />
    </div>
  );
}

export default ColumnChart;
