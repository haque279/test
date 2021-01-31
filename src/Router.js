import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { batch, connect } from "react-redux";
import Spinner from "./components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "./utility/context/Layout";
import { animation } from "react-contexify";

// Route-based code splitting
const Home = lazy(() => import("./views/pages/Home"));

const login = lazy(() => import("./views/pages/authentication/login/Login"));

// Sales route
const POS = lazy(() => import("./views/pages/sales/pos/Index"));
const SalesCounter = lazy(() =>
  import("./views/pages/sales/sales_counter/Index")
);
const Challan = lazy(() => import("./views/pages/sales/challan/Index"));
const Order = lazy(() => import("./views/pages/sales/order/Index"));
const OrderTraking = lazy(() =>
  import("./views/pages/sales/order_traking/Index")
);
const Return = lazy(() => import("./views/pages/sales/return/Index"));
const Cancel = lazy(() => import("./views/pages/sales/cancel/Index"));

// Distribution Rout

const PhysicalStock = lazy(() =>
  import("./views/pages/distribution/physical_stock/Index")
);

const Store = lazy(() => import("./views/pages/distribution/store/Index"));
const StoreRequisition = lazy(() =>
  import("./views/pages/distribution/store_requisition/Index")
);
const StockMovement = lazy(() =>
  import("./views/pages/distribution/stock_movement/Index")
);
const ProductsReceive = lazy(() =>
  import("./views/pages/distribution/products_receive/Index")
);
const Bill = lazy(() => import("./views/pages/distribution/bill/Index"));

const Claim = lazy(() => import("./views/pages/distribution/claim/Index"));

const DeliveryAgentType = lazy(() =>
  import("./views/pages/distribution/delivery_agent_type/Index")
);
const DeliveryAgent = lazy(() =>
  import("./views/pages/distribution/delivery_agent/Index")
);
const AgentRate = lazy(() =>
  import("./views/pages/distribution/agent_rate_charge/Index")
);
const DeliveryEntry = lazy(() =>
  import("./views/pages/distribution/delivery_entry/Index")
);
// const DeliveryBill = lazy(() =>
//   import("./views/pages/distribution/delivery_bill/Index")
// );
// const ShippingChargeCosting = lazy(() =>
//   import("./views/pages/distribution/shipping_charge_costing/Index")
// );

// Account route
const AccountGroup = lazy(() =>
  import("./views/pages/accounts/account_group/Index")
);
const Legder = lazy(() => import("./views/pages/accounts/legder/Index"));
const VoucherType = lazy(() =>
  import("./views/pages/accounts/voucher_type/Index")
);
const FinancialYear = lazy(() =>
  import("./views/pages/accounts/financial_year/Index")
);
const ReceiptVoucher = lazy(() =>
  import("./views/pages/accounts/receipt_voucher/Index")
);
const PaymentVoucher = lazy(() =>
  import("./views/pages/accounts/payment_voucher/Index")
);
const JournalVoucher = lazy(() =>
  import("./views/pages/accounts/journal_voucher/Index")
);

const ContraVoucher = lazy(() =>
  import("./views/pages/accounts/contra_voucher/Index")
);

const Purchase = lazy(() =>
  import("./views/pages/distribution/purchese/Index")
);
const PurchaseReturn = lazy(() =>
  import("./views/pages/distribution/purchase_return/Index")
);
const AccountsDailyWages = lazy(() =>
  import("./views/pages/accounts/daily_wages/Index")
);
const AccountsMonthlySalary = lazy(() =>
  import("./views/pages/accounts/monthly_salary/Index")
);
const Advance = lazy(() => import("./views/pages/accounts/advance/Index"));
const BankReconciliation = lazy(() =>
  import("./views/pages/accounts/bank_reconciliation/Index")
);
const Currency = lazy(() => import("./views/pages/accounts/currency/Index"));
const CurrencyConvertion = lazy(() =>
  import("./views/pages/accounts/currency_convertion/Index")
);
const VatTypes = lazy(() => import("./views/pages/accounts/vat_types/Index"));
const Tax = lazy(() => import("./views/pages/accounts/tax/Index"));
const PurcheseBillTax = lazy(() =>
  import("./views/pages/accounts/purchese_bill_tax/Index")
);
const PurcheseReturnTax = lazy(() =>
  import("./views/pages/accounts/purchase_return_tax/Index")
);
const AccountsReport = lazy(() =>
  import("./views/pages/accounts/accounts_reports/Index")
);

