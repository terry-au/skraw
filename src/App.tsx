import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSnippet } from "./actions";
import styles from "./App.module.scss";
import Editor from "./components/Editor/Editor";
import SnippetTable from "./components/Sidebar/SnippetTable";
import { ISnippet } from "./models/ISnippet";

interface IAppProps {
    onSelectSnippet?: any;
    snippet?: ISnippet | null;
    snippets?: ISnippet[] | null;
}

interface IAppState {
    height: number;
    width: number;
}

class App extends Component<IAppProps, IAppState> {

    public state: IAppState = {
        height: 0,
        width: 0,
    };

    private rootContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps) {
        super(props);

        this.rootContainerRef = React.createRef();
        this.state = {
            height: 0,
            width: 0,
        };
    }

    public render() {
        return (
            <ResizeSensor onResize={this.handleResize}>
                <div
                    className={classNames("bp3-dark", styles["root-container"])}
                    ref={this.rootContainerRef}
                >
                    <SnippetTable
                        className={styles.sidebar}
                        onSelectSnippet={this.props.onSelectSnippet}
                        selectedSnippet={this.props.snippet}
                        snippets={this.props.snippets!}
                    />
                    <Editor
                        height={this.state.height}
                        selectedSnippet={this.props.snippet}
                    />
                </div>
            </ResizeSensor>
        );
    }

    private handleResize = (entries: IResizeEntry[]) => {
// tslint:disable-next-line: no-console
        console.log(entries.map((e) => `${e.contentRect.width} x ${e.contentRect.height}`));
        const resizeEntry: IResizeEntry = entries[entries.length - 1];
        this.setState({
            height: resizeEntry.contentRect.height,
            width: resizeEntry.contentRect.width,
        });
    }
}

const mapStateToProps = (state: any) => {
    const { snippet, snippets } = state;
    return {
        ...snippet,
        ...snippets,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSelectSnippet: (snippet: ISnippet) => {
            dispatch(selectSnippet(snippet));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
