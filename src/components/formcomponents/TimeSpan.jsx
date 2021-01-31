import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { CrudContext } from "../../contexts/CrudContext";
import { Redirect } from "react-router-dom";
const TimeSpan = ({ data, parentCallback, type, clear }) => {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [fieldValue, setFieldValue] = useState(new Date());
  const [basic, setBasic] = useState(new Date());
  const { crud } = useContext(CrudContext);

  const handleChange = (e) => {
    setFieldValue(e.target.value);
    parentCallback(data.ccName, e.target.value);
  };
  const getValue = () => {
    const newGet = crud.columns;
    setFieldValue(newGet[fieldName]);
  };
  useEffect(() => {
    if (type === "add") {
      setFieldValue("");
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
            <Label>{data.displayName}</Label>
            <Flatpickr
              className="form-control"
              value={fieldValue}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "H:i",
              }}
              onChange={(date) => {
                setFieldValue(date);
                let mydate = date[0];
                const h = new Intl.DateTimeFormat("en", {
                  hour: "numeric",
                  hour12: false,
                }).format(mydate);
                const m = new Intl.DateTimeFormat("en", {
                  minute: "numeric",
                }).format(mydate);

                let hour24 = "";
                if (h == "24") {
                  hour24 = "00";
                } else {
                  hour24 = h;
                }
                let Mi = "";
                if (m < 10) {
                  Mi = "0" + m;
                } else {
                  Mi = m;
                }

                let returnTime = hour24 + ":" + Mi;

                parentCallback("tS" + data.ccName, returnTime);
              }}
            />
          </FormGroup>
        </Col>
      ) : null}
    </>
  );
};

export default TimeSpan;
