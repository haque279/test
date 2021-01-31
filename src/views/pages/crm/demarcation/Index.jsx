import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Demarcation");
  const [gridCol, setGridCol] = useState("177");
  const [fCon, setFcon] = useState("27");
  const [tableCode, setTableCode] = useState("BDMR2710");
  const [spName, setSpName] = useState("BDMR2710GR");
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
