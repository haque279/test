import React from "react";
import { Table } from "reactstrap";

const EmployeeAttendanceGrid = () => {
  return (
    <div>
        <br/>
      <Table hover>
        <thead>
          <tr>
            <th>SL</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Schedule</th>
            <th>In Time</th>
            <th>Present All</th>
            <th>Late</th>
            <th>Late Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>HR</td>
            <td>Executive</td>
            <td>Morning</td>
            <td>9:00-2:00</td>
            <td>#</td>
            <td>#</td>
            <td>9:50</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Design department</td>
            <td>Emplooyee</td>
            <td>Morning</td>
            <td>9:00-2:00</td>
            <td>#</td>
            <td>#</td>
            <td>9:30</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>Manager</td>
            <td>Production manager</td>
            <td>Morning</td>
            <td>9:00-2:00</td>
            <td>#</td>
            <td>#</td>
            <td>11:00</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeAttendanceGrid;
