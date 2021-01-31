import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  FormGroup,
  Label,
  Table,
  Button,
} from "reactstrap";
import { PlusSquare, MinusSquare } from "react-feather";
import Pagination from "react-js-pagination";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../assets/scss/custom.css";
import NestedTableChild from "./NestedTableChild";
import BASE from "../../configs/BASE";
import Select from "react-select";
import { Eye, Code, Search, Inbox, Camera } from "react-feather";

const PhysicalStockGrid = () => {
  const [columns, setcolumns] = useState([]);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState(0);
  const [dob, setDob] = useState();
  //   const [dob, setDob] = useState(yeasterday);
  const [rangePicker, setRangePicker] = useState(new Date());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [allCustomer, setAllCustomer] = useState([]);
  const [allVoucher, setAllVoucher] = useState([]);
  const [customerId, setCustomerId] = useState();
  const [gridData, setGridData] = useState([]);
  const [fresh, setFresh] = useState(false);

  const getGridData = async () => {
    // let data = await axios.get(
    //   `${urlMain}/pn/${activePage}/ps/${pageSize}/Fr/${from}/To/${to}`
    // );

    const url = `${BASE.URL}/api/GridData/GETASKU0707GR/pn/${activePage}/ps/${pageSize}`;
    // const url = `${BASE.URL}/api/GridData/GETASKU0707GR/pn/1/ps/10`;
    const data = await axios.get(url);
    setGridData(data.data[0].data);
    setTotalNo(data.data[0].totalRaw);
    console.log("gridData", data.data[0].data);
    setFresh(!fresh);
  };

  const handledob = (date) => {
    setDob(date);
  };

  const handlePageChange = (pNumber) => {
    setActivePage(pNumber);
  };

  const changePerPage = (e) => {
    setActivePage(1);
    setPageSize(e.target.value);
  };

  useEffect(() => {
    getGridData();
  }, [activePage, pageSize, dob, fresh]);
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              {/* <h3 className="primary">{tableName} </h3> */}
              <h3 className="primary">Physical Stock</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <Row style={{ width: "100%" }}>
            <Col>
              {/* <h5>Total Record(s) {totalNo}</h5> */}
              <h5>Total Record(s) {totalNo}</h5>
            </Col>
            <Col>
              <h5>
                Record(s) Per Page
                <select
                  name="per-page"
                  onChange={changePerPage}
                  className="badge badge-glow dark btn btn-sm"
                  style={{
                    marginLeft: 7,
                    fontWeight: 700,
                    border: "1px solid",
                  }}
                  value={pageSize}
                >
                  <option value={1}>1</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </h5>
            </Col>
            <Col>
              <h5>
                Current Page {activePage} of {Math.ceil(totalNo / pageSize)}
              </h5>
            </Col>

            <Col>
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={parseInt(pageSize)}
                totalItemsCount={parseInt(totalNo)}
                pageRangeDisplayed={1}
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>SL</th>
                <th>Type</th>
                <th>Class</th>
                <th>Product Title</th>
                <th>Publisher</th>
                <th>Edition</th>
                <th>Current Stock</th>
                <th>Unit</th>
                <th>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {gridData.map((item, index) => (
                <tr key={index}>
                  <td>{item.sl}</td>
                  <td>{item.bR_Nm}</td>
                  <td>{item.cT_Nm}</td>
                  <td>{item.gEN_Nm}</td>
                  <td>{item.mNF_Nm}</td>
                  <td>{item.sKU_Cod}</td>
                  <td>{item.cUR_Stok}</td>
                  <td>{item.uN_Nm}</td>
                  <td>{item.uN_Rat}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </>
  );
};

export default PhysicalStockGrid;
