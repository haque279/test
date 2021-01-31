import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Input, CustomInput, Col } from "reactstrap";
import Checkboxs from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check, User } from "react-feather";
import { CrudContext } from "../../contexts/CrudContext";

const CheckBox = ({ data, parentCallback, type, clear }) => {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [fieldValue, setFieldValue] = useState(false);
  const { crud } = useContext(CrudContext);

  const handleChange = (e) => {
    setFieldValue(!fieldValue);
    parentCallback(data.ccName, !fieldValue);
  };
  const getValue = () => {
    const newGet = crud.columns;
    setFieldValue(newGet[fieldName]);
  };
  useEffect(() => {
    if (type === "add" ) {
      // setFieldValue(false);
      setFieldName("");
    } else {
      getValue();
    }
  }, [clear]);
  return (
    <React.Fragment>
      {!data.isDelete ? (
        <Col md="6">
          <FormGroup>
            <Label></Label>
            <Checkboxs
              color="primary"
              icon={<Check className="vx-icon" size={16} />}
              label={data.displayName}
              defaultChecked={false}
              value={fieldValue}
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      ) : null}
    </React.Fragment>
  );
};

export default CheckBox;
