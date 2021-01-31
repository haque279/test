import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("User Menu");
  const [gridCol, setGridCol] = useState("173");
  const [fCon, setFcon] = useState("129");
  const [tableCode, setTableCode] = useState("FMEN2902");
  const [spName, setSpName] = useState("FMEN2902GR");
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
