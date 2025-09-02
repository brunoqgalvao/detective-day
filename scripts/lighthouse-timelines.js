// Detailed timeline for Lighthouse Mystery
// Ensures temporal consistency and alibi verification

const LIGHTHOUSE_TIMELINES = {
    // Master timeline of all events
    masterTimeline: {
        "5:00 PM": "Guests begin arriving for anniversary celebration",
        "6:00 PM": "Tours of lighthouse for guests",
        "7:00 PM": "Anniversary dinner begins in main hall",
        "8:30 PM": "Father Patrick performs blessing ceremony",
        "9:00 PM": "Dinner concludes, coffee and desserts served",
        "9:30 PM": "Guests begin retiring to rooms or exploring",
        "10:00 PM": "Alex goes to gallery for night photography",
        "10:15 PM": "Marina secretly accesses basement (photographed)",
        "10:30 PM": "Marina returns to guest quarters",
        "10:45 PM": "Samuel makes final log entry about signals",
        "11:00 PM": "Unusual boat lights spotted offshore",
        "11:30 PM": "Derek goes to 'check generator'",
        "11:30 PM": "Alex leaves gallery, returns to room",
        "11:40 PM": "Foghorn mysteriously stops",
        "11:45 PM": "Lighthouse lamp goes dark (MURDER OCCURS)",
        "11:55 PM": "Derek at lighthouse (deleted from log)",
        "12:00 AM": "Marina hears crash (body hitting rocks)",
        "12:30 AM": "Derek returns from 'generator'",
        "1:00 AM": "Ruth finishes reading, goes to bed",
        "2:00 AM": "All quiet at lighthouse",
        "5:30 AM": "Jonas discovers body",
        "5:45 AM": "Coast Guard called"
    },

    // Individual character timelines
    marina: {
        timeline: {
            "5:00-6:00 PM": "Arrived by afternoon ferry, awkward reunion with father",
            "6:00-7:00 PM": "Tour of lighthouse, avoided father, spoke with Ruth",
            "7:00-9:00 PM": "At dinner, argued with father about money and life choices",
            "9:00-9:30 PM": "In main hall, tense conversation with Derek",
            "9:30-10:00 PM": "Walked grounds alone, checking old haunts",
            "10:00-10:15 PM": "In room briefly, then slipped out",
            "10:15-10:25 PM": "In basement checking hidden storage (wildlife trafficking)",
            "10:30 PM-12:30 AM": "In guest quarters, heard crash around midnight",
            "12:30-5:30 AM": "Remained in room, couldn't sleep",
            "5:30 AM": "Heard commotion, came out"
        },
        observations: {
            fatherMood: "Father was agitated all evening, kept checking his watch",
            derekBehavior: "Derek seemed jumpy, kept going outside",
            basementAccess: "Still remembered the hidden basement entrance",
            crashSound: "Heard a loud crash around midnight, thought it was storm",
            lighthouseDark: "Noticed lighthouse was dark when looked out window"
        },
        knowledgeGaps: [
            "Doesn't know about Derek's smuggling",
            "Unaware of generator log tampering",
            "Didn't see who else was outside"
        ]
    },

    derek: {
        timeline: {
            "5:00-6:00 PM": "Preparing lighthouse for guests, setting up",
            "6:00-7:00 PM": "Giving tours, operating lighthouse machinery",
            "7:00-9:00 PM": "At dinner, sitting with staff table",
            "9:00-9:30 PM": "Checking lighthouse operations, routine duties",
            "9:30-10:00 PM": "In gallery, 'adjusting' signal equipment",
            "10:00-11:00 PM": "In cottage, watching for boat signals",
            "11:00-11:30 PM": "Received signal from smugglers",
            "11:30-11:45 PM": "Went to 'generator' (actually preparing alibi)",
            "11:45-11:55 PM": "Confronted by Samuel in gallery, murdered him",
            "11:55 PM-12:15 AM": "Disposed of evidence, hid weapon, deleted log",
            "12:15-12:30 AM": "Actually at generator to establish alibi",
            "12:30-5:30 AM": "In cottage, destroying remaining evidence",
            "5:30 AM": "Joined crowd at body discovery"
        },
        observations: {
            samuelSuspicion: "Captain was onto the smuggling operation",
            signalTime: "Boats signaled at 11 PM as planned",
            alexPhotos: "Worried Alex might have photographed signals",
            generatorAlibi: "Made sure to be seen at generator building",
            weaponHidden: "Hid brass weight in false bottom drawer"
        },
        knowledgeGaps: [
            "Claims not to know about basement activities",
            "Denies seeing anyone else outside",
            "Says generator problem was routine"
        ]
    },

    ruth: {
        timeline: {
            "5:00-6:00 PM": "Arrived early, reviewing research notes",
            "6:00-7:00 PM": "Tour focusing on historical areas",
            "7:00-9:00 PM": "At dinner, discussing lighthouse history",
            "9:00-9:30 PM": "Speaking with Victor about old records",
            "9:30-10:00 PM": "In library, searching for documents",
            "10:00 PM-1:00 AM": "Reading in library (camera confirms)",
            "1:00-5:30 AM": "In guest room sleeping",
            "5:30 AM": "Woken by commotion"
        },
        observations: {
            samuelRefusal: "Samuel refused access to restricted documents",
            victorHints: "Victor hinted at hidden compartments",
            documentsStolen: "Already took some papers yesterday",
            libraryCamera: "Knew about security camera, stayed visible",
            noSoundsHeard: "Library is soundproofed, heard nothing"
        },
        knowledgeGaps: [
            "Didn't know about murder until morning",
            "Unaware of smuggling operations",
            "Didn't see outdoor events"
        ]
    },

    jonas: {
        timeline: {
            "5:00-7:00 PM": "On boat, securing for storm",
            "7:00-9:00 PM": "At dinner as invited guest",
            "9:00-9:30 PM": "Checking boat one more time",
            "9:30 PM-5:00 AM": "On boat in harbor (GPS confirms)",
            "5:00-5:30 AM": "Approached lighthouse for morning delivery",
            "5:30 AM": "Found Samuel's body on rocks",
            "5:45 AM": "Called Coast Guard on radio"
        },
        observations: {
            stormConcern: "Weather was getting worse, stayed with boat",
            samuelTension: "Captain seemed stressed at dinner",
            boatLights: "Saw unusual boats around 11 PM, not local",
            supplyTheft: "Been skimming supplies for years",
            bodyPosition: "Body was on sharp rocks, obviously dead"
        },
        knowledgeGaps: [
            "Doesn't know about lighthouse events after 9:30 PM",
            "Unaware of who was where during night",
            "No knowledge of murder details"
        ]
    },

    elena: {
        timeline: {
            "3:00-5:00 PM": "Conducting afternoon inspection",
            "5:00-7:00 PM": "Writing inspection report in room",
            "7:00-9:00 PM": "At dinner, professional appearance",
            "9:00-10:00 PM": "Meeting with Samuel about violations",
            "10:00-11:00 PM": "In room, reviewing other lighthouse reports",
            "11:00 PM-5:00 AM": "In room sleeping (claims locked door)",
            "5:00-5:45 AM": "Woken by commotion, dressed and came out"
        },
        observations: {
            violationsFound: "Found several safety violations",
            samuelKnowledge: "Samuel hinted he knew about bribes",
            derekNervous: "Assistant keeper was oddly nervous",
            reportDeadline: "Gave Samuel until morning to fix issues",
            noWitness: "Room is isolated, no one can verify presence"
        },
        knowledgeGaps: [
            "Claims no knowledge of nighttime events",
            "Unaware of smuggling operation",
            "Doesn't know about other's secrets"
        ]
    },

    patrick: {
        timeline: {
            "5:00-6:00 PM": "Arrived with holy water for blessing",
            "6:00-7:00 PM": "Tour and private conversation with Samuel",
            "7:00-8:30 PM": "At dinner, gave speech about lighthouse history",
            "8:30-9:00 PM": "Performed blessing ceremony",
            "9:00-10:00 PM": "Confession with Samuel in chapel",
            "10:00 PM-12:00 AM": "Praying in chapel for Samuel's troubles",
            "12:00-5:30 AM": "In guest room sleeping",
            "5:30 AM": "Came out when heard shouting"
        },
        observations: {
            samuelConfession: "Samuel was deeply troubled in confession",
            embezzlementGuilt: "Samuel knew about missing church funds",
            foghornSound: "Heard foghorn stop at 11:40 PM",
            prayerTime: "Spent hours praying for forgiveness",
            morningShock: "Genuinely shocked by Samuel's death"
        },
        knowledgeGaps: [
            "Doesn't know specific murder details",
            "Unaware of smuggling",
            "Didn't see anyone during prayer time"
        ]
    },

    alex: {
        timeline: {
            "4:00-5:00 PM": "Arrived and set up equipment",
            "5:00-7:00 PM": "Taking photos of lighthouse exterior",
            "7:00-9:00 PM": "Photographing dinner and ceremony",
            "9:00-10:00 PM": "Reviewing photos, preparing for night shots",
            "10:00-10:15 PM": "On gallery setting up for long exposures",
            "10:15-11:30 PM": "Taking photos from gallery (timestamps confirm)",
            "11:30-11:45 PM": "Packing equipment, last photos",
            "11:45 PM": "Saw lighthouse go dark, took final shots",
            "11:45 PM-5:30 AM": "In room, reviewing/deleting sensitive photos",
            "5:30 AM": "Came out with camera to document scene"
        },
        observations: {
            derekSignals: "Photographed Derek signaling boats at 10:45 PM",
            marinaBasement: "Caught Marina entering basement at 10:15 PM",
            lighthouseFailure: "Documented exact time light went out: 11:45 PM",
            unusualBoats: "Captured boats with no running lights",
            threatsReceived: "Someone slipped note under door at 2 AM"
        },
        knowledgeGaps: [
            "Doesn't know about murder method",
            "Unaware of various people's motives",
            "Didn't see actual murder occur"
        ]
    },

    victor: {
        timeline: {
            "4:00-5:00 PM": "Arrived early to reminisce",
            "5:00-7:00 PM": "Showing guests secret lighthouse features",
            "7:00-9:00 PM": "Guest of honor at dinner",
            "9:00-10:00 PM": "Sharing stories with Ruth in library",
            "10:00 PM-5:30 AM": "In room sleeping (hard of hearing)",
            "5:30 AM": "Woken by Elena knocking on door"
        },
        observations: {
            samuelDiscovery: "Samuel found the gold last week",
            hiddenCompartments: "Showed Ruth some hiding spots (not gold)",
            derekPresence: "Always suspicious of new assistant",
            hearingProblems: "Can't hear much without hearing aids",
            morningConfusion: "Confused why lighthouse was dark"
        },
        knowledgeGaps: [
            "Slept through entire incident",
            "Doesn't know about smuggling",
            "Unaware of murder details"
        ]
    },

    forensics: {
        establishedFacts: {
            timeOfDeath: "Between 11:00 PM and 2:00 AM based on body temperature",
            actualDeath: "Most likely 11:45 PM based on timeline evidence",
            causeOfDeath: "Blunt force trauma to head, then fall",
            weaponType: "Heavy metal object, 3-4 inches diameter",
            fallHeight: "120 feet from gallery to rocks",
            bloodEvidence: "Blood on gallery railing, not just rocks",
            doorLocked: "Gallery door locked from inside, but service ladder accessible"
        }
    },

    prosecutor: {
        requirements: {
            timeline: "Suspect must have opportunity between 11:30 PM and midnight",
            access: "Must prove access to gallery and weapon",
            motive: "Clear motive for murder must be established",
            evidence: "Physical evidence linking suspect to crime scene",
            consciousness: "Evidence murder was intentional, not accident"
        }
    }
};

// Helper functions
function getLighthouseCharacterTimeline(characterId) {
    return LIGHTHOUSE_TIMELINES[characterId] || null;
}

function whatLighthouseCharacterKnowsAboutTime(characterId, time) {
    const timeline = LIGHTHOUSE_TIMELINES[characterId];
    if (!timeline) return null;
    
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
        LIGHTHOUSE_TIMELINES,
        getLighthouseCharacterTimeline,
        whatLighthouseCharacterKnowsAboutTime
    };
}