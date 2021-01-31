import mock from "../mock"

export const searchResult = [
  {
    id: 1,
    target: "home",
    title: "Home",
    link: "/",
    icon: "Home",
    starred: false
  },
//sales Search
  {
    id: 2,
    target: "POS",
    title: "POS",
    link: "/pos0",
    starred: false
  },
  {
    id: 3,
    target: "SalesCounter",
    title: "Sales Counter",
    link: "/coun",
    starred: false
  },

  {
    id: 4,
    target: "Challan",
    title: "Challan",
    link: "/chal",
    starred: false
  },
  {
    id: 5,
    target: "Order",
    title: "Order",
    link: "/ordr",
    starred: false
  },
      
  {
    id: 6,
    target: "OrderTracking",
    title: "Order Tracking",
    type: "item",
    link: "/ortr",
    starred: false
  },
  {
    id: 7,
    target: "Return",
    title: "Return",
    type: "item",
    link: "/retn",
    starred: false
  },
  {
    id: 8,
    target: "Cancel",
    title: "Cancel",
    type: "item",
    link: "/canc",
    starred: false
  },

  //Distribution Search
  {
    id: 9,
    target: "Store",
    title: "Store",
    link: "/stor",
    starred: false
  },
  {
    id: 10,
    target: "StoreRequisition",
    title: "Store Requisition",
    link: "/strc",
    starred: false
  },

  {
    id: 11,
    target:"StockMovement",
    title: "Stock Movement",
    link: "/stmv",
    starred: false
  },
  {
    id: 12,
    target:"ProductsReceive",
    title: "Products Receive",
    link: "/prec",
    starred: false
  },
  {
    id: 13,
    target:"DeliveryAgent",
    title: "Delivery Agent",
    link: "/deag",
    starred: false
  },
  {
    id: 14,
    target:"DeliveryAgentType",
    title: "Delivery Agent Type",
    link: "/degt",
    starred: false
  },
  {
    id: 15,
    target:"AgentCharge",
    title: "Agent Charge",
    link: "/agch",
    starred: false
  },
  {
    id: 16,
    target:"DeliveryEntry",
    title: "Delivery Entry",
    link: "/deen",
    starred: false
  },
  {
    id: 17,
    target:"DeliveryBill",
    title: "Delivery Bill",
    link: "/debl",
    starred: false
  },
  {
    id: 18,
    target:"ShippingChargeCosting",
    title: "Shipping Charge Costing",
    link: "/shcc",
    starred: false
  },

  {
    id: 19,
    target:"Bill",
    title: "Bill",
    link: "/bill",
    starred: false
  },

  {
    id: 20,
    target:"Claim",
    title: "Claim",
    link: "/clim",
    starred: false
  },

  {
    id: 21,
    target:"Adjustment",
    title: "Adjustment",
    link: "/adju",
    starred: false
  },

  //Accounts Search
  {
    id: 22,
    target:"AccountGroup",
    title: "Account Group",
    link: "/acgr",
    starred: false
  },
  {
    id: 23,
    target:"Legder",
    title: "Legder",
    link: "/ledg",
    starred: false
  },

  {
    id: 24,
    target:"VoucherType",
    title: "Voucher Type",
    link: "/vctp",
    starred: false
  },
  {
    id: 25,
    target: "FinancialYear",
    title: "Financial Year",
    link: "/fiyr",
    starred: false
  },
  {
    id: 26,
    target:"ReceiptVoucher",
    title: "Receipt Voucher",
    link: "/revc",
    starred: false
  },
  {
    id: 27,
    target:"PaymentVoucher",
    title: "Payment Voucher",
    link: "/pavc",
    starred: false
  },
  {
    id: 28,
    target:"JournalVoucher",
    title: "Journal Voucher",
    link: "/jovc",
    starred: false
  },
  {
    id: 29,
    target:"SalesVoucher",
    title: "Sales Voucher",
    nlink: "/savc",
    starred: false
  },
  {
    id: 30,
    target:"ContraVoucher",
    title: "Contra Voucher",
    link: "/cnvc",
    starred: false
  },
  {
    id: 87,
    target:"Purchase",
    title: "Purchase",
    link: "/purm",
    starred: false
  },
  {
    id: 31,
    target:"DailyWages",
    title: "Daily Wages",
    link: "/adaw",
    starred: false
  },
  {
    id: 32,
    target:"MonthlySalary",
    title: "Monthly Salary",
    link: "/amsa",
    starred: false
  },
  {
    id: 33,
    target:"Advance",
    title: "Advance Payment",
    link: "/adva",
    starred: false
  },

  {
    id: 34,
    target:"BankReconciliation",
    title: "Bank Reconciliation",
    link: "/bnre",
    starred: false
  },
  {
    id: 35,
    target:"Currency",
    title: "Currency",
    link: "/curr",
    starred: false
  },
  {
    id: 36,
    target:"CurrencyConvertion",
    title: "Currency Convertion",
    link: "/cucn",
    starred: false
  },
  {
    id: 37,
    target: "VatTypes",
    title: "Vat Types",
    link: "/vttp",
    starred: false
  },
  {
    id: 38,
    target:"Tax",
    title: "Tax",
    link: "/taxs",
    starred: false
  },


  {
    id: 39,
    target:"PurchaseBillTax",
    title: "Purchase Bill Tax",
    link: "/pbtx",
    starred: false
  },

  {
    id: 40,
    target:"PurchaseReturnTax",
    title: "Purchase Return Tax",
    link: "/prtx",
    starred: false
  },

  //CRM Search
  {
    id: 41,
    target:"CustomerInfo",
    title: "Customer Info",
    nlink: "/cuin",
    starred: false
  },

  {
    id: 42,
    target:"CustomerDataManagement",
    title: "Customer Data Management",
    link: "/cudm",
    starred: false
  },
  {
    id: 43,
    target:"Notification",
    title: "Notification",
    link: "/noti",
    starred: false
  },

  {
    id: 44,
    target:"Demarcation",
    title: "Demarcation",
    link: "/demr",
    starred: false
  },
  {
    id: 45,
    target:"NotificationDetails",
    title: "Notification Details",
    link: "/nodt",
    starred: false
  },
  {
    id: 46,
    target:"OfferType",
    title: "Offer Type",
    link: "/oftp",
    starred: false
  },

  {
    id: 47,
    target:"Offer",
    title: "Offer",
    link: "/offr",
    starred: false
  },
  {
    id: 48,
    target:"OfferDetails",
    title: "Offer Details",
    link: "/ofdt",
    starred: false
  },

  {
    id: 49,
    target:"ProductsGeneric",
    title: "Products Title",
    link: "/prge",
    starred: false
  },
  {
    id: 50,
    target:"ProductsBrand",
    title: "Products Type",
    link: "/prbr",
    starred: false
  },
  {
    id: 51,
    target:"ProductsCategory",
    title: "Class",
    link: "/prca",
    starred: false
  },
  {
    id: 52,
    target: "ProductsManufacturer",
    title: "Publishers",
    link: "/prvn",
    starred: false
  },
  {
    id: 53,
    target:"FilterMaster",
    title: "Filter Master",
    link: "/film",
    starred: false
  },
  {
    id: 54,
    target:"FilterValue ",
    title: "Filter Value ",
    link: "/fivl",
    starred: false
  },
  {
    id: 55,
    target:"ProductsSKU",
    title: "Edition",
    link: "/psku",
    starred: false
  },

  {
    id: 56,
    target:"ProductFilter",
    title: "Product Filter",
    nlink: "/prfl",
    starred: false
  },
  {
    id: 57,
    target:"Unit",
    title: "Unit",
    link: "/unit",
    starred: false
  },

  {
    id: 58,
    target:"UnitConversion",
    title: "Unit Conversion",
    link: "/uncn",
    starred: false
  },
  {
    id: 59,
    target:"ProductRate",
    title: "Product Rate",
    link: "/prra",
    starred: false
  },

  {
    id: 60,
    target:"BOM",
    title: "BOM",
    link: "/bomd",
    starred: false
  },

  {
    id: 61,
    target:"PriceLevel",
    title: "Price Level",
    link: "/pril",
    starred: false
  },
  {
    id: 62,
    target:"Barcode",
    title: "Barcode",
    link: "/brco",
    starred: false
  },
  {
    id: 63,
    target:"Batch",
    title: "Batch",
    link: "/bach",
    starred: false
  },
  {
    id: 64,
    target:"StandardRate",
    title: "Standard Rate",
    link: "/stra",
    starred: false
  },
  //Employee Search
  {
    id: 65,
    target:"Type",
    title: "Type",
    type: "item",
    link: "/emtp",
    starred: false
  },
  {
    id: 66,
    target:"Department",
    title: "Department",
    link: "/dept",
    starred: false
  },
  {
    id: 67,
    target:"Designation",
    title: "Designation",
    type: "item",
    link: "/dign",
    starred: false
  },
  {
    id: 68,
    target:"EmployeeInfo",
    title: "Employee Info",
    link: "/emin",
    starred: false
  },
  {
    id: 69,
    target:"Schedule",
    title: "Schedule",
    link: "/emsc",
    starred: false
  },

  {
    id: 70,
    target:"EmployeeSchedule",
    title: "Employee Schedule",
    link: "/epsc",
    starred: false
  },
  {
    id: 71,
    target:"LeaveMaster",
    title: "Leave Master",
    link: "/lems",
    starred: false
  },
  {
    id: 72,
    target:"EmployeeLeaveSetings",
    title: "Employee Leave Setings",
    link: "/lset",
    starred: false
  },
  {
    id: 73,
    target:"HolidayDeclaration",
    title: "Holiday Declaration",
    link: "/hode",
    starred: false
  },

  {
    id: 74,
    target:"HolidaySetup",
    title: "Holiday Setup",
    link: "/hose",
    starred: false
  },
  {
    id: 75,
    target:"Attendance",
    title: "Attendance",
    link: "/aten",
    starred: false
  },
  {
    id: 76,
    target:"LeaveApproved",
    title: "Leave Approved",
    link: "/leap",
    starred: false
  },
  {
    id: 77,
    target:"PayHead",
    title: "Pay Head",
    link: "/pahe",
    starred: false
  },
  {
    id: 78,
    target:"SalaryPackage",
    title: "Salary Package",
    type: "item",
    link: "/sapk",
    starred: false
  },
  {
    id: 79,
    target:"SalaryDetail",
    title: "Salary Detail",
    type: "item",
    link: "/sade",
    starred: false
  },
  {
    id: 80,
    target:"DailyWages",
    title: "Daily Wages",
    type: "item",
    link: "/dawa",
    starred: false
  },
  {
    id: 81,
    target:"BonusDeduction",
    title: "Bonus Deduction",
    type: "item",
    link: "/bode",
    starred: false
  },
  {
    id: 82,
    target:"MonthlySalary",
    title: "Monthly Salary",
    link: "/mosa",
    starred: false
  },

  //user Search
  {
    id: 83,
    target:"UserInfo",
    title: "User Info",
    navLink: "/usin",
    starred: false
  },
  {
    id: 84,
    target:"Menu",
    title: "Menu",
    link: "/menu",
    starred: false
  },
  {
    id: 85,
    target:"Permission",
    title: "Permission",
    link: "/perm",
    starred: false
  },
  {
    id: 86,
    target:"UserPermission",
    title: "User Permission",
    link: "/uspr",
    starred: false
  }

]

mock.onGet("/api/search/bookmarks/data").reply(200, {
  searchResult
})

mock.onPost("/api/update/bookmarks").reply(request => {
  const bookmarkToUpdate = JSON.parse(request.data).obj

  searchResult.filter(i => {
    if (i.id === bookmarkToUpdate.id) {
      return (i.starred = !bookmarkToUpdate.starred)
    } else {
      return null
    }
  })
  return [200]
})
