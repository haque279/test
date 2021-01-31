import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Purchese Return Bill Tax");
  const [gridCol, setGridCol] = useState("");
  const [fCon, setFcon] = useState("91");
  const [tableCode, setTableCode] = useState("EPR91T33");
  const [spName, setSpName] = useState("EPR91T33GR");
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
