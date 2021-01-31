import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import BASE from "../../configs/BASE";
import "../../assets/scss/custom.css";

const SalaryPackageAdditon = ({ fetchAddition, fetchData, salaryAmount }) => {
  const [subtotal, setSubtotal] = useState(0);
  const [addition, setAddition] = useState([]);
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
            message: `Price should bigger than 0  `,
          };
        }
        return true;
      },
    },
  ]);
  // const [deductionColumns, setDeductionColumns] = useState([]);

  const beforeSaveCell = (oldValue, newValue, row, column, done) => {
    return console.log("before salary amount", typeof salaryAmount);
  };
  const afterSaveCell = (oldValue, newValue, row, column) => {
    let newAdded = addition.filter((res) => res.value == row.value);
    // if(oldValue){
    // let newAddedOld = addition.filter((res) => res.value == row.value);
    // newAdded[0].amount = -row.value;

    // }
    console.log("old", oldValue, "new", newValue);
    let newAmount = parseInt(row.amount);
    newAdded[0].amount = newAmount;
    console.log("salary amount", salaryAmount);
    let valueBefore = 0;
    if (oldValue) {
      let newOldValue = subtotal - parseInt(oldValue);
      console.log("old valu", newOldValue);
      valueBefore = parseInt(oldValue);
    }
    let newSubtotal = subtotal + newAmount - valueBefore;
    setSubtotal(newSubtotal);
    let allData = addition.filter((res) => res.value != row.value);
    console.log("edited value", newSubtotal);
    console.log("edited data addition", [...newAdded, ...allData]);
    fetchAddition({
      data: [...newAdded, ...allData],
      subtotal: newSubtotal,
    });
  };

  const getAddition = async () => {
    try {
      let url = `${BASE.URL}/api/ddldata/DDLPayHeadAddition`;
      let data = await axios({
        url: url,
        method: "get",
      });
      let newData = data.data.map((e) => {
        e.amount = 0;
        return e;
      });

      console.log("newData", newData);
      setAddition(newData);
      console.log("adition", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fetchData) {
      getAddition();
    }
  }, [fetchData]);

  return (
    <div className="salary_package">
      <h3>Addition </h3>
      <BootstrapTable
        keyField="value"
        data={addition}
        columns={columns}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true,
          beforeSaveCell,
          afterSaveCell,
        })}
      />
      <h5 style={{ textAlign: "right", marginRight: 250 }} className="primary" >
        Subtotal: {subtotal}
      </h5>
    </div>
  );
};

export default SalaryPackageAdditon;
