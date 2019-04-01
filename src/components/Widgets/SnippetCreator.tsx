import {
    AnchorButton,
    Button,
    Classes,
    Dialog,
    H5,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Popover,
    PopoverPosition,
    Position,
    Tooltip,
} from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import * as _ from "lodash";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React, { Component } from "react";
import styles from "./SnippetCreator.module.scss";

interface ISnippetCreatorProps {
    className?: string;
}

interface ILanguage {
    aliases: string[];
    extensions: string[];
    id: string;
}

interface ISnippetCreatorState {
    isDisplayed: boolean;
    language: any;
}

export default class SnippetCreator extends Component<ISnippetCreatorProps, ISnippetCreatorState> {

    constructor(props: Readonly<ISnippetCreatorProps>) {
        super(props);

        this.state = {
            isDisplayed: false,
            language: null,
        };
    }

    public render() {
        const languages = monaco.languages.getLanguages();
        const lang = this.state.language;

        const languageList = (
            <Select
                items={languages}
                itemRenderer={this.renderLanguageItems}
                itemPredicate={this.filterLanguage}
                onItemSelect={this.selectLanguage}
                noResults={<MenuItem disabled={true} text="No results." />}
                popoverProps={{ popoverClassName: styles.selector }}
            >
                <Button
                    icon="code"
                    rightIcon="caret-down"
                    text={lang ? `${this.getName(lang)}` : "Language"}
                    disabled={false}
                />
            </Select>
        );

        const snippetDetails = (
            <InputGroup
                large={true}
                leftIcon="edit"
                // onChange={this.selectLanguage}
                placeholder="Snippet Name..."
                // value={"aaa"}
                rightElement={languageList}
            />
        );

        const newSnippetDialog = (
            <Dialog
                className={""}
                icon="code-block"
                onClose={this.handleDisplay}
                title="New Snippet"
                isOpen={this.state.isDisplayed}
            >
                <div className={Classes.DIALOG_BODY}>
                    {snippetDetails}
                </div>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button
                            intent={Intent.PRIMARY}
                            onClick={this.handleDisplay}
                        >
                            Add
                        </Button>
                        <Button onClick={this.handleDisplay}>Cancel</Button>
                    </div>
                </div>
            </Dialog>
        );

        const newSnippetPopover = (
            <Popover
                popoverClassName={Classes.POPOVER_CONTENT_SIZING}
                // popoverClassName={styles.foo}
                // portalClassName={styles.foo}
                enforceFocus={false}
                position={PopoverPosition.RIGHT_TOP}
                isOpen={this.state.isDisplayed}
            >
                <Button className={styles.add} minimal={true} icon="insert" onClick={this.handleDisplay} />
                <div key="text">
                    <H5>New Snippet</H5>
                    {snippetDetails}

                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                        <Button intent={Intent.PRIMARY} className={Classes.POPOVER_DISMISS}>
                            Add
                        </Button>
                        <Button
                            className={Classes.POPOVER_DISMISS}
                            style={{ marginLeft: 10 }}
                            onClick={this.handleDisplay}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>,
            </Popover>
        );

        return (
            <div>
                <Button className={styles.add} minimal={true} icon="insert" onClick={this.handleDisplay} />
                {newSnippetDialog}
                {/* {newSnippetPopover} */}
            </div>
        );
    }

    private getName(language: ILanguage) {
        return _.get(language, "aliases.0", language.id);
    }

    private filterLanguage = (query, lang, index, exactMatch) => {
        const target = _.uniq([lang.id, ...lang.aliases.map((l: string) => l.toLowerCase())]);
        const normalizedTitle = this.getName(lang).toLowerCase();
        const normalizedQuery = query.toLowerCase();

        if (exactMatch) {
            return normalizedTitle === normalizedQuery; // _.includes(target, normalizedQuery);
        } else {
            return `${normalizedTitle}`.indexOf(normalizedQuery) >= 0;
        }
    }

    private renderLanguageItems = (lang: any, { handleClick, modifiers, query }) => {
        if (!modifiers.matchesPredicate) {
            return null;
        }
        const text = _.get(lang, "aliases.0", lang.id);
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                label={lang.id}
                key={lang.id}
                onClick={handleClick}
                text={text}
            />
        );
    }


    private renderMenu = ({ items, itemsParentRef, query, renderItem }) => {
        const renderedItems = items.map(renderItem).filter((item) => item != null);
        return (
            <Menu ulRef={itemsParentRef}>
                <MenuItem
                    disabled={true}
                    text={`Found ${renderedItems.length} items matching "${query}"`}
                />
                {renderedItems}
            </Menu>
        );
    }

    private handleDisplay = () => this.setState({ isDisplayed: !this.state.isDisplayed });

    private selectLanguage = (lang: any) => {
        this.setState({ language: lang });
    }

}
