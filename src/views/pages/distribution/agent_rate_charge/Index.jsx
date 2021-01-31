import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Agent Charge");
  const [gridCol, setGridCol] = useState("190");
  const [fCon, setFcon] = useState("30");
  const [tableCode, setTableCode] = useState("BAG30R13");
  const [spName, setSpName] = useState("BAG30R13GR");
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

