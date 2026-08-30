/**
 * gruvbox-theme.ts
 *
 * A Mantine theme built from morhetz/gruvbox.
 * Palette values are taken verbatim from colors/gruvbox.vim.
 *
 * Usage:
 *   import { MantineProvider } from '@mantine/core';
 *   import { gruvboxTheme, gruvboxCssVariablesResolver } from './gruvbox-theme';
 *
 *   <MantineProvider
 *     theme={gruvboxTheme}
 *     cssVariablesResolver={gruvboxCssVariablesResolver}
 *     defaultColorScheme="dark"
 *   >
 *     {children}
 *   </MantineProvider>
 */

import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from '@mantine/core';

/* ---------------------------------------------------------------------------
 * Raw gruvbox palette (colors/gruvbox.vim)
 * ------------------------------------------------------------------------- */

export const gruvbox = {
  dark0Hard: '#1d2021',
  dark0: '#282828',
  dark0Soft: '#32302f',
  dark1: '#3c3836',
  dark2: '#504945',
  dark3: '#665c54',
  dark4: '#7c6f64',

  gray: '#928374',

  light0Hard: '#f9f5d7',
  light0: '#fbf1c7',
  light0Soft: '#f2e5bc',
  light1: '#ebdbb2',
  light2: '#d5c4a1',
  light3: '#bdae93',
  light4: '#a89984',

  brightRed: '#fb4934',
  brightGreen: '#b8bb26',
  brightYellow: '#fabd2f',
  brightBlue: '#83a598',
  brightPurple: '#d3869b',
  brightAqua: '#8ec07c',
  brightOrange: '#fe8019',

  neutralRed: '#cc241d',
  neutralGreen: '#98971a',
  neutralYellow: '#d79921',
  neutralBlue: '#458588',
  neutralPurple: '#b16286',
  neutralAqua: '#689d6a',
  neutralOrange: '#d65d0e',

  fadedRed: '#9d0006',
  fadedGreen: '#79740e',
  fadedYellow: '#b57614',
  fadedBlue: '#076678',
  fadedPurple: '#8f3f71',
  fadedAqua: '#427b58',
  fadedOrange: '#af3a03',
} as const;

/* ---------------------------------------------------------------------------
 * Color tuples
 *
 * gruvbox gives three steps per hue (bright / neutral / faded) rather than ten,
 * so each tuple anchors those three at fixed indices and fills the rest in:
 *
 *   0–3  tints, mixed toward light0 (#fbf1c7) — cream, not white, so tints stay warm
 *   4    bright  — the dark-mode accent
 *   6    neutral — the 256-color terminal accent
 *   8    faded   — the light-mode accent
 *   9    faded mixed toward dark0_hard
 *
 * Pair this with primaryShade { light: 8, dark: 4 } and Mantine reproduces
 * gruvbox's own bright/faded swap when the color scheme changes.
 * ------------------------------------------------------------------------- */

const red: MantineColorsTuple = ['#fbcfaa', '#fbb18f', '#fb9072', '#fb6c53', '#fb4934', '#e43628', '#cc241d', '#b41212', '#9d0006', '#700b0f'];
const orange: MantineColorsTuple = ['#fcdaa4', '#fcc685', '#fdaf62', '#fd983e', '#fe8019', '#ea6e14', '#d65d0e', '#c24c08', '#af3a03', '#7c310e'];
const yellow: MantineColorsTuple = ['#fbe7a9', '#fbdd8d', '#fad36f', '#fac84f', '#fabd2f', '#e8ab28', '#d79921', '#c6881a', '#b57614', '#805819'];
const green: MantineColorsTuple = ['#eee6a7', '#e2dc8a', '#d4d26a', '#c6c648', '#b8bb26', '#a8a920', '#98971a', '#888614', '#79740e', '#595715'];
const aqua: MantineColorsTuple = ['#e5e7b8', '#d2deaa', '#bcd59c', '#a5ca8c', '#8ec07c', '#7bae73', '#689d6a', '#558c61', '#427b58', '#355b45'];
const blue: MantineColorsTuple = ['#e3e2be', '#cdd4b5', '#b5c5ac', '#9cb5a2', '#83a598', '#649590', '#458588', '#267680', '#076678', '#0f4e5a'];
const purple: MantineColorsTuple = ['#f3dcbe', '#ecc8b6', '#e4b3ad', '#db9ca4', '#d3869b', '#c27490', '#b16286', '#a0507c', '#8f3f71', '#673455'];

/**
 * The neutral ramp. Mantine reads specific indices out of `dark`, so the
 * mapping here is load-bearing:
 *   dark[0] -> body text            = light1 #ebdbb2 (gruvbox `Normal` fg)
 *   dark[2] -> dimmed text          = gray   #928374 (gruvbox `Comment`)
 *   dark[4] -> default border       = dark3  #665c54 (gruvbox `Visual`)
 *   dark[6] -> hover / input bg     = dark1  #3c3836 (gruvbox `CursorLine`)
 *   dark[7] -> body background      = dark0  #282828 (gruvbox `Normal` bg)
 *   dark[8] -> recessed surfaces    = dark0_hard #1d2021
 */
