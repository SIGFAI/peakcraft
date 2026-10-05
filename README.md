# PeakCraft

Minecraft inside PEAK: move, build, break, dig into the mountain and fight by Minecraft's rules, and switch back to PEAK's own climbing at any time (BepInEx plugin + SkyCraft's Fabric mod).

**PeakCraft is made by [Keel62155](https://github.com/Keel62155).** All credit for the mod goes to them. It is built on [chasmlol/SkyCraft](https://github.com/chasmlol/SkyCraft) by chasmlol.

- Original project: https://github.com/Keel62155/Minecraft-X-Games
- Report bugs and ask questions there: https://github.com/Keel62155/Minecraft-X-Games/issues
- Upstream release packaged here: [1.0.0-PEAK](https://github.com/Keel62155/Minecraft-X-Games/releases/tag/1.0.0-PEAK) (commit [`d6fc4b6`](https://github.com/Keel62155/Minecraft-X-Games/tree/d6fc4b6b9e5536f6c29c2b217662d9b2a878d898))

> **Beta.** Nobody at SIGF has played this build yet. Back up your saves.
> Bugs in the mod itself go to the author's issue tracker above; problems with the one-click install go to this repository's issues.

## What you need

- **PEAK** ([Steam](https://store.steampowered.com/app/3527290/)): PEAK build of 2026-10-04 (upstream pins none).
- **Minecraft**: Java Edition 26.3.
- Windows and the [SIGF app](https://sigf.ai). The app installs bepinex 5.4.23.5, fabric-loader 0.19.5, fabric-api 0.161.0+26.3 for you.

## Install

In the SIGF app, open **PeakCraft** in the catalog, press **Install**, then **Play**. **Restore** puts your game folders back exactly as they were.
The app follows `mashup.json` in this repository: every download is pinned by sha256. The files come from the release [`v1.0.0`](../../releases/tag/v1.0.0) and, for `PeakCraft.zip`, from the author's own release.

### Good to know

- PEAK on Steam and Minecraft: Java Edition. Windows only. Made for the PEAK build of 2026-10-04: after a game update, parts of the mod may stop working until a new release.
- Play solo, or only with friends who agree: in a lobby your modded scout ignores hunger, cold and fall injuries while Minecraft drives, and Minecraft hits can knock other scouts over. Friends see your scout slide about rigidly.
- Press Play: Minecraft starts first as the app's own Prism instance "sigf-peakcraft" (SkyCraft's Fabric mod, Minecraft 26.3, Java 25), then PEAK. You do not need SkyCraft or Skyrim. Every level gives a fresh Minecraft world.
- BepInEx 5.4.23.5 and PeakCraft are installed into the PEAK folder, PeakCraft downloaded from the author's own release; Restore removes both. If you already use a mod manager profile (r2modman, Thunderstore), start PEAK from the app, not from the profile.
- Keys: 9 or F10 toggles PEAK mode (climb by the game's rules), 6-8 use the scout's own items. Run one "Minecraft X" mod at a time: they share the same link. Log: BepInEx\LogOutput.log.
- Prototype. Known gaps: PEAK's sound can go quiet, digging into the mountain is little tested. Report bugs to the author on the upstream issue tracker.

## What this repository holds

PeakCraft has no license, so SIGF may not rehost it. This repository holds **only SIGF's own files**, never the author's:

1. This README, `THIRD-PARTY.md`, `sigf/` (the script that built the recipe, for reference) and `mashup.json` (the SIGF app recipe).
2. Not here: `PeakCraft.zip` (sha256 `ae3d79de78390c05e8964e018d5fa19170595ad8d144b918c9b65d81ef4747a9`). The app downloads it on the player's demand from the author's release, as released: https://github.com/Keel62155/Minecraft-X-Games/releases/download/1.0.0-PEAK/PeakCraft.zip
3. The release `v1.0.0`:

| Asset | Size | sha256 | What it is |
|---|---|---|---|
| `BepInEx_win_x64_5.4.23.5.zip` | 639118 B | `82f9878551030f54657792c0740d9d51a09500eeae1fba21106b0c441e6732c4` | BepInEx 5.4.23.5 x64, the official build, unchanged (see THIRD-PARTY.md); unpacked into the PEAK folder. |
| `peakcraft.mrpack` | 235725 B | `5db03f668a378a84f1d1e55f025472480467fc832acbafab56632fa5f21dd837` | the Minecraft side, which is SkyCraft's (chasmlol, MIT): `skycraft-fabric-0.1.2.jar` unchanged with SkyCraft's LICENSE, for Minecraft 26.3 with Fabric Loader 0.19.5; Fabric API 0.161.0+26.3 and e4mc are Modrinth download links, not stored here. |

The sha256 of every file inside the zips is in `mashup.json` (`contents`).

## Licenses

| Part | License | Where |
|---|---|---|
| PeakCraft (`PeakCraft.zip`, the author's release file) | no license: all rights reserved by Keel62155. Not stored here; the app downloads it from the author's release | https://github.com/Keel62155/Minecraft-X-Games |
| BepInEx 5.4.23.5 and what its zip bundles (release asset) | MIT; UnityDoorstop LGPL-2.1 | `THIRD-PARTY.md` |
| SkyCraft's Fabric mod (in the `.mrpack`) | MIT, Copyright chasmlol | `THIRD-PARTY.md` |
| Fabric API, e4mc (downloaded from Modrinth by the app, not stored here) | Apache-2.0, MIT | https://modrinth.com/mod/fabric-api, https://modrinth.com/mod/e4mc |

## Why this repository exists

The SIGF app (https://sigf.ai) installs mods from recipes (`mashup.json`) whose downloads are pinned release files. This repository makes PeakCraft installable in one click, credited to Keel62155. If you are the author and want anything changed or taken down, open an issue here.
