import People from "@/components/people";
import { generateUser } from "@/lib/utils/user";
import React from "react";

function Users() {
  return <People users={[generateUser(), generateUser()]} />;
}

export default Users;
