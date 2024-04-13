-- User Roles ENUM Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('teacher', 'student', 'parent', 'admin');
    END IF;
END$$;

-- Event Types ENUM Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
        CREATE TYPE event_type AS ENUM ('test', 'lesson');
    END IF;
END$$;

-- Test Types ENUM Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'test_type') THEN
        CREATE TYPE test_type AS ENUM ('IELTS', 'Mock IELTS');
    END IF;
END$$;

-- Users Table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL
);

-- Student Table inheriting from Users
CREATE TABLE Students (
    student_id INT PRIMARY KEY REFERENCES Users(user_id) ON DELETE CASCADE,
    age INT NOT NULL,
    grade VARCHAR(50),
    last_test_date DATE,
    upcoming_test_date DATE
);

-- Teacher Table inheriting from Users
CREATE TABLE Teachers (
    teacher_id INT PRIMARY KEY REFERENCES Users(user_id) ON DELETE CASCADE,
    department VARCHAR(255)
);

-- Parent Table inheriting from Users
CREATE TABLE Parents (
    parent_id INT PRIMARY KEY REFERENCES Users(user_id) ON DELETE CASCADE
);

-- UserProfile Table
CREATE TABLE UserProfile (
    profile_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    phone_number VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- StudentTeacher Relationship Table
CREATE TABLE StudentTeacher (
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id),
    PRIMARY KEY (student_id, teacher_id)
);

-- ParentStudent Relationship Table
CREATE TABLE ParentStudent (
    parent_id INT NOT NULL,
    student_id INT NOT NULL,
    FOREIGN KEY (parent_id) REFERENCES Parents(parent_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    PRIMARY KEY (parent_id, student_id)
);

-- Calendar Table
CREATE TABLE Calendar (
    calendar_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,  -- Generic user_id to link with any user type
    date DATE NOT NULL,
    event_type event_type NOT NULL,
    details_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- TestDetails Table
CREATE TABLE TestDetails (
    test_detail_id SERIAL PRIMARY KEY,
    calendar_id INT NOT NULL,
    test_type test_type NOT NULL,
    test_date DATE NOT NULL,
    overall_score DECIMAL,
    FOREIGN KEY (calendar_id) REFERENCES Calendar(calendar_id)
);

-- SpeakingTestDetails Table
CREATE TABLE SpeakingTestDetails (
    speaking_id SERIAL PRIMARY KEY,
    test_detail_id INT NOT NULL,
    fluency_score DECIMAL,
    coherence_score DECIMAL,
    lexical_resource_score DECIMAL,
    grammatical_range_score DECIMAL,
    accuracy_score DECIMAL,
    pronunciation_score DECIMAL,
    overall_speaking_score DECIMAL,
    FOREIGN KEY (test_detail_id) REFERENCES TestDetails(test_detail_id)
);

-- WritingTestDetails Table
CREATE TABLE WritingTestDetails (
    writing_id SERIAL PRIMARY KEY,
    test_detail_id INT NOT NULL,
    task1_achievement_score DECIMAL,
    task1_coherence_score DECIMAL,
    task1_lexical_resource_score DECIMAL,
    task1_grammatical_range_score DECIMAL,
    task2_response_score DECIMAL,
    task2_coherence_score DECIMAL,
    task2_lexical_resource_score DECIMAL,
    task2_grammatical_range_score DECIMAL,
    overall_writing_score DECIMAL,
    FOREIGN KEY (test_detail_id) REFERENCES TestDetails(test_detail_id)
);

-- ListeningTestDetails Table
CREATE TABLE ListeningTestDetails (
    listening_id SERIAL PRIMARY KEY,
    test_detail_id INT NOT NULL,
    multiple_choice_score INT,
    matching_questions_score INT,
    diagram_labelling_score INT,
    summary_completion_score INT,
    sentence_completion_score INT,
    short_answer_score INT,
    overall_listening_score DECIMAL,
    FOREIGN KEY (test_detail_id) REFERENCES TestDetails(test_detail_id)
);



-- ReadingTestDetails Table
CREATE TABLE ReadingTestDetails (
    reading_id SERIAL PRIMARY KEY,
    test_detail_id INT NOT NULL,
    matching_headings_score INT,
    multiple_choice_score INT,
    short_answer_score INT,
    name_matching_score INT,
    true_false_not_given_score INT,
    yes_no_not_given_score INT,
    summary_completion_score INT,
    matching_sentence_endings_score INT,
    sentence_completion_score INT,
    table_completion_score INT,
    matching_information_score INT,
    diagram_labelling_score INT,
    overall_reading_score DECIMAL,
    FOREIGN KEY (test_detail_id) REFERENCES TestDetails(test_detail_id)
);

-- LessonDetails Table
CREATE TABLE LessonDetails (
    lesson_detail_id SERIAL PRIMARY KEY,
    calendar_id INT NOT NULL,
    discipline VARCHAR(255),
    attendance BOOLEAN,
    punctuality BOOLEAN,
    homework_completed BOOLEAN,
    participation_score DECIMAL,
    teacher_comments TEXT,
    additional_notes TEXT,
    FOREIGN KEY (calendar_id) REFERENCES Calendar(calendar_id)
);



getstudents(teacher_id)
addstudent(teacher_id, full infa stduent)
getstudent(student_id)
addtestscore(student_id, infa, score)
gettestsession(student_id)
addlessonfeedback(student_id, infa, feedback)


chatgpt()


