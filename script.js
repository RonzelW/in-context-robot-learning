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
const navLinks = [...document.querySelectorAll('.contents a')];

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
    reference: {
      src: "assets/videos/towel-reference.mp4?v=20260914-human-source",
      poster: "assets/images/towel-human-poster.jpg",
      label: "Original human video",
      playback: "Real time"
    },
    configs: [
      { label: "With human video", model: "GPT-6 Astra", context: "Human demonstration", success: "2 / 3", decisions: "76.7", time: "18.9 min", src: "assets/videos/towel-with-demo.mp4", poster: "assets/images/towel-with-human-poster.jpg", trial: "Success", view: "Head view", usesReference: true },
      { label: "Without human video", model: "GPT-6 Astra", context: "No human demonstration", success: "0 / 3", decisions: "96.3", time: "24.6 min", src: "assets/videos/towel-no-demo.mp4", poster: "assets/images/towel-without-human-poster.jpg", trial: "Gave up", view: "Head view", usesReference: false }
    ]
  },
  {
    family: "Human video",
    title: "Remove a glue-stick cap",
    prompt: "Use the observed pulling procedure to separate the cap from the glue stick.",
    reference: {
      src: "assets/videos/glue-reference.mp4?v=20260914-human-source",
      poster: "assets/images/glue-human-poster.jpg",
      label: "Original human video",
      playback: "Real time"
    },
    configs: [
      { label: "With human video", model: "GPT-6 Astra", context: "Human demonstration", success: "3 / 3", decisions: "65.7", time: "16.9 min", src: "assets/videos/glue-with-demo.mp4", poster: "assets/images/glue-with-human-poster.jpg", trial: "Success", view: "Head view", usesReference: true },
      { label: "Without human video", model: "GPT-6 Astra", context: "No human demonstration", success: "3 / 3", decisions: "49.3", time: "12.2 min", src: "assets/videos/glue-no-demo.mp4", poster: "assets/images/glue-without-human-poster.jpg", trial: "Success", view: "Head view", usesReference: false }
    ]
  },
  {
    family: "Goal image",
    title: "Arrange blocks into a T",
    prompt: "Match the target image's T shape, including block colors, relative positions, and spacing.",
    targetImage: "assets/images/5cubes-in-T-shape.jpg?v=20260915-latest-target",
    configs: [
      { label: "Goal image", model: "GPT-6 Astra", context: "Target image", success: "3 / 3", decisions: "59.3", time: "13.3 min", src: "assets/videos/blocks-t.mp4", poster: "assets/images/blocks-t-run-poster.jpg", trial: "Success", view: "Head view" }
    ]
  },
  {
    family: "Goal image",
    title: "Arrange four fruits",
    prompt: "Reproduce the target layout using the same fruit identities, positions, and spacing.",
    targetImage: "assets/images/go-image-4fruits.jpg",
    configs: [
      { label: "Goal image", model: "GPT-6 Astra", context: "Target image", success: "3 / 3", decisions: "49.0", time: "12.4 min", src: "assets/videos/fruit-layout.mp4", poster: "assets/images/fruit-layout-run-poster.jpg", trial: "Success", view: "Head view" }
    ]
  },
  {
    family: "Self history",
    title: "Find the plate and place the lemon",
    prompt: "Explore the scene, locate the pink plate, and place the lemon onto it.",
    configs: [
      { label: "Self history", model: "GPT-6 Astra", context: "Interaction history", success: "3 / 3", decisions: "35.0", time: "8.1 min", src: "assets/videos/lemon-search.mp4", trial: "Success", view: "Head view" }
    ]
  },
  {
    family: "Self history",
    title: "Movable exploration",
    prompt: "Search for the Sprite bottle by changing viewpoint or moving safe obstacles, then place it in the yellow basket.",
    configs: [
      { label: "GPT-6 Astra", model: "GPT-6 Astra", context: "Interaction history", success: "3 / 3", decisions: "40.33", time: "25.53 min", src: "assets/videos/mobile-gpt6.mp4", trial: "Success", view: "Head view", speed: "30× robot run" }
    ]
  },
  {
    family: "Human interaction",
    title: "Play tic-tac-toe",
    prompt: "Track the live board and human moves, obey turn-taking, and choose a legal winning or blocking move.",
    configs: [
      { label: "Live interaction", model: "GPT-6 Astra", context: "Online interaction", success: "3 / 3", decisions: "69.7", time: "13.6 min", src: "assets/videos/tic-tac-toe.mp4", trial: "Success", view: "Head view" }
    ]
  },
  {
    family: "Human interaction",
    title: "Pick the pointed fruit",
    prompt: "Wait for a human gesture, then pick the indicated fruit and place it on the plate.",
    configs: [
      { label: "Live interaction", model: "GPT-6 Astra", context: "Online interaction", success: "3 / 3", decisions: "67.3", time: "15.0 min", src: "assets/videos/pointed-fruit.mp4", trial: "Success", view: "Head view" }
    ]
  }
];

