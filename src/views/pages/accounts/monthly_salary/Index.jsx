import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Monthly Salary");
  const [gridCol, setGridCol] = useState("");
  const [fCon, setFcon] = useState("57");
  const [tableCode, setTableCode] = useState("DMO57S20");
  const [spName, setSpName] = useState("DMO57S20GR");
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

