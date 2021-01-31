import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Input,
  Label,
} from "reactstrap";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import BASE from "../../configs/BASE";

import JournalLeft from "./JournalLeft";
import JournalRight from "./JournalRight";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import { JournalContext } from "../../contexts/JournalContext";

const JournalMain = () => {
  const [dob, setDob] = useState(new Date());
  const [leftList, setLeftList] = useState([]);
  const [rigthList, setRightList] = useState([]);
  const [leftTotal, setLeftTotal] = useState(0);
  const [rightTotal, setRightTotal] = useState(0);
  const { allJournal } = useContext(JournalContext);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [voucherNo, setVoucherNo] = useState("");
  const [naration, setNaration] = useState("");
  const [emptyArray, setEmptyArray] = useState(false);
  const [empty, setEmpty] = useState(false);

  const getData = () => {
    const url = `${BASE.URL}/api/ddldata/DDLAccountLedger`;
    axios({
      method: "get",
      url: `${url}`,
    })
      .then((res) => {
        if (res.status === 200) {
          allJournal(res.data);
        }
      })
      .catch((err) => {
        console.log("otp err", err);
      });
  };

  const leftData = (data, total) => {
    setLeftList(data);
    setLeftTotal(total);
  };

  const rightData = (data, total) => {
    setRightList(data);
    setRightTotal(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (leftList.length == 0 || rigthList.length == 0) {
      return Swal.fire({
        title: "Please add in grid first",
        icon: "warning",
        timer: 2000,
      });
    }

    if (leftTotal !== rightTotal) {
      return Swal.fire({
        title: "Debit and Credit balance is not equal",
        icon: "warning",
      });
    }

    let leftModifyData = leftList.map((e) => {
      let data = {
        lGR_Id: e.value,
        dBIT: e.price,
        cRD: 0,
        cEQ_No: e.chequeNo,
        cEQ_Dat: e.chequeDate,
      };
      return data;
    });
    let rightModifyData = rigthList.map((e) => {
      let data = {
        lGR_Id: e.value,
        dBIT: 0,
        cRD: e.price,
        cEQ_No: e.chequeNo,
        cEQ_Dat: e.chequeDate,
      };
      return data;
    });

    let data = {
      iNV_No: invoiceNo,
      nAR: naration,
      tOT_Amt: leftTotal,
      dAT: dob,
      Part: [...leftModifyData, ...rightModifyData],
    };

    console.log("all data jour", data);

    try {
      let url = `${BASE.URL}/api/EJR78M20`;
      let getVoucherNo = await axios({
        method: "post",
        url: url,
        data: data,
      });
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
      setVoucherNo(getVoucherNo.data);
      setInvoiceNo("");
      setEmptyArray(!emptyArray);
      setEmpty(!empty);
      setNaration("");
    } catch (error) {
      Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    getData();
  }, [empty]);

  return (
    <>
      <Card>
        <CardBody>
          <div className="voucher-header">
            <span>
              Invoice No:{" "}
              <input
                className="date-right"
                type="text"
                value={invoiceNo}
                onChange={(e) => setInvoiceNo(e.target.value)}
              />{" "}
            </span>
            <span className="modal_header">Voucher No: {voucherNo}</span>{" "}
            <span>
              Date:{" "}
              <Flatpickr
                id="dob"
                className="date-right"
                options={{ dateFormat: "Y-m-d" }}
                value={dob}
                onChange={(date) => {
                  setDob(date[0]);
                }}
              />
            </span>
          </div>

          <Form className="mt-2">
            <JournalLeft emptyArray={emptyArray} getLeftData={leftData} />
            <JournalRight emptyArray={emptyArray} getRightData={rightData} />

            <Col sm="12" className="mt-1 mb-2">
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

            <Col sm="12">
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
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default JournalMain;
