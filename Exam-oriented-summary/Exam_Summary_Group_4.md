# Group 4: Memory Architecture & Hierarchy - Exam Summary

## Key Exam Topics

### 1. Memory Hierarchy (MCQ/Diagram)
**Levels (Fastest to Slowest):**
1. **CPU Registers:** 1 cycle, smallest, most expensive
2. **Cache (L1, L2, L3):** 1-50 cycles, KB-MB, expensive
3. **Main Memory (DRAM):** 50-100 cycles, GB, moderate cost
4. **Secondary Storage:** Millions of cycles, TB, cheap

**Trade-off:** Speed vs. Capacity vs. Cost (cannot optimize all)

**Key Principle:** Store frequently accessed data in fast memory.

### 2. Locality of Reference (MCQ/Short Answer)
**Two Types:**

**Temporal Locality:**
- Recently accessed items likely to be accessed again soon
- **Example:** Loop variables, function calls

**Spatial Locality:**
- Items near recently accessed items likely to be accessed soon
- **Example:** Sequential instructions, array elements

**How Hierarchy Exploits Locality:**
- Temporal: Copy recently accessed items to faster memory
- Spatial: When accessing one word, bring entire block

### 3. Cache Fundamentals (MCQ/Calculation)
**Key Definitions:**
- **Block (Line):** Unit of transfer (typically 16-128 bytes)
- **Hit:** Data found in cache
- **Miss:** Data not in cache, must load from memory
- **Hit Ratio:** hits / total_accesses
- **Miss Ratio:** misses / total_accesses = 1 - hit_ratio
- **Miss Penalty:** Time to handle miss (10-100+ cycles)

**Cache Structure:**
```
┌──────┬──────┬──────────┐
│ Valid│ Tag  │   Data   │
│ Bit  │      │  (Block) │
└──────┴──────┴──────────┘
```

### 4. Cache Mapping Techniques (MCQ/Diagram/Calculation)
**Three Types:**

**A. Direct Mapping:**
- Each block maps to **exactly one** cache line
- **Formula:** `i = j mod m` (i = cache line, j = block, m = lines)
- **Address:** Tag | Line | Word
- **Advantages:** Simple, fast, inexpensive
- **Disadvantages:** Thrashing (conflicts), low flexibility

**B. Fully Associative:**
- Block can be in **any** cache line
- **Address:** Tag | Word
- **Advantages:** Maximum flexibility, no conflicts
- **Disadvantages:** Expensive (many comparators), slow search

**C. Set-Associative:**
- Block maps to **one set**, can be in **any line within set**
- **Formula:** Set = (Block number) mod (Number of sets)
- **Address:** Tag | Set | Word
- **Common:** 2-way, 4-way, 8-way
- **Advantages:** Good balance (flexibility vs. cost)
- **Disadvantages:** More complex than direct

**Address Breakdown Calculation:**
- Cache: 32 lines (2^5) → 5 bits for line
- Block size: 8 bytes (2^3) → 3 bits for word
- Tag: Remaining bits
- **Example:** 24-bit address → Tag: 16 bits, Line: 5 bits, Word: 3 bits

### 5. Cache Replacement Policies (MCQ/Short Answer)
**Algorithms (Best to Worst Effectiveness):**
1. **LRU (Least Recently Used):** Most effective, most complex
2. **LFU (Least Frequently Used):** Considers frequency
3. **FIFO (First-In-First-Out):** Simple, less effective
4. **Random:** Simplest, least effective

**Modern Practice:** LRU most popular.

### 6. Write Policies (MCQ/Comparison)
**Two Policies:**

**Write Through:**
- Every write to cache **also writes to memory** immediately
- **Advantages:** Simple, always consistent
- **Disadvantages:** High memory traffic, slow writes
- **Solution:** Write buffer

**Write Back:**
- Write only to cache, write to memory when block replaced
- **Dirty Bit:** Indicates if block modified
- **Advantages:** Minimizes memory writes, faster
- **Disadvantages:** More complex, cache and memory may differ

**Modern Practice:** Write back + Write allocate (most common)

### 7. Cache Performance (Calculation)
**Average Memory Access Time (AMAT):**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Example:**
- Hit time = 2 ns
- Miss rate = 3% = 0.03
- Miss penalty = 50 ns
- **AMAT = 2 + (0.03 × 50) = 2 + 1.5 = 3.5 ns**

**CPI with Cache:**
```
CPI_actual = CPI_base + (I-cache miss rate × Miss penalty) + 
             (Load/store fraction × D-cache miss rate × Miss penalty)
```

