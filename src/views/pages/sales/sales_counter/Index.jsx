import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Sales Counter");
  const [gridCol, setGridCol] = useState("137");
  const [fCon, setFcon] = useState("26");
  const [tableCode, setTableCode] = useState("BSA26C09");
  const [spName, setSpName] = useState("BSA26C09GR");
  return (
    <div>
      <MyModal
        tableName={tableName}
        tableCode={tableCode}
        fCon={fCon}
      />
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
