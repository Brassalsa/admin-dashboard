import { PropsWithChildren } from "react";

type PropsWIthClassName = {
  className?: string;
};

type PropsDefault = PropsWithChildren & PropsWIthClassName;

type User = {
  id: string;
  image?: string;
  name: string;
  email: string;
  role: string;
  status: string;
  teams: string[];
  info?: UserInfo;
};

type UserInfo = {
  dob: Date;
  gender: string;
  nationality: string;
  phone: number;
  email: string;
  work_email: string;
  job_desc: string;
};
