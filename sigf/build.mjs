// PeakCraft (Keel62155, no license): Minecraft inside PEAK, a BepInEx 5 plugin that plays the part of SkyCraft's
// Skyrim plugin and drives SkyCraft's Fabric mod over the same shared memory (Local\SkyCraft_v1, protocol v11).
// No license, so upstream fetch (PLATFORM-SPEC section 4, "Upstream fetch"): PeakCraft.zip is downloaded by the app
// from the author's release as released, never rehosted. SIGFAI/peakcraft hosts the recipe, our .mrpack (SkyCraft's
// Minecraft side, MIT, the exact pack orchestrator/scripts/package-fusion.mjs builds for SkyCraft) and the official
// BepInEx 5 x64 zip (LGPL-2.1, unchanged, as library/ultracraft does).
//
// The plugin starts Minecraft itself only as %LOCALAPPDATA%\SkyCraft\Prism\prismlauncher.exe --launch SkyCraft
// (src/Plugin.cs:382-389 of its source zip), and only when the mutex Local\SkyCraft_v1_minecraft is free
// (src/Plugin.cs:356-371). The SkyCraft jar holds that mutex while it runs, so the app starts its own Minecraft
// instance first and the plugin uses it (the CyberCraft way, library/cybercraft/build.mjs).
//
// The upstream zip's root folder PeakCraft/ is exactly the plugin folder, so unpacked into {game}/BepInEx/plugins the
// DLL lands at BepInEx/plugins/PeakCraft/PeakCraft.dll, upstream's own install step. No `root` needed; README.txt and
// the source zip ride along in that folder (BepInEx only loads .dll files).
//   node library/peakcraft/build.mjs       (outputs: library/lib.mjs)
import { FUSIONS, buildFusion, instanceName } from '../../orchestrator/scripts/package-fusion.mjs';
import { BEPINEX, CACHE, asset, card, dl, emit, pinned, renamePack } from '../lib.mjs';

const UP = {
  repo: 'https://github.com/Keel62155/Minecraft-X-Games', tag: '1.0.0-PEAK', commit: 'd6fc4b6b9e5536f6c29c2b217662d9b2a878d898',
  authors: ['Keel62155'],
  zip: { file: 'PeakCraft.zip', sha256: 'ae3d79de78390c05e8964e018d5fa19170595ad8d144b918c9b65d81ef4747a9' }, // = GitHub digest, checked 2026-10-05
};
const SKY = FUSIONS.skycraft;
const ID = 'peakcraft', VERSION = '1.0.0', NAME = 'PeakCraft';
const TAGLINE = 'Minecraft inside PEAK: move, build, break, dig into the mountain and fight by Minecraft\'s rules, and switch back to PEAK\'s own climbing at any time (BepInEx plugin + SkyCraft\'s Fabric mod).';

const upUrl = `${UP.repo}/releases/download/${UP.tag}/${UP.zip.file}`;
const plugin = asset(UP.zip.file, await pinned(upUrl, UP.zip.sha256), { zipped: true, upstream: upUrl });
const bepinex = asset(BEPINEX.file, await pinned(BEPINEX.url, BEPINEX.sha256), { zipped: true });
// SkyCraft's Minecraft side, built by package-fusion.mjs from its pinned release (its Skyrim zip is not used).
const { packAsset } = await buildFusion(SKY, { cache: CACHE, offline: false });
const pack = asset(`${ID}.mrpack`, renamePack(packAsset.data, { name: `${NAME} (SkyCraft's Minecraft side)`, summary: TAGLINE, versionId: VERSION }));
const assets = [bepinex, plugin, pack];

