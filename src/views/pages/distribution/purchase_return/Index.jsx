// import React from 'react'
// import ReturnPurcheseGrid from '../../../../components/pageComponent/ReturnPurcheseGrid'

// const Index = () => {
//     return (
//         <div>
//             <ReturnPurcheseGrid/>
//         </div>
//     )
// }

// export default Index


import React, { useState } from "react";
import BuyAndSaleGrid from "../../../../components/pageComponent/BuyAndSaleGrid";
import BASE from "../../../../configs/BASE";

const Index = () => {
  const title = "Purchase Return";
  const postUrl = `${BASE.URL}/api/EPR96M38`;
  const reportUrl = `${BASE.URL}/api/Report/CHLNO`;
  return (
    <>
      <BuyAndSaleGrid title={title} postUrl={postUrl} reportUrl={reportUrl} />
    </>
  );
};

export default Index;
