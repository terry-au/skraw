import { H3 } from "@blueprintjs/core";
import React, { Component } from "react";
import { ISnippet } from "../../Models/ISnippet";

import classNames from "classnames";
import styles from "./SnippetCell.module.scss";

interface ISnippetCellProps {
    onCellSelected?: any;
    selected: boolean;
    snippet: ISnippet;
}

// tslint:disable-next-line: no-empty-interface
interface ISnippetCellState {

}

export default class SnippetCell extends Component<ISnippetCellProps, ISnippetCellState> {

    public render() {
        return (
            <div
                className={classNames(styles["snippet-cell"], { [styles.selected]: this.props.selected })}
                onClick={this.props.onCellSelected}
            >
                <H3>{this.props.snippet.title}</H3>
                <p>{this.props.snippet.language}</p>
            </div>
        );
    }
}
