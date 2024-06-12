import { useEffect, useState } from 'react';

const ColorSelectField: React.FCC<{
  colorValue?: string;
  setColorValue?: (value: any) => unknown;
}> = ({ colorValue, setColorValue }) => {
  const [value, setValue] = useState(colorValue);

  useEffect(() => {
    setValue(colorValue);
  }, [colorValue]);

  return (
    <div className=" flex h-[60px] w-full rounded-lg !border !border-gray_bg-1 !bg-transparent bg-transparent px-5 py-1 pr-3 outline-none placeholder:text-gray_text-0 placeholder:text-white/[0.6]  focus:!border-gray_bg-2 focus:shadow-field-shadow  active:!border-gray_bg-2 active:shadow-field-shadow disabled:cursor-not-allowed disabled:opacity-30 md:text-sm lg:text-lg ">
      <input
        type="color"
        // {...props}
        placeholder={''}
        onChange={(e) => {
          let v = e.target.value;
          setValue(v);
          setColorValue(v);
        }}
        value={value}
        className="my-auto"
      />
      <span className="my-auto ml-2">{value}</span>
    </div>
  );
};

export default ColorSelectField;
