import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

import { NonIdealState } from "@blueprintjs/core";
import { ISnippet } from "../../Models/ISnippet";
import styles from "./Editor.module.css";

interface IEditorProps {
    height: number;
    selectedSnippet?: ISnippet | null;
}

// tslint:disable-next-line: no-empty-interface
interface IEditorState {

}

export default class Editor extends Component<IEditorProps, IEditorState> {
    public render() {
        return (
            <div className={styles.editor}>
                {this.getEditorElement()}
            </div>
        );
    }

    private getEditorElement = () => {
        const options = {
            selectOnLineNumbers: true,
        };

        const snippet = this.props.selectedSnippet;
        let displayedElement;
        if (snippet) {
            displayedElement = (
                <MonacoEditor
                    width="100%"
                    height={this.props.height}
                    language={snippet.language}
                    theme="vs-dark"
                    options={options}
                    value={snippet.body}
                />
            );
        } else {
            const style = {
                height: this.props.height + "px",
            };
            displayedElement = (
                <div style={style}>
                    <NonIdealState
                        icon="code"
                        title={"Select or create a snippet."}
                    />
                </div>
            );
        }

        return displayedElement;
    }
}
