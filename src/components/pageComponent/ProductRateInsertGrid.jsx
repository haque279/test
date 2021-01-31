import React, { useState, useEffect, useContext } from "react";
import { Input } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import BASE from "../../configs/BASE";

const ProductRateInsertGrid = ({ item, getData }) => {
  const [allUnit, setAllUnit] = useState([]);
  const [unitValue, setunitValue] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const getUnit = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLUnit`;
    const data = await axios.get(url);
    setAllUnit(data.data);
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setUnitPrice(e.target.value);
    sendJson(e.target.value, unitValue, discount);
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    setDiscount(e.target.value);
    console.log(e.target.value);
    sendJson(unitPrice, unitValue, e.target.value);
  };

  const sendJson = (rate, unitId, dis) => {
    let myJson = {
      id: item.id,
      sKU_Id: item.id,
      uN_Id: unitId,
      uN_Rat: rate,
      dIS: parseInt(dis),
    };
    getData(myJson);
    console.log("json", myJson);
  };

  useEffect(() => {
    setDiscount(item.dIS);
    setUnitPrice(item.uN_Rat);
    getUnit();
  }, []);
  return (
    <>
      <tr>
        <td>{item.sl}</td>
        <td>{item.bR_Nm}</td>
        <td>{item.cT_Nm}</td>
        <td>{item.gEN_Nm}</td>
        <td>{item.mNF_Nm}</td>
        <td>{item.sKU_Cod}</td>
        <td>
          <Select
            className="React"
            classNamePrefix="select"
            defaultValue={allUnit[0]}
            options={allUnit}
            onChange={(e) => {
              setunitValue(e.value);
              sendJson(unitPrice, e.value, discount);
            }}
          />
        </td>
        <td style={{ width: 120 }}>
          <Input
            type="number"
            placeholder="00.00"
            value={unitPrice}
            onChange={handlePrice}
          />
        </td>
        <td style={{ width: 120 }}>
          <Input
            type="number"
            placeholder="00.00"
            value={discount}
            onChange={handleDiscount}
          />
        </td>
      </tr>
    </>
  );
};

export default ProductRateInsertGrid;
