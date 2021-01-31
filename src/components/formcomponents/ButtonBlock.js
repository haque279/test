import React from "react"
import {
  Button,
  Card,
  CardBody,
  TabPane

} from "reactstrap"


class ButtonBlock extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Card>
          
          <CardBody>           
              <TabPane tabId="1">
                <div className="d-inline-block mr-1 mb-1">
                  <Button.Ripple color="flat-primary">Primary</Button.Ripple>
                </div>                
              </TabPane>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default ButtonBlock
