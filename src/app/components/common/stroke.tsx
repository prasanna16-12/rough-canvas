
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
  }, [setValue, stroke])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          {
            isFillCompont ? <button id={label} style={{backgroundImage: `url(${img.src})`}} className={`${stroke === undefined ? styles.selectedDiv : undefined} ${styles._div}`} onClick={() => setStroke(undefined)}></button> : null
          }
          <button id={label} style={{backgroundColor: COLORS.BLACK}} className={`${stroke === COLORS.BLACK ? styles.selectedDiv : undefined} ${styles._div}`}onClick={() => setStroke(COLORS.BLACK)}></button>
          <button id={label} style={{backgroundColor: COLORS.RED}} className={`${stroke === COLORS.RED ? styles.selectedDiv : undefined} ${styles._div}`}onClick={() =>setStroke(COLORS.RED)}></button>
          <button id={label} style={{backgroundColor: COLORS.BLUE}} className={`${stroke === COLORS.BLUE ? styles.selectedDiv : undefined} ${styles._div}`}onClick={() =>setStroke(COLORS.BLUE)}></button>
          <button id={label} style={{backgroundColor: COLORS.GREEN}} className={`${stroke === COLORS.GREEN ? styles.selectedDiv : undefined} ${styles._div}`}onClick={() =>setStroke(COLORS.GREEN)}></button>
          <button id={label} style={{backgroundColor: COLORS.LAVENDER}} className={`${stroke === COLORS.LAVENDER ? styles.selectedDiv : undefined} ${styles._div}`}onClick={() =>setStroke(COLORS.LAVENDER)}></button>
        
        </div>
      </div>
    </div>

  );
}

