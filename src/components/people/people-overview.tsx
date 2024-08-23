import { User } from "@/types";
import React, { ComponentPropsWithoutRef } from "react";
import UserUI, { UserUIImg, UserUiName, UserUIUserName } from "../user-ui";
import { Separator } from "../ui/separator";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Roles } from "@/lib/constants/user";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"div"> & {
  people: User;
};
function PeopleOverView({ people, ...rest }: Props) {
  const { info } = people;
  return (
    <Card {...rest}>
      <UserUI
        {...people!}
        className="mb-4 bg-sky-800 text-white p-4 rounded-t-md relative gap-5"
      >
        <UserUIImg className="size-20 shrink-0" />
        <div className="flex flex-col">
          <UserUiName className="text-lg font-semibold" />
          <div className="flex gap-2 text-sm font-medium">
            <div>
              <UserUIUserName className="font-light" />
              <div>User Id</div>
            </div>
            <Separator
              className="w-[1.5px] h-auto bg-slate-200 dark:bg-slate-700"
              orientation="vertical"
            />
            <div>
              <div className="font-light">
                {Roles[people.role as keyof typeof Roles]}
              </div>
              <div>Role</div>
            </div>
          </div>
        </div>
      </UserUI>

      <CardContent>
        <CardHeading>Personal Information</CardHeading>
        <CardDescription className="flex flex-col">
          {info ? (
            <>
              <CardItem title="Date of Birth" desc={info.dob.toDateString()} />
              <CardItem title="Gender" desc={info.gender} />
              <CardItem title="Nationality" desc={info.nationality} />
              <CardItem title="Contact No." desc={info.phone.toString()} />
              <CardItem title="Email" desc={info.email} />
              <CardItem title="Work Email" desc={info.work_email} />
            </>
          ) : (
            "N/A"
          )}
        </CardDescription>
      </CardContent>
      <CardContent>
        <CardHeading>{info?.job.title || "N/A"}</CardHeading>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          facilis ad deleniti praesentium, laudantium dolorem doloribus nostrum.
          Sit sequi unde fugit maxime mollitia architecto.
        </CardDescription>
      </CardContent>
    </Card>
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

const CardHeading = (props: React.ComponentPropsWithoutRef<"div">) => (
  <CardHeader
    {...props}
    className={cn(
      "bg-muted text-primary/80 py-1 px-2 -mx-2 rounded mb-3 ",
      props.className
    )}
  />
);
