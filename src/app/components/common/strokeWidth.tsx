
"use client"
import styles from "./common.module.css";
import { useEffect, useState } from "react";


interface Props {
  min: number;
  max: number;
  defaultVal: number;
  label: string;
  setValue: (value: number) => void
}


export default function StrokeWidth({ defaultVal, min, max, label, setValue }: Props) {
  const [input, setInputValue] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(input)
  }, [input])

  return (
    <div className={styles.options}>
      <p>{label}</p>
      <div className={styles.optionValuePicker}>
        <input style={{ marginTop: `0.3rem`}} id="rangeInp" value={input + ''} type="range" min={min + ''} max={max + ''} step='1'
          onChange={(event) => setInputValue(parseInt(event.target.value))} />
      </div>
    </div>
  );
}

