# Group 4: Memory Architecture & Hierarchy
## Comprehensive Exercises

**Chapters 4-5: The Memory Hierarchy & Cache Memory**
**Chapter 6: Internal Memory**

---

## Table of Contents
1. [Multiple Choice Questions](#multiple-choice-questions)
2. [True/False Questions](#truefalse-questions)
3. [Short Answer Questions](#short-answer-questions)
4. [Calculation Problems](#calculation-problems)
5. [Cache Analysis Questions](#cache-analysis-questions)
6. [Problem-Solving Exercises](#problem-solving-exercises)
7. [Conceptual Questions](#conceptual-questions)
8. [Answer Key](#answer-key)

---

## Multiple Choice Questions

### Section 1: Memory Characteristics

**1.1** Which memory location is fastest but smallest?

a) Main Memory
b) Cache Memory
c) CPU Registers
d) Secondary Storage

**1.2** Random access memory means:

a) Access time depends on location
b) Access time is independent of location
c) Must access sequentially
d) Access requires special hardware

**1.3** The unit of transfer for external memory is typically:

a) A word
b) A byte
c) A block
d) A bit

**1.4** Which access method requires starting at the beginning and reading through in order?

a) Random Access
b) Direct Access
c) Sequential Access
d) Associative Access

**1.5** Volatile memory:

a) Retains data when power is off
b) Loses data when power is off
c) Is slower than non-volatile memory
d) Has unlimited capacity

### Section 2: Memory Hierarchy

**2.1** The memory hierarchy exists because:

a) Faster memory is cheaper
b) There's a trade-off between speed, cost, and capacity
c) Slower memory is always better
d) All memory should be the same speed

**2.2** In the memory hierarchy, which level is typically largest?

a) Registers
b) Cache
c) Main Memory
d) Secondary Storage

**2.3** The principle that makes memory hierarchy effective is:

a) Random access
b) Locality of reference
c) Virtual memory
d) Cache coherence

**2.4** As you move down the memory hierarchy:

a) Speed increases, cost increases
b) Speed decreases, cost decreases
c) Speed increases, cost decreases
d) Speed decreases, cost increases

**2.5** Cache memory is placed between:

a) CPU and registers
b) CPU and main memory
c) Main memory and secondary storage
d) Registers and cache

### Section 3: Locality of Reference

**3.1** Temporal locality refers to:

a) Nearby memory locations being accessed
b) Recently accessed items being accessed again soon
c) Sequential memory access patterns
d) Random memory access patterns

**3.2** Spatial locality refers to:

a) Recently accessed items being accessed again
b) Nearby memory locations being accessed together
c) Temporal patterns in access
d) Cache hit rates

**3.3** Which programming construct best exhibits temporal locality?

a) Arrays
b) Loops
c) Functions
d) Variables

**3.4** Which programming construct best exhibits spatial locality?

a) Loops
b) Arrays
c) Recursion
d) Pointers

**3.5** Locality of reference is exploited by:

a) Only cache memory
b) Only virtual memory
c) Both cache and virtual memory
d) Neither cache nor virtual memory

### Section 4: Cache Fundamentals

**4.1** A cache hit occurs when:

a) The requested data is not in cache
b) The requested data is in cache
c) Cache is full
d) Cache needs to be updated

**4.2** A cache miss occurs when:

a) The requested data is in cache
b) The requested data is not in cache
c) Cache is empty
d) Cache is too small

**4.3** The miss penalty is:

a) The time to access cache
b) The time to access main memory when cache misses
c) The cache hit rate
d) The cache size

**4.4** A cache block (line) typically contains:

a) One byte
b) One word
c) Multiple words (16-128 bytes)
d) One kilobyte

**4.5** Cache is effective because of:

a) Large capacity
b) Low cost
c) Locality of reference
d) Fast access time only

### Section 5: Cache Mapping

**5.1** Direct mapping means:

a) Each block can go to any cache location
b) Each block maps to exactly one cache location
c) Blocks are mapped randomly
d) No mapping is needed

**5.2** Fully associative mapping means:

a) Each block maps to exactly one location
b) Each block can go to any cache location
c) Blocks are mapped sequentially
d) Mapping is not used

**5.3** Set-associative mapping is:

