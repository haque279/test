import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import BASE from "../../../../configs/BASE";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState(BASE.prca);
  const [gridCol, setGridCol] = useState("145");
  const [fCon, setFcon] = useState("1");
  const [tableCode, setTableCode] = useState("ACT01001");
  const [spName, setSpName] = useState("ACT01001GR");
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
