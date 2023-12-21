"use client";
import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function userForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      role: "",
    },
    onSubmit: (values) => {
      createUser(values);
    },
  });
  const createUser = (data: TSAny) => {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-cache",
      headers: {},
    })
      .then((res) => res.json())
      .then(({ user }) => {
        router.push(`/users`);
      });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <Input
        name="username"
        placeholder="User Name"
        value={formik.values.username}
        onChange={formik.handleChange}
        fullWidth
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        fullWidth
      />
      <Input
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        fullWidth
      />
      <Input
        name="role"
        placeholder="Role"
        value={formik.values.role}
        onChange={formik.handleChange}
        fullWidth
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
