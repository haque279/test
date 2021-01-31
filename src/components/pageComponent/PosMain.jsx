import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import random from "random";
import Pagination from "react-js-pagination";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { ChallanContext } from "../../contexts/ChallanContext";
import BASE from "../../configs/BASE";
import { PosContest } from "../../contexts/PosContext";
import "../../assets/scss/custom.css";
import PosCart from "./PosCart";

const PosMain = () => {
  const [fresh, setFresh] = useState(false);
  const [products, setProducts] = useState([]);

  const [publisherList, setPublisherList] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [publisherValue, setPublisherValue] = useState("0");

  const [editionList, setEditionList] = useState([]);
  const [edition, setedition] = useState([]);
  const [editionValue, setEditionValue] = useState("0");

  const [typeList, setTypeList] = useState([]);
  const [type, setType] = useState([]);
  const [typeValue, setTypeValue] = useState("0");

  const [classList, setClassList] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classValue, setClassValue] = useState("0");

  const [productTitleList, setProductTitleList] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
  const [productTitleValue, setProductTitleValue] = useState("0");

  const [invoiceNo, setInvoiceNo] = useState(random.int(0, 99999));
  const [CounterList, setCounterList] = useState([]);
  const [counter, setCounter] = useState({ label: "", value: "" });
  const [salesMan, setSalesMan] = useState("0");

  const [customerList, setCustomerList] = useState([]);
  const [customer, setCustomer] = useState({ label: "", value: "" });

  const [cartPage, setCartPage] = useState(false);

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState();

  const columns = [
    {
      dataField: "sl",
      text: "Serial No",
      sort: true,
    },
    {
      dataField: "gEN_Nm",
      text: BASE.gEN_Nm,
    },
    {
      dataField: "bR_Nm",
      text: BASE.bR_Nm,
    },
    {
      dataField: "cT_Nm",
      text: BASE.cT_Nm,
    },

    {
      dataField: "mNF_Nm",
      text: BASE.mNF_Nm,
    },
    {
      dataField: "sKU_Cod",
      text: BASE.sKU_Cod,
    },
    {
      dataField: "uN_Nm",
      text: "Unit",
    },
    {
      dataField: "uN_Rat",
      text: "Price",
    },
    {
      dataField: "add",
      text: "Action",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <Button.Ripple
            outline
            className="round"
            color="dark"
            size="sm"
            onClick={(e) => handleAdd(row)}
          >
            Add to list
          </Button.Ripple>
        </div>
      ),
    },
  ];

  const { pos, add, fetchProducts, cancel } = useContext(PosContest);

  const handleAdd = (item) => {
    let itemId = item.id;
    console.log("id", itemId);
    add(item);
    setFresh(!fresh);
  };

  const getPublisherList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRAMNF0303/${editionValue}/${productTitleValue}/${typeValue}/${classValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setPublisherList(data.data);
  };
  const onChangePublisher = (value, { action, removedValue }) => {
    setPublisher(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setPublisherValue(list);
      console.log("publisher multi", list);
    } else {
      setPublisherValue("0");
    }
    if (action === "clear") {
      setPublisherValue("0");
    }
    setFresh(!fresh);
  };
  const getEdditionList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRASKU0707/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setEditionList(data.data);
  };

  const onChangeEdtion = (value, { action, removedValue }) => {
    setedition(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setEditionValue(list);
      console.log(" multi", list);
    } else {
      setEditionValue("0");
    }
    if (action === "clear") {
      setEditionValue("0");
    }
    setFresh(!fresh);
  };

  const getTypeList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRABR02002/${editionValue}/${productTitleValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setTypeList(data.data);
  };

  const onChangeType = (value, { action, removedValue }) => {
    setType(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setTypeValue(list);
      console.log("publisher multi", list);
    } else {
      setTypeValue("0");
    }
    if (action === "clear") {
      setTypeValue("0");
    }
    setFresh(!fresh);
  };

  const getProductTitleList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRAGE06006/${editionValue}/${typeValue}/${classValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setProductTitleList(data.data);
  };

  const onChangeProductTitle = (value, { action, removedValue }) => {
    setProductTitle(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setProductTitleValue(list);
      console.log("publisher multi", list);
    } else {
      setProductTitleValue("0");
    }
    if (action === "clear") {
      setProductTitleValue("0");
    }
    setFresh(!fresh);
  };

  const getClassList = async () => {
    const url = `${BASE.URL}/api/ddldata/SRACT01001/${editionValue}/${productTitleValue}/${typeValue}/${publisherValue}`;
    const data = await axios({
      url: url,
      method: "get",
    });
    setClassList(data.data);
  };

  const onChangeClass = (value, { action, removedValue }) => {
    setClasses(value);
    if (value) {
      let allList = value.map((e) => e.value);
      let list = allList.join(",");
      setClassValue(list);
      console.log("publisher multi", list);
    } else {
      setClassValue("0");
    }
    if (action === "clear") {
      setClassValue("0");
    }
    setFresh(!fresh);
  };

  const getCounter = async () => {
    let data = await axios.get(`${BASE.URL}/api/ddldata/DDLSalesCounter`);
    setCounterList(data.data);
    setCounter(data.data[0]);
  };

  const getcustomer = async () => {
    let data = await axios.get(`${BASE.URL}/api/ddldata/DDLCustomer`);
    setCustomerList(data.data);
    setCustomer(data.data[0]);
  };

  const handleSearch = async () => {
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${activePage}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    console.log("pro: ", returnData.data[0].data);
    setTotalNo(returnData.data[0].totalRaw);
    fetchProducts(returnData.data[0].data);
    // reload()

    // setFresh(!fresh);
  };

  const handleCounter = (e) => {
    setCounter({ label: e.label, value: e.value });
  };

  const handleCustomer = (e) => {
    // e.preventDefault();
    setCustomer({ label: e.label, value: e.value });
  };

  const handleCancel = () => {
    cancel();
    setCartPage(!cartPage);
    fetchProducts();
  };

  const handlePageChange = async (pNumber) => {
    setActivePage(pNumber);
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${pNumber}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    console.log("pro: ", returnData.data[0].data);
    setTotalNo(returnData.data[0].totalRaw);
    fetchProducts(returnData.data[0].data);
  };

  const initialTotalPage = async () => {
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${activePage}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    setTotalNo(returnData.data[0].totalRaw);
    setActivePage(1);
    // fetchProducts(returnData.data[0].data);
  };

  useEffect(() => {
    getPublisherList();
    getEdditionList();
    getTypeList();
    getProductTitleList();
    getClassList();
    getCounter();
    getcustomer();
    initialTotalPage();
  }, [fresh]);

  return (
    <>
      <Card className="pos-page">
        <CardBody>
          <Row>
            <Col md={3}>
              <h2 className="">Cash Sale </h2>
            </Col>

            <Col>
              <h5>Counter</h5>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={brand[0]}
                name="counter"
                value={counter}
                options={CounterList}
                onChange={handleCounter}
              />
            </Col>
            <Col>
              <h5>Salesman</h5>
              <Input
                type="text"
                value={salesMan}
                onChange={(e) => setSalesMan(e.target.value)}
              />
            </Col>
            <Col>
              <h5>Customer</h5>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={brand[0]}
                name="customer"
                value={customer}
                options={customerList}
                onChange={handleCustomer}
              />
            </Col>
            <Col>
              <h5>Voucher No</h5>

              <Input type="text" disabled value={localStorage.getItem("inv")} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <h5>{BASE.sKU_Cod}</h5>

              <Select
                closeMenuOnSelect={false}
                // defaultValue={[value[1], value[5]]}
                isMulti
                options={editionList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeEdtion}
                value={edition}
              />
            </Col>
            <Col>
              <h5>{BASE.bR_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                // defaultValue={[value[1], value[5]]}
                isMulti
                options={typeList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeType}
                value={type}
              />
            </Col>
            <Col>
              <h5>{BASE.cT_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                // defaultValue={[value[1], value[5]]}
                isMulti
                options={classList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeClass}
                value={classes}
              />
            </Col>
            <Col>
              <h5>{BASE.mNF_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                // defaultValue={[value[1], value[5]]}
                isMulti
                options={publisherList}
                className="React"
                classNamePrefix="select"
                onChange={onChangePublisher}
                value={publisher}
              />
            </Col>
            <Col>
              <h5>{BASE.gEN_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                // defaultValue={[value[1], value[5]]}
                isMulti
                options={productTitleList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeProductTitle}
                value={productTitle}
              />
            </Col>

            {cartPage ? (
              <Col>
                <h5 style={{ color: "#fff" }}>'</h5>

                <Button.Ripple
                  color="dark"
                  type="submit"
                  outline
                  className="mr-1 mb-1"
                  onClick={(e) => setCartPage(!cartPage)}
                >
                  {pos && pos.cart ? pos.cart.length : null} item added{" "}
                  <i className="feather icon-repeat"> </i>
                </Button.Ripple>
              </Col>
            ) : (
              <>
                <Col>
                  <h5 style={{ color: "rgba(0,0,0,0)" }}>'</h5>

                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={handleSearch}
                  >
                    Search
                  </Button.Ripple>
                </Col>
                <Col>
                  <h5 style={{ color: "rgba(0,0,0,0)" }}>'</h5>

                  <Button.Ripple
                    color="dark"
                    type="submit"
                    outline
                    className="mr-1 mb-1"
                    onClick={(e) => setCartPage(!cartPage)}
                  >
                    {pos && pos.cart ? pos.cart.length : null} item added{" "}
                    {/* <i className="feather icon-repeat"> </i> */}
                  </Button.Ripple>
                </Col>
              </>
            )}
          </Row>
          <Row className="mt-2">
            {!cartPage ? (
              <Col className="pos-table">
                {pos && pos.products ? (
                  <BootstrapTable
                    wrapperClasses="table-responsive"
                    keyField="id"
                    data={pos.products}
                    columns={columns}
                  />
                ) : null}
              </Col>
            ) : null}
          </Row>
          <Row>
            <Col>
              {cartPage ? (
                <PosCart
                  item={pos.cart}
                  mData={{ invoiceNo, customer, salesMan, counter }}
                />
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Pagination
                activePage={parseInt(activePage)}
                itemsCountPerPage={parseInt(pageSize)}
                totalItemsCount={parseInt(totalNo)}
                pageRangeDisplayed={4}
                onChange={handlePageChange}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default PosMain;
