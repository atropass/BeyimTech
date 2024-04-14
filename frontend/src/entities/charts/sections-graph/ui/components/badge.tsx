import { Check } from "lucide-react";

interface BadgeProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  color: string;
}

export const Badge = ({ label, onClick, selected, color }: BadgeProps) => {
  return (
    <div
      onClick={onClick}
      className="mx-1 flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1 drop-shadow-sm duration-150"
      style={{
        backgroundColor: selected ? color : "white",
        borderColor: color,
      }}
    >
      <div>
        <Check
          size={16}
          strokeWidth={"5px"}
          className="rounded-full p-1"
          style={{
            backgroundColor: selected ? "white" : color,
            color: color,
          }}
        />
      </div>
      <div className={`text-xs ${selected ? "text-white" : "text-black"}`}>
        {label}
      </div>
    </div>
  );
};
