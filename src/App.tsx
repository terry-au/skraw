import React, { Component } from 'react';
import SnippetTable from './Components/Sidebar/SnippetTable';
import { ISnippet } from './Model/ISnippet';
import Editor from './Components/Editor/Editor';
import { ResizeSensor, IResizeEntry } from '@blueprintjs/core';

import styles from "./App.module.scss";
import classNames from 'classnames';

interface IAppProps {

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
  }

  public componentDidMount() {
    this.setState({ height: 100 });
  }

  public componentDidUpdate(prevProps: IAppProps, prevState: IAppState) {
    console.log("CDU");
    console.log((this.rootContainerRef as any).clientHeight);
  }

  public render() {

    const snippets: ISnippet[] = [];
    snippets.push({ title: "Example!", language: "c++", description: "", body: "" });
    snippets.push({ title: "Example!", language: "js", description: "", body: "" });

    return (
      <ResizeSensor onResize={this.handleResize}>
        <div
          className={classNames("bp3-dark", styles["root-container"])}
          ref={this.rootContainerRef}
        >
          <SnippetTable
            className="sidebar"
            snippets={snippets}
          />
          <Editor height={this.state != null ? this.state.height : 100} />
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

  private onChange = () => {

  }

  private editorDidMount = () => {

  }
}

export default App;
