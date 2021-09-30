import React from "react";
import DataTable, { createTheme } from "react-data-table-component";
import "./TopDistributor.css";

createTheme("solarized", {
  text: {
    primary: "#3B393D",
    secondary: "#2aa198",
  },
  background: {
    default: "#FAF8F4",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#073642",
  },
  action: {
    button: "rgba(0,0,0,.54)",
    hover: "rgba(0,0,0,.08)",
    disabled: "rgba(0,0,0,.12)",
  },
});
const columns = [
  {
    name: "Rank",
    selector: (row) => row.rank,
    center: true,
  },

  {
    name: "Name",
    selector: (row) => row.name,
    center: true,
  },
  {
    name: "Quantity of distribution",
    selector: (row) => row.quantity,
    center: true,
  },
];

const data = [
  {
    id: 1,
    rank: 1,
    name: "MinhLD",
    quantity: "192",
  },
  {
    id: 2,
    rank: 2,
    name: "MinhLD_1",
    quantity: "125",
  },
  {
    id: 3,
    rank: 3,
    name: "MinhLD_3",
    quantity: "87",
  },
];

export default function TopDistributor() {
  return (
    <div class="row mt-2">
      <span class="fs-5 fw-bold">Top Distributor</span>
      <div class="topDistributor-wrapper mt-2">
        <DataTable center columns={columns} data={data} theme="solarized" />
      </div>
    </div>
  );
}
