import { LoadingActionType } from "../action-types";

const loadingState = false;

const loadingReducer = (state = loadingState, action) => {
  switch (action.type) {
    case LoadingActionType.SUBMITING:
      return true;
    case LoadingActionType.SUBMITTED:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
