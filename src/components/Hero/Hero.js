import React from "react";
import a from "../../shared/app.scss";
import styles from "./hero.scss";
import u from "../../shared/utils.scss";

export const Hero = props => (
  <div className={styles.cItem}>
    <div className={styles.cItem__inner}>
      <div className={styles.cItem__name}>{props.item.name}</div>
      <div className={styles.cItem__details}>
        <a
          href={
            props.item.urls[1] ? props.item.urls[1].url : props.item.urls[0].url
          }
          target="_blanc"
          className={styles.cItem__img}
        >
          <img
            src={`${props.item.thumbnail.path}.${
              props.item.thumbnail.extension
            }`}
            alt={props.item.name}
          />
        </a>
        <div className={styles.cItem__description}>
          {props.item.description
            ? props.item.description
            : "No description provided by API. See more via link below"}
        </div>

        <div className={styles.cItem__more}>
          <a
            className={`${u.isActive} ${a.cBtn}`}
            rel="nofollow"
            target="blanc"
            href={
              props.item.urls[1]
                ? props.item.urls[1].url
                : props.item.urls[0].url
            }
          >
            Details
          </a>
        </div>
      </div>
    </div>
  </div>
);
