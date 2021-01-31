import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import Pagination from "react-js-pagination";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../assets/scss/custom.css";
import BASE from "../../configs/BASE";

const ProductRateGrid = () => {
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState(0);
  const [dob, setDob] = useState();
  const [gridData, setGridData] = useState([]);

  const getGridData = async () => {
    const url = `${BASE.URL}/api/GridData/GETASKU0707GR/pn/${activePage}/ps/${pageSize}`;
    const data = await axios.get(url);
    setGridData(data.data[0].data);
    setTotalNo(data.data[0].totalRaw);
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
  }, [activePage, pageSize, dob]);
  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3 className="primary">Product Rate</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardHeader>
          <Row style={{ width: "100%" }}>
            <Col>
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

export default ProductRateGrid;
