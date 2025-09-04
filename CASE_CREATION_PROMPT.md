# Detective Mystery Case Creation Guide & Agent Prompt

# Detective Mystery Game Creation Guide

## Core Architecture Requirements

### 1. Narrative Consistency Framework

#### A. Knowledge Management System
- **Facts Database**: Create a centralized facts repository where each fact has:
  - Unique ID
  - Fact description
  - List of characters who know this fact
  - Category (universal, secrets, timeline, evidence, etc.)
  
- **Character Knowledge Boundaries**: Each character must ONLY reference facts they legitimately know
  - Universal facts (everyone knows)
  - Personal experiences
  - Witnessed events
  - Discovered information
  - NEVER omniscient knowledge

#### B. Timeline Integrity
- **Master Timeline**: Create an absolute chronological sequence of events
  - Include both visible and hidden events
  - Mark which events each character witnessed
  - Ensure no temporal paradoxes

- **Character Timelines**: Each character needs:
  - Personal timeline with specific locations/activities
  - Observations they made at specific times
  - Knowledge gaps (what they DON'T know)
  - Alibi periods with witness corroboration

### 2. Character System Architecture

#### A. Character Definition Structure
Each character requires:
- **Public Information**: Basic facts known to all
- **Private Information**:
  - True alibi with specific times
  - Hidden motive (never directly admitted)
  - Secrets (revealed only under pressure)
  - Relationship dynamics with victim/others
  
#### B. Behavioral Consistency Rules
- **Truthful Facts**: List of facts character will share
- **Lies/Deceptions**: Specific false claims maintained until confronted
- **Personality Traits**: Consistent behavioral patterns
- **Interaction Rules**:
  - Stay in character (stressed, defensive, emotional)
  - Never break the fourth wall
  - Answer only what's asked
  - No meta-gaming responses

### 3. Evidence System

#### A. Evidence Types
- **Physical Evidence**: Tangible items with forensic value
- **Testimonial Evidence**: Character statements and contradictions
- **Circumstantial Evidence**: Patterns and connections
- **Documentary Evidence**: Records, documents, communications

#### B. Evidence Discovery Rules
- Evidence must be discoverable through logical investigation
- Each piece should have multiple discovery paths
- Critical evidence shouldn't rely on single conversation branches
- False leads and red herrings for complexity

### 4. Game Logic Engine

#### A. Core Mechanics
- **Interview System**: 
  - Dynamic responses based on evidence discovered
  - Pressure mechanics for extracting confessions
  - Character emotional states affecting responses

- **Evidence Collection**:
  - Automatic extraction from conversations
  - Manual note-taking capability
  - Evidence combination for new insights

#### B. Win Conditions
- **Primary Path**: Gather sufficient evidence + prosecutor approval
- **Secondary Path**: Direct confession from guilty party
- **Validation Requirements**:
  - Motive establishment
  - Opportunity proof
  - Means demonstration
  - Physical/testimonial evidence

### 5. Consistency Enforcement

#### A. Response Validation System
- **Pre-Response Checks**:
  - Verify character only uses known facts
  - Ensure temporal consistency
  - Maintain character identity accuracy
  - Prevent invention of new details

- **Anti-Inconsistency Measures**:
  - Automated consistency checking
  - Retry mechanism for inconsistent responses
  - Strict prompt engineering with fact boundaries

#### B. Identity Protection
- **Character Role Definitions**: Explicit, unambiguous role assignments
- **Relationship Clarity**: Clear family/professional relationships
- **Name-Role Binding**: Prevent character confusion
- **Consistency Reinforcement**: Multiple validation layers

### 6. Special Character Roles

#### A. Forensic Expert
- Limited to established physical evidence
- Scientific analysis only
- Cannot speculate beyond evidence
- Provides technical expertise

#### B. Prosecutor/Authority Figure
- Evaluates evidence sufficiency
- Requires complete case building:
  - Clear motive
  - Opportunity window
  - Means of execution
  - Supporting evidence
- Provides case validation

### 7. Solution Architecture

#### A. Solution Design Principles
- **Single Truth**: One definitive solution
- **Logical Deduction**: Solution must be deducible from available evidence
- **Fair Play**: All necessary clues accessible to player
- **Multiple Paths**: Various ways to reach the solution

#### B. Confession Triggers
- Specific evidence combination requirements
- Psychological pressure thresholds
- Character-specific breaking points
- Graduated revelation system

### 8. Technical Implementation

#### A. Data Structure
```javascript
SCENARIO = {
  title: string,
  initialBriefing: string,
  victim: object,
  characters: array[characterObjects],
  evidence: array[evidenceObjects],
  solution: object
}

FACTS_DATABASE = {
  universal: array[facts],
  relationships: array[facts],
  secrets: array[facts],
  timeline: array[facts],
  evidence: array[facts]
}

CHARACTER_TIMELINES = {
  masterTimeline: object,
  [characterId]: {
    timeline: object,
    observations: object,
    knowledgeGaps: array
  }
}
```

#### B. Prompt Engineering
- System prompts with strict boundaries
- Character-specific knowledge injection
- Anti-cheat mechanisms
- Consistency enforcement rules

### 9. Quality Assurance Checklist

Before deployment, verify:
- [ ] No timeline contradictions
- [ ] All alibis are verifiable
- [ ] Evidence discovery paths work
- [ ] Character knowledge boundaries enforced
- [ ] Solution is logically deducible
- [ ] Win conditions are achievable
- [ ] Character responses stay consistent
- [ ] No identity confusion possible
- [ ] Special characters function correctly
- [ ] Edge cases handled (early accusations, random guessing)

### 10. Narrative Design Principles

#### A. Story Complexity
- **Minimum 6-8 suspects** with distinct motives
- **Multiple red herrings** to prevent easy solutions
- **Interconnected relationships** creating tension
- **Layered secrets** revealing gradually

#### B. Clue Distribution
- **Critical clues**: 3-4 paths to discovery
- **Supporting evidence**: Reinforces main narrative
- **Misleading elements**: Deliberate false leads
- **Hidden connections**: Reward thorough investigation

### 11. Anti-Pattern Prevention

Avoid these common pitfalls:
- Characters knowing facts they shouldn't
- Temporal paradoxes in alibis
- Evidence appearing from nowhere
- Characters confusing identities
- Inconsistent personality shifts
- Meta-gaming responses
- Solution requiring information not provided
- Single point of failure in evidence chains

## Implementation Workflow

1. **Design Phase**
   - Create master timeline
   - Define all characters with complete profiles
   - Establish fact database
   - Design evidence network

2. **Consistency Phase**
   - Cross-reference all timelines
   - Verify character knowledge boundaries
   - Test alibi logic
   - Validate evidence paths

3. **Implementation Phase**
   - Code game engine
   - Implement character prompts
   - Create validation systems
   - Build UI/UX

4. **Testing Phase**
   - Run consistency checks
   - Test all conversation paths
   - Verify win conditions
   - Check edge cases

5. **Refinement Phase**
   - Address inconsistencies
   - Strengthen weak evidence chains
   - Balance difficulty
   - Polish responses

## Critical Success Factors

1. **Absolute Timeline Integrity**: Every event must fit perfectly in time
2. **Knowledge Boundary Enforcement**: Characters never know more than they should
3. **Evidence Traceability**: Every clue has a clear discovery path
4. **Character Consistency**: Personalities and behaviors remain stable
5. **Solution Fairness**: Player has all information needed to solve
6. **Robust Validation**: Multiple checks prevent inconsistencies
7. **Clear Win Conditions**: Unambiguous success criteria
8. **Engaging Narrative**: Compelling story that maintains interest

This framework ensures a detective game that is logically consistent, narratively engaging, and technically robust. The key is maintaining strict boundaries while creating an immersive investigative experience.

## IMPORTANT: You are creating a detective mystery game case. Follow this structure EXACTLY.

## Required Output Structure

You must create the following files for each case in the directory `backend/src/cases/[case-id]/`:

### 1. case.json - Public case information
```json
{
  "id": "case-id",
  "title": "Case Title",
  "initialBriefing": "<p><strong>Date:</strong> [Date] - [Time]</p><p><strong>Location:</strong> [Location]</p><p>[Initial story and crime scene details in HTML format]</p>",
  "victim": {
    "name": "Victim Name",
    "age": 52,
    "occupation": "Occupation",
    "description": "Brief background",
    "timeOfDeath": "Approximately 10:00-10:30 PM",
    "causeOfDeath": "How they died"
  },
  "characters": [
    {
      "id": "character_id",
      "name": "Full Name", 
      "role": "Relationship/Position",
      "age": 45,
      "publicInfo": "Basic info known to all"
    }
    // 6-8 characters minimum
  ],
  "evidence": [
    {
      "id": "evidence_id",
      "name": "Evidence Name",
      "description": "What it reveals when discovered",
      "discovered": false
    }
    // 8-12 pieces of evidence
  ],
  "images": {
    "crimeScene": "/images/cases/[case-id]/crime-scene.png",
    "victim": "/images/cases/[case-id]/victim.png",
    "location": "/images/cases/[case-id]/location.png",
    "evidence": {
      "evidence_id": "/images/cases/[case-id]/evidence-[evidence_id].png"
    },
    "characters": {
      "character_id": "/images/cases/[case-id]/character-[character_id].png"
    }
  }
}
```

### 2. characters.ts - Private character information
```typescript
export const characterPrivateData: Record<string, any> = {
  character_id: {
    alibi: "Detailed whereabouts during crime with specific times",
    motive: "Why they might want to harm the victim",
    secrets: "Hidden information they don't want revealed",
    relationship: "True relationship with victim and other characters",
    truthfulFacts: [
      "Facts they will share honestly",
      "At least 4-5 truthful facts"
    ],
    lies: [
      "Specific false claims they maintain",
      "Until confronted with evidence"
    ],
    personality: "How they behave when interviewed - defensive, nervous, composed, etc."
  }
  // Entry for EACH character
};

export const solution = {
  murderer: "character_id",
  method: "Exactly how the murder was committed with timeline",
  motive: "The true reason for the murder",
  keyEvidence: [
    "Critical pieces that prove guilt",
    "At least 4-5 pieces"
  ],
  confession: "What combination of evidence triggers confession"
};
```

### 3. facts.ts - Character knowledge boundaries
```typescript
export const facts: Record<string, string[]> = {
  character_id: [
    "Specific facts this character knows",
    "Include victim info, relationships, observations",
    "What they witnessed or discovered",
    "Their own secrets and activities",
    "At least 8-10 facts per character"
  ],
  // Special roles:
  forensics: [
    "Scientific evidence about the crime",
    "Time of death, cause of death",
    "Physical evidence analysis",
    "No speculation, only facts"
  ],
  prosecutor: [
    "Basic case facts",
    "All character names and roles",
    "Requirements for prosecution",
    "Prime suspect identification"
  ]
};
```

### 4. timelines.ts - Character movements and observations
```typescript
export const timelines: Record<string, any> = {
  character_id: {
    timeline: "6:00 PM: Activity\n7:00 PM: Location\n8:30 PM: Action\n9:45 PM: Critical moment\n10:30 PM: Discovery",
    observations: "What they noticed about other characters, victim behavior, unusual occurrences"
  }
  // Entry for EACH character with SPECIFIC TIMES
};
```

### 5. milestones.ts - Discovery tracking
```typescript
import { Milestone } from '../../types/case.types';

export const milestones: Record<string, Milestone> = {
  milestone_id: {
    id: "milestone_id",
    title: "Discovery Title",
    description: "What was revealed",
    category: "alibi" | "motive" | "means" | "forensic",
    character: "character_id",
    keywords: ["key", "words", "to", "detect"],
    importance: "high" | "critical" | "medium"
  }
  // At least 10-15 milestones covering all major discoveries
};
```

## Image Generation Requirements

### How to Generate Images

You have TWO methods available for image generation:

#### Method 1: Direct MCP Tools (Preferred for individual images)
Use the MCP image generation tools directly:
- `mcp__gpt-image-1__gpt_image_1_generate` - For single images
- `mcp__gpt-image-1__gpt_image_1_generate_with_variations` - For variations

**IMPORTANT**: Generate multiple images IN PARALLEL by calling multiple tools in the same response for faster generation!

#### Method 2: NPM Script (For batch generation)
After creating all case files, you can use:
```bash
npm run generate -- --case [case-id]
```
This will generate all images defined in the case structure.

### Required Images (with specific prompts):

1. **Crime Scene** (`crime-scene.png`):
   - Prompt: "Detective game crime scene: [detailed description of the location where body was found], atmospheric lighting, no people visible, evidence markers, photorealistic style"

2. **Location/Building** (`location.png`):
   - Prompt: "Exterior view of [building/location name]: [architectural style], [time of day], establishing shot, detective noir atmosphere"

3. **Victim Portrait** (`victim.png`):
   - Prompt: "Portrait photo of [victim description]: professional headshot style, [age] years old, [occupation attire], neutral background"

4. **Each Character** (`character-[id].png`):
   - Prompt: "Portrait of [character name]: [age] years old, [role/occupation], [personality traits visible in expression], professional photo style"

5. **Each Key Evidence** (`evidence-[id].png`):
   - Prompt: "Crime scene evidence photo: [specific evidence item], close-up forensic photography style, evidence marker visible"

### Image Generation Best Practices:
1. **Generate in parallel**: Call multiple MCP tools in the same message to generate 3-4 images simultaneously
2. **Consistent style**: Use similar prompt structures for related images (all characters, all evidence)
3. **Save immediately**: Images are saved to `generated-images/` - move them to proper location
4. **Proper naming**: Follow the exact naming convention for automatic loading

### Image Storage:
- Generate to: `generated-images/` (temporary)
- Move to: `frontend/public/images/cases/[case-id]/`
- Reference in: case.json's "images" section
- Naming: Use exact conventions (crime-scene.png, character-[id].png, etc.)

## Story Complexity Requirements

### Minimum Complexity Standards
- **6-8 suspects** with distinct, believable motives
- **Multiple red herrings** (at least 3-4 false leads)
- **Interconnected relationships** creating natural tension
- **Layered secrets** that reveal gradually through investigation
- **3-4 paths to discover each critical clue** (redundancy)

### Clue Distribution Strategy
- **Critical clues**: Must have multiple discovery paths
- **Supporting evidence**: Reinforces main narrative
- **Misleading elements**: Deliberate false leads that seem plausible
- **Hidden connections**: Reward thorough investigation

## Critical Requirements

### 1. Timeline Consistency
- ALL events must fit a logical timeline
- No character can be in two places at once
- Murder window must align with character movements
- Discovery time must be after death

### 2. Knowledge Boundaries
- Characters only know facts from their facts list
- No omniscient knowledge
- Witnesses only know what they saw
- Secrets are hidden until revealed

### 3. Evidence Rules
- Each piece must be discoverable through investigation
- Critical evidence needs multiple paths to discovery
- Physical evidence must make forensic sense
- No evidence appears from nowhere

### 4. Character Requirements
- Minimum 6-8 suspects with distinct motives
- Clear relationships between characters
- Mix of family, professional, and social connections
- One guilty party with solid evidence trail

### 5. Solution Integrity
- Solution must be deducible from available evidence
- Confession triggers require specific evidence combinations
- Multiple red herrings to prevent easy solutions
- Fair play - player has access to all needed information

### 6. Win Conditions
- **Primary Path**: Gather sufficient evidence + prosecutor approval
- **Secondary Path**: Direct confession from guilty party
- **Requirements for Prosecution**:
  - Clear motive establishment
  - Opportunity proof (timeline)
  - Means demonstration (access to weapon/method)
  - Physical/testimonial evidence

### 7. Facts Database Rules
- **Universal facts**: Things everyone knows (victim identity, basic timeline)
- **Personal facts**: Character's own experiences and observations
- **Witnessed facts**: Events the character directly saw
- **Secret facts**: Hidden information only certain characters know
- **NEVER include**: Facts the character couldn't possibly know

## Case Validation Checklist

Before submitting, verify:
- [ ] All timelines are consistent and non-contradictory
- [ ] Each character has complete data (private info, facts, timeline)
- [ ] Evidence discovery paths are logical
- [ ] Solution is provable with available evidence
- [ ] All required images are generated and referenced
- [ ] Milestones cover key discoveries
- [ ] Character knowledge boundaries are enforced
- [ ] Confession trigger is clearly defined
- [ ] Red herrings and false leads are included
- [ ] Case is solvable but challenging

## Example Case Themes
- Corporate fraud/embezzlement murder
- Art world forgery and murder
- Tech startup rivalry killing
- Academic plagiarism revenge
- Political scandal assassination
- Restaurant empire poisoning
- Real estate development murder
- Medical malpractice cover-up

## IMPORTANT NOTES FOR THE AGENT:

1. **Use the actual file structure** - Create real files, don't just describe them
2. **Generate actual images** - Use the MCP image generation tools:
   - Generate 3-4 images IN PARALLEL per message for efficiency
   - Use `mcp__gpt-image-1__gpt_image_1_generate` tool
   - Move generated images from `generated-images/` to `frontend/public/images/cases/[case-id]/`
3. **File creation order**:
   - First: Create all TypeScript/JSON files for the case
   - Second: Generate all images in parallel batches
   - Third: Update case.json with correct image paths
4. **Maintain consistency** - Cross-reference all timelines and facts
5. **Test solvability** - Ensure the case can be solved with available information
6. **Rich details** - Include enough detail to make the investigation engaging
7. **Avoid clichés** - Create unique motives and relationships
8. **Character depth** - Give each character believable motivations and secrets

### Workflow Example:
```
1. Create case.json, characters.ts, facts.ts, timelines.ts, milestones.ts
2. Generate images in batches:
   - Batch 1: crime-scene, location, victim (3 parallel calls)
   - Batch 2: characters 1-4 (4 parallel calls)
   - Batch 3: characters 5-8 (4 parallel calls)
   - Batch 4: evidence items (as many as needed)
3. Move all images to proper directory
4. Update case.json with image paths
```

Remember: You're creating an interactive murder mystery where players interview suspects, discover evidence, and solve the crime through deduction. The case must be fair, logical, and engaging while maintaining perfect internal consistency.