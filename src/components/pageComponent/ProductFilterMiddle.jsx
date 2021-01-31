import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Form,
  Button,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Table,
} from "reactstrap";
import Select from "react-select";
import BASE from "../../configs/BASE";
import axios from "axios";

import makeAnimated from "react-select/animated";
import DropBoxSearch from "../formcomponents/DropBoxSearch";
import { date } from "yup";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

const animatedComponents = makeAnimated();

const ProductFilterMiddle = ({
  getProductWithFilter,
  isClear,
  changeIsClear,
}) => {
  const [manufacturer, setManufacturer] = useState([]);
  const [manufacturerId, setManufacturerId] = useState("0");
  const [manufacturerDefault, setManufacturerDefault] = useState({
    value: "",
    label: "",
  });
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState("0");
  const [brandDefault, setBrandDefault] = useState({ value: "", label: "" });
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("0");
  const [categoryDefault, setCategoryDefault] = useState({
    value: "",
    label: "",
  });
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState("0");
  const [productDefault, setProductDefault] = useState({
    value: "",
    label: "",
  });
  const [sku, setSku] = useState([]);
  const [skuId, setSkuId] = useState("0");
  const [skuDefault, setSkuDefault] = useState({ value: "", label: "" });
  const [allProduct, setAllProduct] = useState([]);

  const [filteredData, setFiteredData] = useState([]);

  const getManufacturer = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLManufacturer`;
    let data = await axios.get(url);
    setManufacturer(data.data);
  };
  const getBrand = async (e) => {
    setManufacturerDefault({ value: e.value, label: e.label });
    let url = `${BASE.URL}/api/ddldata/DDLBrandByManufacturer/${e.value}`;
    let data = await axios.get(url);
    setBrand(data.data);
    setManufacturerId(e.value);
    setBrandId("0");
    setCategoryId("0");
    setProductId("0");
    setSkuId("0");
    setBrandDefault({});
    setCategoryDefault({});
    setProductDefault({});
    setSkuDefault({});
  };
  const getCat = async (e) => {
    setBrandDefault({ value: e.value, label: e.label });
    let url = `${BASE.URL}/api/ddldata/DDLCategoryByVenNBrand/${manufacturerId}/${e.value}`;
    let data = await axios.get(url);
    setCategory(data.data);
    setBrandId(e.value);
    setCategoryDefault({});
    setProductDefault({});
    setSkuDefault({});
  };
  const getProduct = async (e) => {
    setCategoryDefault({ value: e.value, label: e.label });
    let url = `${BASE.URL}/api/ddldata/DDLGenericByMnfNBrandNCtId/${manufacturerId}/${brandId}/${e.value}`;
    let data = await axios.get(url);
    setProduct(data.data);
    setCategoryId(e.value);
    setProductDefault({});
    setSkuDefault({});
  };
  const getSku = async (e) => {
    setProductDefault({ value: e.value, label: e.label });
    let url = `${BASE.URL}/api/ddldata/DDLSKUByMnfBrandNCtIdNGenId/${manufacturerId}/${brandId}/${categoryId}/${e.value}`;
    let data = await axios.get(url);
    setSku(data.data);
    setProductId(e.value);
    setSkuDefault({});
  };
  const getAllProduct = async (e) => {
    setSkuDefault({ value: e.value, label: e.label });
    let url = `${BASE.URL}/api/griddata/DDLFilterAllProduct/${manufacturerId}/${brandId}/${categoryId}/${productId}/${e.label}`;
    let data = await axios.get(url);
    setAllProduct(data.data);
    setSkuId(e.value);
    // getProductWithFilter(data.data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    let url = `${BASE.URL}/api/griddata/DDLFilterAllProduct/${manufacturerId}/${brandId}/${categoryId}/${productId}/${skuId}`;
    let data = await axios.get(url);
    setAllProduct(data.data);
    // getProductWithFilter(data.data);
    console.log("pro", data.data);
  };

  const getFeltered = (data) => {
    // let format = { products: [], attrs: [{ c32: [5, 7] }, { w52: [1, 3] }] };
    //  new formate  let format = { products: [], attrs: ["c32", 5, 7] };

    // new output {"products":[4,5,7,9,10,11,12,13,14,23,24,25,26,27,28,29,30,16,17,18,19,20,21,34,35,36,3,22,31,32,33,15,8,6],"attrs":[[1,[1,2]],[3,[7,8]]]}

    let newitems = data.map((item) => {
      let acode = item.main.value;

      let cvalues = item.child.map((e) => e.value);

      let new_item = { FM: acode, FV: cvalues };

      // new_item = {}
      // new_item[acode] = cvalues;

      return new_item;
    });

    let allProductList = allProduct.map((item) => item.id);

    let output = {
      products: allProductList,
      attrs: newitems,
    };

    console.log("output", output);

    let newOutput = JSON.stringify(output);
    getProductWithFilter(newOutput);
  };

  useEffect(() => {
    getManufacturer();
    if (isClear) {
      setManufacturerDefault({ value: "", label: "" });
      setBrandDefault({ value: "", label: "" });
      setCategoryDefault({ value: "", label: "" });
      setProductDefault({ value: "", label: "" });
      setSkuDefault({ value: "", label: "" });
      setAllProduct([]);
    }
  }, [isClear]);
  return (
    <div>
      <Row>
        <Col>
          <FormGroup>
            <h5>Manufacture</h5>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={manufacturer[0]}
              name="manufacturer"
              value={manufacturerDefault}
              options={manufacturer}
              onChange={getBrand}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <h4>Brand</h4>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={brand[0]}
              name="brand"
              value={brandDefault}
              options={brand}
              onChange={getCat}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <h4>Category</h4>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={category[0]}
              name="brand"
              value={categoryDefault}
              options={category}
              onChange={getProduct}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <h5>Product</h5>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={product[0]}
              name="product"
              value={productDefault}
              options={product}
              onChange={getSku}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <h5>Product SKU</h5>
            <Select
              className="React"
              classNamePrefix="select"
              // defaultValue={sku[0]}
              name="color"
              value={skuDefault}
              options={sku}
              onChange={getAllProduct}
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <div className="d-inline-block mr-1 mb-1" style={{ marginTop: 25 }}>
              {" "}
              <Button.Ripple color="info" onClick={handleSearch}>
                Search
              </Button.Ripple>{" "}
            </div>
          </FormGroup>
        </Col>
      </Row>
      <br />

      <Row>
        <Col
          md="8"
          sm="12"
          className="filter"
          style={{ borderRight: "2px solid #E6E6E6" }}
        >
          <Table responsive>
            <thead>
              <tr>
                <th>SL</th>
                <th>SkU</th>
                <th>Product</th>
                <th>Manufacture</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Filter And Values</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {allProduct.map((e) => (
                <tr>
                  <td>{e.sl}</td>
                  <td>{e.skuCode}</td>
                  <td>{e.gen}</td>
                  <td>{e.vendor}</td>
                  <td>{e.brand}</td>
                  <td>{e.category}</td>
                  <td>{e.skuFill}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md="4" sm="12">
          <DropBoxSearch
            getFeltered={getFeltered}
            isClear={isClear}
            changeIsClear={changeIsClear}
          />
        </Col>
      </Row>
      <br />
    </div>
  );
};

export default ProductFilterMiddle;
