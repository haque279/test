import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import ChallanBillModal from "../../../partial/ChallanBillModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Bill");
  const [gridCol, setGridCol] = useState("");
  const [fCon, setFcon] = useState("");
  const [tableCode, setTableCode] = useState("");
  const [spName, setSpName] = useState("");
  return (
    <div>
      {/* <MyModal
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
      /> */}
    <ChallanBillModal/>
    </div>
  );
};

export default Index;
