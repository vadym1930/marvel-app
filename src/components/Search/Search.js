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
            <div className={s.cSearch__inner}>
              <label
                className={styles.oLabel + " " + s.cSearch__field}
                htmlFor="nameStartWith"
              >
                <div className={s.cSearch__field}>
                  <span className={s.cSearch__text}>
                    <span role="img" aria-label="search">
                      🔍
                    </span>{" "}
                    by name&nbsp;&nbsp;
                  </span>
                </div>
              </label>
              <div className={s.cSearch__field}>
                <input
                  onChange={onNameChange}
                  id="nameStartWith"
                  type="text"
                  value={name}
                  className={styles.oInput + " " + s.cSearch__input}
                  placeholder="type and submit"
                />
              </div>
              <div className={s.cSearch__field}>
                <button
                  className={`${styles.cBtn} ${s.cSearch__submit}`}
                  type="submit"
                >
                  go
                </button>
              </div>
              <div className={s.cSearch__field}>
                <span className={s.cSearch__small}>
                  &nbsp;and explore <i>{total}</i> characters
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
