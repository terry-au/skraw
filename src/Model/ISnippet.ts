import { string } from "prop-types";

export interface ISnippet {
  body: string;
  description: string;
  language: string;
  title: string;
  uuid: string;
}