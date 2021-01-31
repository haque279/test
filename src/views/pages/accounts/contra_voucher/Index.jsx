import React, { useState } from "react";
import NestedTableMain from "../../../../components/pageComponent/NestedTableMain";
import ContraVoucherModal from "../../../partial/ContraVoucherModal";
import BASE from "../../../../configs/BASE";

const Index = () => {
  const columnMain = [
    {
      dataField: "cNM_Id",
      text: "ID",
    },
    {
      dataField: "sl",
      text: "SL",
    },
    {
      dataField: "vT_No",
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
      dataField: "lGR_Id",
      text: "Ledger ID",
    },
    {
      dataField: "lGR_Nm",
      text: "Ledger  Name",
    },
    {
      dataField: "tYP",
      text: "Type",
    },
    {
      dataField: "tOT_Amt",
      text: "Total Amount",
    },
    {
      dataField: "fY_Id",
      text: "Financial Year ID",
    },
    {
      dataField: "sTS_Nm",
      text: "Status",
    },
  ];
  const columnChild = [
    {
      dataField: "cNDS_Id",
      text: "ID",
    },
    {
      dataField: "cNM_Id",
      text: "Contra Master ID",
    },
    {
      dataField: "lGR_Id",
      text: "Ledger ID",
    },
    {
      dataField: "lGR_Nm",
      text: "Ledger Name",
    },
    {
      dataField: "aMT",
      text: "Amount",
    },
    {
      dataField: "cEQ_No",
      text: "Cheque No",
    },
    {
      dataField: "cEQ_Dat",
      text: "Cheque Date",
    },
  ];
  const urlMain = `${BASE.URL}/api/griddata/ECN65M07GR`;
  const urlChild = `${BASE.URL}/api/griddata/ECN66D08GR`;
  const tableName = "Contra Voucher";
  return (
    <div>
      <NestedTableMain
        columnMain={columnMain}
        columnChild={columnChild}
        urlMain={urlMain}
        urlChild={urlChild}
        tableName={tableName}
      />
      <ContraVoucherModal />
    </div>
  );
};

export default Index;
