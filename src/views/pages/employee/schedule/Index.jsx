import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";

const Index = () => {
  const [tableName, setTableName] = useState("Schedule");
  const [gridCol, setGridCol] = useState("170");
  const [fCon, setFcon] = useState("42");
  const [tableCode, setTableCode] = useState("DSC42005");
  const [spName, setSpName] = useState("DSC42005GR");
  return (
    <div>
      <MyModal tableName={tableName} tableCode={tableCode} fCon={fCon} />
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
