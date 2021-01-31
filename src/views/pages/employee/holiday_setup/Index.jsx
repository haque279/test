import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Holiday Setup");
  const [gridCol, setGridCol] = useState("163");
  const [fCon, setFcon] = useState("48");
  const [tableCode, setTableCode] = useState("DHO48S11");
  const [spName, setSpName] = useState("DHO48S11GR");
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
