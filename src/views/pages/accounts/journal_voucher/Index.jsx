import React, { useState } from "react";
import NestedTableMain from "../../../../components/pageComponent/NestedTableMain";
import ContraVoucherModal from "../../../partial/ContraVoucherModal";
import BASE from "../../../../configs/BASE";

const Index = () => {
  const columnMain = [
    {
      dataField: "sl",
      text: "SL",
    },
    {
      dataField: "vT_NO",
      text: "Voucher No",
    },
    {
      dataField: "iNV_No",
      text: "Invoice No",
    },
    {
      dataField: "dAT",
      text: "Date",
    },
    {
      dataField: "tOT_Amt",
      text: "Total Amount",
    },
    {
      dataField: "sTS_Nm",
      text: "Status",
    },
  ];
  const columnChild = [
    {
      dataField: "jMS_Id",
      text: "ID",
    },
    {
      dataField: "vT_No",
      text: "Voucher No",
    },
    {
      dataField: "lGR_Nm",
      text: "Ledger Name",
    },
    {
      dataField: "dBIT",
      text: "Debit",
    },
    {
      dataField: "cRD",
      text: "Credit",
    },
  ];

  const urlMain = `${BASE.URL}/api/griddata/NESTEJR78M20GR`;
  const urlChild = `${BASE.URL}/api/griddata/NESTEJR79D21GR`;

  const tableName = "Journal Voucher";
  return (
    <div>
      <NestedTableMain
        columnMain={columnMain}
        columnChild={columnChild}
        urlMain={urlMain}
        urlChild={urlChild}
        tableName={tableName}
      />
      {/* <ContraVoucherModal /> */}
    </div>
  );
};

export default Index;
