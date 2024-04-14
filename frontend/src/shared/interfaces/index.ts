export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: 0;
}

export interface Student {
  student_id: number;
  email: string;
  first_name: string;
  last_name: string;
  age: number;
  grade: number;
  last_test_date: Date | null;
  upcoming_test_date: Date | null;
}
