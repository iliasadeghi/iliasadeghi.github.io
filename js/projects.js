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
 *   liveUrl          (string)   Optional. Live demo link. Leave "" or remove to hide the "Live" button.
 *   codeUrl          (string)   Optional. Source code link. Leave "" or remove to hide the "Code" button.
 *   featured         (boolean)  true = badge + larger card on wide screens.
 *
 * TODO: replace — every project below is placeholder content.
 */
const PROJECTS = [
  {
    // TODO: replace
    title: "Handwritten Digit Classifier",
    description:
      "A small convolutional neural network that recognises handwritten digits, with a canvas you can draw on to test it live.",
    longDescription:
      "Trained a CNN on the MNIST dataset and reached about 99% test accuracy. Includes a notebook walking through data loading, model design and evaluation, plus a tiny drawing demo.\n\nWhat I learned: how learning rate and augmentation affect overfitting, and how to export a model so it can run in the browser.",
    tags: ["Python", "AI/ML"],
    image: "assets/images/project-1.svg",
    imageAlt: "Placeholder: abstract grid of squares representing a digit classifier",
    liveUrl: "https://example.com/digit-classifier", // TODO: replace
    codeUrl: "https://github.com/", // TODO: replace
    featured: true
  },
  {
    // TODO: replace
    title: "Study Buddy Planner",
    description:
      "A lightweight web app for planning study sessions and tracking deadlines, built with vanilla JavaScript and saved in the browser.",
    longDescription:
      "Add courses, break assignments into tasks and see a weekly view of what is due. Everything is stored in localStorage, so there is no account and no server.\n\nBuilt to keep my own first-year workload under control.",
    tags: ["JavaScript", "Web"],
    image: "assets/images/project-2.svg",
    imageAlt: "Placeholder: stylised task list interface",
    liveUrl: "https://example.com/study-buddy", // TODO: replace
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  },
  {
    // TODO: replace
    title: "Arduino Weather Station",
    description:
      "A small sensor node that logs temperature and humidity and shows the trend on an LCD.",
    longDescription:
      "Uses a DHT22 sensor and an Arduino Uno. Readings are averaged, stored in a ring buffer and plotted as a mini bar graph on a 16x2 LCD.\n\nMy first hands-on hardware project: wiring, debouncing a button and writing clean C++ for a tiny memory budget.",
    tags: ["C++", "Hardware"],
    image: "assets/images/project-3.svg",
    imageAlt: "Placeholder: line chart representing sensor readings",
    codeUrl: "https://github.com/", // TODO: replace (no live demo for hardware)
    featured: false
  },
  {
    // TODO: replace
    title: "Tiny Ray Tracer",
    description:
      "A from-scratch ray tracer that renders spheres with shadows and reflections to a PNG.",
    longDescription:
      "Written in Python first for clarity, then ported to C for speed. Implements vectors, ray-sphere intersection, diffuse and specular shading, shadows and recursive reflections.\n\nA good way to practice linear algebra and to see how much faster compiled code can be.",
    tags: ["C", "Python", "Graphics"],
    image: "assets/images/project-4.svg",
    imageAlt: "Placeholder: two shaded spheres on a floor",
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  },
  {
    // TODO: replace
    title: "Expense Tracker CLI",
    description:
      "A command-line tool for logging expenses and summarising spending by category, with CSV export.",
    longDescription:
      "Commands to add, list, edit and summarise expenses, stored in a local JSON file. Includes unit tests and a simple plugin hook for custom reports.\n\nPractice with argument parsing, file I/O, testing and packaging a Python project.",
    tags: ["Python", "CLI"],
    image: "assets/images/project-5.svg",
    imageAlt: "Placeholder: terminal window with coloured lines of text",
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  },
  {
    // TODO: replace
    title: "Campus FAQ Chatbot",
    description:
      "A small question-answering bot that matches student questions to the right campus FAQ using text embeddings.",
    longDescription:
      "Turns a list of FAQ entries into vectors and finds the closest match to what the user asks, with a confidence score and a graceful \"I'm not sure\" fallback.\n\nA first step into natural language processing, and a good lesson in evaluating a model instead of trusting it.",
    tags: ["Python", "AI/ML"],
    image: "assets/images/project-6.svg",
    imageAlt: "Placeholder: chat bubbles with a small robot icon",
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  },
  {
    // TODO: replace
    title: "Pixel Platformer",
    description:
      "A tiny browser game with jumping, coins and enemies, drawn on an HTML canvas with no libraries.",
    longDescription:
      "Built a fixed-timestep game loop, simple tile collisions and a level format stored as plain text. Plays with keyboard or touch controls.\n\nTaught me a lot about game loops, state and keeping code organised as a project grows.",
    tags: ["JavaScript", "Game Dev"],
    image: "assets/images/project-7.svg",
    imageAlt: "Placeholder: pixel-art platformer scene with coins and a small character",
    liveUrl: "https://example.com/pixel-platformer", // TODO: replace
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  },
  {
    // TODO: replace
    title: "Line-Following Robot",
    description:
      "A small wheeled robot that follows a track using infrared sensors and a PID controller.",
    longDescription:
      "Two IR sensors read the line, and a PID loop adjusts motor speeds to stay on track. Tuned the constants by testing on printed tracks with sharp curves.\n\nMy introduction to control systems and debugging real hardware.",
    tags: ["C++", "Hardware"],
    image: "assets/images/project-8.svg",
    imageAlt: "Placeholder: small robot following a white curved track",
    codeUrl: "https://github.com/", // TODO: replace
    featured: false
  }
];