const dark: MantineColorsTuple = [
  '#ebdbb2', // 0  light1
  '#d5c4a1', // 1  light2
  '#928374', // 2  gray
  '#7c6f64', // 3  dark4
  '#665c54', // 4  dark3
  '#504945', // 5  dark2
  '#3c3836', // 6  dark1
  '#282828', // 7  dark0        <- body background
  '#1d2021', // 8  dark0_hard
  '#141617', // 9  below hard
];

/** Warm tan neutrals, for `color="gray"` and muted UI. */
const gray: MantineColorsTuple = [
  '#f2e6be', '#e6d8b2', '#d5c4a1', '#bdae93', '#a89984',
  '#928374', '#7c6f64', '#665c54', '#504945', '#3c3836',
];

/* ---------------------------------------------------------------------------
 * Theme
 * ------------------------------------------------------------------------- */

const MONO =
  '"Fira Mono", "JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const gruvboxTheme = createTheme({
  colors: {
    dark,
    gray,
    red,
    orange,
    yellow,
    green,
    blue,
    // gruvbox names
    aqua,
    purple,
    // gruvbox has seven hues; the remaining Mantine defaults alias onto the
    // nearest one so `color="teal"`, `color="grape"` etc. stay on-palette.
    teal: aqua,
    cyan: aqua,
    lime: green,
    indigo: blue,
    violet: purple,
    grape: purple,
    pink: purple,
  },

  primaryColor: 'orange',

  // Dark scheme uses the bright accent, light scheme the faded one — the same
  // swap gruvbox.vim performs in `Setup Colors`.
  primaryShade: { light: 8, dark: 4 },

  white: gruvbox.light0, // #fbf1c7
  black: gruvbox.dark0Hard, // #1d2021

  // Bright gruvbox accents are luminous; let Mantine flip filled-variant text
  // to near-black on them instead of washing it out in cream.
  autoContrast: true,
  luminanceThreshold: 0.45,

  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace: MONO,

  headings: {
    // Deliberate: gruvbox is an editor theme, so headings run in the mono face.
    // Swap this to `undefined` if you want headings to inherit `fontFamily`.
    fontFamily: MONO,
    fontWeight: '700',
  },

  // Terminal lineage: corners stay nearly square.
  defaultRadius: 'xs',
  radius: {
    xs: '2px',
    sm: '3px',
    md: '4px',
    lg: '6px',
    xl: '10px',
  },

  defaultGradient: {
    from: 'orange.4',
    to: 'red.4',
    deg: 45,
  },

  // Neutral shadows read as grime over a #282828 body; these are near-black.
  shadows: {
    xs: '0 1px 2px rgba(20, 22, 23, 0.5)',
    sm: '0 1px 3px rgba(20, 22, 23, 0.6), 0 6px 10px -4px rgba(20, 22, 23, 0.45)',
    md: '0 1px 3px rgba(20, 22, 23, 0.6), 0 14px 20px -6px rgba(20, 22, 23, 0.5)',
    lg: '0 1px 3px rgba(20, 22, 23, 0.6), 0 22px 32px -10px rgba(20, 22, 23, 0.55)',
    xl: '0 1px 3px rgba(20, 22, 23, 0.6), 0 32px 48px -14px rgba(20, 22, 23, 0.6)',
  },

  cursorType: 'pointer',

  other: { gruvbox },
});

/* ---------------------------------------------------------------------------
 * Semantic variable overrides
 *
 * Most semantic variables derive correctly from the tuples above. These few
 * don't, because Mantine's defaults assume a neutral-gray dark scheme.
 * ------------------------------------------------------------------------- */

export const gruvboxCssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {},

  light: {
    '--mantine-color-body': theme.other.gruvbox.light0,
    '--mantine-color-text': theme.other.gruvbox.dark1,
    '--mantine-color-dimmed': theme.other.gruvbox.gray,
    '--mantine-color-error': theme.other.gruvbox.fadedRed,
    '--mantine-color-anchor': theme.other.gruvbox.fadedBlue,
    '--mantine-color-default': theme.other.gruvbox.light1,
    '--mantine-color-default-hover': theme.other.gruvbox.light2,
    '--mantine-color-default-border': theme.other.gruvbox.light3,
  },

  dark: {
    '--mantine-color-body': theme.other.gruvbox.dark0, // #282828
    '--mantine-color-text': theme.other.gruvbox.light1, // #ebdbb2
    '--mantine-color-dimmed': theme.other.gruvbox.gray, // #928374, gruvbox `Comment`
    '--mantine-color-error': theme.other.gruvbox.brightRed,
    '--mantine-color-anchor': theme.other.gruvbox.brightBlue,
    '--mantine-color-default': theme.other.gruvbox.dark1, // #3c3836
    '--mantine-color-default-hover': theme.other.gruvbox.dark2, // #504945
    '--mantine-color-default-border': theme.other.gruvbox.dark3, // #665c54
    '--mantine-color-placeholder': theme.other.gruvbox.dark4,
  },
});