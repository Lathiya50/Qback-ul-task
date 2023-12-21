"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name: string) {
  return {
    alt: name,
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}`,
  };
}

const AvatarComponent = (param: any) => {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar {...stringAvatar(param?.rowData?.name)} />
    </Stack>
  );
};
const Columns = [
  ColumnBuilder().id("username").name("UserName").build(),
  ColumnBuilder().id("password").name("Password").build(),
  ColumnBuilder().id("name").name("Name").component(AvatarComponent).build(),
  ColumnBuilder().id("role").name("Role").build(),
];

export default function userList() {
  const [data, setData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    })
      .then((res) => res?.json())
      .then((data) => {
        setData(data);
      });
  }, []);
  const openIntegration = (row: TSAny) => {
    router.push(`/users/${row._id}`);
  };

  return (
    <OTable
      isFullWidthTable
      stickyHeader
      columns={Columns}
      data={data}
      onRowClick={openIntegration}
    />
  );
}
