import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Product Bomb");
  const [gridCol, setGridCol] = useState("143");
  const [fCon, setFcon] = useState("15");
  const [tableCode, setTableCode] = useState("ABOM1515");
  const [spName, setSpName] = useState("ABOM1515GR");
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
