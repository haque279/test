import React from "react";
import Router from "./Router";
import "./components/@vuexy/rippleButton/RippleButton";

import "react-perfect-scrollbar/dist/css/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import CrudContextProvider from "./contexts/CrudContext";
import AuthContextProvider from "./contexts/AuthContext";
import GridContextProvider from "./contexts/GridContext";
import DropboxMultiContextProvider from "./contexts/DropboxMultiContext";
import AmountContextProvider from "./contexts/AmountContext";
import JournalContextProvider from "./contexts/JournalContext";
import EMSalaryContextProvider from "./contexts/EMSalaryContext";
import ChallanContextProvider from "./contexts/ChallanContext";
import PosContestProvider from "./contexts/PosContext";
import ReturnChallanContextProvider from "./contexts/ReturnChallanContext";
import CartContextProvider from "./contexts/CartContext";

const App = (props) => {
  return (
    <AuthContextProvider>
      <GridContextProvider>
        <CrudContextProvider>
          <DropboxMultiContextProvider>
            <AmountContextProvider>
              <JournalContextProvider>
                <EMSalaryContextProvider>
                  <CartContextProvider>
                    <ChallanContextProvider>
                      <PosContestProvider>
                        <ReturnChallanContextProvider>
                          <Router />
                        </ReturnChallanContextProvider>
                      </PosContestProvider>
                    </ChallanContextProvider>
                  </CartContextProvider>
                </EMSalaryContextProvider>
              </JournalContextProvider>
            </AmountContextProvider>
          </DropboxMultiContextProvider>
        </CrudContextProvider>
      </GridContextProvider>
    </AuthContextProvider>
  );
};

export default App;
