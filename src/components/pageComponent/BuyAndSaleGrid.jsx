import React, { useState, useEffect, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Card, CardBody, Row, Col, Button, Input } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { ChallanContext } from "../../contexts/ChallanContext";
import BASE from "../../configs/BASE";
import BuyAndSaleModal from "../../views/partial/BuyAndSaleModal";
import { CartContext } from "../../contexts/CartContext";

const BuyAndSaleGrid = ({ title, postUrl, reportUrl }) => {
  const [dob, setDob] = useState("");
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

  const [invoiceNo, setInvoiceNo] = useState("0");
  const [partyList, setPartyList] = useState([]);
  const [party, setParty] = useState({});
  const [checkEntry, setCheckEntry] = useState([]);
  const [resetList, setResetList] = useState(false);
  const [viewTitle, setViewTitle] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState();

  const location = useLocation();

  const columns = [
    {
      dataField: "sl",
      text: "Serial No",
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
      dataField: "gEN_Nm",
      text: BASE.gEN_Nm,
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
      dataField: "cUR_Stok",
      text: "Current Stock",
    },
    {
      dataField: "uN_Nm",
      text: "Unit",
    },
    {
      dataField: "uN_Rat",
      text: "price",
    },
    {
      dataField: "add",
      text: "Action",
      formatter: (cell, row, rowIndex, extraData) => (
        <div>
          <Button.Ripple
            outline
            className=""
            color="primary"
            size="sm"
            onClick={(e) => handleAdd(row)}
          >
            Add to list
          </Button.Ripple>
        </div>
      ),
    },
  ];

  const {
    challan,
    add,
    fetchProducts,
    getInvoiceNo,
    getDate,
    getStoredParty,
    cancel,
  } = useContext(ChallanContext);

  const { cart, addToCart } = useContext(CartContext);

  const handleAdd = (item) => {
    add(item);
    // addToCart(item);
    console.log("grid cart", cart);
    // setResetList(false);
    // setFresh(!fresh);
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

  const getParty = async () => {
    let data = await axios.get(`${BASE.URL}/api/ddldata/DDLAccountLedger`);
    setPartyList(data.data);
  };

  const handleSearch = async () => {
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${activePage}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    fetchProducts(returnData.data[0].data);
    setTotalNo(returnData.data[0].totalRaw);
    setActivePage(activePage);
    console.log("returnData", returnData.data[0].data);
    console.log("url", url);

    setFresh(!fresh);
  };

  const handleParty = (e) => {
    // e.preventDefault();
    setParty({ label: e.label, value: e.value });
    getStoredParty({ label: e.label, value: e.value });
  };

  const handleInvoiceNo = (e) => {
    e.preventDefault();
    setInvoiceNo(e.target.value);
    getInvoiceNo(e.target.value);
  };

  const resetAddedList = () => {
    setResetList(true);
    console.log("reset  list", checkEntry);
  };

  const checkPage = () => {
    let currentLoation = location.pathname;
    let currentUrl = localStorage.getItem("currentUrl");
    if (currentLoation !== currentUrl) {
      cancel();
    }
    localStorage.setItem("currentUrl", currentLoation);
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
    setActivePage(activePage);
    fetchProducts(returnData.data[0].data);
  };

  useEffect(() => {
    // getAllDisplayName();
    checkPage();
    getPublisherList();
    getEdditionList();
    getTypeList();
    getProductTitleList();
    getClassList();
    getParty();
    getInvoiceNo(invoiceNo);
    initialTotalPage();
  }, [fresh]);

  return (
    <>
      <BuyAndSaleModal
        resetAddedList={resetAddedList}
        title={title}
        postUrl={postUrl}
        reportUrl={reportUrl}
      />

      <Card>
        <CardBody>
          <Row>
            <Col md={3}>
              <h2 className="primary">{title} </h2>
            </Col>
            <Col>
              <h5>Invoice No</h5>
              <Input type="text" value={invoiceNo} onChange={handleInvoiceNo} />
            </Col>
            <Col>
              <h5>Party</h5>
              <Select
                className="React"
                classNamePrefix="select"
                // defaultValue={brand[0]}
                name="party"
                value={party}
                options={partyList}
                onChange={handleParty}
              />
            </Col>
            <Col>
              <h5>Date</h5>
              <Flatpickr
                id="dob"
                className="form-control"
                options={{ dateFormat: "Y-m-d", allowInput: true }}
                value={dob}
                onChange={(date) => {
                  setDob(date[0]);
                  getDate(date[0]);
                }}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <h5>{BASE.sKU_Cod}</h5>

              <Select
                closeMenuOnSelect={false}
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
            <Col>
              <h5 style={{ color: "#fff" }}>'</h5>

              <Button.Ripple
                color="primary"
                type="submit"
                className="mr-1 mb-1"
                onClick={handleSearch}
              >
                Search
              </Button.Ripple>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col>
              <BootstrapTable
                wrapperClasses="table-responsive"
                keyField="id"
                data={challan.products}
                columns={columns}
              />
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

export default BuyAndSaleGrid;
