import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export class WebInput extends Component {
  handleChange = (e) => {
    this.props.parentCallback(this.props.data.cname, e.target.value);
  };
  render() {
    return (
      <div>
        <FormGroup>
          <Label for="website">Website</Label>
          <Input
            type="url"
            id="website"
            placeholder="Web Address"
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
      </div>
    );
  }
}

export default WebInput;
