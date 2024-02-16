
"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { STROKE_STYLE_DASH, TEXT_STYLE } from "@/app/utils/constant";
import { StrokeStyleDashedIcon, StrokeStyleDottedIcon, StrokeStyleSolidIcon } from "../icons/icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faItalic } from "@fortawesome/free-solid-svg-icons";

interface Props {
  defaultVal: {
    bold: string,
    italic: string;
  };
  label: string;
  setValue: (value: {
    bold: string,
    italic: string;
  }) => void
}


export default function TextStyle({ defaultVal, label, setValue }: Props) {
  const [bold, setBold] = useState<string>(defaultVal.bold);
  const [italic, setItalic] = useState<string>(defaultVal.italic);


  useEffect(() => {
    setValue({
      bold: bold,
      italic: italic,
    })
  }, [bold, italic, setValue])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          <button id={label} className={`${TEXT_STYLE.BOLD === bold ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setBold(prev => prev === TEXT_STYLE.BOLD ? '' : TEXT_STYLE.BOLD)}><FontAwesomeIcon icon={faBold} /></button>
          <button id={label} className={`${TEXT_STYLE.italic === italic ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setItalic(prev => prev === TEXT_STYLE.italic ? '' : TEXT_STYLE.italic)}><FontAwesomeIcon icon={faItalic} /></button>
        </div>
      </div>
    </div>);
}

