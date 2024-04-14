import { createEffect, createStore, createEvent, sample } from "effector";

import { AnalyticsApi } from "../../../shared/api/analytics";

interface getOverallScoreParams {
  user_id: number;
  date_from: string;
  date_to: string;
}

const $graphData = createStore<any>([]);

const triggerOverallScore = createEvent<getOverallScoreParams>();

const getOverallScoreFx = createEffect<getOverallScoreParams, any>({
  handler: async ({ user_id, date_from, date_to }) => {
    console.log("fx called");
    const response = await AnalyticsApi.getOverallScore(
      user_id,
      date_from,
      date_to
    );
    return response;
  },
});

sample({
  clock: triggerOverallScore,
  target: getOverallScoreFx,
});

$graphData.on(getOverallScoreFx.doneData, (_, graphData) => graphData);

export { triggerOverallScore, getOverallScoreFx, $graphData };
