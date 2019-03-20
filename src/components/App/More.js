import React from "react";
import styles from "../../shared/app.scss";
export const More = props => (
  <div className={styles.cMain__more}>
    <button
      className={props.btnCssClasses.join(" ")}
      onClick={() =>
        props.fetchPersByStartName(props.charactersOffset + props.limit)
      }
    >
      loaded {props.list.length}
      {props.total - props.list.length > 0
        ? `, but ${props.total - props.list.length} left -> load more`
        : ", nothing to load more"}
    </button>
  </div>
);
