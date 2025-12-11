# Group 4: Memory Architecture & Hierarchy
## Comprehensive Exercise Solutions - Part 1

**Chapters 4-5: The Memory Hierarchy & Cache Memory**
**Chapter 6: Internal Memory**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)
3. [Short Answer Solutions (Sections 1-5)](#short-answer-solutions-sections-1-5)

---

## Multiple Choice Solutions

### Section 1: Memory Characteristics

**1.1** Which memory location is fastest but smallest?

**Answer: c) CPU Registers**

**Explanation:**
- Memory hierarchy (fastest to slowest, smallest to largest):
  1. CPU Registers - fastest (< 1 ns), smallest (16-64 registers), most expensive
  2. Cache Memory - very fast (1-10 ns), small (KB-MB)
  3. Main Memory - fast (10-100 ns), large (GB)
  4. Secondary Storage - slow (ms), very large (TB)
- Registers are at the top of the hierarchy

---

**1.2** Random access memory means:

**Answer: b) Access time is independent of location**

**Explanation:**
- Random Access Memory (RAM):
  - Any location can be accessed directly
  - Access time is the same regardless of which location
  - No need to access sequentially
  - Contrasts with sequential access (must go through in order)

---

**1.3** The unit of transfer for external memory is typically:

**Answer: c) A block**

**Explanation:**
- External memory (disks, SSDs) transfers data in blocks
- Block sizes: 512 bytes, 4 KB, etc.
- Much larger than a word or byte
- Efficient for large storage devices
- Internal memory transfers in words (governed by bus width)

---

**1.4** Which access method requires starting at the beginning and reading through in order?

**Answer: c) Sequential Access**

**Explanation:**
- Sequential Access:
  - Must start at beginning
  - Read through in order
  - Cannot jump to arbitrary location
  - Access time depends on location
  - Example: Magnetic tape

---

**1.5** Volatile memory:

**Answer: b) Loses data when power is off**

**Explanation:**
- Volatile memory requires power to maintain data
- When power is removed, data is lost
- Examples: RAM, cache, registers
- Contrasts with non-volatile memory (retains data without power)
- Examples of non-volatile: ROM, flash, disk

---

### Section 2: Memory Hierarchy

**2.1** The memory hierarchy exists because:

**Answer: b) There's a trade-off between speed, cost, and capacity**

**Explanation:**
- Memory dilemma:
  - Fast memory is expensive and small
  - Large memory is slow and cheap
  - Cannot have all three (fast, large, cheap) in one technology
- Solution: Memory hierarchy
  - Use small, fast, expensive memory for active data
  - Use large, slow, cheap memory for bulk storage
  - Achieves illusion of fast, large, cheap memory

---

**2.2** In the memory hierarchy, which level is typically largest?

**Answer: d) Secondary Storage**

**Explanation:**
- Hierarchy from smallest to largest:
  1. Registers: ~100 bytes
  2. Cache: KB to MB
  3. Main Memory: GB
  4. Secondary Storage: TB to PB
- Secondary storage (disks, SSDs) is largest but slowest

---

**2.3** The principle that makes memory hierarchy effective is:

**Answer: b) Locality of reference**

**Explanation:**
- Locality of reference:
  - Temporal: Recently accessed items accessed again
  - Spatial: Nearby locations accessed together
- Makes hierarchy effective:
  - Active data stays in fast memory
  - Inactive data in slow memory
  - Most accesses go to fast memory
  - Average access time is good

---

**2.4** As you move down the memory hierarchy:

**Answer: b) Speed decreases, cost decreases**

**Explanation:**
- Moving down hierarchy (registers → cache → main memory → disk):
  - Speed decreases (slower access)
  - Cost per bit decreases (cheaper)
  - Capacity increases (larger)
- Trade-off: slower but cheaper and larger

---

**2.5** Cache memory is placed between:

**Answer: b) CPU and main memory**

**Explanation:**
- Cache is a fast buffer between CPU and main memory
- CPU accesses cache first
- If cache miss, then access main memory
- Reduces average memory access time
- Exploits locality of reference

