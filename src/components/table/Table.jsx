import React, { Component } from "react";
import cx from "classnames";
import { array } from "prop-types";
import "./styles.scss";

class Table extends Component {
  renderTitleColumns = () => {
    const { columns, handleSort } = this.props;
    const columnsTitle = columns.map((column, index) => {
      const hasSorter = column.sorter;
      return (
        <td
          className={cx({ "table-head-sorter-column": hasSorter })}
          onClick={hasSorter ? handleSort(column.key) : null}
          key={index}
        >
          <span>{column.title}</span>
          {hasSorter && <span className="ml8 c-black">&#8645;</span>}
        </td>
      );
    });

    return columnsTitle;
  };

  renderRows = () => {
    const { dataSource } = this.props;
    return dataSource.map((data, rowIndex) => (
      <tr key={rowIndex}>{this.renderCell(data, rowIndex)}</tr>
    ));
  };

  renderCell = (data, rowIndex) => {
    const { columns } = this.props;

    const cellValue = columns.map((column, index) => {
      const columnKey = column.key;
      const text = data[columnKey] || "";

      // render function has higher priority
      if (typeof column.render === "function") {
        const renderContent = columns[index].render(text, data, rowIndex);
        return <td key={index}>{renderContent}</td>;
      }

      return <td key={index}>{text}</td>;
    });

    return cellValue;
  };

  render() {
    const { dataSource } = this.props;

    return (
      <table id="table-comp" className="table-container">
        <thead className="table-head">
          <tr>{this.renderTitleColumns()}</tr>
        </thead>

        {dataSource.length > 0 && (
          <tbody className="table-body">{this.renderRows()}</tbody>
        )}
      </table>
    );
  }
}

Table.propTypes = {
  dataSource: array.isRequired,
  columns: array.isRequired,
};

Table.defaultProps = {
  dataSource: [],
  columns: [],
};

export default Table;
