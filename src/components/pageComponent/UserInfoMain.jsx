import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
  Input,
  Table,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

import BASE from "../../configs/BASE";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import LeaveSettingInput from "./LeaveSettingInput";
import { get } from "jquery";

const types = [
  { value: "1", label: "Employee" },
  { value: "2", label: "Customer / Supplier" },
  { value: "3", label: "Enlisted Members" },
];

const UserInfoMain = () => {
  const [type, setType] = useState({});
  const [data, setData] = useState([]);
  const [code, setCode] = useState(" ");
  const [name, setName] = useState(" ");
  const [phone, setPhone] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id == 0) {
      return Swal.fire({
        title: "Make one user at a time",
        icon: "warning",
        timer: 2000,
      });
    }
    let data = {
      uS_Nm: userName,
      uS_Pas: password,
      tYP: type.value,
      iD: id,
    };
    setType({});
    setData([]);
    setCode(" ");
    setName(" ");
    setPhone(" ");
    setPhone(" ");
    setUserName("");
    setPassword("");
    console.log("all data", data);

    try {
      let url = `${BASE.URL}/api/FUS28I01`;
      await axios({
        method: "post",
        url: url,
        data: data,
      });
      console.log("all data", data);

      Swal.fire({
        title: "Successfully Added",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: "Something is wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };
  const fnType = (e) => {
    setType({ value: e.value, label: e.label });
    getAllData(e.value);
  };

  const fnClick = async (e) => {
    e.preventDefault();
    let nm = name;
    let cd = code;
    let pn = phone;
    let em = email;

    if (name.length > 1) {
      nm = name.trim();
    } else if (name.length < 1) {
      nm = " ";
    }
    if (code.length > 1) {
      cd = code.trim();
    } else if (code.length < 1) {
      cd = " ";
    }
    if (phone.length > 1) {
      pn = phone.trim();
    } else if (phone.length < 1) {
      pn = " ";
    }
    if (email.length > 1) {
      em = email.trim();
    } else if (email.length < 1) {
      em = " ";
    }

    let url = `${BASE.URL}/api/griddata/GRINFOFORFUS28I01/${type.value}/${cd}/${nm}/${pn}/${em}`;
    console.log("url", url);
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setData(newData);

    console.log("new data", newData);
    if (newData.length === 1) {
      {
        newData.map((item) => {
          let did = item.id;
          setId(did);
          console.log("setId", item.id);
        });
      }
    }
  };

  const getAllData = async (t) => {
    let url = `${BASE.URL}/api/griddata/GRINFOFORFUS28I01/${t}`;
    console.log("url", url);
    let data = await axios({
      method: "get",
      url: url,
    });
    let newData = data.data;
    setData(newData);
    console.log("new data", newData);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <Row>
              <Col md="3">
                <FormGroup>
                  <h5>Types</h5>

                  <Select
                    className="React"
                    classNamePrefix="select"
                    // name="lc"
                    // defaultValue={types[0]}
                    options={types}
                    onChange={fnType}
                    value={type}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Code</h5>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Col>
              <Col>
                <h5>Name</h5>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
              <Col>
                <h5>Phone</h5>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
              <Col>
                <h5>Email</h5>
                <Input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
              <Col>
                <div className="d-inline-block mr-1 mt-2">
                  <Button.Ripple color="primary" onClick={fnClick}>
                    Search
                  </Button.Ripple>
                </div>{" "}
              </Col>
            </Row>
            <br />
            <Row>
              <Col md="8">
                <Table responsive style={{ borderRight: "1px solid black" }}>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.code}</td>
                        <td>{item.r_Name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for="basicInput">
                    <h5 className="primary">User Name</h5>
                  </Label>
                  <Input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="basicInput">
                    <h5 className="primary">Password</h5>
                  </Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <>
                <FormGroup className="form-label-group">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button.Ripple>
                  <Button.Ripple
                    color="warning"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={(e) => e.preventDefault()}
                  >
                    Print
                  </Button.Ripple>
                </FormGroup>
              </>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default UserInfoMain;
