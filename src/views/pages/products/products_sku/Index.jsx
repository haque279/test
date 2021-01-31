import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import BASE from "../../../../configs/BASE";
import MyModal from "../../../partial/MyModal";

const Index = () => {
  const [tableName, setTableName] = useState(BASE.psku);
  const [gridCol, setGridCol] = useState("153");
  const [fCon, setFcon] = useState("7");
  const [tableCode, setTableCode] = useState("ASKU0707");
  const [spName, setSpName] = useState("ASKU0707GR");
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
