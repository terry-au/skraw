import { Classes, Intent, IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { selectSnippet, setDarkTheme, updateSnippet } from "./actions";
import styles from "./App.module.scss";
import EditorPanel from "./components/Editor/EditorPanel";
import SnippetTable from "./components/Sidebar/SnippetTable";
import { ISnippet } from "./models/ISnippet";
import DialogueGenerator, { IDialogueButton } from "./utils/DialogueGenerator";

interface IAppProps {
    // Managed by Redux.
    darkTheme?: boolean;
    onSelectSnippet?: (snippet: ISnippet) => void;
    onSetDarkTheme?: (darkTheme: boolean) => void;
    saveSnippetToStore?: (snippet: ISnippet) => void;
    snippet: ISnippet | null;
    snippets?: ISnippet[] | null;
}

interface IAppState {
    dialogue?: JSX.Element;
    editorHeight: number;
    editorWidth: number;
    lastSetEditorSize: number;
    snippet: ISnippet | null;
}

class App extends React.Component<IAppProps, IAppState> {

    public state: IAppState = {
        editorHeight: 0,
        editorWidth: 0,
        lastSetEditorSize: 0,
        snippet: null,
    };

    private rootContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps = { darkTheme: true, snippet: null }) {
        super(props);
        this.rootContainerRef = React.createRef();
    }

    public render() {
        return (
            <div
                className={classNames(this.getTheme(), styles["root-container"])}
                ref={this.rootContainerRef}
            >
                {this.state.dialogue}
                <SnippetTable
                    className={styles.sidebar}
                    darkTheme={this.props.darkTheme}
                    onSelectSnippet={this.onSelectSnippet}
                    onSetDarkTheme={this.props.onSetDarkTheme}
                    selectedSnippet={this.props.snippet}
                    snippets={this.props.snippets!}
                />
                <ResizeSensor onResize={this.handleEditorResize} observeParents={true}>
                    <EditorPanel
                        className={styles.editor}
                        darkTheme={this.props.darkTheme}
                        height={this.state.editorHeight}
                        onSnippetDidUpdate={this.onSnippetDidUpdate}
                        snippet={this.state.snippet}
                    />
                </ResizeSensor>
            </div>
        );
    }

    private onSelectSnippet = (snippet: ISnippet, callback: any) => {
        const dismissDialogue = () => {
            this.setState({ dialogue: undefined });
        };

        const changeSnippet = (save: boolean) => {
            return () => {
                if (save) {
                    this.props.saveSnippetToStore!(this.state.snippet!);
                }

                this.setState({ snippet });
                this.props.onSelectSnippet!(snippet);
                callback();
                dismissDialogue();
            };
        };

        if (this.props.snippet && this.state.snippet
            && this.props.snippet.body !== this.state.snippet.body) {

            const title = `Do you want to save the changes you made to ${this.state.snippet.title}?`;
            const description = "Your changes will be lost if you don't save them.";
            const buttons: IDialogueButton[] = [
                {
                    after: DialogueGenerator.flexibleSpace(),
                    intent: Intent.DANGER,
                    onClick: changeSnippet(false),
                    text: "Don't Save",
                },
                {
                    intent: Intent.NONE,
                    onClick: dismissDialogue,
                    text: "Cancel",
                },
                {
                    intent: Intent.PRIMARY,
                    onClick: changeSnippet(true),
                    text: "Save",
                },
            ];
            const dialogue = DialogueGenerator.generateDialogue(title, description, buttons, this.getTheme());
            this.setState({ dialogue });
        } else {
            changeSnippet(false)();
        }
    }

    private onSnippetDidUpdate = (snippet: ISnippet) => {
        this.setState({ snippet });
    }

    private getTheme = (): string => {
        return this.props.darkTheme ? Classes.DARK : "";
    }

    private handleEditorResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[0];

        this.setState({
            editorHeight: resizeEntry.contentRect.height,
            editorWidth: resizeEntry.contentRect.width,
        });
    }
}

const mapStateToProps = (state: any) => {
    return {
        darkTheme: state.settings.darkTheme,
        snippet: state.snippets.snippet,
        snippets: state.snippets.snippets,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSelectSnippet: (snippet: ISnippet) => {
            dispatch(selectSnippet(snippet));
        },
        onSetDarkTheme: (enabled: boolean) => {
            dispatch(setDarkTheme(enabled));
        },
        saveSnippetToStore: (snippet: ISnippet) => {
            dispatch(updateSnippet(snippet));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
