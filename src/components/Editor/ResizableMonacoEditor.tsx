import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";

interface IResizableMonacoEditorProps extends MonacoEditorProps {
    className?: string;
}

export default class ResizableMonacoEditor extends React.Component<IResizableMonacoEditorProps> {
    private editor: monaco.editor.IStandaloneCodeEditor | null = null;

    public componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    public render() {
        const {className, ...monacoProps} = this.props;
        return (
            <div className={className}>
                <MonacoEditor
                    {...monacoProps}
                    editorDidMount={this.handleEditorDidMount}
                />
            </div>
        );
    }

    private handleEditorDidMount = (editor: any) => {
        this.editor = editor;
    }

    private handleResize = () => {
        if (this.editor) {
            this.editor.layout();
        }
    }
}
