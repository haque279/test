import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Unit Conversion");
  const [gridCol, setGridCol] = useState("156");
  const [fCon, setFcon] = useState("11");
  const [tableCode, setTableCode] = useState("AUN11C11");
  const [spName, setSpName] = useState("AUN11C11GR");
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
