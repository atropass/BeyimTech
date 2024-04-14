interface FieldProps {
  label: string;
  value: string;
}
export const Field = ({ label, value }: FieldProps) => {
  return (
    <div className="flex flex-col">
      <p className="font-semibold text-zinc-500 text-sm">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
};
