import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("BarCode");
  const [gridCol, setGridCol] = useState("141");
  const [fCon, setFcon] = useState("16");
  const [tableCode, setTableCode] = useState("ABAR1616");
  const [spName, setSpName] = useState("ABAR1616GR");
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

