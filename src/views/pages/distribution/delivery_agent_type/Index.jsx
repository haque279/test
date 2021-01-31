import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Delivery Agent Type");
  const [gridCol, setGridCol] = useState("188");
  const [fCon, setFcon] = useState("28");
  const [tableCode, setTableCode] = useState("BDA28T11");
  const [spName, setSpName] = useState("BDA28T11GR");
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

