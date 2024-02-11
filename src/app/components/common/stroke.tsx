
"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { COLORS } from "@/app/utils/constant";
import img from '../../../../public/no_color.png'

interface Props {
  isFillCompont: boolean;
  defaultVal: string;
  label: string;
  setValue: (value: any) => void
}


export default function Stroke({ defaultVal, label, setValue, isFillCompont}: Props) {
  const [stroke, setStroke] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(stroke)
  }, [stroke])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          {
            isFillCompont ? <div style={{backgroundImage: `url(${img.src})`}} className={stroke === undefined ? styles.selectedDiv : undefined} onClick={() => setStroke(undefined)}></div> : null
          }
          <div style={{backgroundColor: COLORS.BLACK}} className={stroke === COLORS.BLACK ? styles.selectedDiv : undefined} onClick={() => setStroke(COLORS.BLACK)}></div>
          <div style={{backgroundColor: COLORS.RED}} className={stroke === COLORS.RED ? styles.selectedDiv : undefined} onClick={() =>setStroke(COLORS.RED)}></div>
          <div style={{backgroundColor: COLORS.BLUE}} className={stroke === COLORS.BLUE ? styles.selectedDiv : undefined} onClick={() =>setStroke(COLORS.BLUE)}></div>
          <div style={{backgroundColor: COLORS.GREEN}} className={stroke === COLORS.GREEN ? styles.selectedDiv : undefined} onClick={() =>setStroke(COLORS.GREEN)}></div>
          <div style={{backgroundColor: COLORS.LAVENDER}} className={stroke === COLORS.LAVENDER ? styles.selectedDiv : undefined} onClick={() =>setStroke(COLORS.LAVENDER)}></div>
        
        </div>
      </div>
    </div>

  );
}

