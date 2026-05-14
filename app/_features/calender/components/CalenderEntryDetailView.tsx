import { CalenderEntry } from "@/_types/CalenderEntry.types";
import Image from "next/image";
import { renderDetailItem } from "./renderDetailItem";
import { formatCalenderEntryDate } from "@/_lib/helpers/calender.helper";

const sectionCardStyles =
  "rounded-2xl border border-black/10 bg-white p-5 shadow-sm";

export function CalenderEntryDetailView({ entry }: { entry: CalenderEntry }) {
  return (
    <div className="flex-1 space-y-8 overflow-y-auto bg-[#FFF9ED] p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <section className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-5 py-4">
            <p className="text-sm font-semibold text-slate-900">
              Festival Preview
            </p>
          </div>

          {entry.image ? (
            <div className="relative aspect-16/10 bg-slate-100">
              <Image
                src={entry.image}
                alt={entry.festival || "Festival image"}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex aspect-16/10 items-center justify-center bg-slate-50 text-sm text-slate-500">
              No image available
            </div>
          )}
        </section>

        <section className={sectionCardStyles}>
          <p className="text-sm font-semibold text-slate-900">Entry Details</p>

          <div className="mt-5 space-y-5">
            {renderDetailItem("Festival", entry.festival || "N/A")}
            {renderDetailItem("Month", entry.month || "N/A")}
            {renderDetailItem("Day", entry.day || "N/A")}
            {renderDetailItem("Date", formatCalenderEntryDate(entry.date))}
            {renderDetailItem("Entry ID", entry._id || "N/A")}
          </div>
        </section>
      </div>
    </div>
  );
}