**Example:**
- Base CPI = 2
- I-cache miss rate = 2%
- D-cache miss rate = 5%
- Load/store fraction = 40%
- Miss penalty = 100 cycles
- **CPI = 2 + (0.02 × 100) + (0.4 × 0.05 × 100) = 6**

### 8. Multi-Level Caches (Calculation)
**Typical Organization:**
- **L1:** 32 KB, 1-2 cycles, on-chip
- **L2:** 256 KB - 8 MB, 5-20 cycles, on/off-chip
- **L3:** 8-64 MB, 20-50 cycles, on/off-chip
- **Main Memory:** GB, 50-100+ cycles

**AMAT with Multiple Levels:**
```
AMAT = L1_hit_time + 
       L1_miss_rate × (L2_hit_time + 
       L2_miss_rate × (L3_hit_time + 
       L3_miss_rate × Memory_access_time))
```

**Example:**
- L1: 1 cycle, 2% miss rate
- L2: 10 cycles, 0.5% global miss rate
- Memory: 100 cycles
- **AMAT = 1 + 0.02 × (10 + 0.005 × 100) = 1 + 0.02 × 10.5 = 1.21 cycles**

### 9. DRAM vs. SRAM (MCQ/Comparison)
**DRAM (Dynamic RAM):**
- **Storage:** Capacitor (charge)
- **Refresh:** Required (every few ms)
- **Speed:** Slower (50-100 ns)
- **Density:** High
- **Cost:** Low
- **Use:** Main memory

**SRAM (Static RAM):**
- **Storage:** Flip-flop (circuit)
- **Refresh:** Not needed
- **Speed:** Fast (1-5 ns)
- **Density:** Low
- **Cost:** High
- **Use:** Cache memory

**Key Difference:** DRAM needs refresh, SRAM doesn't.

### 10. Error Detection and Correction (MCQ/Short Answer)
**Hamming Code:**
- Detects and corrects **single-bit errors**
- Adds check bits (redundancy)
- Check bits at positions that are powers of 2 (1, 2, 4, 8, ...)
- **Overhead:** More bits needed (e.g., 8 data → 12 total = 50% overhead)

### 11. Advanced DRAM (MCQ/Short Answer)
**SDRAM (Synchronous DRAM):**
- Access synchronized with external clock
- Predictable timing
- CPU can pipeline operations

**DDR SDRAM (Double Data Rate):**
- Data on **both rising and falling edge** of clock
- **DDR:** 2x SDRAM
- **DDR2:** 4x SDRAM
- **DDR3:** 8x SDRAM
- **DDR4:** 16x SDRAM
- **DDR5:** 32x SDRAM

---

## Common Exam Questions

### Calculation Questions:
1. **AMAT:** Given hit time, miss rate, miss penalty
2. **CPI with Cache:** Calculate actual CPI with cache misses
3. **Address Breakdown:** Tag, line/set, word bits for cache mapping
4. **Multi-Level Cache:** Calculate AMAT with L1, L2, L3

### True/False:
- "Larger cache always improves performance" → **False** (may increase hit time)
- "Write back always faster than write through" → **True** (fewer memory writes)
- "Fully associative has best hit rate" → **True** (but expensive)

### MCQ Topics:
- Which mapping technique is simplest? → **Direct mapping**
- What is most common replacement policy? → **LRU**
- Which memory type needs refresh? → **DRAM**

### Diagram Questions:
- Draw cache structure (valid, tag, data)
- Show address breakdown for different mappings
- Label multi-level cache hierarchy

### Classification:
- Identify cache mapping technique from description
- Match replacement policy to characteristics
- Classify memory types (DRAM vs. SRAM)

---

## Key Formulas

1. **AMAT:** Hit Time + (Miss Rate × Miss Penalty)
2. **Direct Mapping:** i = j mod m
3. **Set-Associative:** Set = Block mod (Number of sets)
4. **Address Breakdown:** Tag bits = Total - Line bits - Word bits

---

## Critical Definitions

- **Cache Hit:** Data found in cache
- **Cache Miss:** Data not in cache
- **Miss Penalty:** Time to handle miss
- **Temporal Locality:** Recent accesses likely again
- **Spatial Locality:** Nearby accesses likely soon
- **Write Through:** Write to cache and memory
- **Write Back:** Write only to cache, memory on replacement

---

## Performance Optimization Strategies

1. **Reduce Miss Rate:** Larger cache, higher associativity, better replacement
2. **Reduce Miss Penalty:** Faster memory, multi-level caches
3. **Reduce Hit Time:** Smaller cache, lower associativity, on-chip cache

**Trade-offs:**
- Larger cache → Lower miss rate, but higher hit time
- Higher associativity → Lower miss rate, but higher hit time
- Larger blocks → Better spatial locality, but fewer blocks fit
