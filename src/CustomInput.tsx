interface CustomInputProps {
  children: React.ReactNode;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>) : void;  
}

const CustomInput = ({children, value, onChange} : CustomInputProps) => {
  return <div>
    <label htmlFor="search">{children}</label>
    <input placeholder='Example' id="search" type="text" value={value} onChange={onChange}></input>
  </div>
}

export default CustomInput