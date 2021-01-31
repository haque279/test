import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import BASE from "../../configs/BASE";
import "../../assets/scss/custom.css";

const SalaryPackageDeduction = ({ fetchDeduction, fetchData }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [deduction, setDeduction] = useState([]);
  const [columns, setColumns] = useState([
    {
      dataField: "value",
      text: "ID",
    },
    {
      dataField: "label",
      text: "Pay Head",
      editable: false,
    },
    {
      dataField: "amount",
      text: "Amount",
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Price should be numeric",
          };
        }
        if (newValue < 0) {
          return {
            valid: false,
            message: "Price should bigger than 0",
          };
        }
        return true;
      },
    },
  ]);
  // const [deductionColumns, setDeductionColumns] = useState([]);

  // const beforeSaveCell = (oldValue, newValue, row, column, done) => {};
  const afterSaveCell = (oldValue, newValue, row, column) => {
    let newAdded = deduction.filter((res) => res.value == row.value);
    let newAmount = parseInt(row.amount);
    newAdded[0].amount = newAmount;
    let valueBefore = 0;
    if (oldValue) {
      let newOldValue = subtotal - parseInt(oldValue);
      console.log("old valu", newOldValue);
      valueBefore = parseInt(oldValue);
    }
    setSubtotal(subtotal + newAmount - valueBefore);
    let allData = deduction.filter((res) => res.value != row.value);
    console.log("edited value", newAdded);
    console.log("edited data deduction", [...newAdded, ...allData]);
    fetchDeduction([...newAdded, ...allData]);
  };

  const getDeduction = async () => {
    try {
      let url = `${BASE.URL}/api/ddldata/DDLPayHeaddeduction`;
      let data = await axios({
        url: url,
        method: "get",
      });
      let newData = data.data.map((e) => {
        e.amount = 0;
        return e;
      });

      console.log("newData", newData);
      setDeduction(newData);
      console.log("diduction", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      getDeduction();
    }
  }, [fetchData]);

  return (
    <div className="salary_package">
      <h3>Deduction</h3>
      <BootstrapTable
        keyField="value"
        data={deduction}
        columns={columns}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          afterSaveCell,
        })}
      />
      <h5 style={{ textAlign: "right", marginRight: 250 }} className="primary" >
        Subtotal: {subtotal}
      </h5>
    </div>
  );
};

export default SalaryPackageDeduction;


