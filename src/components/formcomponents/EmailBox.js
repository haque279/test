import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";
import { CrudContext } from "../../contexts/CrudContext";

const EmailBox = ({ data, parentCallback, type, clear }) => {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [fieldValue, setFieldValue] = useState("");
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
    if (type === "add" || clear) {
      setFieldValue("");
      setFieldName("");
    } else {
      getValue();
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);
  return (
    <React.Fragment>
      {!data.isDelete ? (
        <Col md="6">
          <FormGroup>
            <Label>{data.displayName}</Label>
            <Input
              type="email"
              id="basicInput"
              placeholder="Enter Email"
              name={fieldName}

              value={fieldValue}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      ) : null}
    </React.Fragment>
  );
};

export default EmailBox;