---

### Section 3: Locality of Reference

**3.1** Temporal locality refers to:

**Answer: b) Recently accessed items being accessed again soon**

**Explanation:**
- Temporal locality: recently used items likely to be used again
- Example: Loop variables accessed repeatedly
- Exploited by keeping recently used data in cache
- Makes cache effective

---

**3.2** Spatial locality refers to:

**Answer: b) Nearby memory locations being accessed together**

**Explanation:**
- Spatial locality: nearby locations accessed together
- Example: Array elements accessed sequentially
- Exploited by fetching blocks (multiple words) into cache
- When one word accessed, nearby words also brought in

---

**3.3** Which programming construct best exhibits temporal locality?

**Answer: b) Loops**

**Explanation:**
- Loops access same variables repeatedly
- Loop counter, loop body variables accessed many times
- Strong temporal locality
- Arrays exhibit spatial locality (nearby elements)
- Functions may exhibit both

---

**3.4** Which programming construct best exhibits spatial locality?

**Answer: b) Arrays**

**Explanation:**
- Arrays store data in contiguous memory
- Accessing array[0], then array[1], then array[2]...
- Nearby memory locations accessed together
- Strong spatial locality
- Exploited by cache block size

---

**3.5** Locality of reference is exploited by:

**Answer: c) Both cache and virtual memory**

**Explanation:**
- Cache: exploits locality to keep active data in fast memory
- Virtual memory: exploits locality to keep active pages in physical memory
- Both rely on locality principle
- Without locality, hierarchy wouldn't work well

---

### Section 4: Cache Fundamentals

**4.1** A cache hit occurs when:

**Answer: b) The requested data is in cache**

**Explanation:**
- Cache hit: requested data found in cache
- Fast access (cache access time)
- No need to access main memory
- Goal: maximize hit rate

---

**4.2** A cache miss occurs when:

**Answer: b) The requested data is not in cache**

**Explanation:**
- Cache miss: requested data not in cache
- Must access main memory (slow)
- May need to bring data into cache
- Goal: minimize miss rate

---

**4.3** The miss penalty is:

**Answer: b) The time to access main memory when cache misses**

**Explanation:**
- Miss penalty = time to access main memory
- Includes: memory access time + time to bring block into cache
- Typically much larger than cache hit time
- Major factor in cache performance

---

**4.4** A cache block (line) typically contains:

**Answer: c) Multiple words (16-128 bytes)**

**Explanation:**
- Cache block (line) = unit of data transfer
- Typically 16-128 bytes (4-32 words)
- Larger blocks exploit spatial locality
- Trade-off: larger blocks = fewer blocks, more conflicts

---

**4.5** Cache is effective because of:

**Answer: c) Locality of reference**

**Explanation:**
- Cache effectiveness depends on locality
- Temporal locality: recently used data likely used again
- Spatial locality: nearby data likely used together
- Without locality, cache wouldn't help
- Locality makes high hit rates possible

---

### Section 5: Cache Mapping

**5.1** Direct mapping means:

**Answer: b) Each block maps to exactly one cache location**

**Explanation:**
- Direct mapping: each memory block maps to exactly one cache location
- Formula: cache location = (block address) mod (number of cache blocks)
- Simple hardware
- But can cause conflicts (multiple blocks map to same location)

---

**5.2** Fully associative mapping means:

**Answer: b) Each block can go to any cache location**

**Explanation:**
- Fully associative: block can be placed anywhere in cache
- Most flexible
- Best hit rate (no conflicts from mapping)
- But requires complex hardware (search all locations)

---

**5.3** Set-associative mapping is:

**Answer: a) A compromise between direct and fully associative**

**Explanation:**
- Set-associative: cache divided into sets
- Block maps to a set (like direct)
- Within set, can go anywhere (like fully associative)
- N-way set-associative: N blocks per set
- Balances flexibility and hardware complexity

---

**5.4** In a 4-way set-associative cache:

