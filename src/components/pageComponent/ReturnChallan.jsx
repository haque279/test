import React, { useEffect, useState, useContext } from "react";
import { Table, Col, Row, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { ChallanContext } from "../../contexts/ChallanContext";
import { ReturnChallanContext } from "../../contexts/ReturnChallanContext";
import ChallanRow from "./ChallanRow";
import ReturnChallanRow from "./ReturnChallanRow";
import BASE from "../../configs/BASE";

const ReturnChallan = () => {
  const [subtotal, setsubtotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const [due, setDue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [change, setChange] = useState(false);
  const [perPackateCost, setPerPackateCost] = useState(0);

  const { returnChallan, cancel } = useContext(ReturnChallanContext);

  const stateChange = () => {
    // return console.log("chaaaa", returnChallan);
    let cTotal = 0;
    let allPrice = 0;
    returnChallan.cart.map((e) => {
      if (e.discountType === 2) {
        cTotal += e.uN_Rat * e.quantity - e.discount * e.quantity;
      } else if (e.discountType === 1) {
        let taka = e.uN_Rat * e.quantity;
        let pDiscount = (e.discount / 100) * taka;
        cTotal += e.uN_Rat * e.quantity - pDiscount;
      }
      allPrice += e.quantity * e.uN_Rat;
    });
    console.log("cTotal", cTotal);
    setsubtotal(cTotal);
    setTotalDiscount(allPrice - cTotal);
    // setChange(!change);
  };
  const changeDelete = () => {
    setChange(!change);
    // setPaid(0);
  };

  const calculateDue = () => {
    let newDue = subtotal + parseInt(perPackateCost) - paid - specialDiscount;
    setDue(newDue);
  };

  const handleSubmit = async (e) => {
    // return console.log("chalan", returnChallan);
    e.preventDefault();

    let data = {
      iNV_No: returnChallan.invoiceNo,
      dAT: returnChallan.date,
      lGR_Id: returnChallan.party.value,
      aDD_Cst: parseInt(perPackateCost),
      bIL_Dis: parseInt(totalDiscount) + parseInt(specialDiscount),
      gR_Tot: subtotal + parseInt(perPackateCost) - parseInt(specialDiscount),
      tOT_Amt: subtotal,
    };
    let books = [];
    let bookList = returnChallan.cart.map((e) => {
      return {
        sKU_Id: e.id,
        qTY: e.quantity,
        rAT: e.uN_Rat,
        uN_Id: 0,
        dIS: e.discount,
        nET_Amt: e.quantity * e.uN_Rat,
        aMT: e.quantity * e.uN_Rat - e.discount,
        cUS_Nm: 0,
        e_Id: 0,
        sCUN_Id: 0,
        pOS: false,
      };
    });

    let dataSend = { ...data, bookList };
    console.log("output", dataSend);
    try {
      let url = `${BASE.URL}/api/ESR15M57`;
      await axios({
        method: "post",
        url: url,
        data: dataSend,
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

  const handleCancel = (e) => {
    e.preventDefault();
    cancel();
  };

  useEffect(() => {
    stateChange();
    calculateDue();
  }, [changeDelete, subtotal, paid, specialDiscount]);
  return (
    <>
      {returnChallan.cart.length < 1 ? (
        <h3 className="text-center">No Item selected</h3>
      ) : (
        <div>
          <div style={{ maxHeight: 600, overflow: "auto", paddingBottom: 62 }}>
            <h4>{returnChallan.party.label}</h4>
            <Table striped>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Title</th>
                  <th>Publisher</th>
                  <th>Publisher Code</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th style={{ width: 200 }}>discount Type</th>
                  <th>discount</th>
                  <th>total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {returnChallan.cart.map((item) => (
                  <ReturnChallanRow
                    item={item}
                    stateChange={stateChange}
                    changeDelete={changeDelete}
                  />
                ))}
              </tbody>
            </Table>
          </div>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col> </Col>
            <Col>
              <Table striped>
                <tbody>
                  <tr>
                    <td>Sub Total</td>
                    <td>{subtotal}</td>
                  </tr>
                  <tr>
                    <td>Pack No</td>
                    <td>
                      <Input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Per Packet Cost</td>
                    <td>
                      <Input
                        type="number"
                        min="0"
                        value={perPackateCost}
                        onChange={(e) => setPerPackateCost(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Total Discount</td>
                    <td>{totalDiscount}</td>
                  </tr>
                  <tr>
                    <td>Amount Paid</td>
                    <td>
                      <Input
                        type="number"
                        min="0"
                        value={paid}
                        onChange={(e) => setPaid(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Spetial Discount</td>
                    <td>
                      <Input
                        type="number"
                        min="0"
                        value={specialDiscount}
                        onChange={(e) => setSpecialDiscount(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Due</td>
                    <td>{due}</td>
                  </tr>
                </tbody>
              </Table>
              {/* <button onClick={stateChange}>change</button> */}
              <div className="text-right">
                <Button.Ripple
                  color="danger"
                  type="submit"
                  className="mr-1 mb-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button.Ripple>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                  onClick={handleSubmit}
                >
                  Save
                </Button.Ripple>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ReturnChallan;
