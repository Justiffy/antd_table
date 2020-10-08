import React, { useState, useRef, useEffect, useMemo } from "react";
import { Table } from "antd";
import ResizeObserver from "rc-resize-observer";
import classNames from "classnames";
import { VariableSizeGrid as Grid } from "react-window";

import data from "./data.json";
import columns from "./columns";
import { numerateData } from "./helpers";

import "antd/dist/antd.css";

export default function App() {
  const [tableWidth, setTableWidth] = useState(0);
  const scroll = { y: 600, x: 600 };

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount)
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
      }
    });

    return obj;
  });

  const resetVirtualGrid = () => {
    gridRef.current &&
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: false
      });
  };

  useEffect(() => resetVirtualGrid, [tableWidth]);

  const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
    ref.current = connectObject;
    const totalHeight = rawData.length * 54;
    return (
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index) => {
          const { width } = mergedColumns[index];
          return totalHeight > scroll.y && index === mergedColumns.length - 1
            ? width - scrollbarSize - 1
            : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={1200}
        onScroll={({ scrollLeft }) => {
          onScroll({
            scrollLeft
          });
        }}
      >
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames("virtual-table-cell", {
              "virtual-table-cell-last":
                columnIndex === mergedColumns.length - 1
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  const groups = useMemo(() => numerateData(data), []);

  return (
    // <ResizeObserver
    //   onResize={({ width }) => {
    //     setTableWidth(width);
    //   }}
    // >  
    <Table
      bordered
      className="virtual-table"
      rowKey="id"
      pagination={false}
      dataSource={groups.slice(0, 5)}
      columns={columns}
      // scroll={scroll}
      // components={{
      //   body: renderVirtualList
      // }}
      components={{
        body: {
          row: React.memo(row),
        }
      }}
      expandable={{
        rowExpandable: (record) => record?.children?.length,
        defaultExpandAllRows: true,
        indentSize: 0
      }}
      rowSelection
    />
    // </ResizeObserver>
  );
}

const row = (q, ...w) => {
  return (
    <tr>
      {q.children.map((el) => {
        return (
          <td>{el}</td>
        )
      })}
    </tr>
  );
}