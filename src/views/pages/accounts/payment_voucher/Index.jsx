import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import PaymentVoucherModal from "../../../partial/PaymentVoucherModal";



const Index = () => {
  const [tableName, setTableName] = useState("Payment Voucher");
  const [gridCol, setGridCol] = useState("105");
  const [fCon, setFcon] = useState("39");
  const [tableCode, setTableCode] = useState("EEM39A12");
  const [spName, setSpName] = useState("EEM39A12GR");
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
      <PaymentVoucherModal/>
    </div>
  );
};


export default Index;

