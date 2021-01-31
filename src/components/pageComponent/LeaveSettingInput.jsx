import React, { useState } from "react";
import { Label, Input, FormGroup } from "reactstrap";
const LeaveSettingInput = ({ data, callBack }) => {
  const [fieldValue, setFieldValue] = useState();
  const handleChange = (e) => {
    setFieldValue(e.target.value);
    callBack(data.lM_Id, e.target.value, data.lE_Ttl);
  };
  return (
    <div>
      <FormGroup>
        <Label for="basicInput">
          <h5>
            {data.lE_Ttl} - Maximum {data.qTY}
          </h5>
        </Label>
        <Input
          type="text"
          name={data.lM_Id}
          id="basicInput"
          placeholder="Enter Text"
          value={fieldValue}
          onChange={handleChange}
        />
      </FormGroup>
    </div>
  );
};

export default LeaveSettingInput;
