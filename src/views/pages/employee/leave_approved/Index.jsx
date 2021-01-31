import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Leave Approved");
  const [gridCol, setGridCol] = useState("165");
  const [fCon, setFcon] = useState("46");
  const [tableCode, setTableCode] = useState("DLE46A09");
  const [spName, setSpName] = useState("DLE46A09GR");
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

