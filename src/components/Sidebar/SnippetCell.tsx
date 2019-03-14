import { H3 } from "@blueprintjs/core";
import classNames from "classnames";
import _ from "lodash";
import React, { Component, createElement } from "react";
import { ISnippet, ISnippetQueryResultMatch } from "../../models/ISnippet";
import styles from "./SnippetCell.module.scss";

interface ISnippetCellProps {
    highlightMetadata: { [fieldName: string]: ISnippetQueryResultMatch };
    onCellSelected?: any;
    selected: boolean;
    snippet: ISnippet;
}

// tslint:disable-next-line: no-empty-interface
interface ISnippetCellState {

}

export default class SnippetCell extends Component<ISnippetCellProps, ISnippetCellState> {

    public render() {
        const indexList = this.props.highlightMetadata;

        const titleIndices = _(indexList).get("title.indices", null) as any as [[number, number]];
        const languageIndices = _(indexList).get("language.indices", null) as any as [[number, number]];

        const titleEntities = this.highlightText(this.props.snippet.title, titleIndices);
        const languageEntities = this.highlightText(this.props.snippet.language, languageIndices);

        return (
            <div
                className={classNames(styles["snippet-cell"], { [styles.selected]: this.props.selected })}
                onClick={this.props.onCellSelected}
            >
                <H3>{titleEntities}</H3>
                <p>{languageEntities}</p>
            </div>
        );
    }

    private createTextSubElement(text: string, range: [number, number], className: string = "") {
        /* String.prototype.substring's second argument is the character after the end of the substring. */
        const substring = text.substring(range[0], range[1] + 1);

        return (<span className={className}>{substring}</span>);
    }

    private highlightText = (text: string, indices: [[number, number]] | null) => {
        /* If indices is null, no searches have been performed. */
        if (!indices) {
            return <React.Fragment>{text}</React.Fragment>;
        }

        const elements: JSX.Element[] = [];
        let index = 0;
        indices.forEach((indexPair: [number, number]) => {
            /* Before/between matches. */
            if (index < indexPair[0]) {
                elements.push(this.createTextSubElement(text, [index, indexPair[0] - 1]));
                index = indexPair[0];
            }
            /* Matches. */
            elements.push(this.createTextSubElement(text, indexPair, styles["search-result-match"]));
            index = indexPair[1] + 1;
        });
        /* After matches. */
        elements.push(this.createTextSubElement(text, [index, text.length - 1]));

        return elements;
    }
}
