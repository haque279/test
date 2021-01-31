import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const DropboxMulti = ({ value, onChangeMulti }) => {
  
  return (
    <>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[value[1], value[5]]}
        isMulti
        options={value}
        className="React"
        classNamePrefix="select"
        onChange={onChangeMulti}
        // value={value}
      />
    </>
  );
};

export default DropboxMulti;