// CRM route

const CustomerInfo = lazy(() =>
  import("./views/pages/crm/customer_info/Index")
);
const CustomerDataManagement = lazy(() =>
  import("./views/pages/crm/customer_data_management/Index")
);
const Demarcation = lazy(() => import("./views/pages/crm/demarcation/Index"));
const Notification = lazy(() => import("./views/pages/crm/notification/Index"));
const NotificationDetails = lazy(() =>
  import("./views/pages/crm/notification_details/Index")
);
const OfferType = lazy(() => import("./views/pages/crm/offer_type/Index"));
const Offer = lazy(() => import("./views/pages/crm/offer/Index"));
const OfferDetails = lazy(() =>
  import("./views/pages/crm/offer_details/Index")
);

// Product route
const ProductsGeneric = lazy(() =>
  import("./views/pages/products/products_generic/Index")
);
const ProductsBrand = lazy(() =>
  import("./views/pages/products/products_brand/Index")
);
const ProductsCategory = lazy(() =>
  import("./views/pages/products/products_category/Index")
);
const ProductsManufacturer = lazy(() =>
  import("./views/pages/products/products_Manufacturer/Index")
);
const FilterMaster = lazy(() =>
  import("./views/pages/products/filter_master/Index")
);
const FilterValue = lazy(() =>
  import("./views/pages/products/fillter_value/Index")
);
const ProductsSKU = lazy(() =>
  import("./views/pages/products/products_sku/Index")
);
const ProductFilter = lazy(() =>
  import("./views/pages/products/product_filter/Index")
);
const Unit = lazy(() => import("./views/pages/products/unit/Index"));
const ProductRate = lazy(() =>
  import("./views/pages/products/product_rate/Index")
);
const UnitConversion = lazy(() =>
  import("./views/pages/products/unit_conversion/Index")
);
const Bom = lazy(() => import("./views/pages/products/bom/Index"));
const PriceLevel = lazy(() =>
  import("./views/pages/products/price_level/Index")
);
const Barcode = lazy(() => import("./views/pages/products/barcode/Index"));
const Batch = lazy(() => import("./views/pages/products/batch/Index"));
const StandardRate = lazy(() =>
  import("./views/pages/products/standard_rate/Index")
);

// Employee route

const Type = lazy(() => import("./views/pages/employee/type/Index"));
const Department = lazy(() =>
  import("./views/pages/employee/department/Index")
);
const Designation = lazy(() =>
  import("./views/pages/employee/designation/Index")
);
const EmployeeInfo = lazy(() =>
  import("./views/pages/employee/employee_info/Index")
);
const Schedule = lazy(() => import("./views/pages/employee/schedule/Index"));
const EmployeeSchedule = lazy(() =>
  import("./views/pages/employee/employee_schedule/Index")
);
const LeaveMaster = lazy(() =>
  import("./views/pages/employee/leave_master/Index")
);
const EmployeeLeaveSetting = lazy(() =>
  import("./views/pages/employee/employee_leave_settings/Index")
);
const HolidaySetup = lazy(() =>
  import("./views/pages/employee/holiday_setup/Index")
);
const HolidayDeclaration = lazy(() =>
  import("./views/pages/employee/holidays_declaration/Index")
);
const Attendance = lazy(() =>
  import("./views/pages/employee/attendance/Index")
);
const LeaveApproved = lazy(() =>
  import("./views/pages/employee/leave_approved/Index")
);
const PayHead = lazy(() => import("./views/pages/employee/pay_head/Index"));
const SalaryPacakge = lazy(() =>
  import("./views/pages/employee/salary_package/Index")
);
const SalaryDetail = lazy(() =>
  import("./views/pages/employee/salary_detail/Index")
);
const DailyWages = lazy(() =>
  import("./views/pages/employee/daily_wages/Index")
);
const BonusDeduction = lazy(() =>
  import("./views/pages/employee/bonus_deduction/Index")
);
const MonthlySalary = lazy(() =>
  import("./views/pages/employee/monthly_salary/Index")
);

