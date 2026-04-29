interface KPIProps {
  title: string;
  value: string | number;
  trend?: string;
  color?: "blue" | "green" | "red" | "yellow" | "gray";
}

const colorMap: Record<NonNullable<KPIProps["color"]>, string> = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600",
  yellow: "text-yellow-600",
  gray: "text-gray-600",
};

export function KPI({ title, value, trend, color = "gray" }: KPIProps) {
  return (
    <div className="bg-white shadow rounded-lg p-4 md:p-6">
      <p className="text-xs uppercase tracking-wide text-gray-400">{title}</p>
      <p className={`text-3xl md:text-4xl font-bold ${colorMap[color]} mt-1`}>{value}</p>
      {trend && <p className="text-xs text-gray-400 mt-1">Tendencia: {trend}</p>}
    </div>
  );
}
