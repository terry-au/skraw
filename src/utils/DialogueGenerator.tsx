import { Button, Classes, Dialog, Intent } from "@blueprintjs/core";
import classNames from "classnames";
import HashStatic from "object-hash";
import React from "react";
import styles from "./DialogueGenerator.module.scss";

export interface IDialogueButton {
    after?: JSX.Element;
    before?: JSX.Element;
    intent?: Intent;
    onClick?: any;
    text: string;
}

export interface ISeparator {
    width?: number;
    flexible?: boolean;
}

export default class DialogueGenerator {
    public static flexibleSpace(): JSX.Element {
        return (
            <div className={styles["flexible-space"]}/>
        );
    }

    public static generateDialogue(title: string, description: string, buttons: IDialogueButton[], theme: string): any {
        const buttonElements = buttons.map((button: IDialogueButton, index: number) => {
            const key = HashStatic({ ...button, index });
            let classes;
            if (button.before || button.after) {
                classes = styles["no-margin-left"];
            }
            return (
                <React.Fragment key={key}>
                    {button.before}
                    <Button
                        className={classes}
                        intent={button.intent}
                        onClick={button.onClick}
                    >
                        {button.text}
                    </Button>
                    {button.after}
                </React.Fragment>
            );
        });

        const dialogue = (
            <Dialog
                className={classNames(theme, styles.dialogue)}
                isOpen={true}
            >
                <div className={Classes.DIALOG_BODY}>
                    <p>
                        <strong>
                            {title}
                        </strong>
                        <br />
                        <br />
                        {description}
                    </p>
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={classNames(Classes.DIALOG_FOOTER_ACTIONS, styles["footer-flex"])}>
                        {buttonElements}
                    </div>
                </div>
            </Dialog>
        );
        return dialogue;
    }
}
