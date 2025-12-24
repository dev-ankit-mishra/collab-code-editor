export default function StatCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="bg-gray-900 border border-white/5 rounded-xl p-5 flex flex-col gap-1 hover:scale-[1.02] transition">
      <p className="text-3xl font-semibold text-white">
        {value}
      </p>
      <p className="text-sm text-zinc-400">
        {label}
      </p>
    </div>
  );
}
