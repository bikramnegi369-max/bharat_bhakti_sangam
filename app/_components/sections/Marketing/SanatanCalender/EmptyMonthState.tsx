type EmptyMonthStateProps = {
  monthLabel: string;
};

export default function EmptyMonthState({
  monthLabel,
}: EmptyMonthStateProps) {
  return (
    <div className="px-5 py-6 text-sm text-para sm:px-6">
      Festival details for {monthLabel} will be announced soon.
    </div>
  );
}
