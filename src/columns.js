import React from "react";
import { Input } from "antd";

export default [
  {
    title: null,
    dataIndex: "expand",
    key: "expand",
    width: 48
  },
  {
    title: "№",
    dataIndex: "number",
    key: "number",
    width: 48
  },
  {
    title: "Вид работ",
    key: "name",
    width: 264,
    render: (value, record) =>
      record.groupName || record.kindName || record.materialName
  },
  {
    title: "Ед. изм.",
    dataIndex: "unit",
    key: "unit",
    width: 80
  },
  {
    title: "Норма расхода",
    dataIndex: "consumptionRate",
    key: "consumptionRate",
    width: 80,
    shouldCellUpdate: () => false,
    render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null)
  },
  {
    title: "Объем",
    dataIndex: "volume",
    key: "volume",
    width: 80,
    shouldCellUpdate: () => false,
    render: (text) => (text ? <Input value={Number(text).toFixed(2)} /> : null)
  },
  {
    title: "Стоимость ед., ₽, в т.ч. НДС",
    width: 240,
    children: [
      {
        title: "Осн. мат.",
        dataIndex: "mainMaterials",
        key: "mainMaterials",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      },
      {
        title: "СМР",
        dataIndex: "smr",
        key: "smr",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      },
      {
        title: "Всего",
        dataIndex: "sum",
        key: "sum",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      }
    ]
  },
  {
    title: "Стоимость всего., ₽, в т.ч. НДС",
    width: 240,
    children: [
      {
        title: "Осн. мат.",
        dataIndex: "totalMainMaterials",
        key: "totalMainMaterials",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      },
      {
        title: "СМР",
        dataIndex: "totalSmr",
        key: "totalSmr",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      },
      {
        title: "Всего",
        dataIndex: "totalSum",
        key: "totalSum",
        width: 80,
        shouldCellUpdate: () => false,
        render: (text) =>
          text ? <Input value={Number(text).toFixed(2)} /> : null
      }
    ]
  },
  {
    title: "Примечание",
    dataIndex: "commentUser",
    key: "commentUser",
    width: 144,
    shouldCellUpdate: () => false,
    render: (text) => (text ? <Input value={text} /> : null)
  },
  {
    title: "Замечания",
    dataIndex: "remark",
    key: "remark",
    width: 144,
    shouldCellUpdate: () => false,
    render: (text) => (text ? <Input value={text} /> : null)
  }
];
