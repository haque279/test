import React, { useState, useEffect, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "../../assets/scss/custom.css";
import { GridContext } from "../../contexts/GridContext";
import EmployeeSchedule from "../../components/pageComponent/EmployeeSchedule";
import EmployeeSalaryDetails from "../../components/pageComponent/EmployeeSalaryDetails";

function EmployeeSalaryDetailsModal() {
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
      <Modal
        isOpen={modal}
        // toggle={toggleModal}
        // unmountOnClose={closeModal}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader toggle={toggleModal}>
          <span className="modal_header" >Employee Salary Details</span>

          <Button
            color="danger btn btn-icon "
            onClick={closePage}
            style={{ position: "absolute", right: 10, top: 10 }}
          >
            <i className="feather icon-x"></i>
          </Button>{" "}
        </ModalHeader>
        <ModalBody>
          <EmployeeSalaryDetails />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EmployeeSalaryDetailsModal;
