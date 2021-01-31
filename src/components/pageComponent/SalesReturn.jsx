import React, { useEffect, useState, useContext } from "react";
import { Table, Col, Row, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { ChallanContext } from "../../contexts/ChallanContext";
import ChallanRow from "./ChallanRowTest";
import BASE from "../../configs/BASE";
import SalesReturnRow from "./SalesReturnRow";

const Purchase = () => {
  const [subtotal, setsubtotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const [due, setDue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [change, setChange] = useState(false);
  const [perPackateCost, setPerPackateCost] = useState(0);
  const [voucherNo, setVoucherNo] = useState("");

  const { challan, cancel } = useContext(ChallanContext);

  const stateChange = () => {
    // return console.log("chaaaa", challan);
    let cTotal = 0;
    let allPrice = 0;
    challan.cart.map((e) => {
      if (e.discountType === 2) {
        cTotal += e.uN_Rat * e.quantity - e.discount * e.quantity;
      } else if (e.discountType === 1) {
        // let taka = e.uN_Rat * e.quantity;
        let pDiscount = (e.discount / 100) * e.uN_Rat;
        cTotal += (e.uN_Rat -pDiscount)*e.quantity;
        // cTotal += e.uN_Rat * e.quantity - pDiscount;
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
    // return console.log("chalan", challan);
    e.preventDefault();
    let data = {
      iNV_No: challan.invoiceNo,
      dAT: challan.date,
      lGR_Id: challan.party.value,
      aDD_Cst: parseInt(perPackateCost),
      dIS: parseInt(totalDiscount) + parseInt(specialDiscount),
      gR_Tot: subtotal + parseInt(perPackateCost) - specialDiscount,
      tOT_Amt: subtotal,
      pOS: false,
      sCUN_Id: 0,
    };
    let books = [];
    let Part = challan.cart.map((e) => {
      return {
        sKU_Id: e.id,
        qTY: e.quantity,
        rAT: e.uN_Rat,
        uN_Id: e.uN_Id,
        dIS: e.discount * e.quantity,
        nET_Amt: e.quantity * e.uN_Rat - e.discount * e.quantity,
        aMT: e.quantity * e.uN_Rat - e.discount * e.quantity,
        gR_Amt: e.quantity * e.uN_Rat,
      };
    });

    let dataSend = { ...data, Part };
    console.log("output", dataSend);
    try {
      let url = `${BASE.URL}/api/ESR15M57`;
      let response = await axios({
        method: "post",
        url: url,
        data: dataSend,
      });
      console.log("response", response);
      setVoucherNo(response.data);

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
      {challan.cart.length < 1 ? (
        <h3 className="text-center">No Item selected</h3>
      ) : (
        <div>
          <div style={{ maxHeight: 600, overflow: "auto", paddingBottom: 62 }}>
            <h4>
              {challan.party.label}{" "}
              <span style={{ float: "right" }}>
                {voucherNo ? `Voucher No: ${voucherNo}` : ""}
              </span>{" "}
            </h4>
            <Table striped >
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
                  <th style={{ width: 200 }}>Discount Type</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {challan.cart.map((item, index) => (
                  <SalesReturnRow
                    key={index}
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
                    <td>{subtotal.toFixed(2)}</td>
                  </tr>
                  {/* <tr>
                    <td>Pack No</td>
                    <td>
                      <Input type="text" />
                    </td>
                  </tr> */}
                  <tr>
                    <td>Packet Cost </td>
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
                    <td>{totalDiscount.toFixed(2)}</td>
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
                    <td>Special Discount</td>
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
                    <td>{due.toFixed(2)}</td>
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

export default Purchase;