const configuredTasks = [
  { title: "Imitate a hand dance", family: "Human video", configs: ["GPT-6 Astra · with video", "Claude Fable 5.1 · with video", "GPT-6 Astra · no video", "Claude Fable 5.1 · no video"], note: "A source path is recorded, but no downloadable result video is attached." },
  { title: "Unscrew a bottle cap", family: "Robot demonstration", configs: ["GPT-6 Astra / Claude Fable 5.1 · no demonstration", "GPT-6 Astra / Claude Fable 5.1 · robot video", "GPT-6 Astra / Claude Fable 5.1 · video + actions"], note: "Three robot-context conditions are configured; results are not yet attached." },
  { title: "Insert a plug", family: "Robot demonstration", configs: ["GPT-6 Astra / Claude Fable 5.1 · no demonstration", "GPT-6 Astra / Claude Fable 5.1 · robot video", "GPT-6 Astra / Claude Fable 5.1 · video + actions"], note: "Three robot-context conditions are configured; results are not yet attached." },
  { title: "Tissue-box self-correction", family: "Self history", configs: ["GPT-6 Astra · interaction history", "Claude Fable 5.1 · interaction history"], note: "The task prompt is present; no result media is attached." }
];

const demoGrid = document.querySelector("#demo-grid");
const configuredGrid = document.querySelector("#configured-grid");

function statusClass(success) {
  if (/^(0|1)\s*\/\s*3/.test(success)) return "low";
  if (/2\s*\/\s*3/.test(success)) return "mid";
  return "high";
}

function activateRolloutRail(group) {
  const rail = group.querySelector(".rollout-rail");
  const previous = group.querySelector(".rollout-nav.previous");
  const next = group.querySelector(".rollout-nav.next");

  function updateControls() {
    const maxScroll = Math.max(0, rail.scrollWidth - rail.clientWidth);
    previous.disabled = rail.scrollLeft <= 3;
    next.disabled = rail.scrollLeft >= maxScroll - 3;
  }

  previous.addEventListener("click", () => rail.scrollBy({ left: -rail.clientWidth * .82, behavior: "smooth" }));
  next.addEventListener("click", () => rail.scrollBy({ left: rail.clientWidth * .82, behavior: "smooth" }));
  rail.addEventListener("scroll", updateControls, { passive: true });
  if ("ResizeObserver" in window) new ResizeObserver(updateControls).observe(rail);
  window.requestAnimationFrame(updateControls);
}

function renderHumanVideoTask(task, taskIndex) {
  const group = document.createElement("article");
  group.className = "demo-rollout-group";
  group.dataset.family = task.family;
  group.dataset.clips = String(task.configs.length + 1);

  const resultClips = task.configs.map((config) => `
    <figure class="rollout-card">
      <div class="rollout-media">
        <video controls muted playsinline preload="metadata" data-playback="${config.speed || "20× robot run"}" poster="${config.poster}" src="${config.src}?v=20260914-head"></video>
        <div class="video-overlay"><span>${config.speed || "20× robot run"}</span><span>${config.view}</span></div>
      </div>
      <figcaption>
        <div class="rollout-caption-head"><h4>${config.label}</h4><span class="rollout-result ${statusClass(config.success)}">${config.success} success</span></div>
        <p>${config.model} · ${config.context}</p>
        <p class="rollout-detail">${config.decisions} mean decisions · ${config.time} · ${config.trial}</p>
      </figcaption>
    </figure>`).join("");

  group.innerHTML = `
    <header class="rollout-group-head">
      <div class="rollout-group-title">
        <p class="rollout-kicker"><span class="demo-index">${String(taskIndex + 1).padStart(2, "0")}</span>${task.family}</p>
        <h3>${task.title}</h3>
        <p>${task.prompt}</p>
      </div>
      <span class="clip-count">${task.configs.length + 1} clips</span>
    </header>
    <div class="rollout-rail-wrap">
      <button class="rollout-nav previous" type="button" aria-label="Show previous clips"><span aria-hidden="true">&#8249;</span></button>
      <div class="rollout-rail" aria-label="${task.title}: demonstration and conditioning comparison">
        <figure class="rollout-card">
          <div class="rollout-media">
            <video controls muted playsinline preload="metadata" data-playback="${task.reference.playback}" poster="${task.reference.poster}" src="${task.reference.src}"></video>
            <div class="video-overlay"><span>${task.reference.playback}</span><span>First-person view</span></div>
          </div>
          <figcaption>
            <div class="rollout-caption-head"><h4>Human demonstration</h4><span class="rollout-input">Conditioning input</span></div>
            <p>First-person view · Real-time playback</p>
          </figcaption>
        </figure>
        ${resultClips}
      </div>
      <button class="rollout-nav next" type="button" aria-label="Show more clips"><span aria-hidden="true">&#8250;</span></button>
    </div>`;

  group.querySelectorAll("video").forEach((video) => {
    video.addEventListener("error", () => video.closest(".rollout-media").classList.add("video-load-failed"));
  });
  activateRolloutRail(group);
  return group;
}

