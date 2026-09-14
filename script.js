const entry = document.querySelector("#entry");
let entryDismissed = false;

function dismissEntry() {
  if (entryDismissed) return;
  entryDismissed = true;
  entry.classList.add("hidden");
}

window.addEventListener("wheel", dismissEntry, { once: true, passive: true });
window.addEventListener("pointermove", dismissEntry, { once: true, passive: true });
window.addEventListener("touchstart", dismissEntry, { once: true, passive: true });
window.addEventListener("keydown", dismissEntry, { once: true });
entry.addEventListener("click", dismissEntry, { once: true });
window.setTimeout(dismissEntry, 2200);

const pageSections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll('.site-header nav a, .contents a')];

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entryItem) => entryItem.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.5] }
);

pageSections.forEach((section) => sectionObserver.observe(section));

const demoTasks = [
  {
    family: "Human video",
    title: "Pick up a red towel",
    prompt: "Imitate the demonstrated two-hand grasp and lift the red towel with the robot's right hand.",
    reference: { src: "assets/videos/towel-reference.mp4", label: "Human egocentric demonstration", duration: "Real time" },
    configs: [
      { label: "With human video", model: "GPT-6 Astra", context: "Human demonstration", success: "2 / 3", decisions: "76.7", time: "18.9 min", src: "assets/videos/towel-with-demo.mp4", trial: "Experiment 1 · success", view: "Top view", usesReference: true },
      { label: "Without video", model: "GPT-6", context: "No human demonstration", success: "0 / 3", decisions: "96.3", time: "24.6 min", src: "assets/videos/towel-no-demo.mp4", trial: "Experiment 1 · give up", view: "Left view", usesReference: false }
    ]
  },
  {
    family: "Human video",
    title: "Remove a glue-stick cap",
    prompt: "Use the observed pulling procedure to separate the cap from the glue stick.",
    reference: { src: "assets/videos/glue-reference.mp4", label: "Human demonstration", duration: "Real time" },
    configs: [
      { label: "With human video", model: "GPT-6 Astra", context: "Human demonstration", success: "3 / 3", decisions: "65.7", time: "16.9 min", src: "assets/videos/glue-with-demo.mp4", trial: "Experiment 2 · success", view: "Top view", usesReference: true },
      { label: "Without video", model: "GPT-6", context: "No human demonstration", success: "3 / 3", decisions: "49.3", time: "12.2 min", src: "assets/videos/glue-no-demo.mp4", trial: "Experiment 3 · success", view: "Left view", usesReference: false }
    ]
  },
  {
    family: "Goal image",
    title: "Arrange blocks into a T",
    prompt: "Match the target image's T shape, including block colors, relative positions, and spacing.",
    configs: [
      { label: "Goal image", model: "GPT-6", context: "Target image", success: "3 / 3", decisions: "59.3", time: "13.3 min", src: "assets/videos/blocks-t.mp4", trial: "Experiment 1 · success", view: "Left view" }
    ]
  },
  {
    family: "Goal image",
    title: "Arrange four fruits",
    prompt: "Reproduce the target layout using the same fruit identities, positions, and spacing.",
    configs: [
      { label: "Goal image", model: "GPT-6", context: "Target image", success: "3 / 3", decisions: "49.0", time: "12.4 min", src: "assets/videos/fruit-layout.mp4", trial: "Experiment 1 · success", view: "Right view" }
    ]
  },
  {
    family: "Self history",
    title: "Find the plate and place the lemon",
    prompt: "Explore the scene, locate the pink plate, and place the lemon onto it.",
    configs: [
      { label: "Self history", model: "GPT-6 Astra", context: "Interaction history", success: "3 / 3", decisions: "35.0", time: "8.1 min", src: "assets/videos/lemon-search.mp4", trial: "Experiment 1 · success", view: "Top view" }
    ]
  },
  {
    family: "Self history",
    title: "Movable exploration",
    prompt: "Search for the Sprite bottle by changing viewpoint or moving safe obstacles, then place it in the yellow basket.",
    configs: [
      { label: "GPT-6", model: "GPT-6", context: "Interaction history", success: "3 / 3", decisions: "40.33", time: "25.53 min", src: "assets/videos/mobile-gpt6.mp4", trial: "Experiment 1 · success", view: "Multi-view" },
      { label: "Fable 5.1", model: "Fable 5.1", context: "Interaction history", success: "1 / 3", decisions: "35.0", time: "20.79 min", src: "assets/videos/mobile-fable.mp4", trial: "Experiment 1 · failure", view: "Multi-view" }
    ]
  },
  {
    family: "Human interaction",
    title: "Play tic-tac-toe",
    prompt: "Track the live board and human moves, obey turn-taking, and choose a legal winning or blocking move.",
    configs: [
      { label: "Live interaction", model: "GPT-6", context: "Online interaction", success: "3 / 3", decisions: "69.7", time: "13.6 min", src: "assets/videos/tic-tac-toe.mp4", trial: "Experiment 1 · success", view: "Right view" }
    ]
  },
  {
    family: "Human interaction",
    title: "Pick the pointed fruit",
    prompt: "Wait for a human gesture, then pick the indicated fruit and place it on the plate.",
    configs: [
      { label: "Live interaction", model: "GPT-6", context: "Online interaction", success: "3 / 3", decisions: "67.3", time: "15.0 min", src: "assets/videos/pointed-fruit.mp4", trial: "Experiment 1 · success", view: "Right view" }
    ]
  }
];

