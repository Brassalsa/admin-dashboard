import { User } from "@/types";
import React from "react";
import UserUI, { UserUIImg, UserUiName, UserUIUserName } from "../user-ui";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

type Props = {
  people: User;
};
function PeopleOverView({ people }: Props) {
  const { info } = people;
  return (
    <div>
      <UserUI {...people!} className="mb-4">
        <UserUIImg className="size-20" />
        <div className="flex flex-col">
          <UserUiName className="text-xl" />
          <div className="flex gap-2 text-sm font-medium">
            <div>
              <UserUIUserName />
              <div>User Id</div>
            </div>
            <Separator
              className="h-auto bg-slate-200 dark:bg-slate-700"
              orientation="vertical"
            />
            <div>
              {people?.role}
              <div>Role</div>
            </div>
          </div>
        </div>
      </UserUI>
      <Card className="mb-2">
        <CardContent>
          <CardHeader>Personal Information</CardHeader>
          <CardDescription className="flex flex-col">
            <CardItem title="Date of Birth" desc={info.dob.toDateString()} />
            <CardItem title="Gender" desc={info.gender} />
            <CardItem title="Nationality" desc={info.nationality} />
            <CardItem title="Contact No." desc={info.phone.toString()} />
            <CardItem title="Email" desc={info.email} />
            <CardItem title="Work Email" desc={info.work_email} />
          </CardDescription>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <CardHeader>{info.job.title}</CardHeader>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            facilis ad deleniti praesentium, laudantium dolorem doloribus
            nostrum. Sit sequi unde fugit maxime mollitia architecto.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export default PeopleOverView;

type ItemProps = {
  title: string;
  desc: string;
};
function CardItem({ title, desc }: ItemProps) {
  return (
    <div className="flex border-b py-2">
      <span className="text-primary font-semibold flex-1">{title}</span>
      <span className="flex-1">{desc}</span>
    </div>
  );
}
