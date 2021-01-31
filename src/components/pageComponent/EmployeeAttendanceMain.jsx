import React, { useState } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
  Input,
} from "reactstrap";

import Flatpickr from "react-flatpickr";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import EmployeeAttendanceGrid from "./EmployeeAttendanceGrid";

const EmployeeAttendanceMain = () => {
  const [dob, setDob] = useState(new Date());

  return (
    <>
      <Card>
        <CardBody>
          <div className="EmployeeAttendace">
            <Row>
              <Col xs="6">
                <Label for="dob">
                  <b>Date :</b>
                </Label>
                <Flatpickr
                  id="dob"
                  className="form-control"
                  options={{ dateFormat: "Y-m-d" }}
                  value={dob}
                  onChange={(date) => {
                    // handledob(date);
                    setDob(date[0]);
                  }}
                />
              </Col>
              <Col xs="6">
                <Label for="Schedule">
                  <b>Schedule :</b>
                </Label>

                <Input type="select" name="select" id="Schedule">
                  <option>Select</option>
                  <option>9:00</option>
                  <option>3:00</option>
                </Input>
              </Col>
            </Row>
            {/* <FormGroup row>
              <Label for="dob" sm={1}>
                Date :
              </Label>
              <Col sm={2}>
                <Flatpickr
                  id="dob"
                  className="form-control"
                  options={{ dateFormat: "Y-m-d" }}
                  value={dob}
                  // onChange={(date) => {
                  //   handledob(date);
                  //   parentCallback(fieldName, date[0]);
                  // }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="Schedule" sm={1}>
                Schedule :
              </Label>
              <Col sm={2}>
                <Input
                  type="text"
                  name="Schedule"
                  id="Schedule"
                  placeholder="Name"
                />
              </Col>
            </FormGroup> */}
          </div>
          <Form className="mt-2">
            <EmployeeAttendanceGrid />

            <Row>
              <Col id="Footer" sm="12">
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
                    outline
                    color="warning"
                    type="reset"
                    className="mb-1"
                  >
                    Print
                  </Button.Ripple>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default EmployeeAttendanceMain;
