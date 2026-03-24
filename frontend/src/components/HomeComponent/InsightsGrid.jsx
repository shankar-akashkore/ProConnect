import styles from './InsightsGrid.module.css';

const cards = [
  {
    front: "Connect before you need to",
    back: "Reach out when there's no agenda — genuine relationships open doors that cold messages never will.",
    dark: false,
  },
  {
    front: "Your profile is your first impression",
    back: "A sharp headline and honest summary do more than a long list of titles ever could.",
    dark: true,
  },
  {
    front: "Tailor, don't blast",
    back: "One thoughtful application beats fifty generic ones. Recruiters can always tell the difference.",
    dark: false,
  },
  {
    front: "Deep work beats long hours",
    back: "Three focused hours outperform eight scattered ones. Guard your peak energy time fiercely.",
    dark: false,
  },
  {
    front: "Learn in public",
    back: "Share what you're learning as you go. It builds credibility and attracts the right opportunities.",
    dark: false,
  },
  {
    front: "Listen more than you speak",
    back: "The best leaders create space for others to think. Your silence is often the most powerful tool.",
    dark: false,
  },
  {
    front: "Ask for feedback, not validation",
    back: "Honest critique from peers grows you faster than being told you're doing great ever will.",
    dark: false,
  },
  {
    front: "Stories land better than facts",
    back: "Interviewers remember how you made them feel — lead with a real story, not a bullet point list.",
    dark: true,
  },
  {
    front: "Price for the value, not the hours",
    back: "Clients pay for outcomes, not time. Anchor your rates to the result you deliver.",
    dark: false,
  },
//   {
//     front: "Consistency beats motivation",
//     back: "Motivation fades. Systems don't. Show up even on the hard days — that's where progress lives.",
//     dark: false,
//   },
];

export default function InsightsGrid() {
  return (
    <div className={styles.section}>
      <div className={styles.grid}>
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${styles.flipWrap} ${card.dark ? styles.dark : styles.light}`}
          >
            <div className={styles.flipInner}>
              <div className={styles.front}>{card.front}</div>
              <div className={styles.back}>{card.back}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Industry Insights</h2>
        <p className={styles.sidebarText}>
          Stay ahead with bite-sized tips from across industries. Hover any
          card to unlock the full insight.
        </p>
      </div>
    </div>
  );
}