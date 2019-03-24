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
            onItemSelect={this.selectLanguage}
          >
              <Button
                  icon="film"
                  rightIcon="caret-down"
                  text={"aaaa"}
                  disabled={false}
              />
          </Select>
        )

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
              <Popover
                  popoverClassName={Classes.POPOVER_CONTENT_SIZING}
                  portalClassName="foo"
                  enforceFocus={false}
                  position={PopoverPosition.RIGHT_TOP}
                  isOpen={this.state.isDisplayed}
              >
                  <Button className={styles["add-button"]} minimal={true} icon="insert" onClick={this.handleAction}/>
                  <div key="text">
                      <H5>New Snippet</H5>
                      <InputGroup
                          disabled={false}
                          large={false}
                          placeholder="Snippet Name"
                          rightElement={permissionsMenu}
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
              </Popover>


              <Dialog
                  className={""}
                  icon="insert"
                  onClose={undefined} // this.handleAction
                  title="New Snippet"
                  isOpen={undefined} // this.state.isDisplayed
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
          </div>
        );
    }

    private handleAction = () => this.setState({isDisplayed: !this.state.isDisplayed});

    private selectLanguage = () => {
      alert("selected new language");
    }

}
