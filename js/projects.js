/*
 * PROJECT DATA — the only place you need to edit to add, remove or reorder projects.
 *
 * Fields:
 *   title            (string)   Project name.
 *   description      (string)   One or two sentences, shown on the card.
 *   longDescription  (string)   Optional. Fuller write-up shown in the modal. Blank lines (\n\n) make paragraphs.
 *   tags             (string[]) Tech / topics. These automatically become the filter chips.
 *   image            (string)   Path to a screenshot, e.g. "assets/images/my-app.png" (ideal ratio 16:10, 800x500).
 *   imageAlt         (string)   Describes the image for screen readers.
 *   imagePosition    (string)   Optional. Which part of the image to keep when it is cropped, e.g. "left center" or "top".
 *   liveUrl          (string)   Optional. Live demo link. Leave "" or remove to hide the "Live" button.
 *   codeUrl          (string)   Optional. Source code link. Leave "" or remove to hide the "Code" button.
 *   featured         (boolean)  true = badge + larger card on wide screens.
 *
 * To add a project, copy one of the objects below, paste it inside the brackets and edit the values.
 */
const PROJECTS = [
  {
    // Real project: https://github.com/iliasadeghi/studyhub
    title: "StudyHub",
    description:
      "A calm, modern organizer for high school students and teachers: tasks, priorities, calendar, class notes and real-time messaging.",
    longDescription:
      "Students track assignments, see what to do first with a smart priority score, read class notes and message their teachers in real time. Teachers run classes with join codes, share notes, hold office hours and answer students.\n\nBuilt with React 18, TypeScript and Vite on Vercel, with Supabase for Postgres, authentication, Row Level Security and real-time chat. Includes list, Kanban and Eisenhower task views with drag-and-drop, month and week calendars, a Markdown notes editor, a school admin dashboard with an audit log, a command palette, and light and dark themes.",
    tags: ["TypeScript", "React", "Supabase", "Web"],
    image: "assets/images/studyhub.jpg",
    imagePosition: "left center",
    imageAlt: "Screenshot of the StudyHub sign-in page: \"Your classes, tasks and teachers, in one calm place.\"",
    liveUrl: "https://studyhub-iota-seven.vercel.app",
    codeUrl: "https://github.com/iliasadeghi/studyhub",
    featured: true
  },
  {
    // Real project: https://github.com/iliasadeghi/pitchiq
    title: "PitchIQ",
    description:
      "A competitive soccer quiz experience where fans duel head-to-head, with a playable timed duel, leaderboard, ranked divisions and a Weekly Cup.",
    longDescription:
      "Landing page for PitchIQ, a concept app where fans duel each other on players, teams, cups and legendary matches. It includes a playable head-to-head duel against a simulated rival: pick a category, then answer five timed questions, scoring for accuracy and speed, with keyboard controls and a relaxed mode that turns the timer off. Around it sit a live results ticker, a leaderboard with Global, This week and Friends tabs, ranked divisions and badges, and a Weekly Cup with a countdown and bracket.\n\nBuilt with React 18, TypeScript (strict mode), Vite, Tailwind CSS and Framer Motion, with accessibility linting. A GitHub Actions workflow builds and deploys it to GitHub Pages on every push.",
    tags: ["TypeScript", "React", "Tailwind", "Web"],
    image: "assets/images/pitchiq.jpg",
    imageAlt: "Screenshot of the PitchIQ page: \"Prove your ball knowledge.\" beside a live ranked duel scoreboard",
    liveUrl: "https://iliasadeghi.github.io/pitchiq/",
    codeUrl: "https://github.com/iliasadeghi/pitchiq",
    featured: false
  },
  {
    // Real project: https://github.com/iliasadeghi/pocketwise-landing
    title: "Pocketwise",
    description:
      "A responsive landing page for a concept budgeting app that turns student loans, pay and rent into one weekly safe-to-spend number.",
    longDescription:
      "A static, frontend-only landing page for Pocketwise, a concept budgeting app for university students. It covers features, how it works, pricing tiers and an FAQ, with a waitlist form that validates the email and shows loading, success and error states.\n\nBuilt with React, TypeScript, Vite, Tailwind CSS and Framer Motion. All copy lives in one content file, colours are CSS-variable design tokens with light and dark themes, and the phone and app-window mockups are built from markup rather than images.",
    tags: ["TypeScript", "React", "Tailwind", "Web"],
    image: "assets/images/pocketwise.jpg",
    imageAlt: "Screenshot of the Pocketwise landing page: \"Know exactly what you can spend this week.\" beside a phone showing a weekly budget",
    liveUrl: "https://iliasadeghi.github.io/pocketwise-landing/",
    codeUrl: "https://github.com/iliasadeghi/pocketwise-landing",
    featured: false
  }
];
