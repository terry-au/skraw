import React, { Component } from "react";
import { ISnippet } from "../Model/ISnippet";
import SnippetCell from './SnippetCell';
import { InputGroup, Button, Icon } from "@blueprintjs/core";

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
      <div className={this.props.className}>
        <InputGroup
          leftIcon="search"
          value={this.state.searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            return this.setState({ searchTerm: e.target.value });
          }}
          rightElement={
            (this.state.searchTerm
              ?
              <Button
                minimal={true}
                icon="cross"
                onClick={this.clearSearchTerm}
              />
              :
              undefined
            )
          }
        />
        {this.snippetElements()}
      </div>
    );
  }

  private snippetElements = (): JSX.Element[] => {
    const snippets: JSX.Element[] = [];
    this.props.snippets.forEach(element => {
      const cell = (
        <SnippetCell title={element.title} />
      )
      snippets.push(cell);
    });
    return snippets;
  }

  private clearSearchTerm = () => {
    this.setState(
      {
        searchTerm: ""
      }
    );
  }
}