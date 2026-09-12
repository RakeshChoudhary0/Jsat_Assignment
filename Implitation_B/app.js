const express = require("express");

const path = require("path");

const app = express();

// Configure HBS as the view engine
app.set("view engine", "hbs");
app.set("views", "./views");

// Mock Data
const customers = [
  {
    id: "101",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "+1 (555) 234-5678",
    city: "New York",
    joinDate: "2023-01-15",
    accountNo: "ACC1001",
  },
  {
    id: "102",
    name: "Bob Jones",
    email: "bob.jones@example.com",
    phone: "+1 (555) 876-5432",
    city: "Chicago",
    joinDate: "2023-05-20",
    accountNo: "ACC1002",
  },
  {
    id: "103",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "+1 (555) 456-7890",
    city: "San Francisco",
    joinDate: "2024-02-10",
    accountNo: "ACC1003",
  },
  {
    id: "104",
    name: "Diana Prince",
    email: "diana.p@example.com",
    phone: "+1 (555) 987-6543",
    city: "Seattle",
    joinDate: "2024-08-11",
    accountNo: "ACC1004",
  },
];

const accounts = {
  ACC1001: {
    accountNo: "ACC1001",
    type: "Savings",
    balance: 8540.5,
    currency: "USD",
    status: "Active",
    branch: "Downtown NY Branch",
    customerId: "101",
  },
  ACC1002: {
    accountNo: "ACC1002",
    type: "Checking",
    balance: 1250.0,
    currency: "USD",
    status: "Active",
    branch: "Central Chicago Branch",
    customerId: "102",
  },
  ACC1003: {
    accountNo: "ACC1003",
    type: "Savings",
    balance: 12450.75,
    currency: "USD",
    status: "Active",
    branch: "Bay Area Branch",
    customerId: "103",
  },
  ACC1004: {
    accountNo: "ACC1004",
    type: "Checking",
    balance: 320.1,
    currency: "USD",
    status: "Dormant",
    branch: "Seattle North Branch",
    customerId: "104",
  },
};

const transactions = {
  ACC1001: [
    {
      id: "TXN1001",
      timestamp: "2026-09-01 09:15 AM",
      type: "Credit",
      category: "Salary",
      from: "Tech Corp Payroll",
      to: "ACC1001 (Alice)",
      amount: 4500.0,
      status: "Completed",
      description: "Monthly Salary Credit",
    },
    {
      id: "TXN1002",
      timestamp: "2026-09-02 02:30 PM",
      type: "Transfer",
      category: "Peer Transfer",
      from: "ACC1001 (Alice)",
      to: "ACC1002 (Bob)",
      amount: 250.0,
      status: "Completed",
      description: "Dinner Reimbursement",
    },
  ],
  ACC1002: [
    {
      id: "TXN2001",
      timestamp: "2026-09-02 02:30 PM",
      type: "Transfer",
      category: "Peer Transfer",
      from: "ACC1001 (Alice)",
      to: "ACC1002 (Bob)",
      amount: 250.0,
      status: "Completed",
      description: "Dinner Reimbursement",
    },
    {
      id: "TXN2002",
      timestamp: "2026-09-03 11:45 AM",
      type: "Debit",
      category: "Utility",
      from: "ACC1002 (Bob)",
      to: "City Electric Co.",
      amount: 85.0,
      status: "Completed",
      description: "Electricity Bill Payment",
    },
  ],
  ACC1003: [
    {
      id: "TXN3001",
      timestamp: "2026-08-28 10:00 AM",
      type: "Credit",
      category: "Investment",
      from: "Global Mutual Funds",
      to: "ACC1003 (Charlie)",
      amount: 1200.0,
      status: "Completed",
      description: "Dividend Payout",
    },
  ],
  ACC1004: [],
};

// Route 1: Home
app.get("/", (req, res) => {
  res.render("home");
});

// Route 2: Customers List
app.get("/customers", (req, res) => {
  res.render("customers", { customers: customers });
});

// Route 3: Customer Details
app.get("/customer/:id", (req, res) => {
  const customer = customers.find((c) => c.id === req.params.id);
  if (!customer) return res.status(404).send("<h1>Customer Not Found</h1>");

  res.render("customer-details", { customer: customer });
});

// Route 4: Account Details
app.get("/account/:accountNo", (req, res) => {
  const account = accounts[req.params.accountNo];
  if (!account) return res.status(404).send("<h1>Account Not Found</h1>");

  const customer = customers.find((c) => c.id === account.customerId);
  res.render("account", { account: account, customer: customer });
});

// Route 5: Transactions List
app.get("/transactions/:accountNo", (req, res) => {
  const accNo = req.params.accountNo;
  const txns = transactions[accNo];

  if (!txns) return res.status(404).send("<h1>Transactions Not Found</h1>");

  res.render("transactions", {
    accountNo: accNo,
    transactions: txns,
    hasTransactions: txns.length > 0,
  });
});

// Catch-all 404 Route
app.use((req, res) => {
  res.status(404).send("<h1>404 — Page Not Found</h1>");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
