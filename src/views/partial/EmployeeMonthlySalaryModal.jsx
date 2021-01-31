import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../assets/scss/custom.css";
import EmployeeMonthlySalary from "../../components/pageComponent/EmployeeMonthlySalary";
import { GridContext } from "../../contexts/GridContext";

function EmployeeMonthlySalaryModal({ openModal, closeModal }) {
  const [modal, setModal] = useState(false);
  const { grid, pageReload } = useContext(GridContext);
  const toggleModal = () => {
    setModal(!modal);
    closeModal(!openModal);
    console.log("modal", modal);
  };

  // const closeModal = () => [console.log("modal is closed")];
  const closePage = () => {
    pageReload(!grid.pageReload);
    setModal(!modal);

    // window.location.reload();
  };
  // useEffect(() => {
  //   setModal(!modal);
  // }, [openModal]);
  return (
    <div className="modal-button">
      {/* <Button
        className="btn bg-gradient-info mr-1 mb-1 waves-effect waves-light"
        onClick={toggleModal}
      >
        <i className="feather icon-plus"></i>
      </Button> */}
      <Modal
        isOpen={openModal}
        toggle={closeModal}
        // unmountOnClose={closeModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="modal_header">Employee Monthly Salary</span>
          <Button
            color="danger btn btn-icon "
            onClick={closeModal}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-x"></i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          <EmployeeMonthlySalary />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EmployeeMonthlySalaryModal;
