/*
 * REVIEW DATA: edit this file to add, remove or reorder reviews.
 *
 * Fields:
 *   name         (string)  Who wrote the review.
 *   role         (string)  Their job title or relationship to you, e.g. "Teaching Assistant".
 *   company      (string)  Their company, club or team.
 *   rating       (number)  Score out of 5. Decimals are fine, e.g. 4.5.
 *   quote        (string)  What they said.
 *   project      (string)  Optional. Which project the review is about.
 *   placeholder  (boolean) true shows a "Mock" badge. Delete this line (or set it to false) only for reviews that are real.
 *
 * The average score shown at the top is calculated from the ratings below.
 * If this array is empty, the whole Reviews section is hidden automatically.
 *
 * NOTE: every review below is MOCK DATA written for a class exercise. The people, businesses and quotes are
 * fictional. TODO: replace with real reviews (with each person's permission) before sharing the site publicly,
 * or empty this array to hide the section.
 */
const REVIEWS = [
  {
    name: "Priya N.",
    role: "Hackathon Mentor",
    company: "City Code Jam",
    rating: 5,
    quote:
      "Ilia had a working demo before most teams had finished planning. He explained where the model gets things wrong, not just its accuracy, and that impressed the judges.",
    project: "Handwritten Digit Classifier",
    placeholder: true
  },
  {
    name: "Daniel K.",
    role: "Teaching Assistant",
    company: "Intro Programming Course",
    rating: 4.5,
    quote:
      "Consistently hands in clean, well-commented code and helps classmates debug theirs. Asks the right questions when stuck instead of guessing.",
    project: "Study Buddy Planner",
    placeholder: true
  },
  {
    name: "Sofia R.",
    role: "Small Business Owner",
    company: "Brightside Bakery",
    rating: 5,
    quote:
      "He built a simple tool to track our weekly costs. It worked on day one and he patiently walked me through how to use it.",
    project: "Expense Tracker CLI",
    placeholder: true
  },
  {
    name: "Marcus L.",
    role: "Team Lead",
    company: "Campus Robotics Club",
    rating: 5,
    quote:
      "Fixed our sensor wiring in one afternoon, then tuned the controller until the robot finished the course every single run.",
    project: "Line-Following Robot",
    placeholder: true
  },
  {
    name: "Omar H.",
    role: "Project Teammate",
    company: "Group Project Team",
    rating: 4,
    quote:
      "Great teammate and quick to learn new tools. I'd like him to start writing documentation earlier, but the final result was solid.",
    project: "Tiny Ray Tracer",
    placeholder: true
  },
  {
    name: "Jenna W.",
    role: "Student Mentor",
    company: "Campus Coding Club",
    rating: 4.5,
    quote:
      "Took feedback well and improved the chatbot's fallback answers within days. Clear communicator who keeps the whole team in the loop.",
    project: "Campus FAQ Chatbot",
    placeholder: true
  }
];
