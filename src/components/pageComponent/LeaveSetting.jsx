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
  Input,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import LeaveSettingInput from "./LeaveSettingInput";
import { get } from "jquery";

const LeaveSetting = () => {
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [change, setChange] = useState(false);
  const [leaveHeader, setLeaveHeader] = useState([]);
  const [leaveValue, setLeaveValue] = useState({});
  const [allLeave, setAllLeave] = useState({});
  const [year, setYear] = useState(moment().format("Y"));

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
      dataField: "eT_Nm",
      text: "Employee Type",
      filter: textFilter(),
    },
    {
      dataField: "dOJ",
      text: " DOJ",
      filter: textFilter(),
      formatter: (cell, row) => {
        return moment(cell).format("Y-M-DD");
      },
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

      if (isSelect) {
        let newRows = rows.map((e) => {
          return e;
        });
        console.log("new employees all check: ", newRows);
        setSelectedEmployee(newRows);
      }
      else {
        setSelectedEmployee([]);
      }
    },
  };

  const getEmployee = async () => {
    let url = `${BASE.URL}/api/griddata/DEMSCHDETALL`;
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setEmployee(newData);
    console.log("new data", newData);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let obj = leaveValue;
    let formatedData = Object.keys(obj).map((key) => ({
      leaveId: Number(key),
      leaveDays: obj[key],
    }));

    if (selectedEmployee.length == 0) {
      return Swal.fire({
        title: "no employee selected",
        icon: "warning",
        timer: 2000,
      });
    }

    const newEmployeeList = selectedEmployee.map((item) => {
      let e_Id = item.id;
      return e_Id;
    });

    let toDatabase = {
      employee: newEmployeeList,
      attr: formatedData,
      yER: year,
    };
    console.log("all data", toDatabase);

    try {
      let url = `${BASE.URL}/api/DEM45L08`;
      const newdata = await axios({
        url: url,
        method: "post",
        data: toDatabase,
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

  const getLeaveHeader = async () => {
    try {
      let url = `${BASE.URL}/api/griddata/DEM45LEAVE`;
      const newData = await axios({
        url: url,
        method: "get",
      });
      setLeaveHeader(newData.data);
      console.log("newData head", newData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const callBack = (fieldId, fieldValue, fieldLabel) => {
    let item = leaveValue;
    item[fieldId] = parseInt(fieldValue);
    setLeaveValue(item);
    console.log("item", item);
    console.log("label: ", fieldLabel);
  };

  useEffect(() => {
    getEmployee();
    getLeaveHeader();
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col md="8">
                <BootstrapTable
                  keyField="id"
                  key={employee.id}
                  data={employee}
                  columns={columns}
                  filter={filterFactory()}
                  selectRow={selectRow}
                />
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="basicInput">
                    <h5 className="success">Year</h5>
                  </Label>
                  <Input
                    type="number"
                    id="basicInput"
                    placeholder="Enter Year"
                    className="year-box"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </FormGroup>

                {leaveHeader.map((item, index) => (
                  <LeaveSettingInput
                    key={index}
                    data={item}
                    callBack={callBack}
                  />
                ))}
              </Col>

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

export default LeaveSetting;