function renderGoalImageTask(task, taskIndex) {
  const config = task.configs[0];
  const group = document.createElement("article");
  group.className = "demo-rollout-group goal-image-group";
  group.dataset.family = task.family;
  group.dataset.clips = "2";

  group.innerHTML = `
    <header class="rollout-group-head">
      <div class="rollout-group-title">
        <p class="rollout-kicker"><span class="demo-index">${String(taskIndex + 1).padStart(2, "0")}</span>${task.family}</p>
        <h3>${task.title}</h3>
        <p>${task.prompt}</p>
      </div>
      <span class="clip-count">2 clips</span>
    </header>
    <div class="rollout-rail-wrap">
      <button class="rollout-nav previous" type="button" aria-label="Show previous clips"><span aria-hidden="true">&#8249;</span></button>
      <div class="rollout-rail" aria-label="${task.title}: target image and robot rollout">
        <figure class="rollout-card">
          <div class="rollout-media goal-image-media">
            <img src="${task.targetImage}" alt="Target arrangement for ${task.title.toLowerCase()}" />
          </div>
          <figcaption>
            <div class="rollout-caption-head"><h4>Target image</h4><span class="rollout-input">Conditioning input</span></div>
            <p>Goal-state reference</p>
          </figcaption>
        </figure>
        <figure class="rollout-card">
          <div class="rollout-media">
            <video controls muted playsinline preload="metadata" data-playback="${config.speed || "20× robot run"}" poster="${config.poster}" src="${config.src}?v=20260914-goal-image"></video>
            <div class="video-overlay"><span>${config.speed || "20× robot run"}</span><span>${config.view}</span></div>
          </div>
          <figcaption>
            <div class="rollout-caption-head"><h4>Evaluation run</h4><span class="rollout-result ${statusClass(config.success)}">${config.success} success</span></div>
            <p>${config.model} · ${config.context}</p>
            <p class="rollout-detail">${config.decisions} mean decisions · ${config.time} · ${config.trial}</p>
          </figcaption>
        </figure>
      </div>
      <button class="rollout-nav next" type="button" aria-label="Show more clips"><span aria-hidden="true">&#8250;</span></button>
    </div>`;

  group.querySelector("video").addEventListener("error", (event) => {
    event.currentTarget.closest(".rollout-media").classList.add("video-load-failed");
  });
  activateRolloutRail(group);
  return group;
}

const contextFamilyDetails = {
  "Self history": {
    title: "Learning from interaction history",
    description: "Earlier observations, actions, failures, and discoveries remain available for exploration and recovery."
  },
  "Human interaction": {
    title: "Coordinating through live human cues",
    description: "Gestures, turn history, and live feedback guide target selection and action timing."
  }
};

