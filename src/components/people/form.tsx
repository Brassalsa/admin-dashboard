"use client";
import { personSchema } from "@/lib/validations/person-schema";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { Ref, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import UserUI, { UserUIImg, UserUiName } from "../user-ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Roles, Status, Teams } from "@/lib/constants/user";
import { Button } from "../ui/button";
import { RotateCcw, Trash2 } from "lucide-react";
import MultiSelect, {
  MultiSelectDropdown,
  MultiSelectRef,
} from "../ui/multi-select";

type Props = {
  defaultValues: User;
  onSubmit?: (data: User) => any;
  onCancel?: () => void;
};
function PeopleForm({ defaultValues, onSubmit, onCancel }: Props) {
  const teamsRef = useRef<MultiSelectRef>();
  const form = useForm<z.infer<typeof personSchema>>({
    resolver: zodResolver(personSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    teamsRef.current?.setSelectedItems(defaultValues.teams || []);
  }, []);

  const onSubmitHandler = async (v: z.infer<typeof personSchema>) => {
    onSubmit?.({
      ...defaultValues,
      ...v,
    });
  };

  const onCancelHandler = () => {
    onCancel?.();
  };
  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-2 sm:space-y-0 sm:grid gap-3 h-min"
          onSubmit={form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem className="col-span-2 flex flex-col">
                <UserUI
                  email={form.getValues().email}
                  name={form.getValues().name}
                  id={form.getValues().id}
                  image={form.getValues().image}
                  className="mx-auto"
                >
                  <UserUIImg className="size-24" />
                </UserUI>
                <div className="flex gap-4 mx-auto *:uppercase">
                  <FormControl>
                    <>
                      <Button
                        type="button"
                        className="p-2 flex gap-1"
                        variant={"secondary"}
                      >
                        <label className="flex gap-1 items-center p-1 cursor-pointer">
                          <RotateCcw className="scale-[0.8] " />
                          Change Photo
                          <input
                            id="file"
                            name="file"
                            className="hidden"
                            type="file"
                          />
                        </label>
                      </Button>
                    </>
                  </FormControl>
                  <Button
                    type="button"
                    className="p-2 flex gap-1"
                    variant={"secondary"}
                    onClick={() => {
                      form.setValue("image", "");
                    }}
                  >
                    <Trash2 className="scale-[0.8]" />
                    Remove Photo
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name...." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email...." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Role..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="capitalize">
                        <SelectLabel>{field.name}</SelectLabel>
                        {Object.keys(Roles).map((i) => (
                          <SelectItem key={i} value={i}>
                            {Roles[i as keyof typeof Roles]}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Status..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="capitalize">
                        <SelectLabel>{field.name}</SelectLabel>
                        {Object.values(Status).map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="teams"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Teams</FormLabel>
                <FormControl>
                  <MultiSelectDropdown
                    title="Teams"
                    items={Object.keys(Teams)}
                    onValueChange={(val) => {
                      form.setValue("teams", val);
                    }}
                    ref={teamsRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 mt-3 flex ml-auto gap-2 flex-col sm:flex-row w-full sm:w-auto *:uppercase">
            <Button
              type="button"
              variant={"secondary"}
              onClick={onCancelHandler}
              className="w-full flex-1"
            >
              Cancel
            </Button>
            <Button variant="secondary" disabled={!form.formState.isValid}>
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default PeopleForm;
