import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../assets/scss/custom.css";

const TrailBalanceReport = ({
  columnMain,
  columnChild,
  urlMain,
  urlChild,
  tableName,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3 className="primary">Trail Balance</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <Row style={{ width: "100%" }}>
            <Col>
              <h6>Closing Balance for 01-jul-2020</h6>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="8">
              <h4>Particulars</h4>
            </Col>
            <Col>Debit</Col>
            <Col>Credit</Col>
          </Row><hr/>
          <br></br>
          <Row>
            <Col md="8">
              <h6>
                <i>Cash</i>
              </h6>
            </Col>
            <Col>
              <h6>
                <i>20000</i>
              </h6>
            </Col>
            <Col></Col>
          </Row>
          <hr/>
          <Row>
            <Col md="8">
              <h6>
                <i>DBBL</i>
              </h6>
            </Col>
            <Col>
              <h6>
                <i>60000</i>
              </h6>
            </Col>
            <Col></Col>
          </Row><hr/>
          <Row>
            <Col md="8">
              <h6>
                <i>Salary</i>
              </h6>
            </Col>
            <Col></Col>
            <Col>
              <h6>
                <i>70000</i>
              </h6>
            </Col>
          </Row><hr/>
          <Row>
            <Col md="8">
              <h6>
                <i>Difference in opening balance</i>
              </h6>
            </Col>
            <Col></Col>
            <Col>
              <h6>
                <i>10000</i>
              </h6>
            </Col>
          </Row><hr/>
          <hr
            style={{
              color: "#0097E6",
              backgroundColor: "#0097E6",
              height: 1,
            }}
          />
          <Row>
            <Col md="8">
              <h5>Grand Total</h5>
            </Col>
            <Col>
              <h5>80000</h5>
            </Col>
            <Col><h5>80000</h5></Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default TrailBalanceReport;
