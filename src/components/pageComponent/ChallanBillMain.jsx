import React from "react";
import { Card, CardBody, FormGroup, Row, Col, Form, Button } from "reactstrap";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import ChalanBillMiddle from "./ChallanBillMiddle";

const ChallanBillMain = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <ChalanBillMiddle />
            <br />
            <Row>
              <Col md="10"></Col>
              <Col md="2">
                <Row>
                  <Col id="Footer">
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
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default ChallanBillMain;
