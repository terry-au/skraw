import React, { Component } from "react";
import { ISnippet } from "../../Model/ISnippet";
import SnippetCell from './SnippetCell';
import { InputGroup, Button, Icon } from "@blueprintjs/core";

import styles from "./SnippetTable.module.scss";
import SearchBar from "../Widgets/SearchBar";

interface ISnippetTableProps {
  className?: string;
  snippets: ISnippet[];
}

interface ISnippetTableState {
  searchTerm: string;
}

export default class SnippetTable extends Component<ISnippetTableProps, ISnippetTableState> {

  constructor(props: Readonly<ISnippetTableProps>) {
    super(props);

    this.state = {
      searchTerm: ""
    };
  }

  public render() {
    return (
      <div className={styles["table"]}>
        <div className={styles["header"]}>
          <SearchBar searchTerm=""/>
        </div>
        <div className={styles["body"]}>
          {this.snippetElements(this.state.searchTerm)}
        </div>
      </div>
    );
  }

  private snippetElements = (filter: string): JSX.Element[] => {
    const snippets: JSX.Element[] = [];
    this.props.snippets.forEach(snippet => {
      const cell = (
        <SnippetCell selected={true} snippet={snippet} />
      )
      snippets.push(cell);
    });
    return snippets;
  }
}