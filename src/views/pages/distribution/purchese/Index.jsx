// import React, { useState } from "react";
// import PurcheseGrid from "../../../../components/pageComponent/PurcheseGrid";

// const Index = () => {
//   return (
//     <>
//       <PurcheseGrid />
//     </>
//   );
// };

// export default Index;


import React, { useState } from "react";
import BuyAndSaleGrid from "../../../../components/pageComponent/BuyAndSaleGrid";
import BASE from "../../../../configs/BASE";

const Index = () => {
  const title = "Purchase";
  const postUrl = `${BASE.URL}/api/EPC92M34`;
  const reportUrl = `${BASE.URL}/api/Report/CHLNO`;
  return (
    <>
      <BuyAndSaleGrid title={title} postUrl={postUrl} reportUrl={reportUrl} />
    </>
  );
};

export default Index;
