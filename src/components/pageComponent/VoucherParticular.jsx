import React, { useState, useEffect } from "react";
import { FormGroup, Row, Col, Input, Button, Label } from "reactstrap";
import Select from "react-select";
import { Plus, X } from "react-feather";
import Swal from "sweetalert2";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import BASE from "../../configs/BASE";

import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

const VoucherParticular = ({
  particularData,
  particularUrl,
  selectedId,
  isClear,
  depositWithdraw,
}) => {
  const [value, setValue] = useState("");
  const [price, setPrice] = useState("");
  const [entry, setEntry] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [currentBalance, setcurrentBalance] = useState(0);
  const [balanceType, setBalanceType] = useState("");
  const [newCurrentBalance, setNewCurrentBalance] = useState(0);

  const [dropData, setDropData] = useState([]);
  const [firstDropData, setFirstDropData] = useState({ label: "", value: "" });

  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [dob, setDob] = useState("");

  const handledob = (date) => {
    setDob(date);
  };

  const addRows = (e) => {
    if (!price || !value || value === selectedId || price > currentBalance) {
      return Swal.fire({
        title: "Particular or Amount empty or currection Particular",
        icon: "warning",
        timer: 2000,
      });
    }

    let newJournal = dropData.filter((res) => res.value === value);
    setFirstDropData({ label: "", value: "" });
    let newTotal = total + parseInt(price);
    setTotal(newTotal);

    let mybalance = 0;

    if (depositWithdraw) {
      if (depositWithdraw === "Deposit") {
        if (balanceType === "Dr") {
          mybalance = currentBalance - parseInt(price);
          setNewCurrentBalance(mybalance);
          console.log("mybalance Dr", mybalance);
        } else if (balanceType === "Cr") {
          mybalance = currentBalance + parseInt(price);
          setNewCurrentBalance(mybalance);
        }
      } else if (depositWithdraw === "Withdraw") {
        if (balanceType === "Dr") {
          mybalance = currentBalance - parseInt(price);
          setNewCurrentBalance(mybalance);
        } else if (balanceType === "Cr") {
          mybalance = currentBalance + parseInt(price);
          setNewCurrentBalance(mybalance);
        }
      }
    } else {
      if (balanceType === "Dr") {
        mybalance = currentBalance - parseInt(price);
        setNewCurrentBalance(mybalance);
      } else if (balanceType === "Cr") {
        mybalance = currentBalance + parseInt(price);
        setNewCurrentBalance(mybalance);
      }
    }

    entry.push({
      value,
      price,
      label: newJournal[0].label,
      chequeNo: chequeNo,
      chequeDate: chequeDate,
      balance: mybalance,
      type: balanceType,
    });

    setPrice("");
    setValue("");
    setChequeNo("");
    setChequeDate("");
    setcurrentBalance(0);
    setBalanceType("");
    let shortDrop = dropData.filter((res) => res.value !== value);
    setDropData(shortDrop);
    let data = { particulars: entry, total: newTotal };
    particularData(data);
  };

  const handleChange = (label, value) => {
    setValue(value);
  };

  const handleDelete = (clientOne, deletePrice) => {
    let newEntry = entry.filter((e) => e.value !== clientOne);
    setEntry(newEntry);
    let newTotal = total - deletePrice;
    setTotal(newTotal);
    setError("");
    let deletedDropData = entry.filter((e) => e.value === clientOne);
    let newDropData = [...deletedDropData, ...dropData];
    setDropData(newDropData);
    let data = { particulars: newEntry, total: newTotal };
    particularData(data);
  };

  const getDropData = async () => {
    try {
      let data = await axios({
        url: particularUrl,
        method: "get",
      });
      setDropData(data.data);
    } catch (error) {
      console.log(error);
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
    setcurrentBalance(Math.abs(cData.data[0].currentBalance));
  };

  useEffect(() => {
    getDropData();
    if (isClear) {
      setEntry([]);
      setTotal(0);
    }
  }, [isClear]);
  return (
    <>
      {error ? (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
      <div style={{ textAlign: "right" }}>
        <span className="journal-total2">Total Amount: TK {total}</span>
        <Button
          color="success"
          className="btn-icon rounded-circle"
          onClick={addRows}
        >
          <Plus size={15} />
        </Button>
      </div>
      <Row>
        <Col>
          <h6>Particulars</h6>
          <Select
            className="React"
            classNamePrefix="select "
            defaultValue={firstDropData[0]}
            name="value"
            value={firstDropData}
            options={dropData}
            onChange={(e) => {
              handleChange(e.label, e.value);
              setFirstDropData({ value: e.value, label: e.label });
              getCurrentBalance(e.value);
            }}
          />
          <Label>
            <i>
              Current Balance : {currentBalance} {balanceType}{" "}
            </i>
          </Label>
        </Col>
        <Col>
          <h6>Amount</h6>

          <FormGroup className="form-label-group">
            <Input
              type="number"
              name="price"
              placeholder="Amount"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <h6>Cheque No</h6>
          <Input
            type="text"
            name="price"
            placeholder="Cheque No"
            value={chequeNo}
            onChange={(e) => setChequeNo(e.target.value)}
          />
        </Col>
        <Col>
          <h6>Cheque Date: </h6>
          <Flatpickr
            id="dob"
            className="form-control"
            options={{ dateFormat: "Y-m-d" }}
            value={chequeDate}
            onChange={(date) => {
              handledob(date);
              setChequeDate(date[0]);
            }}
          />
        </Col>
      </Row>
      {entry.map((res, indexKey) => (
        <Row key={indexKey} className="mt-1">
          <Col>
            <Input
              type="text"
              name="particuler"
              disabled
              placeholder="Prticular"
              value={res.label}
            />

            <Label>
              <i>
                Current Balance : {res.balance} {res.type}{" "}
              </i>
            </Label>
          </Col>
          <Col>
            <FormGroup className="form-label-group">
              <Input
                type="number"
                name="price"
                disabled
                placeholder="Amount"
                value={res.price}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="form-label-group">
              <Input
                type="text"
                name="cheque no"
                disabled
                placeholder="Check Number Empty"
                value={res.chequeNo}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="form-label-group">
              {res.chequeDate ? (
                <Input
                  type="text"
                  name="cheque date"
                  disabled
                  placeholder="Check Date "
                  value={moment(res.chequeDate).format("Y-M-DD")}
                />
              ) : (
                <Input
                  type="text"
                  name="cheque date"
                  disabled
                  placeholder="Check Date Empty"
                  value={""}
                />
              )}
            </FormGroup>
          </Col>

          <Col sm="1">
            <div style={{ textAlign: "right" }}>
              <Button
                color="danger"
                className="btn-icon rounded-circle"
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(res.value, res.price);
                }}
              >
                <X size={15} />
              </Button>
            </div>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default VoucherParticular;
