import React, { Component } from "react";
import { array } from "prop-types";
import "./styles.scss";

class Table extends Component {
  renderTitleColumns = () => {
    const { columns } = this.props;
    return columns.map((column, index) => <td key={index}>{column.title}</td>);
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
      <table className="table-container">
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
