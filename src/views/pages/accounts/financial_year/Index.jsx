import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Financial Year");
  const [gridCol, setGridCol] = useState("194");
  const [fCon, setFcon] = useState("77");
  const [tableCode, setTableCode] = useState("EFN77Y19");
  const [spName, setSpName] = useState("EFN77Y19GR");
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
