import { User } from "@/types";
import { faker } from "@faker-js/faker";
import { Roles, Status, Teams } from "../constants/user";

export const generateEmail = () =>
  faker.word.adjective() + "@" + faker.word.adverb() + ".co";
export const generateUser = (): User => {
  const role = pickRandomKey(Roles);
  const status = pickRandomKey(Status);
  const teams = pickRandomValues(Teams);
  const email = generateEmail();
  return {
    id: "@" + email.split("@")[0],
    email,
    name: faker.person.fullName(),
    role,
    status,
    teams: teams,
    image: faker.image.avatar(),
    info: {
      dob: faker.date.birthdate(),
      email,
      gender: faker.person.gender(),
      nationality: faker.location.country(),
      phone: faker.phone.number(),
      work_email: faker.word.adjective() + "@" + faker.word.adverb(),
      job: {
        title: faker.person.jobTitle(),
        desc: faker.person.jobDescriptor(),
      },
    },
  };
};

export const pickRandomValue = <T extends { [x: string]: any }>(obj: T) => {
  const keys = Object.keys(obj);
  const ind = generateRandNum(keys.length);
  return obj[keys[ind]];
};

export const pickRandomKey = <T extends { [x: string]: any }>(obj: T) => {
  const keys = Object.keys(obj);
  const ind = generateRandNum(keys.length);
  return keys[ind];
};

export const pickRandomValues = <T extends { [x: string]: any }>(obj: T) => {
  const keys = Object.keys(obj);
  const numOfValues = Math.floor(Math.random() * keys.length);
  if (numOfValues === keys.length) return keys;

  const set = new Set<string>(keys);
  const res: string[] = [];

  // recursively add random value to res
  const helper = (hset: Set<string> = set) => {
    if (res.length >= numOfValues || set.size == 0) return;
    const arr = Array.from(set);
    const val = pickRandomValue(arr);
    hset.delete(val);
    res.push(val);
    helper(hset);
  };
  helper();
  // add if res is empty
  if (res.length === 0) {
    res.push(pickRandomValue(obj));
  }
  const vals = res.map((i) => obj[i]);
  return vals.sort();
};

const generateRandNum = (len: number) => Math.floor(Math.random() * len);
