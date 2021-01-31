import React from "react";
import { Card, CardBody, FormGroup, Row, Col, Form, Button } from "reactstrap";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import SalaryPackageMiddle from "./SalaryPackageMiddle";

const SalaryPackageMain = () => {
  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <SalaryPackageMiddle />

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
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default SalaryPackageMain;