function renderContextFamilyGroup(tasks, startIndex) {
  const family = tasks[0].family;
  const details = contextFamilyDetails[family];
  const isSingleTask = tasks.length === 1;
  const group = document.createElement("article");
  group.className = "demo-rollout-group context-family-group";
  group.dataset.family = family;
  group.dataset.clips = String(tasks.length);

  const cards = tasks.map((task, taskOffset) => {
    const tabs = task.configs.length > 1
      ? `<div class="rollout-config-tabs" role="tablist" aria-label="${task.title} configurations">
          ${task.configs.map((config, configIndex) => `
            <button type="button" role="tab" aria-selected="${configIndex === 0}" tabindex="${configIndex === 0 ? 0 : -1}" data-config="${configIndex}">${config.label}</button>`).join("")}
        </div>`
      : "";
    return `
      <figure class="rollout-card" data-context-task="${taskOffset}">
        <div class="rollout-media">
          <video class="result-video" controls muted playsinline preload="metadata"></video>
          <div class="video-overlay"><span class="speed-badge"></span><span class="view-badge"></span></div>
          <p class="video-error" hidden>Video could not be loaded.</p>
        </div>
        <figcaption aria-live="polite">
          <div class="rollout-caption-head">
            <h4><span class="demo-index">${String(startIndex + taskOffset + 1).padStart(2, "0")}</span>${isSingleTask ? task.configs[0].model : task.title}</h4>
            <span class="rollout-result" data-field="success"></span>
          </div>
          <p class="rollout-model" data-field="model"></p>
          ${isSingleTask ? "" : `<p class="rollout-task-copy">${task.prompt}</p>`}
          <p class="rollout-detail" data-field="detail"></p>
          ${tabs}
        </figcaption>
      </figure>`;
  }).join("");

  group.innerHTML = `
    <header class="rollout-group-head">
      <div class="rollout-group-title">
        <p class="rollout-kicker"><span class="demo-index">${isSingleTask ? String(startIndex + 1).padStart(2, "0") : `${String(startIndex + 1).padStart(2, "0")}&ndash;${String(startIndex + tasks.length).padStart(2, "0")}`}</span>${family}</p>
        <h3>${isSingleTask ? tasks[0].title : details.title}</h3>
        <p>${isSingleTask ? tasks[0].prompt : details.description}</p>
      </div>
      <span class="clip-count">${tasks.length} ${tasks.length === 1 ? "clip" : "clips"}</span>
    </header>
    <div class="rollout-rail-wrap">
      <button class="rollout-nav previous" type="button" aria-label="Show previous clips"><span aria-hidden="true">&#8249;</span></button>
      <div class="rollout-rail" aria-label="${family} robot rollouts">${cards}</div>
      <button class="rollout-nav next" type="button" aria-label="Show more clips"><span aria-hidden="true">&#8250;</span></button>
    </div>`;

  group.querySelectorAll("[data-context-task]").forEach((card, taskOffset) => {
    const task = tasks[taskOffset];
    const player = card.querySelector(".result-video");
    const buttons = [...card.querySelectorAll("[data-config]")];

    function selectConfig(index) {
      const config = task.configs[index];
      const wasPlaying = !player.paused;
      player.pause();
      player.dataset.playback = config.speed || "20× robot run";
      player.src = `${config.src}?v=20260915-clean-gallery`;
      player.load();
      if (wasPlaying) player.play().catch(() => {});
      const result = card.querySelector('[data-field="success"]');
      result.textContent = `${config.success} success`;
      result.className = `rollout-result ${statusClass(config.success)}`;
      card.querySelector('[data-field="model"]').textContent = isSingleTask ? config.context : `${config.model} · ${config.context}`;
      card.querySelector('[data-field="detail"]').textContent = `${config.decisions} mean decisions · ${config.time} · ${config.trial}`;
      card.querySelector(".speed-badge").textContent = config.speed || "20× robot run";
      card.querySelector(".view-badge").textContent = config.view;
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
  });

  activateRolloutRail(group);
  return group;
}

demoTasks.slice(0, 4).forEach((task, index) => {
  demoGrid.appendChild(task.family === "Human video"
    ? renderHumanVideoTask(task, index)
    : renderGoalImageTask(task, index));
});

let remainingTaskIndex = 4;
const remainingGroups = [
  [demoTasks[4]],
  [demoTasks[5]],
  demoTasks.slice(6)
];
remainingGroups.forEach((tasks) => {
  demoGrid.appendChild(renderContextFamilyGroup(tasks, remainingTaskIndex));
  remainingTaskIndex += tasks.length;
});

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

const claudeComparisonRuns = {
  paper: {
    batch: "paper · r01",
    decisions: "35",
    time: "795.5 s",
    outcome: "Left arm can1 tracking error",
    src: "assets/videos/claude-towel-paper-head.mp4"
  },
  fixed: {
    batch: "towel-fable51-fixed · r01",
    decisions: "3",
    time: "76.3 s",
    outcome: "Right arm can3 tracking error",
    src: "assets/videos/claude-towel-fixed-head.mp4"
  }
};

const comparisonVideo = document.querySelector("#claude-comparison-video");
const comparisonError = document.querySelector("#claude-comparison-error");
const comparisonButtons = [...document.querySelectorAll("[data-claude-batch]")];

function selectClaudeComparison(batchKey) {
  const run = claudeComparisonRuns[batchKey];
  const wasPlaying = !comparisonVideo.paused;
  comparisonVideo.pause();
  comparisonVideo.src = `${run.src}?v=20260914-compare`;
  comparisonVideo.load();
  if (wasPlaying) comparisonVideo.play().catch(() => {});
  document.querySelector('[data-compare-field="batch"]').textContent = run.batch;
  document.querySelector('[data-compare-field="decisions"]').textContent = run.decisions;
  document.querySelector('[data-compare-field="time"]').textContent = run.time;
  document.querySelector('[data-compare-field="outcome"]').textContent = run.outcome;
  comparisonButtons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.claudeBatch === batchKey));
  });
}

