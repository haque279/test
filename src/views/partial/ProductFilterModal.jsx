import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CrudView from "./CrudView";
import "../../assets/scss/custom.css";
import { GridContext } from "../../contexts/GridContext";

import ProductFilterMain from "../../components/pageComponent/ProductFilterMain";
// import {} from "../../../src/assets/scss/"

function ProductFilterModal() {
  const [modal, setModal] = useState(false);
  const { grid, pageReload } = useContext(GridContext);
  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => [console.log("modal is closed")];
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
      <Modal className="modal"
        isOpen={modal}
        // toggle={toggleModal}
        // unmountOnClose={closeModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader className="modalHeader" toggle={toggleModal}>
          <span className="modal_header" >Product Filter</span>

          <Button
            color="danger btn btn-icon "
            onClick={closePage}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-x"></i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          <ProductFilterMain />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ProductFilterModal;
