import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Account Group");
  const [gridCol, setGridCol] = useState("191");
  const [fCon, setFcon] = useState("59");
  const [tableCode, setTableCode] = useState("EAC59G01");
  const [spName, setSpName] = useState("EAC59G01GR");
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
