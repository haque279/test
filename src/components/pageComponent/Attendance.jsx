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
import _ from "lodash";
import moment from "moment";
import Swal from "sweetalert2";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import "bootstrap/dist/css/bootstrap.min.css";

// import "../../../assets/scss/custom.css"

const Attendance = () => {
  const [dob, setDob] = useState(new Date());

  const [lateTime, setLateTime] = useState("");
  const [scheduleList, setScheduleList] = useState([]);
  const [schedule, setSchedule] = useState({ label: "", value: "" });
  const [employee, setEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [timeList, setTimeList] = useState([]);
  const [inOut, setInOut] = useState({ value: "IN", label: "IN" });

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
      dataField: "sTR_Tm",
      text: "Start Time",
    },
    {
      dataField: "eND_Tm",
      text: "End Time",
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
            value={lateTime}
            onChange={(date) => {
              console.log("late time:", date[0]);
              setLateTime(date[0]);
              handleDateTime(row.id, date[0]);
            }}
          />
        </div>
      ),
    },
  ]);

  const handleDateTime = (id, time) => {
    console.log("ddd", id, time);
    timeList.push({ id, time });
    console.log("time", timeList);
  };

  const getEmployee = async (mySchedule, myInOut) => {
    let url = `${BASE.URL}/api/griddata/EMPDEM49A12/${mySchedule}/${myInOut}`;
    console.log("url", url);
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setEmployee(newData);
    console.log("employee", newData);
  };

  const getSchedule = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLSchedule`;
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setScheduleList(newData);
  };

  const handleSchedule = (e) => {
    setSchedule({ label: e.label, value: e.value });
    console.log("schedule ", e.value, inOut);
    getEmployee(e.value, inOut.value);
  };

  const handleInOut = (e) => {
    setInOut({ label: e.label, value: e.value });
    console.log("inout ", schedule.value, e);
    getEmployee(schedule.value, e.value);
  };

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    // selected: [],

    onSelect: (row, isSelect, rowIndex, e) => {
      if (isSelect) {
        selectedEmployee.push(row);
      } else {
        let newEmployee = selectedEmployee.filter((e) => e.id != row.id);
        setSelectedEmployee(newEmployee);
      }

      console.log("single employee", selectedEmployee);
    },
    onSelectAll: (isSelect, rows, e) => {
      employee.forEach((res) => {
        if (isSelect) {
          selectedEmployee.push(res);
        } else {
          setSelectedEmployee([]);
        }
      });
      console.log("employees all: ", selectedEmployee);
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("timeList", timeList);
    console.log("selected employee list", selectedEmployee);
    let myTimeList = _.uniqBy(timeList, "id");
    console.log("uni list", myTimeList);
    const newselected = selectedEmployee.map((emp) => {
      let newtime = myTimeList.filter((time) => time.id === emp.id);
      if (newtime.length > 0) {
        let mytime = newtime[0].time;
        emp.time = mytime;
      }
      return emp;
    });

    console.log("emp", newselected);

    try {
      if (inOut.label === "IN") {
        let toSend = newselected.map((res) => {
          let response = {};
          response.e_Id = res.id;
          response.sCH_Id = res.sCH_Id;
          response.wRK_Dat = dob;
          if (res.time) {
            response.iNT = moment(res.time).format("HH:mm:ss");
          } else {
            response.iNT = res.sTR_Tm;
          }
          return response;
        });
        console.log("to send", toSend);
        let url = `${BASE.URL}/api/DEM49A12`;
        let response = await axios({
          method: "post",
          url: url,
          data: toSend,
        });
      }

      if (inOut.label === "OUT") {
        let toSend = newselected.map((res) => {
          let response = {};
          response.e_Id = res.id;
          response.sCH_Id = res.sCH_Id;
          response.wRK_Dat = dob;
          if (res.time) {
            response.oUT = moment(res.time).format("HH:mm:ss");
          } else {
            response.oUT = res.eND_Tm;
          }
          return response;
        });
        console.log("to send", toSend);
        let url = `${BASE.URL}/api/DEM49A12/UPDDEM49A12`;
        let response = await axios({
          method: "put",
          url: url,
          data: toSend,
        });
      }

      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    // getEmployee();
    getSchedule();
  }, []);

  return (
    <>
      <Card>
        <div
          className="voucher-header mt-1 ml-1 mr-1"
          style={{ marginBottom: -40 }}
        >
          <span>
            <h3 className="primary">Attendence</h3>
          </span>{" "}
          <span style={{ width: 200 }}></span>
          <span>
            <FormGroup style={{ float: "left", width: 200, marginRight: 10 }}>
              <Label for="basicInput">In / Out {inOut.label} </Label>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={dropData[0]}
                name="clear"
                options={[
                  { value: "IN", label: "IN" },
                  { value: "OUT", label: "OUT" },
                ]}
                // isClearable={true}
                onChange={handleInOut}
                value={{ label: inOut.label, value: inOut.value }}
              />
            </FormGroup>
            <FormGroup style={{ float: "left", width: 200, marginRight: 20 }}>
              <Label for="basicInput">Schedule {schedule.label} </Label>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={dropData[0]}
                name="clear"
                options={scheduleList}
                // isClearable={true}
                onChange={handleSchedule}
                value={schedule}
              />
            </FormGroup>
            <span style={{ marginLeft: 50, fontSize: 17 }} className="primary">
              Date: {moment().format("Y-MM-D")}
            </span>
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
                    onClick={handleSubmit}
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
