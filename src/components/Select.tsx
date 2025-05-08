type SelectType = React.SelectHTMLAttributes<HTMLSelectElement>;

interface SelectProps extends SelectType {
  options: { label: string; value: string; selected?: boolean }[];
  label: string;
}

export const Select = ({ id, label, options, ...rest }: SelectProps) => (
  <>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
    <select
      id={id}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      {...rest}
    >
      {options.map((option) => (
        <option value={option.value} selected={option.selected}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);
