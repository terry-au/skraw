import React, { Component } from "react";
import { Card, H2 } from '@blueprintjs/core';

interface ISnippetCellProps {
  title: string;
}

interface ISnippetCellState {

}

export default class SnippetCell extends Component<ISnippetCellProps, ISnippetCellState> {

  public render() {
    return (
      <Card
        interactive={true}
      >
        <H2>{this.props.title}</H2>
      </Card>
    );
  }
}