import React from "react";
import styles from "../../shared/app.scss";
export const Message = props => (
  <div className={styles.cError}>
    {props.msg}
    <span role="img" aria-label={props.label}>
      {props.emoji}
    </span>
  </div>
);
