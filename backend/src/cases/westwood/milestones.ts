import { Milestone } from '../../types/case.types';

export const milestones: Record<string, Milestone> = {
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

  marcus_debts: {
    id: "marcus_debts",
    title: "Marcus's Gambling Problem", 
    description: "Marcus owes $200,000 to dangerous people due to extensive gambling debts.",
    category: "motive",
    character: "marcus",
    keywords: ["gambling", "debts", "$200,000", "dangerous", "owes"],
    importance: "high"
  },

  marcus_chemistry: {
    id: "marcus_chemistry", 
    title: "Marcus's Chemistry Background",
    description: "Marcus studied chemistry in college before dropping out, giving him knowledge of poisons.",
    category: "means",
    character: "marcus",
    keywords: ["chemistry", "college", "poisons", "knowledge"],
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

  james_embezzlement: {
    id: "james_embezzlement",
    title: "James's Financial Crime",
    description: "James has been embezzling company funds for 2 years, recently discovered by Victor.",
    category: "motive",
    character: "james",
    keywords: ["embezzling", "funds", "2 years", "discovered"],
    importance: "high"
  },

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
  }
};