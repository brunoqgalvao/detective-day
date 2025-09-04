import { Milestone } from '../../types/case.types';

export const milestones: Record<string, Milestone> = {
  keylogger_discovery: {
    id: "keylogger_discovery",
    title: "Keylogger Found on David's Computer",
    description: "A keylogger was installed on David Morrison's workstation three weeks ago, capturing all his passwords including admin credentials",
    category: "means",
    character: "david_morrison",
    keywords: ["keylogger", "password", "credentials", "workstation", "installed"],
    importance: "critical"
  },

  vpn_spoofing: {
    id: "vpn_spoofing",
    title: "VPN Spoofing Evidence",
    description: "Sarah Kim's VPN connection showed signs of spoofing - she appeared to be home but was actually in the office",
    category: "means",
    character: "sarah_kim",
    keywords: ["vpn", "spoof", "fake", "home", "office"],
    importance: "critical"
  },

  credential_sale: {
    id: "credential_sale",
    title: "David Sold His Credentials",
    description: "David Morrison admits he sold his admin credentials on the dark web for $100,000 to pay gambling debts",
    category: "means",
    character: "david_morrison",
    keywords: ["sold", "credentials", "dark web", "admin", "password"],
    importance: "high"
  },

  fake_alert_origin: {
    id: "fake_alert_origin",
    title: "Fake Alert Traced",
    description: "The fake server alert that distracted James Rivera was triggered from Sarah Kim's terminal",
    category: "means",
    character: "sarah_kim",
    keywords: ["fake", "alert", "triggered", "distraction", "james"],
    importance: "critical"
  },

  student_loans: {
    id: "student_loans",
    title: "Sarah's Financial Desperation",
    description: "Sarah Kim has $200,000 in student loans and her department is being outsourced next quarter",
    category: "motive",
    character: "sarah_kim",
    keywords: ["loans", "debt", "student", "outsource", "department"],
    importance: "high"
  },

  crypto_losses: {
    id: "crypto_losses",
    title: "Sarah's Crypto Gambling Losses",
    description: "Sarah Kim lost $50,000 in cryptocurrency trading last month, adding to her financial desperation",
    category: "motive",
    character: "sarah_kim",
    keywords: ["crypto", "gambling", "lost", "trading", "bitcoin"],
    importance: "high"
  },

  alex_backdoors: {
    id: "alex_backdoors",
    title: "Alex's Unauthorized Backdoors",
    description: "Alex Chen created multiple backdoors in the system for personal schemes but claims they're for emergency maintenance",
    category: "means",
    character: "alex_chen",
    keywords: ["backdoor", "unauthorized", "access", "emergency", "maintenance"],
    importance: "medium"
  },

  marcus_sec: {
    id: "marcus_sec",
    title: "Marcus Under SEC Investigation",
    description: "Marcus Taylor is being investigated by the SEC for insider trading and needs money to flee the country",
    category: "motive",
    character: "marcus_taylor",
    keywords: ["sec", "investigation", "insider", "trading", "flee"],
    importance: "medium"
  },

  rachel_brother: {
    id: "rachel_brother",
    title: "Rachel's Brother in Prison",
    description: "Rachel Wong's brother is serving 10 years for hacking, and she blames SecureBank for not defending him",
    category: "motive",
    character: "rachel_wong",
    keywords: ["brother", "prison", "hacking", "revenge", "blamed"],
    importance: "medium"
  },

  james_access: {
    id: "james_access",
    title: "James Still Has System Access",
    description: "James Rivera's credentials were never revoked after he left, giving him continued access to SecureBank systems",
    category: "means",
    character: "james_rivera",
    keywords: ["credentials", "revoked", "access", "still", "former"],
    importance: "high"
  },

  nina_spy: {
    id: "nina_spy",
    title: "Nina as Corporate Spy",
    description: "Nina Patel has been passing secrets to Indian competitors for $2 million",
    category: "motive",
    character: "nina_patel",
    keywords: ["spy", "corporate", "india", "competitor", "secrets"],
    importance: "medium"
  },

  oliver_government: {
    id: "oliver_government",
    title: "Oliver's Government Connection",
    description: "Oliver Frost is actually an NSA asset monitoring financial crimes with government backdoors",
    category: "alibi",
    character: "oliver_frost",
    keywords: ["nsa", "government", "asset", "intelligence", "backdoor"],
    importance: "medium"
  },

  badge_records: {
    id: "badge_records",
    title: "Sarah's Late Night Entry",
    description: "Security badge records show Sarah Kim entered the building at 11 PM, unusual for a junior developer",
    category: "alibi",
    character: "sarah_kim", 
    keywords: ["badge", "11pm", "late", "entry", "building"],
    importance: "high"
  },

  workstation_access: {
    id: "workstation_access",
    title: "David's Workstation Accessed Remotely",
    description: "David Morrison's workstation was accessed at 2:35 AM using his compromised credentials while he was at the casino",
    category: "forensic",
    character: "david_morrison",
    keywords: ["workstation", "remote", "access", "2:35", "casino"],
    importance: "critical"
  },

  tokyo_alibi: {
    id: "tokyo_alibi",
    title: "Marcus's Tokyo Call Confirms Alibi",
    description: "Marcus Taylor was on verified video calls with Tokyo investors during critical parts of the heist window",
    category: "alibi",
    character: "marcus_taylor",
    keywords: ["tokyo", "video", "call", "investors", "alibi"],
    importance: "medium"
  }
};