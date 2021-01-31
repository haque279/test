import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Stock Movement");
  const [gridCol, setGridCol] = useState("185");
  const [fCon, setFcon] = useState("24");
  const [tableCode, setTableCode] = useState("BST24M07");
  const [spName, setSpName] = useState("BST24M07GR");
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

