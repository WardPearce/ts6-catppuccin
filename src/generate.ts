import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import postcss from "postcss";

import { ACCENTS, FLAVORS } from "./palette.ts";
import { buildAccentCss, buildBaseCss } from "./theme.ts";

const OUT_DIR = new URL("../themes/", import.meta.url).pathname;
const VERSION = "1.0.0";

interface ThemeEntry {
  name: string;
  source: string;
  image: string;
  apiVersion: number;
}

interface PackageManifest {
  name: string;
  description: string;
  version: string;
  identifier: string;
  engines: { teamspeak: number };
  repository: { url: string; type: string };
  image: string;
  license: string;
  author: {
    name: string;
    url: string;
    userTag: string;
  };
  content: { themes: ThemeEntry[] };
}

function buildPackageJson(
  identifier: string,
  name: string,
  description: string,
  image: string,
  themes: ThemeEntry[],
): PackageManifest {
  return {
    name,
    description,
    version: VERSION,
    identifier,
    engines: { teamspeak: 1 },
    repository: {
      url: "https://github.com/WardPearce/ts6-catppuccin",
      type: "git",
    },
    image,
    license: "MIT",
    author: {
      name: "WardPearce",
      url: "https://wardpearce.com",
      userTag: "wardpearce@pm.me",
    },
    content: { themes },
  };
}

function write(folder: string, file: string, content: string): void {
  writeFileSync(join(folder, file), content);
  console.log(`  wrote ${file}`);
}

function cleanGeneratable(folder: string): void {
  for (const entry of readdirSync(folder)) {
    if (entry === "package.json" || entry.endsWith(".css")) {
      rmSync(join(folder, entry), { force: true });
    }
  }
}

function generate(): void {
  mkdirSync(OUT_DIR, { recursive: true });

  for (const flavor of Object.values(FLAVORS)) {
    const folder = join(OUT_DIR, flavor.identifier);
    mkdirSync(folder, { recursive: true });
    console.log(
      `\n=== ${flavor.emoji} ${flavor.display} (${flavor.identifier}) ===`,
    );

    cleanGeneratable(folder);

    const slashless = flavor.display.replace(/[^A-Za-z0-9]/g, "");
    const baseSource = `${flavor.id}.css`;
    const themes: ThemeEntry[] = [
      {
        name: `Catppuccin ${slashless}`,
        source: baseSource,
        image: `${flavor.id}.png`,
        apiVersion: 1,
      },
    ];

    write(folder, baseSource, buildBaseCss(flavor.id, "blue"));

    for (const accent of ACCENTS) {
      const source = `${flavor.id}-${accent.id}.css`;
      themes.push({
        name: `Catppuccin ${slashless} ${accent.display}`,
        source,
        image: `${flavor.id}-${accent.id}.png`,
        apiVersion: 1,
      });
      write(folder, source, buildAccentCss(flavor.id, accent.id));
    }

    const manifest = buildPackageJson(
      flavor.identifier,
      `Catppuccin ${slashless}`,
      `Soothing pastel ${flavor.display} theme for TeamSpeak 5/6.`,
      `${flavor.id}.png`,
      themes,
    );
    write(folder, "package.json", JSON.stringify(manifest, null, 2) + "\n");

    verify(folder, flavorsCssNames(flavor.id));
  }

  console.log("\nDone. Extension folders are in themes/");
}

function flavorsCssNames(flavorId: string): string[] {
  return [flavorId, ...ACCENTS.map((a) => `${flavorId}-${a.id}`)];
}

function verify(folder: string, files: string[]): void {
  for (const name of files) {
    const css = readFileSync(join(folder, `${name}.css`), "utf8");
    const reparsed = postcss.parse(css).toString();
    if (reparsed.length === 0) {
      throw new Error(`verify failed: ${name}.css produced empty output`);
    }
  }
  console.log(`  verified ${files.length} stylesheets parse cleanly`);
}

generate();