const make = (urls, set) => {
  const mp = set.find(a => a.name.endsWith('.mrpack'));
  return {
    id: `sigf/${ID}`,
    version: VERSION,
    name: NAME,
    tagline: TAGLINE,
    kind: 'passthrough',
    games: [
      { game: 'peak', role: 'host', label: 'PEAK', engine: 'PEAK (Unity, Mono, x64) + BepInEx 5 plugin (C#)', apps: { steam: '3527290' }, runtime: 'PEAK build of 2026-10-04 (upstream pins none)' },
      { game: 'minecraft', role: 'guest', label: 'Minecraft', mc: SKY.mc.mc, loader: `fabric@${SKY.mc.loader}`, java: SKY.mc.java },
    ],
    requires: [
      { id: BEPINEX.id, version: BEPINEX.version, license: `${BEPINEX.license}, shipped unchanged`, page: `${BEPINEX.repo}/releases/tag/v${BEPINEX.version}`,
        note: 'installed into the PEAK folder by the app', source: { url: urls[bepinex.name], sha256: bepinex.sha256 } },
      { id: 'fabric-loader', version: SKY.mc.loader },
      { id: 'fabric-api', version: SKY.mc.fabricApi, note: 'in the Minecraft pack (downloaded from Modrinth)' },
    ],
    install: [
      { game: 'peak', strategy: 'game-dir-snapshot', loader: 'bepinex', files: [
        { src: bepinex.name, dst: '{game}', unpack: true, contents: bepinex.contents, ...dl(bepinex, urls) },
        // Upstream file as released: its PeakCraft/ folder becomes BepInEx/plugins/PeakCraft (upstream's install step).
        { src: plugin.name, dst: '{game}/BepInEx/plugins', unpack: true, contents: plugin.contents, ...dl(plugin, urls) },
      ] },
      { game: 'minecraft', strategy: 'mrpack', pack: { src: mp.name, ...dl(mp, urls) } },
    ],
    // Minecraft first: the plugin sees it running (mutex) and links over shared memory instead of starting its own.
    launch: [{ game: 'minecraft' }, { game: 'peak', args: [] }],
    files: set.map(a => ({ name: a.name, ...dl(a, urls) })),
    source: {
      repo: UP.repo, license: 'No license (upstream download) + MIT', upstream_license: null, fetch: 'upstream', tag: UP.tag, commit: UP.commit,
      hosted: `https://github.com/SIGFAI/${ID}`, based_on: SKY.upstream.repo,
      bundled: [
        { name: 'BepInEx', version: BEPINEX.version, repo: BEPINEX.repo, commit: BEPINEX.commit, license: BEPINEX.license },
        { name: 'SkyCraft (Fabric mod)', version: SKY.version, repo: SKY.upstream.repo, commit: SKY.upstream.commit, license: SKY.upstream.license },
      ],
    },
    media: {},
    built_by: { author: UP.authors[0], authors: [...UP.authors, ...SKY.upstream.authors], packaged_by: 'SIGF' },
    idea_by: UP.authors[0],
    built_at: '2026-10-05T00:00:00.000Z',
    ...card(UP.repo),
    notes: [
      'PEAK on Steam and Minecraft: Java Edition. Windows only. Made for the PEAK build of 2026-10-04: after a game update, parts of the mod may stop working until a new release.',
      'Play solo, or only with friends who agree: in a lobby your modded scout ignores hunger, cold and fall injuries while Minecraft drives, and Minecraft hits can knock other scouts over. Friends see your scout slide about rigidly.',
      `Press Play: Minecraft starts first as the app's own Prism instance "${instanceName(`sigf/${ID}`)}" (SkyCraft's Fabric mod, Minecraft ${SKY.mc.mc}, Java ${SKY.mc.java}), then PEAK. You do not need SkyCraft or Skyrim. Every level gives a fresh Minecraft world.`,
      'BepInEx 5.4.23.5 and PeakCraft are installed into the PEAK folder, PeakCraft downloaded from the author\'s own release; Restore removes both. If you already use a mod manager profile (r2modman, Thunderstore), start PEAK from the app, not from the profile.',
      'Keys: 9 or F10 toggles PEAK mode (climb by the game\'s rules), 6-8 use the scout\'s own items. Run one "Minecraft X" mod at a time: they share the same link. Log: BepInEx\\LogOutput.log.',
      'Prototype. Known gaps: PEAK\'s sound can go quiet, digging into the mountain is little tested. Report bugs to the author on the upstream issue tracker.',
    ],
  };
};

// No app fixture: it would commit the author's unlicensed zip into our repo.
emit({ slug: ID, version: VERSION, assets, fixtureAssets: null, make });
