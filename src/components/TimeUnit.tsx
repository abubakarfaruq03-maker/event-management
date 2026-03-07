interface TimeUnitProps {
  value: string;
  label: string;
  variant: "far" | "upcoming" | "urgent"| "normal"; 
}

function TimeUnit({ value, label, variant }: TimeUnitProps) {
  const colorMap = {
    far: "text-far",
    upcoming: "text-upcoming",
    urgent: "text-urgent",
    normal: "text-main"
  };

  return (
    <div className="flex-1 bg-background/50 border border-border-line/50 rounded-xl p-3 text-center transition-colors duration-500">
      <p className={`${colorMap[variant]} font-share text-2xl leading-none transition-colors`}>
        {value}
      </p>
      <span className="text-[9px] text-secondary uppercase font-bold mt-1 block">
        {label}
      </span>
    </div>
  );
}
export default TimeUnit