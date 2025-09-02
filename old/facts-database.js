// Shared Facts Database
// Each fact has an ID, description, category, and list of who knows it
// Characters can only reference facts they know

const FACTS_DATABASE = {
    // Universal facts (everyone knows)
    universal: [
        {
            id: "victim_identity",
            fact: "Victor Westwood is the victim",
            knownBy: ["all"]
        },
        {
            id: "death_discovery",
            fact: "Victor was found dead at 10:30 PM by Robert the butler",
            knownBy: ["all"]
        },
        {
            id: "death_location",
            fact: "Victor died in his study",
            knownBy: ["all"]
        },
        {
            id: "dinner_party",
            fact: "A dinner party was being held at the manor tonight",
            knownBy: ["all"]
        },
        {
            id: "manor_location",
            fact: "The incident occurred at Westwood Manor, a countryside estate",
            knownBy: ["all"]
        },
        {
            id: "study_locked",
            fact: "The study door was locked from the inside when the body was found",
            knownBy: ["all"]
        }
    ],

    // Character identities and relationships
    relationships: [
        {
            id: "marcus_identity",
            fact: "Marcus Westwood is Victor's son from his first marriage, age 26",
            knownBy: ["all"]
        },
        {
            id: "sophia_identity",
            fact: "Sophia Westwood is Victor's current wife of 20 years, age 45",
            knownBy: ["all"]
        },
        {
            id: "isabella_identity",
            fact: "Isabella Westwood is Victor and Sophia's daughter, age 23",
            knownBy: ["all"]
        },
        {
            id: "robert_identity",
            fact: "Robert Hutchinson is the head butler, has worked at the manor for 25 years",
            knownBy: ["all"]
        },
        {
            id: "elena_identity",
            fact: "Elena Rodriguez is Victor's personal assistant for 3 years",
            knownBy: ["all"]
        },
        {
            id: "james_identity",
            fact: "James Crawford is Victor's business partner and co-founder of Westwood Technologies",
            knownBy: ["all"]
        },
        {
            id: "thomas_identity",
            fact: "Thomas Chen is a major investor in Westwood Technologies",
            knownBy: ["all"]
        },
        {
            id: "margaret_identity",
            fact: "Margaret Shaw is Victor's younger sister, runs an art gallery",
            knownBy: ["all"]
        }
    ],

    // Secret affairs and relationships
    secrets: [
        {
            id: "elena_affair",
            fact: "Elena and Victor have been having an affair for 18 months",
            knownBy: ["elena", "victor", "robert", "sophia"]
        },
        {
            id: "elena_pregnancy",
            fact: "Elena is 8 weeks pregnant with Victor's child",
            knownBy: ["elena", "victor"]
        },
        {
            id: "victor_divorce_stall",
            fact: "Victor promised Elena he would divorce Sophia but was stalling",
            knownBy: ["elena", "victor"]
        },
        {
            id: "sophia_divorce_lawyer",
            fact: "Sophia has been secretly seeing a divorce lawyer",
            knownBy: ["sophia"]
        },
        {
            id: "isabella_relationship",
            fact: "Isabella is in a relationship with a woman that Victor disapproved of",
            knownBy: ["isabella", "victor", "sophia"]
        },
        {
            id: "isabella_engagement",
            fact: "Isabella is secretly engaged to her girlfriend",
            knownBy: ["isabella"]
        }
    ],

    // Financial and business facts
    financial: [
        {
            id: "marcus_gambling",
            fact: "Marcus has $200,000 in gambling debts to dangerous people",
            knownBy: ["marcus", "victor"]
        },
        {
            id: "marcus_cutoff_threat",
            fact: "Victor threatened to cut Marcus out of the will",
            knownBy: ["marcus", "victor"]
        },
        {
            id: "james_embezzlement",
            fact: "James has been embezzling funds from the company for 2 years",
            knownBy: ["james", "victor"]
        },
        {
            id: "james_forced_out",
            fact: "Victor discovered the embezzlement and was planning to force James out",
            knownBy: ["james", "victor"]
        },
        {
            id: "thomas_fraud",
            fact: "Thomas Chen is running fraudulent investment schemes",
            knownBy: ["thomas", "victor"]
        },
        {
            id: "victor_expose_thomas",
            fact: "Victor had evidence of Thomas's fraud and was planning to go to authorities",
            knownBy: ["thomas", "victor"]
        },
        {
            id: "margaret_bankruptcy",
            fact: "Margaret's art gallery is failing and she's facing bankruptcy",
            knownBy: ["margaret", "victor", "sophia"]
        },
        {
            id: "margaret_loan_refused",
            fact: "Victor refused to loan Margaret money that afternoon",
            knownBy: ["margaret", "victor"]
        },
        {
            id: "margaret_stealing_art",
            fact: "Margaret has been stealing and selling family heirlooms",
            knownBy: ["margaret", "victor"]
        },
        {
            id: "staff_firing_plan",
            fact: "Victor was planning to fire all staff and sell the manor",
            knownBy: ["victor", "robert", "sophia"]
        },
        {
            id: "robert_no_pension",
            fact: "Robert would receive no pension despite 25 years of service",
            knownBy: ["robert", "victor"]
        },
        {
            id: "robert_tabloid_leaks",
            fact: "Robert has been selling family information to tabloids",
            knownBy: ["robert"]
        }
    ],

    // Events and timeline
    timeline: [
        {
            id: "dinner_argument",
            fact: "Victor and Isabella argued at dinner about her future",
            knownBy: ["isabella", "victor", "sophia", "marcus", "robert", "james", "thomas", "margaret"]
        },
        {
            id: "sophia_money_argument",
            fact: "Sophia and Victor argued earlier that day about money",
            knownBy: ["sophia", "victor", "robert"]
        },
        {
            id: "elena_meeting_930",
            fact: "Elena was in Victor's study at 9:30 PM for a meeting",
            knownBy: ["elena", "victor"]
        },
        {
            id: "elena_left_945",
            fact: "Elena left the study at 9:45 PM, Victor was alive",
            knownBy: ["elena"]
        },
        {
            id: "marcus_garden_945",
            fact: "Marcus went to the garden to smoke at 9:45 PM",
            knownBy: ["marcus"]
        },
        {
            id: "marcus_garden_return",
            fact: "Marcus returned from the garden at 10:15 PM",
            knownBy: ["marcus"]
        },
        {
            id: "sophia_dining_room",
            fact: "Sophia was in the dining room with guests from 9:30 PM onwards",
            knownBy: ["sophia", "james", "thomas", "margaret"]
        },
        {
            id: "james_thomas_billiards",
            fact: "James and Thomas were playing billiards from 9:30-10:30 PM",
            knownBy: ["james", "thomas"]
        },
        {
            id: "margaret_kitchen",
            fact: "Margaret was in the kitchen helping with dessert from 9:45-10:20 PM",
            knownBy: ["margaret", "robert"]
        },
        {
            id: "isabella_room",
            fact: "Isabella claims she was in her room painting from 9:00 PM onwards",
            knownBy: ["isabella"]
        },
        {
            id: "robert_found_body",
            fact: "Robert went to check on Victor at 10:30 PM and found the body",
            knownBy: ["robert"]
        }
    ],

    // Physical evidence and observations
    evidence: [
        {
            id: "poisoned_whiskey",
            fact: "Victor's whiskey glass contained cyanide",
            knownBy: ["forensics"]
        },
        {
            id: "window_ajar",
            fact: "The study window was slightly open despite cold weather",
            knownBy: ["robert", "forensics"]
        },
        {
            id: "no_struggle",
            fact: "There were no signs of struggle in the study",
            knownBy: ["robert", "forensics"]
        },
        {
            id: "marcus_chemistry",
            fact: "Marcus studied chemistry in college before dropping out",
            knownBy: ["marcus", "sophia", "victor"]
        },
        {
            id: "robert_prepared_whiskey",
            fact: "Robert prepared Victor's whiskey earlier in the evening",
            knownBy: ["robert"]
        },
        {
            id: "study_two_entrances",
            fact: "The study has two entrances - main door and through the library",
            knownBy: ["all"]
        },
        {
            id: "security_no_breach",
            fact: "Security system shows no unauthorized entries to the manor",
            knownBy: ["robert", "forensics"]
        }
    ],

    // The actual murder facts (only Marcus fully knows)
    murder: [
        {
            id: "marcus_poisoned_whiskey",
            fact: "Marcus poisoned the whiskey with cyanide at 9:50 PM",
            knownBy: ["marcus"]
        },
        {
            id: "marcus_desperate_motive",
            fact: "Marcus killed Victor because he desperately needed inheritance money for gambling debts",
            knownBy: ["marcus"]
        },
        {
            id: "cyanide_from_greenhouse",
            fact: "The cyanide was obtained from chemicals stored in the greenhouse",
            knownBy: ["marcus"]
        }
    ]
};

// Function to get all facts a character knows
function getCharacterKnowledge(characterId) {
    const knowledge = [];
    
    for (const category of Object.values(FACTS_DATABASE)) {
        for (const fact of category) {
            if (fact.knownBy.includes("all") || fact.knownBy.includes(characterId)) {
                knowledge.push(fact);
            }
        }
    }
    
    return knowledge;
}

// Function to check if a character knows a specific fact
function characterKnowsFact(characterId, factId) {
    for (const category of Object.values(FACTS_DATABASE)) {
        const fact = category.find(f => f.id === factId);
        if (fact) {
            return fact.knownBy.includes("all") || fact.knownBy.includes(characterId);
        }
    }
    return false;
}

// Function to get facts by category that a character knows
function getCharacterFactsByCategory(characterId, categoryName) {
    const category = FACTS_DATABASE[categoryName];
    if (!category) return [];
    
    return category.filter(fact => 
        fact.knownBy.includes("all") || fact.knownBy.includes(characterId)
    );
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FACTS_DATABASE,
        getCharacterKnowledge,
        characterKnowsFact,
        getCharacterFactsByCategory
    };
}