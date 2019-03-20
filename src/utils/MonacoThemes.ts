import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

export default abstract class MonacoThemes {
    public static registerThemes() {
        monaco.editor.defineTheme("vs-skraw", this.generateTheme("vs", "D13913"));
        monaco.editor.defineTheme("vs-dark-skraw", this.generateTheme("vs-dark", "DB2C6F"));
    }

    private static generateTheme(base: "vs" | "vs-dark", markerColour: string): monaco.editor.IStandaloneThemeData {
        return {
            base,
            colors: {},
            inherit: true,
            rules: [
                {
                    fontStyle: "italic bold underline",
                    foreground: markerColour,
                    token: "meta.skrawMarker",
                },
            ],
        };
    }
}
