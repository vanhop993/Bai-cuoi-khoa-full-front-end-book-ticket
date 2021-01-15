import { SCROLL_SPY_TO_MENU } from "../Const/ScrollSpyConst";

export const scrollSpyAction = (name) => {
  return {
    type: SCROLL_SPY_TO_MENU,
    menu: name,
  };
};
