import { Alignment, Button, Intent, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from "@blueprintjs/core";
import React from "react";
import styles from "./ActionsPanel.module.scss";

interface IActionsPanelProps {
    onEditClicked: () => void;
    onRenameClicked: () => void;
    onDeleteClicked: () => void;
    editButtonActive: boolean;
}

export default class ActionsPanel extends React.Component<IActionsPanelProps> {
    public render() {
        return (
            <Navbar className={styles["navigation-bar"]}>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>Skraw</NavbarHeading>
                    <NavbarDivider />
                    <Button
                        active={this.props.editButtonActive}
                        icon="edit"
                        minimal={true}
                        onClick={this.onEditClicked}
                        text="Edit"
                    />
                    <Button
                        icon="text-highlight"
                        minimal={true}
                        onClick={this.onRenameClicked}
                        text="Rename"
                    />
                    <Button
                        icon="delete"
                        intent={Intent.DANGER}
                        minimal={true}
                        onClick={this.onDeleteClicked}
                        text="Delete"
                    />
                </NavbarGroup>
            </Navbar>
        );
    }

    private onEditClicked = (event: React.SyntheticEvent) => {
        this.props.onEditClicked();
    }

    private onRenameClicked = (event: React.SyntheticEvent) => {
        this.props.onRenameClicked();
    }

    private onDeleteClicked = (event: React.SyntheticEvent) => {
        this.props.onDeleteClicked();
    }
}
