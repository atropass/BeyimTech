import { createEvent, sample, createEffect } from "effector";

import { CreateTestApi } from "../../../shared/api/create-test";

interface ListeningTestParams {
  user_id: number;
  test_date: string;
  multiple_choice_score: number;
  matching_questions_score: number;
  diagram_labelling_score: number;
  summary_completion_score: number;
  sentence_completion_score: number;
  short_answer_score: number;
  overall_listening_score: number;
}

interface ReadingTestParams {
  user_id: number;
  test_date: string;
  matching_headings_score: number;
  multiple_choice_score: number;
  short_answer_score: number;
  name_matching_score: number;
  true_false_not_given_score: number;
  yes_no_not_given_score: number;
  summary_completion_score: number;
  matching_sentence_endings_score: number;
  sentence_completion_score: number;
  table_completion_score: number;
  matching_information_score: number;
  diagram_labelling_score: number;
  overall_reading_score: number;
}

interface SpeakingTestParams {
  user_id: number;
  test_date: string;
  fluency_score: number;
  coherence_score: number;
  lexical_resource_score: number;
  grammatical_range_score: number;
  accuracy_score: number;
  pronunciation_score: number;
  overall_speaking_score: number;
}

interface WritingTestParams {
  user_id: number;
  test_date: string;
  task1_achievement_score: number;
  task1_coherence_score: number;
  task1_lexical_resource_score: number;
  task1_grammatical_range_score: number;
  task2_response_score: number;
  task2_coherence_score: number;
  task2_lexical_resource_score: number;
  task2_grammatical_range_score: number;
  overall_writing_score: number;
}

interface OverallTestParams {
  user_id: number;
  test_date: string;
  test_type: string;
  listening_score: number;
  reading_score: number;
  speaking_score: number;
  writing_score: number;
  overall_score: number;
}

const triggerCreateListeningTest = createEvent<ListeningTestParams>();
const triggerCreateReadingTest = createEvent<ReadingTestParams>();
const triggerCreateSpeakingTest = createEvent<SpeakingTestParams>();
const triggerCreateWritingTest = createEvent<WritingTestParams>();
const triggerCreateOverallTest = createEvent<OverallTestParams>();

const createListeningTestFx = createEffect<ListeningTestParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await CreateTestApi.createListeningTest(params);
  },
});

const createReadingTestFx = createEffect<ReadingTestParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await CreateTestApi.createReadingTest(params);
  },
});

const createSpeakingTestFx = createEffect<SpeakingTestParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await CreateTestApi.createSpeakingTest(params);
  },
});

const createWritingTestFx = createEffect<WritingTestParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await CreateTestApi.createWritingTest(params);
  },
});

const createOverallTestFx = createEffect<OverallTestParams, void>({
  handler: async (params) => {
    console.log("fx called");
    await CreateTestApi.createOverallTest(params);
  },
});

sample({
  clock: triggerCreateListeningTest,
  target: createListeningTestFx,
});

sample({
  clock: triggerCreateReadingTest,
  target: createReadingTestFx,
});

sample({
  clock: triggerCreateSpeakingTest,
  target: createSpeakingTestFx,
});

sample({
  clock: triggerCreateWritingTest,
  target: createWritingTestFx,
});

sample({
  clock: triggerCreateOverallTest,
  target: createOverallTestFx,
});

export {
  triggerCreateListeningTest,
  triggerCreateReadingTest,
  triggerCreateSpeakingTest,
  triggerCreateWritingTest,
  triggerCreateOverallTest,
  createListeningTestFx,
  createReadingTestFx,
  createSpeakingTestFx,
  createWritingTestFx,
  createOverallTestFx,
};
