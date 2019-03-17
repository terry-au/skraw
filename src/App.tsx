import { Classes, IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import React from "react";
import { connect } from "react-redux";
import { selectSnippet, setDarkTheme } from "./actions";
import styles from "./App.module.scss";
import Editor from "./components/Editor/Editor";
import SnippetTable from "./components/Sidebar/SnippetTable";
import { ISnippet } from "./models/ISnippet";

interface IAppProps {
    onSelectSnippet?: any;
    onSetDarkTheme?: any;
    snippet?: ISnippet | null;
    snippets?: ISnippet[] | null;
    darkTheme?: boolean;
}

interface IAppState {
    editorHeight: number;
    editorWidth: number;
    lastSetEditorSize: number;
}

class App extends React.Component<IAppProps, IAppState> {
    public state: IAppState = {
        editorHeight: 0,
        editorWidth: 0,
        lastSetEditorSize: 0,
    };

    private rootContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps = { darkTheme: true }) {
        super(props);
        this.rootContainerRef = React.createRef();
    }

    public render() {
        return (
            <div
                className={classNames(this.getTheme(), styles["root-container"], styles.notransition)}
                ref={this.rootContainerRef}
            >
                <SnippetTable
                    className={styles.sidebar}
                    darkTheme={this.props.darkTheme}
                    onSelectSnippet={this.props.onSelectSnippet}
                    onSetDarkTheme={this.props.onSetDarkTheme}
                    selectedSnippet={this.props.snippet}
                    snippets={this.props.snippets!}
                />
                <ResizeSensor onResize={this.handleEditorResize} observeParents={true}>
                    <Editor
                        className={styles.editor}
                        darkTheme={this.props.darkTheme}
                        height={this.state.editorHeight}
                        width={this.state.editorWidth}
                        selectedSnippet={this.props.snippet}
                    />
                </ResizeSensor>
                <div className={styles.divider}/>
            </div>
        );
    }

    private getTheme = (): string => {
        return this.props.darkTheme ? Classes.DARK : "";
    }

    private handleEditorResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[0];
        entries.forEach((element) => {
            // tslint:disable-next-line:no-console
            console.log(`${element.contentRect.width} x ${element.contentRect.height}`);
        });

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
