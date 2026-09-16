"use client";

import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { SponsorEnquiryColumns } from "./SponsorEnquiryColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getSponsorEnquiries } from "../../services/sponsors.service";
import { ALL_SPONSOR_ENQUIRIES } from "@/_lib/constants/sponsor.constants";
import { SponsorEnquiryRecord } from "@/_types/Sponsors.types";

interface Props {
  filterAction?: React.ReactNode;
  renderActions?: (row: SponsorEnquiryRecord) => React.ReactNode;
}

export function SponsorEnquiryTable({ filterAction, renderActions }: Props) {
  const config = useMemo<TableConfig<SponsorEnquiryRecord>>(
    () => ({
      columns: SponsorEnquiryColumns,
      service: { getAll: getSponsorEnquiries },
      queryKeyPrefix: [ALL_SPONSOR_ENQUIRIES],
      filters: [
        {
          type: "search",
          key: "search",
          placeholder: "Search by company, name, or email...",
        },
      ],
      filterAction,
      renderActions,
      refreshButton: true,
      exportOptions: {
        enabled: true,
        fileName: "Bharat_Bhakti_Sangam_Sponsors",
        sheetName: "Sponsors",
      },
    }),
    [filterAction, renderActions],
  );

  return <DataTable config={config} />;
}
