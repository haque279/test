import React, { useState, useContext } from "react";
import {
  Label,
  Card,
  CardBody,
  Form,
  Row,
  Col,
  FormGroup,
  Button,
  ButtonDropdown,
  Input,
} from "reactstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";
import BASE from "../../configs/BASE";

const EmployeeMonthlySalary = () => {
  const [advance, setAdvance] = useState("");
  const [deduction, setDeduction] = useState("");
  const [narration, setNarration] = useState("");

  const reload = () => {};

  const handleSave = async () => {
    let allData = localStorage.getItem("allData");
    let dataJson = JSON.parse(allData);
    let salaryData = dataJson.salaryData;
    let selectedEmployee = dataJson.selectedEmployee;

    let salaryDetailData = selectedEmployee.map((e) => {
      let payAmout = parseInt(e.pa);
      let bonus = parseInt(e.bo);
      let contribution = parseInt(e.ct);
      let pAmount = payAmout + bonus - contribution - advance - deduction;

      return {
        e_Id: e.empId,
        mNTH: e.mo,
        yER: e.yr,
        tWO_Dys: e.twd,
        lAT_Dys: e.tld,
        // lAT_Dduc: e.ldd,
        lEA_Dys: e.ld,
        lWUT_Pay: e.lwp,
        tOPA_Dys: e.tpd,
        gRS_Sal: e.gs,
        tOPA_Amt: e.pa,
        cNTBUT: e.ct,
        bONS: e.bo,
        lON_Adv: parseInt(advance),
        o_Dduc: parseInt(deduction),
        nAR: narration,
        nET_Sal: pAmount,
      };
    });

    let sendData = { ...salaryData, salaryDetailData };
    console.log("sendData", sendData);

    try {
      let url = `${BASE.URL}/api/DMO57S20`;
      await axios({
        method: "post",
        url: url,
        data: sendData,
      });
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
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
      <div className=""></div>
      <Card>
        <Row className="voucher-header mt-1 ml-1 mr-1">
          <Col>
            <FormGroup>
              <h5>Advance </h5>
              <Input
                type="text"
                placeholder="Advance"
                value={advance}
                onChange={(e) => {
                  setAdvance(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <h5>Other Deduction</h5>
              <Input
                type="text"
                placeholder="Other Deduction"
                value={deduction}
                onChange={(e) => {
                  setDeduction(e.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <h6>Naration</h6>

            <Input
              type="textarea"
              name="naration"
              id="basicInput"
              placeholder="Write Here"
              value={narration}
              onChange={(e) => setNarration(e.target.value)}
            />
          </Col>
          <Col md="12" className="mt-1">
            <>
              <FormGroup className="form-label-group">
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                  onClick={handleSave}
                >
                  Save
                </Button.Ripple>
              </FormGroup>
            </>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default EmployeeMonthlySalary;
