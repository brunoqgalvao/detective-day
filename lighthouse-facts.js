// Lighthouse Mystery Facts Database
// Centralized truth system ensuring consistency

const LIGHTHOUSE_FACTS = {
    // Universal facts - everyone knows these
    universal: [
        {
            id: "victim_identity",
            fact: "Captain Samuel Torres is the victim, lighthouse keeper",
            knownBy: ["all"]
        },
        {
            id: "death_discovery",
            fact: "Body found at 5:30 AM by Jonas at base of lighthouse",
            knownBy: ["all"]
        },
        {
            id: "death_location",
            fact: "Samuel fell from the lighthouse gallery",
            knownBy: ["all"]
        },
        {
            id: "anniversary_event",
            fact: "150th lighthouse anniversary celebration was held last night",
            knownBy: ["all"]
        },
        {
            id: "weather_conditions",
            fact: "Heavy fog and light rain last night, moderate winds",
            knownBy: ["all"]
        },
        {
            id: "lighthouse_dark",
            fact: "The lighthouse lamp was found extinguished this morning",
            knownBy: ["all"]
        },
        {
            id: "gallery_door_locked",
            fact: "Gallery door was locked from inside when body found",
            knownBy: ["all"]
        },
        {
            id: "everyone_stayed",
            fact: "All guests stayed overnight due to weather",
            knownBy: ["all"]
        }
    ],

    // Character relationships and identities
    relationships: [
        {
            id: "marina_daughter",
            fact: "Marina Torres is Samuel's estranged daughter, marine biologist",
            knownBy: ["all"]
        },
        {
            id: "derek_assistant",
            fact: "Derek Chen is the assistant lighthouse keeper, hired 6 months ago",
            knownBy: ["all"]
        },
        {
            id: "ruth_historian",
            fact: "Dr. Ruth Morrison is a historian writing about the lighthouse",
            knownBy: ["all"]
        },
        {
            id: "jonas_captain",
            fact: "Jonas Blackwood runs the weekly supply boat",
            knownBy: ["all"]
        },
        {
            id: "elena_inspector",
            fact: "Elena Vasquez is the Coast Guard inspector",
            knownBy: ["all"]
        },
        {
            id: "patrick_priest",
            fact: "Father Patrick O'Brien is the local priest and Samuel's old friend",
            knownBy: ["all"]
        },
        {
            id: "alex_photographer",
            fact: "Alex Shaw is a photographer documenting the anniversary",
            knownBy: ["all"]
        },
        {
            id: "victor_predecessor",
            fact: "Victor Hendricks was the previous lighthouse keeper for 35 years",
            knownBy: ["all"]
        }
    ],

    // Secret activities and crimes
    secrets: [
        {
            id: "marina_trafficking",
            fact: "Marina is running illegal exotic fish trafficking through her research",
            knownBy: ["marina", "samuel"]
        },
        {
            id: "derek_smuggling",
            fact: "Derek has been signaling drug smugglers with the lighthouse",
            knownBy: ["derek", "samuel"]
        },
        {
            id: "derek_gambling",
            fact: "Derek has massive gambling debts to dangerous people",
            knownBy: ["derek"]
        },
        {
            id: "ruth_stealing",
            fact: "Ruth stole historical documents without permission",
            knownBy: ["ruth", "samuel"]
        },
        {
            id: "ruth_pirate_ancestor",
            fact: "Ruth's ancestor was a pirate, not the town hero",
            knownBy: ["ruth", "samuel", "victor"]
        },
        {
            id: "jonas_skimming",
            fact: "Jonas has been stealing and reselling lighthouse supplies",
            knownBy: ["jonas", "samuel"]
        },
        {
            id: "elena_bribes",
            fact: "Elena takes bribes to falsify inspection reports",
            knownBy: ["elena", "samuel"]
        },
        {
            id: "patrick_embezzlement",
            fact: "Patrick embezzled church restoration funds for gambling",
            knownBy: ["patrick", "samuel"]
        },
        {
            id: "victor_treasure",
            fact: "Victor found Spanish gold 20 years ago and hid it in lighthouse walls",
            knownBy: ["victor", "samuel"]
        },
        {
            id: "alex_saw_derek",
            fact: "Alex photographed Derek signaling to boats",
            knownBy: ["alex"]
        },
        {
            id: "alex_saw_marina",
            fact: "Alex photographed Marina in the basement at 10:15 PM",
            knownBy: ["alex"]
        }
    ],

    // Timeline of events
    timeline: [
        {
            id: "dinner_time",
            fact: "Anniversary dinner was from 7 PM to 9 PM",
            knownBy: ["all"]
        },
        {
            id: "dinner_argument",
            fact: "Marina and Samuel argued about money at dinner",
            knownBy: ["marina", "samuel", "ruth", "patrick", "elena"]
        },
        {
            id: "blessing_ceremony",
            fact: "Father Patrick performed blessing at 8:30 PM",
            knownBy: ["all"]
        },
        {
            id: "guests_retire",
            fact: "Most guests retired to rooms by 10 PM",
            knownBy: ["all"]
        },
        {
            id: "marina_room_1030",
            fact: "Marina went to guest quarters at 10:30 PM",
            knownBy: ["marina"]
        },
        {
            id: "alex_gallery_10",
            fact: "Alex went to gallery for photos at 10 PM",
            knownBy: ["alex"]
        },
        {
            id: "marina_basement_1015",
            fact: "Marina was in basement at 10:15 PM",
            knownBy: ["marina", "alex"]
        },
        {
            id: "samuel_log_1045",
            fact: "Samuel made log entry at 10:45 PM about unusual signals",
            knownBy: ["samuel"]
        },
        {
            id: "derek_generator_1130",
            fact: "Derek went to check generator at 11:30 PM",
            knownBy: ["derek"]
        },
        {
            id: "alex_leaves_gallery_1130",
            fact: "Alex left gallery at 11:30 PM",
            knownBy: ["alex"]
        },
        {
            id: "foghorn_stops_1140",
            fact: "Foghorn stopped working at 11:40 PM",
            knownBy: ["patrick", "alex"]
        },
        {
            id: "lighthouse_dark_1145",
            fact: "Lighthouse lamp went dark at 11:45 PM",
            knownBy: ["alex"]
        },
        {
            id: "murder_time",
            fact: "Samuel was killed around 11:45 PM",
            knownBy: ["derek"]
        },
        {
            id: "marina_heard_crash",
            fact: "Marina heard a crash around midnight",
            knownBy: ["marina"]
        },
        {
            id: "derek_generator_return_1230",
            fact: "Derek returned from generator at 12:30 AM",
            knownBy: ["derek"]
        },
        {
            id: "ruth_library_until_1",
            fact: "Ruth was reading in library until 1 AM",
            knownBy: ["ruth"]
        },
        {
            id: "jonas_finds_body_530",
            fact: "Jonas discovered body at 5:30 AM",
            knownBy: ["jonas", "all"]
        }
    ],

    // Physical locations and access
    locations: [
        {
            id: "gallery_access",
            fact: "Gallery accessible via main stairs or service ladder",
            knownBy: ["all"]
        },
        {
            id: "basement_storage",
            fact: "Basement has old storage rooms, rarely used",
            knownBy: ["marina", "derek", "samuel", "victor", "ruth"]
        },
        {
            id: "smuggling_tunnels",
            fact: "Old smuggling tunnels exist below lighthouse",
            knownBy: ["ruth", "victor", "samuel"]
        },
        {
            id: "generator_location",
            fact: "Generator is in separate building, 5 minute walk",
            knownBy: ["derek", "samuel", "victor"]
        },
        {
            id: "library_location",
            fact: "Library is on second floor with historical documents",
            knownBy: ["all"]
        },
        {
            id: "chapel_location",
            fact: "Small chapel on ground floor for maritime blessings",
            knownBy: ["all"]
        },
        {
            id: "dangerous_rocks",
            fact: "Sharp rocks below lighthouse, fatal fall from gallery",
            knownBy: ["all"]
        },
        {
            id: "boat_harbor",
            fact: "Small harbor 200 yards from lighthouse",
            knownBy: ["all"]
        }
    ],

    // Technical and operational facts
    technical: [
        {
            id: "lighthouse_operation",
            fact: "Lighthouse must stay lit for maritime safety",
            knownBy: ["derek", "samuel", "victor", "elena"]
        },
        {
            id: "foghorn_system",
            fact: "Foghorn operates automatically in fog unless disabled",
            knownBy: ["derek", "samuel", "victor"]
        },
        {
            id: "generator_log",
            fact: "Generator has electronic access log with timestamps",
            knownBy: ["derek", "samuel", "elena"]
        },
        {
            id: "signal_lamp_exists",
            fact: "Old signal lamp equipment still in gallery",
            knownBy: ["derek", "samuel", "victor"]
        },
        {
            id: "security_cameras",
            fact: "Night vision cameras in library and main entrance",
            knownBy: ["samuel", "elena", "derek"]
        },
        {
            id: "supply_schedule",
            fact: "Supply boat comes every Tuesday morning",
            knownBy: ["all"]
        },
        {
            id: "inspection_authority",
            fact: "Coast Guard can shut down lighthouse for violations",
            knownBy: ["elena", "samuel", "derek"]
        }
    ],

    // Evidence and observations
    observations: [
        {
            id: "samuel_agitated",
            fact: "Samuel seemed troubled during the celebration",
            knownBy: ["marina", "patrick", "ruth", "elena"]
        },
        {
            id: "unusual_boats",
            fact: "Unusual boat lights seen offshore around 11 PM",
            knownBy: ["alex", "derek"]
        },
        {
            id: "broken_whiskey",
            fact: "Broken whiskey bottle found near body",
            knownBy: ["jonas", "all"]
        },
        {
            id: "head_wound_exists",
            fact: "Samuel had head injury before falling",
            knownBy: ["forensics", "derek"]
        },
        {
            id: "brass_weight_missing",
            fact: "Brass compass weight missing from gallery",
            knownBy: ["victor", "derek"]
        },
        {
            id: "derek_nervous",
            fact: "Derek has been very nervous since body found",
            knownBy: ["marina", "ruth", "elena", "alex"]
        },
        {
            id: "inspection_violations",
            fact: "Elena found safety violations yesterday",
            knownBy: ["elena", "samuel", "derek"]
        },
        {
            id: "marina_first_visit",
            fact: "Marina hadn't visited in 3 years until yesterday",
            knownBy: ["marina", "samuel", "patrick", "ruth"]
        }
    ],

    // The murder facts (only Derek fully knows)
    murder: [
        {
            id: "derek_confrontation",
            fact: "Samuel confronted Derek about smuggling at 11:45 PM",
            knownBy: ["derek"]
        },
        {
            id: "derek_struck_samuel",
            fact: "Derek hit Samuel with brass compass weight",
            knownBy: ["derek"]
        },
        {
            id: "derek_pushed_body",
            fact: "Derek pushed Samuel's body off gallery after striking him",
            knownBy: ["derek"]
        },
        {
            id: "derek_deleted_log",
            fact: "Derek deleted his 11:55 PM generator log entry",
            knownBy: ["derek"]
        },
        {
            id: "derek_disabled_foghorn",
            fact: "Derek disabled foghorn to cover the murder",
            knownBy: ["derek"]
        },
        {
            id: "derek_hid_weight",
            fact: "Derek hid the bloody brass weight in his room",
            knownBy: ["derek"]
        }
    ]
};

// Helper functions for fact management
function getLighthouseCharacterKnowledge(characterId) {
    const knowledge = [];
    
    for (const category of Object.values(LIGHTHOUSE_FACTS)) {
        for (const fact of category) {
            if (fact.knownBy.includes("all") || fact.knownBy.includes(characterId)) {
                knowledge.push(fact);
            }
        }
    }
    
    return knowledge;
}

function lighthouseCharacterKnowsFact(characterId, factId) {
    for (const category of Object.values(LIGHTHOUSE_FACTS)) {
        const fact = category.find(f => f.id === factId);
        if (fact) {
            return fact.knownBy.includes("all") || fact.knownBy.includes(characterId);
        }
    }
    return false;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LIGHTHOUSE_FACTS,
        getLighthouseCharacterKnowledge,
        lighthouseCharacterKnowsFact
    };
}