import "server-only";

import { cache } from "react";
import { apiRoutes } from "@/_config/APIRoutes.config";
import { dummySanatanCalenderData } from "@/_lib/DummyData/CalenderData";
import { buildSanatanCalenderMonths } from "@/_lib/helpers/calender.helpers";
import { DEFAULT_TIMEOUT_MS, fetchWithTimeout } from "@/_utils/fetch";
import { SanatanCalenderMonthSection } from "../types";
import { isSanatanCalenderApiEnvelope, isSanatanCalenderItems } from "./guards";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const SANATAN_CALENDER_REVALIDATE_SECONDS = 60 * 60 * 12;
const USE_DUMMY_SANATAN_CALENDER_DATA =
  process.env.USE_DUMMY_SANATAN_CALENDER_DATA !== "false";

async function fetchSanatanCalenderFromApi() {
  if (!API_URL) {
    throw new Error("Sanatan Calender API URL is not configured.");
  }

  let response: Response;

  try {
    response = await fetchWithTimeout(
      `${API_URL}${apiRoutes.sanatanCalender}`,
      {
        next: {
          revalidate: SANATAN_CALENDER_REVALIDATE_SECONDS,
          tags: ["sanatan-calender"],
        },
      },
      DEFAULT_TIMEOUT_MS,
    );
  } catch (error) {
    throw new Error(
      error instanceof Error && error.name === "AbortError"
        ? "Sanatan Calender API request timed out."
        : error instanceof Error
          ? `Unable to reach Sanatan Calender API: ${error.message}`
          : "Unable to reach Sanatan Calender API.",
    );
  }

  if (!response.ok) {
    throw new Error(
      `Sanatan Calender API responded with status ${response.status}.`,
    );
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    throw new Error("Sanatan Calender API returned invalid JSON.");
  }
}

async function getSanatanCalenderPayload() {
  if (USE_DUMMY_SANATAN_CALENDER_DATA) {
    return dummySanatanCalenderData;
  }

  return fetchSanatanCalenderFromApi();
}

function extractSanatanCalenderItems(payload: unknown) {
  if (isSanatanCalenderItems(payload)) {
    return payload;
  }

  if (isSanatanCalenderApiEnvelope(payload)) {
    if (!payload.status) {
      throw new Error(
        payload.message ||
          "Sanatan Calender API returned an unsuccessful response.",
      );
    }

    return payload.data;
  }

  throw new Error("Invalid Sanatan Calender payload.");
}

export const getSanatanCalenderMonths = cache(
  async (): Promise<SanatanCalenderMonthSection[]> => {
    const payload = await getSanatanCalenderPayload();
    const items = extractSanatanCalenderItems(payload);

    return buildSanatanCalenderMonths(items);
  },
);
