import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Bonus Deduction");
  const [gridCol, setGridCol] = useState("157");
  const [fCon, setFcon] = useState("56");
  const [tableCode, setTableCode] = useState("DBO56D19");
  const [spName, setSpName] = useState("DBO56D19GR");
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

