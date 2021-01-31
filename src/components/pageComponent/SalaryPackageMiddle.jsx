import React from "react";
import {
  FormGroup,
  Col,
  Label,
  Input,
  Table,
} from "reactstrap";
import "../../assets/scss/custom.css";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";


const SalaryPackageMiddle = () => {
  return (
    <div>
      <Col>
        <FormGroup row>
          <Label for="pn" md={2}>
            <h5 id="BillNo" className="my-1">
              Package Name
            </h5>
          </Label>
          <Col md={3} style={{ marginTop: 12 }}>
            <Input type="text" id="pn" placeholder="" />
          </Col>
        </FormGroup>
      </Col>

      <Col>
        <FormGroup row>
          <Label for="sa" md={2}>
            <h5 id="BillNo" className="my-1">
            Salary Amount
            </h5>
          </Label>
          <Col md={3} style={{ marginTop: 12 }}>
            <Input type="text" id="sa" placeholder="" />
          </Col>
        </FormGroup>
      </Col>

      <Col>
        <FormGroup row>
          <Label for="s" md={2}>
            <h5 id="BillNo" className="my-1">
              Status
            </h5>
          </Label>
          <Col md={3} style={{ marginTop: 12 }}>
            <Input type="text" id="s" placeholder="" />
          </Col>
        </FormGroup>
      </Col>

      <Col>
        <FormGroup row>
          <Label for="sbd" md={2}>
            <h5 id="BillNo" className="my-1">
              Salary Break Down
            </h5>
          </Label>
          <Col md={3} style={{ marginTop: 12 }}>
            <Input type="text" id="sbd" placeholder="" />
          </Col>
        </FormGroup>
      </Col>
      <Table responsive>
        <thead>
          <tr>

            <th>Select</th>
            <th>SL</th>
            <th>ID</th>
            <th>PAy Head</th>
            <th>Amount</th>
            <th>Type</th>

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

          </tr>
          <tr>
          <td>#</td>
            <th scope="row">2</th>
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

          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default SalaryPackageMiddle;
