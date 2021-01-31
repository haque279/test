import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const NextTable = () => {
  const [columns, setcolumns] = useState([
    {
      dataField: "id",
      text: "Product ID",
    },
    {
      dataField: "name",
      text: "Product Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "price",
      text: "Product Price",
    },
  ]);
  const [products, setproducts] = useState([
    { id: 1, name: "test one", price: 22 },
    { id: 2, name: "test name", price: 22 },
    { id: 3, name: "test name", price: 22 },
    { id: 4, name: "test name", price: 22 },
  ]);
  const expandRow = {
    renderer: (row) => (
      <div>
        <p>{`This Expand row is belong to rowKey ${row.id}`}</p>
        <p>
          You can render anything here, also you can add additional data on
          every row object
        </p>
        <p>
          expandRow.renderer callback will pass the origin row object to you
        </p>
      </div>
    ),
    showExpandColumn: true,
  };
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={products}
        columns={columns}
        filter={filterFactory()}
        // pagination={paginationFactory()}
        selectRow={{ mode: "checkbox", clickToSelect: true }}
        expandRow={expandRow}
      />
    </div>
  );
};

export default NextTable;
