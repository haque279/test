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
  Table,
  Input,
} from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { Check } from "react-feather";
import Checkboxs from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import Pagination from "react-js-pagination";

import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";
import { ChallanContext } from "../../contexts/ChallanContext";
import BASE from "../../configs/BASE";
import ProductRateInsertGrid from "./ProductRateInsertGrid";
import Swal from "sweetalert2";
import PhysicalStockInsertGrid from "./PhysicalStockInsertGrid";

const Stock = [
  { value: 25, label: "Physical Stock" },
  { value: 2, label: "Opening Stock" },
];

const PhysicalStockMain = () => {
  const [PricingLavel, setPricingLavel] = useState([]);

  const [physicalStockValue, setPhysicalStockValue] = useState(0);
  const [stockType, setStockType] = useState("");

  const [dob, setDob] = useState(new Date());
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

  const [listData, setListData] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [voucherNo, setVoucherNo] = useState("");

  const [activePage, setActivePage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalNo, setTotalNo] = useState();

  const { add, challan } = useContext(ChallanContext);

  const onChangeMulti = (value, { action, removedValue }) => {};
  const getPricingLavel = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLPriceLevel`;
    const data = await axios.get(url);
    setPricingLavel(data.data);
  };

  const handleAdd = (item) => {
    add(item);
    setFresh(!fresh);
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
    setProducts(returnData.data[0].data);
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
    } else {
      setClassValue("0");
    }
    if (action === "clear") {
      setClassValue("0");
    }
    setFresh(!fresh);
  };

  const handleSearch = async () => {
    let url = `${BASE.URL}/api/Griddata/GETASKU0707/pn/${activePage}/ps/${pageSize}/${editionValue}/${productTitleValue}/${typeValue}/${classValue}/${publisherValue}`;
    let returnData = await axios({
      url: url,
      method: "get",
    });
    setProducts(returnData.data[0].data);
    setTotalNo(returnData.data[0].totalRaw);
    setProducts(returnData.data[0].data);
    setFresh(!fresh);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      vT_Id: physicalStockValue,
      dAT: dob,
      tOT_Amt: totalAmount,
      Part: listData,
    };
    console.log("all data", data);

    try {
      let url = `${BASE.URL}/api/EPS88M30`;
      let response = await axios({
        method: "post",
        url: url,
        data: data,
      });

      setVoucherNo(response.data);

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

  const getData = (data) => {
    let id = data.sKU_Id;
    let subtotal = 0;
    let newList = products.map((e) => {
      if (e.id === id) {
        e.id = data.sKU_Id;
        e.uN_Rat = data.uN_Rat;
        e.qTY = data.qTY;
      }
      subtotal += e.uN_Rat * e.qTY;
      return {
        sKU_Id: e.id,
        rAT: e.uN_Rat,
        qTY: e.qTY,
        aMT: e.uN_Rat * e.qTY,
      };
    });
    setTotalAmount(subtotal);
    setListData(newList);
  };

  useEffect(() => {
    getPublisherList();
    getEdditionList();
    getTypeList();
    getProductTitleList();
    getClassList();
    getPricingLavel();
  }, [fresh]);

  return (
    <>
      <Card>
        <CardBody>
          <Row>
            <Col md="12">
              <h3 className="text-center">
                {voucherNo ? `Voucher No: ${voucherNo}` : ""}
              </h3>
            </Col>
            <Col md="6">
              <FormGroup>
                <h5>Date</h5>

                <Flatpickr
                  id="dob"
                  className="form-control"
                  options={{ dateFormat: "Y-m-d" }}
                  value={dob}
                  onChange={(date) => {
                    setDob(date[0]);
                  }}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <h5>Select</h5>

                <Select
                  className="React"
                  classNamePrefix="select"
                  // defaultValue={Stock[0]}
                  // name="lc"
                  options={Stock}
                  onChange={(e) => {
                    setPhysicalStockValue(e.value);
                    setStockType(e.label);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <h5>{BASE.mNF_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                options={publisherList}
                className="React"
                classNamePrefix="select"
                onChange={onChangePublisher}
                value={publisher}
              />
            </Col>
            <Col>
              <h5>{BASE.cT_Nm} </h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                options={classList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeClass}
                value={classes}
              />
            </Col>
            <Col>
              <h5>{BASE.bR_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                options={typeList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeType}
                value={type}
              />
            </Col>
            <Col>
              <h5>{BASE.gEN_Nm}</h5>

              <Select
                closeMenuOnSelect={false}
                isMulti
                options={productTitleList}
                className="React"
                classNamePrefix="select"
                onChange={onChangeProductTitle}
                value={productTitle}
              />
            </Col>
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
            <Table responsive>
              <thead>
                <tr>
                  <th>SL </th>
                  <th>Type</th>
                  <th>Class</th>
                  <th>Product Title</th>
                  <th>Publisher</th>
                  <th>Edition</th>
                  <th>Unit</th>
                  <th>Unit Price</th>
                  <th>Current Stock</th>
                  <th>{stockType}</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <PhysicalStockInsertGrid
                    key={index}
                    item={item}
                    getData={getData}
                  />
                ))}
                <tr>
                  <td colspan="10" className="text-right">
                    Total Amount
                  </td>
                  <td>{totalAmount}</td>
                </tr>
              </tbody>
            </Table>
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

          <Row>
            <Col id="Footer">
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
                  outline
                  color="warning"
                  type="reset"
                  className="mb-1"
                >
                  Print
                </Button.Ripple>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

export default PhysicalStockMain;
