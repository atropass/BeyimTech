import axios from "axios";

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
  test_type: string;
  test_date: string;
  overall_score: number;
  listening_score: number;
  speaking_score: number;
  writing_score: number;
  reading_score: number;
}

export const CreateTestApi = {
  createListeningTest: async (params: ListeningTestParams) => {
    const response = await axios.post(
      "http://localhost:8000/test-details/listening",
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },

  createReadingTest: async (params: ReadingTestParams) => {
    const response = await axios.post(
      "http://localhost:8000/test-details/reading",
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },

  createSpeakingTest: async (params: SpeakingTestParams) => {
    const response = await axios.post(
      "http://localhost:8000/test-details/speaking",
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },

  createWritingTest: async (params: WritingTestParams) => {
    const response = await axios.post(
      "http://localhost:8000/test-details/writing",
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },

  createOverallTest: async (params: OverallTestParams) => {
    const response = await axios.post(
      "http://localhost:8000/test-details/",
      params,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  },
};
