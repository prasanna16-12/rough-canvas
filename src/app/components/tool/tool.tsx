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



  const mouseMove = (e: any): void => {

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
    if ((e.target as any).nodeName !== "INPUT") {
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
        <button className={styles.button_primary} style={{ marginLeft: '0rem' }} onClick={hardClearCanvas}>clear</button>
        <a href="https://github.com/prasanna16-12">
          <svg style={{ cursor: 'pointer', marginLeft: '2rem' }} width="32" height="32" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
            <path
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </a>

        <a href="https://github.com/prasanna16-12/rough-canvas">
          <svg style={{ cursor: 'pointer', marginLeft: '1rem' }} width="32" height="32" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512">
            <path
              d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
          </svg>
        </a>
      </div>

    </div>
  );
}



// mode === "TEXT" ? styles.selectedBtn : undefined