**Answer: b) Each set has 4 blocks**

**Explanation:**
- 4-way set-associative: each set contains 4 blocks
- A memory block maps to a specific set
- Within that set, can be placed in any of the 4 locations
- Requires replacement policy when set is full

---

**5.5** Direct mapping has the advantage of:

**Answer: b) Simplest hardware**

**Explanation:**
- Direct mapping: simplest hardware
  - No need to search multiple locations
  - Simple address calculation
  - Fast access
- But lower flexibility and potentially lower hit rate

---

### Section 6: Cache Replacement

**6.1** LRU (Least Recently Used) replacement:

**Answer: b) Replaces the least recently used block**

**Explanation:**
- LRU: tracks when each block was last used
- Replaces block that hasn't been used for longest time
- Based on temporal locality principle
- Typically best hit rate
- But requires complex hardware to track usage

---

**6.2** FIFO (First-In-First-Out) replacement:

**Answer: b) Replaces the oldest block**

**Explanation:**
- FIFO: replaces block that has been in cache longest
- Like a queue: first in, first out
- Simple to implement
- But doesn't consider usage frequency
- May replace frequently used block

---

**6.3** Which replacement policy typically has the best hit rate?

**Answer: c) LRU**

**Explanation:**
- LRU typically has best hit rate
- Based on temporal locality (recently used likely used again)
- More accurately predicts future usage
- FIFO and random are simpler but less accurate

---

**6.4** Replacement is needed when:

**Answer: b) Cache miss occurs and cache is full**

**Explanation:**
- Replacement needed when:
  - Cache miss occurs (need to bring in new block)
  - Cache is full (no empty location)
- Must evict an existing block to make room
- Replacement policy decides which block to evict

---

**6.5** LRU requires:

**Answer: c) Complex hardware to track usage**

**Explanation:**
- LRU needs to track when each block was last used
- Requires timestamps or usage counters
- More complex than FIFO or random
- Hardware cost increases with associativity
- But provides better performance

---

### Section 7: Write Policies

**7.1** Write-through policy means:

**Answer: b) Write to both cache and memory**

**Explanation:**
- Write-through: on write, update both cache and memory immediately
- Memory always up-to-date
- Simple to implement
- But more memory traffic (every write goes to memory)

---

**7.2** Write-back policy means:

**Answer: b) Write to cache, update memory later**

**Explanation:**
- Write-back: write only to cache initially
- Update memory only when block is evicted
- Less memory traffic
- But memory may be stale
- Requires dirty bit to track modified blocks

---

**7.3** Write-through has the advantage of:

**Answer: b) Simpler implementation**

**Explanation:**
- Write-through: simpler
  - No need to track dirty blocks
  - Memory always consistent
  - Easier cache coherency
- But more memory writes

---

**7.4** Write-back has the advantage of:

**Answer: b) Less memory traffic**

**Explanation:**
- Write-back: less memory traffic
  - Multiple writes to same block = one memory write
  - Only write when block evicted
  - Better performance
- But more complex (dirty bits, coherency)

---

**7.5** Write allocation means:

**Answer: a) Allocating cache space on write miss**

**Explanation:**
- Write allocation: on write miss, bring block into cache
- Then perform write to cache
- Exploits spatial/temporal locality
- Alternative: write-around (write directly to memory, don't cache)

---

### Section 8: Cache Performance

**8.1** AMAT (Average Memory Access Time) formula is:

**Answer: a) Hit time + Miss rate × Miss penalty**

**Explanation:**
- AMAT = Hit time + (Miss rate × Miss penalty)
- Hit time: time for cache hit
- Miss rate: fraction of accesses that miss
- Miss penalty: time for cache miss
- Lower AMAT = better performance

---

**8.2** To improve cache performance, you can:

**Answer: c) Increase cache size, reduce miss rate, or reduce miss penalty**

**Explanation:**
- Ways to improve cache performance:
  1. Increase cache size → lower miss rate
  2. Increase associativity → lower miss rate
  3. Increase block size → lower miss rate (but may increase miss penalty)
  4. Reduce miss penalty (faster memory, multi-level cache)
  5. Reduce hit time (smaller cache, direct mapping)

