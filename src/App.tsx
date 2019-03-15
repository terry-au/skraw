import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";
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
    height: number;
    width: number;
}

class App extends React.Component<IAppProps, IAppState> {
    public state: IAppState = {
        height: 0,
        width: 0,
    };

    private rootContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps = {darkTheme: true}) {
        super(props);
        this.rootContainerRef = React.createRef();
    }

    public render() {
        return (
            <ResizeSensor onResize={this.handleResize}>
                <div
                    className={classNames(this.getTheme(), styles["root-container"])}
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
                    <Editor
                        darkTheme={this.props.darkTheme}
                        height={this.state.height}
                        selectedSnippet={this.props.snippet}
                    />
                </div>
            </ResizeSensor>
        );
    }

    private getTheme = (): string => {
        return this.props.darkTheme ? "bp3-dark" : "";
    }

    private handleResize = (entries: IResizeEntry[]) => {
        const resizeEntry: IResizeEntry = entries[entries.length - 1];
        this.setState({
            height: resizeEntry.contentRect.height,
            width: resizeEntry.contentRect.width,
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
