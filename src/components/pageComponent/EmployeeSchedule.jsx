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
import moment from "moment";

import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

const EmployeeSchedule = () => {
  const [allSchedule, setAllSchedule] = useState([]);
  const [schedule, setSchedule] = useState({});
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
      dataField: "eT_Nm",
      text: "Employee Type",
      filter: textFilter(),
    },
    {
      dataField: "dAT",
      text: "Schedule Date",
      filter: textFilter(),
      formatter: (cell, row) => {
        return moment(cell).format("Y-M-DD");
      },
    },
    {
      dataField: "sCH_Nm",
      text: " Schedule",
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
        // filterData[0].sCH_Nm = schedule.value;
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
      console.log("schedule: ", schedule.value);

      if (isSelect) {
        
        setSelectedEmployee(rows);
      }
      else {
        setSelectedEmployee([]);
      }
    },
  };

  const getSchedule = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLSchedule`;
    let data = await axios({
      method: "get",
      url: url,
    });
    setAllSchedule(data.data);
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

    if (!schedule.value || selectedEmployee.length == 0) {
      return Swal.fire({
        title: "select schedule",
        icon: "warning",
        timer: 2000,
      });
    }

 

    let newSelectedEmployee = selectedEmployee.map(e => {
      e.sCH_Nm = schedule.value
      return e
    })

     console.log('dddd', newSelectedEmployee); 

    const toSchedule = newSelectedEmployee.map((item) => {
      let e_Id = item.id;
      let sCH_Id = item.sCH_Nm;

      return { e_Id, sCH_Id };
    });

    console.log("toSchedule", toSchedule);

    try {
      let url = `${BASE.URL}/api/DEM43S06`;
      const newdata = await axios({
        url: url,
        method: "post",
        data: toSchedule,
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
    getSchedule();
    getEmployee();
  }, []);

  return (
    <>
      <Card>
        <div className="voucher-header mt-1 ml-1 mr-1">
          <span style={{ width: 200 }}>
            <Label for="basicInput">Schedule </Label>
            <Select
              className="React"
              classNamePrefix="select"
              defaultValue={allSchedule[0]}
              name="clear"
              options={allSchedule}
              onChange={(e) => {
                setSchedule({ label: e.label, value: e.value });
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
                // key={employee.id}
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

export default EmployeeSchedule;
