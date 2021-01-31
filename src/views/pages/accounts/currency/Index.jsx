import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Currency");
  const [gridCol, setGridCol] = useState("197");
  const [fCon, setFcon] = useState("69");
  const [tableCode, setTableCode] = useState("ECUR6911");
  const [spName, setSpName] = useState("ECUR6911GR");
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

