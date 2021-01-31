// import React, { useState } from "react";
// import SalesReturnGrid from "../../../../components/pageComponent/SalesReturnGrid";

// const Index = () => {
//   return (
//     <>
//       <SalesReturnGrid />
//     </>
//   );
// };

// export default Index;

import React, { useState } from "react";
import BuyAndSaleGrid from "../../../../components/pageComponent/BuyAndSaleGrid";
import BASE from "../../../../configs/BASE";

const Index = () => {
  const title = "Sales Return";
  const postUrl = `${BASE.URL}/api/ESR15M57`;
  const reportUrl = `${BASE.URL}/api/Report/CHLNO`;
  return (
    <>
      <BuyAndSaleGrid title={title} postUrl={postUrl} reportUrl={reportUrl} />
    </>
  );
};

export default Index;
