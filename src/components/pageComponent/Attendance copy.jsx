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
import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import "bootstrap/dist/css/bootstrap.min.css";

// import "../../../assets/scss/custom.css"

const Attendance = () => {
  const [dob, setDob] = useState(new Date());

  const [lateTime, setLateTime] = useState("");
  const [id, setId] = useState();
  const [late, setLate] = useState(null);
  const [employee, setEmployee] = useState([]);

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
      dataField: "dGN_Nm",
      text: "Designation  ",
      filter: textFilter(),
    },
    {
      dataField: "dP_Nm",
      text: "Department",
      filter: textFilter(),
    },
    {
      dataField: "eT_Nm",
      text: "Employee Type",
    },
    {
      dataField: "late",
      text: "Late Time",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <Flatpickr
            className="form-control"
            // value={fieldValue}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
            }}
            onChange={(date) => {
              console.log("late time:", date[0]);
              setLateTime(date[0]);
              console.log("date emplyee", employee);
              handleTime();
            }}
          />
        </div>
      ),
    },
  ]);

  const getEmployee = async () => {
    let url = `${BASE.URL}/api/griddata/DEMSCHDETALL`;
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setEmployee(newData);
    console.log("employee", newData);
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    // selected: [],

    onSelect: (row, isSelect, rowIndex, e) => {
      return console.log("row now", row);
      setId(null);
      setLateTime("");
      setId(row.id);
      let filteredDataOne = employee.filter((res) => res.id === row.id);
      let filteredDataAll = employee.filter((res) => res.id != row.id);
      filteredDataOne[0].select = isSelect;
      filteredDataOne[0].late = lateTime;
      console.log("employee change single", employee);
    },
    onSelectAll: (isSelect, rows, e) => {
      console.log(isSelect);
      console.log(rows);
      console.log(e);
      let newEmployeeData = [];
      employee.forEach((res) => {
        let name = res.name;
        let department = res.department;
        let select = isSelect;
        let newData = { name, department, select };
        newEmployeeData.push(newData);
        console.log("new data", newData);
      });
      console.log("new employees all: ", newEmployeeData);
    },
  };

  const handleTime = () => {
    let filteredDataOne = employee.filter((res) => res.id === id);
    console.log("employee change late time", filteredDataOne);
  };

  useEffect(() => {
    console.log("id", id);
    getEmployee();
  }, []);

  return (
    <>
      <Card>
        <div
          className="voucher-header mt-1 ml-1 mr-1"
          style={{ marginBottom: -40 }}
        >
          <span>Date: 15-12-2020 </span>
          <span>
            <h3 className="primary">Attendence</h3>
          </span>{" "}
          <span style={{ width: 200 }}>
            <FormGroup>
              <Label for="basicInput">In / Out </Label>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={dropData[0]}
                name="clear"
                // options={dropData}
                // isClearable={true}
                // onChange={handleChange}
                // value={{ label: selectLabel, value: selectValue }}
              />
            </FormGroup>
          </span>
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
                    onClick={(e) => e.preventDefault()}
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

export default Attendance;
