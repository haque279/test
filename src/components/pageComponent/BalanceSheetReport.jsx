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

const BalanceSheetReport = ({
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
              <h3 className="primary">Balance Sheet </h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col style={{borderRight:"2px solid #285C8C"}}>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Liabilities</th>
                    <th></th>
                    <th className="text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
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
          <tr>
              <td>Total</td>
              <td></td>
              <td className="text-right">2500000</td>
          </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Assets</th>
                    <th></th>
                    <th className="text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
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
          ))} */}<tr>
              <td>Total</td>
              <td></td>
              <td className="text-right">2500000</td>
          </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default BalanceSheetReport;