a) A compromise between direct and fully associative
b) The same as direct mapping
c) The same as fully associative
d) Not used in practice

**5.4** In a 4-way set-associative cache:

a) There are 4 sets
b) Each set has 4 blocks
c) There are 4 blocks total
d) Mapping is 4 times faster

**5.5** Direct mapping has the advantage of:

a) Highest hit rate
b) Simplest hardware
c) No conflicts
d) Best performance

### Section 6: Cache Replacement

**6.1** LRU (Least Recently Used) replacement:

a) Replaces the most recently used block
b) Replaces the least recently used block
c) Replaces randomly
d) Replaces the first block

**6.2** FIFO (First-In-First-Out) replacement:

a) Replaces the newest block
b) Replaces the oldest block
c) Replaces randomly
d) Tracks usage frequency

**6.3** Which replacement policy typically has the best hit rate?

a) Random
b) FIFO
c) LRU
d) They're all the same

**6.4** Replacement is needed when:

a) Cache hit occurs
b) Cache miss occurs and cache is full
c) Cache is empty
d) Always

**6.5** LRU requires:

a) No additional hardware
b) Simple hardware
c) Complex hardware to track usage
d) Software implementation only

### Section 7: Write Policies

**7.1** Write-through policy means:

a) Write only to cache
b) Write to both cache and memory
c) Write only to memory
d) Don't write at all

**7.2** Write-back policy means:

a) Write immediately to memory
b) Write to cache, update memory later
c) Write only to cache
d) Write to both simultaneously

**7.3** Write-through has the advantage of:

a) Better performance
b) Simpler implementation
c) Less memory traffic
d) No cache updates needed

**7.4** Write-back has the advantage of:

a) Simpler hardware
b) Less memory traffic
c) Always up-to-date memory
d) Faster writes

**7.5** Write allocation means:

a) Allocating cache space on write miss
b) Allocating memory on write
c) Allocating registers on write
d) Not allocating anything

### Section 8: Cache Performance

**8.1** AMAT (Average Memory Access Time) formula is:

a) Hit time + Miss rate × Miss penalty
b) Hit time × Miss rate
c) Miss penalty × Hit rate
d) Hit time + Miss penalty

**8.2** To improve cache performance, you can:

a) Only increase cache size
b) Only reduce miss rate
c) Increase cache size, reduce miss rate, or reduce miss penalty
d) Only reduce hit time

**8.3** A higher hit rate means:

a) More misses
b) Fewer misses
c) Slower performance
d) Larger cache required

**8.4** Effective CPI includes:

a) Only base CPI
b) Base CPI plus memory stall cycles
c) Only memory stall cycles
d) Cache hit time

**8.5** Memory stall cycles per instruction equals:

a) Miss rate × Miss penalty
b) Hit rate × Miss penalty
c) Miss rate × Hit time
d) Hit rate × Hit time

### Section 9: Multi-Level Caches

**9.1** Multi-level caches are used because:

a) Single-level cache is always better
b) There's a trade-off between speed and size
c) They're cheaper
d) They're simpler

**9.2** In a two-level cache system, L1 is typically:

a) Larger and slower than L2
b) Smaller and faster than L2
c) Same size as L2
d) Not used

**9.3** A unified cache:

a) Stores only instructions
b) Stores only data
c) Stores both instructions and data
d) Doesn't store anything

**9.4** A split cache:

a) Has separate instruction and data caches
b) Combines instruction and data
c) Is the same as unified cache
d) Doesn't exist

**9.5** L1 cache miss goes to:

a) Main memory directly
b) L2 cache
c) Registers
d) Secondary storage

### Section 10: Internal Memory

**10.1** DRAM stands for:

a) Dynamic Random Access Memory
b) Direct Random Access Memory
c) Dense Random Access Memory
d) Digital Random Access Memory

**10.2** DRAM requires:

a) No refresh
b) Periodic refresh
c) Continuous power only
d) No power

**10.3** SRAM is:

a) Slower than DRAM
b) Faster than DRAM
c) Same speed as DRAM
d) Not used in computers

**10.4** SRAM is typically used for:

a) Main memory
b) Cache memory
c) Secondary storage
d) All of the above

**10.5** DRAM is typically used for:

