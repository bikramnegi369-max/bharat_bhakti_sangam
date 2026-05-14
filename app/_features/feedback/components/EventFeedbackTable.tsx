import { useMemo } from "react";
import { DataTable } from "@/_components/common/table/DataTable";
import { EventFeedbackColumns } from "./EventFeedbackColumnsDef";
import { TableConfig } from "@/_types/Table.types";
import { getEventFeedbacks } from "../services/feedback.service";
import { ALL_FEEDBACKS } from "@/_lib/constants/feedback.constants";
import { EventFeedback } from "@/_types/feedback.types";

export const EventFeedbackTable = () => {
  const config = useMemo<TableConfig<EventFeedback>>(
    () => ({
      columns: EventFeedbackColumns,
      service: { getAll: getEventFeedbacks },
      queryKeyPrefix: [ALL_FEEDBACKS],
      filters: [
        { type: "search", key: "search", placeholder: "Search feedback" },
      ],
    }),
    [],
  );

  return <DataTable config={config} />;
};
