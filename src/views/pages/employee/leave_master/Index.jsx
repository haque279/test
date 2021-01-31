import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Leave Master");
  const [gridCol, setGridCol] = useState("164");
  const [fCon, setFcon] = useState("44");
  const [tableCode, setTableCode] = useState("DLE44M07");
  const [spName, setSpName] = useState("DLE44M07GR");
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

