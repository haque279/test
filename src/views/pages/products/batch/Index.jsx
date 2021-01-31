import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Products Batch");
  const [gridCol, setGridCol] = useState("142");
  const [fCon, setFcon] = useState("17");
  const [tableCode, setTableCode] = useState("ABCH1717");
  const [spName, setSpName] = useState("ABCH1717GR");
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
