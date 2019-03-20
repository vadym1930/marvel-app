import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";
import { FooterContent } from "../FooterContent/FooterContent";
import { Search } from "../Search/Search";
import "normalize.css";
import { Pagination } from "../Pagination/Pagination";
import styles from "../../shared/app.scss";
import u from "../../shared/utils.scss";
import { Message } from "./Message";
import { More } from "./More";
import { withTwoComponents } from "./withTwoComponents";
import { Results } from "./Results";

import {
  PARAM_NAME_STARTS_WITH,
  PARAM_API_KEY,
  PARAM_LIMIT,
  PARAM_OFFSET,
  BASE_URL,
  API_KEY
} from "../../shared/constants";

const MoreWithPagination = withTwoComponents(More, Pagination);
const MessageWithResults = withTwoComponents(Results, Message);

class App extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;

    this.state = {
      isLoaded: false,
      all: {
        1: {
          charactersOffset: 0,
          list: [],
          total: null,
          pages: null
        }
      },
      limit: 8,
      searchTerm: "",
      askedPage: 0,
      pers: {},
      // that help hide previouse result status — button.
      isSearchTermChangedBeforeSubmit: false,
      error: null
    };
  }

  componentDidMount() {
    this._isMounted = true;

    // first default call of fetch.
    this.fetchCharacters();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needToFetch = page => {
    const { searchTerm, pers, all } = this.state;
    this.setState({ isSearchTermChangedBeforeSubmit: true });

    if (searchTerm) {
      return (pers && pers[searchTerm] && pers[searchTerm].hits) || false;
    } else {
      return (all && all[page] && all && all[page].list.length) || false;
    }
  };

  fetchCharacters = (offset = 0, page = 1) => {
    this.setState({ askedPage: page });

    if (!this.needToFetch(page)) {
      this.setState({ isLoaded: false, isSearchTermChangedBeforeSubmit: true });

      let url;
      const { limit, searchTerm } = this.state;

      if (searchTerm) {
        url = `${BASE_URL}?${PARAM_NAME_STARTS_WITH}${searchTerm}&${PARAM_LIMIT}${limit}&${PARAM_OFFSET}${offset}&${PARAM_API_KEY}${API_KEY}`;
      } else {
        url = `${BASE_URL}?${PARAM_LIMIT}${limit}&${PARAM_OFFSET}${offset}&${PARAM_API_KEY}${API_KEY}`;
      }
      axios
        .get(url)
        .then(res => this._isMounted && this.setCharacters(res.data.data))
        .catch(error => this.setState({ error }));
    }
  };

  fetchPersByStartName = (offset = 0) => {
    const { searchTerm, limit } = this.state;

    this.setState({ isLoaded: false, isSearchTermChangedBeforeSubmit: true });

    const url = `${BASE_URL}?${PARAM_NAME_STARTS_WITH}${searchTerm}&${PARAM_LIMIT}${limit}&${PARAM_OFFSET}${offset}&${PARAM_API_KEY}${API_KEY}`;

    axios
      .get(url)
      .then(res => this._isMounted && this.setCharacters(res.data.data))
      .catch(error => this.setState({ error }));
  };

  setCharacters = res => {
    const { results, offset, total, limit } = res;
    const page = offset / limit + 1;

    if (!results.length) {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
    }

    const { all, pers, searchTerm } = this.state;

    if (searchTerm) {
      // search case
      const oldHits = (pers && pers[searchTerm] && pers[searchTerm].hits) || [];

      const updatedList = [...results, ...oldHits];
      this.setState({
        pers: {
          ...pers,
          [searchTerm]: {
            hits: updatedList,
            page,
            total,
            pages: total / limit,
            charactersOffset: offset
          }
        },
        isLoaded: true
      });
    } else {
      // pagination case
      const oldPages = (all && all) || {};
      const newPage = {
        [page]: {
          list: results,
          charactersOffset: offset,
          total,
          pages: total / limit
        }
      };
      this.setState({
        all: {
          ...oldPages,
          ...newPage
        },
        isLoaded: true,
        allTogether: total
      });
    }
  };

  onNameChange = e => {
    const { pers } = this.state;

    let flag = false;

    if (e.target.value in pers) {
      flag = true;
    }

    this.setState({
      searchTerm: e.target.value,
      isSearchTermChangedBeforeSubmit: flag
    });
  };

  defineEssentialsVarsForSearch = (source, term) => {
    const list =
      (source && source[term] && source[term] && source[term].hits) || [];
    const charactersOffset =
      (source &&
        source[term] &&
        source[term] &&
        source[term].charactersOffset) ||
      0;
    const pages =
      (source && source[term] && source[term] && source[term].pages) || null;
    const total =
      (source && source[term] && source[term] && source[term].total) || null;

    return {
      list,
      charactersOffset,
      pages,
      total
    };
  };

  defineEssentialsVars = (source, askedPage) => {
    const list = (source && source[askedPage] && source[askedPage].list) || [];
    const charactersOffset =
      (source[askedPage] && source[askedPage].charactersOffset) || 0;
    const pages =
      (source && source[askedPage] && source[askedPage].pages) || null;
    const total =
      (source && source[askedPage] && source[askedPage].total) || null;

    return {
      list,
      charactersOffset,
      pages,
      total
    };
  };

  render() {
    const {
      isLoaded,
      searchTerm,
      askedPage,
      all,
      pers,
      limit,
      allTogether,
      isSearchTermChangedBeforeSubmit,
      error
    } = this.state;
    let essentialVariables = {};
    let btnCssClasses;

    if (error)
      return (
        <Message
          label="Something went wrong, sorry..."
          emoji="🤒"
          msg="Something went wrong, sorry..."
        />
      );

    // handle variables when search name inputed.
    if (searchTerm) {
      essentialVariables = this.defineEssentialsVarsForSearch(pers, searchTerm);

      // add btn classes depending on the state changing.
      btnCssClasses = [`${styles.cBtn}`, `${styles.cMain__more}`];
      if (!isLoaded) {
        btnCssClasses.push(u.isHidden);
      }
      if (!isSearchTermChangedBeforeSubmit && !essentialVariables.list.length) {
        btnCssClasses.push(u.isHidden);
      }
      if (essentialVariables.total <= essentialVariables.list.length) {
        btnCssClasses.push(u.isDisabled);
      } else {
        btnCssClasses.push(u.isBlack);
      }
      // handle scenarion when going throught pages.
    } else {
      essentialVariables = this.defineEssentialsVars(all, askedPage);
    }

    return (
      <div className={styles.cApp}>
        <header className={styles.cApp__header}>
          <div className={styles.oContainer}>
            <div className={styles.cApp__search}>
              <Search
                name={searchTerm}
                fetch={this.fetchCharacters}
                onNameChange={this.onNameChange}
                total={allTogether}
              />
            </div>
          </div>
        </header>
        <main className={styles.cApp__main}>
          <div className={styles.oContainer}>
            <div className={styles.cMain__inner}>
              <div className={styles.cMain__results}>
                <MessageWithResults
                  flag={isLoaded}
                  msg="Loading"
                  emoji="👀"
                  label="loading"
                  list={essentialVariables.list}
                />
              </div>
              <MoreWithPagination
                list={essentialVariables.list}
                charactersOffset={essentialVariables.charactersOffset}
                pages={essentialVariables.pages}
                total={essentialVariables.total}
                flag={searchTerm}
                btnCssClasses={btnCssClasses}
                fetchPersByStartName={this.fetchPersByStartName}
                limit={limit}
                fetchCharacters={this.fetchCharacters}
                collection={all && all}
              />
            </div>
          </div>
        </main>
        <footer>
          <div className={styles.oContainer}>
            <FooterContent>
              Data provided by Marvel. © 2014 Marvel
            </FooterContent>
          </div>
        </footer>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
