import { SettingsOperations } from "../actions";

export const settings = (state = {}, action: any) => {
    switch (action.type) {
        case SettingsOperations.SET_DARK_THEME:
            return {
                ...state,
                darkTheme: action.darkTheme,
            };
        default:
            return state;
    }
};
