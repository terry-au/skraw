import { Button, InputGroup } from "@blueprintjs/core";
import React, { Component } from "react";

interface ISnippetCreatorProps {
    className?: string;
}

interface ISnippetCreatorState {
    placeholder: string;
}

export default class SnippetCreator extends Component<ISnippetCreatorProps, ISnippetCreatorState> {

    constructor(props: Readonly<ISnippetCreatorProps>) {
        super(props);
    }

    public render() {
        return (
          <Button className={styles["add-button"]} minimal={true} icon="insert" />
        );
    }
}
