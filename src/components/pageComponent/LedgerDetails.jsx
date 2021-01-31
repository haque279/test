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

const LedgerDetails = ({
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
              <h3 className="primary">Details</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <Row style={{ width: "100%" }}>
            <Col>
              <h4>Voucher type(Contra) No : 1</h4>
            </Col>
            <Col>
              <h4 className="text-right">01-jul-2020</h4>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <h5>Party : Cash</h5>
              <i style={{ marginLeft: 20 }}>Current Bal : 850000000</i>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h6>Primax Fashion</h6>
                  <i style={{ marginLeft: 20 }}>Current Bal : 350000000</i>
                </td>
                <td>200000</td>
              </tr>
              <tr>
                <td>
                  <h6>Grand Total</h6>
                </td>
                <td>
                  <i>200000</i>
                </td>
              </tr>

              {/* {productList.map((item, index) => (
            <tr key={index}>
              <th scope="row">1</th>
              <td>{item.lcProduct.sKU_Code}</td>
              <td>{item.lcProduct.gEN_Nm}</td>
              <td>{item.lcProduct.vE_Nm}</td>
              <td>{item.lcProduct.bR_Nm}</td>
              <td>{item.lcProduct.cT_Nm}</td>
              <td>{item.quantity}</td>
              <td>{item.unitId.label}</td>
              <td>{item.unitPrice}</td>
              <td>{item.myTotal}</td>
              <td>
                <Button
                  color="danger"
                  className="btn-icon rounded-circle"
                  onClick={(e) => delteRow(item.lcProduct.skuId)}
                >
                  <X size={15} />
                </Button>
              </td>
            </tr>
          ))} */}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default LedgerDetails;
