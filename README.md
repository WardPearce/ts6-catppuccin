Soothing pastel themes for TeamSpeak 5/6.

A [Catppuccin](https://catppuccin.com) port for TeamSpeak.

## Flavors

For each of the four Catppuccin flavors (`latte`, `frappe`, `macchiato`, `mocha`)
there is a base theme using the `blue` accent plus a variant for each of the
fourteen accents:

| Identifier                          | Flavor           |
| ----------------------------------- | ---------------- |
| `io.catppuccin.teamspeak.latte`     | Latte (light)    |
| `io.catppuccin.teamspeak.frappe`    | Frappé (dark)    |
| `io.catppuccin.teamspeak.macchiato` | Macchiato (dark) |
| `io.catppuccin.teamspeak.mocha`     | Mocha (dark)     |

Accent variants: `rosewater`, `flamingo`, `pink`, `mauve`, `red`, `maroon`,
`peach`, `yellow`, `green`, `teal`, `sky`, `sapphire`, `blue`, `lavender`.

## Installation

1. Download the flavor folder of your choice from `themes/` (e.g.
   `io.catppuccin.teamspeak.mocha`).
2. In TeamSpeak 5/6, open **Settings → Add-ons → Install from file** and select
   the `.teamspeak-theme` package, or place the folder into your addon directory.
3. Pick the theme (and accent) in the appearance settings.

## Building

The themes are generated programmatically with PostCSS.

```sh
npm install
npm run build   # writes themes/io.catppuccin.teamspeak.*/
```

Node.js 22+ is required (runs TypeScript natively via type stripping).

## Adding a flavor

The palettes live in `src/palette.ts` and the variable mapping in `src/theme.ts`.
`node src/generate.ts` regenerates every theme manifest and stylesheet.

## License

MIT — see [LICENSE](LICENSE). Portions derived from
[`doa`](https://github.com/ImScheinox/doa) (MIT, © ImScheinox). Palette data
from [catppuccin/palette](https://github.com/catppuccin/palette) (MIT).
