import { User } from "@/types";
import { faker } from "@faker-js/faker";
import { Roles, Status, Teams } from "../constants/user";

export const generateUser = (): User => {
  const role = pickRandomValue(Roles);
  const status = pickRandomValue(Status);
  const team = pickRandomValue(Teams);
  return {
    id: faker.number.hex({ min: 0, max: 10000 }),
    email: faker.word.adjective() + "@" + faker.word.adverb(),
    name: faker.person.fullName(),
    role,
    status,
    teams: [team],
    image: faker.image.avatar(),
  };
};

export const pickRandomValue = <T extends { [x: string]: any }>(obj: T) => {
  const keys = Object.keys(obj);
  const ind = Math.floor(Math.random() * keys.length);
  return obj[keys[ind]];
};
