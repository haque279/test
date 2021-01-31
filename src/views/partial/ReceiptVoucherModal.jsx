import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../assets/scss/custom.css";
import { GridContext } from "../../contexts/GridContext";
import ReceiptVoucherMain from "../../components/pageComponent/ReceiptVoucherMain";

function ReceiptVoucherModal() {
  const [modal, setModal] = useState(false);
  const { grid, pageReload } = useContext(GridContext);
  const toggleModal = () => {
    setModal(!modal);
  };



  const closePage = () => {
    pageReload(!grid.pageReload);
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
      <Button
        className="btn bg-gradient-info mr-1 mb-1 waves-effect waves-light"
        onClick={toggleModal}
      >
        <i className="feather icon-plus"></i>
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="modal_header">Receipt Voucher</span>
          <Button
            color="danger btn btn-icon "
            onClick={closePage}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-x"></i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          <ReceiptVoucherMain />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReceiptVoucherModal;
