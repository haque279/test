import React, { useState, useEffect } from "react";
import { FormGroup, Label, Col, Row, Button, Badge } from "reactstrap";
import { Plus, X } from "react-feather";
import Select from "react-select";
import axios from "axios";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import BASE from "../../configs/BASE";

const DropBoxSearch = ({ getFeltered, isClear, changeIsClear }) => {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState([]);
  const [main, setMain] = useState("");
  const [child, setChild] = useState([]);
  const [url, setUrl] = useState(`${BASE.URL}/api/ddldata/DDLFilterMaster`);
  const [dropData, setDropData] = useState([]);
  const [allDropData, setAllDropData] = useState([]);
  const [firstDropData, setFirstDropData] = useState({});
  const animatedComponents = makeAnimated();

  const handleChange = async (label, value) => {
    let data = await axios.get(
      `${BASE.URL}/api/ddldata/DDLFiltervalue/${value}`
    );
    setValue(data.data);
    setMain({ label, value });
  };

  const onChangeMulti = (value, { action, removedValue }) => {
    // console.log("drop multi value:", removedValue);
    setChild(value);
  };

  const addNewRows = () => {
    changeIsClear(false);
    if (main && child.length > 0) {
      let newRow = { main: main, child: child };
      rows.push(newRow);
      console.log("filtered data: ", rows);
      getFeltered(rows);
      let shortDrop = dropData.filter((res) => res.value != main.value);
      console.log("short drop", shortDrop);
      setDropData(shortDrop);
      setFirstDropData({});
      setChild([]);
    } else {
      Swal.fire({
        title: "Add filter please",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  const deleteRows = (value) => {
    let newRows = rows.filter((e) => e.main.value != value);
    setRows(newRows);
    let deletedDropData = allDropData.filter((e) => e.value == value);
    console.log("delete id", deletedDropData);
    let newDropData = [...deletedDropData, ...dropData];
    setDropData(newDropData);
  };

  const getData = async () => {
    const data = await axios.get(url);
    setDropData(data.data);
    setAllDropData(data.data);
  };

  useEffect(() => {
    console.log("dropData out", rows);

    getData();
    if (isClear) {
      setRows([]);
      console.log("dropData in", dropData);
    }
  }, [isClear]);

  return (
    <>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={firstDropData}
              name="value"
              value={firstDropData}
              options={dropData}
              onChange={(e) => {
                handleChange(e.label, e.value);
                setFirstDropData({ value: e.value, label: e.label });
              }}
            />
          </FormGroup>
        </Col>
        <Col md={5}>
          {/* <DropboxMulti value={value} onChangeMulti={onChangeMulti} /> */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[value[1], value[5]]}
            isMulti
            options={value}
            className="React"
            classNamePrefix="select"
            onChange={onChangeMulti}
            value={child}
          />
        </Col>
        <Col md={1}>
          <Button
            color="success"
            className="btn-icon rounded-circle"
            onClick={addNewRows}
          >
            <Plus size={15} />
          </Button>
        </Col>
      </Row>

      {/* <Row>
        <Col>
          <ul>
            {rows.map((res, index) => (
              <li key={index}>
                {" "}
                {res.main} -{" "}
                {res.child.map((e) => (
                  <li>{e.label}</li>
                ))}{" "}
              </li>
            ))}
          </ul>
        </Col>
      </Row> */}
      <Row>
        <Col md={11}>
          <table className="table">
            <tbody>
              {rows.map((res, index) => (
                <tr key={index}>
                  <th scope="row" style={{ borderBottom: "1px solid #ddd" }}>
                    {" "}
                    {res.main.label}{" "}
                  </th>
                  <td style={{ borderBottom: "1px solid #ddd" }}>
                    {res.child.map((res, index) => (
                      <Badge key={index} color="primary" className="mr-1 rb-1">
                        {res.label}
                      </Badge>
                    ))}
                  </td>
                  <td style={{ width: 20, borderBottom: "1px solid #ddd" }}>
                    <Button
                      color="danger"
                      className="btn-icon rounded-circle btn-sm"
                      onClick={(e) => deleteRows(res.main.value)}
                    >
                      <X size={15} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </>
  );
};

export default DropBoxSearch;
