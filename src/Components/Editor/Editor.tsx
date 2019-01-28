import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

import styles from "./Editor.module.css";
import { ISnippet } from "../../Model/ISnippet";
import { NonIdealState } from "@blueprintjs/core";

interface IEditorProps {
  height: number;
  selectedSnippet?: ISnippet | null;
}

interface IEditorState {

}

export default class Editor extends Component<IEditorProps, IEditorState> {
  public render() {
    const options = {
      selectOnLineNumbers: true
    };

    const snippet = this.props.selectedSnippet;
    let displayedElement;
    if (snippet) {
      displayedElement = <MonacoEditor
        width="100%"
        height={this.props.height}
        language={snippet.language}
        theme="vs-dark"
        options={options}
        value={snippet.body}
      // onChange={this.onChange}
      // editorDidMount={this.editorDidMount}
      />;
    } else {
      const style = {
        height: this.props.height + "px"
      };
      displayedElement = <div style={style}>

        <NonIdealState
          icon="code"
          title={"Select or create a snippet."}
        />
      </div>;
    }

    return (
      <div className={styles["editor"]}>
        {displayedElement}
      </div>
    );
  }
}