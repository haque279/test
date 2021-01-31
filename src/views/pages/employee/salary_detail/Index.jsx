import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import EmployeeSalaryDetailsModal from "../../../partial/EmployeeSalaryDetailsModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Salary Details");
  const [gridCol, setGridCol] = useState("169");
  const [fCon, setFcon] = useState("53");
  const [tableCode, setTableCode] = useState("DSA53D16");
  const [spName, setSpName] = useState("DSA53D16GR");
  return (
    <div>
      {/* <MyModal
        tableName={tableName}
        tableCode={tableCode}
        fCon={fCon}
      /> */}
      <EmployeeSalaryDetailsModal />
      <GridTable
        tableName={tableName}
        gridCol={gridCol}
        spName={spName}
        tableCode={tableCode}
        fCon={fCon}
      />
    </div>
  );
};


export default Index;
