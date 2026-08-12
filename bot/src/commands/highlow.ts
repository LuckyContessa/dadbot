import { Command } from "@sapphire/framework";
import { isMessageInstance, isTextBasedChannel } from "@sapphire/discord.js-utilities";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags, MessagePayload, userMention, type BaseMessageOptions, type InteractionReplyOptions, type Message } from "discord.js";
import { getConfig } from "../config.ts";

interface GameState {
  player: string,
  score: number,
  previous?: number,
  target: number,
  guess?: 'higher' | 'lower',
  phase: 'running' | 'timeout' | 'over'
}
const randomNumber = (): number => {
  return Math.ceil(Math.random() * 22);
};
const newGame = (player: string): GameState => ({
  player,
  score: 0,
  target: randomNumber(),
  phase: 'running',
});

export class HighLowCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
      ...options,
      name: "highlow",
      aliases: ["lowhigh"],
      description: "A guessing game as old as time"
    });
  }
  
  public override registerApplicationCommands(registry: Command.Registry) {
    const guildIds = getConfig().servers.map(s => s.guildId);

    registry.registerChatInputCommand((builder) => {
      builder.setName(this.name)
      .setDescription(this.description)
    }, {"idHints": [], guildIds})
  }
  
  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const gameState: GameState = newGame(interaction.user.id);
    let gameMsg = await interaction.reply({
      ...renderGame(gameState),
      withResponse: true,
    });

    let shouldContinue = true;
    while (shouldContinue) {
      try {
        // TODO: This should really be persisted in the db and handled via a separate interaction hook
        const choice = await gameMsg.resource?.message?.awaitMessageComponent({time: 60_000})!;
        if (choice.user.id != gameState.player) {
          await choice.reply({content: "Hey, this isn't your game!", flags: [MessageFlags.Ephemeral]});
          continue;
        } 

        gameState.guess = choice.customId == 'higher' ? 'higher' : 'lower';
        gameState.previous = gameState.target;
        gameState.target = randomNumber();
        
        const correct = gameState.target > gameState.previous && gameState.guess == 'higher'
            || gameState.target < gameState.previous && gameState.guess == 'lower';
        const lucky = gameState.target == gameState.previous;
        
        if (lucky) {
          // YOU GET NOTHING, YOU LOSE, GOOD DAY SIR
          gameState.score += 0;
        } else if (correct) {
          gameState.score += 1;
        } else {
          gameState.phase = 'over';
          shouldContinue = false;
          // TODO: Need to add a high score board
        }

        gameMsg = await choice?.update({...renderGame(gameState), withResponse: true});
      } catch {
        gameState.phase = 'timeout';
        shouldContinue = false;
        return interaction.editReply(renderGame(gameState))
      }
    }
  }
}

function numToEmoji(x: number): string {
  return `${x}`.split("").map((c) => {
    if(c == '0') { return '0️⃣' }
    if(c == '1') { return '1️⃣' }
    if(c == '2') { return '2️⃣' }
    if(c == '3') { return '3️⃣' }
    if(c == '4') { return '4️⃣' }
    if(c == '5') { return '5️⃣' }
    if(c == '6') { return '6️⃣' }
    if(c == '7') { return '7️⃣' }
    if(c == '8') { return '8️⃣' }
    if(c == '9') { return '9️⃣' }
    return '❓'
  }).join("")
}

function renderGame(gameState: GameState): BaseMessageOptions {
  const higher = new ButtonBuilder().setCustomId("higher").setLabel("Higher").setStyle(ButtonStyle.Primary)
  const lower = new ButtonBuilder().setCustomId("lower").setLabel("Lower").setStyle(ButtonStyle.Success)
  const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(higher, lower);
  const components = gameState.phase == 'running' ? [buttons] : [];

  let description = `${numToEmoji(gameState.target)}\n\n`;
  if (gameState.phase == 'running') {
    if (gameState.target == gameState.previous) {
      description += "Lucky!! Neither higher nor lower...\n"
    } else if (!!gameState.previous) {
      description += "Correct!!\n"
    }
    description += "Will the next number be higher or lower? (1-22)"
  } else if (gameState.phase == 'timeout') {
    description += "Sorry, you ran out of time ☹️"
  } else {
    description += "Oh no!!\nSuch a shame but I'm afraid that's game over"
  }
  
  return {
      embeds: [
        {
          title: "Higher or Lower",
          description,
          color: 0x0000FF,
          fields: [
            {
              "name": "Player",
              "value": userMention(gameState.player),
              "inline": true
            },
            {
              "name": "Score",
              "value": `${gameState.score}`,
              "inline": true
            }
          ]
        }
      ],
      components,
    }
}