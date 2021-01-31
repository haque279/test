import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Account Ledger");
  const [gridCol, setGridCol] = useState("192");
  const [fCon, setFcon] = useState("60");
  const [tableCode, setTableCode] = useState("EAC60L02");
  const [spName, setSpName] = useState("EAC60L02GR");
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
