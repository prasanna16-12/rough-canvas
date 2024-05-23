/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { FillCrossHatchIcon, FillDashedIcon, FillDotsIcon, FillHachureIcon, FillSolidIcon, FillZigZagIcon, SloppinessArchitectIcon, SloppinessArtistIcon, SloppinessCartoonistIcon } from "../icons/icon";
import { FILL_STYLE } from "@/app/utils/constant";


interface Props {
  defaultVal: string;
  label: string;
  setValue: (value: string) => void
}


export default function FillStyle({ defaultVal, label, setValue }: Props) {
  const [fillStyle, setFillStyle] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(fillStyle)
  }, [fillStyle])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          <button className={`${fillStyle === FILL_STYLE.CROSS_HATCH ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.CROSS_HATCH)}>{FillCrossHatchIcon}</button>
          <button className={`${fillStyle === FILL_STYLE.DASHED ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.DASHED)}>{FillDashedIcon}</button>
          <button className={`${fillStyle === FILL_STYLE.DOTS ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.DOTS)}>{FillDotsIcon}</button>
          <button className={`${fillStyle === FILL_STYLE.HACHURE || fillStyle === undefined ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.HACHURE)}>{FillHachureIcon}</button>
          <button className={`${fillStyle === FILL_STYLE.SOLID ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.SOLID)}>{FillSolidIcon}</button>
          <button className={`${fillStyle === FILL_STYLE.ZIGZAG ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setFillStyle(FILL_STYLE.ZIGZAG)}>{FillZigZagIcon}</button>

        </div>
      </div>
    </div>

  );
}

