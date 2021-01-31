import React from "react";
import "../../assets/scss/pages/ckeditor.scss";

import {
  FormGroup,
} from "reactstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import "flatpickr/dist/themes/light.css";
import "../../assets/scss/plugins/forms/flatpickr/flatpickr.scss";

const height = {
  height: '200px'
}

class CKEditorBox extends React.Component {
  handleChange = (e) => {
    this.props.parentCallback(this.props.data.cname, e.target.value);
  };
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <FormGroup>
          <div className="App">
            <h2>{this.props.data.title}</h2>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Edit here Your Code</p>"
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                this.props.parentCallback(this.props.data.cname, data)
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </FormGroup>
      </React.Fragment>
    );
  }
}
export default CKEditorBox;
