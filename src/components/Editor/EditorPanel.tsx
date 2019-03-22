import { Classes, Intent, IResizeEntry, NonIdealState, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { Component } from "react";
import { ISnippet } from "../../models/ISnippet";
import DialogueGenerator, { IDialogueButton } from "../../utils/DialogueGenerator";
import ActionsPanel from "./ActionsPanel";
import styles from "./Editor.module.scss";
import ResizableMonacoEditor from "./ResizableMonacoEditor";

interface IEditorProps {
    className?: string;
    darkTheme?: boolean;
    height?: number;
    onSnippetDidUpdate: (snippet: ISnippet) => void;
    onSnippetWasDeleted: (snippet: ISnippet) => void;
    snippet: ISnippet | null;
    width?: number;
}

interface IEditorState {
    editing: boolean;
    navBarHeight: number;
    navBarWidth: number;
    dialogue?: JSX.Element;
}

export default class EditorPanel extends Component<IEditorProps, IEditorState> {

    constructor(props: IEditorProps) {
        super(props);

        const state: any = {
            editing: false,
            navBarHeight: 0,
            navBarWidth: 0,
        };
        if (props.snippet) {
            state.snippet = props.snippet;
        }
        this.state = state;
    }

    public render() {
        const classes = classNames(this.props.className, styles.editor);
        return (
            <div className={classes}>
                {this.state.dialogue}
                {this.getEditorElement()}
            </div>
        );
    }

    private getEditorElement = () => {
        const options: monaco.editor.IDiffEditorConstructionOptions = {
            readOnly: !this.state.editing,
            selectOnLineNumbers: true,
        };

        const snippet = this.props.snippet;
        let displayedElement;

        if (snippet) {
            displayedElement = (
                <React.Fragment>
                    <ResizeSensor onResize={this.onNavBarResize}>
                        <ActionsPanel
                            onDeleteClicked={this.onDeleteSnippetClicked}
                            onEditClicked={this.onEditSnippetClicked}
                            onRenameClicked={this.onRenameSnippetClicked}
                            editButtonActive={this.state.editing}
                        />
                    </ResizeSensor>
                    <ResizableMonacoEditor
                        height={(this.props.height ? this.props.height : 0) - this.state.navBarHeight}
                        language={snippet.language}
                        onChange={this.onEditorChange}
                        options={options}
                        theme={this.getEditorTheme()}
                        value={snippet.body}
                        width={this.props.width}
                    />
                </React.Fragment>
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

    private onNavBarResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[0];

        this.setState({
            navBarHeight: resizeEntry.contentRect.height,
            navBarWidth: resizeEntry.contentRect.width,
        });
    }

    private onEditorChange = (value: string, event: monaco.editor.IModelContentChangedEvent) => {
        const snippet: ISnippet = { ...this.props.snippet! };
        snippet.body = value;
        this.props.onSnippetDidUpdate(snippet);
    }

    private onDeleteSnippetClicked = () => {
        const theme = this.props.darkTheme ? Classes.DARK : "";
        const dismissDialogue = () => {
            this.setState({ dialogue: undefined });
        };

        const deleteSnippet = () => {
            this.props.onSnippetWasDeleted(this.props.snippet!);
            dismissDialogue();
        };

        const buttons: IDialogueButton[] = [
            {
                intent: Intent.NONE,
                onClick: dismissDialogue,
                text: "Cancel",
            },
            {
                intent: Intent.DANGER,
                onClick: deleteSnippet,
                text: "Delete",
            },
        ];
        const title = `Are you sure you want to delete '${this.props.snippet!.title}'?`;
        const description = "This operation cannot be undone.";
        const dialogue = DialogueGenerator.generateDialogue(title, description, buttons, theme);
        this.setState({dialogue});
    }

    private onEditSnippetClicked = () => {
        this.setState({editing: !this.state.editing});
    }

    private onRenameSnippetClicked = () => {
        //
    }

    private getEditorTheme = (): string => {
        return this.props.darkTheme ? "vs-dark-skraw" : "vs-skraw";
    }
}
