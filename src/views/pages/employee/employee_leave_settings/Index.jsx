import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import LeaveSettingModal from "../../../partial/LeaveSettingModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Leave");
  const [gridCol, setGridCol] = useState("162");
  const [fCon, setFcon] = useState("45");
  const [tableCode, setTableCode] = useState("DEM45L08");
  const [spName, setSpName] = useState("DEM45L08GR");
  return (
    <div>
      {/* <MyModal
        tableName={tableName}
        tableCode={tableCode}
        fCon={fCon}
      /> */}
       <LeaveSettingModal />
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

