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
  Button
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
import { Eye, Code, Search, Inbox, Camera } from "react-feather"



let aDayBefore = new Date();
let yeasterday = aDayBefore.setDate(aDayBefore.getDate() - 1);

const LedgerReport = ({
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
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [allCustomer, setAllCustomer] = useState([]);
  const [allVoucher, setAllVoucher] = useState([]);;
  const [customerId, setCustomerId] = useState()

  const getAllCustomer = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLAccountLedger`;
    const data = await axios.get(url);
    setAllCustomer(data.data);
    console.log("all custommer", data.data);
  };

  const getAllVoucherById = async () => {
    let fromdDate = moment(from).format("YYYY-MM-DD");
    console.log("fromdDate",fromdDate);
    let toDate = moment(to).format("YYYY-MM-DD");
    const url = `${BASE.URL}/api/griddata/NESTFAC48L02GR/pn/${activePage}/ps/${pageSize}/lgr/${customerId}/fr/${fromdDate}/to/${toDate}`;
    console.log("url",url);
    const data = await axios.get(url);
    setAllVoucher(data.data);
    console.log("all Voucher", data.data);
  };
  useEffect(() => {
    getAllCustomer();
  }, []);

  const handledob = (date) => {
    setDob(date);
  };

  // const expandRow = {
  //   parentClassName: "table-parent-expand",
  //   renderer: (row) => (
  //     <NestedTableChild
  //       id={row.id}
  //       columnChild={columnChild}
  //       urlChild={urlChild}
  //     />
  //   ),
  //   showExpandColumn: true,
  //   expandByColumnOnly: true,
  //   expandHeaderColumnRenderer: ({ isAnyExpands }) => {
  //     if (isAnyExpands) {
  //       return <MinusSquare size={20} />;
  //     }
  //     return <PlusSquare size={20} />;
  //   },
  //   expandColumnRenderer: ({ expanded }) => {
  //     if (expanded) {
  //       return <MinusSquare size={20} />;
  //     }
  //     return <PlusSquare size={20} />;
  //   },

  //   onExpand: (row, isExpand, rowIndex, e) => {
  //     console.log(row.id);
  //     console.log(isExpand);
  //     console.log(rowIndex);
  //     console.log(e);
  //   },
  //   onExpandAll: (isExpandAll, rows, e) => {
  //     console.log(isExpandAll);
  //     console.log(rows);
  //     console.log(e);
  //   },
  // };

  const handlePageChange = (pNumber) => {
    setActivePage(pNumber);
  };

  const changePerPage = (e) => {
    setActivePage(1);
    setPageSize(e.target.value);
  };

  const getData = async () => {
    
    let data = await axios.get(
      `${urlMain}/pn/${activePage}/ps/${pageSize}/Fr/${from}/To/${to}`
    );
    setData(data.data[0].data);
    setTotalNo(data.data[0].totalRaw);
    console.log("data", data.data[0].data);
    console.log("ggg", data);
  };

  useEffect(() => {
   
  }, [activePage, pageSize, dob]);

  return (
    <>
    <Card>
      <CardHeader>
        <Row>
          <Col>
            {/* <h3 className="primary">{tableName} </h3> */}
            <h3 className="primary">Ledger Report</h3>
          </Col>
        </Row>
      </CardHeader>
      <CardHeader>
        <Row style={{ width: "100%" }}>
          <Col>
            {/* <h5>Total Record(s) {totalNo}</h5> */}
            <h5>Total Record(s) 10</h5>
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
        {/* <BootstrapTable
          keyField="id"
          data={data}
          columns={columnMain}
          expandRow={expandRow}
        /> */}
        <Row>
          <Col>
            <FormGroup>
              <h5 for="datepicker">
                {" "}
                Date Range {from} |{to}
              </h5>
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
            <FormGroup>
              <h5>Ledger</h5>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={allCustomer[0]}
                // name="lc"
                options={allCustomer}
                onChange={(e) =>
                  setCustomerId(e.value)
                }
              />
            </FormGroup>
          </Col>
          <Col>
              <div className="d-inline-block mr-1 mt-2">
                {" "}
                <Button.Ripple
                  className="btn-icon"
                  outline
                  color="primary"
                  onClick={getAllVoucherById}
                >
                  <Search size={16} />
                </Button.Ripple>
              </div>
            </Col>
        </Row>
        <Row>
          <Col>
            <h4>Ledger : Cash</h4>
          </Col>
          <Col>
            <h4>From : 2020/12/25 To: 2021/01/05</h4>
          </Col>
        </Row>
        <br/>
        <Table responsive>
          <thead>
            <tr>
              <th>SL</th>
              <th>Date</th>
              <th>Particulars</th>
              <th>Voucher Type</th>
              <th>Voucher No</th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {allVoucher.map((item, index) => (
            <tr key={index}>
              {/* <th scope="row">1</th> */}
              <td>{item.sl}</td>
              <td>{moment(item.dAT).format("DD-MMM-YYYY")}</td>
              <td>{item.lGR_Nm}</td>
              <td>{item.vT_Nm}</td>
              <td>{item.vT_No}</td>
              <td>{item.dBIT}</td>
              <td>{item.cRD}</td>
              {/* <td>{item.lcProduct.gEN_Nm}</td>
              <td>{item.lcProduct.vE_Nm}</td>
              <td>{item.lcProduct.bR_Nm}</td>
              <td>{item.lcProduct.cT_Nm}</td>
              <td>{item.quantity}</td>
              <td>{item.unitId.label}</td>
              <td>{item.unitPrice}</td>
              <td>{item.myTotal}</td>
              <td>
                <Button
                  color="danger"
                  className="btn-icon rounded-circle"
                  onClick={(e) => delteRow(item.lcProduct.skuId)}
                >
                  <X size={15} />
                </Button>
              </td> */}
            </tr>
          ))}
          </tbody>
        </Table>

        <Row>
          <Col md="9">
            <h6 className="text-right">Opening Balance</h6>
          </Col>
          <Col>500000</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col md="9">
            <h6 className="text-right">Current Total</h6>
          </Col>
          <Col>30000</Col>
          <Col>10000</Col>
        </Row>

        <hr />
        <Row>
          <Col md="9">
            <h6 className="text-right">Closing Balance</h6>
          </Col>
          <Col>20000</Col>
          <Col></Col>
        </Row>
      </CardBody>
    </Card>

    </>
  );
};

export default LedgerReport
