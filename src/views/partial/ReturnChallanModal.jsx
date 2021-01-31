import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../assets/scss/custom.css";
import Challan from "../../components/pageComponent/Challan";
import ReturnChallan from "../../components/pageComponent/ReturnChallan";
import { ChallanContext } from "../../contexts/ChallanContext";
import { ReturnChallanContext } from "../../contexts/ReturnChallanContext";


function ReturnChallanModal({ resetAddedList }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const { returnChallan } = useContext(ReturnChallanContext);
  const closePage = () => {
    setModal(!modal);

    // window.location.reload();
  };
  useEffect(() => {
    if (modal != modal) {
      window.location.reload();
    }
  }, []);
  return (
    <div className="modal-button">
      <Button.Ripple
        className="mr-1 mb-1"
        outline
        color="primary"
        onClick={toggleModal}
      >
        Added {returnChallan && returnChallan.cart ? returnChallan.cart.length : " "}
        {returnChallan.cart.length > 1 ? " items" : " item"}
      </Button.Ripple>

      <Modal
        isOpen={modal}
        // toggle={toggleModal}
        // unmountOnClose={closeModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="modal_header">Return Challan</span>
          <Button
            color="primary btn btn-icon "
            onClick={closePage}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-chevron-left">Back to list</i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          {/* <Challan /> */}
          <ReturnChallan/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReturnChallanModal;
