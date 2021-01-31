import React, { useEffect, useState, useContext } from "react";
import { Table, Col, Row, Input, Button } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import BASE from "../../configs/BASE";
import { PosContest } from "../../contexts/PosContext";
import PosCartList from "./PosCartList";

const PosCart = ({ item, mData }) => {
  const [subtotal, setsubtotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [specialDiscount, setSpecialDiscount] = useState(0);
  const [due, setDue] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [change, setChange] = useState(false);
  const [voucherNo, setVoucherNo] = useState("");

  const { cancel, pos } = useContext(PosContest);

  const stateChange = () => {
    let cTotal = 0;
    let allPrice = 0;
    item.map((e) => {
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
    let newDue = subtotal - paid - specialDiscount;
    setDue(newDue);
  };

  const handleSubmit = async (e) => {
    // return console.log("chalan", item);
    e.preventDefault();
    let data = {
      bIL_Dis: parseInt(totalDiscount) + parseInt(specialDiscount),
      gR_Tot: subtotal + totalDiscount,
      tOT_Amt: subtotal,
      iNV_No: mData.invoiceNo,
      cUS_Nm: mData.customer.value,
      e_Id: mData.salesMan,
      sCUN_Id: mData.counter.value,
      pOS: true,
      dAT: new Date(),
      aDD_Cst: 0,
      lGR_Id: 1,
    };
    let Part = item.map((e) => {
      return {
        sKU_Id: e.id,
        qTY: e.quantity,
        rAT: e.uN_Rat,
        uN_Id: 0,
        dIS: e.discount,
        nET_Amt: e.quantity * e.uN_Rat,
        aMT: e.quantity * e.uN_Rat - e.discount,
      };
    });

    let dataSend = { ...data, Part };
    console.log("output", dataSend);
    try {
      let url = `${BASE.URL}/api/ESA06M48`;
      let response = await axios({
        method: "post",
        url: url,
        data: dataSend,
      });
      console.log("response", response);
      localStorage.setItem("inv", response.data);
      setVoucherNo(response.data);
      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
      cancel();
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

  const handlePrint = async () => {
    let url = `${BASE.URL}/api/Report/CHLNO/${voucherNo}`;
    // await axios({
    //   method: "get",
    //   url: url,
    // });
    console.log("url", url);
    // window.location.href = url;
    window.open(url, "_blank");
  };

  useEffect(() => {
    stateChange();
    calculateDue();
  }, [changeDelete, subtotal, paid, specialDiscount]);

  return (
    <>
      {item && item.length < 1 ? (
        <>
          <h3 className="text-center">No Item selected</h3>
          {due < 0 || due === 0 ? (
            <div className="" style={{ textAlign: "right" }}>
              <Button.Ripple
                color="primary"
                type="submit"
                className="mr-1 mb-1"
                onClick={handlePrint}
              >
                Print
              </Button.Ripple>
            </div>
          ) : null}
        </>
      ) : (
        <div>
          <div style={{ maxHeight: 600, display: "auto", paddingBottom: 62 }}>
            <h4>Customer</h4>
            <div className="pos-table">
            <Table striped responsive>
              <thead>
                <tr>
                  <th>Sl</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Class</th>
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
                {item ? item.map((item) => <PosCartList item={item} />) : null}
              </tbody>
            </Table>
            </div>
          </div>
          <Row>
            <Col></Col>
            <Col></Col>
            <Col> </Col>
            <Col>
              <Table striped className="pos-table">
                <tbody>
                  <tr>
                    <td>Sub Total</td>
                    <td>{subtotal.toFixed(2)}</td>
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
                    <td>Change</td>
                    <td>{due.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>
              {/* <button onClick={stateChange}>change</button> */}
              <div className="text-right">
                {/* <Button.Ripple
                  color="danger"
                  type="submit"
                  className="mr-1 mb-1"
                  onClick={handleCancel}
                >
                  Cancel
                </Button.Ripple> */}
                {due < 0 || due === 0 ? (
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button.Ripple>
                ) : null}
              </div>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PosCart;
