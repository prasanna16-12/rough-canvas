
"use client"
import styles from "@/app/components/tool/tool.module.css";
import { useEffect, useState } from "react";
import { Options } from "roughjs/bin/core";
import StrokeWidth from "../common/strokeWidth";
import { useCanvas } from "@/app/hooks/useCanvas";
import { getCursorImage } from "@/app/utils/cursor";

interface Props {
  options: any,
  setOptions: (value: any) => void
}


export default function EraserTool({ options, setOptions }: Props) {
  const [strokeWidth, setStrokeWidth] = useState<number | undefined >(options?.strokeWidth);

  const {
    canvasRef
  }: any = useCanvas();

  useEffect(() => {
    canvasRef.current.style.cursor = `url(${getCursorImage(strokeWidth!)}) ${strokeWidth!} ${strokeWidth!}, auto`;
    setOptions((prevOpt: Options) => {
      return { ...prevOpt, strokeWidth: strokeWidth as number, }
    })
  }, [canvasRef, setOptions, strokeWidth])

  return (
    <div className={styles.moreTools}>
      <StrokeWidth defaultVal={strokeWidth as number} min={1} max={50} label="Stroke width" setValue={setStrokeWidth} />
      <div className={styles.dividerVertical}></div>
    </div>
  );
}