a) Cache memory
b) Main memory
c) Registers
d) Secondary storage

---

## True/False Questions

**T/F 1.1** CPU registers are the fastest but smallest form of memory.

**T/F 1.2** Random access memory has access time that depends on the location accessed.

**T/F 1.3** Volatile memory loses its contents when power is removed.

**T/F 1.4** External memory typically transfers data in blocks rather than individual words.

**T/F 2.1** The memory hierarchy exploits the principle of locality of reference.

**T/F 2.2** As you move up the memory hierarchy, speed increases and cost per bit increases.

**T/F 2.3** Cache memory is larger than main memory.

**T/F 2.4** Secondary storage is the fastest level in the memory hierarchy.

**T/F 3.1** Temporal locality means recently accessed items are likely to be accessed again.

**T/F 3.2** Spatial locality means nearby memory locations are accessed together.

**T/F 3.3** Loops exhibit temporal locality.

**T/F 3.4** Arrays exhibit spatial locality.

**T/F 4.1** A cache hit means the requested data is in the cache.

**T/F 4.2** A cache miss always requires accessing main memory.

**T/F 4.3** The miss penalty is the time to access main memory when a cache miss occurs.

**T/F 4.4** Cache blocks typically contain multiple words.

**T/F 5.1** Direct mapping allows each block to go to any cache location.

**T/F 5.2** Fully associative mapping has the simplest hardware implementation.

**T/F 5.3** Set-associative mapping is a compromise between direct and fully associative.

**T/F 5.4** In direct mapping, each memory block maps to exactly one cache location.

**T/F 6.1** LRU replacement policy replaces the least recently used block.

**T/F 6.2** FIFO replacement policy typically has better hit rate than LRU.

**T/F 6.3** Replacement is needed when a cache miss occurs and the cache is full.

**T/F 6.4** Random replacement requires no additional hardware.

**T/F 7.1** Write-through policy writes to both cache and memory immediately.

**T/F 7.2** Write-back policy writes to memory only when the block is replaced.

**T/F 7.3** Write-back typically has less memory traffic than write-through.

**T/F 7.4** Write allocation means allocating cache space on a write miss.

**T/F 8.1** AMAT = Hit time + Miss rate × Miss penalty.

**T/F 8.2** Increasing cache size always improves performance.

**T/F 8.3** A higher hit rate means better cache performance.

**T/F 8.4** Effective CPI = Base CPI + Memory stall cycles per instruction.

**T/F 9.1** L1 cache is typically smaller and faster than L2 cache.

**T/F 9.2** A unified cache stores both instructions and data.

**T/F 9.3** Split caches allow parallel access to instructions and data.

**T/F 9.4** Multi-level caches help balance speed and size requirements.

**T/F 10.1** DRAM requires periodic refresh to maintain data.

**T/F 10.2** SRAM is faster but more expensive than DRAM.

**T/F 10.3** DRAM is typically used for main memory.

**T/F 10.4** SRAM is typically used for cache memory.

---

## Short Answer Questions

### Section 1: Memory Characteristics

**SA 1.1** List and describe the key characteristics used to classify memory systems.

**SA 1.2** Explain the difference between random access, sequential access, and direct access.

**SA 1.3** What is the difference between volatile and non-volatile memory? Give examples of each.

**SA 1.4** Explain the relationship between address length and memory capacity.

### Section 2: Memory Hierarchy

**SA 2.1** Explain why the memory hierarchy exists and how it solves the memory dilemma.

**SA 2.2** Describe the typical levels of the memory hierarchy from fastest to slowest.

**SA 2.3** What are the characteristics of each level in the memory hierarchy (speed, size, cost)?

**SA 2.4** How does the memory hierarchy achieve both high speed and large capacity?

### Section 3: Locality of Reference

**SA 3.1** Explain temporal locality and give examples of when it occurs.

**SA 3.2** Explain spatial locality and give examples of when it occurs.

**SA 3.3** How do caches exploit locality of reference?

**SA 3.4** Give programming examples that exhibit strong temporal and spatial locality.

### Section 4: Cache Fundamentals

**SA 4.1** What is cache memory, and why is it used?

**SA 4.2** Explain what happens during a cache hit and a cache miss.

**SA 4.3** Define cache block (line), hit rate, miss rate, and miss penalty.

