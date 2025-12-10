# Group 4: Memory Architecture & Hierarchy
## Detailed Study Guide

**Chapters 4-5: The Memory Hierarchy & Cache Memory**
**Chapter 6: Internal Memory**

---

## Table of Contents
1. [Memory Characteristics and Classification](#memory-characteristics-and-classification)
2. [The Memory Hierarchy Concept](#the-memory-hierarchy-concept)
3. [Locality of Reference](#locality-of-reference)
4. [Cache Memory Fundamentals](#cache-memory-fundamentals)
5. [Cache Mapping Techniques](#cache-mapping-techniques)
6. [Cache Replacement Policies](#cache-replacement-policies)
7. [Write Policies](#write-policies)
8. [Cache Performance Analysis](#cache-performance-analysis)
9. [Multi-Level Caches](#multi-level-caches)
10. [Internal Memory: DRAM and SRAM](#internal-memory-dram-and-sram)
11. [Error Detection and Correction](#error-detection-and-correction)
12. [Advanced DRAM Technologies](#advanced-dram-technologies)
13. [Key Concepts Summary](#key-concepts-summary)
14. [Practice Problems and Examples](#practice-problems-and-examples)

---

## Memory Characteristics and Classification

### Key Characteristics of Memory Systems

Memory systems can be classified along several dimensions:

#### 1. Location

**CPU:**
- **Registers:** Fastest, smallest, most expensive
- Located directly in processor
- Used for temporary storage during execution

**Internal:**
- **Main Memory (RAM):** Primary storage
- **Cache Memory:** Fast buffer between CPU and main memory
- Accessible directly by processor

**External:**
- **Secondary Storage:** Disk drives, SSDs, tape
- Accessible via I/O controllers
- Persistent, non-volatile

#### 2. Capacity

**Word Size:**
- Natural unit of organization
- Common sizes: 8, 16, 32, 64 bits
- Determines how much data can be processed at once

**Number of Words/Bytes:**
- Total storage capacity
- External memory typically expressed in bytes (KB, MB, GB, TB)
- Internal memory may be expressed in words or bytes

**Relationship:**
- Address length (A bits) → 2^A addressable units
- Example: 20-bit address → 2^20 = 1,048,576 locations

#### 3. Unit of Transfer

**Internal Memory:**
- Usually governed by bus data width
- May equal word length, but often larger
- Example: 32-bit processor with 64-bit data bus

**External Memory:**
- Usually a **block** (much larger than a word)
- Example: Disk sectors (512 bytes, 4 KB, etc.)

**Addressable Unit:**
- Smallest location that can be uniquely addressed
- Typically: byte (8 bits) or word (16/32/64 bits)

#### 4. Access Methods

**Sequential Access:**
- Memory organized into records
- Must start at beginning and read through in order
- Access time variable, depends on location
- **Example:** Magnetic tape

**Direct Access:**
- Individual blocks have unique addresses
- Access by jumping to vicinity plus sequential search
- Access time depends on location and previous location
- **Example:** Magnetic disk

**Random Access:**
- Individual addresses identify locations exactly
- Access time independent of location or previous access
- **Example:** RAM, cache

**Associative Access:**
- Word retrieved based on portion of contents (not address)
- Access time independent of location or previous access
- **Example:** Cache (when searching by tag)

#### 5. Performance

**Access Time (Latency):**
- Time between presenting address and getting valid data
- Critical for performance
- Measured in nanoseconds (ns) or clock cycles

**Memory Cycle Time:**
- Time required for memory to "recover" before next access
- Access time + recovery time
- Concerned with system bus, not processor
- May be longer than access time

**Transfer Rate:**
- Rate at which data can be transferred into/out of memory
- Measured in bits/second or bytes/second
- For random-access memory: 1/(cycle time)
- Also called **bandwidth**

**Example:**
```
Access time: 50 ns
Cycle time: 100 ns
Transfer rate: 1/100ns = 10 MB/s (for 1-byte transfers)
```

#### 6. Physical Types

**Semiconductor Memory:**
- RAM (Random Access Memory)
- ROM (Read-Only Memory)
- Flash memory

**Magnetic Surface Memory:**
- Hard disk drives
- Magnetic tape

**Optical:**
- CD, DVD, Blu-ray

#### 7. Physical Characteristics

**Volatile vs. Nonvolatile:**

**Volatile Memory:**
- Information lost when power is switched off
- Requires continuous power to retain data
- **Examples:** DRAM, SRAM

**Nonvolatile Memory:**
- Information remains without deterioration
- No electrical power needed to retain information
- **Examples:** ROM, Flash, Magnetic disk

**Erasable vs. Nonerasable:**

**Nonerasable Memory:**
- Cannot be altered (except by destroying storage unit)
- **Example:** ROM (Read-Only Memory)

**Erasable Memory:**
- Can be written and rewritten
- **Examples:** RAM, EEPROM, Flash

---

## The Memory Hierarchy Concept

### The Memory Dilemma

**Design Constraints:**
- **How much?** (Capacity)
- **How fast?** (Access time)
- **How expensive?** (Cost per bit)

**The Trade-off:**
- **Faster access time** → **Greater cost per bit**
- **Greater capacity** → **Smaller cost per bit**
- **Greater capacity** → **Slower access time**

**The Problem:**
- We want: Large capacity, fast access, low cost
- But: Can't have all three simultaneously!

### The Solution: Memory Hierarchy

**Concept:** Use multiple levels of memory with different speeds and sizes.

**Principle:** Store frequently accessed data in fast, expensive memory; store bulk data in slow, cheap memory.

### Memory Hierarchy Levels

**From Fastest/Smallest/Most Expensive to Slowest/Largest/Cheapest:**

```
Level 1: CPU Registers
    ↓
Level 2: Cache Memory (L1, L2, L3)
    ↓
Level 3: Main Memory (DRAM)
    ↓
Level 4: Secondary Storage (Disk, SSD)
    ↓
Level 5: Tertiary Storage (Tape, Optical)
```

### Hierarchy Characteristics

**Going Down the Hierarchy:**

1. **Decreasing cost per bit**
   - Registers: Very expensive
   - Cache: Expensive
   - Main memory: Moderate cost
   - Disk: Cheap

2. **Increasing capacity**
   - Registers: ~32-64 words
   - Cache: KB to MB
   - Main memory: GB
   - Disk: TB

3. **Increasing access time**
   - Registers: 1 cycle (nanoseconds)
   - Cache: 1-10 cycles (nanoseconds)
   - Main memory: 50-100 cycles (nanoseconds)
   - Disk: Millions of cycles (milliseconds)

4. **Decreasing frequency of access**
   - Most accesses: Registers
   - Many accesses: Cache
   - Some accesses: Main memory
   - Few accesses: Disk

### Hierarchy Example

**Typical System:**
- **L1 Cache:** 32 KB, 1 cycle access, $100/GB
- **L2 Cache:** 256 KB, 5 cycles access, $50/GB
- **L3 Cache:** 8 MB, 20 cycles access, $10/GB
- **Main Memory:** 16 GB, 100 cycles access, $1/GB
- **Disk:** 1 TB, 10,000,000 cycles access, $0.01/GB

**Access Distribution:**
- 95% from L1 cache
- 4.999% from L2 cache
- 0.001% from L3 cache
- 0.000005% from main memory
- Even fewer from disk

**Average Access Time Calculation:**
```
AMAT = 0.95 × 1 + 0.04999 × 5 + 0.00001 × 20 + 0.00000005 × 100
     = 0.95 + 0.25 + 0.0002 + 0.000005
     ≈ 1.2 cycles
```

**Key Insight:** Average access time is much closer to L1 access time (1 cycle) than main memory (100 cycles)!

---

## Locality of Reference

### What is Locality?

**Definition:** During program execution, memory references tend to **cluster**.

**Observation:** Programs access a **small proportion** of their address space at any given time.

### Two Types of Locality

#### 1. Temporal Locality

**Definition:** Items accessed **recently** are likely to be accessed again **soon**.

**Principle:** If an item is referenced, it will tend to be referenced again soon.

**Examples:**
- **Loop instructions:** Same instructions executed repeatedly
- **Reused variables:** Variables accessed multiple times
- **Function calls:** Same functions called repeatedly

**Example:**
```c
for (i = 0; i < 1000; i++) {
    sum = sum + array[i];  // 'sum' accessed every iteration
}
```

#### 2. Spatial Locality

**Definition:** Items **near** those accessed recently are likely to be accessed soon.

**Principle:** If an item is referenced, items whose addresses are close by will tend to be referenced soon.

**Examples:**
- **Sequential instruction access:** Instructions stored sequentially
- **Array data:** Array elements stored contiguously
- **Stack operations:** Stack grows/shrinks sequentially

**Example:**
```c
for (i = 0; i < 1000; i++) {
    sum = sum + array[i];  // array[i], array[i+1], array[i+2] accessed sequentially
}
```

### Exploiting Locality

**Memory Hierarchy Strategy:**

1. **Store everything on disk** (cheap, large, slow)

2. **Copy recently accessed items to main memory:**
   - Exploits temporal locality (recent items likely needed again)
   - Main memory faster than disk

3. **Copy more recently accessed items to cache:**
   - Exploits temporal locality further
   - Cache faster than main memory

4. **Copy nearby items when accessing:**
   - Exploits spatial locality
   - When accessing one word, bring in entire block
   - Adjacent words likely to be accessed soon

**Result:** Most accesses satisfied by fast memory (cache), few require slow memory (disk).

---

## Cache Memory Fundamentals

### What is Cache?

**Definition:** A small amount of fast memory located between the processor and main memory.

**Purpose:** 
- Store recently accessed data and instructions
- Reduce average memory access time
- Bridge the speed gap between CPU and main memory

**Characteristics:**
- **Small:** Typically KB to MB
- **Fast:** 1-10 cycles access time
- **Expensive:** High cost per bit
- **On-chip:** Often located on CPU chip

### Cache Operation Overview

#### Read Operation:

1. **CPU requests** contents of memory location
2. **Check cache** for data
3. **If present (Hit):**
   - Get data from cache (fast)
   - Deliver to CPU
4. **If not present (Miss):**
   - Read required **block** from main memory
   - Load block into cache
   - Deliver requested word to CPU

#### Write Operation:

1. **CPU writes** data to memory location
2. **Check cache** for location
3. **If present (Hit):**
   - Update cache
   - May update main memory (depending on write policy)
4. **If not present (Miss):**
   - Load block into cache
   - Update cache
   - May update main memory

### Key Definitions

#### Block (Line)

**Definition:** Unit of data transfer between cache and main memory.

**Characteristics:**
- May be multiple words
- Typically 16-128 bytes
- When one word is accessed, entire block is brought into cache

**Why Blocks?**
- Exploits spatial locality
- Reduces number of memory accesses
- More efficient than word-by-word transfer

#### Hit

**Definition:** Access satisfied by upper level (cache).

**Hit Ratio:** `hits / total_accesses`

**Example:**
- 1000 memory accesses
- 950 satisfied by cache
- Hit ratio = 950/1000 = 0.95 = 95%

#### Miss

**Definition:** Block not present in cache, must be copied from lower level (main memory).

**Miss Ratio:** `misses / total_accesses = 1 - hit_ratio`

**Example:**
- Hit ratio = 95%
- Miss ratio = 5%

#### Miss Penalty

**Definition:** Time taken to handle a miss.

**Components:**
- Time to access main memory
- Time to transfer block to cache
- Time to deliver data to CPU

**Typical:** 10-100+ cycles

### Cache Organization

**Structure:**
```
Cache Line:
┌──────┬──────┬──────────┐
│ Valid│ Tag  │   Data   │
│ Bit  │      │  (Block) │
└──────┴──────┴──────────┘
```

**Components:**
- **Valid Bit:** Indicates if line contains valid data
- **Tag:** Identifies which memory block is stored
- **Data:** The actual data block

**Example:**
```
Line 0: [V=1] [Tag=0x1234] [Data: word0, word1, word2, word3]
Line 1: [V=0] [Tag=----]    [Data: ----]
Line 2: [V=1] [Tag=0x5678] [Data: word0, word1, word2, word3]
```

---

## Cache Mapping Techniques

### The Mapping Problem

**Problem:** There are fewer cache lines than main memory blocks.

**Question:** How do we map main memory blocks to cache lines?

**Example:**
- Main memory: 1 million blocks
- Cache: 1,000 lines
- Each block must map to one or more possible cache lines

### Three Mapping Techniques

#### 1. Direct Mapping

**Concept:** Each block of main memory maps to **exactly one** cache line.

**Mapping Formula:** `i = j mod m`
- `i` = cache line number
- `j` = main memory block number
- `m` = number of lines in cache

**Address Structure:**
```
┌──────────┬──────┬──────┐
│   Tag    │ Line │ Word │
│ (s-r bits)│(r bits)│(w bits)│
└──────────┴──────┴──────┘
```

**Fields:**
- **Tag:** High-order bits identifying which block
- **Line:** Cache line number (low-order bits of block address)
- **Word:** Word offset within block

**Example:**
- Cache: 8 lines (3 bits for line number)
- Block size: 1 word (0 bits for word offset)
- Address: 22 (binary: 10110)

**Breaking down address 22:**
```
Binary: 1 0 1 1 0
        │ │ └─┴─┘
        │ │   └─► Line = 110 (binary) = 6
        └─┴──────► Tag = 10 (binary) = 2
```

**Operation:**
1. Extract line number from address
2. Check if valid bit is set
3. Compare tag in cache with tag from address
4. If match: **Hit** (data in cache)
5. If no match: **Miss** (load block from memory)

**Advantages:**
- **Simple:** Easy to implement
- **Fast:** Direct lookup (no search needed)
- **Inexpensive:** Minimal hardware

**Disadvantages:**
- **Fixed location:** Any given block can only be in one specific line
- **Thrashing:** If program accesses blocks that map to same line repeatedly, constant misses
- **Low flexibility:** No choice in placement

**Thrashing Example:**
```
Blocks 0, 8, 16, 24 all map to line 0 (0 mod 8 = 0, 8 mod 8 = 0, etc.)
Accessing: 0, 8, 0, 8, 0, 8...
Result: Constant misses (each access evicts previous block)
```

#### 2. Fully Associative Mapping

**Concept:** A main memory block can load into **any line** of cache.

**Address Structure:**
```
┌──────────┬──────┐
│   Tag    │ Word │
│ (s bits) │(w bits)│
└──────────┴──────┘
```

**Fields:**
- **Tag:** Full block address (no line field needed)
- **Word:** Word offset within block

**Operation:**
1. Extract tag from address
2. **Search all cache lines** for matching tag
3. If found: **Hit**
4. If not found: **Miss** (load into any available line)

**Advantages:**
- **Maximum flexibility:** Block can be placed anywhere
- **No thrashing:** No conflicts between blocks
- **Best hit ratio:** Optimal placement possible

**Disadvantages:**
- **Expensive:** Requires comparators for all lines
- **Slow:** Must search all lines (parallel search needed for speed)
- **Complex:** More hardware complexity

**Hardware Requirements:**
- N comparators (one per cache line)
- Parallel tag comparison
- More expensive as cache size increases

#### 3. Set-Associative Mapping

**Concept:** Compromise between direct and fully associative.

**Organization:**
- Cache divided into **sets**
- Each set contains **k lines** (k-way set associative)
- Block maps to **one specific set**, but can be placed in **any line within that set**

**Mapping:**
- Set number: `(Block number) mod (Number of sets)`
- Within set: Any of k lines

**Address Structure:**
```
┌──────────┬──────┬──────┐
│   Tag    │ Set  │ Word │
│(s-d bits)│(d bits)│(w bits)│
└──────────┴──────┴──────┘
```

**Fields:**
- **Tag:** Identifies block within set
- **Set:** Set number (determines which set)
- **Word:** Word offset within block

**Example - 2-Way Set Associative:**
- Cache: 8 lines total
- Sets: 4 sets (2 lines per set)
- Block 12: 12 mod 4 = 0 → Set 0, can be in either line of Set 0

**Operation:**
1. Extract set number from address
2. Search **only lines in that set** for matching tag
3. If found: **Hit**
4. If not found: **Miss** (load into any available line in set)

**Advantages:**
- **Good flexibility:** Multiple choices per block
- **Reasonable cost:** Only k comparators needed (not all lines)
- **Better than direct:** Reduces thrashing
- **Better than fully associative:** Lower cost, faster

**Disadvantages:**
- **More complex than direct:** Requires set selection and search
- **More expensive than direct:** Needs k comparators
- **Less flexible than fully associative:** Limited to k choices

**Common Configurations:**
- **2-way:** 2 lines per set (common, good balance)
- **4-way:** 4 lines per set (very common)
- **8-way:** 8 lines per set (high-end processors)

### Comparison of Mapping Techniques

| Technique | Flexibility | Cost | Speed | Thrashing |
|-----------|-------------|------|-------|-----------|
| Direct | Low | Lowest | Fastest | High |
| Set-Associative | Medium | Medium | Medium | Low |
| Fully Associative | High | Highest | Slowest | None |

**Modern Practice:** Most processors use **set-associative** (typically 2-8 way) for good balance.

### Associativity Spectrum

**For a cache with 8 entries:**

- **Direct (1-way):** 8 sets, 1 line per set
- **2-way:** 4 sets, 2 lines per set
- **4-way:** 2 sets, 4 lines per set
- **8-way (Fully Associative):** 1 set, 8 lines per set

**Key Insight:** Direct mapping and fully associative are special cases of set-associative!

---

## Cache Replacement Policies

### When Replacement is Needed

**Situation:** Cache is full, new block must be loaded.

**Direct Mapping:**
- **No choice:** Only one possible line
- Replacement is automatic

**Associative/Set-Associative:**
- **Choice available:** Which line to replace?
- Need **replacement algorithm**

### Replacement Algorithms

#### 1. Least Recently Used (LRU)

**Principle:** Replace the block that has been in cache **longest without reference**.

**Implementation:**
- Track access order for each set
- Replace least recently accessed block

**Advantages:**
- **Most effective:** Exploits temporal locality
- **Good hit ratio:** Keeps recently used blocks

**Disadvantages:**
- **Complexity:** Requires tracking access history
- **Hardware cost:** Counters or state machines needed

**Example:**
```
Set with blocks: A, B, C
Access order: A, B, A, C, B
Next miss: Replace C (least recently used)
```

#### 2. First-In-First-Out (FIFO)

**Principle:** Replace the block that has been in cache **longest** (regardless of recent use).

**Implementation:**
- Round-robin or circular buffer
- Replace oldest block

**Advantages:**
- **Simple:** Easy to implement
- **Low cost:** Minimal hardware

**Disadvantages:**
- **Less effective:** Doesn't consider recent usage
- **May evict frequently used blocks**

**Example:**
```
Blocks loaded: A, B, C (in that order)
Next miss: Replace A (first in)
```

#### 3. Least Frequently Used (LFU)

**Principle:** Replace the block with **fewest references**.

**Implementation:**
- Counter for each block
- Increment on access
- Replace block with lowest count

**Advantages:**
- **Considers usage frequency:** Keeps frequently used blocks

**Disadvantages:**
- **Complexity:** Counters needed
- **May keep old blocks:** Blocks accessed many times long ago

**Example:**
```
Block A: 10 accesses
Block B: 5 accesses
Block C: 2 accesses
Next miss: Replace C (least frequently used)
```

#### 4. Random

**Principle:** Replace a **randomly selected** block.

**Implementation:**
- Random number generator
- Select random line in set

**Advantages:**
- **Very simple:** Minimal hardware
- **No tracking needed**

**Disadvantages:**
- **Poor performance:** No locality consideration
- **Unpredictable:** May evict important blocks

**Use:** Rarely used, mainly for comparison

### Algorithm Comparison

**Effectiveness (Best to Worst):**
1. LRU (most effective)
2. LFU
3. FIFO
4. Random (least effective)

**Complexity (Simplest to Most Complex):**
1. Random (simplest)
2. FIFO
3. LRU
4. LFU (most complex)

**Modern Practice:** **LRU** is most popular due to good effectiveness and reasonable implementation cost.

---

## Write Policies

### The Write Problem

**Issue:** When CPU writes to cache, main memory must eventually be updated.

**Questions:**
- When should main memory be updated?
- What if cache block is replaced before being written to memory?
- What if multiple devices access main memory?

### Two Write Policies

#### 1. Write Through

**Principle:** Every write to cache **also writes to main memory** immediately.

**Operation:**
```
CPU Write → Update Cache → Update Main Memory (simultaneously)
```

**Advantages:**
- **Simple:** Straightforward implementation
- **Consistency:** Cache and memory always consistent
- **I/O compatibility:** I/O devices can read directly from memory

**Disadvantages:**
- **High memory traffic:** Every write goes to memory
- **Slow writes:** Memory access is slow
- **Bottleneck:** Memory bus becomes bottleneck

**Performance Impact:**
```
Base CPI = 1
10% of instructions are stores
Memory write takes 100 cycles

Effective CPI = 1 + 0.1 × 100 = 11
(11x slower!)
```

**Solution: Write Buffer**
- Hold data waiting to be written
- CPU continues immediately
- Only stalls if buffer is full
- Reduces performance penalty

#### 2. Write Back

**Principle:** Write only to cache initially. Write to memory only when block is replaced.

**Operation:**
```
CPU Write → Update Cache (only)
When block replaced → Write to memory (if dirty)
```

**Dirty Bit:**
- Indicates if block has been modified
- Set when block is written
- Checked when block is replaced
- If dirty: Write to memory before replacement

**Advantages:**
- **Minimizes memory writes:** Only dirty blocks written
- **Faster writes:** No memory access during write
- **Better performance:** Lower memory traffic

**Disadvantages:**
- **Complexity:** Need dirty bit tracking
- **Inconsistency:** Cache and memory may differ
- **I/O issues:** I/O must go through cache or use cache coherency

**Performance Impact:**
```
Base CPI = 1
10% of instructions are stores
Only 20% of replaced blocks are dirty
Memory write takes 100 cycles
Miss rate = 2%

Effective CPI = 1 + 0.02 × 0.2 × 100 = 1.4
(Much better than write through!)
```

### Write Allocation

**Question:** On write miss, should we load block into cache?

**Write Allocate (Fetch on Write Miss):**
- Load block into cache
- Update cache
- Use with write back

**No Write Allocate (Write Around):**
- Write directly to memory
- Don't load into cache
- Use with write through

**Modern Practice:**
- **Write back + Write allocate:** Most common
- **Write through + No write allocate:** Less common

### Cache Coherency

**Problem:** Multiple devices may access same memory.

**Scenarios:**
1. **I/O and CPU:** I/O writes to memory, cache has stale data
2. **Multiple CPUs:** Each has own cache, one CPU writes, others have stale data

**Solutions:**
- **Snooping:** Caches monitor bus for writes
- **Invalidation:** Mark cache lines as invalid when written by others
- **Update:** Update cache lines when written by others
- **Cache coherency protocols:** MESI (Modified, Exclusive, Shared, Invalid)

---

## Cache Performance Analysis

### Performance Metrics

#### Average Memory Access Time (AMAT)

**Formula:**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Components:**
- **Hit Time:** Time to access cache (typically 1-10 cycles)
- **Miss Rate:** Fraction of accesses that miss (0.0 to 1.0)
- **Miss Penalty:** Time to handle miss (typically 10-100+ cycles)

**Example:**
```
Hit time = 1 cycle
Miss rate = 5% = 0.05
Miss penalty = 100 cycles

AMAT = 1 + 0.05 × 100 = 1 + 5 = 6 cycles
```

**Key Insight:** Even with 5% miss rate, average access time is 6x hit time!

#### CPU Time

**Formula:**
```
CPU Time = (CPU execution cycles + Memory stall cycles) × Clock cycle time
```

**Memory Stall Cycles:**
```
Memory stall cycles = (Instruction miss cycles) + (Data miss cycles)
```

**Instruction Miss Cycles:**
```
Instruction miss cycles = (Instructions) × (I-cache miss rate) × (Miss penalty)
```

**Data Miss Cycles:**
```
Data miss cycles = (Instructions) × (Load/store fraction) × (D-cache miss rate) × (Miss penalty)
```

#### Effective CPI

**Formula:**
```
CPI_actual = CPI_base + (Memory stall cycles per instruction)
```

**Memory Stall Cycles per Instruction:**
```
Stall cycles = (I-cache miss rate × Miss penalty) + 
               (Load/store fraction × D-cache miss rate × Miss penalty)
```

**Example:**
```
Base CPI = 3
I-cache miss rate = 4% = 0.04
D-cache miss rate = 8% = 0.08
Load/store fraction = 60% = 0.6
Miss penalty = 125 cycles

CPI_actual = 3 + (0.04 × 125) + (0.6 × 0.08 × 125)
           = 3 + 5 + 6
           = 14 cycles
```

**Performance Impact:** Cache misses increase CPI from 3 to 14 (4.7x slower)!

### Improving Cache Performance

**Strategies:**

1. **Reduce Miss Rate:**
   - Larger cache
   - Higher associativity
   - Better replacement algorithm
   - Larger block size (up to a point)

2. **Reduce Miss Penalty:**
   - Faster main memory
   - Multi-level caches
   - Write buffers

3. **Reduce Hit Time:**
   - Smaller cache
   - Lower associativity
   - On-chip cache

**Trade-offs:**
- Larger cache → Lower miss rate, but higher hit time
- Higher associativity → Lower miss rate, but higher hit time
- Larger blocks → Better spatial locality, but fewer blocks fit

---

## Multi-Level Caches

### Why Multiple Levels?

**Problem:** Single cache must balance:
- **Size:** Large enough for good hit rate
- **Speed:** Small enough for fast access

**Solution:** Use **multiple cache levels** with different characteristics.

### Two-Level Cache Organization

**L1 Cache (Level 1):**
- **Location:** On CPU chip
- **Size:** Small (8-64 KB)
- **Speed:** Very fast (1-2 cycles)
- **Characteristics:**
  - Split instruction and data caches
  - Very close to processor
  - Fastest access

**L2 Cache (Level 2):**
- **Location:** On CPU chip or off-chip
- **Size:** Medium (256 KB - 8 MB)
- **Speed:** Fast (5-20 cycles)
- **Characteristics:**
  - Services misses from L1
  - Larger than L1
  - Slower than L1, but faster than main memory

**L3 Cache (Level 3):**
- **Location:** On CPU chip or off-chip
- **Size:** Large (8-64 MB)
- **Speed:** Moderate (20-50 cycles)
- **Characteristics:**
  - Services misses from L2
  - Shared among multiple cores
  - Larger than L2

**Main Memory:**
- **Location:** Off-chip
- **Size:** Very large (GB)
- **Speed:** Slow (50-100+ cycles)
- **Characteristics:**
  - Services misses from L3
  - Largest capacity
  - Slowest access

### Multi-Level Cache Operation

**Access Flow:**
```
CPU Request
    ↓
Check L1 Cache
    ↓ (Miss)
Check L2 Cache
    ↓ (Miss)
Check L3 Cache
    ↓ (Miss)
Access Main Memory
```

**Hit at L1:** Fastest (1-2 cycles)
**Hit at L2:** Fast (5-20 cycles)
**Hit at L3:** Moderate (20-50 cycles)
**Miss (Main Memory):** Slow (50-100+ cycles)

### Multi-Level Performance

**Example Calculation:**

**Given:**
- Base CPI = 1
- Clock rate = 4 GHz (0.25 ns per cycle)
- L1 miss rate = 2%
- L2 access time = 5 ns
- L2 global miss rate = 0.5%
- Main memory access time = 100 ns

**Without L2:**
```
Miss penalty = 100 ns / 0.25 ns = 400 cycles
CPI = 1 + 0.02 × 400 = 9
```

**With L2:**
```
L1 miss, L2 hit penalty = 5 ns / 0.25 ns = 20 cycles
L1 miss, L2 miss penalty = 100 ns / 0.25 ns = 400 cycles
CPI = 1 + 0.02 × 20 + 0.005 × 400
    = 1 + 0.4 + 2
    = 3.4
```

**Performance Improvement:** 9/3.4 = 2.6x faster!

### Unified vs. Split Caches

**Unified Cache:**
- Single cache for both instructions and data
- **Advantages:**
  - Higher hit rate (balances load automatically)
  - Simpler design
- **Disadvantages:**
  - Contention between instruction fetch and data access
  - Problematic for pipelining

**Split Cache:**
- Separate instruction cache (I-cache) and data cache (D-cache)
- **Advantages:**
  - No contention
  - Better for pipelining
  - Can optimize each separately
- **Disadvantages:**
  - Lower hit rate (fixed allocation)
  - More complex

**Modern Practice:**
- **L1:** Split (I-cache and D-cache)
- **L2/L3:** Unified (shared)

---

## Internal Memory: DRAM and SRAM

### Semiconductor Memory Overview

**Two Main Types:**

1. **RAM (Random Access Memory):**
   - Read/Write
   - Volatile
   - Temporary storage
   - Static (SRAM) or Dynamic (DRAM)

2. **ROM (Read-Only Memory):**
   - Read-only (mostly)
   - Nonvolatile
   - Permanent storage
   - Various types (ROM, PROM, EPROM, EEPROM, Flash)

### Dynamic RAM (DRAM)

#### Structure

**Basic Cell:**
- **Capacitor:** Stores charge (1) or no charge (0)
- **Transistor:** Switch to access capacitor

**Operation:**
- **Write:** Apply voltage to bit line, activate address line, charge/discharge capacitor
- **Read:** Activate address line, sense charge on capacitor, restore charge

#### Characteristics

**Storage Mechanism:**
- Bits stored as **charge in capacitors**
- Presence/absence of charge = binary 1/0
- **Essentially analogue:** Level of charge determines value

**Key Properties:**
- **Charges leak:** Capacitors lose charge over time
- **Needs refreshing:** Periodic refresh to maintain data
- **Dynamic:** Stored charge leaks away even with power

**Refresh Requirements:**
- Must refresh every few milliseconds (typically 64 ms)
- Refresh circuit included on chip
- Refresh process:
  1. Disable chip
  2. Count through rows
  3. Read and write back each row
  4. Takes time, slows performance

**Advantages:**
- **Simpler construction:** Fewer transistors per cell
- **Smaller per bit:** Higher density
- **Less expensive:** Lower cost
- **High capacity:** Good for main memory

**Disadvantages:**
- **Needs refresh circuits:** Additional complexity
- **Slower:** Refresh overhead
- **More complex timing:** Refresh cycles

**Use:** **Main memory** (large capacity needed, cost-sensitive)

### Static RAM (SRAM)

#### Structure

**Basic Cell:**
- **Flip-flop circuit:** Two cross-coupled inverters
- **Transistor arrangement:** Provides stable logic state
- **No capacitor:** State maintained by circuit

**Operation:**
- **State 1:** C1 high, C2 low (T1, T4 off; T2, T3 on)
- **State 0:** C2 high, C1 low (T2, T3 off; T1, T4 on)
- **Write:** Apply value to bit lines
- **Read:** Sense value on bit line

#### Characteristics

**Storage Mechanism:**
- Bits stored as **on/off switches** (flip-flops)
- Digital: Clear 1 or 0 state
- **No charges to leak:** State maintained by circuit

**Key Properties:**
- **No refresh needed:** Maintains state as long as powered
- **Faster:** No refresh overhead
- **More complex:** More transistors per cell

**Advantages:**
- **No refresh needed:** Simpler operation
- **Faster:** Lower access time
- **Simpler timing:** No refresh cycles

**Disadvantages:**
- **More complex construction:** More transistors
- **Larger per bit:** Lower density
- **More expensive:** Higher cost

**Use:** **Cache memory** (speed critical, smaller capacity)

### SRAM vs. DRAM Comparison

| Characteristic | SRAM | DRAM |
|----------------|------|------|
| **Storage** | Flip-flop | Capacitor |
| **Refresh** | Not needed | Required |
| **Speed** | Fast (1-5 ns) | Slower (50-100 ns) |
| **Density** | Low | High |
| **Cost per bit** | High | Low |
| **Power** | Higher | Lower |
| **Use** | Cache | Main memory |
| **Cell complexity** | 6 transistors | 1 transistor + 1 capacitor |

**Key Insight:** SRAM is faster but more expensive. DRAM is cheaper but slower. Use SRAM for small, fast cache; DRAM for large, cheap main memory.

### DRAM Organization

**Internal Structure:**
- Organized as **2D array** of cells
- **Row and column addressing:**
  - Reduces number of address pins
  - Multiplex row and column addresses
  - Example: 2048 × 2048 × 4 bits = 16 Mbit chip
  - Only 11 address pins needed (2^11 = 2048)

**Module Organization:**
- Multiple chips combined to form memory module
- Example: 256 KB module = 8 chips × 32 Kbit each
- Example: 1 MB module = 8 chips × 1 Mbit each

**Interleaved Memory:**
- Multiple memory banks
- Each bank can service requests independently
- Consecutive words stored in different banks
- **K banks** can service **K requests** simultaneously
- Increases memory bandwidth

---

## Error Detection and Correction

### Why Error Correction?

**Problem:** Memory can have errors.

**Types of Errors:**

1. **Hard Failure:**
   - Permanent defect
   - Manufacturing defect
   - Physical damage

2. **Soft Error:**
   - Random, non-destructive
   - Caused by:
     - Alpha particles
     - Cosmic rays
     - Electrical noise
   - No permanent damage
   - Data corruption

### Hamming Error Correcting Code

**Purpose:** Detect and correct single-bit errors.

**Principle:**
- Add **check bits** (redundancy) to data
- Check bits encode information about data bits
- Can detect and correct errors

**Hamming Distance:**
- Minimum number of bit positions in which two code words differ
- For single-bit error correction: Minimum distance = 3

**Implementation:**
- Check bits placed at positions that are powers of 2 (1, 2, 4, 8, ...)
- Each check bit covers specific data bits
- Check bits calculated using XOR operations

**Example - 8-bit data:**
- Need 4 check bits (positions 1, 2, 4, 8)
- Total: 12 bits (8 data + 4 check)

**Error Detection:**
- Recalculate check bits from data
- Compare with stored check bits
- If different: Error detected
- Pattern indicates which bit is wrong

**Error Correction:**
- Error pattern identifies bit position
- Flip that bit to correct error

**Overhead:**
- More bits needed (redundancy)
- Example: 8 data bits → 12 total bits (50% overhead)
- Larger data words: Lower overhead percentage

---

## Advanced DRAM Technologies

### Traditional DRAM Limitations

**Problems:**
- **Internal architecture:** Slow access patterns
- **Interface:** Asynchronous, processor must wait
- **Bottleneck:** Memory interface limits performance

### Synchronous DRAM (SDRAM)

**Key Innovation:** Access synchronized with external clock.

**Operation:**
1. Address presented to RAM
2. RAM finds data
3. **CPU knows when data will be ready** (synchronized with clock)
4. CPU doesn't have to wait (can do other work)

**Burst Mode:**
- Set up stream of data
- Fire out data in block
- More efficient than single-word transfers

**Advantages:**
- Predictable timing
- CPU can pipeline other operations
- Better bandwidth utilization

### Double Data Rate SDRAM (DDR SDRAM)

**Key Innovation:** Sends data **twice per clock cycle**.

**How:**
- Data transfer on **both rising and falling edge** of clock
- Doubles data rate compared to SDRAM

**Achieves Higher Rates Through:**
1. **Double clocking:** Data on both edges
2. **Higher bus clock rate:** Faster interface
3. **Buffering scheme:** Prefetch and buffer data

**Generations:**
- **DDR:** 2x SDRAM
- **DDR2:** 2x DDR (4x SDRAM)
- **DDR3:** 2x DDR2 (8x SDRAM)
- **DDR4:** 2x DDR3 (16x SDRAM)
- **DDR5:** 2x DDR4 (32x SDRAM)

**Each Generation:**
- Higher data rates
- Lower voltage (power efficiency)
- Better signal integrity
- More features

### Other Advanced Technologies

**DDR Variations:**
- **GDDR:** Graphics DDR (for GPUs)
- **LPDDR:** Low Power DDR (for mobile devices)

**Future Technologies:**
- **HBM (High Bandwidth Memory):** 3D stacked memory
- **HMC (Hybrid Memory Cube):** Advanced 3D memory

---

## Key Concepts Summary

### Memory Hierarchy Principles

1. **Trade-offs:** Speed, capacity, cost cannot all be optimized simultaneously
2. **Hierarchy Solution:** Use multiple levels with different characteristics
3. **Locality:** Temporal and spatial locality enable hierarchy to work
4. **Performance:** Average access time much closer to fast memory than slow memory

### Cache Fundamentals

1. **Purpose:** Bridge speed gap between CPU and main memory
2. **Operation:** Store recently accessed blocks
3. **Metrics:** Hit rate, miss rate, miss penalty
4. **Performance:** AMAT = Hit time + (Miss rate × Miss penalty)

### Cache Design

1. **Mapping:** Direct, associative, set-associative (trade-offs)
2. **Replacement:** LRU most effective, but more complex
3. **Write Policy:** Write back better performance, write through simpler
4. **Size:** Larger = better hit rate, but slower hit time

### Memory Technologies

1. **DRAM:** Cheap, dense, needs refresh, used for main memory
2. **SRAM:** Fast, expensive, no refresh, used for cache
3. **Error Correction:** Hamming codes detect and correct errors
4. **Advanced DRAM:** SDRAM, DDR improve performance

---

## Practice Problems and Examples

### Problem 1: Cache Address Breakdown

**Question:** A direct-mapped cache has 32 lines, block size 8 bytes. Main memory is 16 MB. How is a 24-bit address divided?

**Solution:**
- Cache lines: 32 = 2^5 → 5 bits for line
- Block size: 8 bytes = 2^3 → 3 bits for word offset
- Tag: 24 - 5 - 3 = 16 bits

**Answer:**
- Tag: 16 bits
- Line: 5 bits
- Word: 3 bits

### Problem 2: AMAT Calculation

**Question:** Cache has hit time 2 ns, miss rate 3%, miss penalty 50 ns. What is AMAT?

**Solution:**
```
AMAT = Hit time + (Miss rate × Miss penalty)
     = 2 + (0.03 × 50)
     = 2 + 1.5
     = 3.5 ns
```

**Answer:** 3.5 ns

### Problem 3: CPI with Cache

**Question:** Base CPI = 2, I-cache miss rate = 2%, D-cache miss rate = 5%, 40% loads/stores, miss penalty = 100 cycles. What is actual CPI?

**Solution:**
```
Instruction miss cycles = 0.02 × 100 = 2
Data miss cycles = 0.4 × 0.05 × 100 = 2
CPI_actual = 2 + 2 + 2 = 6
```

**Answer:** CPI = 6

### Problem 4: Set-Associative Mapping

**Question:** 4-way set associative cache, 64 lines total. How many sets? Block 100 maps to which set?

**Solution:**
- Total lines: 64
- Ways per set: 4
- Number of sets: 64 / 4 = 16 sets
- Set bits: log2(16) = 4 bits
- Block 100: 100 mod 16 = 4 → Set 4

**Answer:** 16 sets, Block 100 → Set 4

### Problem 5: Multi-Level Cache

**Question:** L1 hit time = 1 cycle, miss rate = 5%, L2 hit time = 10 cycles, global miss rate = 1%, main memory = 100 cycles. What is AMAT?

**Solution:**
```
L1 hit: 0.95 × 1 = 0.95 cycles
L1 miss, L2 hit: 0.05 × 0.8 × 10 = 0.4 cycles (80% of L1 misses hit in L2)
L1 miss, L2 miss: 0.05 × 0.2 × 100 = 1.0 cycles (20% of L1 misses miss in L2)

AMAT = 0.95 + 0.4 + 1.0 = 2.35 cycles
```

**Answer:** 2.35 cycles

---

## Study Tips

1. **Understand Trade-offs:**
   - Every design decision has pros and cons
   - Larger cache vs. faster cache
   - Higher associativity vs. lower cost

2. **Master Calculations:**
   - AMAT formula
   - CPI with cache misses
   - Address breakdown for different mappings

3. **Visualize Cache Organization:**
   - Draw cache structures
   - Understand tag, line, word fields
   - Trace cache operations

4. **Compare Techniques:**
   - Direct vs. associative vs. set-associative
   - Write through vs. write back
   - Replacement algorithms

5. **Understand Locality:**
   - Why hierarchy works
   - How to exploit locality
   - Impact on performance

---

## Conclusion

Group 4 (Memory Architecture & Hierarchy) explains how memory systems are organized to achieve good performance at reasonable cost:

1. **Memory hierarchy** solves the speed/capacity/cost trade-off
2. **Locality of reference** makes hierarchy effective
3. **Cache memory** bridges the CPU-memory speed gap
4. **Mapping techniques** balance flexibility and cost
5. **Multi-level caches** further improve performance
6. **DRAM and SRAM** serve different roles in the hierarchy

Understanding memory systems is crucial because:
- Memory is often the performance bottleneck
- Cache design significantly impacts performance
- Memory hierarchy is fundamental to computer architecture

Master these concepts, and you'll understand how modern computers achieve high performance despite the speed gap between processors and memory!

---

*End of Group 4 Study Guide*