---

**8.3** A higher hit rate means:

**Answer: b) Fewer misses**

**Explanation:**
- Hit rate = fraction of accesses that hit
- Higher hit rate = more hits, fewer misses
- Miss rate = 1 - hit rate
- Higher hit rate = better performance

---

**8.4** Effective CPI includes:

**Answer: b) Base CPI plus memory stall cycles**

**Explanation:**
- Effective CPI = Base CPI + Memory stall cycles per instruction
- Base CPI: cycles for instruction execution (assuming perfect memory)
- Memory stall cycles: cycles waiting for memory (cache misses)
- Accounts for memory performance impact

---

**8.5** Memory stall cycles per instruction equals:

**Answer: a) Miss rate × Miss penalty**

**Explanation:**
- Memory stall cycles per instruction = Miss rate × Miss penalty
- Miss rate: fraction of memory accesses that miss
- Miss penalty: cycles per miss
- Multiply to get average stall cycles per access
- Then multiply by memory accesses per instruction

---

### Section 9: Multi-Level Caches

**9.1** Multi-level caches are used because:

**Answer: b) There's a trade-off between speed and size**

**Explanation:**
- Large cache: lower miss rate but slower (higher hit time)
- Small cache: faster (lower hit time) but higher miss rate
- Solution: multi-level
  - Small, fast L1 (low hit time)
  - Large, slower L2 (low miss rate)
- Best of both worlds

---

**9.2** In a two-level cache system, L1 is typically:

**Answer: b) Smaller and faster than L2**

**Explanation:**
- L1 cache: small (8-64 KB), fast (1-2 cycles), higher miss rate
- L2 cache: large (256 KB - 8 MB), slower (5-20 cycles), lower miss rate
- L1 optimizes for speed
- L2 optimizes for capacity

---

**9.3** A unified cache:

**Answer: c) Stores both instructions and data**

**Explanation:**
- Unified cache: single cache for both instructions and data
- Simpler design
- But may have conflicts between instructions and data
- Common for L2/L3 caches

---

**9.4** A split cache:

**Answer: a) Has separate instruction and data caches**

**Explanation:**
- Split cache: separate I-cache and D-cache
- No conflicts between instructions and data
- Can access both in parallel
- Common for L1 cache

---

**9.5** L1 cache miss goes to:

**Answer: b) L2 cache**

**Explanation:**
- L1 miss → check L2 cache
- If L2 hit → data from L2 (L1 miss penalty = L2 hit time)
- If L2 miss → access main memory (L1 miss penalty = L2 hit time + memory access time)
- L2 reduces effective miss penalty for L1

---

### Section 10: Internal Memory

**10.1** DRAM stands for:

**Answer: a) Dynamic Random Access Memory**

**Explanation:**
- DRAM = Dynamic Random Access Memory
- "Dynamic" because it requires refresh
- Used for main memory
- Dense (many bits per chip)
- Cheap

---

**10.2** DRAM requires:

**Answer: b) Periodic refresh**

**Explanation:**
- DRAM stores data as charge in capacitor
- Charge leaks away over time
- Must refresh periodically (every few milliseconds)
- Refresh overhead but allows high density

---

**10.3** SRAM is:

**Answer: b) Faster than DRAM**

**Explanation:**
- SRAM (Static RAM) is faster than DRAM
- No refresh needed
- But more expensive and less dense
- Used for cache memory
- DRAM used for main memory

---

**10.4** SRAM is typically used for:

**Answer: b) Cache memory**

**Explanation:**
- SRAM: fast, expensive, low density
- Used for cache (needs speed)
- DRAM: slower, cheap, high density
- Used for main memory (needs capacity)

---

**10.5** DRAM is typically used for:

**Answer: b) Main memory**

**Explanation:**
- DRAM: slower but cheap and dense
- Used for main memory (needs large capacity)
- SRAM: faster but expensive
- Used for cache (needs speed)

