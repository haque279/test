import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import BASE from "../../../../configs/BASE";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState(BASE.prbr);
  const [gridCol, setGridCol] = useState("144");
  const [fCon, setFcon] = useState("2");
  const [tableCode, setTableCode] = useState("ABR02002");
  const [spName, setSpName] = useState("ABR02002GR");
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
