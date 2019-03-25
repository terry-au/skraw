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

interface ISnippetCreatorState {
    isDisplayed: boolean;
}

export default class SnippetCreator extends Component<ISnippetCreatorProps, ISnippetCreatorState> {

    constructor(props: Readonly<ISnippetCreatorProps>) {
        super(props);

        this.state = {
            isDisplayed: false,
        };
    }

    public render() {
        const languages = monaco.languages.getLanguages();

        const languageList = (
          <Select
              items={languages}
              itemRenderer={this.renderLanguageItems}
              itemPredicate={this.filterLanguage}
              onItemSelect={this.selectLanguage}
              noResults={<MenuItem disabled={true} text="No results." />}
              popoverProps={{minimal: true}}
          >
              <Button
                  icon="film"
                  rightIcon="caret-down"
                  text={"aaaa"}
                  disabled={false}
              />
          </Select>
        );

        const eq = (
          <Menu>
              {languages.map((lang, i) => <MenuItem text={lang.id} key={i} />)}
          </Menu>
        );

        const permissionsMenu = (
          <Popover
              content={eq}
              disabled={false}
              position={Position.BOTTOM_RIGHT}
          >
              <Button disabled={false} minimal={true} rightIcon="caret-down">
                  Language
              </Button>
          </Popover>
      );
        return (
          <div>
              {languageList}

              <Button className={styles["add-button"]} minimal={true} icon="insert" onClick={this.handleAction}/>
              <Dialog
                  className={""}
                  icon="insert"
                  onClose={this.handleAction}
                  title="New Snippet"
                  isOpen={this.state.isDisplayed}
              >
                  <div className={Classes.DIALOG_BODY}>
                      <p>
                          Add snippet
                      </p>
                  </div>
                  <div className={Classes.DIALOG_FOOTER}>
                      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                          <Button
                              intent={Intent.PRIMARY}
                              onClick={this.handleAction}
                          >
                              Add
                          </Button>
                          <Button onClick={this.handleAction}>Cancel</Button>
                      </div>
                  </div>
              </Dialog>

              {// tslint:disable-next-line: jsx-no-multiline-js
              /* <Popover
                  popoverClassName={Classes.POPOVER_CONTENT_SIZING}
                  portalClassName="foo"
                  enforceFocus={false}
                  position={PopoverPosition.RIGHT_TOP}
                  isOpen={false} // this.state.isDisplayed
              >
                  <div key="text">
                      <H5>New Snippet</H5>
                      <InputGroup
                          disabled={false}
                          large={false}
                          placeholder="Snippet Name"
                          rightElement={languageList}
                          small={false}
                      />

                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                          <Button
                            className={Classes.POPOVER_DISMISS}
                            style={{ marginRight: 10 }}
                            onClick={this.handleAction}
                          >
                              Cancel
                          </Button>
                          <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS}>
                              Add
                          </Button>
                      </div>
                  </div>,
              </Popover> */}
          </div>
        );
    }

    private printMsg(msg: any) {
        // tslint:disable-next-line:no-console
        console.info(msg);
    }

    private filterLanguage = (query, lang, index, exactMatch) => {
        const target = _.uniq([lang.id, ...lang.aliases.map((l: string) => l.toLowerCase())]);
        const normalizedTitle = _.get(lang, "aliases.0", lang.id).toLowerCase();
        // this.printMsg(target);
        this.printMsg(exactMatch);

        const normalizedQuery = query.toLowerCase();
        // ${normalizedTitle}

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


    private renderMenu = ({items, itemsParentRef, query, renderItem}) => {
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

    private handleAction = () => this.setState({isDisplayed: !this.state.isDisplayed});

    private selectLanguage = (lang: any) => {
      alert("selected new language");
    }

}
