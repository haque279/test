import React, { useState } from "react";
import { Card, CardBody, FormGroup, Row, Col, Form, Button } from "reactstrap";
import axios from "axios";
import BASE from "../../configs/BASE";
import Swal from "sweetalert2";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import ProductFilterMiddle from "./ProductFilterMiddle";

const ProductFilterMain = () => {
  const [allProduct, setAllProduct] = useState([]);
  const [isClear, setIsClear] = useState(false);

  const getProductWithFilter = (data) => {
    setAllProduct(data);
    console.log("produt with filter one ", data);
  };

  const changeIsClear = (data) => {
    setIsClear(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (allProduct.length < 1) {
      return Swal.fire({
        title: "Add Product and filter please ",
        icon: "warning",
        timer: 2000,
      });
    }

    try {
      let url = `${BASE.URL}/api/APR08F08`;
      await axios({
        method: "post",
        url: url,
        data: allProduct,
      });
      console.log("output", allProduct);
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
      setIsClear(!isClear);
    } catch (error) {
      Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <ProductFilterMiddle
              getProductWithFilter={getProductWithFilter}
              isClear={isClear}
              changeIsClear={changeIsClear}
            />

            <Row>
              <Col id="Footer" sm="12">
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={handleSubmit}
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

export default ProductFilterMain;