**SA 4.4** Describe the basic operation of a cache (read and write operations).

### Section 5: Cache Mapping

**SA 5.1** Explain direct mapping, including how addresses are divided and how blocks are placed.

**SA 5.2** Explain fully associative mapping and its advantages/disadvantages.

**SA 5.3** Explain set-associative mapping and how it compares to direct and fully associative.

**SA 5.4** Compare the three mapping techniques in terms of hardware complexity, hit rate, and flexibility.

### Section 6: Cache Replacement

**SA 6.1** Explain the LRU replacement policy and when it's used.

**SA 6.2** Compare LRU, FIFO, and random replacement policies.

**SA 6.3** When is cache replacement needed?

**SA 6.4** What are the hardware requirements for different replacement policies?

### Section 7: Write Policies

**SA 7.1** Explain write-through and write-back policies. What are the trade-offs?

**SA 7.2** What is write allocation, and when is it used?

**SA 7.3** Compare write-through and write-back in terms of performance and complexity.

**SA 7.4** What is cache coherency, and why is it important?

### Section 8: Cache Performance

**SA 8.1** Derive and explain the AMAT (Average Memory Access Time) formula.

**SA 8.2** How do you calculate effective CPI with cache?

**SA 8.3** List ways to improve cache performance.

**SA 8.4** Explain how cache performance affects overall system performance.

### Section 9: Multi-Level Caches

**SA 9.1** Why are multi-level caches used?

**SA 9.2** Describe the organization of a two-level cache system.

**SA 9.3** Compare unified and split caches.

**SA 9.4** How do you calculate AMAT for a multi-level cache?

### Section 10: Internal Memory

**SA 10.1** Compare DRAM and SRAM in terms of structure, speed, cost, and usage.

**SA 10.2** Why does DRAM require refresh, and how does it work?

**SA 10.3** Explain the structure and operation of a DRAM cell.

**SA 10.4** What are the advantages and disadvantages of SRAM vs. DRAM?

---

## Calculation Problems

### Problem 1: Cache Address Breakdown

**CP 1.1** For a direct-mapped cache with:
- Cache size: 8 KB
- Block size: 32 bytes
- 32-bit addresses

Calculate:
- a) Number of blocks in cache
- b) Number of bits for block offset
- c) Number of bits for index
- d) Number of bits for tag
- e) Show address breakdown

**CP 1.2** For a 4-way set-associative cache with:
- Cache size: 16 KB
- Block size: 64 bytes
- 32-bit addresses

Calculate:
- a) Number of sets
- b) Address field breakdown
- c) Total cache overhead (tags, valid bits)

### Problem 2: AMAT Calculations

**CP 2.1** A cache has:
- Hit time: 1 cycle
- Miss rate: 5%
- Miss penalty: 100 cycles

Calculate:
- a) AMAT
- b) If miss rate is reduced to 2%, what is new AMAT?
- c) If miss penalty is reduced to 50 cycles, what is new AMAT?

**CP 2.2** A two-level cache system has:
- L1: Hit time = 1 cycle, Miss rate = 10%
- L2: Hit time = 10 cycles, Miss rate = 5%
- Main memory: Access time = 100 cycles

Calculate:
- a) L2 miss penalty
- b) L1 miss penalty
- c) AMAT

### Problem 3: CPI with Cache

**CP 3.1** A processor has:
- Base CPI: 1.0
- Instruction miss rate: 2%
- Data miss rate: 5%
- 40% of instructions are loads/stores
- Miss penalty: 100 cycles

Calculate:
- a) Memory stall cycles per instruction
- b) Effective CPI
- c) Performance impact

**CP 3.2** If cache performance improves:
- Instruction miss rate: 2% → 1%
- Data miss rate: 5% → 3%
- Miss penalty: 100 → 80 cycles

Calculate:
- a) Old effective CPI
- b) New effective CPI
- c) Speedup

### Problem 4: Cache Size and Performance

**CP 4.1** Doubling cache size reduces miss rate from 5% to 3%. If:
- Hit time: 1 cycle
- Miss penalty: 100 cycles
- Original AMAT: 6 cycles

Calculate:
- a) New AMAT
- b) Performance improvement
- c) Is the improvement worth the cost?

