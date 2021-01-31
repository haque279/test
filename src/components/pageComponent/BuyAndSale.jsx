import React, { useEffect, useState, useContext } from "react";
import { Table, Col, Row, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { ChallanContext } from "../../contexts/ChallanContext";
import BuyAndSaleRow from "./BuyAndSaleRow";
import BASE from "../../configs/BASE";

const BuyAndSale = ({ title, postUrl, reportUrl }) => {
  const [subtotal, setsubtotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const [due, setDue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [lineAmount, setLineAmount] = useState(0);
  const [change, setChange] = useState(false);
  const [perPackateCost, setPerPackateCost] = useState(0);
  const [voucherNo, setVoucherNo] = useState("");

  const { challan, cancel, add } = useContext(ChallanContext);

  const stateChange = () => {
    // return console.log("chaaaa", challan);
    let cTotal = 0;
    let allPrice = 0;
    // challan.cart.map((e) => {
    //   if (e.discountType === 2) {
    //     cTotal += e.uN_Rat * e.quantity - e.discount * e.quantity;
    //   } else if (e.discountType === 1) {
    //     let taka = e.uN_Rat * e.quantity;
    //     let pDiscount = (e.discount / 100) * taka;
    //     cTotal += e.uN_Rat * e.quantity - pDiscount;
    //   }
    //   allPrice += e.quantity * e.uN_Rat;
    // });

    let lineTotal = 0;
    let lineDiscount = 0;
    let lineAmount = 0;

    challan.cart.map((e) => {
      lineTotal += e.lineTotal;
      lineDiscount += e.lineDiscount;
      lineAmount += e.total;
    });

    setsubtotal(lineTotal);
    setTotalDiscount(lineDiscount);
    setLineAmount(lineAmount);

    // setChange(!change);
  };
  const changeDelete = () => {
    setChange(!change);
    // setPaid(0);
  };

  const calculateDue = () => {
    let newDue =
      parseInt(lineAmount) + parseInt(perPackateCost) - specialDiscount - paid;
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
      bIL_Dis: parseInt(totalDiscount) + parseInt(specialDiscount),
      gR_Tot: subtotal + parseInt(perPackateCost) - specialDiscount,
      tOT_Amt: payable(lineAmount, perPackateCost),
      p_Amt: paid,
      pOS: false,
      cUS_Id: 0,
      sCUN_Id: 0,
      e_Id: 0,
    };

    let Part = challan.cart.map((e) => {
      return {
        sKU_Id: e.id,
        qTY: e.quantity,
        rAT: e.uN_Rat,
        uN_Id: e.uN_Id,
        gR_Amt: subtotal,
        dIS: e.lineDiscount,
        nET_Amt: subtotal - e.lineDiscount,
      };
    });

    let dataSend = { ...data, Part };
    console.log("output", dataSend);
    try {
      let url = postUrl;
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
    window.location.reload();
  };

  const handlePrint = async () => {
    let url = `${reportUrl}/${voucherNo}`;
    // await axios({
    //   method: "get",
    //   url: url,
    // });
    console.log("url", url);
    window.open(url, "_blank");
  };

  const payable = (lineAmount, perPackateCost) => {
    let mytotal = parseFloat(lineAmount) + parseFloat(perPackateCost);
    return Math.round(mytotal);
  };

  useEffect(() => {
    stateChange();
    calculateDue();
  }, [changeDelete, subtotal, paid, specialDiscount, handleCancel]);
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
                  <th>Current Stock</th>
                  <th>Quantity</th>
                  <th style={{ width: 200 }}>Discount Type</th>
                  <th>Discount</th>
                  <th>Line Total</th>
                  <th>Line Discount</th>
                  <th>Line Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {challan.cart.map((item, index) => (
                  <BuyAndSaleRow
                    item={item}
                    key={index}
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
                    <td>{Math.round(subtotal)}</td>
                  </tr>
                  {/* <tr>
                    <td>Pack No</td>
                    <td>
                      <Input type="text" />
                    </td>
                  </tr> */}
                  <tr>
                    <td>Total Discount</td>
                    <td>{Math.round(totalDiscount)}</td>
                  </tr>
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
                    <td>Amount Payable</td>
                    <td>{payable(lineAmount, perPackateCost)}</td>
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
                    <td>{Math.round(due)}</td>
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
                  color="info"
                  type="submit"
                  className="mr-1 mb-1"
                  onClick={handlePrint}
                >
                  Print
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

export default BuyAndSale;
