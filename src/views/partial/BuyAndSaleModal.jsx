import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../assets/scss/custom.css";
import BuyAndSale from "../../components/pageComponent/BuyAndSale";
import { ChallanContext } from "../../contexts/ChallanContext";

function BuyAndSaleModal({ resetAddedList, title, postUrl, reportUrl }) {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const { challan } = useContext(ChallanContext);
  const closePage = () => {
    setModal(!modal);

    window.location.reload();
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
        Added {challan && challan.cart ? challan.cart.length : " "}
        {challan.cart.length > 1 ? " items" : " item"}
      </Button.Ripple>

      <Modal
        isOpen={modal}
        // toggle={toggleModal}
        // unmountOnClose={closeModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="modal_header">{title}</span>
          <Button
            color="primary btn btn-icon "
            onClick={closePage}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-chevron-left">Back to list</i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          <BuyAndSale title={title} postUrl={postUrl} reportUrl={reportUrl} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default BuyAndSaleModal;
