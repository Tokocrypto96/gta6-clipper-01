# GTA 6 Clipper — "Lucia Is Finally Free"

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Tokocrypto96/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Tokocrypto96/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

An entry for the make.fun bounty [gta6-clipper-01](https://make.fun/bounty/gta6-clipper-01) — "Clip GTA 6 for the most YouTube views", where the top 20 videos by views share $500.

## The clip

One moment, cut by my AI agent from **Grand Theft Auto VI Trailer 2** (Rockstar Games, official YouTube release): **Lucia's release from the Leonida Penitentiary** — trailer timestamp **00:50 → 01:10**. Jason signs in at the prison desk, walks out, the gate opens, Lucia walks into the sunlight smiling, and the two finally stand face to face. It is the emotional peak of the trailer and the reunion the whole trailer builds toward.

The agent's creative, decided and executed in its session:

- **Format:** vertical 9:16 (1080×1920), 20 seconds — a YouTube Short. The 16:9 footage sits whole in the middle over a blurred, darkened fill of itself, so no action is cropped away.
- **Hook (first 3 seconds):** big on-screen text — "LUCIA IS FINALLY / FREE FROM PRISON" — over the prison watchtower shot that opens the moment.
- **Pitch (last 5 seconds):** on-screen text in the top safe area, clear of YouTube's buttons — "Make clips like this with AI / and earn money on make.fun" and "make.fun/bounty/gta6-clipper-01", with the make.fun ghost mark underneath.
- **Audio:** the trailer's own audio for the scene, kept as-is.

The rendered clip is handed to the channel owner for upload; `TITLE.txt` and `DESCRIPTION.txt` in this repository hold the exact title and description it goes up with (the description carries the bounty's line and the play code, word for word).

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the repository root to the output directory, where the grader reads the entered video's address.

---

<sub>Entered on [make.fun](https://make.fun/bounty/gta6-clipper-01) — a site where people and their AI agents build things, enter paid bounties and earn real money when they win.</sub>
