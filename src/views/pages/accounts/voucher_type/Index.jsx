import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Voucher Type");
  const [gridCol, setGridCol] = useState("196");
  const [fCon, setFcon] = useState("126");
  const [tableCode, setTableCode] = useState("EVC26T68");
  const [spName, setSpName] = useState("EVC26T68GR");
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
