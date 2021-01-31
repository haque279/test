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
} from "reactstrap";
import { PlusSquare, MinusSquare } from "react-feather";
import Pagination from "react-js-pagination";
import Flatpickr from "react-flatpickr";
import moment from "moment";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import "../../assets/scss/custom.css";
import NestedTableChild from "./NestedTableChild";

let today = moment(new Date()).format("Y-M-DD");
let thatDay = new Date();
let yeasterday = thatDay.setDate(thatDay.getDate() - 1);
let dayBefore = moment(yeasterday).format("Y-M-DD");

const NestedTableMain = ({
  columnMain,
  columnChild,
  urlMain,
  urlChild,
  tableName,
}) => {
  const [columns, setcolumns] = useState([]);
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState(0);
  const [dob, setDob] = useState(yeasterday);
  const [rangePicker, setRangePicker] = useState(new Date());
  const [from, setFrom] = useState(dayBefore);
  const [to, setTo] = useState(dayBefore);

  const handledob = (date) => {
    setDob(date);
  };

  const expandRow = {
    parentClassName: "table-parent-expand",
    renderer: (row) => (
      <NestedTableChild
        id={row.id}
        columnChild={columnChild}
        urlChild={urlChild}
      />
    ),
    showExpandColumn: true,
    expandByColumnOnly: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <MinusSquare size={20} />;
      }
      return <PlusSquare size={20} />;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <MinusSquare size={20} />;
      }
      return <PlusSquare size={20} />;
    },

    onExpand: (row, isExpand, rowIndex, e) => {
      console.log(row.id);
      console.log(isExpand);
      console.log(rowIndex);
      console.log(e);
    },
    onExpandAll: (isExpandAll, rows, e) => {
      console.log(isExpandAll);
      console.log(rows);
      console.log(e);
    },
  };

  const handlePageChange = (pNumber) => {
    setActivePage(pNumber);
  };

  const changePerPage = (e) => {
    setActivePage(1);
    setPageSize(e.target.value);
  };

  const getData = async () => {
    console.log(
      "main url",
      `${urlMain}/pn/${activePage}/ps/${pageSize}/Fr/${from}/To/${to}`
    );
    let data = await axios.get(
      `${urlMain}/pn/${activePage}/ps/${pageSize}/Fr/${from}/To/${to}`
    );
    setData(data.data);
    setTotalNo(data.data.totalRaw);
    console.log("data", data.data);
    console.log("ggg", data);
  };

  useEffect(() => {
    getData();
  }, [activePage, pageSize, from, to]);

  return (
    <>
      <Card>
        <CardHeader>
          <Row>
            <Col>
              <h3 className="primary">{tableName} </h3>
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
              <FormGroup>
                {/* <Label className="text-bold-500" for="datepicker">
                {" "}
                Date Range
              </Label> */}
                <Flatpickr
                  id="datepicker"
                  className="form-control"
                  options={{ mode: "range" }}
                  value={dob}
                  onChange={(date) => {
                    handledob(date);
                    setFrom(moment(date[0]).format("Y-M-DD"));
                    setTo(moment(date[1]).format("Y-M-DD"));
                  }}
                />
              </FormGroup>
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
        {data.length > 0 ? (
          <CardBody>
            <BootstrapTable
              keyField="id"
              data={data}
              columns={columnMain}
              expandRow={expandRow}
              // striped
            />
          </CardBody>
        ) : (
          <div className="text-center">
            <h3>No Data found</h3>
            <h5>Please selsect another date range</h5>
          </div>
        )}
      </Card>
    </>
  );
};

export default NestedTableMain;
