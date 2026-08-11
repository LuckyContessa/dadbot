# Dadbot Spec

## Basics
Name: DadBot
Icon: tbd

## Features
- deleted message log
- high low game
- roles assigned on reaction or other interaction with the message (flexible, need to be able to self-assign somehow)
- a report system. This involves the ability to use the /report command to send a message in a specific channel. By interacting with that message, mods can open up a private channel to which only the original message sender and people with the mod roles have access. Bonus points if the text of these channels can later be archived 
- gif commands that pull a random link from a list of links and send it in the channel where the command is called

# Dashboard

## Architecture
- Multi-server support from the start
- Authentication: Discord OAuth2 — users log in with their Discord account
- Authorization: server administrators can access the dashboard by default; RBAC to be added later
- Configuration storage: server config stored on disk as TOML files (visible, versionable, backup-friendly)
- Application state stored in a database (fast-changing data)
- All dashboard changes apply immediately (no bot restart required)
- Deployment: Docker container on a VPS, deployable via `docker-compose push|pull`

## Tech Stack
- Frontend: React + Vite
- UI Framework: Mantine (already set up)
- Theme: Gruvbox Dark

## Layout
- Top bar: DadBot logo, login status, selected server context, navigation
- Sidebar: section navigation (Overview, Settings, Logging, Games, etc.)
- Main area: data display and controls for the selected section
- Layout pattern inspired by YAGPDB's dashboard

## Dashboard Pages / Sections

### Overview / Home
- Server stats, bot status, quick metrics
- Landing page after login

### Bot Settings
- General bot configuration (prefix, welcome messages, etc.)
- Lower priority — stub for now

### Logging
- Configure deleted/edited message logging
- Channel selection, access control (who can view logs)
- Feature mostly implemented in bot; needs dashboard configuration UI

### Games
- Container for game-related settings
- High/Low game configuration (stub for now — thresholds, enabled channels, etc.)

### Reaction Roles
- Configure reaction roles via the dashboard
- TBD — needs design work (how roles are assigned, which reactions, etc.)
- Stub for now

### Reports
- Configure report channel, mod roles
- TBD — needs more thought
- Stub for now

### GIF Management
- Add/remove GIFs from lists
- Create new GIF lists
- Enable/disable GIF commands per list or per channel
- Full configuration UI needed
