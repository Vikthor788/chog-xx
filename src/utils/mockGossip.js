export const seedGossip = [
  {
    id: 1,
    chogId: 482,
    text: "Chog #482 just started beef with #91. Says the Aqua background is mid.",
    timestamp: Date.now() - 1000 * 60 * 12,
    reactions: { fire: 14, skull: 7, heart: 2 },
  },
  {
    id: 2,
    chogId: 91,
    text: "Chog #91 replied: 'At least I don’t cry in my PFP like some people.'",
    timestamp: Date.now() - 1000 * 60 * 8,
    reactions: { fire: 21, skull: 3, heart: 5 },
  },
  {
    id: 3,
    chogId: 1207,
    text: "Chog #1207 is spreading rumors that #33 is trying to flip their holder for a better trait.",
    timestamp: Date.now() - 1000 * 60 * 4,
    reactions: { fire: 9, skull: 18, heart: 1 },
  },
];

export const generateRandomGossip = () => {
  const ids = [33, 91, 120, 333, 482, 777, 1207, 1690, 1888];
  const a = ids[Math.floor(Math.random() * ids.length)];
  let b = ids[Math.floor(Math.random() * ids.length)];
  while (b === a) b = ids[Math.floor(Math.random() * ids.length)];

  const lines = [
    `Chog #${a} was spotted arguing with #${b} about who has the rarer eyes.`,
    `Two Chogs (#${a} & #${b}) got caught hanging out. The timeline is already shipping them.`,
    `Chog #${a} just dropped a cryptic post. #${b} is taking it personally.`,
    `Rumor is Chog #${a} is about to start a faction against the Russian Hat meta.`,
    `Chog #${b} tried to make peace with #${a}. It did not go well.`,
  ];

  return {
    id: Date.now(),
    chogId: a,
    text: lines[Math.floor(Math.random() * lines.length)],
    timestamp: Date.now(),
    reactions: { fire: 0, skull: 0, heart: 0 },
  };
};
