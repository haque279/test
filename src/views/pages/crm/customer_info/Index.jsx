import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Customer Info");
  const [gridCol, setGridCol] = useState("178");
  const [fCon, setFcon] = useState("32");
  const [tableCode, setTableCode] = useState("CCUS3201");
  const [spName, setSpName] = useState("CCUS3201GR");
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
