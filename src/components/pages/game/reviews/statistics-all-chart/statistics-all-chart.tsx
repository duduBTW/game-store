// import { letterFrequency } from "@visx/mock-data";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand, scaleOrdinal } from "@visx/scale";
import { useTheme } from "styled-components";
import { BarAllStatistics, Props } from "./statistics-all-chart.props";

// We'll use some mock data from `@visx/mock-data` for this.
// const data = letterFrequency.slice(0, 2);

// console.log("data", data);

// Define the graph dimensions and margins
const width = 140;
const height = 94;
const margin = { top: 0, bottom: 0, left: 0, right: 0 };

// Then we'll create some bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// We'll make some helpers to get at the data we want
const yAccessor = (d: BarAllStatistics) => d.type;
const xAcessor = (d: BarAllStatistics) => d.count;

// And then scale the graph by our data

// Finally we'll embed it all in an SVG
function BarGraph({ reviews }: Props) {
  const theme = useTheme();

  const data: BarAllStatistics[] = [
    {
      count: reviews.likes,
      type: "like",
    },
    {
      count: reviews.deslikes,
      type: "deslike",
    },
  ];

  const yScale = scaleBand({
    range: [0, yMax],
    domain: data.map(yAccessor),
    padding: 0.4,
  });
  const xScale = scaleLinear({
    range: [xMax, 0],
    domain: [0, Math.max(...data.map(xAcessor))],
  });

  const colorScale = scaleOrdinal<string, string>({
    domain: ["A", "B"],
    range: [theme.colors.blue["600"], theme.colors.red["600"]],
  });

  return (
    <svg width={width} height={height}>
      {data.map((d, i) => {
        const barWidth = xMax - xScale(xAcessor(d));

        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={width - barWidth}
              y={yScale(yAccessor(d))}
              height={yScale.bandwidth()}
              width={barWidth}
              fill={colorScale(yAccessor(d))}
              rx={4}
            />
          </Group>
        );
      })}
    </svg>
  );
}

export default BarGraph;