// User route
const UserInfo = lazy(() => import("./views/pages/user/user_info/Index"));
const Menu = lazy(() => import("./views/pages/user/menu/Index"));
const Permission = lazy(() => import("./views/pages/user/permission/Index"));
const UserPermission = lazy(() =>
  import("./views/pages/user/user_permission/Index")
);

// Accounts Report Additional Pages
const LedgerReport = lazy(() =>
  import("../src/components/pageComponent/LedgerReport")
);
const LedgerDetails = lazy(() =>
  import("../src/components/pageComponent/LedgerReport")
);
const ChallanReport = lazy(() =>
  import("../src/components/pageComponent/ChallanReport")
);
const CashBankBooks = lazy(() =>
  import("../src/components/pageComponent/CashBankBooks")
);
const GroupVoucherReport = lazy(() =>
  import("./components/pageComponent/GroupVoucherReport")
);
const GroupSummaryReport = lazy(() =>
  import("../src/components/pageComponent/GroupSummaryReport")
);
const DayBookReport = lazy(() =>
  import("../src/components/pageComponent/DayBookReport")
);
const TrailBalanceReport = lazy(() =>
  import("../src/components/pageComponent/TrailBalanceReport")
);
const BalanceSheetReport = lazy(() =>
  import("../src/components/pageComponent/BalanceSheetReport")
);
const CashFlowReport = lazy(() =>
  import("../src/components/pageComponent/CashFlowReport")
);
const ProfitAndLossReport = lazy(() =>
  import("../src/components/pageComponent/ProfitAndLossReport")
);

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.login.userRole,
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/login" component={login} fullLayout />

          {/* Sales route  */}
          <AppRoute path="/pos0" component={POS} />
          <AppRoute path="/coun" component={SalesCounter} />
          <AppRoute path="/chal" component={Challan} />
          <AppRoute path="/ordr" component={Order} />
          <AppRoute path="/ortr" component={OrderTraking} />
          <AppRoute path="/retn" component={Return} />
          <AppRoute path="/canc" component={Cancel} />

          {/* Distribution route  */}
          <AppRoute path="/phst" component={PhysicalStock} />
          <AppRoute path="/purc" component={Purchase} />
          <AppRoute path="/prnt" component={PurchaseReturn} />
          <AppRoute path="/stor" component={Store} />
          <AppRoute path="/strc" component={StoreRequisition} />
          <AppRoute path="/stmv" component={StockMovement} />
          <AppRoute path="/prec" component={ProductsReceive} />
          <AppRoute path="/degt" component={DeliveryAgentType} />
          <AppRoute path="/deag" component={DeliveryAgent} />
          <AppRoute path="/agch" component={AgentRate} />
          <AppRoute path="/deen" component={DeliveryEntry} />
          {/* <AppRoute path="/debl" component={DeliveryBill} /> */}
          {/* <AppRoute path="/shcc" component={ShippingChargeCosting} /> */}
          <AppRoute path="/bill" component={Bill} />
          <AppRoute path="/clim" component={Claim} />

          {/* Account route  */}
          <AppRoute path="/acgr" component={AccountGroup} />
          <AppRoute path="/ledg" component={Legder} />
          <AppRoute path="/vctp" component={VoucherType} />
          <AppRoute path="/fiyr" component={FinancialYear} />
          <AppRoute path="/revc" component={ReceiptVoucher} />
          <AppRoute path="/pavc" component={PaymentVoucher} />
          <AppRoute path="/jovc" component={JournalVoucher} />
          <AppRoute path="/cnvc" component={ContraVoucher} />
          <AppRoute path="/adaw" component={AccountsDailyWages} />
          <AppRoute path="/amsa" component={AccountsMonthlySalary} />
          <AppRoute path="/adva" component={Advance} />
          <AppRoute path="/bnre" component={BankReconciliation} />
          <AppRoute path="/curr" component={Currency} />
          <AppRoute path="/cucn" component={CurrencyConvertion} />
          <AppRoute path="/vttp" component={VatTypes} />
          <AppRoute path="/taxs" component={Tax} />
          <AppRoute path="/pbtx" component={PurcheseBillTax} />
          <AppRoute path="/prtx" component={PurcheseReturnTax} />
          <AppRoute path="/accrpt" component={AccountsReport} />

          <AppRoute path="/lgrrpt" component={LedgerReport} />
          <AppRoute path="/lgrdtl" component={LedgerDetails} />
          <AppRoute path="/cbbk" component={CashBankBooks} />
          <AppRoute path="/gvrpt" component={GroupVoucherReport} />
          <AppRoute path="/gsrpt" component={GroupSummaryReport} />
          <AppRoute path="/dbrpt" component={DayBookReport} />
          <AppRoute path="/tbrpt" component={TrailBalanceReport} />
          <AppRoute path="/bsrpt" component={BalanceSheetReport} />
          <AppRoute path="/cfrpt" component={CashFlowReport} />
          <AppRoute path="/plrpt" component={ProfitAndLossReport} />
          <AppRoute path="/clnrpt" component={ChallanReport} />

          {/* CRM route  */}
          <AppRoute path="/cuin" component={CustomerInfo} />
          <AppRoute path="/cudm" component={CustomerDataManagement} />
          <AppRoute path="/noti" component={Notification} />
          <AppRoute path="/nodt" component={NotificationDetails} />
          <AppRoute path="/demr" component={Demarcation} />
          <AppRoute path="/oftp" component={OfferType} />
          <AppRoute path="/offr" component={Offer} />
          <AppRoute path="/ofdt" component={OfferDetails} />

          {/* Product route  */}
          <AppRoute path="/prge" component={ProductsGeneric} />
          <AppRoute path="/prbr" component={ProductsBrand} />
          <AppRoute path="/prca" component={ProductsCategory} />
          <AppRoute path="/prvn" component={ProductsManufacturer} />
          <AppRoute path="/film" component={FilterMaster} />
          <AppRoute path="/fivl" component={FilterValue} />
          <AppRoute path="/psku" component={ProductsSKU} />
          <AppRoute path="/prfl" component={ProductFilter} />
          <AppRoute path="/unit" component={Unit} />
          <AppRoute path="/prra" component={ProductRate} />
          <AppRoute path="/uncn" component={UnitConversion} />
          <AppRoute path="/bomd" component={Bom} />
          <AppRoute path="/pril" component={PriceLevel} />
          <AppRoute path="/brco" component={Barcode} />
          <AppRoute path="/bach" component={Batch} />
          <AppRoute path="/stra" component={StandardRate} />

          {/* Employee route  */}
          <AppRoute path="/emtp" component={Type} />
          <AppRoute path="/dept" component={Department} />
          <AppRoute path="/dign" component={Designation} />
          <AppRoute path="/emin" component={EmployeeInfo} />
          <AppRoute path="/emsc" component={Schedule} />
          <AppRoute path="/epsc" component={EmployeeSchedule} />
          <AppRoute path="/lems" component={LeaveMaster} />
          <AppRoute path="/lset" component={EmployeeLeaveSetting} />
          <AppRoute path="/hode" component={HolidayDeclaration} />
          <AppRoute path="/hose" component={HolidaySetup} />
          <AppRoute path="/aten" component={Attendance} />
          <AppRoute path="/leap" component={LeaveApproved} />
          <AppRoute path="/pahe" component={PayHead} />
          <AppRoute path="/sapk" component={SalaryPacakge} />
          <AppRoute path="/sade" component={SalaryDetail} />
          <AppRoute path="/dawa" component={DailyWages} />
          <AppRoute path="/bode" component={BonusDeduction} />
          <AppRoute path="/mosa" component={MonthlySalary} />

          {/* User route  */}
          <AppRoute path="/usin" component={UserInfo} />
          <AppRoute path="/menu" component={Menu} />
          <AppRoute path="/perm" component={Permission} />
          <AppRoute path="/uspr" component={UserPermission} />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
