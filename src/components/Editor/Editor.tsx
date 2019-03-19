import { NonIdealState } from "@blueprintjs/core";
import classNames from "classnames";
import React, { Component } from "react";
import { ISnippet } from "../../models/ISnippet";
import styles from "./Editor.module.scss";
import ResizableMonacoEditor from "./ResizableMonacoEditor";

interface IEditorProps {
    className?: string;
    darkTheme?: boolean;
    height?: number;
    width?: number;
    selectedSnippet?: ISnippet | null;
}

// tslint:disable-next-line: no-empty-interface
interface IEditorState {

}

export default class Editor extends Component<IEditorProps, IEditorState> {

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

    private getTheme = (): string => {
        return this.props.darkTheme ? "vs-dark" : "vs";
    }
}
