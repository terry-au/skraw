import {
    AnchorButton,
    Button,
    Classes,
    Dialog,
    H5,
    InputGroup,
    Intent,
    Popover,
    PopoverPosition,
    Tooltip,
} from "@blueprintjs/core";
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
                      <H5>Confirm deletion</H5>
                      <p>Are you sure you want to delete these items? You won't be able to recover them.</p>
                      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                          <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
                              Cancel
                          </Button>
                          <Button intent={Intent.DANGER} className={Classes.POPOVER_DISMISS}>
                              Delete
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



}
