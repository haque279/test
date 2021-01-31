import React, { useState, useEffect, useContext } from "react";
import {
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
  Badge,
} from "reactstrap";
import Select from "react-select";
import { Plus, X } from "react-feather";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { JournalContext } from "../../contexts/JournalContext";
import Swal from "sweetalert2";
import Flatpickr from "react-flatpickr";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import moment from "moment";
import axios from "axios";
import BASE from "../../configs/BASE";

const JournalLeft = ({ getLeftData, emptyArray }) => {
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState();
  const [entry, setEntry] = useState([]);
  const [total, setTotal] = useState(0);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [dropData, setDropData] = useState([]);
  const [firstDropData, setFirstDropData] = useState({ label: "", value: "" });
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [balanceType, setBalanceType] = useState("");
  const [currentBalance, setcurrentBalance] = useState(0);
  const [newCurrentBalance, setNewCurrentBalance] = useState(0);
  const { journal, addJournal, allJournal } = useContext(JournalContext);
  const addRows = (e) => {
    if (!price ||!firstDropData.value|| price > currentBalance) {
      
      return Swal.fire({
        title: "Particular or Amount empty or currection Particular",
        icon: "warning",
        timer: 2000,
      });
    }


    let currentValue = journal.filter((item) => item.value === value);

    if (currentValue.length === 0) {
      setFirstDropData({});
      return Swal.fire({
        title: "Please select a party ",
        icon: "warning",
        timer: 2000,
      });
    }

    if (price < 1 || !value) {
      return Swal.fire({
        title: "Please select party and amount",
        icon: "warning",
        timer: 2000,
      });
    }
    if (price && value) {
      let newJournal = journal.filter((res) => res.value == value);
      if (journal.length > 1) {
        setFirstDropData({});
      } else {
        setFirstDropData({});
      }

      setLabel(newJournal[0].label);
      let newTotal = parseInt(price);
      setTotal(total + newTotal);

      let mybalance = 0;
      if (balanceType === "Dr") {
        mybalance = currentBalance - parseInt(price);
        setNewCurrentBalance(mybalance);
      } else if (balanceType === "Cr") {
        mybalance = currentBalance + parseInt(price);
        setNewCurrentBalance(mybalance);
      }

      entry.push({
        value,
        price,
        chequeNo,
        chequeDate,
        balance: mybalance,
        type: balanceType,
        label: newJournal[0].label,
      });

      let toJournal = { value, price };
      addJournal(toJournal);
      setPrice("");
      setValue("");
      setChequeNo("");
      setChequeDate("");
      setIndex(index + 1);
      setcurrentBalance("");
      setBalanceType("");
      getLeftData(entry, total + newTotal);
      let shortDrop = journal.filter((res) => res.value != value);
      allJournal(shortDrop);
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

  const handleChange = (label, value) => {
    setValue(value);
    setLabel("");
  };

  const handleDelete = (clientOne, deletePrice) => {
    let newEntry = entry.filter((e) => e.value != clientOne);
    setEntry(newEntry);
    setTotal(total - deletePrice);
    setError("");
    let deletedDropData = entry.filter((e) => e.value == clientOne);
    let newDropData = [...deletedDropData, ...journal];
    allJournal(newDropData);
  };

  useEffect(() => {
    setEntry([]);
    setTotal(0);
  }, [emptyArray]);
  return (
    <Col>
      <h3 className="primary">
        Debit
        <span className="journal-total">Total Debit: TK {total}</span>
      </h3>
      {error ? (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
      <div style={{ textAlign: "right" }}>
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
          <h6 for="nameFloating">Party</h6>
          <Select
            className="React"
            classNamePrefix="select"
            name="value"
            value={firstDropData}
            options={journal}
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
          <h6 for="nameFloating">Amount</h6>

          <FormGroup className="form-label-group">
            <Input
              type="number"
              name="price"
              placeholder="00.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormGroup>
        </Col>
        <Col>
          <h6 for="cheque-No">Cheque No</h6>
          <Input
            id="cheque-No"
            value={chequeNo}
            onChange={(e) => setChequeNo(e.target.value)}
          />
        </Col>
        <Col>
          <h6 for="chequeDate">Cheque Date</h6>

          <FormGroup className="form-label-group">
            <Flatpickr
              id="chequeDate"
              className="form-control"
              options={{ dateFormat: "Y-m-d" }}
              value={chequeDate}
              onChange={(date) => {
                setChequeDate(date[0]);
              }}
            />
          </FormGroup>
        </Col>
      </Row>
      {entry.map((res, indexKey) => (
        <Row key={indexKey}>
          <Col sm="3">
            <Input type="text" name="price" disabled value={res.label} />

            <Label>
              <i>
                Current Balance : {res.balance} {res.type}{" "}
              </i>
            </Label>
          </Col>
          <Col sm="3">
            <FormGroup className="form-label-group">
              <Input type="number" name="price" disabled value={res.price} />
            </FormGroup>
          </Col>
          <Col sm="3">
            <FormGroup className="form-label-group">
              <Input name="price" disabled value={res.chequeNo} />
            </FormGroup>
          </Col>
          <Col sm="2">
            <FormGroup className="form-label-group">
              <Input
                name="price"
                disabled
                value={
                  res.chequeDate
                    ? moment(res.chequeDate).format("YYYY-MM-DD")
                    : ""
                }
              />
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
    </Col>
  );
};

export default JournalLeft;
