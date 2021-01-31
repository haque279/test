import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";

import BASE from "../../configs/BASE";
import "../../assets/scss/custom.css";
import EmployeeMonthlySalaryModal from "../../views/partial/EmployeeMonthlySalaryModal";
import Swal from "sweetalert2";

const EmployeeMonthlySalaryGrid = () => {
  const [dob, setDob] = useState(new Date());
  const [modal, setModal] = useState(false);
  const [payMonth, setPayMonth] = useState("");
  const [year, setYear] = useState("");
  const [advance, setAdvance] = useState(0);
  const [narration, setNarration] = useState("");
  const [deduction, setDeduction] = useState(0);
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [employeeDrop, setEmployeeDrop] = useState({ label: "", value: "" });
  const [postData, setPostData] = useState({});
  const [columns, setColumns] = useState([
    {
      dataField: "empId",
      text: "ID",
      formatter: (cell, row, rowIndex, extraData) => {
        return (
          <div>
            <span>ID: {row.id}</span>
            <br />
            <span>state: {payMonth}</span>
          </div>
        );
      },
    },
    {
      dataField: "employeeName",
      text: "Name",
      // filter: textFilter(),
    },
    {
      dataField: "dP_Nm",
      text: "Department",
    },
    {
      dataField: "dGN_Nm",
      text: "Designation",
    },
    {
      dataField: "eT_Nm",
      text: "Employee Type",
    },
    {
      dataField: "twd",
      text: "Working Days",
    },
    {
      dataField: "tld",
      text: "Leave Days",
    },
    {
      dataField: "lwp",
      text: "Leave without Pay",
    },
    {
      dataField: "tpd",
      text: "Pay Days",
    },
    {
      dataField: "gs",
      text: "Gross Salary",
    },
    {
      dataField: "pa",
      text: "Pay Amount",
    },
    {
      dataField: "ct",
      text: "Contribution",
    },

    {
      dataField: "av",
      text: "Advance",
    },
    {
      dataField: "od",
      text: "Other Deduction",
    },
    {
      dataField: "bo",
      text: "Bonus",
    },
    {
      dataField: "np",
      text: "Net payable",
    },
  ]);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    // selected: [],

    onSelect: (row, isSelect, rowIndex, e) => {
      console.log("single row", row);

      if (isSelect) {
        let filterData = employee.filter((e) => e.id == row.id);
        // filterData[0].av = parseInt(advance);
        // filterData[0].od = parseInt(deduction);
        setSelectedEmployee([...selectedEmployee, ...filterData]);
        console.log("select one row ....:", [
          ...selectedEmployee,
          ...filterData,
        ]);
      } else {
        let filterData = selectedEmployee.filter((e) => e.id != row.id);
        setSelectedEmployee([...filterData]);
        console.log("select one row: ....", [...filterData]);
      }
      // setChange(!change);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log("is select ", isSelect);
      console.log(rows);
      console.log(e);

      if (isSelect) {
        let newRows = rows.map((e) => {
          // e.av = parseInt(advance);
          // e.od = parseInt(deduction);
          return e;
        });
        console.log("new employees all check: ", newRows);
        setSelectedEmployee(newRows);
      } else {
        setSelectedEmployee([]);
      }
    },
  };

  const getEmployee = async () => {
    try {
      let url = `${BASE.URL}/api/griddata/EMSD/2020/12`;
      let data = await axios({
        url: url,
        method: "get",
      });
      setEmployee(data.data);
      // getEMSalary(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployeeDrop = async () => {
    try {
      let url = `${BASE.URL}/api/ddldata/DDLEmployee`;
      let data = await axios({
        url: url,
        method: "get",
      });
      setEmployeeDrop(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handledob = (date) => {
    setDob(date);
  };

  const part = (advance, deduction, narration) => {
    setAdvance(advance);
    setDeduction(deduction);
    setNarration(narration);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    let salaryData = { p_Yer: year, p_Mon: payMonth, p_Dat: dob };

    localStorage.setItem(
      "allData",
      JSON.stringify({ salaryData, selectedEmployee })
    );
    if (selectedEmployee.length < 1) {
      return Swal.fire({
        title: "Nothing selected",
        icon: "warning",
        timer: 2000,
      });
    }
    setModal(!modal);
  };

  const closeModal = (data) => {
    console.log("modal close", modal);
    setModal(!modal);
  };

  useEffect(() => {
    getEmployee();
    getEmployeeDrop();
  }, [modal]);

  return (
    <>
      <EmployeeMonthlySalaryModal openModal={modal} closeModal={closeModal} />

      <Card>
        <CardHeader className="mx-auto"></CardHeader>
        <Row className="voucher-header mt-1 ml-1 mr-1">
          <Col>
            <h5>Payment Date </h5>

            <Flatpickr
              id="dob"
              className="form-control"
              options={{ dateFormat: "Y-m-d", allowInput: true }}
              value={dob}
              onChange={(date) => {
                handledob(date);
                setDob(date[0]);
              }}
            />
          </Col>
          <Col>
            <h5>Pay Month</h5>
            <Select
              className="React"
              classNamePrefix="select form-control"
              // defaultValue={allSchedule[0]}
              name="clear"
              options={[
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ]}
              onChange={(e) => {
                setPayMonth(e.value);
              }}
            />
          </Col>
          <Col>
            <FormGroup>
              <h5>Year</h5>
              <Input
                type="text"
                placeholder="year"
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <h5>Employee </h5>
            <Select
              className="React"
              classNamePrefix="select"
              defaultValue={employeeDrop[0]}
              name="clear"
              options={employeeDrop}
              onChange={(e) => {
                // setSchedule({ label: e.label, value: e.value });
                // setSelectedEmployee([]);
              }}
            />
          </Col>
          <Col>
            <FormGroup className="form-label-group">
              <h5 style={{ color: "#fff" }}>' </h5>

              <Button.Ripple
                color="primary"
                type="submit"
                className="mr-1 mb-1"
                onClick={handleContinue}
              >
                Continue
              </Button.Ripple>
            </FormGroup>
          </Col>
        </Row>
        <CardBody>
          {/* {emSalary.salary ? emSalary.salary.map((e) => <p>{e.gs}</p>) : null} */}
          <div className="salary_package">
            <BootstrapTable
              keyField="id"
              data={employee}
              columns={columns}
              selectRow={selectRow}
              // filter={filterFactory()}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default EmployeeMonthlySalaryGrid;
