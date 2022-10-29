import styles from "./styles.module.scss";

import igniteLogo from "../../assets/ignite-logo.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="Logotipo do Ignite" />
      <strong>Ignite Feed</strong>
    </header>
  );
}
