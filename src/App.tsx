import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import classNames from "classnames";
import React, { Component } from "react";
import { connect } from "react-redux";
import { selectSnippet } from "./actions";
import styles from "./App.module.scss";
import Editor from "./Components/Editor/Editor";
import SnippetTable from "./Components/Sidebar/SnippetTable";
import { ISnippet } from "./Models/ISnippet";

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

    private rootContainerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IAppProps) {
        super(props);

        this.rootContainerRef = React.createRef();
        this.state = {
            height: 0,
            width: 0,
        };
    }

    public componentDidMount() {
        this.setState({ height: 100 });
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
                        height={this.state != null ? this.state.height : 100}
                        selectedSnippet={this.props.snippet}
                    />
                </div>
            </ResizeSensor>
        );
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
