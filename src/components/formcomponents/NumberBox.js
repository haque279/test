import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";
import { CrudContext } from "../../contexts/CrudContext";

function NumberBox({ data, parentCallback, type, clear }) {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [fieldValue, setFieldValue] = useState("");
  const { crud } = useContext(CrudContext);

  const handleChange = (e) => {
    setFieldValue(e.target.value);
    parentCallback(data.ccName, parseInt(e.target.value));
  };
  const getValue = () => {
    const newGet = crud.columns;
    setFieldValue(newGet[fieldName]);
  };
  useEffect(() => {

    // if (!data.ccName || !data || !crud || !crud.columns ) {
    //   window.location.reload();
    // }

    if (type === "add") {
      setFieldValue("");
      setFieldName("");
    } else {
      getValue();
      if (!data.ccName || !data || !crud || !crud.columns) {
        window.location.reload();
      }
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
              type="number"

              placeholder="Enter Number"
              value={fieldValue}
              onChange={handleChange}
              name={fieldName}
            />
          </FormGroup>
        </Col>
      ) : null}
    </React.Fragment>
  );
}

export default NumberBox;
