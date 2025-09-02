// Discovery milestones - ALL characters treated equally important
// This maintains mystery by not favoring the actual killer's clues

const DISCOVERY_MILESTONES = {
    // === ALIBIS & WHEREABOUTS ===
    sophia_alibi: {
        id: "sophia_alibi",
        title: "Sophia's Alibi Confirmed",
        description: "Sophia was in the dining room with guests from 9:30 PM onwards with multiple witnesses.",
        category: "alibi",
        character: "sophia",
        keywords: ["dining room", "guests", "witnesses", "9:30"],
        importance: "high"
    },
    
    marcus_whereabouts: {
        id: "marcus_whereabouts", 
        title: "Marcus's Garden Activity",
        description: "Marcus was in the garden smoking from 9:45-10:15 PM, overlapping with the murder timeframe.",
        category: "alibi",
        character: "marcus",
        keywords: ["garden", "smoking", "9:45", "10:15", "no witnesses"],
        importance: "high"
    },

    elena_meeting: {
        id: "elena_meeting",
        title: "Elena's Final Meeting",
        description: "Elena met with Victor in his study at 9:30 PM, leaving at 9:45 PM - she was the last known person to see him alive.",
        category: "alibi", 
        character: "elena",
        keywords: ["study", "9:30", "9:45", "last to see", "meeting"],
        importance: "critical"
    },

    james_billiards: {
        id: "james_billiards",
        title: "James & Thomas Together",
        description: "James was in the billiards room with Thomas Chen from 9:30-10:30 PM, confirmed by both parties.",
        category: "alibi",
        character: "james",
        keywords: ["billiards room", "Thomas", "9:30", "10:30", "confirmed"],
        importance: "high"
    },

    isabella_isolation: {
        id: "isabella_isolation",
        title: "Isabella's Solitary Evening",
        description: "Isabella was alone in her room painting from 9:00 PM onwards with no witnesses to verify her whereabouts.",
        category: "alibi",
        character: "isabella", 
        keywords: ["room", "painting", "9:00", "alone", "no witnesses"],
        importance: "high"
    },

    margaret_kitchen: {
        id: "margaret_kitchen",
        title: "Margaret Helping Kitchen Staff",
        description: "Margaret was in the kitchen helping staff prepare dessert from 9:45-10:20 PM, verified by kitchen staff.",
        category: "alibi",
        character: "margaret",
        keywords: ["kitchen", "staff", "dessert", "9:45", "10:20"],
        importance: "medium"
    },

    robert_discovery: {
        id: "robert_discovery", 
        title: "Robert Discovers the Body",
        description: "Robert went to check on Victor at 10:30 PM and discovered his body slumped over the desk.",
        category: "alibi",
        character: "robert",
        keywords: ["10:30", "check on", "discovered", "body", "desk"],
        importance: "critical"
    },

    // === MOTIVES & CONFLICTS ===
    sophia_affair: {
        id: "sophia_affair",
        title: "Sophia Knew About Affair",
        description: "Sophia recently discovered Victor's affair with Elena, causing major marital strain.",
        category: "motive",
        character: "sophia", 
        keywords: ["affair", "Elena", "discovered", "marital", "strain"],
        importance: "high"
    },

    sophia_divorce: {
        id: "sophia_divorce",
        title: "Secret Divorce Plans",
        description: "Sophia had been secretly meeting with divorce lawyers and planning to leave Victor.",
        category: "motive",
        character: "sophia",
        keywords: ["divorce", "lawyers", "secretly", "leaving"],
        importance: "high"
    },

    marcus_debts: {
        id: "marcus_debts",
        title: "Marcus's Gambling Problem", 
        description: "Marcus owes $200,000 to dangerous people due to extensive gambling debts.",
        category: "motive",
        character: "marcus",
        keywords: ["gambling", "debts", "$200,000", "dangerous", "owes"],
        importance: "high"
    },

    marcus_inheritance: {
        id: "marcus_inheritance",
        title: "Inheritance Threat",
        description: "Victor threatened to cut Marcus out of the will due to his gambling problems.",
        category: "motive", 
        character: "marcus",
        keywords: ["cut out", "will", "inheritance", "threatened"],
        importance: "high"
    },

    elena_pregnancy: {
        id: "elena_pregnancy",
        title: "Elena's Pregnancy Secret",
        description: "Elena is 8 weeks pregnant with Victor's child, creating a complicated situation.",
        category: "motive",
        character: "elena",
        keywords: ["pregnant", "8 weeks", "Victor's child", "complicated"],
        importance: "high"
    },

    elena_promises: {
        id: "elena_promises",
        title: "Broken Marriage Promises",
        description: "Victor had promised to divorce Sophia for Elena but kept stalling and wanted her to terminate the pregnancy.",
        category: "motive",
        character: "elena", 
        keywords: ["promised", "divorce", "stalling", "terminate"],
        importance: "high"
    },

    james_embezzlement: {
        id: "james_embezzlement",
        title: "James's Financial Crime",
        description: "James has been embezzling company funds for 2 years, recently discovered by Victor.",
        category: "motive",
        character: "james",
        keywords: ["embezzling", "funds", "2 years", "discovered"],
        importance: "high"
    },

    thomas_fraud: {
        id: "thomas_fraud",
        title: "Thomas's Ponzi Scheme",
        description: "Thomas runs fraudulent investment schemes and Victor had evidence against him.",
        category: "motive", 
        character: "thomas",
        keywords: ["fraudulent", "investments", "Ponzi", "evidence against"],
        importance: "high"
    },

    margaret_bankruptcy: {
        id: "margaret_bankruptcy",
        title: "Margaret's Financial Crisis",
        description: "Margaret's art gallery is failing and she's facing bankruptcy after Victor refused her loan request.",
        category: "motive",
        character: "margaret",
        keywords: ["gallery failing", "bankruptcy", "refused loan"],
        importance: "medium"
    },

    margaret_theft: {
        id: "margaret_theft",
        title: "Art Collection Theft",
        description: "Margaret has been stealing from the family estate's art collection to sell, recently noticed by Victor.",
        category: "motive",
        character: "margaret",
        keywords: ["stealing", "art collection", "family estate", "noticed"],
        importance: "medium"
    },

    isabella_relationship: {
        id: "isabella_relationship",
        title: "Isabella's Forbidden Love",
        description: "Victor disapproved of Isabella's relationship with a woman and threatened to disown her.",
        category: "motive",
        character: "isabella",
        keywords: ["disapproved", "relationship", "woman", "disown"],
        importance: "medium"
    },

    robert_firing: {
        id: "robert_firing",
        title: "Robert's Job Security Threat",
        description: "Victor planned to fire Robert and the entire staff to sell the manor, with no pension after 25 years.",
        category: "motive",
        character: "robert",
        keywords: ["fire", "staff", "sell manor", "no pension", "25 years"],
        importance: "high"
    },

    // === ACCESS & CAPABILITIES ===
    marcus_chemistry: {
        id: "marcus_chemistry", 
        title: "Marcus's Chemistry Background",
        description: "Marcus studied chemistry in college before dropping out, giving him knowledge of poisons.",
        category: "means",
        character: "marcus",
        keywords: ["chemistry", "college", "poisons", "knowledge"],
        importance: "high"
    },

    elena_access: {
        id: "elena_access",
        title: "Elena's Complete Access", 
        description: "Elena has security codes to all rooms and unlimited access throughout the manor.",
        category: "means",
        character: "elena",
        keywords: ["security codes", "all rooms", "unlimited access"],
        importance: "high"
    },

    robert_keys: {
        id: "robert_keys",
        title: "Robert's Master Access",
        description: "Robert has master keys to all rooms and prepared Victor's whiskey earlier in the evening.",
        category: "means", 
        character: "robert",
        keywords: ["master keys", "all rooms", "prepared whiskey"],
        importance: "high"
    },

    sophia_medication: {
        id: "sophia_medication",
        title: "Sophia's Sleeping Pills",
        description: "Sophia has access to sleeping pills that could be crushed and mixed into drinks.",
        category: "means",
        character: "sophia",
        keywords: ["sleeping pills", "crushed", "mixed", "drinks"],
        importance: "medium"
    },

    james_work_access: {
        id: "james_work_access",
        title: "James's Office Chemical Access",
        description: "James has access to Victor's office at work where various chemicals are stored.",
        category: "means",
        character: "james", 
        keywords: ["office", "work", "chemicals", "stored"],
        importance: "medium"
    },

    thomas_connections: {
        id: "thomas_connections",
        title: "Thomas's Criminal Network",
        description: "Thomas has connections to people who could supply dangerous substances like poisons.",
        category: "means",
        character: "thomas",
        keywords: ["connections", "supply", "dangerous substances", "poisons"],
        importance: "medium"
    },

    isabella_art_chemicals: {
        id: "isabella_art_chemicals",
        title: "Isabella's Art Supplies",
        description: "Isabella has access to various toxic art chemicals and solvents in her studio.",
        category: "means",
        character: "isabella",
        keywords: ["toxic", "art chemicals", "solvents", "studio"],
        importance: "low"
    },

    margaret_manor_key: {
        id: "margaret_manor_key", 
        title: "Margaret's Manor Access",
        description: "Margaret has a key to the manor and knows the layout well from years of visits.",
        category: "means",
        character: "margaret",
        keywords: ["key", "manor", "layout", "years of visits"],
        importance: "low"
    },

    // === TIMELINE & EVIDENCE ===
    time_of_death: {
        id: "time_of_death",
        title: "Time of Death Established",
        description: "Victor died between 10:00-10:30 PM based on forensic examination.",
        category: "forensic",
        character: "victim",
        keywords: ["died", "10:00", "10:30", "forensic"],
        importance: "critical"
    },

    poison_method: {
        id: "poison_method",
        title: "Cyanide Poisoning Confirmed", 
        description: "Victor was killed by cyanide poison, likely administered through his whiskey.",
        category: "forensic",
        character: "victim",
        keywords: ["cyanide", "poison", "whiskey", "administered"],
        importance: "critical"
    },

    locked_room: {
        id: "locked_room",
        title: "Study Door Locked",
        description: "The study door was locked from the inside, but there's a second entrance through the library.",
        category: "scene",
        character: "location",
        keywords: ["locked", "inside", "second entrance", "library"],
        importance: "high"
    },

    open_window: {
        id: "open_window",
        title: "Suspicious Open Window",
        description: "The study window was slightly ajar despite the cold weather, possibly indicating an escape route.",
        category: "scene",
        character: "location", 
        keywords: ["window", "ajar", "cold weather", "escape route"],
        importance: "medium"
    },

    whiskey_fingerprints: {
        id: "whiskey_fingerprints",
        title: "Clean Whiskey Glass",
        description: "Only Victor's fingerprints were found on the poisoned whiskey glass - killer wore gloves or wiped it clean.",
        category: "forensic",
        character: "evidence",
        keywords: ["Victor's fingerprints", "only", "gloves", "wiped clean"],
        importance: "high"
    },

    // === BEHAVIORAL CLUES ===
    robert_tabloid: {
        id: "robert_tabloid",
        title: "Robert's Tabloid Betrayal", 
        description: "Robert has been secretly providing family information to tabloid journalists for money.",
        category: "behavior",
        character: "robert",
        keywords: ["tabloid", "journalists", "family information", "money"],
        importance: "low"
    },

    dinner_arguments: {
        id: "dinner_arguments",
        title: "Heated Dinner Conversations",
        description: "Multiple witnesses report tense conversations and arguments during dinner that evening.",
        category: "behavior",
        character: "general",
        keywords: ["tense", "conversations", "arguments", "dinner"],
        importance: "medium"
    }
};

// Milestone categories for UI organization
const MILESTONE_CATEGORIES = {
    alibi: { name: "Alibis & Whereabouts", icon: "📍", color: "#4ecdc4" },
    motive: { name: "Motives & Conflicts", icon: "⚔️", color: "#ff6b6b" },
    means: { name: "Access & Capabilities", icon: "🔑", color: "#ffd700" },
    forensic: { name: "Forensic Evidence", icon: "🔬", color: "#9b59b6" },
    scene: { name: "Crime Scene", icon: "🏚️", color: "#e67e22" },
    behavior: { name: "Behavioral Clues", icon: "🎭", color: "#95a5a6" }
};

// Milestone importance levels
const MILESTONE_IMPORTANCE = {
    critical: { weight: 3, color: "#ff3838" },
    high: { weight: 2, color: "#ff6b6b" }, 
    medium: { weight: 1.5, color: "#ffd700" },
    low: { weight: 1, color: "#95a5a6" }
};