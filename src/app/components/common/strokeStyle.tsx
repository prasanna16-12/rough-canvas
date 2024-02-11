
"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { STROKE_STYLE_DASH } from "@/app/utils/constant";
import { StrokeStyleDashedIcon, StrokeStyleDottedIcon, StrokeStyleSolidIcon } from "../icons/icon";

interface Props {
  defaultVal: number[];
  label: string;
  setValue: (value: number[] | undefined) => void
}


export default function StrokeStyle({ defaultVal, label, setValue }: Props) {
  const [strokeStyle, setStrokeStyle] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(strokeStyle)
  }, [strokeStyle])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          <button className={strokeStyle === STROKE_STYLE_DASH.NO_DASH ? styles.selectedBtn : undefined} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.NO_DASH)}>{StrokeStyleSolidIcon}</button>
          <button className={strokeStyle === STROKE_STYLE_DASH.SMALL ? styles.selectedBtn : undefined} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.SMALL)}>{StrokeStyleDottedIcon}</button>
          <button className={strokeStyle === STROKE_STYLE_DASH.LARGE ? styles.selectedBtn : undefined} onClick={() => setStrokeStyle(STROKE_STYLE_DASH.LARGE)}>{StrokeStyleDashedIcon}</button>

        </div>
      </div>
    </div>);
}

