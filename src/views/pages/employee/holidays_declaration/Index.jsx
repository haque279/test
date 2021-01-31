import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState(" Holiday Declaration");
  const [gridCol, setGridCol] = useState("172");
  const [fCon, setFcon] = useState("47");
  const [tableCode, setTableCode] = useState("DHO47D10");
  const [spName, setSpName] = useState("DHO47D10GR");
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
