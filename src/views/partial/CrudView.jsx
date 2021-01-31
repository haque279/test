import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import BASE from "../../configs/BASE";
import TextBox from "../../components/formcomponents/TextBox";
import NumberBox from "../../components/formcomponents/NumberBox";
import DropdownBox from "../../components/formcomponents/DropdownBox";
import DropdownBoxApi from "../../components/formcomponents/DropdownBoxApi";
import TimeSpan from "../../components/formcomponents/TimeSpan";
//import RadioBox from "../../components/formcomponents/RadioBox";
import CheckBox from "../../components/formcomponents/CheckBox";
import EmailBox from "../../components/formcomponents/EmailBox";
import TextArea from "../../components/formcomponents/TextArea";
//import CKEditorBox from "../../components/formcomponents/CKEditorBox";
//import ButtonBlock from "../../components/formcomponents/ButtonBlock";
import SwitchComp from "../../components/formcomponents/SwitchComp";
import DatePickers from "../../components/formcomponents/DatePickers";
import ImageUpload from "../../components/formcomponents/ImageUpload";
import { data } from "jquery";
import { CrudContext } from "../../contexts/CrudContext";
//import DatePickerRange from "../../components/formcomponents/DatePickerRange";
//import MultiSelect from "../../components/formcomponents/MultiSelect";
//import WebInput from "../../components/formcomponents/WebInput";
//import GridTable from "../../components/formcomponents/GridTable";

let components = {
  number: NumberBox,
  datetime: DatePickers,
  // text: TextBox,
  text: TextBox,
  dropdown: DropdownBox,
  dropdownapi: DropdownBoxApi,
  timespan: TimeSpan,
  email: EmailBox,
  image: ImageUpload,
  // DropdownBox: DropdownBox,
  checkbox: CheckBox,
  // RadioBox: RadioBox,
  textarea: TextArea,
  // CKEditorBox: CKEditorBox,
  switch: SwitchComp,
  // DatePickers: DatePickers,
  // DatePickerRange: DatePickerRange,
  // MultiSelect: MultiSelect,
  // WebInput: WebInput,
  //DateTimePicker : DateTimePicker
  // TableComp: TableComp,
  // GridTable: GridTable,
};

const CrudView = ({ tableCode, fCon, id, type, checkUpdate }) => {
  const [columns, setColumns] = useState([]);
  const [idValue, setIdValue] = useState({});
  const [dataItem, setDataItem] = useState({});
  const [clear, setClear] = useState(false);

  const { setCrudColumn, crud } = useContext(CrudContext);

  const onChangeDataItem = (ccName, value) => {
    let item = dataItem;
    item[ccName] = value;
    setDataItem(item);
  };

  const getById = async () => {
    try {
      if (id) {
        let allData = await axios.get(`${BASE.URL}/api/${tableCode}/${id}`);

        let cols = allData.data;

        setIdValue(cols);
        setCrudColumn(cols);
      } else {
        setIdValue(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getColumnsAjax = async () => {
    try {
      let allData = await axios.get(`${BASE.URL}/api/vwCtls/${fCon}`);
      setColumns(allData.data);
      console.log("cols", allData.data);
    } catch (err) {
      console.log(err);
    }
  };

  const callbackFunction = (ccName, childData) => {
    let item = dataItem;
    item[ccName] = childData;
    console.log("item", item);
    setDataItem(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${BASE.URL}/api/${tableCode}`,
      data: dataItem,
      headers: {
        // "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          Swal.fire({
            title: "Successfully Added",
            icon: "success",
            timer: 2000,
          });
          handleClear();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Something is Wrong",
          icon: "warning",
          timer: 2000,
        });
      });
    // setClear(false)
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let item = dataItem;
    console.log("updaed item", item);
    let results = idValue;
    for (var key in results) {
      if (results.hasOwnProperty(key)) {
        if (!item[key]) {
          item[key] = results[key];
        }
      }
    }

    axios({
      method: "PUT",
      url: `${BASE.URL}/api/${tableCode}/${id}`,
      data: item,
    })
      .then((res) => {
        console.log("inter");
        // if (res.status === 200) {
        Swal.fire({
          title: "Successfully Updated",
          icon: "success",
          timer: 2000,
        });
        checkUpdate();
        // }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Something is Wrong",
          icon: "warning",
          timer: 2000,
        });
      });
  };

  const handleClear = () => {
    setClear(!clear);
  };

  useEffect(() => {
    getById();
    setTimeout(() => {
      getColumnsAjax();
    }, 300);
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          {/* <CardTitle>{this.props.tableName}</CardTitle> */}
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md="12" sm="12">
                <Row>
                  <>
                    {columns.length > 0 ? (
                      <>
                        {columns.map((value, index) => {
                          const TagName = components[value.inTy];
                          return (
                            // <Col md="6" key={index}>
                            <TagName
                              key={index}
                              data={value}
                              idValue={idValue}
                              parentCallback={callbackFunction}
                              listData={value}
                              type={type}
                              clear={clear}
                              onClick={handleClear}
                            />
                            // </Col>
                          );
                        })}

                        <Col sm="12">
                          <FormGroup className="form-label-group">
                            {id ? (
                              ""
                            ) : (
                              <Button.Ripple
                                color="primary"
                                type="submit"
                                className="mr-1 mb-1"
                                // onClick={handleSubmit}
                              >
                                Add
                              </Button.Ripple>
                            )}

                            {type !== "add" ? (
                              <Button.Ripple
                                color="warning"
                                type="submit"
                                className="mr-1 mb-1"
                                onClick={handleUpdate}
                              >
                                Update
                              </Button.Ripple>
                            ) : null}
                            <Button.Ripple
                              color="danger"
                              type="reset"
                              className="mb-1"
                              onClick={handleClear}
                            >
                              Clear
                            </Button.Ripple>
                          </FormGroup>
                        </Col>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </>
                </Row>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default CrudView;
