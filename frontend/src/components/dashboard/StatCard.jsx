export default function StatCard({ title, value, icon, color }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
      "
    >
      <div
        className={`
          w-14
          h-14
          rounded-xl
          flex
          items-center
          justify-center
          ${color}
        `}
      >
        {icon}
      </div>

      <h3 className="mt-6 text-slate-500">{title}</h3>

      <h1 className="text-4xl font-bold mt-2">{value}</h1>
    </div>
  );
}
