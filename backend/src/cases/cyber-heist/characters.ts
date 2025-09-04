export const characterPrivateData: Record<string, any> = {
  alex_chen: {
    alibi: "In server room running diagnostics from 2:00-3:30 AM. Security logs confirm badge access.",
    motive: "Passed over for promotion three times. Girlfriend needs expensive medical treatment.",
    secrets: "Has been selling minor company data on dark web. Created backdoor access months ago for 'emergency maintenance'.",
    relationship: "Lead Security Analyst. Bitter about being undervalued. Mentored Sarah initially.",
    truthfulFacts: [
      "Created multiple backdoors in the system",
      "Knows about David's gambling problem",
      "Discovered Marcus's affair with client",
      "Has access to all security protocols",
      "Girlfriend has cancer, needs $300k for treatment"
    ],
    lies: [
      "Claims all backdoors were authorized",
      "Denies knowing about the vulnerability that was exploited"
    ],
    personality: "Brilliant but frustrated. Defensive about technical expertise. Cracks under emotional pressure about girlfriend."
  },

  sarah_kim: {
    alibi: "Working from home 1:00-4:00 AM on patch deployment. VPN logs show connection, but can be spoofed.",
    motive: "Student loans of $200k. Recently discovered company planning to outsource her department.",
    secrets: "Has been interviewing with competitors. Installed keylogger on David's computer last month. Has crypto gambling addiction.",
    relationship: "Junior developer who rose quickly. Sees Alex as rival after initially being mentored.",
    truthfulFacts: [
      "Installed monitoring software on several machines",
      "Has $200k in student loans",
      "Department being outsourced next quarter",
      "Knows how to spoof VPN logs",
      "Lost $50k in crypto trading last month"
    ],
    lies: [
      "Says VPN connection proves she was home",
      "Claims to be loyal to company"
    ],
    personality: "Anxious and overworked. Tries to appear confident but slips reveal desperation."
  },

  david_morrison: {
    alibi: "At casino until 2:30 AM, then home. Casino confirms presence but no witnesses after.",
    motive: "Owes $500k to dangerous people from gambling. Bank discovered his embezzlement last week.",
    secrets: "Has been embezzling for 18 months. Sold admin credentials to unknown buyer on dark web. Being blackmailed.",
    relationship: "CFO with spending problem. Everyone knows about gambling but not the embezzlement.",
    truthfulFacts: [
      "Massive gambling debts to mob connections",
      "Sold system credentials last month",
      "Being investigated for embezzlement",
      "Has master access to all financial systems",
      "Received threatening message day before heist"
    ],
    lies: [
      "Claims gambling is under control",
      "Denies any financial irregularities"
    ],
    personality: "Smooth talker masking desperation. Paranoid about being watched. Sweats when pressed."
  },

  marcus_taylor: {
    alibi: "In office until 1:00 AM in meeting with Tokyo clients. Call logs confirm until 1:00 AM only.",
    motive: "Insider trading investigation by SEC. Needs money to flee country. Being divorced, will lose everything.",
    secrets: "Has Cayman Islands accounts. Been feeding info to competitor TechNova. Planning to disappear.",
    relationship: "CEO trying to maintain image while empire crumbles. Affair with client destroyed marriage.",
    truthfulFacts: [
      "Under SEC investigation",
      "Has offshore accounts",
      "Divorce will cost him $30 million",
      "Been in talks with TechNova",
      "Has override codes for all systems"
    ],
    lies: [
      "Claims company is financially stable",
      "Denies any wrongdoing with SEC"
    ],
    personality: "Charismatic but cracking. Alternates between charm and aggression. Mentions escape subtly."
  },

  rachel_wong: {
    alibi: "At home asleep. Phone was off. Lives alone, no witnesses.",
    motive: "Brother imprisoned for hack she claims was legal. Blames company for not defending him. Wants revenge.",
    secrets: "Has been documenting all illegal company activities. Maintains contact with hacker groups. Planning whistleblower leak.",
    relationship: "Head of Compliance who discovered too much. Loyal to brother above all.",
    truthfulFacts: [
      "Brother serving 10 years for hacking",
      "Company refused to provide legal help",
      "Has documented evidence of company crimes",
      "Contacts in Anonymous and other groups",
      "Knows about everyone's secrets from compliance work"
    ],
    lies: [
      "Claims to have moved past brother's situation",
      "Says she was definitely asleep"
    ],
    personality: "Cold and methodical. Shows emotion only about brother. Hints at knowing more than she says."
  },

  james_rivera: {
    alibi: "Responding to fake server alert from 2:15-2:45 AM. Alert was remotely triggered.",
    motive: "Ex-employee starting competing company. Needs capital and wants to damage SecureBank reputation.",
    secrets: "Still has active credentials IT forgot to revoke. Has been stealing client lists. Planted logic bomb.",
    relationship: "Former CTO who 'resigned' after disagreement. Still has inside contacts.",
    truthfulFacts: [
      "Credentials never revoked after leaving",
      "Starting DirectBank as competitor",
      "Has been poaching clients and employees",
      "Planted malware before leaving",
      "Knows about David's credential sale"
    ],
    lies: [
      "Claims clean break from company",
      "Denies any access to systems"
    ],
    personality: "Arrogant about his technical superiority. Bitter about forced resignation. Taunts about security."
  },

  nina_patel: {
    alibi: "On video call with Mumbai team from 2:00-3:00 AM. But video can be pre-recorded.",
    motive: "Passed secrets to Indian competitor for $2M. They want her to destroy evidence of their involvement.",
    secrets: "Has been corporate spy for 2 years. Family in India threatened if she doesn't comply. Already transferred $1M offshore.",
    relationship: "VP of Operations trusted with everything. Perfect record hiding dark reality.",
    truthfulFacts: [
      "Family in Mumbai being threatened",
      "Already received $1M payment",
      "Has been feeding info to competitors",
      "Knows about Marcus's escape plan",
      "Can access any system through operations role"
    ],
    lies: [
      "Video call alibi is fabricated",
      "Claims complete loyalty to company"
    ],
    personality: "Perfectly professional facade. Only breaks when family mentioned. Defensive about India connections."
  },

  oliver_frost: {
    alibi: "At home, but security system was mysteriously offline that night. Claims sleeping.",
    motive: "NSA asset placed to monitor financial crimes. Needs to destroy evidence of government backdoors.",
    secrets: "Reports to intelligence agencies. Has been covering up government surveillance. Heist was to hide his tracks.",
    relationship: "External security consultant who's actually government plant.",
    truthfulFacts: [
      "Works for intelligence agencies",
      "Installed government backdoors",
      "Knows about everyone's crimes from surveillance",
      "Can make money disappear into black ops funds",
      "Has immunity deal if caught"
    ],
    lies: [
      "Denies any government connection",
      "Claims security system malfunction was coincidence"
    ],
    personality: "Too calm and collected. Never surprised by revelations. Occasionally slips with classified knowledge."
  }
};

export const solution = {
  murderer: "sarah_kim",
  method: "Used keylogger data from David's computer to get his sold credentials. Spoofed VPN to appear home while executing heist from office. Triggered fake alert to misdirect James.",
  motive: "Desperate to pay loans before department outsourced. Lost everything in crypto. Used knowledge of everyone's secrets to frame others.",
  keyEvidence: [
    "Keylogger installation logs on David's machine",
    "VPN spoofing software on her workstation",
    "Fake alert traced to her terminal",
    "Crypto wallet received exactly $50M in untraceable coins",
    "Suicide note draft on computer mentioning 'if caught'"
  ],
  confession: "When confronted with keylogger evidence and proof of VPN spoofing, breaks down about crypto losses and fear of poverty. Admits she figured anyone else would look more guilty.",
  redHerringsExplained: {
    "alex_chen": "Backdoors were for personal schemes, not this heist",
    "david_morrison": "Sold credentials but didn't use them himself",
    "marcus_taylor": "Planning to flee but didn't need this heat",
    "oliver_frost": "Would never risk exposure for money"
  }
};