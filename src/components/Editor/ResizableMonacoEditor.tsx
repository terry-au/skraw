import React from "react";
import MonacoEditor, { MonacoEditorProps } from "react-monaco-editor";

export default class ResizableMonacoEditor extends React.Component<MonacoEditorProps> {
    private editor: any = null;

    public componentDidMount() {
        window.addEventListener("resize", this.handleResize);

        // let lastScroll = 0;
        // window.addEventListener("resize", () => {
        //     const now = +new Date();
        //     if (now - lastScroll > 1000) {
        //         // this.handleResize();
        //         lastScroll = now;
        //         // tslint:disable-next-line:no-console
        //         console.log(lastScroll);
        //     }
        // });
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
