import React from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

class DatePickerRange extends React.Component {
  state = {
    dob: new Date(),
    rangePicker: new Date(),
  };

  handledob = (date) => {
    this.setState({
      dob: date,
    });
  };

  handleChange = (e) => {
    this.props.parentCallback(this.props.data.cname, e.target.value);
    console.log(e);
  };
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Datepickers</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="mb-3" md="6" sm="12">
              <FormGroup>
                <Label className="text-bold-500" for="datepicker">
                  {" "}
                  Date Range
                </Label>
                <Flatpickr
                  id="datepicker"
                  className="form-control"
                  options={{ mode: "range" }}
                  value={this.state.dob}
                  onChange={(date) => {
                    this.handledob(date);
                    this.props.parentCallback(this.props.data.cname, date);
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default DatePickerRange;
