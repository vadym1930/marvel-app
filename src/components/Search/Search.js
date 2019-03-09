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
                <input
                  onChange={onNameChange}
                  id="nameStartWith"
                  type="text"
                  value={name}
                  className={styles.oInput + " " + s.cSearch__input}
                  placeholder="type start the name with and submit"
                />
                <span className={styles.oLabel__delimiter} />
              </label>
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
                  &nbsp;...&nbsp;explore <i>{total ? total : "0000"}</i>{" "}
                  characters
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
