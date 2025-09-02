// Detailed timeline and perspective for each character
// This ensures consistency in what each character knows and saw

const CHARACTER_TIMELINES = {
    // MASTER TIMELINE OF EVENTS
    masterTimeline: {
        "6:00 PM": "Guests begin arriving for dinner party",
        "6:30 PM": "Cocktails served in the parlor",
        "7:00 PM": "Dinner is served in the dining room",
        "8:30 PM": "Dinner concludes, guests move to various rooms",
        "8:45 PM": "Victor retires to his study for business calls",
        "9:00 PM": "Coffee and desserts served in the parlor",
        "9:30 PM": "Elena enters study for scheduled meeting with Victor",
        "9:45 PM": "Elena leaves study; Marcus goes to garden",
        "9:50 PM": "Marcus secretly enters study through library (HIDDEN)",
        "10:00 PM": "Victor begins feeling ill (HIDDEN)",
        "10:10 PM": "Victor dies (HIDDEN)",
        "10:15 PM": "Marcus returns from garden",
        "10:30 PM": "Robert discovers Victor's body",
        "10:35 PM": "Police are called"
    },

    // Each character's specific timeline and knowledge
    sophia: {
        timeline: {
            "6:00-6:30 PM": "Greeting guests with Victor in the foyer",
            "6:30-7:00 PM": "In parlor for cocktails, noticed Elena staying close to Victor",
            "7:00-8:30 PM": "At dinner, sat at opposite end of table from Victor",
            "8:30-9:00 PM": "In parlor with ladies (Margaret, Isabella)",
            "9:00-9:30 PM": "Having coffee in parlor, noticed Victor hadn't joined them",
            "9:30-10:30 PM": "Remained in dining room with James, Thomas, and Margaret",
            "10:30 PM": "Heard Robert's shout, rushed to study"
        },
        observations: {
            dinnerEnd: "Dinner ended around 8:30. Victor immediately excused himself for 'important calls'",
            victorMood: "Victor seemed tense during dinner, kept checking his phone",
            elenaPresence: "That girl Elena kept hovering near Victor all evening",
            marcusBehavior: "Marcus was fidgety during dinner, left the table twice",
            lastSawVictor: "Last saw Victor alive at 8:45 when he went to his study"
        },
        knowledgeGaps: [
            "Doesn't know about Elena's 9:30 meeting",
            "Didn't see Marcus in the garden",
            "Doesn't know when exactly Victor died"
        ]
    },

    marcus: {
        timeline: {
            "6:00-6:30 PM": "Arrived late, around 6:20 PM",
            "6:30-7:00 PM": "Quick drink in parlor, avoided father",
            "7:00-8:30 PM": "At dinner, argued with father about company position",
            "8:30-9:00 PM": "In billiards room alone, drinking heavily",
            "9:00-9:30 PM": "Wandered between rooms, restless",
            "9:30-9:45 PM": "Saw Elena enter study, waited in library",
            "9:45-10:15 PM": "Claims was in garden smoking (actually killed Victor at 9:50)",
            "10:15-10:30 PM": "Returned inside, went to parlor",
            "10:30 PM": "Heard commotion, ran to study with others"
        },
        observations: {
            dinnerEnd: "Dinner ended at 8:30, father left immediately as usual",
            argument: "Father humiliated me at dinner about my 'failures'",
            elenaSecret: "Saw Elena go into father's study at 9:30, she left at 9:45",
            alibiStory: "I was in the garden from 9:45 to 10:15, needed fresh air and a smoke"
        },
        knowledgeGaps: [
            "Claims not to know about poison",
            "Denies knowing about Elena's affair",
            "Says didn't see who else might have visited study"
        ]
    },

    elena: {
        timeline: {
            "6:00-6:30 PM": "Arrived early to help with preparations",
            "6:30-7:00 PM": "Served drinks, brief private word with Victor",
            "7:00-8:30 PM": "At dinner, sat near middle of table",
            "8:30-9:00 PM": "Helped clear dishes, prepared Victor's study for meeting",
            "9:00-9:30 PM": "In her office reviewing documents",
            "9:30-9:45 PM": "Meeting with Victor in study about 'quarterly reports'",
            "9:45-10:30 PM": "In her office, upset after conversation with Victor",
            "10:30 PM": "Heard shouting, ran to study"
        },
        observations: {
            dinnerEnd: "Dinner finished at 8:30, Victor had me prepare his study",
            victorState: "Victor seemed normal during our meeting, maybe a bit tired",
            meetingContent: "We discussed... business matters (hiding pregnancy discussion)",
            lastSawVictor: "Left him at 9:45, he was alive, sitting at his desk with his whiskey",
            studyDetails: "The window was closed when I left, door unlocked"
        },
        knowledgeGaps: [
            "Doesn't know who entered after her",
            "Didn't see Marcus in garden",
            "Doesn't know about the poison"
        ]
    },

    robert: {
        timeline: {
            "6:00-7:00 PM": "Supervising staff, greeting guests, managing coats",
            "7:00-8:30 PM": "Overseeing dinner service",
            "8:30-8:45 PM": "Prepared Victor's whiskey, brought to study",
            "8:45-9:00 PM": "Supervised dessert preparation",
            "9:00-9:30 PM": "Serving coffee and desserts in parlor",
            "9:30-10:00 PM": "In kitchen with staff, cleaning up",
            "10:00-10:30 PM": "Final rounds, checking windows and doors",
            "10:30 PM": "Went to study to check on Victor, found body"
        },
        observations: {
            dinnerEnd: "Dinner concluded at 8:30 sharp, as Mr. Westwood preferred",
            whiskey: "Prepared his usual Scotch at 8:30, delivered to study at 8:45",
            visitors: "Saw Miss Elena enter at 9:30, leave at 9:45",
            marcusMovement: "Noticed Master Marcus heading toward garden around 9:45",
            studyState: "Door was locked from inside when I arrived at 10:30"
        },
        knowledgeGaps: [
            "Didn't see who might have entered between 9:45 and 10:30",
            "Doesn't know about the poison source",
            "Unaware of family's private conversations"
        ]
    },

    james: {
        timeline: {
            "6:00-6:30 PM": "Arrived at 6:15 with Thomas Chen",
            "6:30-7:00 PM": "Cocktails in parlor, discussing business with Thomas",
            "7:00-8:30 PM": "At dinner, tense conversation with Victor about company",
            "8:30-9:30 PM": "In billiards room with Thomas",
            "9:30-10:30 PM": "Continued in billiards room with Thomas, drinking",
            "10:30 PM": "Heard commotion, went to study"
        },
        observations: {
            dinnerEnd: "Dinner ended at 8:30, Victor left abruptly after our... discussion",
            victorThreat: "Victor made some pointed comments about 'irregularities' at dinner",
            alibi: "Was with Thomas the entire evening after dinner, he can confirm",
            studyLocation: "Never went near the study after dinner"
        },
        knowledgeGaps: [
            "Doesn't know about Elena's meeting",
            "Didn't see Marcus's movements",
            "Claims ignorance about poison"
        ]
    },

    thomas: {
        timeline: {
            "6:00-6:30 PM": "Arrived at 6:15 with James Crawford",
            "6:30-7:00 PM": "Cocktails, networking with other guests",
            "7:00-8:30 PM": "At dinner, tried to discuss new investment with Victor",
            "8:30-9:30 PM": "In billiards room with James",
            "9:30-10:30 PM": "Still in billiards room with James",
            "10:30 PM": "Heard shouting, went to investigate"
        },
        observations: {
            dinnerEnd: "Dinner concluded around 8:30, Victor seemed eager to leave",
            victorMood: "Victor was cold to me at dinner, avoided business talk",
            alibi: "Was with James all evening after dinner, playing billiards",
            noAccess: "Never went to study, don't even know where it is exactly"
        },
        knowledgeGaps: [
            "Doesn't know about family dynamics",
            "Unaware of other's movements",
            "No knowledge of poison"
        ]
    },

    margaret: {
        timeline: {
            "6:00-6:30 PM": "Arrived at 6:00 sharp, first guest",
            "6:30-7:00 PM": "Cocktails, tried to corner Victor about loan",
            "7:00-8:30 PM": "At dinner, sat far from Victor",
            "8:30-9:00 PM": "In parlor with Sophia and Isabella",
            "9:00-9:45 PM": "Continued in parlor, then excused herself",
            "9:45-10:20 PM": "In kitchen 'helping' staff with dessert",
            "10:20-10:30 PM": "Returned to parlor",
            "10:30 PM": "Heard commotion"
        },
        observations: {
            dinnerEnd: "Dinner ended at 8:30, Victor practically ran to his study",
            loanRefusal: "Victor refused my loan request before dinner, very coldly",
            kitchenAlibi: "Was helping staff with dessert from 9:45 to 10:20",
            familyTensions: "Everyone was tense at dinner, Marcus and Victor argued"
        },
        knowledgeGaps: [
            "Doesn't know about study visitors",
            "Didn't see Marcus in garden",
            "Unaware of poison details"
        ]
    },

    isabella: {
        timeline: {
            "6:00-6:30 PM": "Helped mother greet guests",
            "6:30-7:00 PM": "Mostly stayed quiet in parlor",
            "7:00-8:30 PM": "At dinner, father criticized her art career",
            "8:30-9:00 PM": "Briefly in parlor, then excused herself",
            "9:00-10:30 PM": "In her room painting (actually texting girlfriend)",
            "10:30 PM": "Heard Robert's shout, came downstairs"
        },
        observations: {
            dinnerEnd: "Dinner was awful, ended at 8:30 thank god",
            fatherArgument: "Father said horrible things about my 'lifestyle choices' at dinner",
            roomAlibi: "Was in my room painting from 9:00 onward, needed to escape",
            noWitnesses: "Didn't see anyone, didn't leave my room until the shouting"
        },
        knowledgeGaps: [
            "Doesn't know about any study meetings",
            "Unaware of business dealings",
            "No knowledge of poison or how father died"
        ]
    },

    forensics: {
        establishedFacts: {
            timeOfDeath: "Between 10:00-10:30 PM based on body temperature and rigor mortis",
            causeOfDeath: "Cyanide poisoning, ingested via whiskey",
            poisonTiming: "Cyanide acts within 5-15 minutes of ingestion",
            lastDrink: "Glass was half-empty, suggesting death occurred mid-drink",
            noStruggle: "No defensive wounds or signs of struggle",
            doorLocked: "Study door locked from inside, but library entrance unlocked",
            windowOpen: "Window slightly ajar, but no signs of entry/exit"
        }
    },

    prosecutor: {
        requirements: {
            timeline: "Need to establish suspect had opportunity between 9:45-10:15",
            access: "Must prove access to both study and poison",
            motive: "Clear motive for murder must be established",
            evidence: "Physical or circumstantial evidence linking to crime"
        }
    }
};

// Function to get a character's timeline
function getCharacterTimeline(characterId) {
    return CHARACTER_TIMELINES[characterId] || null;
}

// Function to check what a character knows about a specific time
function whatCharacterKnowsAboutTime(characterId, time) {
    const timeline = CHARACTER_TIMELINES[characterId];
    if (!timeline) return null;
    
    // Check if they have direct knowledge of that time
    for (const [timeRange, activity] of Object.entries(timeline.timeline)) {
        if (timeRange.includes(time)) {
            return activity;
        }
    }
    
    return "No specific knowledge of this time";
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CHARACTER_TIMELINES,
        getCharacterTimeline,
        whatCharacterKnowsAboutTime
    };
}