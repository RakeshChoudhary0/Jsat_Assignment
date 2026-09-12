const http = require("http");

// 1. Enhanced Customer Data
const customers = [
  {
    id: "101",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    phone: "324334338",
    city: "New York",
    joinDate: "2023-01-15",
    accountNo: "ACC1001",
  },
  {
    id: "102",
    name: "Bob Jones",
    email: "bob.jones@example.com",
    phone: "843453345",
    city: "Chicago",
    joinDate: "2023-05-20",
    accountNo: "ACC1002",
  },
  {
    id: "103",
    name: "Charlie Brown",
    email: "charlie.b@example.com",
    phone: "223353443",
    city: "San Francisco",
    joinDate: "2024-02-10",
    accountNo: "ACC1003",
  },
  {
    id: "104",
    name: "Diana Prince",
    email: "diana.p@example.com",
    phone: "1234567890",
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
    currency: "INR",
    status: "Active",
    branch: "Downtown  Branch",
    customerId: "101",
  },
  ACC1002: {
    accountNo: "ACC1002",
    type: "Checking",
    balance: 1250.0,
    currency: "INR",
    status: "Active",
    branch: "Central  Branch",
    customerId: "102",
  },
  ACC1003: {
    accountNo: "ACC1003",
    type: "Savings",
    balance: 12450.75,
    currency: "INR",
    status: "Active",
    branch: "Downtown Branch",
    customerId: "103",
  },
  ACC1004: {
    accountNo: "ACC1004",
    type: "Checking",
    balance: 320.1,
    currency: "INR",
    status: "Dormant",
    branch: "North Branch",
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
    {
      id: "TXN1003",
      timestamp: "2026-09-04 06:10 PM",
      type: "Debit",
      category: "Shopping",
      from: "ACC1001 (Alice)",
      to: "Supermarket Inc",
      amount: 115.4,
      status: "Completed",
      description: "Weekly Groceries",
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

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  // 1. Home Route
  if (url === "/") {
    return res.end(`
      <h1>Banking Home</h1>
      <p>Welcome to the Online Banking Portal</p>
      <p><a href="/customers">View All Customers</a></p>
    `);
  }

  
  // 2. Customers List
  if (url === "/customers") {
    let html = "<h1>Customer Directory</h1><ul style='line-height: 1.8;'>";
    customers.forEach((c) => {
      html += `<li><strong><a href="/customer/${c.id}">${c.name}</a></strong> — ${c.city} (${c.email})</li>`;
    });
    html += "</ul><br><a href='/'>Back Home</a>";
    return res.end(html);
  }

  // 3. Customer Details (/customer/:id)
  if (url.startsWith("/customer/")) {
    const id = url.replace("/customer/", "");
    const customer = customers.find((c) => c.id === id);

    if (!customer) {
      res.statusCode = 404;
      return res.end(
        "<h1>404 — Customer Not Found</h1><a href='/customers'>Back to Customers</a>",
      );
    }

    return res.end(`
      <h1>Customer Details</h1>
      <p><strong>ID:</strong> ${customer.id}</p>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>City:</strong> ${customer.city}</p>
      <p><strong>Customer Since:</strong> ${customer.joinDate}</p>
      <p><a href="/account/${customer.accountNo}">View Account (${customer.accountNo})</a></p>
      <hr>
      <a href="/customers">Back to Customers</a>
    `);
  }

  // 4. Account Details (/account/:accountNo)
  if (url.startsWith("/account/")) {
    const accNo = url.replace("/account/", "");
    const account = accounts[accNo];

    if (!account) {
      res.statusCode = 404;
      return res.end(
        "<h1>404 — Account Not Found</h1><a href='/customers'>Back to Customers</a>",
      );
    }

    const customer = customers.find((c) => c.id === account.customerId);

    return res.end(`
      <h1>Account Details</h1>
      <p><strong>Account Number:</strong> ${account.accountNo}</p>
      <p><strong>Account Holder:</strong> <a href="/customer/${customer.id}">${customer.name}</a></p>
      <p><strong>Type:</strong> ${account.type}</p>
      <p><strong>Balance:</strong> $${account.balance.toFixed(2)} ${account.currency}</p>
      <p><strong>Status:</strong> ${account.status}</p>
      <p><strong>Branch:</strong> ${account.branch}</p>
      <p><a href="/transactions/${account.accountNo}">View Transaction History</a></p>
      <hr>
      <a href="/customers">Back to Customers</a>
    `);
  }

  // 5. Transactions (/transactions/:accountNo)
  if (url.startsWith("/transactions/")) {
    const accNo = url.replace("/transactions/", "");
    const txns = transactions[accNo];

    if (!txns) {
      res.statusCode = 404;
      return res.end(
        "<h1>404 — Transaction Records Not Found</h1><a href='/customers'>Back to Customers</a>",
      );
    }

    if (txns.length === 0) {
      return res.end(`
        <h1>Transactions for ${accNo}</h1>
        <p>No transactions recorded for this account yet.</p>
        <a href="/account/${accNo}">Back to Account Details</a>
      `);
    }

    let rows = txns
      .map(
        (t) => `
        <tr>
          <td>${t.id}</td>
          <td>${t.timestamp}</td>
          <td>${t.type}</td>
          <td>${t.category}</td>
          <td>${t.from}</td>
          <td>${t.to}</td>
          <td>$${t.amount.toFixed(2)}</td>
          <td>${t.status}</td>
          <td>${t.description}</td>
        </tr>`,
      )
      .join("");

    return res.end(`
      <h1>Transactions for Account: ${accNo}</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th>Txn ID</th>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Category</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <br>
      <a href="/account/${accNo}">Back to Account Details</a> | 
      <a href="/customers">Back to Customers</a>
    `);
  }

  // 6. Default 404
  res.statusCode = 404;
  res.end("<h1>404 — Page Not Found</h1><a href='/'>Go to Banking Home</a>");
});

server.listen(3000, () =>
  console.log("Server running at http://localhost:3000"),
);
