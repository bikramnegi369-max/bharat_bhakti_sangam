type EventUnavailableProps = {
  title: string;
  message: string;
};

export function EventUnavailable({
  title,
  message,
}: EventUnavailableProps) {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-4xl items-center justify-center px-6 py-16">
      <div className="w-full rounded-xl border-2 border-primary bg-primary_light p-8 text-center">
        <h1 className="text-2xl font-bold text-heading">{title}</h1>
        <p className="mt-4 text-base text-para">{message}</p>
      </div>
    </section>
  );
}
