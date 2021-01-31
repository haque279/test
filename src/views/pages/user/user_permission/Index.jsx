import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("User Permission");
  const [gridCol, setGridCol] = useState("176");
  const [fCon, setFcon] = useState("131");
  const [tableCode, setTableCode] = useState("FUS31P04");
  const [spName, setSpName] = useState("FUS31P04GR");
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

