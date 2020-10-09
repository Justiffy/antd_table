import React, { useState, useRef, useEffect, useMemo } from "react";
import { Table } from "antd";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { VariableSizeGrid as Grid } from "react-window";

import data from "./data.json";
import columns, { rawColumns } from "./columns";
import { numerateData } from "./helpers";

import "antd/dist/antd.css";

export default function App() {
  const [tableWidth, setTableWidth] = useState(0);
  const scroll = { y: 600, x: 600 };

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = rawColumns.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      // width: Math.floor(tableWidth / widthColumnCount),
      width: 150,
    };
  });

  const gridRef = useRef();
  const [connectObject] = useState(() => {
    const obj = {};
    Object.defineProperty(obj, "scrollLeft", {
      get: () => null,
      set: (scrollLeft) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current &&
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false,
      });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;

    console.log("rawData: ", rawData);
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={13}
        columnWidth={(index) => 150}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={1460}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft,
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames("virtual-table-cell", {
              "virtual-table-cell-last":
                columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {/* {console.log("www: ", mergedColumns[columnIndex])}
            {rawData[rowIndex]?.[mergedColumns[columnIndex].dataIndex]} */}
            {mergedColumns[columnIndex].render
              ? mergedColumns[columnIndex].render(
                  rawData[rowIndex]?.[mergedColumns[columnIndex].dataIndex],
                  rawData[rowIndex]
                )
              : rawData[rowIndex]?.[mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  const helper = (ww) => {
    const reducedData = ww.reduce((acc, cur) => {
      if (cur.children?.length > 0) {
        const { children, ...otherData } = cur;
        return [...acc, { ...otherData, expand: "-" }, ...cur.children];
      }
      return [...acc, cur];
    }, []);

    return reducedData;
  };

  function flatChildren(arr) {
    return arr.reduce(function (total, curr) {
      if (curr.children) total = [...total, ...flatChildren(curr.children)];
      total.push(curr);
      return total;
    }, []);
  }

  const groups = useMemo(() => numerateData(data), []);
  const newData = helper(groups);

  console.log("newData: ", newData);

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width);
      }}
    >
      <Table
        bordered
        className="virtual-table"
        rowKey="id"
        pagination={false}
        dataSource={newData}
        columns={columns}
        scroll={scroll}
        components={{
          body: renderVirtualList,
        }}
        components={{
          body: renderVirtualList,
        }}
        // expandable={{
        //   rowExpandable: (record) => record?.children?.length,
        //   defaultExpandAllRows: true,
        //   indentSize: 0,
        // }}
        rowSelection
      />
    </ResizeObserver>
  );
}

const row = (q, ...w) => {
  return (
    <tr>
      {q.children.map((el) => {
        return <td>{el}</td>;
      })}
    </tr>
  );
};
