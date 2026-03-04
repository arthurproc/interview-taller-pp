// const users = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     role: "admin",
//     isActive: true,
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob.smith@example.com",
//     role: "user",
//     isActive: true,
//   },
//   {
//     id: 3,
//     name: "Carol White",
//     email: "carol.white@example.com",
//     role: "manager",
//     isActive: false,
//   },
//   {
//     id: 4,
//     name: "David Brown",
//     email: "david.brown@example.com",
//     role: "user",
//     isActive: true,
//   },
//   {
//     id: 5,
//     name: "Emma Davis",
//     email: "emma.davis@example.com",
//     role: "admin",
//     isActive: false,
//   },
//   {
//     id: 6,
//     name: "Frank Miller",
//     email: "frank.miller@example.com",
//     role: "manager",
//     isActive: true,
//   },
// ];

// function groupByRole(users) {
//   return users.reduce(
//     (acc, user) => {
//       if (!acc[user.role]) {
//         acc[user.role] = [];
//       }
//       acc[user.role].push(user);
//       return acc;
//     },
//     {},
//   );
// }

// console.log(groupByRole(users));

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

type Transaction = {
  id: string;
  amount: number;
  description: string;
};

const users = new Map<string, Transaction>();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`METHOD: ${req.method} | URL: ${req.url}`);

  next();
});

app.post("/transaction", (req, res) => {
  const { amount, description } = req.body;

  const id = `${Date.now()}`;

  users.set(id, { id, amount, description });

  return res.json({ id, amount, description });
});

app.listen(3000, () => {
  console.log("Listening on PORT: 3000");
});

// function cartReducer(state = { items: [] }, action) {
//   switch(action.type) {
//     case 'ADD_ITEM':
//       // state.items.push(action.payload);
//       state = {
//         ...state
//         items: [...state.items, action.payload],
//       }
//       return state;
//     default:
//       return state;
//   }
// }
