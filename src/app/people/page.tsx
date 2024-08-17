import People from "@/components/people";
import { generateUser } from "@/lib/utils/user";
import React from "react";

const generateUsers = (limit: number = 100) => {
  const arr = [];
  for (let i = 0; i < limit; i++) {
    arr.push(generateUser());
  }
  return arr;
};

function Users() {
  return <People users={generateUsers()} />;
}

export default Users;
