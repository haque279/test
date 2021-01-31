import React from "react";
// import InputBasic from "./InputBasic"
import { CardTitle, CardBody, FormGroup, Label, Input } from "reactstrap";
import Radio from "../../components/@vuexy/radio/RadioVuexy";

class RadioBox extends React.Component {
  handleChange = (e) => {
    this.props.parentCallback(this.props.data.cname, e.target.value);
  };
  render() {
    return (
      <React.Fragment>
        <FormGroup>
          <Radio
            label="Male"
            color="primary"
            value="male"
            defaultChecked={false}
            name={this.props.data.cname}
            onChange={this.handleChange.bind(this)}
          />
          <Radio
            label="Female"
            color="primary"
            value="female"
            defaultChecked={false}
            name={this.props.data.cname}
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}
export default RadioBox;
