// import React, { useState, useEffect, useContext } from "react";
// import { FormGroup, Label, Input, CustomInput } from "reactstrap";
// import { CrudContext } from "../../contexts/CrudContext";

// const SwitchComp = ({ data, parentCallback, type, clear }) => {
//   const [fieldName, setFieldName] = useState(data.ccName);
//   const [fieldValue, setFieldValue] = useState(false);
//   const { crud } = useContext(CrudContext);

//   const handleChange = (e) => {
//     setFieldValue(!fieldValue);
//     parentCallback(data.ccName, !fieldValue);
//   };
//   const getValue = () => {
//     const newGet = crud.columns;
//     setFieldValue(newGet[fieldName]);
//   };
//   useEffect(() => {
//     console.log("name", data.ccName);
//     if (type === "add" || clear) {
//       setFieldValue("");
//       setFieldName("");
//     } else {
//       getValue();
//     }
//   }, [clear]);
//   return (
//     <div>
//       <React.Fragment>
//         <input
//           type="checkbox"
//           id={fieldName}
//           name={fieldName}
//           value={fieldValue}
//           onChange={handleChange}
//         />
//         <CustomInput
//           type="switch"
//           // id="exampleCustomSwitch"
//           id="default"
//           name={fieldName}
//           value={fieldValue}
//           inline
//           onChange={handleChange}
//         >
//           <span className="switch-label">{data.displayName}</span>
//         </CustomInput>
//       </React.Fragment>
//     </div>
//   );
// };

// export default SwitchComp;

import React, { useState, useEffect, useContext } from "react";
import { FormGroup, Label, Input, CustomInput } from "reactstrap";
import Checkboxs from "../../components/@vuexy/checkbox/CheckboxesVuexy";
import { Check, User } from "react-feather";
import { CrudContext } from "../../contexts/CrudContext";

const SwitchComp = ({ data, parentCallback, type, clear }) => {
  const [fieldName, setFieldName] = useState(data.ccName);
  const [fieldValue, setFieldValue] = useState(false);
  const { crud } = useContext(CrudContext);

  const handleChange = (e) => {
    setFieldValue(!fieldValue);
    parentCallback(data.ccName, !fieldValue);
  };
  const getValue = () => {
    const newGet = crud.columns;
    setFieldValue(newGet[fieldName]);
  };
  useEffect(() => {
    console.log("name", data.ccName);
    if (type === "add") {
      setFieldValue("");
      setFieldName("");
    } else {
      getValue();
    }
  }, [clear]);
  return (
    <div>
      <React.Fragment>
        <CustomInput
          type="switch"
          id="exampleCustomSwitch"
          name={fieldName}
          value={fieldValue}
          inline
          onChange={handleChange}
        >
          <span className="switch-label">{data.displayName}</span>
        </CustomInput>
      </React.Fragment>
    </div>
  );
};

export default SwitchComp;
