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
  Input,
} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

import BASE from "../../configs/BASE";

import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { Plus } from "react-feather";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

import "../../assets/scss/custom.css";
import LcProductGrid from "./LcProductGrid";

const LcProductMain = () => {
  const [dob, setDob] = useState(new Date());
  const [allLc, setAllLc] = useState([]);
  const [lc, setLc] = useState({});
  const [allCustomer, setAllCustomer] = useState([]);
  const [customer, setCustomer] = useState({});
  const [allGenCode, setAllGenCode] = useState([]);
  const [genCode, setGenCode] = useState({});
  const [allSku, setAllSku] = useState([]);
  const [sku, setSku] = useState({});
  // const [skuDefault, setSkuDefault] = useState({});
  const [lcProduct, setLcProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [unit, setUnit] = useState([]);
  const [unitId, setUnitId] = useState({});
  const [unitDefault, setUnitDefault] = useState({});

  // Start for add new sku section
  const [addNewSku, setAddNewSku] = useState(false);
  const [manufacturer, setManufacturer] = useState([]);
  const [manufacturerId, setManufacturerId] = useState("0");
  const [brand, setBrand] = useState([]);
  const [brandId, setBrandId] = useState("0");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("0");
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState("0");
  const [skuId, setSkuId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      lC_Id: lc.value,
      cUS_Id: customer.value,
      rEC_Dat: dob,
      tOT_Amt: totalPrice,
      Products: GridProducts,
    };

    console.log("all data", data);

    try {
      let url = `${BASE.URL}/api/ALC04P04`;
      await axios({
        method: "post",
        url: url,
        data: data,
      });
      // console.log("output", allProduct);
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

  const GridProducts = productList.map((e) => {
    return {
      sKU_Id: e.lcProduct.skuId,
      qTY: e.quantity,
      uN_Id: e.unitId.value,
      uN_Pr: e.unitPrice,
    };
  });

  const getManufacturer = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLManufacturer`;
    let data = await axios.get(url);
    setManufacturer(data.data);
  };
  const getBrand = async (e) => {
    let url = `${BASE.URL}/api/ddldata/DDLBrandByManufacturer/${e.value}`;
    let data = await axios.get(url);
    setBrand(data.data);
    setManufacturerId(e.value);
    setBrandId("0");
    setCategoryId("0");
    setProductId("0");
    // setSkuId("0");
  };
  const getCat = async (e) => {
    let url = `${BASE.URL}/api/ddldata/DDLCategoryByVenNBrand/${manufacturerId}/${e.value}`;
    let data = await axios.get(url);
    setCategory(data.data);
    setBrandId(e.value);
  };
  const getProduct = async (e) => {
    let url = `${BASE.URL}/api/ddldata/DDLGenericByVenNBrandNCtId/${manufacturerId}/${brandId}/${e.value}`;
    let data = await axios.get(url);
    setProduct(data.data);
    setCategoryId(e.value);
  };
  const getUnit = async () => {
    let url = `${BASE.URL}/api/ddldata/DDLUnit`;
    let data = await axios.get(url);
    setUnit(data.data);
  };
  const newLcProduct = async (url) => {
    try {
      let newProduct = await axios({
        method: "get",
        url: url,
      });
      console.log("new product", newProduct);
      setLcProduct(newProduct.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const addSku = async (e) => {
    e.preventDefault();

    let newSku = {
      sKU_Code: skuId,
      vE_Cod: manufacturerId,
      cT_Id: categoryId,
      bR_Id: brandId,
      gEN_Id: productId,
      sTS: "A",
      nAR: "created from lc product page",
    };
    console.log("sku add button", newSku);
    let url = `${BASE.URL}/api/DSKU2109`;

    try {
      let newData = await axios({
        method: "post",
        url: url,
        data: newSku,
      });
      let sku_id_post = newData.data.sKU_Id;
      let newProductUrl = `${BASE.URL}/api/ddldata/DDLSearchBySKU/${sku_id_post}`;
      console.log(newProductUrl, "aku id porst");

      newLcProduct(newProductUrl);

      Swal.fire({
        title: "Done",
        icon: "success",
        timer: 2000,
      });
      setAddNewSku(false);
    } catch (error) {
      Swal.fire({
        title: "Something is Wrong",
        icon: "warning",
        timer: 2000,
      });
    }
  };

  const getLcProduct = async (id) => {
    const url = `${BASE.URL}/api/ddldata/DDLSearchBySKU/${id}`;
    const data = await axios.get(url);
    setLcProduct(data.data);
    console.log("lc procudt", data.data);
  };

  const setToList = (e) => {
    e.preventDefault();
    if (quantity < 1 || Object.keys(lcProduct).length === 0) {
      return Swal.fire({
        title: "fillup the field",
        icon: "warning",
        timer: 2000,
      });
    }
    let myTotal = quantity * unitPrice;
    setTotalPrice(totalPrice + myTotal);
    let item = { lcProduct, quantity, unitPrice, unitId, myTotal };
    productList.push(item);
    // setChange(!change);
    setQuantity(0);
    setUnitPrice(0);
    setLcProduct({});
    setUnitId({});
    setUnitDefault({});
    console.log("productList new", productList);
  };

  // End for add new sku section

  const getAllLc = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLLCNo`;
    const data = await axios.get(url);
    setAllLc(data.data);
    console.log("all lc", data.data);
  };

  const getAllCustomer = async () => {
    const url = `${BASE.URL}/api/ddldata/ddlcustomername`;
    const data = await axios.get(url);
    setAllCustomer(data.data);
    console.log("all custommer", data.data);
  };

  const getAllGenCode = async () => {
    const url = `${BASE.URL}/api/ddldata/DDLGeneric`;
    const data = await axios.get(url);
    setAllGenCode(data.data);
    console.log("all gen code", data.data);
  };

  const getAllSku = async (genId) => {
    const url = `${BASE.URL}/api/ddldata/DDLSKUByGen/${genId}`;
    const data = await axios.get(url);
    setAllSku(data.data);
    console.log("all sku code", data.data);
  };

  const handleGenCode = (e) => {
    setGenCode({ label: e.label, value: e.value });
    getAllSku(e.value);
    setSku({});
  };

  const newSkuButton = (e) => {
    e.preventDefault();
    setAddNewSku(true);
    console.log("button");
  };

  const delteRow = (id) => {
    console.log("id:", productList);
    let newList = productList.filter((e) => e.lcProduct.skuId != id);
    setProductList(newList);
    let listItem = productList.filter((e) => e.lcProduct.skuId == id);

    console.log("filtered", listItem);
    setTotalPrice(totalPrice - listItem[0].myTotal);
  };

  useEffect(() => {
    getAllLc();
    getAllCustomer();
    getAllGenCode();
    getManufacturer();
    getUnit();
    console.log("lcProduct", lcProduct);
  }, []);

  return (
    <>
      <Card>
        <CardBody>
          <Form className="mt-2">
            <>
              <Row>
                <Col>
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
                <Col>
                  <FormGroup>
                    <h5>Lc No</h5>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={allLc[0]}
                      name="lc"
                      options={allLc}
                      onChange={(e) =>
                        setLc({ label: e.label, value: e.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <h5>Customer </h5>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={allCustomer[0]}
                      name="customer"
                      options={allCustomer}
                      onChange={(e) =>
                        setCustomer({ label: e.label, value: e.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <h5>Gen Code</h5>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={allGenCode[0]}
                      name="gencode"
                      options={allGenCode}
                      onChange={handleGenCode}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <h5>SKU</h5>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={allSku[0]}
                      name="sku"
                      options={allSku}
                      value={sku}
                      onChange={(e) => {
                        setSku({ label: e.label, value: e.value });
                        getLcProduct(e.value);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col style={{ textAlign: "right" }}>
                  <h5 style={{ color: "#fff" }}>'</h5>
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                    onClick={newSkuButton}
                  >
                    Add New SKU
                  </Button.Ripple>
                </Col>
              </Row>
              <hr />
              {addNewSku ? (
                <Row>
                  <Col>
                    <FormGroup>
                      <h5>New Sku</h5>
                      <Input
                        type="text"
                        id="sku"
                        placeholder=""
                        onChange={(e) => setSkuId(e.target.value)}
                        value={skuId}
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    <FormGroup>
                      <h5>Manufacture</h5>
                      <Select
                        className="React"
                        classNamePrefix="select"
                        // defaultValue={}
                        name="manufacturer"
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
                        defaultValue={brand[0]}
                        name="brand"
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
                        defaultValue={category[0]}
                        name="brand"
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
                        defaultValue={product[0]}
                        name="product"
                        options={product}
                        onChange={(e) => setProductId(e.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col style={{ marginTop: 25 }}>
                    {addNewSku ? (
                      <Button.Ripple
                        color="info"
                        type="submit"
                        className="mr-1 mb-1"
                        onClick={addSku}
                      >
                        Add SKU
                      </Button.Ripple>
                    ) : (
                      <Button
                        color="success"
                        className="btn-icon rounded-circle"
                        type="submit"
                        // onClick={setToList}
                      >
                        <Plus size={15} />
                      </Button>
                    )}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <h6>Product</h6>
                    <div className="form-control">{lcProduct.gEN_Nm}</div>
                  </Col>
                  <Col>
                    <h6>Manufacture</h6>
                    <div className="form-control">{lcProduct.vE_Nm}</div>
                  </Col>
                  <Col>
                    <h6>Brand</h6>
                    <div className="form-control">{lcProduct.bR_Nm}</div>
                  </Col>
                  <Col>
                    <h6>Category</h6>
                    <div className="form-control">{lcProduct.cT_Nm}</div>
                  </Col>
                  <Col>
                    <h6>Quantity</h6>
                    <Input
                      type="number"
                      id="Quantity"
                      placeholder=""
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <h6>Unit</h6>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      // defaultValue={unit[0]}
                      name="unit"
                      options={unit}
                      value={unitDefault}
                      onChange={(e) => {
                        setUnitId({ label: e.label, value: e.value });
                        setUnitDefault({ label: e.label, value: e.value });
                      }}
                    />
                  </Col>
                  <Col>
                    <h6>Unit Price</h6>

                    <Input
                      type="number"
                      id="Unit Price"
                      placeholder=""
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Col style={{ marginTop: 21 }}>
                      <Button
                        color="info"
                        className="btn-icon rounded-circle"
                        onClick={setToList}
                      >
                        <Plus size={15} />
                      </Button>
                    </Col>
                  </Col>
                </Row>
              )}
              <LcProductGrid productList={productList} delteRow={delteRow} />

              <Col></Col>
              <Col>
                <hr
                  style={{
                    color: "#0097E6",
                    backgroundColor: "#0097E6",
                    height: 1,
                  }}
                />
                <div className="text-right">
                  <h5 className="my-1">Total Price: {totalPrice}</h5>
                </div>
              </Col>
            </>

            <Row>
              <Col id="Footer" sm="12">
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
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

export default LcProductMain;
