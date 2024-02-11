
"use client"
import styles from "@/app/components/tool/tool.module.css";
import { useEffect, useState } from "react";
import { Options } from "roughjs/bin/core";
import StrokeWidth from "../common/strokeWidth";
import Sloppiness from "../common/sloppiness";
import Stroke from "../common/stroke";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FillStyle from "../common/fillStyle";
import StrokeStyle from "../common/strokeStyle";

interface Props {
  options: Options,
  setOptions: (value: Options) => void
}


export default function LineTool({ options, setOptions }: Props) {
  const [strokeWidth, setStrokeWidth] = useState<number | undefined>(options.strokeWidth);
  const [sloppines, setSloppines] = useState<number | undefined>(options.roughness);
  const [stroke, setStroke] = useState<string | undefined>(options.stroke);
  const [fillStyle, setFillStyle] = useState<string | undefined>(options.fillStyle);
  const [fill, setFill] = useState<string | undefined>(options.fill);
  const [moreOptions, setMoreOptions] = useState<boolean>(false)
  const [strokeStyle, setStrokeStyle] = useState<number[] | undefined>(options.strokeLineDash);

  useEffect(() => {
    setOptions((prevOpt: Options) => {
      return { ...prevOpt, strokeWidth: strokeWidth, roughness: sloppines, stroke: stroke, fill: fill, fillStyle: fillStyle, strokeLineDash: strokeStyle }
    })
  }, [strokeWidth, sloppines, stroke, fill, fillStyle, strokeStyle])

  return (
    <div className={styles.moreTools}>
      <StrokeWidth defaultVal={strokeWidth as number} min={1} max={50} label="Stroke width" setValue={setStrokeWidth} />
      <div className={styles.dividerVertical}></div>
      <Sloppiness defaultVal={sloppines as number} label="Sloppiness" setValue={setSloppines} />
      <div className={styles.dividerVertical}></div>
      <Stroke defaultVal={stroke as string} label="Stroke" setValue={setStroke} isFillCompont={false} />
      <div className={styles.dividerVertical}></div>
      <div style={{ marginRight: '1rem' }} onClick={() => setMoreOptions(prev => !prev)}>
        {
          !moreOptions ? <FontAwesomeIcon icon={faCaretDown} color="black" size="xl" /> :
            <FontAwesomeIcon icon={faCaretUp} color="black" size="xl" />
        }

      </div>
      <div className={styles.dividerVertical}></div>
      {
        moreOptions ?
          <div className={styles.moreOptionsModel}>
            {/* <Stroke defaultVal={fill as string} label="Fill" setValue={setFill} isFillCompont={true} />
            <div className={styles.dividerHorizontal}></div>
            {
              fill ?
                <>
                  <FillStyle defaultVal={fillStyle as string} label="Fill style" setValue={setFillStyle} />
                  <div className={styles.dividerHorizontal}></div>
                </>
                : null
            } */}
            <StrokeStyle defaultVal={strokeStyle as number[]} label={"Stroke style"} setValue={setStrokeStyle} />
          </div>
          : null
      }
    </div>
  );
}
//
