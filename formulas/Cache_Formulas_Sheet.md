# Cache Memory Formulas and Methodology
## Complete Reference Sheet

---

## Table of Contents
1. [Basic Cache Parameters](#basic-cache-parameters)
2. [Address Breakdown Methodology](#address-breakdown-methodology)
3. [Direct-Mapped Cache Formulas](#direct-mapped-cache-formulas)
4. [Fully Associative Cache Formulas](#fully-associative-cache-formulas)
5. [Set-Associative Cache Formulas](#set-associative-cache-formulas)
6. [Cache Performance Formulas](#cache-performance-formulas)
7. [Step-by-Step Calculation Guide](#step-by-step-calculation-guide)
8. [Quick Reference Table](#quick-reference-table)

---

## Basic Cache Parameters

### Fundamental Calculations

**1. Number of Cache Lines:**
```
Number of Lines = Cache Size / Line Size
```

**2. Number of Sets (for Set-Associative):**
```
Number of Sets = Number of Lines / Associativity (k)
```

**3. Block Number from Address:**
```
Block Number = Address / Block Size
```

**4. Total Address Bits Required:**
```
Address Bits = log₂(Total Memory Size)
```

---

## Address Breakdown Methodology

### General Approach

**Step 1: Identify Given Parameters**
- Cache size (bytes)
- Line/Block size (bytes)
- Physical address size (bits)
- Associativity (for set-associative)
- Addressable unit (usually 1 byte)

**Step 2: Calculate Cache Organization**
- Number of lines
- Number of sets (if applicable)
- Word offset bits

**Step 3: Determine Address Fields**
- Word/Offset bits (from block size)
- Index/Set bits (from number of lines/sets)
- Tag bits (remaining bits)

**Step 4: Verify**
- Tag bits + Index/Set bits + Word bits = Total address bits

---

## Direct-Mapped Cache Formulas

### Address Structure

```
┌──────────┬──────┬──────┐
│   Tag    │Index │ Word │
│(s-r bits)│(r bits)│(w bits)│
└──────────┴──────┴──────┘
```

### Formulas

**1. Number of Cache Lines:**
```
m = Cache Size / Line Size
r = log₂(m)  [bits for index]
```

**2. Word Offset Bits:**
```
w = log₂(Line Size)  [bits for word offset]
```

**3. Tag Bits:**
```
Tag bits = s - r - w
Where: s = total address bits
```

**4. Mapping Formula:**
```
Cache Line = (Block Number) mod m
i = j mod m
Where: i = cache line, j = block number, m = number of lines
```

### Example Calculation

**Given:**
- Cache size: 64 bytes
- Line size: 8 bytes
- Address size: 12 bits

**Solution:**
```
Number of lines (m) = 64 / 8 = 8 = 2³
Index bits (r) = log₂(8) = 3 bits
Word offset bits (w) = log₂(8) = 3 bits
Tag bits = 12 - 3 - 3 = 6 bits

Address Format:
┌──────┬──────┬──────┐
│ Tag  │Index │ Word │
│ 6    │ 3    │ 3    │
└──────┴──────┴──────┘
```

---

## Fully Associative Cache Formulas

### Address Structure

```
┌──────────┬──────┐
│   Tag    │ Word │
│ (s bits) │(w bits)│
└──────────┴──────┘
```

### Formulas

**1. Number of Cache Lines:**
```
m = Cache Size / Line Size
```

**2. Word Offset Bits:**
```
w = log₂(Line Size)  [bits for word offset]
```

**3. Tag Bits:**
```
Tag bits = s - w
Where: s = total address bits
```

**4. Mapping:**
```
Block can be placed in ANY cache line
No index field needed
```

### Example Calculation

**Given:**
- Cache size: 128 bytes
- Line size: 8 bytes
- Address size: 14 bits

**Solution:**
```
Number of lines (m) = 128 / 8 = 16 lines
Word offset bits (w) = log₂(8) = 3 bits
Tag bits = 14 - 3 = 11 bits

Address Format:
┌──────────┬──────┐
│   Tag    │ Word │
│ 11 bits  │3 bits│
└──────────┴──────┘
```

---

## Set-Associative Cache Formulas

### Address Structure

```
┌──────────┬──────┬──────┐
│   Tag    │ Set  │ Word │
│(s-d bits)│(d bits)│(w bits)│
└──────────┴──────┴──────┘
```

### Formulas

**1. Number of Cache Lines:**
```
m = Cache Size / Line Size
```

**2. Number of Sets:**
```
Number of Sets = m / k
Where: k = associativity (ways per set)
d = log₂(Number of Sets)  [bits for set index]
```

**3. Word Offset Bits:**
```
w = log₂(Line Size)  [bits for word offset]
```

**4. Tag Bits:**
```
Tag bits = s - d - w
Where: s = total address bits
```

**5. Mapping Formula:**
```
Set Number = (Block Number) mod (Number of Sets)
Within set: Block can be in ANY of the k lines
```

### Example Calculation

**Given:**
- Cache size: 256 bytes
- Line size: 16 bytes
- Address size: 18 bits
- 4-way set associative

**Solution:**
```
Number of lines (m) = 256 / 16 = 16 lines
Number of sets = 16 / 4 = 4 sets = 2²
Set index bits (d) = log₂(4) = 2 bits
Word offset bits (w) = log₂(16) = 4 bits
Tag bits = 18 - 2 - 4 = 12 bits

Address Format:
┌──────────┬──────┬──────┐
│   Tag    │ Set  │ Word │
│ 12 bits  │2 bits│4 bits│
└──────────┴──────┴──────┘
```

---

## Cache Performance Formulas

### Average Memory Access Time (AMAT)

```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Where:**
- Hit Time: Time to access cache (typically 1-10 cycles)
- Miss Rate: Fraction of accesses that miss (0.0 to 1.0)
- Miss Penalty: Time to handle miss (typically 10-100+ cycles)

### Multi-Level Cache AMAT

```
AMAT = L1_Hit_Time + 
       L1_Miss_Rate × (L2_Hit_Time + 
       L2_Miss_Rate × (L3_Hit_Time + 
       L3_Miss_Rate × Memory_Access_Time))
```

### CPU Time with Cache

```
CPU Time = (CPU execution cycles + Memory stall cycles) × Clock cycle time

Memory Stall Cycles = (Instructions × I-cache miss rate × Miss penalty) + 
                      (Instructions × Load/store fraction × D-cache miss rate × Miss penalty)
```

### Effective CPI

```
CPI_actual = CPI_base + (I-cache miss rate × Miss penalty) + 
             (Load/store fraction × D-cache miss rate × Miss penalty)
```

---

## Step-by-Step Calculation Guide

### Method for Any Cache Mapping

**Step 1: Extract Given Information**
```
Cache Size = ? bytes
Line Size = ? bytes
Address Size = ? bits
Associativity = ? (for set-associative)
Addressable Unit = ? (usually 1 byte)
```

**Step 2: Calculate Cache Organization**
```
Number of Lines = Cache Size / Line Size
If set-associative:
  Number of Sets = Number of Lines / Associativity
```

**Step 3: Calculate Word Offset Bits**
```
Word Offset Bits = log₂(Line Size)
```

**Step 4: Calculate Index/Set Bits**
```
For Direct-Mapped:
  Index Bits = log₂(Number of Lines)

For Set-Associative:
  Set Bits = log₂(Number of Sets)

For Fully Associative:
  No Index/Set Bits (skip this step)
```

**Step 5: Calculate Tag Bits**
```
Tag Bits = Total Address Bits - Index/Set Bits - Word Offset Bits
```

**Step 6: Verify Calculation**
```
Tag Bits + Index/Set Bits + Word Offset Bits = Total Address Bits
```

**Step 7: Draw Address Format**
```
Show the breakdown with bit allocations
```

---

## Quick Reference Table

### Address Field Calculations

| Mapping Type | Word Bits | Index/Set Bits | Tag Bits |
|--------------|-----------|----------------|----------|
| **Direct-Mapped** | log₂(Line Size) | log₂(Number of Lines) | s - r - w |
| **Fully Associative** | log₂(Line Size) | 0 (none) | s - w |
| **Set-Associative** | log₂(Line Size) | log₂(Number of Sets) | s - d - w |

**Where:**
- s = total address bits
- r = index bits (direct-mapped)
- d = set bits (set-associative)
- w = word offset bits

### Cache Organization Formulas

| Parameter | Formula |
|-----------|---------|
| **Number of Lines** | Cache Size / Line Size |
| **Number of Sets** | Number of Lines / Associativity |
| **Block Number** | Address / Block Size |
| **Cache Line (Direct)** | Block Number mod (Number of Lines) |
| **Cache Set (Set-Assoc)** | Block Number mod (Number of Sets) |

---

## Detailed Examples

### Example 1: Direct-Mapped Cache

**Given:**
- Cache size: 128 bytes
- Line size: 16 bytes
- Address size: 16 bits

**Step-by-Step:**
```
1. Number of lines = 128 / 16 = 8 = 2³
2. Index bits (r) = log₂(8) = 3 bits
3. Word offset bits (w) = log₂(16) = 4 bits
4. Tag bits = 16 - 3 - 4 = 9 bits

Address Format:
┌──────┬──────┬──────┐
│ Tag  │Index │ Word │
│ 9    │ 3    │ 4    │
└──────┴──────┴──────┘
```

**Verification:** 9 + 3 + 4 = 16 bits ✓

---

### Example 2: 2-Way Set-Associative Cache

**Given:**
- Cache size: 64 bytes
- Line size: 8 bytes
- Address size: 12 bits
- 2-way set associative

**Step-by-Step:**
```
1. Number of lines = 64 / 8 = 8 lines
2. Number of sets = 8 / 2 = 4 sets = 2²
3. Set bits (d) = log₂(4) = 2 bits
4. Word offset bits (w) = log₂(8) = 3 bits
5. Tag bits = 12 - 2 - 3 = 7 bits

Address Format:
┌──────┬──────┬──────┐
│ Tag  │ Set  │ Word │
│ 7    │ 2    │ 3    │
└──────┴──────┴──────┘
```

**Verification:** 7 + 2 + 3 = 12 bits ✓

---

### Example 3: Fully Associative Cache

**Given:**
- Cache size: 256 bytes
- Line size: 32 bytes
- Address size: 20 bits

**Step-by-Step:**
```
1. Number of lines = 256 / 32 = 8 lines
2. Word offset bits (w) = log₂(32) = 5 bits
3. Tag bits = 20 - 5 = 15 bits
4. No index/set bits (fully associative)

Address Format:
┌──────────┬──────┐
│   Tag    │ Word │
│ 15 bits  │5 bits│
└──────────┴──────┘
```

**Verification:** 15 + 5 = 20 bits ✓

---

## Common Calculation Patterns

### Pattern 1: Finding Address Breakdown

**Given:** Cache parameters and address size
**Find:** Tag, Index/Set, Word bits

**Method:**
1. Calculate word bits from line size
2. Calculate index/set bits from cache organization
3. Tag bits = remaining bits

---

### Pattern 2: Finding Which Set/Line an Address Maps To

**Given:** Address and cache parameters
**Find:** Which cache line/set

**Method:**
1. Convert address to binary
2. Extract index/set bits from address
3. Convert to decimal = set/line number

**Example:**
```
Address: 10110₂ (5 bits)
Cache: 4 lines (2-bit index)
Index bits: bits 0-1 = 10₂ = 2
Maps to: Line 2
```

---

### Pattern 3: Finding Addresses That Map to Same Set/Line

**Given:** One address and cache parameters
**Find:** Other addresses mapping to same location

**Method:**
1. Determine which bits are index/set bits
2. Addresses with same index/set bits map to same location
3. Tag and word bits can vary

**Example (Direct-Mapped):**
```
Cache: 8 lines (3-bit index)
Address 1: 10110₂ → Index = 110₂ = 6
Address 2: ????110 → Any address ending in 110 maps to line 6
```

---

## Key Concepts and Methodology

### Concept 1: Address Field Purpose

**Tag Field:**
- Identifies which memory block is stored in cache line
- Compared with stored tag to determine hit/miss
- Larger tag = more unique blocks can be identified

**Index/Set Field:**
- Determines which cache line/set the block maps to
- Direct-mapped: exactly one line
- Set-associative: exactly one set (multiple lines within set)
- Fully associative: no index field (any line)

**Word/Offset Field:**
- Identifies which word/byte within the block
- Determined by block/line size
- Always present in all mapping techniques

---

### Concept 2: Mapping Relationship

**Direct-Mapped:**
- **One-to-One:** Each block maps to exactly one line
- **Formula:** `Line = Block mod (Number of Lines)`
- **Conflict:** Multiple blocks mapping to same line cause conflicts

**Set-Associative:**
- **One-to-Set:** Each block maps to exactly one set
- **Many-to-Line:** Within set, block can be in any of k lines
- **Formula:** `Set = Block mod (Number of Sets)`
- **Reduced Conflicts:** More flexibility than direct-mapped

**Fully Associative:**
- **Many-to-Any:** Block can be in any line
- **No Mapping Formula:** No restrictions on placement
- **No Conflicts:** Maximum flexibility

---

### Concept 3: Bit Allocation Strategy

**Total Address Bits = Tag Bits + Index/Set Bits + Word Bits**

**Priority Order:**
1. **Word Bits:** Fixed by block size (cannot change)
2. **Index/Set Bits:** Determined by cache organization
3. **Tag Bits:** Remaining bits (largest field typically)

**Trade-offs:**
- More index bits → More cache lines/sets → Better organization
- More tag bits → Can identify more unique blocks → Better hit rate
- Fixed total: Increasing one decreases the other

---

## Hexadecimal Address Analysis

### Method for Hex Addresses

**Step 1: Convert Hex to Binary**
```
Example: 3A5F₁₆ = 0011 1010 0101 1111₂
```

**Step 2: Identify Bit Positions**
```
Rightmost bit = bit 0 (LSB)
Leftmost bit = bit n-1 (MSB)
```

**Step 3: Extract Fields (Right to Left)**
```
Word bits: Rightmost w bits
Index/Set bits: Next r/d bits
Tag bits: Remaining leftmost bits
```

**Example:**
```
Address: 3A5F₁₆ = 0011 1010 0101 1111₂ (16 bits)
Cache: 4-way, 8 sets, 16-byte lines

Word bits: bits 0-3 (4 bits) = 1111₂
Set bits: bits 4-6 (3 bits) = 101₂ = Set 5
Tag bits: bits 7-15 (9 bits) = 0011 1010 0₂
```

---

## Comparator Calculations

### Number of Comparators

**Direct-Mapped:**
```
Comparators = 1
(Only one line to check)
```

**Fully Associative:**
```
Comparators = Number of Lines
(All lines must be checked)
```

**Set-Associative:**
```
Comparators = Associativity (k)
(Only lines in the set are checked)
```

### Comparator Size

**For All Mapping Types:**
```
Comparator Size = Tag Bits
(Compares tag field from address with stored tag)
```

---

## Verification Checklist

### After Calculating Address Breakdown

**✓ Check 1: Bit Total**
```
Tag + Index/Set + Word = Total Address Bits
```

**✓ Check 2: Cache Organization**
```
Number of Lines = 2^(Index/Set bits)
Number of Sets = 2^(Set bits) [for set-associative]
```

**✓ Check 3: Block Size**
```
Line Size = 2^(Word bits)
```

**✓ Check 4: Addressable Range**
```
2^(Total Address Bits) = Maximum Addressable Memory
```

---

## Common Mistakes to Avoid

### Mistake 1: Confusing Block Size with Word Size
- **Block/Line Size:** Total bytes per cache line
- **Word Size:** Size of data unit (often 4 or 8 bytes)
- **Word Offset:** Bits to address words within block

### Mistake 2: Forgetting Byte-Addressable
- Most systems are byte-addressable
- Word offset bits = log₂(block size in bytes)
- Not log₂(block size in words)

### Mistake 3: Set-Associative Index Calculation
- **Wrong:** Index bits = log₂(Number of Lines)
- **Correct:** Set bits = log₂(Number of Sets)
- Number of Sets = Number of Lines / Associativity

### Mistake 4: Tag Bit Calculation
- **Wrong:** Tag = Address bits - Index bits
- **Correct:** Tag = Address bits - Index/Set bits - Word bits
- Must subtract BOTH index/set AND word bits

---

## Quick Formula Summary

### Direct-Mapped Cache
```
Lines = Cache_Size / Line_Size
Index_Bits = log₂(Lines)
Word_Bits = log₂(Line_Size)
Tag_Bits = Address_Bits - Index_Bits - Word_Bits
```

### Set-Associative Cache (k-way)
```
Lines = Cache_Size / Line_Size
Sets = Lines / k
Set_Bits = log₂(Sets)
Word_Bits = log₂(Line_Size)
Tag_Bits = Address_Bits - Set_Bits - Word_Bits
```

### Fully Associative Cache
```
Lines = Cache_Size / Line_Size
Word_Bits = log₂(Line_Size)
Tag_Bits = Address_Bits - Word_Bits
```

---

## Practice Problem Template

### Standard Problem Format

**Given:**
- Cache size: X bytes
- Line size: Y bytes
- Address size: Z bits
- Associativity: k-way (if applicable)

**Find:**
1. Address format (tag, index/set, word bits)
2. Number of lines/sets
3. Which set/line an address maps to
4. Number and size of comparators

**Solution Template:**
```
Step 1: Calculate organization
Step 2: Calculate word bits
Step 3: Calculate index/set bits
Step 4: Calculate tag bits
Step 5: Verify total
Step 6: Answer specific questions
```

---

**End of Cache Formulas Sheet**
