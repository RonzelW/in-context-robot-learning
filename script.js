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
    historyTitle: "Self-interaction history",
    historySteps: [
      {
        title: "Explore and localize",
        text: "The top and wrist views reveal the lemon, but not the pink plate. Small 4–8 cm arm motions create parallax; <code>locate_point</code> matches stable features on the lemon—its dark spot and tip—to triangulate its position instead of treating pixels as coordinates."
      },
      {
        title: "Identify the occluder",
        text: "The top view reveals the near corner of the cloth. The same parallax procedure localizes that corner in metric coordinates."
      },
      {
        title: "Uncover the plate",
        text: "The fingers approach the cloth corner from above, descend for inspection, and then close. A 3 cm lift confirms the cloth moves with the gripper before it is pulled outward in stages until the plate appears, then released."
      },
      {
        title: "Relocalize the lemon",
        text: "Because moving the cloth may also move the lemon, its position is triangulated again and the previous coordinates are discarded."
      },
      {
        title: "Grasp and verify",
        text: "The gripper descends to the lemon’s side, closes, and lifts 3 cm. A stable lemon-to-finger relationship in the wrist view, while the background moves, confirms the grasp."
      },
      {
        title: "Place on the plate",
        text: "The plate rim and center are triangulated. The arm routes around the right side, descends in two stages above the center, and opens the gripper to release the lemon."
      },
      {
        title: "Retreat and validate",
        text: "With the gripper open, the arm retreats 2–3 cm horizontally and lifts. Visible clearance from both fingers and support from the plate confirm completion before <code>done</code> is called."
      }
    ],
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
    historyTitle: "Online interaction context",
    historySteps: [
      {
        title: "Open by taking the center",
        text: "With Green moving first, the top and wrist views confirm an empty board and a clear workspace. A 3 cm wrist lift creates parallax, and <code>locate_point</code> triangulates the first green piece. After a joint-limit detour and a failed grasp that shifts the piece about 16 mm, the robot relocalizes, regrips, verifies a 3 cm lift, routes around the center post, and releases in the center cell."
      },
      {
        title: "Wait for Blue’s first move",
        text: "Both arms remain still while the board is observed repeatedly. A blue piece appears in the lower-left cell, but the robot waits until the human hand has fully withdrawn before starting Green’s turn."
      },
      {
        title: "Take the upper-right corner",
        text: "The upper-right cell creates two diagonal threats. An initial empty grasp prompts fresh parallax localization, revealing a 29 mm offset. During transport, the shifted board invalidates the old grid coordinates, so the right grid line is remapped. A low approach avoids another joint limit; the piece slips during release but is verified inside the intended cell."
      },
      {
        title: "Wait for Blue’s second move",
        text: "Five observation cycles show no new piece, and waiting is not mistaken for a terminal state. When a human begins placing Blue in the middle-left cell, the robot stays still until the hand leaves and then confirms the move."
      },
      {
        title: "Block the left column",
        text: "Blue now occupies the lower-left and middle-left cells, making the upper-left cell an immediate defensive priority. The third green piece is localized again at the center of its upward-facing diamond, grasped, carried to the board, and released in the upper-left cell. A retreat view confirms that the threat is blocked."
      },
      {
        title: "Wait for Blue’s third move",
        text: "The robot holds position until Blue is detected and confirmed in the upper-middle cell."
      },
      {
        title: "Win in the lower-right corner",
        text: "The upper-left–center–lower-right diagonal is one move from completion. Insufficient parallax triggers a wider baseline; finger occlusion prompts a switch from the piece center to a visible top corner, followed by a close-range refinement. The piece is grasped, routed along the front, placed in the inferred lower-right center, and verified as completing the diagonal before <code>done</code> is called."
      }
    ],
    configs: [
      { label: "Live interaction", model: "GPT-6 Astra", context: "Online interaction", success: "3 / 3", decisions: "69.7", time: "13.6 min", src: "assets/videos/tic-tac-toe.mp4", trial: "Success", view: "Head view" }
    ]
  },
  {
    family: "Human interaction",
    title: "Pick the pointed fruit",
    prompt: "Wait for a human gesture, then pick the indicated fruit and place it on the plate.",
    historyTitle: "Online interaction context",
    historySteps: [
      {
        title: "Wait for the first gesture",
        text: "No pointing hand or OK gesture is visible in any of the three camera views, so both arms remain still. Although the avocado is moved outside the plate and the scene layout changes, object motion alone is not treated as an instruction."
      },
      {
        title: "Identify the red apple",
        text: "The left-wrist and top views agree that an index finger points to the red apple. The target is locked, but the robot waits through three observation cycles because the hand remains near the fruit and gripper. Only the camera ray through a stable top-surface feature is retained; a single RGB observation is not used as a metric coordinate."
      },
      {
        title: "Triangulate the apple",
        text: "After the hand withdraws, the left wrist rises about 4 cm to create parallax. The first estimate is rejected because the 4.71° parallax angle is degenerate. A further 5 cm lift widens the baseline, allowing the same surface feature to yield a valid metric position."
      },
      {
        title: "Approach and grasp",
        text: "A vertical top-down grasp is rejected at a joint limit, so the wrist switches to a reachable 45° forward-downward pose. The gripper descends in three checked stages while keeping neighboring grapes outside the grasp region. After closing to 0.55, a 3 cm lift confirms that the apple remains fixed relative to the fingers while the background peach shifts."
      },
      {
        title: "Place the apple",
        text: "With the apple held at a safe height, a second viewing angle triangulates the partially visible blue plate; the plate-center ray and rim-height plane define the placement region. The robot descends from 0.065 m to 0.025 m, releases, then retreats about 3 cm and lifts to verify that the apple remains on the plate and is clear of both fingers."
      },
      {
        title: "Recognize the peach",
        text: "Back at the observation pose, the robot detects a finger pointing to the peach. It records the next target but remains still until the hand withdraws, retaining a camera ray through the peach’s green leaf tip."
      },
      {
        title: "Triangulate the peach",
        text: "An 8 cm forward translation creates sufficient parallax to localize the leaf tip. Because the tip is not a suitable grasp center, a second match on the fruit’s central vertical texture refines the body position and finger alignment."
      },
      {
        title: "Approach and grasp again",
        text: "The robot approaches along the left in checked stages—from the pre-approach pose to roughly 6 cm, 1.4 cm, and then grasp depth above the target—while ensuring the grapes remain outside the fingers. After closing, a 3 cm lift and the same foreground-background parallax test confirm a secure grasp before retreating to a safe height."
      },
      {
        title: "Place the peach and finish",
        text: "The existing plate-rim estimate is reused. With the apple occupying the near side, the robot selects an open region farther into the plate, descends in stages, and releases the peach. A retreat view confirms that both fruits remain on the plate and clear of the gripper; the robot returns to observation and calls <code>done</code>."
      }
    ],
    configs: [
      { label: "Live interaction", model: "GPT-6 Astra", context: "Online interaction", success: "3 / 3", decisions: "67.3", time: "15.0 min", src: "assets/videos/pointed-fruit.mp4", trial: "Success", view: "Head view" }
    ]
  }
];

