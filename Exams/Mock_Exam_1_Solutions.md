# Mock Exam 1: Solution Guide
## Computer Architecture - Final Examination

---

## Problem 1: True/False Solutions

**1.1** In a Harvard architecture, instructions and data are stored in separate memory spaces.

**Answer: True**

**Explanation:**
- Harvard architecture uses separate memory spaces for instructions and data
- This is different from Von Neumann architecture where both are stored in the same memory
- Separate memories allow simultaneous instruction and data access

---

**1.2** The Memory Address Register (MAR) contains the data being read from or written to memory.

**Answer: False**

**Explanation:**
- MAR (Memory Address Register) contains the **address** of the memory location, not the data
- MBR (Memory Buffer Register) contains the **data** being read from or written to memory
- MAR is connected to the address bus, MBR is connected to the data bus

---

**1.3** A 20-bit address bus can directly address 1 MB of memory in a byte-addressable system.

**Answer: True**

**Explanation:**
- 20-bit address bus = 2²⁰ = 1,048,576 locations
- In a byte-addressable system, each location = 1 byte
- 1,048,576 bytes = 1 MB (1024 × 1024 bytes)

---

**1.4** Pipelining improves both instruction throughput and instruction latency.

**Answer: False**

**Explanation:**
- Pipelining improves **throughput** (instructions per second)
- Pipelining does **NOT** improve latency (time per instruction)
- Latency remains the same, but multiple instructions can be in different stages simultaneously

---

**1.5** In a direct-mapped cache, each memory block can be placed in exactly one cache line.

**Answer: True**

**Explanation:**
- Direct-mapped cache uses the formula: cache line = (block number) mod (number of cache lines)
- Each block maps to exactly one specific cache line
- This is the defining characteristic of direct-mapped cache

---

**1.6** Write-back cache policy always writes to main memory immediately when data is modified in cache.

**Answer: False**

**Explanation:**
- Write-back policy writes to cache immediately, but writes to memory only when the block is replaced
- Write-through policy writes to both cache and memory immediately
- Write-back uses a dirty bit to track modified blocks

---

**1.7** Temporal locality refers to the tendency to access data items that are close together in memory.

**Answer: False**

**Explanation:**
- **Temporal locality:** Recently accessed items are likely to be accessed again soon
- **Spatial locality:** Items close together in memory are likely to be accessed together
- The statement describes spatial locality, not temporal locality

---

**1.8** A fully associative cache requires more comparators than a direct-mapped cache of the same size.

**Answer: True**

**Explanation:**
- Fully associative cache needs one comparator per cache line (all lines must be checked)
- Direct-mapped cache needs only one comparator (only one line needs to be checked)
- For a cache with N lines: fully associative needs N comparators, direct-mapped needs 1 comparator

---

**1.9** DRAM requires periodic refresh cycles to maintain data integrity.

**Answer: True**

**Explanation:**
- DRAM stores data as charge in capacitors
- Capacitors leak charge over time
- Periodic refresh (typically every 64 ms) is required to restore the charge
- This is a fundamental characteristic of DRAM

---

**1.10** SRAM is typically used for main memory due to its high density and low cost.

**Answer: False**

**Explanation:**
- SRAM is faster but more expensive and less dense
- DRAM is used for main memory because it's cheaper and more dense
- SRAM is used for cache memory where speed is critical

---

**1.11** RAID 0 provides fault tolerance through data redundancy.

**Answer: False**

**Explanation:**
- RAID 0 uses striping but has **no redundancy**
- RAID 0 provides no fault tolerance - one disk failure causes data loss
- RAID 1, 5, and 6 provide fault tolerance through redundancy

---

**1.12** The average rotational latency of a disk is equal to half the time for one complete rotation.

**Answer: True**

**Explanation:**
- Rotational latency is the time waiting for the desired sector
- On average, the sector is halfway around the disk
- Average latency = (1/2) × (60 / RPM) × 1000 ms

---

**1.13** DMA allows I/O devices to transfer data directly to memory without CPU involvement.

**Answer: True**

**Explanation:**
- DMA (Direct Memory Access) bypasses the CPU
- I/O module transfers data directly to/from memory
- CPU is only involved at the start (setup) and end (completion interrupt)

---

**1.14** Memory-mapped I/O uses the same address space for both memory and I/O devices.

**Answer: True**

**Explanation:**
- Memory-mapped I/O shares the address space between memory and I/O
- I/O devices appear as memory locations
- Same instructions can be used for both memory and I/O access

---

