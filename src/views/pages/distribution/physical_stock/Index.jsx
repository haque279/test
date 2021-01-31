import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import PhysicalStockGrid from "../../../../components/pageComponent/PhysicalStockGrid";
import MyModal from "../../../partial/MyModal";
import PhysicalStockModal from "../../../partial/PhysicalStockModal";

const Index = () => {
  const [tableName, setTableName] = useState("Product Rate");
  const [gridCol, setGridCol] = useState("152");
  const [fCon, setFcon] = useState("13");
  const [tableCode, setTableCode] = useState("APR13R13");
  const [spName, setSpName] = useState("APR13R13GR");
  return (
    <div>
      <PhysicalStockGrid/>
      <PhysicalStockModal />
    </div>
  );
};

export default Index;
