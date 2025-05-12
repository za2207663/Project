export default function StatsCard({ title, value, color }) {
  return (
    <div className={`${color} text-black p-6 rounded-lg shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
