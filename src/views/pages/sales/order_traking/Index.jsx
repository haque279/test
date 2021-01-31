import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Order Tracking");
  const [gridCol, setGridCol] = useState("138");
  const [fCon, setFcon] = useState("135");
  const [tableCode, setTableCode] = useState("BOR35T17");
  const [spName, setSpName] = useState("BOR35T17GR");
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
