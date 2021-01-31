
import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Filter Master");
  const [gridCol, setGridCol] = useState("146");
  const [fCon, setFcon] = useState("4");
  const [tableCode, setTableCode] = useState("AFI04M04");
  const [spName, setSpName] = useState("AFI04M04GR");
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



