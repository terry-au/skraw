import React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";

export default class ResizableMonacoEditor extends React.Component<MonacoEditorProps> {
    private editor: any = null;

    public componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    public render() {
        return (
            <MonacoEditor
                {...this.props}
                editorDidMount={this.handleEditorDidMount}
            />
        );
    }

    private handleEditorDidMount = (editor: any) => {
        this.editor = editor;
    }

    private handleResize = () => {
        this.editor.layout();
    }
}
