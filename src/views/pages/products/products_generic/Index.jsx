import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import BASE from "../../../../configs/BASE";
import MyModal from "../../../partial/MyModal";

const Index = () => {
  const [tableName, setTableName] = useState(BASE.prge);
  const [gridCol, setGridCol] = useState("148");
  const [fCon, setFcon] = useState("6");
  const [tableCode, setTableCode] = useState("AGE06006");
  const [spName, setSpName] = useState("AGE06006GR");
  return (
    <div>
      <MyModal tableName={tableName} tableCode={tableCode} fCon={fCon} />
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
