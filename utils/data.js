import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Ezekiel",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Osemmm",
      email: "ose@example.com",
      password: bcrypt.hashSync("9876543"),
      isAdmin: false,
    },
  ],
};
export default data;
