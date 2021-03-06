import { SteveCommand } from '@lib/structures/commands/SteveCommand';
import { PermissionsLevels } from '@lib/types/Enums';
import { GuildSettings } from '@lib/types/settings/GuildSettings';
import { Message } from 'discord.js';
import { CommandStore, KlasaMessage } from 'klasa';

export default class extends SteveCommand {

	public constructor(store: CommandStore, file: string[], directory: string) {
		super(store, file, directory, {
			aliases: ['tcd'],
			description: lang => lang.tget('COMMAND_TOGGLECHANNELDELETE_DESCRIPTION'),
			permissionLevel: PermissionsLevels.MODERATOR,
			runIn: ['text']
		});
	}

	public async run(msg: KlasaMessage): Promise<Message> {
		const current = msg.guild!.settings.get(GuildSettings.LogEvents.ChannelDelete) as boolean;

		await msg.guild!.settings.update(GuildSettings.LogEvents.ChannelDelete, !current);

		return msg.channel.send(msg.guild!.language.tget('COMMAND_TOGGLECHANNELDELETE', current));
	}

}
