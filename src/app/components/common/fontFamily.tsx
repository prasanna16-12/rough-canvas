
"use client"
import { FONTS } from "@/app/utils/constant";
import styles from "./common.module.css";
import { ChangeEvent, useEffect, useState } from "react";


interface Props {
  defaultVal: string;
  label: string;
  setValue: (value: string) => void
}


export default function FontFamily({ defaultVal, label, setValue }: Props) {
  const [fontFamily, setFontFamily] = useState<string>(defaultVal);
  const keyVals:string[][] = Object.entries(FONTS);

  useEffect(() => {
    console.log(fontFamily);
    setValue(fontFamily)
  }, [fontFamily])

  return (
    <div className={styles.options}>
      <p>{label}</p>
      <div className={styles.optionValuePicker}>
          <select 
            id={label}
            className={styles.selectCustom_trigger}
            name="fontfamilyselect" 
            style={{fontFamily: fontFamily}}
            defaultValue={fontFamily}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFontFamily(e.target.value)}>
            {
              keyVals.map((keyVal, i) => (
                <option style={{fontFamily: keyVal[1]}} key={keyVal[0]} value={keyVal[1]}>{keyVal[1]}</option>
              ))
            }
          </select>
      </div>
    </div>
  );
}

