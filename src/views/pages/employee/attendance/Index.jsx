import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import NextTable from "../../../../components/NextTable";
import Attendance from "../../../../components/pageComponent/Attendance";
import JournalModal from "../../../partial/JournalModal";

const Index = () => {
  const [tableName, setTableName] = useState("Journal Voucher");
  const [gridCol, setGridCol] = useState("");
  const [fCon, setFcon] = useState("49");
  const [tableCode, setTableCode] = useState("DEM49A12");
  const [spName, setSpName] = useState("DEM49A12GR");
  return (
    <>
      {/* <JournalModal />   */}
      {/* <NextTable /> */}
      {/* <DropBoxSearch /> */}
      <Attendance />
      {/* <GridTable
        tableName={tableName}
        gridCol={gridCol}
        spName={spName}
        tableCode={tableCode}
        fCon={fCon}
      /> */}
    </>
  );
};

export default Index;

