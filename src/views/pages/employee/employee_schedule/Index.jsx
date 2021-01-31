import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import EmployeeScheduleModal from "../../../partial/EmployeeScheduleModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Schedule");
  const [gridCol, setGridCol] = useState("171");
  const [fCon, setFcon] = useState("43");
  const [tableCode, setTableCode] = useState("DEM43S06");
  const [spName, setSpName] = useState("DEM43S06GR");
  return (
    <div>
      <EmployeeScheduleModal />
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


