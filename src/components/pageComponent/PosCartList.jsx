import React, { useState, useContext, useEffect } from "react";
import { Input } from "reactstrap";
import Select from "react-select";
import { Plus, X } from "react-feather";
import { Button } from "reactstrap";
import { PosContest } from "../../contexts/PosContext";
import "../../assets/scss/custom.css";

const PosCartList = ({ item }) => {
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  let [change, setChange] = useState(false);

  const { pos, update, remove } = useContext(PosContest);

  const calculate = (qty, dis, type) => {
    let taka = item.uN_Rat * qty;
    if (type === 1) {
      let pDiscount = (dis / 100) * taka;
      setTotal(taka - pDiscount);
    } else {
      let takadiscount = taka - dis * qty;
      setTotal(takadiscount);
    }
  };

  const handleDiscount = (e) => {
    e.preventDefault();
    setDiscount(e.target.value);
    calculate(quantity, e.target.value, discountType);
    update(item.id, quantity, e.target.value, discountType);
  };

  const handleDiscountType = (e) => {
    console.log("discount type", e.value);
    setDiscountType(e.value);
    calculate(quantity, discount, e.value);
    update(item.id, quantity, discount, e.value);
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
    calculate(e.target.value, discount, discountType);
    update(item.id, e.target.value, discount, discountType);
  };

  const getInit = () => {
    let myItem = pos.cart.filter((e) => e.id === item.id);
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
    calculate(quantity, discount, discountType);
    setChange(!change);
  };

  useEffect(() => {
    getInit();
  }, []);
  return (
    <>
      <tr className="pos-table">
        <th scope="row">{item.sl}</th>
        <td>{item.gEN_Nm}</td>
        <td>{item.bR_Nm}</td>
        <td>{item.cT_Nm}</td>
        <td>{item.mNF_Nm}</td>
        <td>{item.mNF_Cod}</td>
        <td>{item.uN_Nm}</td>
        <td>{item.uN_Rat}</td>
        <td>
          <Input
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={handleQuantity}
          />
        </td>
        <td>
          <Select
            className="React"
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
            }}
            type="number"
            min="0"
            placeholder="Discount"
            value={discount}
            onChange={handleDiscount}
          />
        </td>

        <td>{total.toFixed(2)}</td>
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
    </>
  );
};

export default PosCartList;
