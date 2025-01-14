import styles from "./app.module.css"

import { Header } from "./components/Header";

export function App() {
  return (
    <div className={styles.container}>
      <main>
      <Header />
      </main>
    </div>
  )
}
