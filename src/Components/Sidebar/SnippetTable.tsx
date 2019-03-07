import React, {Component} from "react";
import {ISnippet} from "../../Models/ISnippet";
import SnippetCell from './SnippetCell';

import styles from "./SnippetTable.module.scss";
import SearchBar from "../Widgets/SearchBar";
import {Button, IResizeEntry} from '@blueprintjs/core';

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
            searchTerm: "",
            selectedSnippet: props.selectedSnippet,
            width: 0,
            height: 0
        };
    }

    public render() {
        return (
            <div className={styles["table"]}>
                <div className={styles["header"]}>
                    <SearchBar className={styles["search-field"]} placeholder="Search for a snippet..."/>
                    <Button className={styles["add-button"]} minimal={true} icon="insert"/>
                </div>
                <div className={styles["item-container"]}>
                    <div className={styles["body"]}>
                        {this.snippetElements(this.state.searchTerm)}
                    </div>
                </div>
            </div>
        );
    }

    private snippetElements = (filter: string): JSX.Element[] => {
        const snippets: JSX.Element[] = [];
        this.props.snippets.forEach(snippet => {
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
            );
            snippets.push(cell);
        });
        return snippets;
    };

    private handleTableResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[entries.length - 1];
        this.setState({
            height: resizeEntry.contentRect.height,
            width: resizeEntry.contentRect.width,
        });
    };

    private onCellSelected = (snippet: ISnippet) => {
        this.setState({selectedSnippet: snippet});

        if (this.props.onSelectSnippet) {
            this.props.onSelectSnippet(snippet);
        }
    }
}