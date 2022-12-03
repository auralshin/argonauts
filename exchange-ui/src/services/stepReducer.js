const stepStatusKind = {
  PENDING: "PENDING",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const steps = {
  stepStatuses: "stepStatuses",
  stepCount: "stepCount",
};

function getStepStatuses(actionPayload, stepStatuses) {
  const output = stepStatuses.map((stepStatus, index) =>
    index === actionPayload.stepIndex ? actionPayload.stepStatus : stepStatus
  );
  return output;
}

function stepReducer(state, action) {
  switch (action.type) {
    case steps.stepStatuses:
      return {
        ...state,
        stepStatuses: getStepStatuses(action.payload, state.stepStatuses),
      };
    case steps.stepCount:
      return { ...state, stepCount: action.payload };
    default:
      return state;
  }
}

export { stepStatusKind, steps, stepReducer };
