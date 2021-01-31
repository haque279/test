import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Purchese Bill Tax");
  const [gridCol, setGridCol] = useState("");
  const [fCon, setFcon] = useState("90");
  const [tableCode, setTableCode] = useState("EPB90T32");
  const [spName, setSpName] = useState("EPB90T32GR");
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
