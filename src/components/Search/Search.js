import React, { Component } from "react";
import styles from "../../shared/app.scss";
import s from "./search.scss";

export class Search extends Component {
  constructor(props) {
    super(props);
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.fetch();
  };
  render() {
    const { name, onNameChange, total } = this.props;
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label className={styles.oLabel} htmlFor="nameStartWith">
              <span role="img" aria-label="search">
                🔍
              </span>{" "}
              by name&nbsp;
              <input
                onChange={onNameChange}
                id="nameStartWith"
                type="text"
                value={name}
                className={styles.oInput + " " + s.cSearch__input}
                placeholder="type and submit"
              />
              <button
                className={`${styles.cBtn} ${s.cSearch__submit}`}
                type="submit"
              >
                go
              </button>
            </label>
            <span className={s.cSearch__small}>
              and explore <i>{total}</i> pers in the base
            </span>
          </form>
        </div>
      </div>
    );
  }
}
