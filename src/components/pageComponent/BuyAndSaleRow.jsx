import React, { useState, useContext, useEffect } from "react";
import { Input } from "reactstrap";
import Select from "react-select";
import { Plus, X } from "react-feather";
import { Button } from "reactstrap";
import Swal from "sweetalert2";

import { ChallanContext } from "../../contexts/ChallanContext";

const BuyAndSaleRow = ({ item, stateChange, changeDelete }) => {
  const initDiscount = item.dIS;
  const [discount, setDiscount] = useState(initDiscount);
  const [discountType, setDiscountType] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  let [change, setChange] = useState(false);

  const { challan, update, remove } = useContext(ChallanContext);

  const calculate = (qty, dis, type) => {
    let taka = item.uN_Rat * qty;
    if (type === 1) {
      let pDiscount = (dis / 100) * taka;
      setTotal(taka - pDiscount);
    } else {
      let takadiscount = taka - dis * qty;
      setTotal(takadiscount);
    }
    stateChange();
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    if (discountType === 1 && e.target.value > 100) {
      return Swal.fire({
        title: `Maximinum value 100`,
        icon: "warning",
        timer: 2000,
      });
    }
    if (discountType === 2 && e.target.value > item.uN_Rat) {
      return Swal.fire({
        title: `Maximium Value ${item.uN_Rat}`,
        icon: "warning",
        timer: 2000,
      });
    }
    if (e.target.value === "") {
      setDiscount(0);
      calculate(quantity, 0, discountType);
      update(item.id, quantity, 0, discountType);
    } else {
      setDiscount(e.target.value);
      calculate(quantity, e.target.value, discountType);
      update(item.id, quantity, e.target.value, discountType);
    }

    stateChange();
  };

  const handleDiscountType = (e) => {
    console.log("discount type", e.value);
    setDiscountType(e.value);
    // calculate(quantity, discount, e.value);
    update(item.id, quantity, discount, e.value);

    // setDiscount(parseInt(0));

    stateChange();
  };

  const handleQuantity = (e) => {
    e.preventDefault();

    if (e.target.value === "") {
      setQuantity(0);
      calculate(0, discount, discountType);
      update(item.id, 0, discount, discountType);
    } else {
      setQuantity(e.target.value);
      calculate(e.target.value, discount, discountType);
      update(item.id, e.target.value, discount, discountType);
    }

    stateChange();
  };

  const getInit = () => {
    let myItem = challan.cart.filter((e) => e.id === item.id);
    setQuantity(myItem[0].quantity);
    setDiscount(myItem[0].discount);
    console.log("myItem", myItem);
    let qty = parseInt(myItem[0].quantity);
    let dis = parseInt(myItem[0].discount);
    let type = parseInt(myItem[0].discountType);
    calculate(qty, dis, type);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    remove(item);
    stateChange();
    calculate(quantity, discount, discountType);
    setChange(!change);
    changeDelete();
  };

  useEffect(() => {
    getInit();
    setDiscount(item.dIS);
  }, [changeDelete]);

  return (
    <tr>
      <th scope="row">{item.sl}</th>
      <td>{item.bR_Nm}</td>
      <td>{item.cT_Nm}</td>
      <td>{item.gEN_Nm}</td>
      <td>{item.mNF_Nm}</td>
      <td>{item.mNF_Cod}</td>
      <td>{item.uN_Nm}</td>
      <td>{item.uN_Rat}</td>
      <td>{item.cUR_Stok}</td>
      <td>
        <Input
          style={{ width: 70 }}
          type="number"
          min="1"
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantity}
        />
      </td>
      <td>
        <Select
          className="React quantity-width"
          classNamePrefix="select"
          defaultValue={{ label: "Percent", value: 1 }}
          name="color"
          value={
            item.discountType == 1
              ? { label: "Percent", value: 1 }
              : { label: "Amount", value: 2 }
          }
          options={[
            { label: "Percent", value: 1 },
            { label: "Amount", value: 2 },
          ]}
          onChange={handleDiscountType}
        />
      </td>
      <td>
        <Input
          style={{
            backgroundColor: discountType === 1 ? "#f7d794" : "#f3a683",
            width: 70,
          }}
          type="number"
          min="0"
          placeholder="Discount"
          value={discount}
          onChange={handleDiscount}
        />
      </td>
      <td>{item.lineTotal.toFixed(2)}</td>
      <td>{item.lineDiscount.toFixed(2)}</td>

      <td>{item.total.toFixed(2)}</td>
      <td>
        <Button
          color="danger"
          className="btn-icon rounded-circle"
          onClick={handleDelete}
        >
          <X size={15} />
        </Button>
      </td>
    </tr>
  );
};

export default BuyAndSaleRow;
