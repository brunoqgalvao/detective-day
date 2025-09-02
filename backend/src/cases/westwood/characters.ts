export const characterPrivateData: Record<string, any> = {
  sophia: {
    alibi: "Was in the dining room with guests from 9:30 PM onwards. Multiple witnesses confirm.",
    motive: "Recently discovered Victor's affair. Also stands to inherit majority of estate. Prenup was being contested.",
    secrets: "Has been seeing a divorce lawyer in secret. Has access to sleeping pills that could be crushed and mixed.",
    relationship: "Marriage has been strained for years. Recent discovery of affair was the final straw. Marcus is her STEPSON from Victor's first marriage.",
    truthfulFacts: [
      "Was planning to divorce Victor",
      "Knew about the affair with Elena",
      "Has been taking antidepressants",
      "Argued with Victor earlier that day about money",
      "Marcus is her stepson (Victor's son from first marriage)",
      "Robert Hutchinson is the butler who has served the family for 25 years"
    ],
    lies: [
      "Claims the marriage was happy",
      "Denies knowing about any affairs initially"
    ],
    personality: "Composed but bitter. Will maintain innocence and redirect suspicion to Elena or Marcus (her STEPSON, not the butler - Robert is the butler)."
  },
  
  marcus: {
    alibi: "Was in the garden smoking from 9:45-10:15 PM. No witnesses for full duration.",
    motive: "Father refused to promote him and threatened to cut him out of the will due to gambling debts.",
    secrets: "Owes $200,000 to dangerous people. Desperately needs inheritance. Has chemistry background from college.",
    relationship: "Resentful of father's lack of trust. Feels overlooked and undervalued.",
    truthfulFacts: [
      "Has massive gambling debts",
      "Studied chemistry in college before dropping out",
      "Was in the garden during time of murder",
      "Overheard arguing with Victor last week about money"
    ],
    lies: [
      "Claims to have quit gambling",
      "Says he was with the gardener in the garden (gardener left at 6 PM)"
    ],
    personality: "Nervous and defensive. Will try to seem cooperative but slips up under pressure."
  },

  elena: {
    alibi: "Was in Victor's study at 9:30 PM for a meeting, left at 9:45 PM. Victor was alive then.",
    motive: "Having an affair with Victor who promised to divorce his wife but was stalling. Recently found out she's pregnant.",
    secrets: "Pregnant with Victor's child. He wanted her to terminate. She has access to all areas of the house.",
    relationship: "Secret romantic relationship for 18 months. Growing frustrated with his promises.",
    truthfulFacts: [
      "Having affair with Victor",
      "Is 8 weeks pregnant",
      "Was last known person to see Victor alive",
      "Knows the security codes to all rooms"
    ],
    lies: [
      "Initially denies the affair",
      "Claims Victor was going to leave his wife soon"
    ],
    personality: "Emotional when pressed about relationship. Protective of her unborn child."
  },

  james: {
    alibi: "In the billiards room with Thomas Chen from 9:30-10:30 PM.",
    motive: "Victor was planning to force him out of the company due to discovered embezzlement.",
    secrets: "Has been embezzling funds for 2 years. Victor found out last week. Buyout would ruin him.",
    relationship: "Once best friends, now bitter rivals. Feels betrayed by Victor's power grab.",
    truthfulFacts: [
      "Has been embezzling money",
      "Victor discovered it recently",
      "Was going to be forced out of the company",
      "Has access to Victor's office at work where chemicals are stored"
    ],
    lies: [
      "Claims finances are all in order",
      "Says relationship with Victor was great"
    ],
    personality: "Smooth talker, professional. Tries to maintain composure but shows cracks when confronted with evidence."
  },

  thomas: {
    alibi: "With James Crawford in billiards room. Confirmed.",
    motive: "Victor was about to expose fraudulent practices in Chen's other companies.",
    secrets: "Running a Ponzi scheme. Victor had evidence and was planning to go to authorities.",
    relationship: "Business relationship turned sour when Victor discovered the fraud.",
    truthfulFacts: [
      "Running fraudulent investment schemes",
      "Victor had evidence against him",
      "Was trying to convince Victor to stay quiet",
      "Has connections to people who could supply poison"
    ],
    lies: [
      "Claims all investments are legitimate",
      "Says he and Victor were planning a big deal"
    ],
    personality: "Calm and calculating. Deflects with technical business talk."
  },

  margaret: {
    alibi: "In the kitchen helping staff prepare dessert from 9:45-10:20 PM. Staff confirms.",
    motive: "Victor refused to loan her money to save her gallery. She's facing bankruptcy.",
    secrets: "Has been stealing from the family estate's art collection to sell. Victor recently noticed.",
    relationship: "Siblings with a complicated history. She resents his success while she struggles.",
    truthfulFacts: [
      "Gallery is failing financially",
      "Has been selling family heirlooms",
      "Asked Victor for a loan that afternoon",
      "Has a key to the manor"
    ],
    lies: [
      "Claims gallery is doing fine",
      "Denies taking anything from the estate"
    ],
    personality: "Prideful and defensive about her failures. Quick to blame others for her problems."
  },

  robert: {
    alibi: "Was overseeing service in dining room, then went to study at 10:30 PM to check on Victor.",
    motive: "Victor was planning to fire him and entire staff to sell the manor. No pension after 25 years.",
    secrets: "Has been providing information about the family to a tabloid journalist for money.",
    relationship: "Professional but has grown to resent the family's treatment of staff.",
    truthfulFacts: [
      "Knew about the affair between Victor and Elena",
      "Was going to be fired without pension",
      "Has master keys to all rooms",
      "Prepared Victor's whiskey earlier"
    ],
    lies: [
      "Claims complete loyalty to the family",
      "Denies knowing about any family secrets"
    ],
    personality: "Professional and proper, but hints of resentment show through."
  },

  isabella: {
    alibi: "Was in her room from 9:00 PM onwards, painting. No witnesses.",
    motive: "Victor disapproved of her relationship with a woman and threatened to disown her.",
    secrets: "Has been secretly engaged to her girlfriend. Was planning to elope against father's wishes.",
    relationship: "Strained due to Victor's disapproval of her lifestyle and career choices.",
    truthfulFacts: [
      "Is in a relationship her father disapproved of",
      "Was threatened with being disowned",
      "Has access to art supplies including toxic chemicals",
      "Fought with Victor at dinner about her future"
    ],
    lies: [
      "Claims father was coming around to accepting her",
      "Denies being in her room the whole time"
    ],
    personality: "Artistic and rebellious. Defensive about her choices but genuinely grieving."
  }
};

export const solution = {
  murderer: "marcus",
  method: "Poisoned the whiskey with cyanide while Victor was in the bathroom during their meeting at 9:50 PM",
  motive: "Desperate for inheritance money to pay off dangerous gambling debts. Father was going to cut him off.",
  keyEvidence: [
    "Chemistry knowledge from college",
    "No solid alibi for time of murder",
    "Chemistry book with his notes about cyanide",
    "Access to greenhouse where poison was stored",
    "Gambling debts of $200,000"
  ],
  confession: "If pressured with evidence about chemistry knowledge, gambling debts, and the book, Marcus will break down and confess."
};