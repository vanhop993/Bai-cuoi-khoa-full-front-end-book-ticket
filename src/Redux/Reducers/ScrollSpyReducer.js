import { SCROLL_SPY_TO_MENU } from "../Const/ScrollSpyConst"

const stateDefault = {
    scrollToElement: '',
}

export const ScrollSpyReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SCROLL_SPY_TO_MENU : {
            state.scrollToElement  = action.menu;
            return {...state};
        }
        default: return {...state}
    }
}