import React from "react";
import styles from "./Footer.scss";

export const FooterContent = props => (
  <div className={styles.cFooter}>
    <p>{props.children}</p>
  </div>
);
