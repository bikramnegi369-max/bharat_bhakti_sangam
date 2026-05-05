interface VisitorInfoRow {
  label: string;
  value: string;
}

interface TempleVisitorInfoProps {
  bestTimeToVisit: string;
  timings: string;
  entryFee: string;
}

/**
 * Visitor information card — amber-tinted, full width.
 * Uses <dl>/<dt>/<dd> for semantic correctness and SEO.
 * Responsive: stacked on mobile, inline on sm+.
 */
export default function TempleVisitorInfo({
  bestTimeToVisit,
  timings,
  entryFee,
}: TempleVisitorInfoProps) {
  const rows: VisitorInfoRow[] = [
    { label: "Best Time to Visit", value: bestTimeToVisit },
    { label: "Timings", value: timings },
    { label: "Entry Fee", value: entryFee },
  ];

  return (
    <section
      className="my-10"
      aria-label="Visitor information"
    >
      <dl className="bg-amber-50 border border-amber-200 rounded-2xl overflow-hidden divide-y divide-amber-100">
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col sm:flex-row sm:gap-6 px-6 py-4"
          >
            <dt className="font-semibold text-stone-700 text-sm sm:min-w-[200px] shrink-0">
              {label}
            </dt>
            <dd className="text-stone-500 text-sm mt-0.5 sm:mt-0">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
