export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 rounded-xl bg-primary text-white">
      {children}
    </button>
  );
}
