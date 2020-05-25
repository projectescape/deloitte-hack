import { useTheme } from "@material-ui/core/styles";
import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Title from "./Title";

export default function Chart({ title, yLabel, blood = false, data }) {
  const theme = useTheme();

  return (
    <>
      <Title color={theme.palette.info.main}>{title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              {yLabel}
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.info.main}
            dot={true}
            strokeWidth={3}
          />
          {blood && (
            <Line
              type="monotone"
              dataKey="amount1"
              stroke={theme.palette.success.main}
              dot={true}
              strokeWidth={3}
            />
          )}
          <CartesianGrid stroke={theme.palette.text.disabled} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
