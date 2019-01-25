import React, { Component } from 'react';
import './App.css';
import MonacoEditor from 'react-monaco-editor';
import SnippetTable from './Components/Sidebar/SnippetTable';
import { ISnippet } from './Components/Model/ISnippet';

class App extends Component {
  public render() {
    const options = {
      selectOnLineNumbers: true
    };

    const snippets: ISnippet[] = [];
    snippets.push({ title: "Example!" });
    snippets.push({ title: "Example!" });

    return (
      <div className={"bp3-dark"}>
        <SnippetTable
          className="sidebar"
          snippets={snippets}
        />
        <div className="editor">
          <MonacoEditor
            width="100%"
            height="600"
            language="javascript"
            theme="vs-dark"
            options={options}
            value='function funct() { console.log("hello world"); }'
          // onChange={this.onChange}
          // editorDidMount={this.editorDidMount}
          />
        </div>
      </div>
    );
  }

  private onChange = () => {

  }

  private editorDidMount = () => {

  }
}

export default App;
