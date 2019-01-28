import React, { Component } from "react";
import { ISnippet } from "../../Model/ISnippet";
import SnippetCell from './SnippetCell';
import { InputGroup, Button, Icon } from "@blueprintjs/core";

import styles from "./SnippetTable.module.scss";
import SearchBar from "../Widgets/SearchBar";

interface ISnippetTableProps {
  className?: string;
  onSelectSnippet?: any;
  snippets: ISnippet[];
  selectedSnippet?: ISnippet | null;
}

interface ISnippetTableState {
  searchTerm: string;
  selectedSnippet?: ISnippet | null;
}

export default class SnippetTable extends Component<ISnippetTableProps, ISnippetTableState> {

  constructor(props: Readonly<ISnippetTableProps>) {
    super(props);

    this.state = {
      searchTerm: "",
      selectedSnippet: props.selectedSnippet
    };
  }

  public render() {
    return (
      <div className={styles["table"]}>
        <div className={styles["header"]}>
          <SearchBar searchTerm="" />
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
      console.log(this.state.selectedSnippet);
      console.log(snippet);
      console.log(this.state.selectedSnippet === snippet);

      let isSelected = false;
      if (this.state.selectedSnippet) {
        isSelected = (this.state.selectedSnippet as ISnippet).uuid == snippet.uuid;
      }

      const cell = (
        <SnippetCell
          onCellSelected={() => {
            this.onCellSelected(snippet);
          }}
          selected={isSelected}
          snippet={snippet}
        />
      )
      snippets.push(cell);
    });
    return snippets;
  }

  private onCellSelected = (snippet: ISnippet) => {
    this.setState({ selectedSnippet: snippet });
    console.log(snippet);

    if (this.props.onSelectSnippet) {
      this.props.onSelectSnippet(snippet);
    }
  }
}