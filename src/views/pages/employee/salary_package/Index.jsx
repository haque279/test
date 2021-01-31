import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import SalaryPackageModal from "../../../partial/SalaryPackageModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Salary Packages");
  const [gridCol, setGridCol] = useState("168");
  const [fCon, setFcon] = useState("51");
  const [tableCode, setTableCode] = useState("DSA51P14");
  const [spName, setSpName] = useState("DSA51P14GR");
  return (
    <div>
      {/* <MyModal
        tableName={tableName}
        tableCode={tableCode}
        fCon={fCon}
      /> */}
       <SalaryPackageModal />
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
