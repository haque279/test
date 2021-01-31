import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Col } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { CrudContext } from "../../contexts/CrudContext";

const DatePickers = ({ data, parentCallback, type, clear }) => {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [dob, setDob] = useState(new Date());
  const { crud } = useContext(CrudContext);

  const getValue = () => {
    const newGet = crud.columns;
    setDob(newGet[fieldName]);
  };

  const handledob = (date) => {
    setDob(date);
  };

  useEffect(() => {
    if (type === "add") {
      setDob("");
      setFieldName("");
    } else {
      getValue();
    }
  }, [clear]);

  return (
    <>
      {!data.isDelete ? (
        <Col md="6">
          <FormGroup>
            <Label className="d-block" for="dob">
              {data.displayName}
            </Label>
            <Flatpickr
              id="dob"
              className="form-control"
              options={{ dateFormat: "Y-m-d", allowInput: true }}
              value={dob}
              onChange={(date) => {
                handledob(date);
                parentCallback(data.ccName, date[0]);
              }}
            />
          </FormGroup>
        </Col>
      ) : null}
    </>
  );
};

export default DatePickers;
