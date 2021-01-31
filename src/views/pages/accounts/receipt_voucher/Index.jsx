import React, { useState } from "react";
import NestedTableMain from "../../../../components/pageComponent/NestedTableMain";
import BASE from "../../../../configs/BASE";
import ReceiptVoucherModal from "../../../partial/ReceiptVoucherModal";

const Index = () => {
  const columnMain = [
    {
      dataField: "sl",
      text: "SL",
    },
    {
      dataField: "rM_Id",
      text: "ID",
    },

    {
      dataField: "vT_No",
      text: "Voucher No",
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
      dataField: "tOT_Amt",
      text: "Total Amount",
    },
    {
      dataField: "fY_Id",
      text: "Financial Year ",
    },
    {
      dataField: "vT_Nm",
      text: "Voucher Name",
    },
    {
      dataField: "sTS_Nm",
      text: "Status",
    },
  ];
  const columnChild = [
    {
      dataField: "rDS_Id",
      text: "ID",
    },
    {
      dataField: "rM_Id",
      text: "Receipt Master ID",
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
  const urlMain = `${BASE.URL}/api/griddata/ERE98M40NESTGR`;
  const urlChild = `${BASE.URL}/api/griddata/ERE99D41NESTGR`;
  const tableName = "Receipt Voucher";
  return (
    <div>
      <NestedTableMain
        columnMain={columnMain}
        columnChild={columnChild}
        urlMain={urlMain}
        urlChild={urlChild}
        tableName={tableName}
      />
      <ReceiptVoucherModal />
    </div>
  );
};

export default Index;