**CP 4.2** Increasing associativity from direct-mapped to 4-way reduces miss rate from 8% to 5%, but increases hit time from 1 to 1.2 cycles. If miss penalty is 100 cycles:
- a) Calculate AMAT for each
- b) Which is better?
- c) What factors affect the decision?

### Problem 5: Multi-Level Cache Analysis

**CP 5.1** A system has:
- L1 cache: 32 KB, 1 cycle, 5% miss rate
- L2 cache: 256 KB, 10 cycles, 20% miss rate (of L1 misses)
- Main memory: 100 cycles

Calculate:
- a) L2 miss penalty
- b) L1 miss penalty
- c) Overall AMAT
- d) What if L2 didn't exist?

**CP 5.2** Compare two cache configurations:

**Config A:**
- Single 128 KB cache: 2 cycles, 3% miss rate

**Config B:**
- L1: 32 KB, 1 cycle, 8% miss rate
- L2: 128 KB, 5 cycles, 25% miss rate (of L1 misses)

Both have 100-cycle main memory access. Which is better?

---

## Cache Analysis Questions

### Analysis 1: Direct Mapping

**CA 1.1** For a direct-mapped cache (8 blocks, block size 4 words):
- Show which blocks map to which cache locations
- Trace access sequence: 0, 4, 8, 12, 0, 4
- Identify hits and misses
- Calculate hit rate

**CA 1.2** Analyze conflict misses:
- Cache: 4 blocks, addresses: 0, 4, 8, 12, 0, 4, 8, 12
- Show cache state after each access
- Identify conflict misses

### Analysis 2: Set-Associative

**CA 2.1** For a 2-way set-associative cache (4 sets, 2 blocks per set):
- Show address mapping
- Trace access sequence with LRU replacement
- Calculate hit rate

**CA 2.2** Compare 2-way vs. 4-way set-associative for same cache size:
- Analyze hit rates
- Consider hardware complexity
- Determine optimal associativity

### Analysis 3: Replacement Policies

**CA 3.1** Compare LRU, FIFO, and random replacement:
- Same access sequence
- Same cache configuration
- Calculate hit rates for each
- Analyze differences

**CA 3.2** Show how LRU tracks usage:
- Access sequence: A, B, C, A, D, B, C
- 3-block fully associative cache
- Show cache state and replacement decisions

### Analysis 4: Write Policies

**CA 4.1** Compare write-through vs. write-back:
- 10 writes, 5% write miss rate
- Calculate memory traffic for each
- Consider performance implications

**CA 4.2** Analyze write allocation:
- Write miss to address 100
- Show what happens with and without write allocation
- When is each policy used?

---

## Problem-Solving Exercises

### Problem 1: Cache Design

**PS 1.1** Design a cache system for:
- 32-bit addresses
- 64 KB cache
- Block size: 32 bytes
- Target: < 2% miss rate

Determine:
- a) Mapping technique (direct, set-associative, fully associative)
- b) Associativity if set-associative
- c) Replacement policy
- d) Write policy
- e) Justify each choice

**PS 1.2** Optimize cache for specific workload:
- 80% instruction accesses, 20% data accesses
- Strong spatial locality
- Moderate temporal locality

Recommend:
- Cache size
- Block size
- Associativity
- Unified vs. split
- Justify recommendations

### Problem 2: Performance Optimization

**PS 2.1** Current system:
- CPI: 2.0 (base: 1.5, memory stalls: 0.5)
- Cache: 16 KB, 5% miss rate, 100-cycle miss penalty

Options to improve:
- A: Double cache to 32 KB (miss rate → 3%)
- B: Increase block size 2× (miss rate → 3%, hit time → 1.2×)
- C: Add L2 cache (256 KB, 10 cycles, 20% L1 miss rate)

Calculate performance for each and recommend best option.

**PS 2.2** Analyze cache hierarchy:
- L1: 8 KB, 1 cycle, 10% miss
- L2: 64 KB, 5 cycles, 30% miss (of L1 misses)
- Main memory: 100 cycles

Optimize by:
- Increasing L1 to 16 KB (miss → 7%)
- Increasing L2 to 128 KB (miss → 20%)
- Both changes

Calculate performance for each scenario.

