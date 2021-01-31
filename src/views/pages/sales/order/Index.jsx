import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";

const Index = () => {
  const [tableName, setTableName] = useState("Order");
  const [gridCol, setGridCol] = useState("140");
  const [fCon, setFcon] = useState("133");
  const [tableCode, setTableCode] = useState("BOR33015");
  const [spName, setSpName] = useState("BOR33015GR");
  return (
    <div>
      <MyModal tableName={tableName} tableCode={tableCode} fCon={fCon} />
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
