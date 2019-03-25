import { Alert, Classes, InputGroup, Intent, IResizeEntry, NonIdealState, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { Component } from "react";
import { ISnippet } from "../../models/ISnippet";
import ActionsPanel from "./ActionsPanel";
import styles from "./EditorPanel.module.scss";
import ResizableMonacoEditor from "./ResizableMonacoEditor";

interface IEditorProps {
    className?: string;
    darkTheme?: boolean;
    height?: number;
    onSnippetDidUpdate: (snippet: ISnippet) => void;
    onSnippetWasDeleted: (snippet: ISnippet) => void;
    onSnippetWasRenamed: (snippet: ISnippet, newName: string) => void;
    snippet: ISnippet | null;
    width?: number;
}

interface IEditorState {
    displayDeleteAlert: boolean;
    displayRenameAlert: boolean;
    editing: boolean;
    navBarHeight: number;
    navBarWidth: number;
    newSnippetName: string;
}

export default class EditorPanel extends Component<IEditorProps, IEditorState> {

    constructor(props: IEditorProps) {
        super(props);

        const state: any = {
            alert: null,
            displayAlert: false,
            editing: false,
            navBarHeight: 0,
            navBarWidth: 0,
            newSnippetName: "",
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
                    {this.deletionPrompt()}
                    {this.renamePrompt()}
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

    private deletionPrompt = () => {
        const onCancel = () => {
            this.setState({ displayDeleteAlert: false });
        };

        const deleteSnippet = () => {
            this.props.onSnippetWasDeleted(this.props.snippet!);
            onCancel();
        };

        const snippetName = this.props.snippet!.title;
        const title = `Are you sure you want to delete '${snippetName}'?`;
        const description = "This operation cannot be undone.";
        const theme = this.props.darkTheme ? Classes.DARK : "";

        return (
            <Alert
                className={theme}
                cancelButtonText="Cancel"
                confirmButtonText="Delete"
                icon="trash"
                intent={Intent.DANGER}
                isOpen={this.state.displayDeleteAlert}
                canOutsideClickCancel={true}
                canEscapeKeyCancel={true}
                onCancel={onCancel}
                onConfirm={deleteSnippet}
            >
                <p>
                    <strong>{title}</strong>
                    {description}
                </p>
            </Alert>
        );
    }

    private renamePrompt = () => {
        const onCancel = () => {
            this.setState({ displayRenameAlert: false });
        };

        const renameSnippet = () => {
            this.props.onSnippetWasRenamed(this.props.snippet!, this.state.newSnippetName);
            onCancel();
            this.setState({newSnippetName: ""});
        };

        const snippetName = this.props.snippet!.title;
        const title = `Rename '${snippetName}'`;
        const theme = this.props.darkTheme ? Classes.DARK : "";

        return (
            <Alert
                className={classNames(theme, styles["fill-width"], "AAAAAA")}
                cancelButtonText="Cancel"
                confirmButtonText="Rename"
                intent={Intent.PRIMARY}
                canOutsideClickCancel={true}
                canEscapeKeyCancel={true}
                isOpen={this.state.displayRenameAlert}
                onCancel={onCancel}
                onConfirm={renameSnippet}
            >
                <div>
                    <p>
                        <strong>{title}</strong>
                    </p>
                    <InputGroup
                        autoFocus={true}
                        onChange={this.handleSnippetNameChange}
                        placeholder={snippetName}
                        value={this.state.newSnippetName}
                    />
                </div>
            </Alert>
        );
    }

    private handleSnippetNameChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ newSnippetName: event.currentTarget.value });
    }

    private onDeleteSnippetClicked = () => {
        this.setState({ displayDeleteAlert: true });
    }

    private onEditSnippetClicked = () => {
        this.setState({ editing: !this.state.editing });
    }

    private onRenameSnippetClicked = () => {
        this.setState({ displayRenameAlert: true });
    }

    private getEditorTheme = (): string => {
        return this.props.darkTheme ? "vs-dark-skraw" : "vs-skraw";
    }
}
