import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import Flatpickr from "react-flatpickr";
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

const EmployeeSalaryDetails = () => {
  const [allSalaryDetails, setAllSalaryDetails] = useState([]);
  const [salaryPackage, setSalaryPackage] = useState({});
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [change, setChange] = useState(false);

  const [columns, setColumns] = useState([
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "employeeName",
      text: "Employee Name",
      filter: textFilter(),
      sort: true,
    },
    {
      dataField: "dP_Nm",
      text: "Department",
      filter: textFilter(),
    },
    {
      dataField: "dGN_Nm",
      text: "Desegnation",
      filter: textFilter(),
    },
    {
      dataField: "dGN_Nm",
      text: "Employee Type",
      filter: textFilter(),
    },
    {
      dataField: "sAP_Nm",
      text: " Salary Package",
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
        // filterData[0].sAP_Nm = salaryPackage.value;
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
      setChange(!change);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log("is select ", isSelect);
      console.log(rows);
      console.log(e);
      console.log("Salary: ", salaryPackage.value);

      if (isSelect) {
        // let newRows = rows.map((e) => {
        //   e.sAP_Nm = salaryPackage.value;
        //   return e;
        // });
        // console.log("new employees all check: ", rows);
        setSelectedEmployee(rows);
      }else {
        setSelectedEmployee([]);
      }
    },
  };

  const getSalaryDetails = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLSalaryPackage`;
    let data = await axios({
      method: "get",
      url: url,
    });
    setAllSalaryDetails(data.data);
  };

  const getEmployee = async () => {
    let url = `${BASE.URL}/api/griddata/DEMSALAYDTL`;
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setEmployee(newData);
    console.log("new data employee", newData);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!salaryPackage.value || selectedEmployee.length == 0) {
      return Swal.fire({
        title: "select please",
        icon: "warning",
        timer: 2000,
      });
    }

    

    let newSelectedEmployee = selectedEmployee.map(e => {
      e.sAP_Nm = salaryPackage.value
      return e
    })



    const toSalaryDetails = newSelectedEmployee.map((item) => {
      let e_Id = item.id;
      let sAP_Id = item.sAP_Nm;

      return { e_Id, sAP_Id };
    });

    console.log("toSalaryDetails", toSalaryDetails);

    try {
      let url = `${BASE.URL}/api/DSA53D16`;
      const newdata = await axios({
        url: url,
        method: "post",
        data: toSalaryDetails,
      });
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
      getEmployee();
      console.log(newdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSalaryDetails();
    getEmployee();
  }, []);

  return (
    <>
      <Card>
        <div className="voucher-header mt-1 ml-1 mr-1">
          <span style={{ width: 200 }}>
            <Label for="basicInput">Salary Package </Label>
            <Select
              className="React"
              classNamePrefix="select"
              defaultValue={allSalaryDetails[0]}
              name="clear"
              options={allSalaryDetails}
              onChange={(e) => {
                setSalaryPackage({ label: e.label, value: e.value });
                // setSelectedEmployee([]);
              }}
            />
          </span>
          <span></span>
          <span> </span>
        </div>

        <CardBody>
          <Form className="mt-2">
            <Row>
              <BootstrapTable
                keyField="id"
                key={employee.id}
                data={employee}
                columns={columns}
                filter={filterFactory()}
                selectRow={selectRow}
              />

              <>
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={handleSave}
                  >
                    Save
                  </Button.Ripple>
                  <Button.Ripple
                    color="warning"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    Print
                  </Button.Ripple>
                </FormGroup>
              </>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default EmployeeSalaryDetails;
