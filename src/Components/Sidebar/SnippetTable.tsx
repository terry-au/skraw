import React, { Component } from "react";
import { ISnippet } from "../../Models/ISnippet";
import SnippetCell from "./SnippetCell";

import { Button, IResizeEntry } from "@blueprintjs/core";
import SearchBar from "../Widgets/SearchBar";
import styles from "./SnippetTable.module.scss";

interface ISnippetTableProps {
    className?: string;
    onSelectSnippet?: any;
    snippets: ISnippet[];
    selectedSnippet?: ISnippet | null;
}

interface ISnippetTableState {
    searchTerm: string;
    selectedSnippet?: ISnippet | null;
    width: number;
    height: number;
}

export default class SnippetTable extends Component<ISnippetTableProps, ISnippetTableState> {

    constructor(props: Readonly<ISnippetTableProps>) {
        super(props);

        this.state = {
            height: 0,
            searchTerm: "",
            selectedSnippet: props.selectedSnippet,
            width: 0,
        };
    }

    public render() {
        return (
            <div className={styles.table}>
                <div className={styles.header}>
                    <SearchBar className={styles["search-field"]} placeholder="Search for a snippet..." />
                    <Button className={styles["add-button"]} minimal={true} icon="insert" />
                </div>
                <div className={styles["snippet-list"]}>
                    {this.snippetElements(this.state.searchTerm)}
                </div>
            </div>
        );
    }

    private snippetElements = (filter: string): JSX.Element[] => {
        const snippets: JSX.Element[] = [];
        this.props.snippets.forEach((snippet) => {
            let isSelected = false;
            if (this.state.selectedSnippet) {
                isSelected = (this.state.selectedSnippet as ISnippet).uuid === snippet.uuid;
            }

            const cell = (
                <SnippetCell
                    onCellSelected={this.onCellSelected(snippet)}
                    selected={isSelected}
                    snippet={snippet}
                />
            );
            snippets.push(cell);
        });
        return snippets;
    }

    private handleTableResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[entries.length - 1];
        this.setState({
            height: resizeEntry.contentRect.height,
            width: resizeEntry.contentRect.width,
        });
    }

    private onCellSelected = (snippet: ISnippet) => {
        return () => {
            this.setState({ selectedSnippet: snippet });

            if (this.props.onSelectSnippet) {
                this.props.onSelectSnippet(snippet);
            }
        };
    }
}
