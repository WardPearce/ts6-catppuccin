export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface PaletteColor {
  hex: string;
  rgb: RGB;
}

export type AccentId =
  | "rosewater"
  | "flamingo"
  | "pink"
  | "mauve"
  | "red"
  | "maroon"
  | "peach"
  | "yellow"
  | "green"
  | "teal"
  | "sky"
  | "sapphire"
  | "blue"
  | "lavender";

export type FlavorId = "latte" | "frappe" | "macchiato" | "mocha";

export const ACCENTS: ReadonlyArray<{ id: AccentId; display: string }> = [
  { id: "rosewater", display: "Rosewater" },
  { id: "flamingo", display: "Flamingo" },
  { id: "pink", display: "Pink" },
  { id: "mauve", display: "Mauve" },
  { id: "red", display: "Red" },
  { id: "maroon", display: "Maroon" },
  { id: "peach", display: "Peach" },
  { id: "yellow", display: "Yellow" },
  { id: "green", display: "Green" },
  { id: "teal", display: "Teal" },
  { id: "sky", display: "Sky" },
  { id: "sapphire", display: "Sapphire" },
  { id: "blue", display: "Blue" },
  { id: "lavender", display: "Lavender" },
];

export interface Flavor {
  id: FlavorId;
  display: string;
  emoji: string;
  dark: boolean;
  identifier: string;
  accents: Record<AccentId, PaletteColor>;
  rosewater: PaletteColor;
  flamingo: PaletteColor;
  pink: PaletteColor;
  mauve: PaletteColor;
  red: PaletteColor;
  maroon: PaletteColor;
  peach: PaletteColor;
  yellow: PaletteColor;
  green: PaletteColor;
  teal: PaletteColor;
  sky: PaletteColor;
  sapphire: PaletteColor;
  blue: PaletteColor;
  lavender: PaletteColor;
  text: PaletteColor;
  subtext1: PaletteColor;
  subtext0: PaletteColor;
  overlay2: PaletteColor;
  overlay1: PaletteColor;
  overlay0: PaletteColor;
  surface2: PaletteColor;
  surface1: PaletteColor;
  surface0: PaletteColor;
  base: PaletteColor;
  mantle: PaletteColor;
  crust: PaletteColor;
}

function c(hex: string): PaletteColor {
  const h = hex.slice(1);
  return {
    hex,
    rgb: {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    },
  };
}

/* Palette data from catppuccin/palette v1.8.0 (palette.json). */
function flavor(
  id: FlavorId,
  display: string,
  emoji: string,
  dark: boolean,
  identifier: string,
  hex: Record<string, string>,
): Flavor {
  const colors = Object.fromEntries(
    Object.entries(hex).map(([k, v]) => [k, c(v)]),
  ) as Record<string, PaletteColor>;
  return {
    id,
    display,
    emoji,
    dark,
    identifier,
    accents: {} as Record<AccentId, PaletteColor>,
    rosewater: colors["rosewater"],
    flamingo: colors["flamingo"],
    pink: colors["pink"],
    mauve: colors["mauve"],
    red: colors["red"],
    maroon: colors["maroon"],
    peach: colors["peach"],
    yellow: colors["yellow"],
    green: colors["green"],
    teal: colors["teal"],
    sky: colors["sky"],
    sapphire: colors["sapphire"],
    blue: colors["blue"],
    lavender: colors["lavender"],
    text: colors["text"],
    subtext1: colors["subtext1"],
    subtext0: colors["subtext0"],
    overlay2: colors["overlay2"],
    overlay1: colors["overlay1"],
    overlay0: colors["overlay0"],
    surface2: colors["surface2"],
    surface1: colors["surface1"],
    surface0: colors["surface0"],
    base: colors["base"],
    mantle: colors["mantle"],
    crust: colors["crust"],
  };
}

