import React from "react";
import { Input } from "antd";

const expand = {
  title: null,
  dataIndex: "expand",
  key: "expand",
  width: 48,
};

const number = {
  title: "№",
  dataIndex: "number",
  key: "number",
  width: 48,
};

const name = {
  title: "Вид работ",
  dataIndex: "groupName",
  key: "name",
  width: 264,
  render: (value, record) =>
    record.groupName || record.kindName || record.materialName,
};

const unit = {
  title: "Ед. изм.",
  dataIndex: "unit",
  key: "unit",
  width: 80,
};

const consumptionRate = {
  title: "Норма расхода",
  dataIndex: "consumptionRate",
  key: "consumptionRate",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const volume = {
  title: "Объем",
  dataIndex: "volume",
  key: "volume",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const mainMaterials = {
  title: "Осн. мат.",
  dataIndex: "mainMaterials",
  key: "mainMaterials",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const smr = {
  title: "СМР",
  dataIndex: "smr",
  key: "smr",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const sum = {
  title: "Всего",
  dataIndex: "sum",
  key: "sum",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const totalMainMaterials = {
  title: "Осн. мат.",
  dataIndex: "totalMainMaterials",
  key: "totalMainMaterials",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const totalSmr = {
  title: "СМР",
  dataIndex: "totalSmr",
  key: "totalSmr",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const totalSum = {
  title: "Всего",
  dataIndex: "totalSum",
  key: "totalSum",
  width: 80,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null),
};

const commentUser = {
  title: "Примечание",
  dataIndex: "commentUser",
  key: "commentUser",
  width: 144,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={text} /> : null),
};

const remark = {
  title: "Замечания",
  dataIndex: "remark",
  key: "remark",
  width: 144,
  shouldCellUpdate: () => false,
  render: (text) => (text ? <Input value={text} /> : null),
};

export default [
  expand,
  number,
  name,
  unit,
  consumptionRate,
  volume,
  {
    title: "Стоимость ед., ₽, в т.ч. НДС",
    width: 240,
    children: [mainMaterials, smr, sum],
  },
  {
    title: "Стоимость всего., ₽, в т.ч. НДС",
    width: 240,
    children: [totalMainMaterials, totalSmr, totalSum],
  },
  commentUser,
  remark,
];

export const rawColumns = [
  expand,
  number,
  name,
  unit,
  consumptionRate,
  volume,
  mainMaterials,
  smr,
  sum,
  totalMainMaterials,
  totalSmr,
  totalSum,
  commentUser,
  remark,
];
