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