export const FLAVORS: Record<FlavorId, Flavor> = {
  latte: flavor(
    "latte",
    "Latte",
    "🌻",
    false,
    "io.catppuccin.teamspeak.latte",
    {
      rosewater: "#dc8a78",
      flamingo: "#dd7878",
      pink: "#ea76cb",
      mauve: "#8839ef",
      red: "#d20f39",
      maroon: "#e64553",
      peach: "#fe640b",
      yellow: "#df8e1d",
      green: "#40a02b",
      teal: "#179299",
      sky: "#04a5e5",
      sapphire: "#209fb5",
      blue: "#1e66f5",
      lavender: "#7287fd",
      text: "#4c4f69",
      subtext1: "#5c5f77",
      subtext0: "#6c6f85",
      overlay2: "#7c7f93",
      overlay1: "#8c8fa1",
      overlay0: "#9ca0b0",
      surface2: "#acb0be",
      surface1: "#bcc0cc",
      surface0: "#ccd0da",
      base: "#eff1f5",
      mantle: "#e6e9ef",
      crust: "#dce0e8",
    },
  ),
  frappe: flavor(
    "frappe",
    "Frappé",
    "🪴",
    true,
    "io.catppuccin.teamspeak.frappe",
    {
      rosewater: "#f2d5cf",
      flamingo: "#eebebe",
      pink: "#f4b8e4",
      mauve: "#ca9ee6",
      red: "#e78284",
      maroon: "#ea999c",
      peach: "#ef9f76",
      yellow: "#e5c890",
      green: "#a6d189",
      teal: "#81c8be",
      sky: "#99d1db",
      sapphire: "#85c1dc",
      blue: "#8caaee",
      lavender: "#babbf1",
      text: "#c6d0f5",
      subtext1: "#b5bfe2",
      subtext0: "#a5adce",
      overlay2: "#949cbb",
      overlay1: "#838ba7",
      overlay0: "#737994",
      surface2: "#626880",
      surface1: "#51576d",
      surface0: "#414559",
      base: "#303446",
      mantle: "#292c3c",
      crust: "#232634",
    },
  ),
  macchiato: flavor(
    "macchiato",
    "Macchiato",
    "🌺",
    true,
    "io.catppuccin.teamspeak.macchiato",
    {
      rosewater: "#f4dbd6",
      flamingo: "#f0c6c6",
      pink: "#f5bde6",
      mauve: "#c6a0f6",
      red: "#ed8796",
      maroon: "#ee99a0",
      peach: "#f5a97f",
      yellow: "#eed49f",
      green: "#a6da95",
      teal: "#8bd5ca",
      sky: "#91d7e3",
      sapphire: "#7dc4e4",
      blue: "#8aadf4",
      lavender: "#b7bdf8",
      text: "#cad3f5",
      subtext1: "#b8c0e0",
      subtext0: "#a5adcb",
      overlay2: "#939ab7",
      overlay1: "#8087a2",
      overlay0: "#6e738d",
      surface2: "#5b6078",
      surface1: "#494d64",
      surface0: "#363a4f",
      base: "#24273a",
      mantle: "#1e2030",
      crust: "#181926",
    },
  ),
  mocha: flavor("mocha", "Mocha", "🌿", true, "io.catppuccin.teamspeak.mocha", {
    rosewater: "#f5e0dc",
    flamingo: "#f2cdcd",
    pink: "#f5c2e7",
    mauve: "#cba6f7",
    red: "#f38ba8",
    maroon: "#eba0ac",
    peach: "#fab387",
    yellow: "#f9e2af",
    green: "#a6e3a1",
    teal: "#94e2d5",
    sky: "#89dceb",
    sapphire: "#74c7ec",
    blue: "#89b4fa",
    lavender: "#b4befe",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    subtext0: "#a6adc8",
    overlay2: "#9399b2",
    overlay1: "#7f849c",
    overlay0: "#6c7086",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b",
  }),
};

for (const fl of Object.values(FLAVORS)) {
  for (const ac of ACCENTS) {
    fl.accents[ac.id] = fl[ac.id];
  }
}

export function rgb(a: PaletteColor, alpha?: number): string {
  const { r, g, b } = a.rgb;
  return alpha === undefined
    ? `rgb(${r}, ${g}, ${b})`
    : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mix(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(a.r * (1 - t) + b.r * t);
  const g = Math.round(a.g * (1 - t) + b.g * t);
  const bl = Math.round(a.b * (1 - t) + b.b * t);
  return "#" + [r, g, bl].map((v) => v.toString(16).padStart(2, "0")).join("");
}

export function hexToRgb(hex: string): RGB {
  const h = hex.slice(1);
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

export function hexToRgbString(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
}