**1.15** Interrupt-driven I/O is more efficient than programmed I/O because the CPU can do other work while waiting for I/O completion.

**Answer: True**

**Explanation:**
- Programmed I/O: CPU waits and polls for I/O completion
- Interrupt-driven I/O: CPU does other work, I/O module interrupts when ready
- This allows better CPU utilization

---

**1.16** A multiplexed bus requires fewer physical lines than a dedicated bus.

**Answer: True**

**Explanation:**
- Multiplexed bus shares lines for address and data
- Dedicated bus has separate lines for address and data
- Multiplexed bus saves physical lines but requires more cycles

---

**1.17** Synchronous bus timing is simpler to implement than asynchronous bus timing.

**Answer: True**

**Explanation:**
- Synchronous timing uses a common clock, simpler control logic
- Asynchronous timing uses handshaking (REQ/ACK), more complex
- Synchronous is simpler but less flexible

---

**1.18** In set-associative cache, a block can be placed in any line within its assigned set.

**Answer: True**

**Explanation:**
- Set-associative cache: block maps to a specific set, but can be in any line within that set
- This is the defining characteristic of set-associative mapping
- Provides flexibility while limiting hardware complexity

---

**1.19** The Program Counter (PC) is automatically incremented after each instruction fetch.

**Answer: True**

**Explanation:**
- PC contains the address of the next instruction
- After fetching an instruction, PC is incremented to point to the next instruction
- This happens automatically during the fetch cycle

---

**1.20** Cache hit time is typically much longer than main memory access time.

**Answer: False**

**Explanation:**
- Cache hit time is typically **much shorter** than main memory access time
- Cache: 1-10 cycles (nanoseconds)
- Main memory: 50-100+ cycles (nanoseconds)
- Cache is faster, that's why it improves performance

---

## Problem 2: Cache Memory Analysis Solutions

### 2.1 Address Format and Cache Organization [15 pts]

**Given:**
- Cache size: 64 bytes
- Line size: 4 bytes
- Address size: 12 bits
- Byte-addressable

**Calculations:**
- Number of lines = Cache size / Line size = 64 / 4 = 16 lines
- Since 2-way set associative: Number of sets = 16 / 2 = 8 sets = 2³
- Word offset bits = log₂(4) = 2 bits (for 4 bytes per line)
- Set index bits = log₂(8) = 3 bits
- Tag bits = 12 - 3 - 2 = 7 bits

**Address Format:**
```
┌──────────┬──────┬──────┐
│   Tag    │ Set  │ Word │
│  7 bits  │3 bits│2 bits│
└──────────┴──────┴──────┘
```

**Cache Organization:**
- 8 sets, each with 2 lines
- Each line: 4 bytes (determined by 2 LSB for word offset)

**Mapping Description:**
- Each memory block maps to a specific set based on: **Set number = (Block number) mod (Number of sets)**
- Within the assigned set, the block can be placed in any of the 2 lines
- When a set is full and a new block maps to it, a replacement algorithm selects which line to replace

**Diagram:**
```
Set 000: [Line 0] [Line 1]
Set 001: [Line 0] [Line 1]
Set 010: [Line 0] [Line 1]
Set 011: [Line 0] [Line 1]
Set 100: [Line 0] [Line 1]
Set 101: [Line 0] [Line 1]
Set 110: [Line 0] [Line 1]
Set 111: [Line 0] [Line 1]
```

---

### 2.2 Address Assignment [5 pts]

**Address: 5A3₁₆ = 0101 1010 0011₂**

**Breaking down the 12-bit address:**
- Tag: 0101 101 (7 bits)
- Set: 010 (3 bits) = Set 2
- Word: 11 (2 bits)

**Answer:** The address 5A3₁₆ can be assigned to **Set 2**, which contains **2 lines** (Line 0 and Line 1 of Set 2).

The block can be placed in either line of Set 2.

---

### 2.3 Cache Set Assignment [4 pts]

**Given addresses:**
- 5A3₁₆ = 0101 1010 0011₂
- 3Bx₁₆ = 0011 1011 xxxx₂ (where x is a hex digit)

**For same set assignment:**
- 5A3₁₆ has Set = 010 (bits 3-5 from right)
- 3Bx₁₆ must have Set = 010

**3Bx₁₆ in binary:** 0011 1011 xxxx₂
- The set bits are positions 3-5 from right
- We need: Set bits = 010

