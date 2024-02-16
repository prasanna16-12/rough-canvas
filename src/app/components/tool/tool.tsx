"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/app/components/tool/tool.module.css";
import { faA, faCircle, faEraser, faMinus, faPen, faSquare, faVectorSquare } from "@fortawesome/free-solid-svg-icons";
import { MODE } from "@/app/utils/constant";
import { useCanvas } from "@/app/hooks/useCanvas";
import PencilTool from "./pencil";
import { MouseEvent, useRef } from "react";
import LineTool from "./line";
import EraserTool from "./eraser";
import TextTool from "./text";



export default function Tool() {

  const tool = useRef<HTMLDivElement>(null);
  let newPosX = 0, newPosY = 0, startPosX = 0, startPosY = 0;



  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {

    if (tool.current) {
      newPosX = startPosX - e.clientX;
      newPosY = startPosY - e.clientY;
  
      // with each move we also want to update the start X and Y
      startPosX = e.clientX;
      startPosY = e.clientY;
  
      // set the element's new position:
      tool.current.style.top = (tool.current.offsetTop - newPosY) + "px";
      tool.current.style.left = (tool.current.offsetLeft - newPosX) + "px";
    }
   
  }

  const grab = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (e.target.nodeName !== "INPUT") {
      startPosX = e.clientX;
      startPosY = e.clientY;
      document.addEventListener('mousemove', mouseMove);

      document.addEventListener('mouseup', function () {
        document.removeEventListener('mousemove', mouseMove);
      });
    }

  }


  const {
    hardClearCanvas,
    eraser,
    pencil,
    text,
    select,
    mode,
    line,
    rectangle,
    circle,
    setPencilOption,
    pencilOption,
    setEraserOption,
    eraserOption,
    setRectangleOption,
    rectangleOption,
    setCircleOption,
    circleOption,
    setLineOption,
    lineOption,
    textOption,
    setTextOption
  }: any = useCanvas();

  return (
    <div className={styles.tool} ref={tool} onMouseDown={grab}>
      <div >
        <button className={`${mode === MODE.PENCIL ? styles.selectedBtn : null} ${styles.button_primary}`} onClick={pencil}><FontAwesomeIcon icon={faPen} size="lg" />
        </button>
        <button className={`${mode === MODE.ERASER ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={eraser}><FontAwesomeIcon icon={faEraser} size="lg" /></button>
        <button className={`${mode === MODE.TEXT ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={text}><FontAwesomeIcon icon={faA} size="lg" /></button>
        <button className={`${mode === MODE.LINE ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={line}><FontAwesomeIcon icon={faMinus} size="lg" /></button>
        <button className={`${mode === MODE.RECTANGLE ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={rectangle}><FontAwesomeIcon icon={faSquare} size="lg" /></button>
        <button className={`${mode === MODE.CIRCLE ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={circle}><FontAwesomeIcon icon={faCircle} size="lg" /></button>
        <button className={`${mode === MODE.SELECT ? styles.selectedBtn : undefined} ${styles.button_primary}`} onClick={select}><FontAwesomeIcon icon={faVectorSquare} size="lg" /></button>

      </div>
      <div style={{ marginRight: '1rem', display: 'flex' }}>
        {
          mode === MODE.PENCIL ? <PencilTool options={pencilOption} setOptions={setPencilOption} /> : null
        }
        {
          mode === MODE.ERASER ? <EraserTool options={eraserOption} setOptions={setEraserOption} /> : null
        }
        {
          mode === MODE.RECTANGLE ? <PencilTool options={rectangleOption} setOptions={setRectangleOption} /> : null
        }
        {
          mode === MODE.CIRCLE ? <PencilTool options={circleOption} setOptions={setCircleOption} /> : null
        }
        {
          mode === MODE.LINE ? <LineTool options={lineOption} setOptions={setLineOption} /> : null
        }
        {
          mode === MODE.TEXT ? <TextTool options={textOption} setOptions={setTextOption} /> : null
        }
        <button className={styles.button_primary} style={{marginLeft: '0rem'}} onClick={hardClearCanvas}>clear</button>
      </div>

    </div>
  );
}



// mode === "TEXT" ? styles.selectedBtn : undefined