comparisonButtons.forEach((button) => {
  button.addEventListener("click", () => selectClaudeComparison(button.dataset.claudeBatch));
});
comparisonVideo.addEventListener("error", () => { comparisonError.hidden = false; });
comparisonVideo.addEventListener("loadeddata", () => { comparisonError.hidden = true; });
selectClaudeComparison("paper");

const kimiComparisonTasks = {
  remove: {
    task: "Remove fruit from the plate",
    gpt: {
      batch: "20260912-081820 · success",
      time: "208.2 s",
      instruction: "Remove the fruit from the plate",
      src: "assets/videos/gpt6-remove-fruit-head.mp4"
    },
    runs: [
      {
        key: "remove-mismatch",
        label: "04:26 · prompt mismatch",
        batch: "20260913-042615 · interrupted",
        time: "801.7 s",
        instruction: "Remove the fruit from the plate",
        outcome: "Interrupted → failed",
        status: "Failed",
        statusClass: "result-failure",
        src: "assets/videos/kimi-remove-inconsistent-head.mp4",
        note: "Known input inconsistency: the executed instruction was ‘Remove the fruit from the plate’, while the logged content said ‘Pick up the fruit’."
      },
      {
        key: "remove-consistent",
        label: "15:35 · matched prompt",
        batch: "20260913-153501 · interrupted",
        time: "170.5 s",
        instruction: "Remove the fruit from the plate",
        outcome: "Interrupted → failed",
        status: "Failed",
        statusClass: "result-failure",
        src: "assets/videos/kimi-remove-consistent-head.mp4",
        note: "The task instruction and logged content are consistent for this Kimi K3 run."
      }
    ]
  },
  place: {
    task: "Pick up fruit and place it in the plate",
    gpt: {
      batch: "20260912-080526 · success",
      time: "253.7 s",
      instruction: "Put the fruit on the plate",
      src: "assets/videos/gpt6-place-fruit-head.mp4"
    },
    runs: [
      {
        key: "place-give-up",
        label: "04:44 · give up",
        batch: "20260913-044453 · give up",
        time: "3454.3 s",
        instruction: "Pick up the fruit and place it on the plate",
        outcome: "Model gave up → failed",
        status: "Failed",
        statusClass: "result-failure",
        src: "assets/videos/kimi-place-fruit-head.mp4",
        note: "Both agents receive semantically equivalent text-only instructions with no demonstration; Kimi K3 explicitly gives up."
      }
    ]
  },
  raise: {
    task: "Raise both arms",
    gpt: {
      batch: "20260912-095109 · success",
      time: "40.6 s",
      instruction: "Raise both arms",
      src: "assets/videos/gpt6-raise-arms-head.mp4"
    },
    runs: [
      {
        key: "raise-success",
        label: "15:27 · success",
        batch: "20260913-152700 · success",
        time: "40.4 s",
        instruction: "Raise both arms",
        outcome: "Task completed",
        status: "Success",
        statusClass: "result-success",
        src: "assets/videos/kimi-raise-arms-head.mp4",
        note: "The task instruction is identical and both agents complete the text-only, no-demonstration task."
      }
    ]
  }
};

