import { PropsWithChildren } from "react";

type PropsWIthClassName = {
  className?: string;
};

type PropsDefault = PropsWithChildren & PropsWIthClassName;

type User = UserWithoutInfo & {
  info?: UserInfo;
};

type UserWithoutInfo = {
  id: string;
  image?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  teams: string[];
};

type UserInfo = {
  dob: Date;
  gender: string;
  nationality: string;
  phone: number | string;
  email: string;
  work_email: string;
  job: {
    title: string;
    desc: string;
  };
};

type Filter = {
  roles: string[];
  teams: string[];
};
