import { Button, Classes, Dialog, Intent } from "@blueprintjs/core";
import HashStatic from "object-hash";
import React from "react";

export interface IDialogueButton {
    intent?: Intent;
    onClick?: any;
    text: string;
}

export default class DialogueGenerator {
    public static generateDialogue(title: string, description: string, buttons: IDialogueButton[], theme: string): any {
        const buttonElements = buttons.map((button: IDialogueButton, index: number) => {
            const key = HashStatic({...button, index});
            return (
                <Button
                    key={key}
                    intent={button.intent}
                    onClick={button.onClick}
                >
                    {button.text}
                </Button>
            );
        });

        const dialogue = (
            <Dialog
                className={theme}
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
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        {buttonElements}
                    </div>
                </div>
            </Dialog>
        );
        return dialogue;
    }
}
