
"use client"

import styles from "./common.module.css";
import { useEffect, useState } from "react";
import { SloppinessArchitectIcon, SloppinessArtistIcon, SloppinessCartoonistIcon } from "../icons/icon";

interface Props {
  defaultVal: number;
  label: string;
  setValue: (value: number) => void
}


export default function Sloppiness({ defaultVal, label, setValue }: Props) {
  const [slopVal, setSlopVal] = useState<any>(defaultVal);

  useEffect(() => {
    setValue(slopVal)
  }, [setValue, slopVal])

  return (
    <div className={styles.options}>
      <p>{label}</p>

      <div className={styles.optionValuePicker}>
        <div className={styles.paletes}>
          <button className={`${slopVal === 0 ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setSlopVal(0)}>{SloppinessArchitectIcon}</button>
          <button className={`${slopVal === 1 ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setSlopVal(1)}>{SloppinessArtistIcon}</button>
          <button className={`${slopVal === 3 ? styles.selectedSsecondaryBtn : undefined} ${styles.button_secondary}`} onClick={() => setSlopVal(3)}>{SloppinessCartoonistIcon}</button>

        </div>
      </div>
    </div>

  );
}