const configuredTasks = [
  { title: "Imitate a hand dance", family: "Human video", configs: ["GPT-6 · with video", "Fable 5.1 · with video", "GPT-6 · no video", "Fable 5.1 · no video"], note: "A source path is recorded, but no downloadable result video is attached." },
  { title: "Unscrew a bottle cap", family: "Robot demonstration", configs: ["GPT-6 / Fable 5.1 · no demonstration", "GPT-6 / Fable 5.1 · robot video", "GPT-6 / Fable 5.1 · video + actions"], note: "Three robot-context conditions are configured; results are not yet attached." },
  { title: "Insert a plug", family: "Robot demonstration", configs: ["GPT-6 / Fable 5.1 · no demonstration", "GPT-6 / Fable 5.1 · robot video", "GPT-6 / Fable 5.1 · video + actions"], note: "Three robot-context conditions are configured; results are not yet attached." },
  { title: "Tissue-box self-correction", family: "Self history", configs: ["GPT-6 · interaction history", "Fable 5.1 · interaction history"], note: "The task prompt is present; no result media is attached." }
];

const demoGrid = document.querySelector("#demo-grid");
const configuredGrid = document.querySelector("#configured-grid");

function statusClass(success) {
  if (/^(0|1)\s*\/\s*3/.test(success)) return "low";
  if (/2\s*\/\s*3/.test(success)) return "mid";
  return "high";
}

function renderDemoCard(task, taskIndex) {
  const card = document.createElement("article");
  card.className = "demo-card";
  card.dataset.family = task.family;
  const tabs = task.configs.map((config, index) => `
    <button type="button" role="tab" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}" data-config="${index}">
      ${config.label}
    </button>`).join("");
  const reference = task.reference ? `
    <details class="reference-demo">
      <summary><span>Conditioning clip</span><b>${task.reference.label}</b></summary>
      <div class="reference-video-wrap">
        <video controls muted playsinline preload="metadata" src="${task.reference.src}"></video>
        <span>${task.reference.duration}</span>
      </div>
    </details>` : "";

  card.innerHTML = `
    <header class="demo-card-head">
      <div><span class="demo-index">${String(taskIndex + 1).padStart(2, "0")}</span><span class="demo-family">${task.family}</span></div>
      <h3>${task.title}</h3>
      <p>${task.prompt}</p>
    </header>
    <div class="config-tabs" role="tablist" aria-label="${task.title} configurations">${tabs}</div>
    <div class="demo-stage">
      <video class="result-video" controls muted playsinline preload="metadata"></video>
      <div class="video-overlay"><span class="speed-badge">20&times; robot run</span><span class="view-badge"></span></div>
      <p class="video-error" hidden>Video could not be loaded. Please use a modern browser with MP4/H.264 support.</p>
    </div>
    <div class="demo-meta" aria-live="polite">
      <div><span>Model</span><strong data-field="model"></strong></div>
      <div><span>Context</span><strong data-field="context"></strong></div>
      <div><span>Success</span><strong class="success-value" data-field="success"></strong></div>
      <div><span>Mean decisions</span><strong data-field="decisions"></strong></div>
      <div><span>Mean time</span><strong data-field="time"></strong></div>
      <div><span>Shown run</span><strong data-field="trial"></strong></div>
    </div>
    ${reference}`;

  const player = card.querySelector(".result-video");
  const buttons = [...card.querySelectorAll("[data-config]")];
  const referenceBlock = card.querySelector(".reference-demo");

  function selectConfig(index) {
    const config = task.configs[index];
    const wasPlaying = !player.paused;
    player.pause();
    player.src = config.src;
    player.load();
    if (wasPlaying) player.play().catch(() => {});
    card.querySelector('[data-field="model"]').textContent = config.model;
    card.querySelector('[data-field="context"]').textContent = config.context;
    const success = card.querySelector('[data-field="success"]');
    success.textContent = config.success;
    success.className = `success-value ${statusClass(config.success)}`;
    card.querySelector('[data-field="decisions"]').textContent = config.decisions;
    card.querySelector('[data-field="time"]').textContent = config.time;
    card.querySelector('[data-field="trial"]').textContent = config.trial;
    card.querySelector(".view-badge").textContent = config.view;
    if (referenceBlock) referenceBlock.hidden = !config.usesReference;
    buttons.forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectConfig(index));
    button.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = event.key === "ArrowRight"
        ? (index + 1) % buttons.length
        : (index - 1 + buttons.length) % buttons.length;
      buttons[next].focus();
      selectConfig(next);
    });
  });
  player.addEventListener("error", () => { card.querySelector(".video-error").hidden = false; });
  player.addEventListener("loadeddata", () => { card.querySelector(".video-error").hidden = true; });
  selectConfig(0);
  return card;
}

demoTasks.forEach((task, index) => demoGrid.appendChild(renderDemoCard(task, index)));

configuredTasks.forEach((task) => {
  const card = document.createElement("article");
  card.className = "configured-card";
  card.innerHTML = `
    <span>${task.family}</span>
    <h4>${task.title}</h4>
    <ul>${task.configs.map((config) => `<li>${config}</li>`).join("")}</ul>
    <p>${task.note}</p>`;
  configuredGrid.appendChild(card);
});

document.querySelectorAll("video").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});

const copyButton = document.querySelector("#copy-citation");
copyButton.addEventListener("click", async () => {
  const bibtex = document.querySelector("#bibtex").textContent;
  try {
    await navigator.clipboard.writeText(bibtex);
    copyButton.textContent = "Copied";
    window.setTimeout(() => { copyButton.textContent = "Copy citation"; }, 1600);
  } catch {
    copyButton.textContent = "Select and copy";
  }
});