---

## True/False Solutions

**T/F 1.1** CPU registers are the fastest but smallest form of memory.

**Answer: True**

**Explanation:**
- Registers are fastest (< 1 ns) but smallest (~100 bytes total)
- At top of memory hierarchy

---

**T/F 1.2** Random access memory has access time that depends on the location accessed.

**Answer: False**

**Explanation:**
- Random access: access time is independent of location
- Any location accessible in same time
- Sequential access depends on location

---

**T/F 1.3** Volatile memory loses its contents when power is removed.

**Answer: True**

**Explanation:**
- Volatile = requires power to maintain data
- Power off → data lost
- Examples: RAM, cache

---

**T/F 1.4** External memory typically transfers data in blocks rather than individual words.

**Answer: True**

**Explanation:**
- External memory (disks) transfers in blocks (512 bytes, 4 KB)
- Much larger than words
- Efficient for large storage

---

**T/F 2.1** The memory hierarchy exploits the principle of locality of reference.

**Answer: True**

**Explanation:**
- Hierarchy works because of locality
- Active data stays in fast memory
- Inactive data in slow memory

---

**T/F 2.2** As you move up the memory hierarchy, speed increases and cost per bit increases.

**Answer: True**

**Explanation:**
- Up hierarchy: faster, more expensive per bit, smaller
- Trade-off between speed, cost, capacity

---

**T/F 2.3** Cache memory is larger than main memory.

**Answer: False**

**Explanation:**
- Cache is smaller than main memory
- Cache: KB to MB
- Main memory: GB
- Cache is faster but smaller

---

**T/F 2.4** Secondary storage is the fastest level in the memory hierarchy.

**Answer: False**

**Explanation:**
- Secondary storage is slowest
- Hierarchy: registers (fastest) → cache → main memory → secondary (slowest)

---

**T/F 3.1** Temporal locality means recently accessed items are likely to be accessed again.

**Answer: True**

**Explanation:**
- Temporal locality: recent → likely again
- Exploited by keeping recent data in cache

---

**T/F 3.2** Spatial locality means nearby memory locations are accessed together.

**Answer: True**

**Explanation:**
- Spatial locality: nearby → accessed together
- Exploited by cache block size

---

**T/F 3.3** Loops exhibit temporal locality.

**Answer: True**

**Explanation:**
- Loops access same variables repeatedly
- Strong temporal locality

---

**T/F 3.4** Arrays exhibit spatial locality.

**Answer: True**

**Explanation:**
- Arrays: contiguous memory, accessed sequentially
- Strong spatial locality

---

**T/F 4.1** A cache hit means the requested data is in the cache.

**Answer: True**

**Explanation:**
- Hit = data found in cache
- Fast access

---

**T/F 4.2** A cache miss always requires accessing main memory.

**Answer: True**

**Explanation:**
- Miss = data not in cache
- Must access main memory (or L2 if multi-level)

---

**T/F 4.3** The miss penalty is the time to access main memory when a cache miss occurs.

**Answer: True**

**Explanation:**
- Miss penalty = memory access time
- Major performance factor

---

**T/F 4.4** Cache blocks typically contain multiple words.

**Answer: True**

**Explanation:**
- Blocks = 16-128 bytes (4-32 words)
- Exploits spatial locality

---

**T/F 5.1** Direct mapping allows each block to go to any cache location.

**Answer: False**

**Explanation:**
- Direct mapping: each block maps to exactly one location
- No choice in placement

---

**T/F 5.2** Fully associative mapping has the simplest hardware implementation.

**Answer: False**

**Explanation:**
- Fully associative: most complex (must search all locations)
- Direct mapping: simplest

---

**T/F 5.3** Set-associative mapping is a compromise between direct and fully associative.

**Answer: True**

**Explanation:**
- Set-associative: balances flexibility and complexity
- Block maps to set (like direct)
- Within set, any location (like fully associative)

---

**T/F 5.4** In direct mapping, each memory block maps to exactly one cache location.

