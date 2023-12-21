"use client";
import React from "react";
import { CELL_TYPES, ColumnBuilder } from "@/fwk/oTable";
import { OTable } from "@/fwk/oTable";
import { useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";

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
  const { searchKeyword, value } = param;
  const highlightMatches = (text: string, keyword: string) => {
    if (!keyword) {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="hightlight-cell  text-gray-800 font-medium"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  return (
    <div className="flex items-center ">
      <div className="mr-2">
        <Avatar {...stringAvatar(param?.rowData?.name)}></Avatar>
      </div>
      <span>{highlightMatches(value, searchKeyword)}</span>
    </div>
  );
};
const CellComponent = (param: any) => {
  const { searchKeyword, value } = param;
  const highlightMatches = (text: string, keyword: string) => {
    if (!keyword) {
      return text;
    }
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <>
          <span key={index} className="hightlight-cell">
            {part}
          </span>
        </>
      ) : (
        part
      )
    );
  };
  return <span>{highlightMatches(value, searchKeyword)}</span>;
};

const Columns = [
  ColumnBuilder()
    .id("username")
    .name("UserName")
    .component(CellComponent)
    .build(),
  // ColumnBuilder().id("password").name("Password").build(),
  ColumnBuilder().id("name").name("Name").component(AvatarComponent).build(),
  ColumnBuilder().id("role").name("Role").component(CellComponent).build(),
];

export default function userList() {
  const [originalData, setOriginalData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/user", {
      method: "GET",
    })
      .then((res) => res?.json())
      .then((data) => {
        setOriginalData(data);
        setFilteredData(data);
      });
  }, []);

  const openIntegration = (row: TSAny) => {
    router.push(`/users/${row._id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = originalData?.filter(
      (item: any) =>
        item.username.toLowerCase().includes(term) ||
        item.role.toLowerCase().includes(term) ||
        item.name.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };
  return (
    <>
      <input
        className="border-2 border-stone-200 rounded-lg p-1 px-2"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <OTable
        isFullWidthTable
        stickyHeader
        columns={Columns}
        data={filteredData}
        onRowClick={openIntegration}
        searchKeyword={searchTerm}
      />
    </>
  );
}
