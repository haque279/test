import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Filter Master");
  const [gridCol, setGridCol] = useState("147");
  const [fCon, setFcon] = useState("5");
  const [tableCode, setTableCode] = useState("AFI05V05");
  const [spName, setSpName] = useState("AFI05V05GR");
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



