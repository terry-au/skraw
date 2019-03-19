import { combineReducers } from "redux";
import { settings } from "./settings";
import { snippets } from "./snippets";

export default combineReducers({
  settings,
  snippets,
});
