import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Delivery Agent");
  const [gridCol, setGridCol] = useState("189");
  const [fCon, setFcon] = useState("29");
  const [tableCode, setTableCode] = useState("BDL29A12");
  const [spName, setSpName] = useState("BDL29A12GR");
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

