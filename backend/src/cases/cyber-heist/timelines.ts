export const timeline = [
  {
    time: "11:00 PM",
    event: "David Morrison arrives at casino",
    witnesses: ["Casino security", "Multiple gamblers"],
    importance: "important"
  },
  {
    time: "12:00 AM",
    event: "Marcus Taylor begins call with Tokyo clients",
    witnesses: ["Call logs", "Tokyo team"],
    importance: "important"
  },
  {
    time: "12:30 AM",
    event: "Sarah Kim logs into VPN from home IP",
    witnesses: ["VPN logs"],
    importance: "critical"
  },
  {
    time: "1:00 AM",
    event: "Marcus Taylor ends Tokyo call",
    witnesses: ["Call logs"],
    importance: "minor"
  },
  {
    time: "1:00 AM",
    event: "Sarah begins 'patch deployment' work",
    witnesses: ["Git commits", "Server logs"],
    importance: "important"
  },
  {
    time: "1:30 AM",
    event: "Unusual network activity detected but not flagged",
    witnesses: ["Automated logs"],
    importance: "critical"
  },
  {
    time: "2:00 AM",
    event: "Alex Chen badges into server room",
    witnesses: ["Security system"],
    importance: "important"
  },
  {
    time: "2:00 AM",
    event: "Nina Patel starts video call with Mumbai",
    witnesses: ["Call logs", "Mumbai team"],
    importance: "important"
  },
  {
    time: "2:15 AM",
    event: "Fake server alert triggered",
    witnesses: ["James Rivera", "Alert system"],
    importance: "critical"
  },
  {
    time: "2:15 AM",
    event: "James Rivera responds to fake alert remotely",
    witnesses: ["System logs"],
    importance: "critical"
  },
  {
    time: "2:30 AM",
    event: "David Morrison leaves casino",
    witnesses: ["Casino security"],
    importance: "important"
  },
  {
    time: "2:35 AM",
    event: "Backdoor access activated using sold credentials",
    witnesses: ["Hidden logs discovered later"],
    importance: "critical"
  },
  {
    time: "2:40 AM",
    event: "Security protocols bypassed in sequence",
    witnesses: ["System logs"],
    importance: "critical"
  },
  {
    time: "2:45 AM",
    event: "James realizes alert was fake, starts investigating",
    witnesses: ["James Rivera", "System logs"],
    importance: "important"
  },
  {
    time: "2:47 AM",
    event: "$50 million transferred and converted to crypto",
    witnesses: ["Transaction logs"],
    importance: "critical"
  },
  {
    time: "2:48 AM",
    event: "Funds dispersed to multiple wallets",
    witnesses: ["Blockchain records"],
    importance: "critical"
  },
  {
    time: "2:50 AM",
    event: "James discovers the theft",
    witnesses: ["James Rivera"],
    importance: "important"
  },
  {
    time: "3:00 AM",
    event: "Nina Patel ends Mumbai call",
    witnesses: ["Call logs"],
    importance: "minor"
  },
  {
    time: "3:00 AM",
    event: "Emergency alert sent to all senior staff",
    witnesses: ["All suspects"],
    importance: "important"
  },
  {
    time: "3:15 AM",
    event: "Marcus Taylor arrives at office",
    witnesses: ["Security cameras"],
    importance: "minor"
  },
  {
    time: "3:30 AM",
    event: "Alex Chen leaves server room",
    witnesses: ["Security system"],
    importance: "minor"
  },
  {
    time: "3:30 AM",
    event: "FBI notified of the breach",
    witnesses: ["Marcus Taylor", "Law enforcement"],
    importance: "important"
  },
  {
    time: "4:00 AM",
    event: "Sarah Kim disconnects from VPN",
    witnesses: ["VPN logs"],
    importance: "important"
  },
  {
    time: "6:00 AM",
    event: "FBI arrives to begin investigation",
    witnesses: ["All present staff"],
    importance: "important"
  }
];

export const criticalWindow = {
  start: "2:35 AM",
  end: "2:47 AM",
  description: "The actual heist execution window when credentials were used and funds transferred"
};

export const suspiciousActivities = [
  {
    suspect: "sarah_kim",
    activity: "VPN connection showed unusual data patterns",
    time: "2:35-2:47 AM",
    significance: "Could indicate VPN spoofing"
  },
  {
    suspect: "alex_chen",
    activity: "Ran unexplained diagnostic commands",
    time: "2:30-2:45 AM",
    significance: "Could have been covering tracks"
  },
  {
    suspect: "david_morrison",
    activity: "No witnesses after leaving casino",
    time: "2:30-3:00 AM",
    significance: "Critical window unaccounted for"
  },
  {
    suspect: "james_rivera",
    activity: "Responded to fake alert he could have triggered",
    time: "2:15-2:45 AM",
    significance: "Perfect distraction timing"
  },
  {
    suspect: "oliver_frost",
    activity: "Home security system offline",
    time: "All night",
    significance: "Convenient lack of alibi verification"
  }
];