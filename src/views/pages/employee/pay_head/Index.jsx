import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Employee Pay Head");
  const [gridCol, setGridCol] = useState("167");
  const [fCon, setFcon] = useState("50");
  const [tableCode, setTableCode] = useState("DPA50H13");
  const [spName, setSpName] = useState("DPA50H13GR");
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
