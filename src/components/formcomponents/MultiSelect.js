import React, { Component } from "react";
import Select from "react-select"
import chroma from "chroma-js"
import {
  Label,
  FormGroup
} from "reactstrap"
const languages = [
  { value: "english", label: "English", color: "#7367f0" },
  { value: "french", label: "French", color: "#7367f0" },
  { value: "spanish", label: "Spanish", color: "#7367f0" },
  { value: "russian", label: "Russian", color: "#7367f0" },
  { value: "italian", label: "Italian", color: "#7367f0" },
];
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,

      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0")
      }
    }
  },
  multiValue: (styles, { data }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color ? data.color : "#7367f0"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color ? data.color : "#7367f0",
      color: "white"
    }
  })
}

export class MultiSelect extends Component {
  handleChange = (e) => {
    console.log(e)
    this.props.parentCallback(this.props.data.cname, e);
  };
  render() {
    return (
      <div>
        <FormGroup>
          <Label for="languages">Languages</Label>
          <Select
            isMulti
            defaultValue={[languages[0], languages[1], languages[2]]}
            isClearable={true}
            styles={colourStyles}
            options={languages}
            className="React"
            classNamePrefix="select"
            id="languages"
            onChange={this.handleChange.bind(this)}
          />
        </FormGroup>
      </div>
    );
  }
}

export default MultiSelect;
