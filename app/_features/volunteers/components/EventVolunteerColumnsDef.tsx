import { Volunteer } from "@/_types/Volunteer.types";
import { createColumn } from "@/_utils/createColumn";
import clsx from "clsx";
import Image from "next/image";

const c = createColumn<Volunteer>();

export const EventVolunteerColumns = [
  c("name", {
    header: "Name",
    accessorFn: (row) => row.name,
  }),
  c("role", {
    header: "Role",
    accessorFn: (row) => row.role,
  }),
  c("email", {
    header: "Email",
    accessorFn: (row) => row.email,
  }),
  c("contact", {
    header: "Contact",
    accessorFn: (row) => row.contact,
  }),
  c("profilePicture", {
    header: "Photo",
    accessorFn: (row) => row.profilePicture,
    cell: (value) => (
      <div className="bg-gray-200 border-2 rounded-xl w-16 h-16 relative overflow-hidden">
        <Image src={value} alt="volunteer profile" fill unoptimized />
      </div>
    ),
  }),
  c("isActive", {
    header: "Status",
    accessorFn: (row) => row.isActive,
    cell: (value) => (
      <span
        className={clsx(
          "px-2 py-1 rounded-md text-xs font-medium",
          value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        )}
      >
        {value ? "Active" : "Inactive"}
      </span>
    ),
  }),
];
