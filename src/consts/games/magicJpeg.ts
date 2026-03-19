import getGameThemeColorsServer from "../../helpers/getGameThemeColorsServer";
import type { CardGame } from "../../types/content";

const MAGIC_JPEG_COVER = "/work/test/magic.png";

export const GAME_MAGIC_JPEG_THEME_COLORS =
  await getGameThemeColorsServer(MAGIC_JPEG_COVER);

const GAME_MAGIC_JPEG: CardGame = {
  id: "MAGIC.JPEG_",
  startCardId: "start",
  finishCardId: "finish",
  coverImage: MAGIC_JPEG_COVER,
  stats: {
    health: {
      label: "Health",
      min: 0,
      max: 100,
      initial: 50,
    },
    armor: {
      label: "Armor",
      min: 0,
      max: 100,
      initial: 50,
    },
  },
  intro: {
    title: "MAGIC.JPEG_",
    text: "You enter The Velvet Pixel with half a clue and full bad habits. Drink, interrogate, or spiral.",
  },
  outro: {
    title: "Session ended",
    endings: [
      {
        id: "dead",
        title: "You drank through the plot",
        text: "The bartender closes your tab with a black ribbon. Your legend becomes a cautionary coaster.",
      },
      {
        id: "cliffhanger",
        title: "Cliffhanger",
        text: "A caller whispers, 'Bring the negative to Pier 9, alone.' The line dies before you answer.",
      },
      {
        id: "special-key",
        title: "Special key acquired",
        text: "Inside your coat: a brass key etched MAGIC.JPEG_. The real investigation starts now.",
      },
    ],
  },
  cards: [
    {
      id: "start",
      text: "You step into The Velvet Pixel. Neon hums, rain taps the windows, and the bartender already has your glass ready.",
      options: [
        {
          id: "start-drink",
          label: "Order the first drink",
          points: 1,
          healthDelta: -10,
          armorDelta: -8,
          nextCardId: "drink_one",
          response: {
            title: "Pour",
            text: "No menu, no warning. Just a heavy glass and heavier choices.",
          },
        },
        {
          id: "start-hardcore",
          label: "Order a triple shot immediately",
          points: -1,
          healthDelta: -20,
          armorDelta: -16,
          nextCardId: "drink_three",
          response: {
            title: "Speedrun",
            text: "The bar goes quiet for a second, like everyone wants to see how this ends.",
          },
        },
        {
          id: "start-detective",
          label: "Stay sharp and scan the room",
          points: 2,
          armorDelta: 8,
          nextCardId: "detective_mode",
          response: {
            title: "Observe",
            text: "Gambler at corner table. Bartender too calm. Jukebox too loud. Good, now it's a case.",
          },
        },
      ],
    },
    {
      id: "trail",
      text: "A mossy trail opens to a rotten billboard: THE VELVET PIXEL - BEST DRINKS, WORST TRUTHS.",
      options: [
        {
          id: "trail-sign",
          label: "Head for the road sign",
          points: 1,
          nextCardId: "ranger_sign",
          response: {
            title: "Proceed",
            text: "You step over wet roots and find a sign pointing toward town.",
          },
        },
        {
          id: "trail-totem",
          label: "Check the carved totem",
          points: 2,
          nextCardId: "totem",
          response: {
            title: "Inspect",
            text: "The wood is fresh-cut. Whoever carved it wanted you to see it tonight.",
          },
        },
      ],
    },
    {
      id: "prints",
      text: "The prints stop near a cigarette still burning in the rain. Brand: Noire Red.",
      options: [
        {
          id: "prints-totem",
          label: "Follow toward the totem",
          points: 2,
          nextCardId: "totem",
          response: {
            title: "Track",
            text: "The same sole pattern circles the totem like a nervous confession.",
          },
        },
        {
          id: "prints-sign",
          label: "Ignore it and move to town",
          points: 0,
          nextCardId: "ranger_sign",
          response: {
            title: "Move",
            text: "You leave evidence behind. Future-you will hate that.",
          },
        },
      ],
    },
    {
      id: "totem",
      text: "The totem reads: 'DOUBT THE SOBER ONES.' A bus ticket is nailed beneath it.",
      options: [
        {
          id: "totem-bus",
          label: "Take the ticket",
          points: 2,
          nextCardId: "bus_stop",
          response: {
            title: "Acquire",
            text: "Route code says F-404. One-way to Neon District.",
          },
        },
        {
          id: "totem-sign",
          label: "Walk to the ranger sign instead",
          points: 1,
          nextCardId: "ranger_sign",
          response: {
            title: "Move",
            text: "You keep the clue in mind and push toward town lights.",
          },
        },
      ],
    },
    {
      id: "ranger_sign",
      text: "A bent ranger sign says: TOWN 2 MI / TRUTH 0 MI.",
      options: [
        {
          id: "sign-bus",
          label: "Wait at the bus stop",
          points: 1,
          nextCardId: "bus_stop",
          response: {
            title: "Wait",
            text: "Headlights appear with no engine noise. Normal evening.",
          },
        },
        {
          id: "sign-gate",
          label: "Walk straight to town",
          points: 1,
          nextCardId: "town_gate",
          response: {
            title: "Walk",
            text: "Rain starts right on cue like the universe knows noir rules.",
          },
        },
      ],
    },
    {
      id: "bus_stop",
      text: "A bus arrives, empty driver seat, radio tuned to courtroom jazz.",
      options: [
        {
          id: "bus-town",
          label: "Ride to town gate",
          points: 1,
          nextCardId: "town_gate",
          response: {
            title: "Ride",
            text: "You pass dark storefronts and one glowing bar sign.",
          },
        },
        {
          id: "bus-bar",
          label: "Get off at The Velvet Pixel",
          points: 1,
          nextCardId: "neon_bar",
          response: {
            title: "Arrive",
            text: "The bar door opens before you touch it.",
          },
        },
      ],
    },
    {
      id: "town_gate",
      text: "Neon District. Wet asphalt. Every window reflects a different lie.",
      options: [
        {
          id: "gate-bar",
          label: "Enter The Velvet Pixel",
          points: 1,
          nextCardId: "neon_bar",
          response: {
            title: "Enter",
            text: "You smell citrus, smoke, and a cover-up.",
          },
        },
        {
          id: "gate-detective",
          label: "Switch to detective mode",
          points: 2,
          armorDelta: 8,
          nextCardId: "detective_mode",
          response: {
            title: "Focus",
            text: "Notebook out. Chin up. Everyone is suspicious now.",
          },
        },
      ],
    },
    {
      id: "neon_bar",
      text: "Inside, a bartender polishes one glass forever. A gambler watches you like unfinished business.",
      options: [
        {
          id: "bar-stool",
          label: "Take a stool",
          points: 0,
          armorDelta: -4,
          nextCardId: "bar_counter",
          response: {
            title: "Sit",
            text: "The menu reads: 1) Drink 2) Drink more 3) Pretend to investigate.",
          },
        },
        {
          id: "bar-detective",
          label: "Start questioning people",
          points: 2,
          armorDelta: 6,
          nextCardId: "detective_mode",
          response: {
            title: "Investigate",
            text: "Good call. In this town, hydration is not a strategy but it helps.",
          },
        },
      ],
    },
    {
      id: "bar_counter",
      text: "Bartender asks: 'Liquid courage or liquid evidence?'",
      options: [
        {
          id: "counter-drink",
          label: "Order the first drink",
          points: 1,
          healthDelta: -12,
          armorDelta: -10,
          nextCardId: "drink_one",
          response: {
            title: "Pour",
            text: "A Render Manhattan slides over. The ice cube is perfectly judgmental.",
          },
        },
        {
          id: "counter-detective",
          label: "Skip drinks, ask for leads",
          points: 2,
          armorDelta: 6,
          nextCardId: "detective_mode",
          response: {
            title: "Question",
            text: "The bartender smirks. 'Finally, someone here for plot.'",
          },
        },
      ],
    },
    {
      id: "drink_one",
      text: "First drink down. The room is funnier and less trustworthy.",
      options: [
        {
          id: "drink1-more",
          label: "Another, for confidence",
          points: 1,
          healthDelta: -16,
          armorDelta: -12,
          nextCardId: "drink_two",
          response: {
            title: "Escalate",
            text: "Your confidence now exceeds your balance by 40%.",
          },
        },
        {
          id: "drink1-stop",
          label: "Switch to questions",
          points: 0,
          healthDelta: 4,
          armorDelta: 3,
          nextCardId: "bartender",
          response: {
            title: "Recover",
            text: "You place the glass down like a responsible protagonist.",
          },
        },
      ],
    },
    {
      id: "drink_two",
      text: "Second drink. The jukebox starts addressing you by name.",
      options: [
        {
          id: "drink2-more",
          label: "Double down",
          points: 1,
          healthDelta: -22,
          armorDelta: -16,
          nextCardId: "drink_three",
          response: {
            title: "Commit",
            text: "The bartender nods with professional concern.",
          },
        },
        {
          id: "drink2-overclock",
          label: "Order two more for the road",
          points: -6,
          healthDelta: -100,
          armorDelta: -100,
          nextCardId: "finish",
          endingId: "dead",
          response: {
            title: "Overclock",
            text: "You skip straight to the part where everyone says 'he had potential.'",
          },
        },
        {
          id: "drink2-air",
          label: "Step out for air",
          points: 1,
          healthDelta: 8,
          armorDelta: 2,
          nextCardId: "alley",
          response: {
            title: "Exit",
            text: "Cold rain slaps clarity back into your face.",
          },
        },
      ],
    },
    {
      id: "drink_three",
      text: "Third drink arrives on fire. Nobody warns you. That's a clue.",
      options: [
        {
          id: "drink3-finish",
          label: "Chug it anyway",
          points: -8,
          healthDelta: -100,
          armorDelta: -100,
          nextCardId: "finish",
          endingId: "dead",
          response: {
            title: "Critical hit",
            text: "You solve exactly zero cases and become a bar anecdote.",
          },
        },
        {
          id: "drink3-stop",
          label: "Abort mission, investigate instead",
          points: -1,
          healthDelta: -18,
          armorDelta: -10,
          nextCardId: "detective_mode",
          response: {
            title: "Regain control",
            text: "You are dizzy, but still technically alive and employable.",
          },
        },
      ],
    },
    {
      id: "detective_mode",
      text: "LA Noire instincts online. Truth, doubt, and lie are all in the same room.",
      options: [
        {
          id: "detective-bartender",
          label: "Question bartender",
          points: 2,
          armorDelta: 5,
          nextCardId: "bartender",
          response: {
            title: "Interrogate",
            text: "His smile cracks when you mention the camera roll.",
          },
        },
        {
          id: "detective-gambler",
          label: "Interrogate gambler",
          points: 2,
          armorDelta: 5,
          nextCardId: "gambler",
          response: {
            title: "Interrogate",
            text: "He hides a matchbook and a bad poker face.",
          },
        },
        {
          id: "detective-jukebox",
          label: "Inspect jukebox",
          points: 1,
          armorDelta: 3,
          nextCardId: "jukebox",
          response: {
            title: "Inspect",
            text: "Track 9 is unlabeled. It wasn't there a second ago.",
          },
        },
      ],
    },
    {
      id: "bartender",
      text: "Bartender says, 'People come here to forget, not to solve.' He is lying badly.",
      options: [
        {
          id: "bartender-gambler",
          label: "Press him about the gambler",
          points: 1,
          armorDelta: 2,
          nextCardId: "gambler",
          response: {
            title: "Press",
            text: "'He plays every night. Never wins. Never leaves,' the bartender admits.",
          },
        },
        {
          id: "bartender-alley",
          label: "Ask about back door",
          points: 2,
          armorDelta: 4,
          nextCardId: "alley",
          response: {
            title: "Clue",
            text: "He slides a napkin with three numbers: 4-5-1.",
          },
        },
      ],
    },
    {
      id: "gambler",
      text: "The gambler flips a coin and misses the table. Nervous hands.",
      options: [
        {
          id: "gambler-jukebox",
          label: "Call his bluff",
          points: 2,
          armorDelta: 3,
          nextCardId: "jukebox",
          response: {
            title: "Pressure",
            text: "He mutters: 'Track 9 rings the phone behind the bar.'",
          },
        },
        {
          id: "gambler-alley",
          label: "Search his coat pocket",
          points: 1,
          armorDelta: 2,
          nextCardId: "alley",
          response: {
            title: "Acquire",
            text: "You find a tiny keyhole diagram and a locker icon.",
          },
        },
      ],
    },
    {
      id: "jukebox",
      text: "Track 9 plays a voicemail backward: 'Pier 9. Bring the negative. Alone.'",
      options: [
        {
          id: "jukebox-finish",
          label: "Take the pier call immediately",
          points: 3,
          nextCardId: "finish",
          endingId: "cliffhanger",
          response: {
            title: "Hook",
            text: "The line drops. Rain gets heavier. Cut to black.",
          },
        },
        {
          id: "jukebox-alley",
          label: "Find more evidence first",
          points: 2,
          nextCardId: "alley",
          response: {
            title: "Delay",
            text: "You decide to arrive prepared, not dramatic.",
          },
        },
      ],
    },
    {
      id: "alley",
      text: "Back alley. Flickering sign. Metal lockbox bolted to the wall.",
      options: [
        {
          id: "alley-open",
          label: "Open the lockbox",
          points: 2,
          armorDelta: 2,
          nextCardId: "lockbox",
          response: {
            title: "Approach",
            text: "Three-digit keypad. No second chances vibe.",
          },
        },
        {
          id: "alley-back",
          label: "Go back inside",
          points: 0,
          nextCardId: "bartender",
          response: {
            title: "Retreat",
            text: "You reset your nerves and return to warm neon.",
          },
        },
      ],
    },
    {
      id: "lockbox",
      text: "Keypad blinks. You remember a napkin code and several poor life choices.",
      options: [
        {
          id: "lockbox-correct",
          label: "Enter 451",
          points: 3,
          armorDelta: 4,
          nextCardId: "key_room",
          response: {
            title: "Unlocked",
            text: "The lock clicks. You hear distant footsteps running.",
          },
        },
        {
          id: "lockbox-random",
          label: "Guess random numbers",
          points: -2,
          healthDelta: -20,
          armorDelta: -20,
          nextCardId: "finish",
          endingId: "cliffhanger",
          response: {
            title: "Alarm",
            text: "A phone starts ringing somewhere far away. You are out of time.",
          },
        },
      ],
    },
    {
      id: "key_room",
      text: "Inside: a brass key stamped MAGIC.JPEG_ and a photo of Pier 9 at dawn.",
      options: [
        {
          id: "key-room-take",
          label: "Take the special key",
          points: 5,
          armorDelta: 6,
          nextCardId: "finish",
          endingId: "special-key",
          response: {
            title: "Secure evidence",
            text: "The key is warm, like it has been waiting for your hand.",
          },
        },
        {
          id: "key-room-leave",
          label: "Leave it and chase the caller",
          points: 2,
          nextCardId: "finish",
          endingId: "cliffhanger",
          response: {
            title: "Rush",
            text: "You bolt toward the pier with half the puzzle in your head.",
          },
        },
      ],
    },
    {
      id: "finish",
      text: "End of session",
      options: [],
    },
  ],
};

export default GAME_MAGIC_JPEG;
