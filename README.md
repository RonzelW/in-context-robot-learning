# In-Context Robot Learning with General Agents

Static project page for In-Context Robot Learning with General Agents. The design follows the editorial rhythm of the OpenWAM project page while using the manuscript's own content, figures, color system, and identity.

The interactive demo gallery groups recordings by task and lets visitors switch between model/context configurations. One representative trial is shown per condition; long robot runs are encoded at 20x or 30x speed for web delivery, as labeled on each video.

A matched-condition comparison pairs the GPT-6 Astra red-towel run with two Claude Fable 5.1 batches using the same instruction, eight-frame human-video context, and head-camera view.

A second interactive comparison covers four Kimi K3 1M runs under text-only, no-demonstration conditions. Three task controls reuse one matched GPT-6 Astra reference per distinct task; the two Kimi runs for removing fruit from a plate are grouped behind a run selector. Interrupted runs are counted as failures, and the known prompt/content mismatch is disclosed in the module. All comparison videos use the head camera and are encoded at 20x speed.

## Preview

Open `index.html` directly, or serve the folder with any static web server.

## Deploy

The repository is designed for GitHub Pages with no build step. Publish from the repository root on the `main` branch.

## Source material

- Manuscript: `paper.pdf`
- Figure assets: extracted from the supplied manuscript PDF
- Demo configuration and recordings: project experiment log retrieved from Feishu on 14 September 2026
