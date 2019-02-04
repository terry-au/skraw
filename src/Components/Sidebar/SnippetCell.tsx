import React, { Component } from "react";
import { H3 } from '@blueprintjs/core';
import { ISnippet } from '../../Models/ISnippet';

import styles from "./SnippetCell.module.scss";
import classNames from "classnames";

interface ISnippetCellProps {
  onCellSelected?: any;
  selected: boolean;
  snippet: ISnippet;
}

interface ISnippetCellState {

}

export default class SnippetCell extends Component<ISnippetCellProps, ISnippetCellState> {

  public render() {
    return (
      <div
        className={classNames(styles["snippet-cell"], { [styles["selected"]]: this.props.selected })}
        onClick={this.props.onCellSelected}
      >
        <H3>{this.props.snippet.title}</H3>
        <p>{this.props.snippet.language}</p>
      </div >
    );
  }
}