**Converting x to binary (4 bits):**
- x = 0: 3B0₁₆ = 0011 1011 0000₂ → Set = 000 (wrong)
- x = 2: 3B2₁₆ = 0011 1011 0010₂ → Set = 010 (correct)
- x = 4: 3B4₁₆ = 0011 1011 0100₂ → Set = 100 (wrong)
- x = 6: 3B6₁₆ = 0011 1011 0110₂ → Set = 110 (wrong)
- x = 8: 3B8₁₆ = 0011 1011 1000₂ → Set = 000 (wrong)
- x = A: 3BA₁₆ = 0011 1011 1010₂ → Set = 010 (correct)
- x = C: 3BC₁₆ = 0011 1011 1100₂ → Set = 100 (wrong)
- x = E: 3BE₁₆ = 0011 1011 1110₂ → Set = 110 (wrong)

**Answer:** x can be **2** or **A** (hexadecimal)

---

### 2.4 Comparators [6 pts]

**Number of Comparators:**
- This is a 2-way set associative cache
- Each set has 2 lines
- We need to check the tag in all lines of the set
- **Number of comparators = 2** (one per line in each set)

**Size of Each Comparator:**
- Each comparator compares the tag field
- Tag size = 7 bits (from part 2.1)
- **Size of each comparator = 7 bits**

**Justification:**
- After determining the set (using set index bits), we need to search all lines in that set
- We compare the tag from the address with the tag stored in each cache line
- Since there are 2 lines per set, we need 2 comparators
- Each comparator compares 7-bit tags

---

### 2.5 Replacement Algorithms [10 pts]

**1. LRU (Least Recently Used):**
- **Description:** Replace the cache line that has been accessed least recently
- **How it works:** Track the access order for each set. When a set is full and a new block arrives, replace the least recently accessed line.
- **Application to this cache:** For each of the 8 sets, maintain access order for the 2 lines. When a new block maps to a full set, replace the line that hasn't been accessed for the longest time.

**2. LFU (Least Frequently Used):**
- **Description:** Replace the cache line that has been accessed least frequently
- **How it works:** Maintain a counter for each line tracking access frequency. When replacement is needed, replace the line with the lowest count.
- **Application to this cache:** For each line in each set, maintain an access counter. When a set is full and a new block arrives, replace the line with the lowest access count.

**Alternative: FIFO (First-In-First-Out):**
- **Description:** Replace the line that has been in the cache longest
- **How it works:** Track insertion order. Replace the oldest line.
- **Application:** Maintain insertion order for each set. Replace the first line that was loaded.

---

## Problem 3: Direct-Mapped Cache Solutions

### 3.1 Address Division [4 pts]

**Given:**
- Memory block size: 4 bytes
- Number of blocks: 16 blocks
- Cache data size: 16 bytes

**Calculations:**
- Total memory size = 16 blocks × 4 bytes = 64 bytes = 2⁶ → 6-bit address needed
- Number of cache lines = 16 bytes / 4 bytes = 4 lines = 2² → 2 bits for index
- Word offset = log₂(4) = 2 bits (for 4 bytes per block)
- Tag bits = 6 - 2 - 2 = 2 bits

**Address Format:**
```
┌──────┬──────┬──────┐
│ Tag  │Index │Offset│
│2 bits│2 bits│2 bits│
└──────┴──────┴──────┘
```

---

### 3.2 Cache Hit/Miss Simulation [8 pts]

**Memory references:** 12, 8, 4, 20, 16, 4, 12, 24

**Converting to binary (6 bits):**
- 12 = 001100₂
- 8 = 001000₂
- 4 = 000100₂
- 20 = 010100₂
- 16 = 010000₂
- 4 = 000100₂
- 12 = 001100₂
- 24 = 011000₂

**Breaking down each address (Tag | Index | Offset):**

| Address | Binary      | Tag | Index | Block | Hit/Miss | Cache State After |
|---------|-------------|-----|-------|-------|----------|-------------------|
| 12      | 001100      | 00  | 11    | 3     | M        | Line 3: Block 3   |
| 8       | 001000      | 00  | 10    | 2     | M        | Line 2: Block 2   |
| 4       | 000100      | 00  | 01    | 1     | M        | Line 1: Block 1   |
| 20      | 010100      | 01  | 01    | 5     | M        | Line 1: Block 5   |
| 16      | 010000      | 01  | 00    | 4     | M        | Line 0: Block 4   |
| 4       | 000100      | 00  | 01    | 1     | M        | Line 1: Block 1   |
| 12      | 001100      | 00  | 11    | 3     | H        | Line 3: Block 3   |
| 24      | 011000      | 01  | 10    | 6     | M        | Line 2: Block 6   |