const demoGrid = document.querySelector("#demo-grid");

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
  const historySteps = isSingleTask ? tasks[0].historySteps : null;
  const historyTitle = isSingleTask ? tasks[0].historyTitle : null;
  const historyId = `context-summary-${startIndex + 1}`;
  const group = document.createElement("article");
  group.className = `demo-rollout-group context-family-group${historySteps ? " history-enriched-group" : ""}`;
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
            <h4>${isSingleTask ? "Evaluation run" : task.title}</h4>
            <span class="rollout-result" data-field="success"></span>
          </div>
          <p class="rollout-model" data-field="model"></p>
          ${isSingleTask ? "" : `<p class="rollout-task-copy">${task.prompt}</p>`}
          <p class="rollout-detail" data-field="detail"></p>
          ${tabs}
        </figcaption>
      </figure>`;
  }).join("");

  const historySummary = historySteps
    ? `<aside class="history-summary" aria-labelledby="${historyId}">
        <div class="history-summary-heading">
          <p>Run summary</p>
          <h4 id="${historyId}">${historyTitle || "Interaction history"}</h4>
        </div>
        <ol>
          ${historySteps.map((step, index) => `
            <li>
              <span>${String(index + 1).padStart(2, "0")}</span>
              <p><strong>${step.title}</strong>${step.text}</p>
            </li>`).join("")}
        </ol>
      </aside>`
    : "";

  group.innerHTML = `
    <header class="rollout-group-head">
      <div class="rollout-group-title">
        <p class="rollout-kicker"><span class="demo-index">${isSingleTask ? String(startIndex + 1).padStart(2, "0") : `${String(startIndex + 1).padStart(2, "0")}&ndash;${String(startIndex + tasks.length).padStart(2, "0")}`}</span>${family}</p>
        <h3>${isSingleTask ? tasks[0].title : details.title}</h3>
        <p>${isSingleTask ? tasks[0].prompt : details.description}</p>
      </div>
      <span class="clip-count">${tasks.length} ${tasks.length === 1 ? "clip" : "clips"}</span>
    </header>
    <div class="${historySteps ? "history-enriched-layout" : ""}">
      <div class="rollout-rail-wrap">
        <button class="rollout-nav previous" type="button" aria-label="Show previous clips"><span aria-hidden="true">&#8249;</span></button>
        <div class="rollout-rail" aria-label="${family} robot rollouts">${cards}</div>
        <button class="rollout-nav next" type="button" aria-label="Show more clips"><span aria-hidden="true">&#8250;</span></button>
      </div>
      ${historySummary}
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
      card.querySelector('[data-field="model"]').textContent = `${config.model} · ${config.context}`;
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
  [demoTasks[6]],
  [demoTasks[7]]
];
remainingGroups.forEach((tasks) => {
  demoGrid.appendChild(renderContextFamilyGroup(tasks, remainingTaskIndex));
  remainingTaskIndex += tasks.length;
});

function formatClipDuration(seconds) {
  return `${seconds.toFixed(1)} s`;
}

function setupDurationBadge(video) {
  const stage = video.closest(".rollout-media, .comparison-stage");
  const badge = stage?.querySelector(".video-overlay span:first-child");
  if (!badge) return;

  function updateBadge() {
    const playback = (video.dataset.playback || "Real time").replace(/\s+robot run$/i, "");
    const showDuration = !stage.classList.contains("comparison-stage");
    const duration = showDuration && Number.isFinite(video.duration) && video.duration > 0
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
