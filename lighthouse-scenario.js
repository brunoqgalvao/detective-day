const LIGHTHOUSE_SCENARIO = {
    title: "The Lighthouse Keeper's Secret",
    
    initialBriefing: `
        <p><strong>Date:</strong> November 3rd, 2024 - 6:15 AM</p>
        <p><strong>Location:</strong> Beacon Point Lighthouse, Rocky Cove Island</p>
        
        <p>You've been called to investigate a death at the remote Beacon Point Lighthouse. The victim is <strong>Captain Samuel Torres</strong>, 58, the lighthouse keeper and retired naval officer. His body was discovered at 5:30 AM at the base of the lighthouse tower by the morning supply boat crew.</p>
        
        <p><strong>Crime Scene Details:</strong></p>
        <ul>
            <li>The victim was found on the rocks below the lighthouse gallery, apparent fall from height</li>
            <li>Initial examination suggests death occurred between 11 PM and 2 AM</li>
            <li>The lighthouse lamp was extinguished - highly unusual and dangerous for passing ships</li>
            <li>The gallery door was found locked from the inside</li>
            <li>A broken whiskey bottle was found near the body</li>
            <li>Weather last night: Heavy fog, light rain, moderate winds</li>
        </ul>
        
        <p><strong>Initial Information:</strong></p>
        <p>A small gathering was held at the lighthouse last night for the 150th anniversary of its founding. All attendees stayed overnight due to the weather and are still on the island. The Coast Guard has sealed the island pending your investigation.</p>
        
        <p>Your task is to determine whether this was an accident, suicide, or murder. Interview witnesses, examine evidence, and uncover the truth behind the lighthouse keeper's death.</p>
    `,
    
    victim: {
        name: "Captain Samuel Torres",
        age: 58,
        occupation: "Lighthouse Keeper, Retired Naval Captain",
        description: "Decorated naval veteran who took over lighthouse operations 5 years ago. Known for his strict adherence to maritime safety and his knowledge of local smuggling history.",
        timeOfDeath: "Between 11:00 PM and 2:00 AM",
        causeOfDeath: "Blunt force trauma from fall - but evidence of head wound before the fall"
    },
    
    characters: [
        {
            id: "marina",
            name: "Marina Torres",
            role: "Daughter",
            age: 32,
            publicInfo: "Samuel's estranged daughter, marine biologist. First visit in 3 years.",
            privateInfo: {
                alibi: "In guest quarters from 10:30 PM. Heard a loud crash around midnight but thought it was the storm.",
                motive: "Father discovered she was using the lighthouse for illegal wildlife trafficking. He threatened to report her.",
                secrets: "Running illegal exotic fish trade through her research. Father found evidence in the basement.",
                relationship: "Bitter relationship. Father disapproved of her life choices and cut her off financially.",
                truthfulFacts: [
                    "Hadn't seen father in 3 years until yesterday",
                    "They argued about money at dinner",
                    "Studies marine biology at the university",
                    "Heard a crash around midnight",
                    "Father seemed agitated during the celebration"
                ],
                lies: [
                    "Claims they were reconciling",
                    "Denies knowing about basement storage"
                ],
                personality: "Defensive and bitter. Quick to blame others, especially Derek whom she sees as replacing her."
            }
        },
        {
            id: "derek",
            name: "Derek Chen",
            role: "Assistant Keeper",
            age: 29,
            publicInfo: "Recent hire, 6 months on the job. Former merchant marine. Lives in the lighthouse cottage.",
            privateInfo: {
                alibi: "Checking the generator from 11:30 PM to 12:30 AM. Generator log confirms this.",
                motive: "Torres discovered Derek was secretly meeting with smugglers, using lighthouse signals.",
                secrets: "Signaling drug smugglers with lighthouse for payment. Has massive debts from gambling.",
                relationship: "Appeared loyal but was desperate. Torres trusted him but was growing suspicious.",
                truthfulFacts: [
                    "Was hired six months ago",
                    "Has merchant marine experience",
                    "Was checking generator during the critical time",
                    "Generator log shows his access card used",
                    "Torres was training him on lighthouse operations"
                ],
                lies: [
                    "Claims Torres was like a father to him",
                    "Denies any involvement with boats at night"
                ],
                personality: "Nervous and overly helpful. Tries too hard to appear innocent."
            }
        },
        {
            id: "ruth",
            name: "Dr. Ruth Morrison",
            role: "Historian",
            age: 61,
            publicInfo: "Local historian writing a book about the lighthouse. Staying for research.",
            privateInfo: {
                alibi: "In the library reading until 1 AM. Night vision security camera confirms presence.",
                motive: "Torres refused to let her access historical documents that proved her ancestor was a pirate, not a hero.",
                secrets: "Desperate to hide family shame. Already took some documents without permission.",
                relationship: "Professional but tense. Torres was blocking her research and reputation.",
                truthfulFacts: [
                    "Writing a book about lighthouse history",
                    "Has been researching here for two weeks",
                    "Was in the library late reading",
                    "Knows about the smuggling tunnels below",
                    "Her family founded the nearby town"
                ],
                lies: [
                    "Claims Torres promised her full access",
                    "Denies taking any documents"
                ],
                personality: "Aristocratic and entitled. Obsessed with family legacy."
            }
        },
        {
            id: "jonas",
            name: "Jonas Blackwood",
            role: "Supply Boat Captain",
            age: 44,
            publicInfo: "Runs weekly supply trips to the lighthouse. Found the body this morning.",
            privateInfo: {
                alibi: "On his boat in the harbor all night. Boat's GPS confirms location.",
                motive: "Torres caught him stealing supplies and selling them. Was going to be reported.",
                secrets: "Has been skimming supplies for years. Also knows about the smuggling operation.",
                relationship: "Long-standing business relationship turned sour. Torres recently became suspicious.",
                truthfulFacts: [
                    "Makes weekly supply runs",
                    "Found the body at 5:30 AM",
                    "Has worked this route for 10 years",
                    "Stayed on boat due to weather",
                    "Knows about the dangerous currents"
                ],
                lies: [
                    "Claims perfect inventory records",
                    "Denies any disputes with Torres"
                ],
                personality: "Gruff and practical. Protective of his reputation and livelihood."
            }
        },
        {
            id: "elena",
            name: "Elena Vasquez",
            role: "Coast Guard Inspector",
            age: 38,
            publicInfo: "Conducting routine lighthouse inspection. Arrived yesterday afternoon.",
            privateInfo: {
                alibi: "In her room from 11 PM to 5 AM. No witnesses but door was locked.",
                motive: "Torres had evidence of her taking bribes to overlook safety violations at other lighthouses.",
                secrets: "Corrupt inspector. Torres threatened to expose her after finding discrepancies.",
                relationship: "Professional facade hiding mutual blackmail potential.",
                truthfulFacts: [
                    "Conducting annual safety inspection",
                    "Has inspected this lighthouse for 3 years",
                    "Found several violations yesterday",
                    "Gave Torres until morning to fix issues",
                    "Has authority to shut down lighthouse"
                ],
                lies: [
                    "Claims inspection was routine",
                    "Denies any previous issues with Torres"
                ],
                personality: "Professional but calculating. Always looking for angles."
            }
        },
        {
            id: "patrick",
            name: "Father Patrick O'Brien",
            role: "Local Priest",
            age: 67,
            publicInfo: "Old friend of Samuel. Came for the anniversary celebration.",
            privateInfo: {
                alibi: "In the chapel praying from 10 PM to midnight. Then went to bed.",
                motive: "Torres discovered Patrick had been embezzling church funds meant for lighthouse restoration.",
                secrets: "Gambling addiction. Used church funds at mainland casinos.",
                relationship: "Decades-old friendship strained by recent discoveries.",
                truthfulFacts: [
                    "Known Samuel for 30 years",
                    "Performed blessing ceremony at dinner",
                    "Was in chapel praying",
                    "Heard foghorn around 11:30 PM",
                    "Samuel seemed troubled during confession"
                ],
                lies: [
                    "Claims Samuel was at peace",
                    "Denies knowledge of restoration funds"
                ],
                personality: "Kindly exterior hiding deep shame and desperation."
            }
        },
        {
            id: "alex",
            name: "Alex Shaw",
            role: "Photographer",
            age: 26,
            publicInfo: "Freelance photographer documenting the anniversary for the newspaper.",
            privateInfo: {
                alibi: "On the gallery taking long-exposure photos from 10 PM to 11:30 PM. Camera timestamps confirm.",
                motive: "None directly, but saw something crucial and is being threatened.",
                secrets: "Photographed Derek signaling to boats. Also captured Marina in the basement.",
                relationship: "Professional only. Torres was cooperative but guarded.",
                truthfulFacts: [
                    "Taking photos for newspaper story",
                    "Was on gallery until 11:30 PM",
                    "Camera has timestamped photos",
                    "Saw lighthouse go dark at 11:45 PM",
                    "Noticed unusual boat lights offshore"
                ],
                lies: [
                    "Claims all photos are just landscape",
                    "Denies seeing anyone else outside"
                ],
                personality: "Observant but scared. Knows more than they're saying."
            }
        },
        {
            id: "victor",
            name: "Victor Hendricks",
            role: "Retired Lighthouse Keeper",
            age: 72,
            publicInfo: "Samuel's predecessor. Trained Samuel when he took over 5 years ago.",
            privateInfo: {
                alibi: "Asleep in guest room from 10 PM. Hard of hearing, heard nothing.",
                motive: "Samuel discovered Victor had hidden treasure from shipwreck in lighthouse walls.",
                secrets: "Found spanish gold 20 years ago, never reported it. Has been slowly selling it.",
                relationship: "Mentor relationship, but Victor never fully trusted Samuel with all secrets.",
                truthfulFacts: [
                    "Kept lighthouse for 35 years",
                    "Trained Samuel personally",
                    "Knows every inch of the building",
                    "Is quite hard of hearing now",
                    "Was given honor at celebration"
                ],
                lies: [
                    "Claims he told Samuel everything",
                    "Denies knowing about hidden spaces"
                ],
                personality: "Nostalgic and protective of lighthouse legacy. Stubborn about secrets."
            }
        }
    ],
    
    evidence: [
        {
            id: "head_wound",
            name: "Pre-fall Head Injury",
            description: "Autopsy reveals blunt force trauma to head before the fall. Not consistent with fall injuries.",
            discovered: false
        },
        {
            id: "lighthouse_log",
            name: "Lighthouse Log Book",
            description: "Last entry at 10:45 PM: 'Lamp secured. Investigating unusual signals from water.' Handwriting appears rushed.",
            discovered: false
        },
        {
            id: "signal_device",
            name: "Modified Signal Lamp",
            description: "Hidden device in gallery for sending coded messages. Recently used, Derek's fingerprints found.",
            discovered: false
        },
        {
            id: "threatening_letter",
            name: "Anonymous Letter",
            description: "Found in victim's desk: 'Stop interfering or join the depths.' Dated two days ago.",
            discovered: false
        },
        {
            id: "camera_photos",
            name: "Alex's Hidden Photos",
            description: "Photos showing Derek signaling boats and Marina accessing basement at 10:15 PM.",
            discovered: false
        },
        {
            id: "wildlife_documents",
            name: "Trafficking Evidence",
            description: "Documents in basement showing Marina's illegal exotic fish trade operation.",
            discovered: false
        },
        {
            id: "bribe_records",
            name: "Bribery Evidence",
            description: "Hidden ledger showing Elena taking payments for false inspection reports.",
            discovered: false
        },
        {
            id: "brass_weight",
            name: "Brass Compass Weight",
            description: "Heavy nautical weight with blood traces. Found hidden in Derek's room. Matches head wound.",
            discovered: false
        },
        {
            id: "timeline_contradiction",
            name: "Generator Access Log",
            description: "Shows Derek's card used at 11:30 PM and 12:30 AM, but middle entry at 11:55 PM manually deleted.",
            discovered: false
        },
        {
            id: "foghorn_timer",
            name: "Foghorn Malfunction",
            description: "Foghorn was disabled at 11:40 PM. Only someone familiar with the system could do this quickly.",
            discovered: false
        }
    ],
    
    solution: {
        murderer: "derek",
        method: "Struck Torres with brass compass weight when confronted about smuggling at 11:45 PM, then pushed body off gallery",
        motive: "Torres discovered smuggling operation and was about to report Derek to Coast Guard. Derek needed the money for gambling debts.",
        keyEvidence: [
            "Brass weight with blood matches head wound",
            "Deleted generator log entry during murder time",
            "Signal device with fingerprints",
            "Knowledge to disable foghorn quickly",
            "Photos showing him signaling boats"
        ],
        confession: "If confronted with brass weight, deleted log entry, and photos together, Derek will break down and confess."
    }
};