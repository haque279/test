import React, { useState, useContext, useEffect } from "react";
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
import { AmountContext } from "../../contexts/AmountContext";
const AmountBox = () => {
  const [price, setPrice] = useState();
  const { amount, totalAmount } = useContext(AmountContext);

  const handleChange = (e) => {
    setPrice(e.target.value);
    totalAmount(e.target.value);
  };

  useEffect(() => {
    console.log("amount", amount);
  });

  return (
    <div>
      <Label for="EmailFloating">Amount {price} </Label>
      <FormGroup className="form-label-group">
        <Input
          type="number"
          name="price"
          placeholder="Amount"
          value={price}
          onChange={handleChange}
        />
      </FormGroup>
    </div>
  );
};

export default AmountBox;
