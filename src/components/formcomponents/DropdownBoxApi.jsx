import React, { useEffect, useState, useContext } from "react";
import { FormGroup, Label, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import { CrudContext } from "../../contexts/CrudContext";

const DropdownBoxApi = ({ data, parentCallback, type, clear }) => {
  const [dropData, setDropData] = useState([]);
  const [selectLabel, setSelectLabel] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const { crud } = useContext(CrudContext);

  const getFilteredData = (myData) => {
    const newGet = crud.columns;
    setSelectValue(newGet[data.ccName]);
    const myFilterdData = myData.filter(
      (res) => res.value === newGet[data.ccName]
    );
    // if (!myFilterdData) {
    //   window.location.reload();
    // }
    setSelectLabel(myFilterdData[0].label);
  };
  const getAllData = async () => {
    try {
      let allData = await axios.get(data.des);
      if (allData.status === 200) {
        let myData = allData.data;
        setDropData(allData.data);
        getFilteredData(myData);
      }
    } catch (err) {}
  };

  const handleChange = (e) => {
    setSelectLabel(e.label);
    setSelectValue(e.value);
    parentCallback(data.ccName, e.value);
  };

  useEffect(() => {
    // console.log("field name", data.ccName, "data", data, "crud", crud);
    // if (!data.ccName || !data || !crud || !crud.columns) {
    //   window.location.reload();
    // }
    getAllData();

    if (type !== "add") {
      if (!data.ccName || !data || !crud || !crud.columns) {
        window.location.reload();
      }
    }

    // if (clear) {
    //   setSelectValue("");
    //   setSelectLabel("");
    // }
  }, []);

  return (
    <>
      {!data.isDelete ? (
        <Col md="6">
          <FormGroup>
            <Label>{data.displayName}</Label>
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
          </FormGroup>
        </Col>
      ) : null}
    </>
  );
};

export default DropdownBoxApi;
