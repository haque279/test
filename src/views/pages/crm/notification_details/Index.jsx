import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Notification Details");
  const [gridCol, setGridCol] = useState("180");
  const [fCon, setFcon] = useState("34");
  const [tableCode, setTableCode] = useState("CNO34D03");
  const [spName, setSpName] = useState("CNO34D03GR");
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
