import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    gruvboxbg: [
      '#1d2021', '#282822', '#32302f', '#3c3836', '#504945',
      '#5f4f44', '#66574c', '#7c6f64', '#928174', '#a89984',
    ],
    gruvboxfg: [
      '#a89984', '#b8ab99', '#c9baaf', '#d8c8b2', '#e7d9be',
      '#f0e0c8', '#f4eace', '#f9f4da', '#fdf1d6', '#fdf4e6',
    ],
    gruvboxred: [
      '#5e0000', '#7a0000', '#950000', '#b10000', '#cc0d0d',
      '#e53935', '#f0605e', '#f89080', '#faaaa0', '#fbc4bc',
    ],
    gruvboxorange: [
      '#4d2800', '#653400', '#7d4100', '#944d00', '#ac5a00',
      '#c46f1a', '#da8538', '#e69b57', '#f0b176', '#f9c795',
    ],
    gruvboxyellow: [
      '#4d3300', '#604000', '#734d00', '#865a00', '#996700',
      '#b07608', '#c88a28', '#dba549', '#e6b968', '#efcc87',
    ],
    gruvboxblue: [
      '#003848', '#004e63', '#00647e', '#007a99', '#0090b4',
      '#1a9fb8', '#40b3c4', '#65c5cf', '#8bd7db', '#b0e9e7',
    ],
    gruvboxpurple: [
      '#3a102b', '#4e1639', '#621c47', '#762254', '#8a2862',
      '#a03270', '#b64284', '#c95897', '#d96eaa', '#e686bc',
    ],
    gruvboxaqua: [
      '#00433a', '#00594e', '#006f62', '#008576', '#009b8a',
      '#1ab09e', '#3dc6b2', '#62dccb', '#86e8df', '#aaeff4',
    ],
    gruvboxgreen: [
      '#303000', '#424200', '#545400', '#666600', '#787800',
      '#8e8e0a', '#a6a64d', '#b7b769', '#c5c582', '#d1d19a',
    ],
  },
  primaryColor: 'orange',
  primaryShade: { light: 0, dark: 1 },
  fontSizes: {
    xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '1rem',
    xl: '1.125rem', '2xl': '1.25rem', '3xl': '1.5625rem',
    '4xl': '1.9375rem', '5xl': '2.4414rem', '6xl': '3.0518rem',
  },
  headings: {
    fontFamily: 'SF Mono, SFMono-Regular, ui-monospace, DejaVu Sans Mono, Consolas, Menlo, monospace',
    fontWeight: '600',
  },
  components: {
    Button: { defaultProps: { variant: 'filled', radius: 'sm' } },
    Card: { defaultProps: { withBorder: true, radius: 'md' } },
    Badge: { defaultProps: { radius: 'sm' } },
    ActionIcon: { defaultProps: { variant: 'transparent', color: 'gruvboxfg' } },
    Tooltip: { defaultProps: { withArrow: true } },
    Divider: { defaultProps: { color: 'gruvboxbg3' } },
    TextInput: { defaultProps: { radius: 'sm', variant: 'filled' } },
    Select: { defaultProps: { radius: 'sm', variant: 'filled' } },
    Switch: { defaultProps: { size: 'md' } },
    Group: { defaultProps: { spacing: 'md' } },
    Stack: { defaultProps: { spacing: 'md' } },
  },
});
