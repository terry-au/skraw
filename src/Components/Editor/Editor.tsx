import React, { Component } from "react";
import MonacoEditor from "react-monaco-editor";

import styles from "./Editor.module.css";

interface IEditorProps {
  height: number;
}

interface IEditorState {

}

export default class Editor extends Component<IEditorProps, IEditorState> {
  public render() {
    const options = {
      selectOnLineNumbers: true
    };

    return (
      <div className={styles["editor"]}>
        <MonacoEditor
          width="100%"
          height={this.props.height}
          language="javascript"
          theme="vs-dark"
          options={options}
          value='function funct() { console.log("hello world"); }'
        // onChange={this.onChange}
        // editorDidMount={this.editorDidMount}
        />
      </div>
    );
  }
}