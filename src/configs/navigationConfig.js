import React from "react";
import * as Icon from "react-feather";
import BASE from '../configs/BASE'
import room_allocation from "../assets/img/rover_icon/room_allocation.svg";
import Product from "../assets/img/rover_icon/Product.svg";
import crm from "../assets/img/rover_icon/crm.svg";
import accounts from "../assets/img/rover_icon/accounts.svg";
import stocks from "../assets/img/rover_icon/stocks.svg";
import employee from "../assets/img/rover_icon/employee.svg";
import user from "../assets/img/rover_icon/user.svg";
import circle from "../assets/img/rover_icon/circle.svg";
import distribution from "../assets/img/rover_icon/distribution.svg";
import Sales from "../assets/img/rover_icon/marketing.svg";
const divStyle = {
  marginRight: "10px",
  width: "25px",
  height: "25px",
};
const circleStyle = {
  marginRight: "10px",
  width: "15px",
  height: "15px",
};
const getAuth = () => {
  localStorage.setItem("userName", "guest");
  if (localStorage.getItem("user")) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user.auth) {
      localStorage.setItem("userName", "admin");
    }
  }
};

getAuth();
const navigationConfig = [
  {
    id: "Dashboard",
    title: "Dashboard",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    permissions: [localStorage.getItem("userName")],
    navLink: "/",
  },

  {
    id: "sel",
    title: "Sales",
    type: "collapse",
    icon: <img src={Sales} style={divStyle} />,
    children: [
      {
        id: "pos0",
        title: "POS",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/pos0",
      },
      {
        id: "coun",
        title: "Sales Counter",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/coun",
      },

      {
        id: "chal",
        title: "Challan",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/chal",
      },
      // {
      //   id: "ordr",
      //   title: "Order",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/ordr",
      // },

      // {
      //   id: "ortr",
      //   title: "Order Tracking",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/ortr",
      // },
      {
        id: "retn",
        title: "Return",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/retn",
      },
      // {
      //   id: "canc",
      //   title: "Cancel",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/canc",
      // },
    ],
  },
  {
    id: "dis",
    title: "Distribution",
    type: "collapse",
    icon: <img src={distribution} style={divStyle} />,
    children: [
      {
        id: "purc",
        title: "Purchase",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/purc",
      },
      {
        id: "prnt",
        title: "Purchase Return",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/prnt",
      },
      {
        id: "stor",
        title: "Store",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/stor",
      },
      // {
      //   id: "strc",
      //   title: "Store Requisition",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/strc",
      // },

      // {
      //   id: "stmv",
      //   title: "Stock Movement",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/stmv",
      // },
      {
        id: "phst",
        title: "Physical Stock",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/phst",
      },
      // {
      //   id: "prec",
      //   title: "Products Receive",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/prec",
      // },
      {
        id: "deag",
        title: "Delivery Agent",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/deag",
      },
      {
        id: "degt",
        title: "Delivery Agent Type",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/degt",
      },
      {
        id: "agch",
        title: "Agent Charge",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/agch",
      },
      {
        id: "deen",
        title: "Delivery Entry",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/deen",
      },
      // {
      //   id: "debl",
      //   title: "Delivery Bill",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/debl",
      // },
      // {
      //   id: "shcc",
      //   title: "Shipping Charge Costing",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   permissions: [localStorage.getItem("userName")],

      //   navLink: "/shcc",
      // },

      {
        id: "bill",
        title: "Bill",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/bill",
      },

      {
        id: "clim",
        title: "Claim",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/clim",
      },


    ],
  },


  {
    id: "crm",
    title: "CRM",
    type: "collapse",
    icon: <img src={crm} style={divStyle} />,
    children: [
      {
        id: "cuin",
        title: "Customer Info",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/cuin",
      },

      // {
      //   id: "cudm",
      //   title: "Customer Data Management",
      //   type: "item",
      //   icon: <img src={circle} style={circleStyle} />,
      //   navLink: "/cudm",
      // },
      {
        id: "noti",
        title: "Notification",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/noti",
      },

      {
        id: "demr",
        title: "Demarcation",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/demr",
      },
      {
        id: "nodt",
        title: "Notification Details",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/nodt",
      },
      {
        id: "oftp",
        title: "Offer Type",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/oftp",
      },

      {
        id: "offr",
        title: "Offer",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/offr",
      },
      {
        id: "ofdt",
        title: "Offer Details",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/ofdt",
      },
    ],
  },

  {
    id: "pro",
    title: "Products",
    type: "collapse",
    icon: <img src={Product} style={divStyle} />,
    children: [
      {
        id: "prge",
        title: BASE.prge,
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prge",
      },
      {
        id: "prbr",
        title: BASE.prbr,
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prbr",
      },
      {
        id: "prca",
        title: BASE.prca,
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prca",
      },
      {
        id: "prvn",
        title: BASE.prvn,
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/prvn",
      },
      {
        id: "film",
        title: "Filter Master",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/film",
      },
      {
        id: "fivl",
        title: "Filter Value ",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/fivl",
      },
      {
        id: "psku",
        title: BASE.psku,
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/psku",
      },

      {
        id: "prfl",
        title: "Product Filter",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prfl",
      },
      {
        id: "unit",
        title: "Unit",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/unit",
      },

      {
        id: "uncn",
        title: "Unit Conversion",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/uncn",
      },
      {
        id: "prra",
        title: "Product Rate",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prra",
      },

      {
        id: "bomd",
        title: "BOM",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/bomd",
      },

      {
        id: "pril",
        title: "Price Level",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/pril",
      },
      {
        id: "brco",
        title: "Barcode",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/brco",
      },
      {
        id: "bach",
        title: "Batch",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/bach",
      },
      {
        id: "stra",
        title: "Standard Rate",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/stra",
      },
    ],
  },
  {
    id: "acc",
    title: "Accounts",
    type: "collapse",
    icon: <img src={accounts} style={divStyle} />,
    children: [
      {
        id: "acgr",
        title: "Account Group",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/acgr",
      },
      {
        id: "ledg",
        title: "Legder",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/ledg",
      },

      {
        id: "vctp",
        title: "Voucher Type",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/vctp",
      },
      {
        id: "fiyr",
        title: "Financial Year",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/fiyr",
      },
      {
        id: "revc",
        title: "Receipt Voucher",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/revc",
      },
      {
        id: "pavc",
        title: "Payment Voucher",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/pavc",
      },
      {
        id: "jovc",
        title: "Journal Voucher",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/jovc",
      },

      {
        id: "cnvc",
        title: "Contra Voucher",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/cnvc",
      },
      {
        id: "adaw",
        title: "Daily Wages",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/adaw",
      },
      {
        id: "amsa",
        title: "Monthly Salary",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/amsa",
      },
      {
        id: "adva",
        title: "Advance Payment",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/adva",
      },

      {
        id: "bnre",
        title: "Bank Reconciliation",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/bnre",
      },
      {
        id: "curr",
        title: "Currency",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/curr",
      },
      {
        id: "cucn",
        title: "Currency Convertion",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/cucn",
      },
      {
        id: "vttp",
        title: "Vat Types",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/vttp",
      },
      {
        id: "taxs",
        title: "Tax",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/taxs",
      },

      {
        id: "pbtx",
        title: "Purchase Bill Tax",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/pbtx",
      },

      {
        id: "prtx",
        title: "Purchase Return Tax",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/prtx",
      },
      {
        id: "accrpt",
        title: "Reports",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/accrpt",
      },
    ],
  },
  {
    id: "emp",
    title: "Employee",
    type: "collapse",
    icon: <img src={employee} style={divStyle} />,
    children: [
      {
        id: "emtp",
        title: "Type",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/emtp",
      },
      {
        id: "dept",
        title: "Department",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/dept",
      },
      {
        id: "dign",
        title: "Designation",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/dign",
      },
      {
        id: "emin",
        title: "Employee Info",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/emin",
      },
      {
        id: "emsc",
        title: "Schedule",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/emsc",
      },

      {
        id: "epsc",
        title: "Employee Schedule",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/epsc",
      },
      {
        id: "lems",
        title: "Leave Master",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/lems",
      },
      {
        id: "lset",
        title: "Employee Leave Setings",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/lset",
      },
      {
        id: "hode",
        title: "Holiday Declaration",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/hode",
      },

      {
        id: "hose",
        title: "Holiday Setup",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        navLink: "/hose",
      },
      {
        id: "aten",
        title: "Attendance",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/aten",
      },
      {
        id: "leap",
        title: "Leave Approved",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/leap",
      },
      {
        id: "pahe",
        title: "Pay Head",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/pahe",
      },
      {
        id: "sapk",
        title: "Salary Package",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/sapk",
      },
      {
        id: "sade",
        title: "Salary Detail",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/sade",
      },
      {
        id: "dawa",
        title: "Daily Wages",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/dawa",
      },
      {
        id: "bode",
        title: "Bonus Deduction",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/bode",
      },
      {
        id: "mosa",
        title: "Monthly Salary",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/mosa",
      },
    ],
  },
  {
    id: "usr",
    title: "Settings",
    type: "collapse",
    icon: <img src={user} style={divStyle} />,
    children: [
      {
        id: "usin",
        title: "User Info",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/usin",
      },
      {
        id: "menu",
        title: "Menu",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/menu",
      },
      {
        id: "perm",
        title: "Permission",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/perm",
      },
      {
        id: "uspr",
        title: "User Permission",
        type: "item",
        icon: <img src={circle} style={circleStyle} />,
        permissions: [localStorage.getItem("userName")],

        navLink: "/uspr",
      },
    ],
  },
];

console.log("nav", navigationConfig);

export default navigationConfig;
