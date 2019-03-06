import React, { Component } from 'react';
import SnippetTable from './Components/Sidebar/SnippetTable';
import { ISnippet } from './Models/ISnippet';
import Editor from './Components/Editor/Editor';
import { ResizeSensor, IResizeEntry } from '@blueprintjs/core';

import styles from "./App.module.scss";
import classNames from 'classnames';
import DummyData from './DummyData';


interface IAppProps {

}

interface IAppState {
  height: number;
  width: number;
  selectedSnippet?: ISnippet | null;
}

class App extends Component<IAppProps, IAppState> {

  private rootContainerRef: React.RefObject<HTMLDivElement>;

  private snippets: ISnippet[];

  constructor(props: IAppProps) {
    super(props);

    this.rootContainerRef = React.createRef();
    this.state = {
      height: 0,
      width: 0,
      selectedSnippet: null
    }



    this.snippets = [];

    for (let index = 0; index < 20; index++) {
      const rnd = Math.floor(Math.random() * 2);
      const ob = rnd === 0 ? DummyData.js() : DummyData.cpp();
      this.snippets.push(ob);
    }
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
            className={styles["sidebar"]}
            onSelectSnippet={this.onSelectSnippet}
            selectedSnippet={this.state.selectedSnippet}
            snippets={this.snippets}
          />
          <Editor
            height={this.state != null ? this.state.height : 100}
            selectedSnippet={this.state.selectedSnippet}
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

  private onSelectSnippet = (snippet: ISnippet) => {
    // alert("HELLLLLLOOOO");
    this.setState({
      selectedSnippet: snippet
    })
  }
}

export default App;
