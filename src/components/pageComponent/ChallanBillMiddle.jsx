import React, { useState } from "react";
import { FormGroup, Row, Col, Input, Label, Table } from "reactstrap";
import Select from "react-select";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import Flatpickr from "react-flatpickr";
const colourOptions = [
  { value: "select", label: "Select" },
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

const ChallanBillMiddle = () => {
  const [dob, setDob] = useState(new Date());
  return (
    <div>
      <div className="date">
        <Row>
          <Col md="1">
            <h4>Date </h4>{" "}
          </Col>
          <Col md="10">
            <Flatpickr
              id="dob"
              options={{ dateFormat: "Y-m-d" }}
              value={dob}
              onChange={(date) => {
                // handledob(date);
                setDob(date[0]);
              }}
            />
          </Col>
        </Row>
      </div>
      <FormGroup row>
        <Label for="Customer" md={1}>
          <h5 id="Customer" className="my-1">
            Customer
          </h5>
        </Label>
        <Col md={3} style={{ marginTop: 12 }}>
          <Select
            className="React"
            classNamePrefix="select"
            defaultValue={colourOptions[0]}
            name="color"
            options={colourOptions}
          />
        </Col>
      </FormGroup>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          <FormGroup row>
            <Label for="BillNo" md={3}>
              <h5 id="BillNo" className="my-1">
                Bill No
              </h5>
            </Label>
            <Col md={9} style={{ marginTop: 12 }}>
              <Input type="text" id="Quantity" placeholder="" />
            </Col>
          </FormGroup>
        </Col>
        <Col md="4"></Col>
      </Row>

      <Table responsive>
        <thead>
          <tr>
            <th>Seclect</th>
            <th>SL</th>
            <th>Challan Date</th>
            <th>Memo No</th>
            <th>Lc</th>
            <th>Chalan Amonut</th>
            <th>Packet Cost</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#</td>
            <th scope="row">1</th>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
          </tr>
          <tr>
            <td>#</td>
            <th scope="row">2</th>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
          </tr>
          <tr>
            <td>#</td>
            <th scope="row">3</th>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
            <td>#</td>
          </tr>
        </tbody>
      </Table>
      <hr
        style={{
          color: "#0097E6",
          backgroundColor: "#0097E6",
          height: 1,
        }}
      />
      <Row>
        <Col md="8"></Col>
        <Col md="4">
          <FormGroup row>
            <Label for="tcm" md={5}>
              <h5 className="my-1">Total Challan Amount :</h5>
            </Label>
            <Col md={7} style={{ marginTop: 12 }}>
              <Input type="text" id="tcm" placeholder="" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="tpc" md={5}>
              <h5 className="my-1">Total Packet Cost :</h5>
            </Label>
            <Col md={7} style={{ marginTop: 12 }}>
              <Input type="text" id="tpc" placeholder="" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="tb" md={5}>
              <h5 className="my-1">Total Bill :</h5>
            </Label>
            <Col md={7} style={{ marginTop: 12 }}>
              <Input type="text" id="tb" placeholder="" />
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ChallanBillMiddle;
