import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Label, Col } from "reactstrap";
import Select from "react-select";
import { CrudContext } from "../../contexts/CrudContext";

const DropdownBox = ({ data, parentCallback, idValue, type, clear }) => {
  const [dropData, setDropData] = useState([]);
  const [selectLabel, setSelectLabel] = useState("Active");
  const [selectValue, setSelectValue] = useState("A");
  const { crud } = useContext(CrudContext);

  const getFilteredData = (myData) => {
    if (idValue) {
      const newGet = crud.columns;
      setSelectValue(newGet[data.ccName]);
      const myFilterdData = myData.filter(
        (res) => res.value === newGet[data.ccName]
      );
      // if(!myFilterdData  ) {
      //   window.location.reload();
      // }
      setSelectLabel(myFilterdData[0].label);
    }
  };
  const getAllData = () => {
    let getStatus = JSON.parse(data.des);
    setDropData(getStatus);
    getFilteredData(getStatus);
    console.log("getStatus", getStatus);
  };

  const handleChange = (e) => {
    setSelectLabel(e.label);
    setSelectValue(e.value);
    parentCallback(data.ccName, e.value);
  };

  useEffect(() => {
    if (data.ccName === "sTS") {
      setSelectValue("A");
      setSelectLabel("Active");
    }

    if (data.ccName === "sTS" && selectValue === "A") {
      parentCallback(data.ccName, "A");
    }

    console.log("field name", data.ccName, "data", data, "crud", crud);
    // if (!data.ccName || !data || !crud || !crud.columns ) {
    //   window.location.reload();
    // }
    if (idValue) {
      setSelectValue(idValue[data.ccName]);
    }
    if (type === "add") {
      setSelectValue("");
      setSelectLabel("");
    }
    getAllData();

    if (clear) {
      setSelectValue("");
      setSelectLabel("");
    }
  }, [clear]);

  return (
    <>
      {!data.isDelete ? (
        <Col md="6">
          <FormGroup>
            <Label>{data.displayName}</Label>
            {data.ccName === "sTS" ? (
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={{ label: selectLabel, value: selectValue }}
                name="clear"
                options={dropData}
                // isClearable={true}
                onChange={handleChange}
                // value={{ label: selectLabel, value: selectValue }}
              />
            ) : (
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={dropData[0]}
                name="clear"
                options={dropData}
                // isClearable={true}
                onChange={handleChange}
                value={{ label: selectLabel, value: selectValue }}
              />
            )}
          </FormGroup>
        </Col>
      ) : null}
    </>
  );
};

export default DropdownBox;
