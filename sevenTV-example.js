const SevenTV = require('7tv');

async function main() {
    try {
        // Hier eine Beispiel-Twitch-ID oder einen anderen Endpunkt verwenden
        const twitchUserId = '280803646';
        const userData = await SevenTV.getTwitchUser(twitchUserId);
        console.log('7TV Twitch user data:', userData);

        if (userData && userData.emote_set) {
            console.log('Emote set ID:', userData.emote_set_id);
            console.log('Emotes:', userData.emote_set.emotes.map((e) => e.name).join(', '));
        }
    } catch (error) {
        console.error('Fehler beim Abrufen der 7TV-Daten:', error);
    }
}

main();
