import { useMemo, useState } from "react";

function InputCurrency() {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBaseValue = Number(e.target.value);

    if (isNaN(newBaseValue)) {
      return;
    }

    setValue(newBaseValue);
  };

  const displayValue = useMemo(() => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }, [value]);

  return <input onChange={handleChange} value={displayValue} />;
}

export default InputCurrency;
