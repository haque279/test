import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Bank Reconciliation");
  const [gridCol, setGridCol] = useState("195");
  const [fCon, setFcon] = useState("64");
  const [tableCode, setTableCode] = useState("EBN64R06");
  const [spName, setSpName] = useState("EBN64R06GR");
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
