import React, {Component} from "react";
import {Button, InputGroup} from "@blueprintjs/core";

interface ISearchBarProps {
    onSearchTermChange?: any;
    searchTerm?: string;
    className?: string;
    placeholder?: string;
}

interface ISearchBarState {
    searchTerm: string;
}

export default class SearchBar extends Component<ISearchBarProps, ISearchBarState> {

    constructor(props: Readonly<ISearchBarProps>) {
        super(props);


        this.state = {
            searchTerm: ""
        };
    }

    public render() {
        return (
            <InputGroup
                className={this.props.className}
                leftIcon="search"
                value={this.state.searchTerm}
                onChange={this.onSearchTermChange}
                placeholder={this.props.placeholder}
                rightElement={
                    (this.state.searchTerm
                            ?
                            <Button
                                minimal={true}
                                icon="cross"
                                onClick={this.clearSearchTerm}
                            />
                            :
                            undefined
                    )
                }
            />
        );
    }

    private onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm: string = e.target.value;
        this.setState({searchTerm});

        this._setSearchTerm(searchTerm);
    };

    private clearSearchTerm = () => {
        this.setState(
            {
                searchTerm: ""
            }
        );

        this._setSearchTerm("");
    };

    private _setSearchTerm(searchTerm: string) {
        if (this.props.onSearchTermChange) {
            this.props.onSearchTermChange(searchTerm);
        }
    }
}