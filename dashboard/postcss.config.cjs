module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
      // Gruvbox Dark palette
      variables: {
        'gruvbox-bg': '#282822',
        'gruvbox-bg0': '#1d2021',
        'gruvbox-bg1': '#32302f',
        'gruvbox-bg2': '#3c3836',
        'gruvbox-bg3': '#504945',
        'gruvbox-fg': '#ebdbb2',
        'gruvbox-fg-dim': '#a89984',
        'gruvbox-fg-dim2': '#7c6f64',
        'gruvbox-black': '#1d2021',
        'gruvbox-red': '#cc241d',
        'gruvbox-green': '#98971a',
        'gruvbox-yellow': '#d79921',
        'gruvbox-blue': '#458588',
        'gruvbox-purple': '#b16286',
        'gruvbox-aqua': '#689d6a',
        'gruvbox-orange': '#d65d0e',
        'gruvbox-comment': '#7c6f64',
      },
    },
  },
};