**Final Answer:**
- 12: **M**
- 8: **M**
- 4: **M**
- 20: **M**
- 16: **M**
- 4: **M**
- 12: **H**
- 24: **M**

**Cache Contents (Final State):**
- Line 0 (Index 00): Block 4 (Tag 01)
- Line 1 (Index 01): Block 1 (Tag 00) - replaced Block 5
- Line 2 (Index 10): Block 6 (Tag 01) - replaced Block 2
- Line 3 (Index 11): Block 3 (Tag 00)

---

## Problem 4: Cache Performance Solutions

### 4.1 AMAT Calculation [8 pts]

**Given:**
- Line size: 128 bytes
- Word size: 4 bytes
- Cache access time: 2 ns
- Hit rate: 98% → Miss rate = 2% = 0.02
- First word miss penalty: 15 ns
- Subsequent word penalty: 3 ns per word

**Calculations:**
- Words per line = 128 / 4 = 32 words
- First word: 15 ns
- Remaining 31 words: 31 × 3 ns = 93 ns
- **Total miss penalty = 15 + 93 = 108 ns**

**AMAT Formula:**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
AMAT = 2 ns + (0.02 × 108 ns)
AMAT = 2 ns + 2.16 ns
AMAT = 4.16 ns
```

**Answer: Average Memory Access Time = 4.16 ns**

---

### 4.2 Global vs Local Miss Rates [5 pts]

**Given:**
- Total memory references: 100
- L1 misses: 8
- L2 misses: 3 (out of the 8 L1 misses)

**L1 Cache:**
- **Global miss rate = 8 / 100 = 0.08 = 8%**
- **Local miss rate = 8 / 100 = 0.08 = 8%**
  - (All 100 references access L1, so local = global for L1)

**L2 Cache:**
- **Global miss rate = 3 / 100 = 0.03 = 3%**
- **Local miss rate = 3 / 8 = 0.375 = 37.5%**
  - (Only the 8 L1 misses access L2)

**Summary:**
- L1 Global: 8%, Local: 8%
- L2 Global: 3%, Local: 37.5%

---

### 4.3 Cache Size and Performance [5 pts]

**Reasons why increasing cache size doesn't always improve performance:**

1. **Increased Hit Time:** Larger caches take longer to access due to:
   - More complex addressing logic
   - Longer signal propagation paths
   - More comparators needed for associative caches

2. **Diminishing Returns:** After a certain size, most frequently accessed data already fits in cache. Further increases provide minimal benefit.

3. **Cost vs. Benefit:** Larger caches are more expensive and consume more power. The performance gain may not justify the cost.

4. **Cache Pollution:** Very large caches might hold less frequently used data, potentially evicting more useful data.

5. **Physical Constraints:** On-chip cache size is limited by chip area. Off-chip caches have higher latency.

---

## Problem 5: Processor Performance Solutions

### 5.1 Execution Time Comparison [4 pts]

**Given:**
- Instruction Count (IC) = 2.0 × 10⁹
- Processor X: Clock Rate = 4 GHz = 4 × 10⁹ Hz, CPI = 1.8
- Processor Y: Clock Rate = 3 GHz = 3 × 10⁹ Hz, CPI = 2.5

**Formula:**
```
Execution Time = (CPI × IC) / Clock Rate
```

**Processor X:**
```
Time_X = (1.8 × 2.0 × 10⁹) / (4 × 10⁹)
Time_X = 3.6 × 10⁹ / 4 × 10⁹
Time_X = 0.9 seconds
```

**Processor Y:**
```
Time_Y = (2.5 × 2.0 × 10⁹) / (3 × 10⁹)
Time_Y = 5.0 × 10⁹ / 3 × 10⁹
Time_Y = 1.667 seconds
```

**Comparison:**
- Processor X is faster (0.9 s < 1.667 s)
- Speedup = Time_Y / Time_X = 1.667 / 0.9 = 1.85

**Answer: Processor X is faster by 1.85 times (or 85% faster)**

---

### 5.2 Optimization Impact [4 pts]

**Optimization:**
- Instruction count reduced by 15%: IC_new = 2.0 × 10⁹ × 0.85 = 1.7 × 10⁹
- CPI increased by 25%

**New CPI:**
- CPI_X_new = 1.8 × 1.25 = 2.25
- CPI_Y_new = 2.5 × 1.25 = 3.125

**New Execution Times:**

**Processor X:**
```
Time_X_new = (2.25 × 1.7 × 10⁹) / (4 × 10⁹)
Time_X_new = 3.825 × 10⁹ / 4 × 10⁹
Time_X_new = 0.956 seconds
```

**Processor Y:**
```
Time_Y_new = (3.125 × 1.7 × 10⁹) / (3 × 10⁹)
Time_Y_new = 5.3125 × 10⁹ / 3 × 10⁹
Time_Y_new = 1.771 seconds
```

**Comparison:**
- Processor X is still faster (0.956 s < 1.771 s)
- Speedup = 1.771 / 0.956 = 1.85

**Answer: After optimization, Processor X is still faster by 1.85 times**

---

### 5.3 Clock Rate and Performance [2 pts]

**Explanation:**

Execution time depends on multiple factors:
- **Clock Rate** (frequency)
- **CPI** (Cycles Per Instruction)
- **Instruction Count** (IC)

**Formula:** Execution Time = (CPI × IC) / Clock Rate

A higher clock rate alone doesn't guarantee better performance because:

1. **CPI can vary:** A processor with higher clock rate might have higher CPI due to:
   - More complex instructions
   - Pipeline stalls
   - Cache misses

2. **Instruction Count matters:** A processor might execute fewer instructions due to:
   - Better instruction set
   - More efficient compiler optimizations
   - RISC vs CISC differences

3. **Trade-offs:** Increasing clock rate can:
   - Increase power consumption
   - Require more pipeline stages (increasing CPI)
   - Cause thermal issues

**Example:** Processor Y has higher clock rate (3 GHz vs 4 GHz is lower, but if it had higher clock rate with much higher CPI, it could be slower)

---

## Problem 6: Instruction Cycle Solutions

### 6.1 Memory Operations [2 pts]

**Given:**
- PC = 10110
- Claimed: MAR = 0011 0100, MBR = 10110

**Analysis:**
- PC contains 10110, which is the address of the next instruction
- During fetch cycle:
  - MAR should be loaded with PC value = **10110** (not 0011 0100)
  - Instruction is read from memory[10110] = 0011 0100
  - MBR should contain the instruction = **0011 0100** (not 10110)

**Answer: False**

The statement is incorrect because:
- MAR should contain the address (10110), not 0011 0100
- MBR should contain the data/instruction (0011 0100), not the address (10110)

---

### 6.2 Instruction Cycle Order [2 pts]

**Given sequence:** d - e - a - b - g - f - c

**Correct order should be:**
1. d) Determine the address of the instruction to be executed (PC)
2. e) Read instruction from its memory location into the processor (Fetch)
3. a) Analyze instruction to determine type of operation and operands (Decode)
4. b) Determine the address of the operand (Address calculation)
5. g) Fetch the operand from memory or read it in from I/O (Operand fetch)
6. f) Perform the operation indicated in the instruction (Execute)
7. c) Write the result into memory or out to I/O (Write back)

**Given sequence:** d - e - a - b - g - f - c

This matches the correct order!

**Answer: True**

---

### 6.3 Fetch vs Execute Cycle [3 pts]

**Fetch Cycle:**
- **Purpose:** Retrieve the next instruction from memory
- **Steps:**
  1. PC → MAR (transfer program counter to memory address register)
  2. Assert Read signal
  3. Memory → MBR (memory places instruction in memory buffer register)
  4. MBR → IR (transfer instruction to instruction register)
  5. Increment PC (PC = PC + instruction_size)

**Execute Cycle:**
- **Purpose:** Perform the operation specified by the instruction
- **Steps vary by instruction type:**
  - **Data Processing:** Read operands, perform ALU operation, write result
  - **Memory Operations:** Calculate address, read/write memory
  - **Control Operations:** Update PC for branches/jumps
  - **I/O Operations:** Transfer data to/from I/O devices

**Key Difference:**
- Fetch: Gets the instruction (same for all instructions)
- Execute: Performs the specific operation (varies greatly by instruction type)

---

### 6.4 Memory Accesses for ADD Instruction [3 pts]

**Instruction:** ADD B, A (Add value at B to value at A, store result in A)

**Memory Accesses Required:**

1. **Read memory location A** → Load value into register (1 access)
2. **Read memory location B** → Load value into register (1 access)
3. **Add values** (in CPU/ALU, no memory access)
4. **Write result to memory location A** → Store result (1 access)

**Total: 3 memory accesses** (2 reads + 1 write)

**Justification:**
- The instruction requires reading both operands from memory
- The addition operation happens in the CPU (no memory access)
- The result must be written back to memory location A
- This is why complex instructions with memory operands take longer to execute

---

**End of Solution Guide**
