// const BASE = {
//   URL: "https://localhost:44358",
// };

const BASE = {
  // applicarion url
  URL: document.getElementById("root").getAttribute("domain"),

  // product search
  sKU_Cod: "Edition",
  bR_Nm: "Type",
  cT_Nm: "Class",
  mNF_Nm: "Publisher",
  gEN_Nm: "Products Title",

  // router menu
  prge: "Products Title",
  prbr: "Products Type",
  prca: "Class",
  prvn: "Publishers",
  psku: "Edition",
};

export default BASE;
