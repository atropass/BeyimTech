import { AiApi } from "../../shared/api/ai";
import { createEffect, createStore, createEvent, sample } from "effector";
interface GptAnalysisParams {
  userId: number;
  dateFrom: string;
  dateTo: string;
}

const triggerGptAnalysis = createEvent<GptAnalysisParams>();

const getGptAnalysisFx = createEffect<GptAnalysisParams, any>({
  handler: async ({ userId, dateFrom, dateTo }) => {
    console.log("fx called");
    const response = await AiApi.fetchGptAnalysis(userId, dateFrom, dateTo);
    return response;
  },
});
const $gptAnalysis = createStore<any>({});

$gptAnalysis.on(getGptAnalysisFx.doneData, (_, gptAnalysis) => gptAnalysis);

sample({
  clock: triggerGptAnalysis,
  target: getGptAnalysisFx,
});
export { triggerGptAnalysis, getGptAnalysisFx, $gptAnalysis };
