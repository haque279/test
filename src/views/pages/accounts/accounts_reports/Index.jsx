import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../../../assets/scss/custom.css";

const Index = () => {
  return (
    <>
      <h2 className="modal_header">Accounts Report</h2>
      <h1 className="text-center modal_header">Common</h1>

      <hr
        style={{
          color: "#0097E6",
          backgroundColor: "#0097E6",
          height: 1,
        }}
      />
      <Row>
        <Col>
          <a href="/bsrpt" target="_blank">
            <Card
              body
              inverse
              style={{ backgroundColor: "#CD6155" }}
              className="Report-Card"
            >
              Balance Sheet
            </Card>
          </a>
        </Col>
        <Col>
        <a href="/plrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#EC7063" }}
              className="Report-Card"
            >
              Profit & Loss A/C
            </Card>
            </a>
        </Col>
        <Col>
        <a href="/tbrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#AF7AC5" }}
              className="Report-Card"
            >
              Trail Balance
            </Card>
            </a>
        </Col>
        <Col>
        <a href="/dbrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#A569BD" }}
              className="Report-Card"
            >
              Day Book
            </Card>
            </a>
        </Col>

        <Col>
        <a href="/cfrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#5499C7" }}
              className="Report-Card"
            >
              Cash Flow
            </Card>
            </a>
        </Col>
      </Row>

      <h1 className="text-center modal_header">Ledger/Group</h1>

      <hr
        style={{
          color: "#0097E6",
          backgroundColor: "#0097E6",
          height: 1,
        }}
      />
      <Row>
        <Col>
        <a href="/cbbk" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#5DADE2" }}
              className="Report-Card"
            >
              Cash/Bank Books
            </Card>
            </a>
        </Col>
        <Col>
        <a href="/lgrrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#48C9B0" }}
              className="Report-Card"
            >
              Ledger
            </Card>
            </a>
        </Col>
        <Col>
        <a href="/gsrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#45B39D" }}
              className="Report-Card"
            >
              Group Summary
            </Card>
          </a>
        </Col>
        <Col>
        <a href="/gvrpt" target="_blank">

            <Card
              body
              inverse
              style={{ backgroundColor: "#52BE80" }}
              className="Report-Card"
            >
              Group Vouchers
            </Card>
            </a>
        </Col>
        <Col></Col>
      </Row>
      <h1 className="text-center modal_header">Registers</h1>

      <hr
        style={{
          color: "#0097E6",
          backgroundColor: "#0097E6",
          height: 1,
        }}
      />
      <Row>
        <Col>
          <Link to="/cnvc">
            <Card
              body
              inverse
              style={{ backgroundColor: "#58D68D" }}
              className="Report-Card"
            >
              Contra
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/pavc">
            <Card
              body
              inverse
              style={{ backgroundColor: "#F4D03F" }}
              className="Report-Card"
            >
              Payment
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/revc">
            <Card
              body
              inverse
              style={{ backgroundColor: "#F5B041" }}
              className="Report-Card"
            >
              Receipt
            </Card>
          </Link>
        </Col>
        <Col>
          <Card
            body
            inverse
            style={{ backgroundColor: "#EB984E" }}
            className="Report-Card"
          >
            Sales
          </Card>
        </Col>
        <Col>
          <Card
            body
            inverse
            style={{ backgroundColor: "#DC7633" }}
            className="Report-Card"
          >
            Purchase
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/jovc">
            <Card
              body
              inverse
              style={{ backgroundColor: "#AAB7B8" }}
              className="Report-Card"
            >
              Journal
            </Card>
          </Link>
        </Col>
        <Col>
          <Card
            body
            inverse
            style={{ backgroundColor: "#99A3A4" }}
            className="Report-Card"
          >
            Detail Note
          </Card>
        </Col>
        <Col>
          <Card
            body
            inverse
            style={{ backgroundColor: "#5D6D7E" }}
            className="Report-Card"
          >
            Credit Note
          </Card>
        </Col>
        <Col>
          <Card
            body
            inverse
            style={{ backgroundColor: "#566573" }}
            className="Report-Card"
          >
            Voucher View
          </Card>
        </Col>
        <Col>
        <a href="/clnrpt" target="_blank">
          <Card
            body
            inverse
            style={{ backgroundColor: "#566573" }}
            className="Report-Card"
          >
            Challan
          </Card>
          </a>
        </Col>
      </Row>
    </>
  );
};

export default Index;