**Answer: True**

**Explanation:**
- Direct mapping: one-to-one mapping
- Simple but can cause conflicts

---

**T/F 6.1** LRU replacement policy replaces the least recently used block.

**Answer: True**

**Explanation:**
- LRU = Least Recently Used
- Replaces block not used for longest time

---

**T/F 6.2** FIFO replacement policy typically has better hit rate than LRU.

**Answer: False**

**Explanation:**
- LRU typically has better hit rate
- FIFO is simpler but less accurate

---

**T/F 6.3** Replacement is needed when a cache miss occurs and the cache is full.

**Answer: True**

**Explanation:**
- Miss + full cache → must replace
- Replacement policy decides which block

---

**T/F 6.4** Random replacement requires no additional hardware.

**Answer: True**

**Explanation:**
- Random: just pick random block
- No tracking needed
- Simple but not optimal

---

**T/F 7.1** Write-through policy writes to both cache and memory immediately.

**Answer: True**

**Explanation:**
- Write-through: update both immediately
- Memory always current

---

**T/F 7.2** Write-back policy writes to memory only when the block is replaced.

**Answer: True**

**Explanation:**
- Write-back: write to cache first
- Write to memory when block evicted
- Less memory traffic

---

**T/F 7.3** Write-back typically has less memory traffic than write-through.

**Answer: True**

**Explanation:**
- Write-back: multiple writes to same block = one memory write
- Write-through: every write goes to memory
- Write-back has less traffic

---

**T/F 7.4** Write allocation means allocating cache space on a write miss.

**Answer: True**

**Explanation:**
- Write allocation: on write miss, bring block into cache
- Then write to cache
- Exploits locality

---

**T/F 8.1** AMAT = Hit time + Miss rate × Miss penalty.

**Answer: True**

**Explanation:**
- Standard AMAT formula
- Accounts for both hits and misses

---

**T/F 8.2** Increasing cache size always improves performance.

**Answer: False**

**Explanation:**
- Larger cache may increase hit time
- Diminishing returns
- Cost may not be worth it

---

**T/F 8.3** A higher hit rate means better cache performance.

**Answer: True**

**Explanation:**
- Higher hit rate = more fast accesses
- Better performance

---

**T/F 8.4** Effective CPI = Base CPI + Memory stall cycles per instruction.

**Answer: True**

**Explanation:**
- Effective CPI accounts for memory stalls
- Base CPI + memory overhead

---

**T/F 9.1** L1 cache is typically smaller and faster than L2 cache.

**Answer: True**

**Explanation:**
- L1: small, fast (optimize speed)
- L2: large, slower (optimize capacity)

---

**T/F 9.2** A unified cache stores both instructions and data.

**Answer: True**

**Explanation:**
- Unified: single cache for both
- Common for L2/L3

---

**T/F 9.3** Split caches allow parallel access to instructions and data.

**Answer: True**

**Explanation:**
- Split: separate I-cache and D-cache
- Can access both simultaneously
- Common for L1

---

**T/F 9.4** Multi-level caches help balance speed and size requirements.

**Answer: True**

**Explanation:**
- L1: fast but small
- L2: slower but large
- Best of both worlds

---

**T/F 10.1** DRAM requires periodic refresh to maintain data.

**Answer: True**

**Explanation:**
- DRAM: charge leaks, must refresh
- Refresh every few milliseconds

---

**T/F 10.2** SRAM is faster but more expensive than DRAM.

**Answer: True**

**Explanation:**
- SRAM: faster, more expensive, less dense
- DRAM: slower, cheaper, more dense

---

**T/F 10.3** DRAM is typically used for main memory.

**Answer: True**

**Explanation:**
- DRAM: cheap, dense → main memory
- SRAM: fast, expensive → cache

---

**T/F 10.4** SRAM is typically used for cache memory.

**Answer: True**

**Explanation:**
- SRAM: fast → cache
- DRAM: cheap → main memory

---

*[Continued in Part 2 with Short Answer Solutions...]*

