
import Canvas from "./components/canvas/canvas";
import Tool from "./components/tool/tool";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Tool />
      <Canvas />
    </main>
  );
}
