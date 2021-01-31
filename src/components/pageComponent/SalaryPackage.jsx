import React, { useState } from "react";
import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import Select from "react-select";
import SalaryPackageAdditon from "./SalaryPackageAddition";
import SalaryPackageDeduction from "./SalaryPackageDeduction";
import axios from "axios";
import BASE from "../../configs/BASE";
import Swal from "sweetalert2";

const SalaryPackage = () => {
  const [fetchData, setFetchData] = useState(false);
  const [fetchDataAddition, setFetchDataAddition] = useState([]);
  const [fetchDataDeduction, setFetchDataDeduction] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [salaryAmount, setSalaryAmount] = useState("");
  const [subtotal, setSubtotal] = useState(0);

  const fetchAddition = (data) => {
    console.log("main additon data", data);
    setFetchDataAddition(data.data);
    setSubtotal(data.subtotal);
    console.log("enw subtitle: ", data.subtotal);
  };
  const fetchDeduction = (data) => {
    console.log("main deduction data", data);
    setFetchDataDeduction(data);
  };

  const SalaryPackagePost = async () => {
    if (subtotal != salaryAmount) {
      return Swal.fire({
        title: "must be equal to addition and salary amount",
        icon: "warning",
        timer: 2000,
      });
    }

    let formateAddition = fetchDataAddition.map((e) => {
      return { pH_Id: e.value, aMT: e.amount };
    });

    let formateDeduction = fetchDataDeduction.map((e) => {
      return { pH_Id: e.value, aMT: e.amount };
    });

    let formatedData = [...formateAddition, ...formateDeduction];

    console.log("formated data", {
      sAP_Nm: packageName,
      tOT_Amt: salaryAmount,
      data: formatedData,
    });

    try {
      let url = `${BASE.URL}/api/DSA51P14`;
      await axios({
        url: url,
        method: "post",
        data: {
          sAP_Nm: packageName,
          tOT_Amt: salaryAmount,
          data: formatedData,
        },
      });
      return Swal.fire({
        title: "saved successfully",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      return Swal.fire({
        title: "something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <h5>Package Name</h5>
            <Input
              type="text"
              placeholder="Pacakge Name"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <h5>Salary Amount</h5>
            <Input
              type="number"
              placeholder="Salary Amount"
              value={salaryAmount}
              onChange={(e) => {
                setSalaryAmount(parseInt(e.target.value));
                setFetchData(true);
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      { fetchData ? <>
        <Row>
        <Col>
          <SalaryPackageAdditon
            fetchAddition={fetchAddition}
            fetchData={fetchData}
            salaryAmount={salaryAmount}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SalaryPackageDeduction
            fetchDeduction={fetchDeduction}
            fetchData={fetchData}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup className="form-label-group">
            <Button.Ripple
              color="primary"
              type="submit"
              className="mr-1 mb-1"
              onClick={SalaryPackagePost}
            >
              Save
            </Button.Ripple>
          </FormGroup>
        </Col>
      </Row>
      </> : null}

    </>
  );
};

export default SalaryPackage;
