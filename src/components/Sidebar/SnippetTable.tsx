import { Button, IResizeEntry } from "@blueprintjs/core";
import classNames from "classnames";
import _ from "lodash";
import HashStatic from "object-hash";
import React, { Component } from "react";
import { ISnippet, querySnippets } from "../../models/ISnippet";
import SearchBar from "../Widgets/SearchBar";
import SnippetCell from "./SnippetCell";
import styles from "./SnippetTable.module.scss";

interface ISnippetTableProps {
    className?: string;
    darkTheme?: boolean;
    onSelectSnippet?: (snippet: ISnippet, callback: () => void) => void;
    onSetDarkTheme?: (darkTheme: boolean) => void;
    selectedSnippet?: ISnippet | null;
    snippets: ISnippet[];
}

interface ISnippetTableState {
    height: number;
    searchTerm: string;
    selectedSnippet?: ISnippet | null;
    width: number;
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
            <div className={classNames(this.props.className, styles.table)}>
                <div className={styles.header}>
                    <SearchBar
                        className={styles["search-field"]}
                        onSearchTermChange={this.onSearchTermChange}
                        placeholder="Search for a snippet..."
                    />
                    <Button className={styles["add-button"]} minimal={true} icon="insert" />
                </div>
                <div className={styles["snippet-list"]}>
                    {this.generateSnippetElements(this.state.searchTerm)}
                </div>
                <div className={styles.footer}>
                    <Button
                        icon={this.getDarkModeIcon()}
                        minimal={true}
                        name="Toggle dark mode"
                        onClick={this.toggleDarkTheme}
                    />
                </div>
            </div>
        );
    }

    private getDarkModeIcon = (): "flash" | "moon" => {
        return this.props.darkTheme ? "flash" : "moon";
    }

    private toggleDarkTheme = () => {
        this.props.onSetDarkTheme(!this.props.darkTheme);
    }

    private onSearchTermChange = (searchTerm: string) => {
        this.setState({ searchTerm });
    }

    private generateSnippetElements = (filter: string): JSX.Element[] => {
        const snippets: JSX.Element[] = [];
        const searchedSnippets = querySnippets(this.props.snippets, this.state.searchTerm);

        searchedSnippets.forEach((snippetResult) => {
            const highlightMetadata = _(snippetResult.matches).keyBy("key").value();

            const snippet = snippetResult.item;
            let isSelected = false;
            if (this.state.selectedSnippet) {
                isSelected = this.state.selectedSnippet.uuid === snippet.uuid;
            }

            /*
            Hashing the search term and the UUID to ensure that renders are performed correctly
            on cells with highlighted text.
             */
            const cellKey = HashStatic([this.state.searchTerm, snippet.uuid]);
            const cell = (
                <SnippetCell
                    highlightMetadata={highlightMetadata}
                    key={cellKey}
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
            if (this.props.onSelectSnippet) {
                this.props.onSelectSnippet(snippet, () => {
                    this.setState({ selectedSnippet: snippet });
                });
            }
        };
    }
}
