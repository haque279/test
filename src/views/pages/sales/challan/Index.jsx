import React, { useState } from "react";
import BuyAndSaleGrid from "../../../../components/pageComponent/BuyAndSaleGrid";
import BASE from '../../../../configs/BASE'

const Index = () => {
  const title = 'Challan'
  const postUrl = `${BASE.URL}/api/ESA06M48`
  const reportUrl = `${BASE.URL}/api/Report/CHLNO`
  return (
    <>
      <BuyAndSaleGrid title={title} postUrl={postUrl} reportUrl={reportUrl}  />
    </>
  );
};

export default Index;
