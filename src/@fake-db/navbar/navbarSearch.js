import mock from "../mock"

export const searchResult = [
  {
    groupTitle: "Pages",
    searchLimit: 5,
    data: [
      {
        id: 1,
        target: "home",
        title: "Home",
        link: "/",
        icon: "Home"
      },

    //sales Search
    {
      id: 2,
      target: "POS",
      title: "POS",
      link: "/pos0",
    },
    {
      id: 3,
      target: "SalesCounter",
      title: "Sales Counter",
      link: "/coun",
    },
    
    {
      id: 4,
      target: "Challan",
      title: "Challan",
      link: "/chal",
    },
    {
      id: 5,
      target: "Order",
      title: "Order",
      link: "/ordr",
    },
        
    {
      id: 6,
      target: "OrderTracking",
      title: "Order Tracking",
      link: "/ortr",
    },
    {
      id: 7,
      target: "Return",
      title: "Return",
      link: "/retn",
    },
    {
      id: 8,
      target: "Cancel",
      title: "Cancel",
      link: "/canc",
    },
     //Distribution Search
      {
        id: 9,
        target: "Store",
        title: "Store",
        link: "/stor",
      },
      {
        id: 10,
        target: "StoreRequisition",
        title: "Store Requisition",
        link: "/strc",
      },

      {
        id: 11,
        target:"StockMovement",
        title: "Stock Movement",
        link: "/stmv",
      },
      {
        id: 12,
        target:"ProductsReceive",
        title: "Products Receive",
        link: "/prec",
      },
      {
        id: 13,
        target:"DeliveryAgent",
        title: "Delivery Agent",
        link: "/deag",
      },
      {
        id: 14,
        target:"DeliveryAgentType",
        title: "Delivery Agent Type",
        link: "/degt",
      },
      {
        id: 15,
        target:"AgentCharge",
        title: "Agent Charge",
        link: "/agch",
      },
      {
        id: 16,
        target:"DeliveryEntry",
        title: "Delivery Entry",
        link: "/deen",
      },
      {
        id: 17,
        target:"DeliveryBill",
        title: "Delivery Bill",
        link: "/debl",
      },
      {
        id: 18,
        target:"ShippingChargeCosting",
        title: "Shipping Charge Costing",
        link: "/shcc",
      },
      
      {
        id: 19,
        target:"Bill",
        title: "Bill",
        link: "/bill",
      },
      
      {
        id: 20,
        target:"Claim",
        title: "Claim",
        link: "/clim",
      },
    
      {
        id: 21,
        target:"Adjustment",
        title: "Adjustment",
        link: "/adju",
      },

    //Accounts Search
      {
        id: 22,
        target:"AccountGroup",
        title: "Account Group",
        link: "/acgr",
      },
      {
        id: 23,
        target:"Legder",
        title: "Legder",
        link: "/ledg",
      },

      {
        id: 24,
        target:"VoucherType",
        title: "Voucher Type",
        link: "/vctp",
      },
      {
        id: 25,
        target: "FinancialYear",
        title: "Financial Year",
        link: "/fiyr",
      },
      {
        id: 26,
        target:"ReceiptVoucher",
        title: "Receipt Voucher",
        link: "/revc",
      },
      {
        id: 27,
        target:"PaymentVoucher",
        title: "Payment Voucher",
        link: "/pavc",
      },
      {
        id: 28,
        target:"JournalVoucher",
        title: "Journal Voucher",
        link: "/jovc",
      },
      {
        id: 29,
        target:"SalesVoucher",
        title: "Sales Voucher",
        nlink: "/savc",
      },
      {
        id: 30,
        target:"ContraVoucher",
        title: "Contra Voucher",
        link: "/cnvc",
      },
      {
        id: 87,
        target:"Purchase",
        title: "Purchase",
        link: "/purm",
      },
      {
        id: 31,
        target:"DailyWages",
        title: "Daily Wages",
        link: "/adaw",
      },
      {
        id: 32,
        target:"MonthlySalary",
        title: "Monthly Salary",
        link: "/amsa",
      },
      {
        id: 33,
        target:"Advance",
        title: "Advance Payment",
        link: "/adva",
      },
      
      {
        id: 34,
        target:"BankReconciliation",
        title: "Bank Reconciliation",
        link: "/bnre",
      },
      {
        id: 35,
        target:"Currency",
        title: "Currency",
        link: "/curr",
      },
      {
        id: 36,
        target:"CurrencyConvertion",
        title: "Currency Convertion",
        link: "/cucn",
      },
      {
        id: 37,
        target: "VatTypes",
        title: "Vat Types",
        link: "/vttp",
      },
      {
        id: 38,
        target:"Tax",
        title: "Tax",
        link: "/taxs",
      },


      {
        id: 39,
        target:"PurchaseBillTax",
        title: "Purchase Bill Tax",
        link: "/pbtx",
      },

      {
        id: 40,
        target:"PurchaseReturnTax",
        title: "Purchase Return Tax",
        link: "/prtx",
      },

   //CRM Search
      {
        id: 41,
        target:"CustomerInfo",
        title: "Customer Info",
        nlink: "/cuin",
      },
      
      {
        id: 42,
        target:"CustomerDataManagement",
        title: "Customer Data Management",
        link: "/cudm",
      },
      {
        id: 43,
        target:"Notification",
        title: "Notification",
        link: "/noti",
      },

      {
        id: 44,
        target:"Demarcation",
        title: "Demarcation",
        link: "/demr",
      },
      {
        id: 45,
        target:"NotificationDetails",
        title: "Notification Details",
        link: "/nodt",
      },
      {
        id: 46,
        target:"OfferType",
        title: "Offer Type",
        link: "/oftp",
      },

      {
        id: 47,
        target:"Offer",
        title: "Offer",
        link: "/offr",
      },
      {
        id: 48,
        target:"OfferDetails",
        title: "Offer Details",
        link: "/ofdt",
      },

      {
        id: 49,
        target:"ProductsGeneric",
        title: "Products Title",
        link: "/prge",
      },
      {
        id: 50,
        target:"ProductsBrand",
        title: "Products Type",
        link: "/prbr",
      },
      {
        id: 51,
        target:"ProductsCategory",
        title: "Class",
        link: "/prca",
      },
      {
        id: 52,
        target: "ProductsManufacturer",
        title: "Publishers",
        link: "/prvn",
      },
      {
        id: 53,
        target:"FilterMaster",
        title: "Filter Master",
        link: "/film",
      },
      {
        id: 54,
        target:"FilterValue ",
        title: "Filter Value ",
        link: "/fivl",
      },
      {
        id: 55,
        target:"ProductsSKU",
        title: "Edition",
        link: "/psku",
      },

      {
        id: 56,
        target:"ProductFilter",
        title: "Product Filter",
        nlink: "/prfl",
      },
      {
        id: 57,
        target:"Unit",
        title: "Unit",
        link: "/unit",
      },

      {
        id: 58,
        target:"UnitConversion",
        title: "Unit Conversion",
        link: "/uncn",
      },
      {
        id: 59,
        target:"ProductRate",
        title: "Product Rate",
        link: "/prra",
      },
      
      {
        id: 60,
        target:"BOM",
        title: "BOM",
        link: "/bomd",
      },

      {
        id: 61,
        target:"PriceLevel",
        title: "Price Level",
        link: "/pril",
      },
      {
        id: 62,
        target:"Barcode",
        title: "Barcode",
        link: "/brco",
      },
      {
        id: 63,
        target:"Batch",
        title: "Batch",
        link: "/bach",
      },
      {
        id: 64,
        target:"StandardRate",
        title: "Standard Rate",
        link: "/stra",
      },
       //Employee Search
      {
        id: 65,
        target:"Type",
        title: "Type",
        type: "item",
        link: "/emtp",
      },
      {
        id: 66,
        target:"Department",
        title: "Department",
        link: "/dept",
      },
      {
        id: 67,
        target:"Designation",
        title: "Designation",
        type: "item",
        link: "/dign",
      },
      {
        id: 68,
        target:"EmployeeInfo",
        title: "Employee Info",
        link: "/emin",
      },
      {
        id: 69,
        target:"Schedule",
        title: "Schedule",
        link: "/emsc",
      },

      {
        id: 70,
        target:"EmployeeSchedule",
        title: "Employee Schedule",
        link: "/epsc",
      },
      {
        id: 71,
        target:"LeaveMaster",
        title: "Leave Master",
        link: "/lems",
      },
      {
        id: 72,
        target:"EmployeeLeaveSetings",
        title: "Employee Leave Setings",
        link: "/lset",
      },
      {
        id: 73,
        target:"HolidayDeclaration",
        title: "Holiday Declaration",
        link: "/hode",
      },
     
      {
        id: 74,
        target:"HolidaySetup",
        title: "Holiday Setup",
        link: "/hose",
      },
      {
        id: 75,
        target:"Attendance",
        title: "Attendance",
        link: "/aten",
      },
      {
        id: 76,
        target:"LeaveApproved",
        title: "Leave Approved",
        link: "/leap",
      },
      {
        id: 77,
        target:"PayHead",
        title: "Pay Head",
        link: "/pahe",
      },
      {
        id: 78,
        target:"SalaryPackage",
        title: "Salary Package",
        type: "item",
        link: "/sapk",
      },
      {
        id: 79,
        target:"SalaryDetail",
        title: "Salary Detail",
        type: "item",
        link: "/sade",
      },
      {
        id: 80,
        target:"DailyWages",
        title: "Daily Wages",
        type: "item",
        link: "/dawa",
      },
      {
        id: 81,
        target:"BonusDeduction",
        title: "Bonus Deduction",
        type: "item",
        link: "/bode",
      },
      {
        id: 82,
        target:"MonthlySalary",
        title: "Monthly Salary",
        link: "/mosa",
      },

      //user Search
      {
        id: 83,
        target:"UserInfo",
        title: "User Info",
        navLink: "/usin",
      },
      {
        id: 84,
        target:"Menu",
        title: "Menu",
        link: "/menu",
      },
      {
        id: 85,
        target:"Permission",
        title: "Permission",
        link: "/perm",
      },
      {
        id: 86,
        target:"UserPermission",
        title: "User Permission",
        link: "/uspr",
      }

    ]
  }
]

mock.onGet("/api/main-search/data").reply(200, {
  searchResult
})
