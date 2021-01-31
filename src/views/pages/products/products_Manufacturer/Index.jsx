import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import BASE from "../../../../configs/BASE";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState(BASE.prvn);
  const [gridCol, setGridCol] = useState("149");
  const [fCon, setFcon] = useState("3");
  const [tableCode, setTableCode] = useState("AMNF0303");
  const [spName, setSpName] = useState("AMNF0303GR");
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
