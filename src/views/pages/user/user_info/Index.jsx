import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import MyModal from "../../../partial/MyModal";
import UserInfoModal from "../../../partial/UserInfoModal";


const Index = () => {
  const [tableName, setTableName] = useState("User Info");
  const [gridCol, setGridCol] = useState("174");
  const [fCon, setFcon] = useState("128");
  const [tableCode, setTableCode] = useState("FUS28I01");
  const [spName, setSpName] = useState("FUS28I01GR");
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
      <UserInfoModal/>
    </div>
  );
};

export default Index;
