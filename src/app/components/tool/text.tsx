
"use client"
import styles from "@/app/components/tool/tool.module.css";
import { useEffect, useState } from "react";
import { Options } from "roughjs/bin/core";
import StrokeWidth from "../common/strokeWidth";
import { useCanvas } from "@/app/hooks/useCanvas";
import { getCursorImage } from "@/app/utils/cursor";
import { TextOption } from "@/app/utils/typings";
import FontFamily from "../common/fontFamily";
import Stroke from "../common/stroke";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import TextStyle from "../common/textStyle";

interface Props {
  options: TextOption,
  setOptions: (value: TextOption) => void
}


export default function TextTool({ options, setOptions }: Props) {
  const [fontFamily, setFontFamily] = useState<string>(options.fontFamily);
  const [fontSize, setFontSize] = useState<number>(options.fontSize);
  const [textStyle, setTextStyle] = useState<any>({bold: options.bold, italic: options.italic});
  const [color, setColor] = useState<string>(options.color);
  const [moreOptions, setMoreOptions] = useState<boolean>(false)



  useEffect(() => {
    setOptions((prevOpt: TextOption) => {
      return {...prevOpt, fontFamily, fontSize, color , ...textStyle}
    })
  }, [fontFamily, fontSize, color, textStyle, setOptions])


  return (
    <div className={styles.moreTools}>
      <FontFamily defaultVal={fontFamily as string} label="Font family" setValue={setFontFamily} />
      <div className={styles.dividerVertical}></div>
      <StrokeWidth defaultVal={fontSize} label="Font size" setValue={setFontSize} min={12} max={126}/>
      <div className={styles.dividerVertical}></div>
      <Stroke defaultVal={color} label="Color" isFillCompont={false} setValue={setColor}/>
      <div className={styles.dividerVertical}></div>
      <button id="expand" style={{ marginRight: '1rem', background: 'none', border:'none' }} onClick={() => setMoreOptions(prev => !prev)}>
        {
          !moreOptions ? <FontAwesomeIcon icon={faCaretDown} color="black" size="xl" /> :
            <FontAwesomeIcon icon={faCaretUp} color="black" size="xl" />
        }

      </button>
      <div className={styles.dividerVertical}></div>
      {
        moreOptions ?
          <div className={styles.moreOptionsModel}>
            <TextStyle defaultVal={textStyle} label="Text style" setValue={setTextStyle}  />
          </div>
          : null
      }
    </div>
  );
}

