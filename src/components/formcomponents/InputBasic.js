import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap"

class App extends React.Component {
  render() {
    return (
      <FormGroup>
        <Label for="basicInput">Basic Input</Label>
        <Input type="email" id="basicInput" placeholder="Enter Email" />
      </FormGroup>
    )
  }
}
export default App
