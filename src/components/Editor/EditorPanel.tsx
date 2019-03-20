import { NonIdealState } from "@blueprintjs/core";
import classNames from "classnames";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { Component } from "react";
import { ISnippet } from "../../models/ISnippet";
import styles from "./Editor.module.scss";
import ResizableMonacoEditor from "./ResizableMonacoEditor";

interface IEditorProps {
    className?: string;
    darkTheme?: boolean;
    height?: number;
    onSelectedSnippetDidUpdate: (snippet: ISnippet) => void;
    selectedSnippet: ISnippet | null;
    width?: number;
}

export default class EditorPanel extends Component<IEditorProps> {

    constructor(props: IEditorProps) {
        super(props);
        this.state = {
            selectedSnippet: props.selectedSnippet,
        };
    }

    public render() {
        const classes = classNames(this.props.className, styles.editor);
        return (
            <div className={classes}>
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
                <ResizableMonacoEditor
                    width={this.props.width}
                    height={this.props.height}
                    language={snippet.language}
                    theme={this.getTheme()}
                    onChange={this.onEditorChange}
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

    private onEditorChange = (value: string, event: monaco.editor.IModelContentChangedEvent) => {
        const snippet: ISnippet = {...this.props.selectedSnippet!};
        snippet.body = value;
        this.props.onSelectedSnippetDidUpdate(snippet);
    }

    private getTheme = (): string => {
        return this.props.darkTheme ? "vs-dark-skraw" : "vs-skraw";
    }
}
