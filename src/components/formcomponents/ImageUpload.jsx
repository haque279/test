import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FormGroup, Label, CustomInput } from "reactstrap";

const ImageUpload = ({ data, parentCallback, type, clear }) => {
  const [files, setFiles] = useState({});
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/jpeg, image/png",
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {setFiles(file)}
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = "";
  // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  //   <li key={file.path}>
  //     {file.path}{" "}
  //     <img src={file.preview} alt="Girl in a jacket" width="500" height="600" />{" "}
  //     - {file.size} bytes
  //     <ul>
  //       {errors.map((e) => (
  //         <li key={e.code}>{e.message}</li>
  //       ))}
  //     </ul>
  //   </li>
  // ));

  const handleChange = () => {
    let imagefile = document.querySelector("#file");
    let formData = new FormData();
    formData.append("image", imagefile.files[0]);
    console.log(">> formData >> ", formData);
    parentCallback(data.ccName, ...formData);
  };

  useEffect(() => {
    console.log("files", files);
  }, [files]);

  return (
    <div>
      <FormGroup>
        <Label for="customFile">Custom File Input</Label>
        <CustomInput
          type="file"
          id="file"
          name="customFile"
          onChange={handleChange}
        />
      </FormGroup>
    </div>
  );
};

export default ImageUpload;
