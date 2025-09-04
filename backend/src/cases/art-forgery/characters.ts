export const characterPrivateData: Record<string, any> = {
  vincent_monet: {
    alibi: "VICTIM - Found dead at 9:15 PM in main gallery",
    motive: "N/A - Victim",
    secrets: "Was selling forgeries knowingly. Blackmailing several clients. Having affair with Isabelle.",
    relationship: "Gallery owner and renowned art dealer. Corrupt but maintained pristine reputation.",
    truthfulFacts: [
      "Found dead next to 'The Azure Dream' painting",
      "Had $5 million in offshore accounts",
      "Was blackmailing three major collectors",
      "Knew several paintings in gallery were forgeries",
      "Had meeting scheduled with Detective Chen that night"
    ],
    personality: "N/A - Deceased"
  },

  claudia_beaumont: {
    alibi: "At wine tasting event until 8:30 PM, then drove to gallery, arrived at 9:20 PM to find body",
    motive: "Vincent was destroying her reputation by spreading rumors about her authentication mistakes. Her expertise was being questioned.",
    secrets: "Authenticated forgeries for bribes. Having affair with Lorenzo. Stole original paintings and replaced with forgeries.",
    relationship: "Chief Art Authenticator who built Vincent's empire on lies.",
    truthfulFacts: [
      "Authenticated twelve forgeries as genuine",
      "Received $2 million in bribes over five years",
      "Having affair with Lorenzo Romano",
      "Replaced three originals with forgeries herself",
      "Vincent was going to expose her to save himself"
    ],
    lies: [
      "Claims all authentications were legitimate",
      "Denies relationship with Lorenzo",
      "Says she discovered the body accidentally"
    ],
    personality: "Cultured and sophisticated. Becomes defensive about her expertise. Mentions technical details to deflect."
  },

  lorenzo_romano: {
    alibi: "In studio painting until 7 PM, then at apartment with model until 10 PM. Model confirms but is paid by him.",
    motive: "Vincent discovered he was the master forger. Was going to turn him in to authorities for immunity deal.",
    secrets: "Created over 30 forgeries now in major museums. Relationship with Claudia who authenticated them. Terminally ill.",
    relationship: "Brilliant artist whose originals never sold. Became greatest forger instead.",
    truthfulFacts: [
      "Painted 'The Azure Dream' and dozens of other forgeries",
      "Has stage 4 cancer, six months to live",
      "Vincent threatened to expose him",
      "Claudia authenticated all his forgeries",
      "Has nothing to lose anymore"
    ],
    lies: [
      "Claims model alibi is solid",
      "Denies being the forger initially",
      "Says Vincent was his friend"
    ],
    personality: "Bitter about lack of recognition. Proud of fooling art world. Fatalistic about future."
  },

  sebastian_cross: {
    alibi: "At rival gallery hosting event until 8 PM. Then at restaurant until 9:30 PM with clients. They confirm.",
    motive: "Vincent ruined his gallery by poaching clients and spreading lies. Revenge and elimination of competition.",
    secrets: "Hired private investigator to dig up dirt on Vincent. Knows about forgery ring. Planning to take over Vincent's gallery.",
    relationship: "Rival dealer who lost everything to Vincent's ruthless tactics.",
    truthfulFacts: [
      "Gallery went bankrupt last year",
      "Vincent stole his five biggest clients",
      "Hired PI who found evidence of forgeries",
      "Was planning to expose Vincent publicly",
      "Already negotiating to buy Vincent's gallery space"
    ],
    lies: [
      "Claims to have moved past rivalry",
      "Denies knowledge of forgeries",
      "Says restaurant alibi is airtight"
    ],
    personality: "Charming surface hiding deep resentment. Calculating. Smiles while discussing Vincent's death."
  },

  isabelle_laurent: {
    alibi: "Left gallery at 6 PM after argument with Vincent. At home painting. No witnesses.",
    motive: "Vincent used her then discarded her. Promised to marry her but reconciling with wife instead. Felt used and betrayed.",
    secrets: "Pregnant with Vincent's child. Has key to gallery. Knew combination to his safe. Took photos of forged paintings.",
    relationship: "Young artist and Vincent's secret lover for two years.",
    truthfulFacts: [
      "Three months pregnant",
      "Vincent ended affair that afternoon",
      "Has gallery keys and alarm codes",
      "Photographed evidence of forgeries",
      "Vincent's wife threatened her last week"
    ],
    lies: [
      "Claims to be over Vincent",
      "Denies being at gallery after 6 PM",
      "Won't admit to pregnancy initially"
    ],
    personality: "Emotional and artistic. Volatile when discussing Vincent. Protective of unborn child."
  },

  detective_chen: {
    alibi: "At precinct until 8:45 PM, then drove to gallery for 9 PM meeting with Vincent. Found door open and body.",
    motive: "Vincent was his informant but was playing both sides. Chen's career depended on art fraud case. Vincent was going to betray him.",
    secrets: "Taking bribes from art collectors to look other way. Vincent had evidence. Planted evidence in previous cases.",
    relationship: "Corrupt detective who thought he controlled Vincent.",
    truthfulFacts: [
      "Was meeting Vincent about forgery ring",
      "Received $500k in bribes over three years",
      "Vincent recorded their conversations",
      "Knew about multiple forgeries",
      "Career would end if exposed"
    ],
    lies: [
      "Claims to be honest cop",
      "Says meeting was routine",
      "Denies knowing about corruption"
    ],
    personality: "Authoritative and intimidating. Uses position to pressure others. Nervous when tables turned."
  },

  helena_westbrook: {
    alibi: "At charity auction until 7:30 PM, then home with husband. He confirms but they're getting divorced.",
    motive: "Bought $10 million in forgeries from Vincent. He refused to refund. Would be ruined if exposed. Husband would win divorce.",
    secrets: "Embezzled from charity to buy art. Having affair with her lawyer. Hired someone to threaten Vincent. Husband is lying about alibi.",
    relationship: "Wealthy collector and charity organizer. Vincent's best client until she discovered forgeries.",
    truthfulFacts: [
      "Owns twelve forgeries from Vincent",
      "Embezzled $3 million from charity",
      "Husband wasn't home - alibi is false",
      "Hired thugs to threaten Vincent last month",
      "Would lose everything in divorce if exposed"
    ],
    lies: [
      "Claims husband can verify alibi",
      "Denies knowing about forgeries",
      "Says charity funds are all accounted for"
    ],
    personality: "Sophisticated and charitable facade. Panics when reputation threatened. Mentions lawyers frequently."
  },

  mikhail_volkov: {
    alibi: "On yacht in harbor with crew until 10 PM. Crew confirms but all are on his payroll.",
    motive: "Russian oligarch who bought $20 million in forgeries. Vincent refused to return money. Would lose face and possibly life if exposed.",
    secrets: "Money is from illegal arms deals. Has killed before. Team of mercenaries on payroll. Planning to steal all paintings.",
    relationship: "Dangerous client who doesn't accept being cheated.",
    truthfulFacts: [
      "Bought twenty paintings, all forgeries",
      "Has history of violence",
      "Mercenaries arrived in city yesterday",
      "Threatened Vincent last week",
      "Can't afford to appear weak to rivals"
    ],
    lies: [
      "Claims to be legitimate businessman",
      "Says crew alibi is solid",
      "Denies any threats to Vincent"
    ],
    personality: "Menacing and direct. Doesn't hide capacity for violence. Amused by others' fear."
  }
};

export const solution = {
  murderer: "claudia_beaumont",
  method: "Poisoned Vincent with toxic paint thinner in his wine at 8:45 PM. Knew he always drank while closing gallery.",
  motive: "Vincent was going to expose her as corrupt authenticator to save himself from prosecution. Her entire career and reputation would be destroyed.",
  keyEvidence: [
    "Paint thinner traces on wine glass",
    "Her fingerprints on poison bottle",
    "Security footage shows her entering earlier than claimed",
    "Text from Vincent: 'We need to talk about your authentications'",
    "She had keys to enter through back door"
  ],
  confession: "When shown security footage and fingerprint evidence, admits she couldn't let him destroy her life's work. Claims it was self-defense of reputation.",
  redHerringsExplained: {
    "lorenzo_romano": "The forger but terminally ill, wanted recognition not murder",
    "isabelle_laurent": "Angry but wanted Vincent alive for child support",
    "detective_chen": "Corrupt but needed Vincent alive as informant",
    "mikhail_volkov": "Would have made it look like obvious hit, not subtle poisoning"
  }
};