const kimiModule = document.querySelector(".kimi-comparison");
const kimiTaskButtons = [...document.querySelectorAll("[data-kimi-task]")];
const kimiRunTabs = document.querySelector("#kimi-run-tabs");
const gptKimiVideo = document.querySelector("#gpt6-kimi-comparison-video");
const kimiVideo = document.querySelector("#kimi-comparison-video");
const gptKimiError = document.querySelector("#gpt6-kimi-comparison-error");
const kimiVideoError = document.querySelector("#kimi-comparison-error");
const kimiStatus = document.querySelector("#kimi-comparison-status");
const kimiNote = document.querySelector("#kimi-comparison-note");

function setKimiField(selector, value) {
  kimiModule.querySelector(selector).textContent = value;
}

function loadKimiComparisonVideo(video, error, src) {
  const wasPlaying = !video.paused;
  video.pause();
  error.hidden = true;
  video.src = `${src}?v=20260914-kimi-compare`;
  video.load();
  if (wasPlaying) video.play().catch(() => {});
}

function selectKimiRun(taskKey, runKey) {
  const run = kimiComparisonTasks[taskKey].runs.find((candidate) => candidate.key === runKey);
  loadKimiComparisonVideo(kimiVideo, kimiVideoError, run.src);
  setKimiField('[data-kimi-field="batch"]', run.batch);
  setKimiField('[data-kimi-field="time"]', run.time);
  setKimiField('[data-kimi-field="instruction"]', run.instruction);
  setKimiField('[data-kimi-field="outcome"]', run.outcome);
  kimiStatus.textContent = run.status;
  kimiStatus.className = run.statusClass;
  kimiNote.textContent = run.note;
  [...kimiRunTabs.querySelectorAll("button")].forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.kimiRun === runKey));
  });
}

function selectKimiTask(taskKey) {
  const task = kimiComparisonTasks[taskKey];
  setKimiField('[data-kimi-context-field="task"]', task.task);
  setKimiField('[data-gpt-kimi-field="batch"]', task.gpt.batch);
  setKimiField('[data-gpt-kimi-field="time"]', task.gpt.time);
  setKimiField('[data-gpt-kimi-field="instruction"]', task.gpt.instruction);
  loadKimiComparisonVideo(gptKimiVideo, gptKimiError, task.gpt.src);
  kimiTaskButtons.forEach((button) => {
    button.setAttribute("aria-selected", String(button.dataset.kimiTask === taskKey));
  });
  kimiRunTabs.replaceChildren(...task.runs.map((run) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", "false");
    button.dataset.kimiRun = run.key;
    button.textContent = run.label;
    button.addEventListener("click", () => selectKimiRun(taskKey, run.key));
    return button;
  }));
  selectKimiRun(taskKey, task.runs[0].key);
}

kimiTaskButtons.forEach((button) => {
  button.addEventListener("click", () => selectKimiTask(button.dataset.kimiTask));
});
gptKimiVideo.addEventListener("error", () => { gptKimiError.hidden = false; });
gptKimiVideo.addEventListener("loadeddata", () => { gptKimiError.hidden = true; });
kimiVideo.addEventListener("error", () => { kimiVideoError.hidden = false; });
kimiVideo.addEventListener("loadeddata", () => { kimiVideoError.hidden = true; });
selectKimiTask("remove");

function formatClipDuration(seconds) {
  return `${seconds.toFixed(1)} s`;
}

function setupDurationBadge(video) {
  const stage = video.closest(".rollout-media, .comparison-stage");
  const badge = stage?.querySelector(".video-overlay span:first-child");
  if (!badge) return;

  function updateBadge() {
    const playback = (video.dataset.playback || "Real time").replace(/\s+robot run$/i, "");
    const duration = Number.isFinite(video.duration) && video.duration > 0
      ? ` · ${formatClipDuration(video.duration)}`
      : "";
    badge.textContent = `${playback}${duration}`;
  }

  video.addEventListener("loadedmetadata", updateBadge);
  video.addEventListener("durationchange", updateBadge);
  updateBadge();
}

const autoplayObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entryItem) => {
      const video = entryItem.target;
      if (entryItem.isIntersecting && entryItem.intersectionRatio >= .35) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { rootMargin: "0px 0px -5%", threshold: [0, .35, .75] }
);

document.querySelectorAll("video").forEach((video) => {
  setupDurationBadge(video);
  video.muted = true;
  video.loop = true;
  autoplayObserver.observe(video);
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
