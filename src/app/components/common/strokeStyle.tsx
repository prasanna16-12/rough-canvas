
"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { STROKE_STYLE_DASH } from "@/app/utils/constant";
import StrokeStyleSolidIcon from "../icons/strokeStyleSolidIcon";
import StrokeStyleDottedIcon from "../icons/StrokeStyleDottedIcon";
import StrokeStyleDashedIcon from "../icons/strokeStyleDashedIcon";

interface Props {
  defaultVal: number[];
  label: string;
  setValue: (value: number[] | undefined) => void
}


export default function StrokeStyle({ defaultVal, label, setValue }: Props) {
  const [strokeStyle, setStrokeStyle] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(strokeStyle)
  }, [setValue, strokeStyle])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          <button className={`${strokeStyle === STROKE_STYLE_DASH.NO_DASH ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.NO_DASH)}>{StrokeStyleSolidIcon()}</button>
          <button className={`${strokeStyle === STROKE_STYLE_DASH.SMALL ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.SMALL)}>{StrokeStyleDottedIcon()}</button>
          <button className={`${strokeStyle === STROKE_STYLE_DASH.LARGE ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.LARGE)}>{StrokeStyleDashedIcon()}</button>

        </div>
      </div>
    </div>);
}

