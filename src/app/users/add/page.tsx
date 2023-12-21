"use client";
// import React from "react";
// import { useFormik } from "formik";
// import { Input, Button } from "@mui/material";
// import { useRouter } from "next/navigation";

// export default function userForm() {
//   const router = useRouter();
//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//       name: "",
//       role: "",
//     },
//     onSubmit: (values) => {
//       createUser(values);
//     },
//   });
//   const createUser = (data: TSAny) => {
//     fetch("/api/user", {
//       method: "POST",
//       body: JSON.stringify(data),
//       cache: "no-cache",
//       headers: {},
//     })
//       .then((res) => res.json())
//       .then(({ user }) => {
//         router.push(`/users`);
//       });
//   };

//   return (
//     <div className="h-screen flex items-center justify-center">
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           formik.handleSubmit();
//         }}
//       >
//         <Input
//           name="username"
//           placeholder="User Name"
//           value={formik.values.username}
//           onChange={formik.handleChange}
//           fullWidth
//           required
//         />
//         <Input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           fullWidth
//           required
//         />
//         <Input
//           name="name"
//           placeholder="Name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           fullWidth
//           required
//         />
//         <Input
//           name="role"
//           placeholder="Role"
//           value={formik.values.role}
//           onChange={formik.handleChange}
//           fullWidth
//           required
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </div>
//   );
// }

import React from "react";
import { useFormik } from "formik";
import { Input, Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface FormValues {
  username: string;
  password: string;
  name: string;
  role: string;
}

const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.role) {
    errors.role = "Role is required";
  }

  return errors;
};

export default function UserForm() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      role: "",
    },
    validate,
    onSubmit: (values) => {
      createUser(values);
    },
  });

  const createUser = (data: FormValues) => {
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
    <div className="h-screen flex items-center justify-center">
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
        {formik.touched.username && formik.errors.username && (
          <span className="text-red-500">{formik.errors.username}</span>
        )}

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-red-500">{formik.errors.password}</span>
        )}

        <Input
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          fullWidth
        />
        {formik.touched.name && formik.errors.name && (
          <span className="text-red-500">{formik.errors.name}</span>
        )}

        <Input
          name="role"
          placeholder="Role"
          value={formik.values.role}
          onChange={formik.handleChange}
          fullWidth
        />
        {formik.touched.role && formik.errors.role && (
          <span className="text-red-500">{formik.errors.role}</span>
        )}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