### Problem 3: Cache Coherency

**PS 3.1** Multi-core system with shared L2 cache:
- Each core has private L1 cache
- Explain cache coherency problem
- Describe solutions (snooping, directory-based)
- Analyze performance impact

**PS 3.2** Write-invalidate vs. write-update protocols:
- Compare memory traffic
- Compare performance
- When is each better?

### Problem 4: Advanced Cache Techniques

**PS 4.1** Prefetching:
- Current: 5% miss rate
- With prefetching: 2% miss rate
- Prefetch overhead: 5% of cache accesses
- Calculate net performance improvement

**PS 4.2** Victim cache:
- Main cache: 8 KB, 8% miss rate
- Victim cache: 512 bytes, captures 30% of main cache misses
- Calculate effective miss rate
- Analyze cost/benefit

---

## Conceptual Questions

### Concept 1: Memory Hierarchy

**CQ 1.1** Explain why a single type of memory cannot satisfy all system requirements (speed, capacity, cost).

**CQ 1.2** How does the memory hierarchy achieve the illusion of large, fast, cheap memory?

**CQ 1.3** Discuss the trade-offs in memory hierarchy design. What factors determine the optimal configuration?

### Concept 2: Cache Design

**CQ 2.1** Explain the fundamental trade-offs in cache design (size, associativity, block size).

**CQ 2.2** How do you balance cache hit rate, hit time, and miss penalty in cache design?

**CQ 2.3** Discuss when direct mapping is preferred over set-associative, and vice versa.

### Concept 3: Performance

**CQ 3.1** How does cache performance affect overall system performance? Give examples.

**CQ 3.2** Explain the relationship between miss rate, miss penalty, and AMAT.

**CQ 3.3** Why might increasing cache size not always improve performance?

### Concept 4: Advanced Topics

**CQ 4.1** How do multi-level caches help balance speed and capacity requirements?

**CQ 4.2** Explain the challenges of cache coherency in multi-core systems.

**CQ 4.3** Discuss modern cache optimization techniques (prefetching, victim cache, etc.).

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - c | 1.2 - b | 1.3 - c | 1.4 - c | 1.5 - b

**Section 2:**
2.1 - b | 2.2 - d | 2.3 - b | 2.4 - b | 2.5 - b

**Section 3:**
3.1 - b | 3.2 - b | 3.3 - b | 3.4 - b | 3.5 - c

**Section 4:**
4.1 - b | 4.2 - b | 4.3 - b | 4.4 - c | 4.5 - c

**Section 5:**
5.1 - b | 5.2 - b | 5.3 - a | 5.4 - b | 5.5 - b

**Section 6:**
6.1 - b | 6.2 - b | 6.3 - c | 6.4 - b | 6.5 - c

**Section 7:**
7.1 - b | 7.2 - b | 7.3 - b | 7.4 - b | 7.5 - a

**Section 8:**
8.1 - a | 8.2 - c | 8.3 - b | 8.4 - b | 8.5 - a

**Section 9:**
9.1 - b | 9.2 - b | 9.3 - c | 9.4 - a | 9.5 - b

**Section 10:**
10.1 - a | 10.2 - b | 10.3 - b | 10.4 - b | 10.5 - b

### True/False Answers

**Section 1:**
1.1 - True | 1.2 - False | 1.3 - True | 1.4 - True

**Section 2:**
2.1 - True | 2.2 - True | 2.3 - False | 2.4 - False

**Section 3:**
3.1 - True | 3.2 - True | 3.3 - True | 3.4 - True

**Section 4:**
4.1 - True | 4.2 - True | 4.3 - True | 4.4 - True

**Section 5:**
5.1 - False | 5.2 - False | 5.3 - True | 5.4 - True

**Section 6:**
6.1 - True | 6.2 - False | 6.3 - True | 6.4 - True

**Section 7:**
7.1 - True | 7.2 - True | 7.3 - True | 7.4 - True

**Section 8:**
8.1 - True | 8.2 - False | 8.3 - True | 8.4 - True

**Section 9:**
9.1 - True | 9.2 - True | 9.3 - True | 9.4 - True

**Section 10:**
10.1 - True | 10.2 - True | 10.3 - True | 10.4 - True

---

*End of Group 4 Exercises*

