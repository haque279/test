import React, { useState } from "react";
import GridTable from "../../../../components/formcomponents/GridTable";
import ProductFilterModal from "../../../partial/ProductFilterModal";
import MyModal from "../../../partial/MyModal";


const Index = () => {
  const [tableName, setTableName] = useState("Product Filter");
  const [gridCol, setGridCol] = useState("150");
  const [fCon, setFcon] = useState("8");
  const [tableCode, setTableCode] = useState("APR08F08");
  const [spName, setSpName] = useState("APR08F08GR");
  return (
    <div>
      {/* <MyModal
        tableName={tableName}
        tableCode={tableCode}
        fCon={fCon}
      /> */}
      <GridTable
        tableName={tableName}
        gridCol={gridCol}
        spName={spName}
        tableCode={tableCode}
        fCon={fCon}
      />
       <ProductFilterModal/>
    </div>
  );
};

export default Index;


