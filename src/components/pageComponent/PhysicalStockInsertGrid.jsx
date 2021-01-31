import React, { useState, useEffect, useContext } from "react";
import { Input } from "reactstrap";
import axios from "axios";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import BASE from "../../configs/BASE";

const PhysicalStockInsertGrid = ({ item, getData }) => {
  const [allUnit, setAllUnit] = useState([]);
  const [unitValue, setunitValue] = useState(0);
  const [unitPrice, setUnitPrice] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);

  const getUnit = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLUnit`;
    const data = await axios.get(url);
    setAllUnit(data.data);
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    amountCal(e.target.value);
    let qty = parseInt(e.target.value);
    setQuantity(qty);
    sendJson(qty);
  };

  const sendJson = (qty) => {
    let myJson = {
      sKU_Id: item.id,
      uN_Rat: item.uN_Rat,
      qTY: qty,
      // aMT:amount
    };

    getData(myJson);
  };

  const amountCal = (qty) => {
    let price = item.uN_Rat;
    let amnt = price * qty;
    console.log("amnt", amnt);
    setAmount(amnt);
  };

  useEffect(() => {
    getUnit();
  }, []);
  return (
    <>
      <tr>
        <td>{item.sl} </td>
        <td>{item.bR_Nm}</td>
        <td>{item.cT_Nm}</td>
        <td>{item.gEN_Nm}</td>
        <td>{item.mNF_Nm}</td>
        <td>{item.sKU_Cod}</td>
        <td>{item.uN_Nm}</td>
        <td>{item.uN_Rat}</td>
        <td>{item.cUR_Stok}</td>
        <td>
          <Input type="text" placeholder="00.00" onChange={handleQuantity} />
        </td>
        <td>{amount}</td>
      </tr>
    </>
  );
};

export default PhysicalStockInsertGrid;
