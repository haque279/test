import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
  Input,
} from "reactstrap";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import axios from "axios";
import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import VoucherParticular from "./VoucherParticular";
import { date } from "yup";

const depositWithdrawList = [
  { value: "1", label: "Deposit" },
  { value: "2", label: "Withdraw" },
];

const ReceiptVoucherMain = () => {
  const [isClear, setIsClear] = useState(false);
  const [allParticularData, setAllParticularData] = useState({});
  const [voucher, setVoucher] = useState("");
  const [invoice, setInvoice] = useState("");
  const [referenceBillNo, setReferenceBillNo] = useState("");
  const [dob, setDob] = useState("");
  const [dropDataDeposit, setDropDataDeposit] = useState([]);
  const [dropDataBank, setDropDataBank] = useState([]);
  const [entryDate, setEntryDate] = useState("");
  const [currentBalance, setcurrentBalance] = useState(0);
  const [newCurrentBalance, setNewCurrentBalance] = useState(0);
  const [newTotal, setNewTotal] = useState(0);
  const [balanceType, setBalanceType] = useState("");
  const [depositWithdraw, setDepositWithdraw] = useState({
    label: "",
    value: "",
  });
  const [dropDataBankFirst, setDropDataBankFirst] = useState({
    label: "",
    value: "",
  });
  const [dropDataDepositFirst, setDropDataDepositFirst] = useState({
    label: "",
    value: "",
  });
  const [bankCash, setBankCash] = useState({ label: "", value: "" });
  const [naration, setNaration] = useState("");

  const handledob = (date) => {
    setDob(date);
  };

  const particularData = (data) => {
    setAllParticularData(data);
    setIsClear(false);
    let total = data.total;
    setNewTotal(total);

    if (balanceType === "Dr") {
      let mybalance = currentBalance + total;

      setNewCurrentBalance(mybalance);
    } else {
      let mybalance = currentBalance - total;
      if (mybalance == 0) {
        mybalance = Math.abs(mybalance);
        setBalanceType("");
      }
      if (mybalance < 0) {
        mybalance = Math.abs(mybalance);
        setBalanceType("Dr");
      }
      setNewCurrentBalance(mybalance);
    }
  };

  const getCashBank = async () => {
    try {
      let url = `${BASE.URL}/api/ddldata/DDLBankLedger`;
      let data = await axios({
        url: url,
        method: "get",
      });
      setDropDataBank(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      Object.keys(allParticularData).length === 0 ||
      allParticularData.particulars.length < 1
    ) {
      return Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }

    let Part = allParticularData.particulars.map((e) => {
      let myAmount = parseInt(e.price);
      return {
        lGR_Id: e.value,
        aMT: myAmount,
        cEQ_No: e.chequeNo,
        cEQ_Dat: e.chequeDate,
      };
    });

    let data = {
      dAT: entryDate,
      lGR_Id: bankCash.value,
      tOT_Amt: allParticularData.total,
      nAR: naration,
      iNV_No: invoice,
      rFBL_No: referenceBillNo,
      Part: Part,
    };

    console.log("all data", data);
    try {
      let url = `${BASE.URL}/api/ERE98M40`;
      let returnVoucher = await axios({
        method: "post",
        url: url,
        data: data,
      });
      console.log("output", returnVoucher);
      setVoucher(returnVoucher.data);
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
      setDob("");
      setDepositWithdraw({ label: "", value: "" });
      setBankCash({ label: "", value: "" });
      setNaration("");
      setIsClear(!isClear);
      setAllParticularData({});
      setInvoice("");
      setNewTotal("");
      setEntryDate("");
      setReferenceBillNo("");
      setNewCurrentBalance(0);
      setBalanceType("");
    } catch (error) {
      Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  const getCurrentBalance = async (id) => {
    let url = `${BASE.URL}/api/griddata/CURRENTBALALLLGR/${id}`;
    let cData = await axios({
      url: url,
      method: "get",
    });

    if (cData.data[0].currentBalance < 0) {
      setBalanceType("Cr");
    } else {
      setBalanceType("Dr");
    }
    let myBalance = Math.abs(cData.data[0].currentBalance);
    setcurrentBalance(myBalance);
    setNewCurrentBalance(myBalance);
  };

  useEffect(() => {
    getCashBank();
    setDropDataDeposit(depositWithdrawList);
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          {voucher ? (
            <h3 className="text-center text-primary">Voucher No: {voucher} </h3>
          ) : null}

          <Form>
            <Row>
              <Col>
                <h6>Date: </h6>
                <Flatpickr
                  id="dob"
                  className="form-control"
                  options={{ dateFormat: "Y-m-d" }}
                  value={entryDate}
                  onChange={(date) => {
                    setEntryDate(date[0]);
                  }}
                />
              </Col>
              <Col>
                <h6>Invoice No</h6>
                <Input
                  type="text"
                  name="price"
                  placeholder="Invoice No"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                />
              </Col>
              <Col>
                <h6>Reference Bill No</h6>
                <Input
                  type="text"
                  placeholder="Reference Bill No"
                  value={referenceBillNo}
                  onChange={(e) => setReferenceBillNo(e.target.value)}
                />
              </Col>
              <Col className="mt-3" style={{ textAlign: "right" }}>
                <span className="journal-total3">
                  Total Amount: TK {newTotal}{" "}
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6 className="mt-1">Cash / Bank </h6>
                <Select
                  className="React"
                  classNamePrefix="select"
                  defaultValue={dropDataBank[0]}
                  name="color"
                  options={dropDataBank}
                  value={bankCash}
                  onChange={(e) => {
                    setBankCash({ label: e.label, value: e.value });
                    getCurrentBalance(e.value);
                  }}
                />
                <Label>
                  <i>
                    Current Balance : {newCurrentBalance} {balanceType}{" "}
                  </i>
                </Label>
              </Col>
            </Row>

            <hr
              style={{
                color: "#0097E6",
                backgroundColor: "#0097E6",
                height: "1px",
              }}
            />
            <VoucherParticular
              particularData={particularData}
              particularUrl={`${BASE.URL}/api/ddldata/DDLAccountLedger`}
              selectedId={bankCash.value}
              isClear={isClear}
              depositWithdraw={depositWithdraw.label}
            />
            <Row className="mt-2">
              <Col sm="12" className="mt-1">
                <h6>Naration</h6>

                <Input
                  type="textarea"
                  name="naration"
                  id="basicInput"
                  placeholder="Write Here"
                  value={naration}
                  onChange={(e) => setNaration(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Row>
              <Col id="Footer">
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

export default ReceiptVoucherMain;
