# Group 4: Memory Architecture & Hierarchy - Concise Summary

## Memory Characteristics and Classification

### Key Characteristics
1. **Location:** CPU (registers), Internal (cache, main memory), External (disk, SSD)
2. **Capacity:** Word size, number of words/bytes, address length determines capacity
3. **Unit of Transfer:** Internal (word/bus width), External (blocks)
4. **Access Methods:**
   - **Sequential:** Must read in order (tape)
   - **Direct:** Jump to vicinity + search (disk)
   - **Random:** Direct access by address (RAM, cache)
   - **Associative:** Search by content (cache tag search)
5. **Performance:**
   - **Access Time:** Time to get data (latency)
   - **Cycle Time:** Access time + recovery time
   - **Transfer Rate:** Bandwidth (bits/bytes per second)
6. **Physical Types:** Semiconductor, magnetic, optical
7. **Physical Characteristics:**
   - **Volatile:** Loses data without power (DRAM, SRAM)
   - **Nonvolatile:** Retains data (ROM, Flash, disk)
   - **Erasable:** Can be rewritten (RAM, EEPROM, Flash)

## The Memory Hierarchy Concept

### The Memory Dilemma
- **Trade-off:** Speed, capacity, cost cannot all be optimized simultaneously
- **Problem:** Want large capacity, fast access, low cost (can't have all three)
- **Solution:** Memory hierarchy with multiple levels

### Hierarchy Levels (Fastest → Slowest)
1. **CPU Registers:** Fastest, smallest, most expensive
2. **Cache Memory (L1, L2, L3):** Fast, small, expensive
3. **Main Memory (DRAM):** Moderate speed, medium size, moderate cost
4. **Secondary Storage (Disk, SSD):** Slow, large, cheap
5. **Tertiary Storage (Tape, Optical):** Slowest, largest, cheapest

### Hierarchy Characteristics
- **Going down:** Decreasing cost per bit, increasing capacity, increasing access time
- **Access distribution:** Most accesses from fast memory (registers, cache)
- **Average access time:** Much closer to fast memory than slow memory

## Locality of Reference

### What is Locality?
- **Definition:** Memory references tend to cluster during program execution
- **Observation:** Programs access small proportion of address space at any time

### Two Types of Locality

#### 1. Temporal Locality
- **Definition:** Recently accessed items likely to be accessed again soon
- **Examples:** Loop instructions, reused variables, repeated function calls

#### 2. Spatial Locality
- **Definition:** Items near recently accessed items likely to be accessed soon
- **Examples:** Sequential instruction access, array data, stack operations

### Exploiting Locality
- **Strategy:** Copy recently accessed items to faster memory
- **Temporal:** Keep recently used items in cache
- **Spatial:** Bring entire blocks when accessing one word
- **Result:** Most accesses satisfied by fast memory

## Cache Memory Fundamentals

### What is Cache?
- **Definition:** Small, fast memory between processor and main memory
- **Purpose:** Store recently accessed data, reduce average access time
- **Characteristics:** Small (KB-MB), fast (1-10 cycles), expensive, often on-chip

### Cache Operation
- **Read:** Check cache → Hit (get from cache) or Miss (load block from memory)
- **Write:** Check cache → Hit (update cache) or Miss (load block, then update)

### Key Definitions
- **Block (Line):** Unit of transfer (typically 16-128 bytes)
- **Hit:** Access satisfied by cache
- **Hit Ratio:** `hits / total_accesses`
- **Miss:** Block not in cache, must load from memory
- **Miss Ratio:** `misses / total_accesses = 1 - hit_ratio`
- **Miss Penalty:** Time to handle miss (10-100+ cycles)

### Cache Organization
```
Cache Line: [Valid Bit | Tag | Data (Block)]
```

## Cache Mapping Techniques

### The Mapping Problem
- **Problem:** Fewer cache lines than main memory blocks
- **Question:** How to map memory blocks to cache lines?

### Three Mapping Techniques

#### 1. Direct Mapping
- **Concept:** Each block maps to exactly one cache line
- **Formula:** `i = j mod m` (i = cache line, j = block number, m = cache lines)
- **Address:** `[Tag | Line | Word]`
- **Advantages:** Simple, fast, inexpensive
- **Disadvantages:** Fixed location, thrashing possible, low flexibility

#### 2. Fully Associative Mapping
- **Concept:** Block can load into any cache line
- **Address:** `[Tag | Word]` (no line field)
- **Operation:** Search all lines for matching tag
- **Advantages:** Maximum flexibility, no thrashing, best hit ratio
- **Disadvantages:** Expensive (N comparators), slow (search all), complex

#### 3. Set-Associative Mapping
- **Concept:** Compromise between direct and fully associative
- **Organization:** Cache divided into sets, each set has k lines (k-way)
- **Mapping:** Block maps to one set, can be in any line within that set
- **Address:** `[Tag | Set | Word]`
- **Advantages:** Good flexibility, reasonable cost, reduces thrashing
- **Disadvantages:** More complex than direct, more expensive than direct
- **Common:** 2-way, 4-way, 8-way set associative

### Comparison

| Technique | Flexibility | Cost | Speed | Thrashing |
|-----------|-------------|------|-------|-----------|
| Direct | Low | Lowest | Fastest | High |
| Set-Associative | Medium | Medium | Medium | Low |
| Fully Associative | High | Highest | Slowest | None |

**Modern Practice:** Set-associative (typically 2-8 way)

## Cache Replacement Policies

### When Replacement is Needed
- **Direct Mapping:** No choice (automatic)
- **Associative/Set-Associative:** Need replacement algorithm

### Replacement Algorithms

#### 1. Least Recently Used (LRU)
- **Principle:** Replace block longest without reference
- **Advantages:** Most effective, exploits temporal locality, good hit ratio
- **Disadvantages:** Complex, requires tracking access history
- **Most Popular:** Best effectiveness/cost balance

#### 2. First-In-First-Out (FIFO)
- **Principle:** Replace oldest block
- **Advantages:** Simple, low cost
- **Disadvantages:** Less effective, doesn't consider recent usage

#### 3. Least Frequently Used (LFU)
- **Principle:** Replace block with fewest references
- **Advantages:** Considers usage frequency
- **Disadvantages:** Complex, may keep old blocks

#### 4. Random
- **Principle:** Replace randomly selected block
- **Advantages:** Very simple
- **Disadvantages:** Poor performance, unpredictable

**Effectiveness:** LRU > LFU > FIFO > Random

## Write Policies

### The Write Problem
- **Issue:** When CPU writes to cache, main memory must be updated
- **Questions:** When to update? What if block replaced before write?

### Two Write Policies

#### 1. Write Through
- **Principle:** Every write to cache also writes to main memory immediately
- **Advantages:** Simple, consistent, I/O compatible
- **Disadvantages:** High memory traffic, slow writes, memory bottleneck
- **Solution:** Write buffer (hold writes, CPU continues)

#### 2. Write Back
- **Principle:** Write only to cache, write to memory when block replaced
- **Dirty Bit:** Indicates if block modified
- **Advantages:** Minimizes memory writes, faster writes, better performance
- **Disadvantages:** Complexity, inconsistency, I/O issues

### Write Allocation
- **Write Allocate:** Load block into cache on write miss (use with write back)
- **No Write Allocate:** Write directly to memory (use with write through)

**Modern Practice:** Write back + Write allocate (most common)

### Cache Coherency
- **Problem:** Multiple devices may access same memory
- **Solutions:** Snooping, invalidation, update, MESI protocol

## Cache Performance Analysis

### Average Memory Access Time (AMAT)
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Components:**
- **Hit Time:** Time to access cache (1-10 cycles)
- **Miss Rate:** Fraction of accesses that miss (0.0 to 1.0)
- **Miss Penalty:** Time to handle miss (10-100+ cycles)

### CPU Time
```
CPU Time = (CPU execution cycles + Memory stall cycles) × Clock cycle time
```

### Effective CPI
```
CPI_actual = CPI_base + (Memory stall cycles per instruction)
```

**Memory Stall Cycles:**
```
= (I-cache miss rate × Miss penalty) + 
  (Load/store fraction × D-cache miss rate × Miss penalty)
```

### Improving Cache Performance
1. **Reduce Miss Rate:** Larger cache, higher associativity, better replacement, larger blocks
2. **Reduce Miss Penalty:** Faster memory, multi-level caches, write buffers
3. **Reduce Hit Time:** Smaller cache, lower associativity, on-chip cache

**Trade-offs:**
- Larger cache → Lower miss rate, but higher hit time
- Higher associativity → Lower miss rate, but higher hit time
- Larger blocks → Better spatial locality, but fewer blocks fit

## Multi-Level Caches

### Why Multiple Levels?
- **Problem:** Single cache must balance size (hit rate) and speed (hit time)
- **Solution:** Multiple cache levels with different characteristics

### Cache Levels

#### L1 Cache (Level 1)
- **Location:** On CPU chip
- **Size:** Small (8-64 KB)
- **Speed:** Very fast (1-2 cycles)
- **Characteristics:** Split I-cache and D-cache, closest to processor

#### L2 Cache (Level 2)
- **Location:** On CPU chip or off-chip
- **Size:** Medium (256 KB - 8 MB)
- **Speed:** Fast (5-20 cycles)
- **Characteristics:** Services L1 misses, larger than L1

#### L3 Cache (Level 3)
- **Location:** On CPU chip or off-chip
- **Size:** Large (8-64 MB)
- **Speed:** Moderate (20-50 cycles)
- **Characteristics:** Services L2 misses, shared among cores

### Multi-Level Performance
- **Access Flow:** CPU → L1 → L2 → L3 → Main Memory
- **Hit at L1:** Fastest (1-2 cycles)
- **Hit at L2:** Fast (5-20 cycles)
- **Hit at L3:** Moderate (20-50 cycles)
- **Miss:** Slow (50-100+ cycles)

### Unified vs. Split Caches
- **Unified:** Single cache for instructions and data
  - Advantages: Higher hit rate, simpler
  - Disadvantages: Contention, problematic for pipelining
- **Split:** Separate I-cache and D-cache
  - Advantages: No contention, better for pipelining
  - Disadvantages: Lower hit rate, more complex

**Modern Practice:** L1 split (I-cache and D-cache), L2/L3 unified

## Internal Memory: DRAM and SRAM

### Semiconductor Memory Types
1. **RAM (Random Access Memory):** Read/write, volatile, temporary
   - **SRAM:** Static RAM
   - **DRAM:** Dynamic RAM
2. **ROM (Read-Only Memory):** Read-only, nonvolatile, permanent

### Dynamic RAM (DRAM)

#### Structure
- **Basic Cell:** Capacitor (stores charge) + Transistor (switch)
- **Storage:** Charge in capacitor = binary 1/0

#### Characteristics
- **Storage Mechanism:** Charge in capacitors (analogue)
- **Key Properties:** Charges leak, needs refreshing, dynamic
- **Refresh:** Every few milliseconds (typically 64 ms)
- **Advantages:** Simpler construction, smaller per bit, less expensive, high capacity
- **Disadvantages:** Needs refresh circuits, slower, complex timing
- **Use:** Main memory (large capacity, cost-sensitive)

### Static RAM (SRAM)

#### Structure
- **Basic Cell:** Flip-flop circuit (two cross-coupled inverters)
- **Storage:** On/off switches (digital)

#### Characteristics
- **Storage Mechanism:** Flip-flops (digital, no charges)
- **Key Properties:** No refresh needed, faster, more complex
- **Advantages:** No refresh, faster, simpler timing
- **Disadvantages:** More complex, larger per bit, more expensive
- **Use:** Cache memory (speed critical, smaller capacity)

### SRAM vs. DRAM Comparison

| Characteristic | SRAM | DRAM |
|---------------|------|------|
| **Storage** | Flip-flop | Capacitor |
| **Refresh** | Not needed | Required |
| **Speed** | Fast (1-5 ns) | Slower (50-100 ns) |
| **Density** | Low | High |
| **Cost per bit** | High | Low |
| **Use** | Cache | Main memory |
| **Cell complexity** | 6 transistors | 1 transistor + 1 capacitor |

**Key Insight:** SRAM faster but expensive; DRAM cheaper but slower

### DRAM Organization
- **Internal:** 2D array of cells, row/column addressing (reduces address pins)
- **Module:** Multiple chips combined
- **Interleaved Memory:** Multiple banks, increases bandwidth

## Error Detection and Correction

### Why Error Correction?
- **Hard Failure:** Permanent defect
- **Soft Error:** Random, non-destructive (alpha particles, cosmic rays, noise)

### Hamming Error Correcting Code
- **Purpose:** Detect and correct single-bit errors
- **Principle:** Add check bits (redundancy), encode information about data
- **Hamming Distance:** Minimum distance = 3 for single-bit error correction
- **Implementation:** Check bits at powers of 2, calculated using XOR
- **Overhead:** More bits needed (redundancy), lower overhead for larger words

## Advanced DRAM Technologies

### Traditional DRAM Limitations
- **Problems:** Slow access patterns, asynchronous interface, memory bottleneck

### Synchronous DRAM (SDRAM)
- **Key Innovation:** Access synchronized with external clock
- **Burst Mode:** Stream of data, more efficient
- **Advantages:** Predictable timing, CPU can pipeline, better bandwidth

### Double Data Rate SDRAM (DDR SDRAM)
- **Key Innovation:** Sends data twice per clock cycle (rising and falling edge)
- **Generations:** DDR, DDR2, DDR3, DDR4, DDR5 (each 2x previous)
- **Achieves Higher Rates:** Double clocking, higher bus clock, buffering
- **Each Generation:** Higher data rates, lower voltage, better signal integrity

### Other Technologies
- **GDDR:** Graphics DDR (for GPUs)
- **LPDDR:** Low Power DDR (for mobile)
- **HBM/HMC:** 3D stacked memory

## Key Takeaways

1. **Memory hierarchy:** Solves speed/capacity/cost trade-off
2. **Locality:** Temporal and spatial locality enable hierarchy effectiveness
3. **Cache:** Bridges CPU-memory speed gap, stores recently accessed blocks
4. **Mapping:** Direct (simple), set-associative (balanced), fully associative (flexible)
5. **Replacement:** LRU most effective, balances performance and cost
6. **Write policies:** Write back better performance, write through simpler
7. **Multi-level caches:** L1 (fast, small), L2 (medium), L3 (large, shared)
8. **DRAM vs. SRAM:** DRAM for main memory (cheap, dense), SRAM for cache (fast, expensive)
9. **Performance:** AMAT = Hit time + (Miss rate × Miss penalty)
10. **Error correction:** Hamming codes detect and correct single-bit errors

## Performance Considerations

- **Cache size:** Larger = better hit rate, but slower hit time
- **Associativity:** Higher = better hit rate, but slower hit time
- **Block size:** Larger = better spatial locality, but fewer blocks
- **Multi-level:** Reduces miss penalty significantly
- **Write policy:** Write back minimizes memory traffic
- **Replacement:** LRU best for most workloads
- **Memory technology:** SRAM for speed, DRAM for capacity
