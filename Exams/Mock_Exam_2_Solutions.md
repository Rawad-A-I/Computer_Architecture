# Mock Exam 2: Solution Guide
## Computer Architecture - Final Examination

---

## Problem 1: True/False Solutions

**1.1** The Control Unit generates control signals based on the instruction opcode.

**Answer: True**

**Explanation:**
- The Control Unit decodes the opcode from the Instruction Register
- It generates the appropriate control signals to activate hardware components
- This is the primary function of the Control Unit

---

**1.2** In a load-store architecture, arithmetic operations can be performed directly on memory operands.

**Answer: False**

**Explanation:**
- Load-store architecture (like MIPS) requires data to be loaded into registers first
- Arithmetic operations can only be performed on register operands
- Memory operands must be loaded via LOAD instruction before arithmetic

---

**1.3** A 16-bit address bus allows direct addressing of 64 KB in a byte-addressable system.

**Answer: True**

**Explanation:**
- 16-bit address bus = 2¹⁶ = 65,536 locations
- In byte-addressable system: 65,536 bytes = 64 KB

---

**1.4** Pipeline hazards always result in pipeline stalls.

**Answer: False**

**Explanation:**
- Forwarding (bypassing) can eliminate many data hazards without stalling
- Branch prediction can reduce control hazard penalties
- Not all hazards require stalls

---

**1.5** Forwarding (bypassing) can eliminate all data hazards without stalling.

**Answer: False**

**Explanation:**
- Forwarding can eliminate most RAW hazards
- However, load-use hazards still require at least 1-cycle stall
- Data must be available before it can be forwarded

---

**1.6** In a 4-way set associative cache, each set contains exactly 4 cache lines.

**Answer: True**

**Explanation:**
- 4-way set associative means 4 lines per set
- This is the definition of "4-way"

---

**1.7** Write-through cache policy reduces memory write traffic compared to write-back.

**Answer: False**

**Explanation:**
- Write-through writes to memory on every cache write (high traffic)
- Write-back only writes to memory when block is replaced (lower traffic)
- Write-back reduces memory write traffic

---

**1.8** The miss penalty is the time required to access the cache.

**Answer: False**

**Explanation:**
- Miss penalty is the time to handle a cache miss (access lower level memory)
- Hit time is the time required to access the cache
- These are different concepts

---

**1.9** DRAM has faster access time than SRAM.

**Answer: False**

**Explanation:**
- SRAM is faster (1-5 ns) than DRAM (50-100 ns)
- SRAM is used for cache, DRAM for main memory
- Speed is why SRAM is used despite higher cost

---

**1.10** RAID 5 can survive the failure of one disk.

**Answer: True**

**Explanation:**
- RAID 5 uses distributed parity
- Can reconstruct data from remaining disks and parity
- Fault tolerance: 1 disk failure

---

**1.11** The average seek time of a disk is typically one-third of the full stroke time.

**Answer: True**

**Explanation:**
- Average seek time ≈ 1/3 of full stroke time
- This is a common approximation in disk performance analysis

---

**1.12** SSDs have no moving parts, making them more durable than HDDs.

**Answer: True**

**Explanation:**
- SSDs use flash memory (no mechanical components)
- HDDs have moving platters and heads
- SSDs are more resistant to shock and vibration

---

**1.13** Programmed I/O is more efficient than interrupt-driven I/O for slow devices.

**Answer: False**

**Explanation:**
- Interrupt-driven I/O is more efficient
- CPU can do other work while waiting
- Programmed I/O wastes CPU cycles polling

---

**1.14** In isolated I/O, memory and I/O devices share the same address space.

**Answer: False**

**Explanation:**
- Isolated I/O uses **separate** address spaces
- Memory-mapped I/O shares the address space
- This is the key difference between the two approaches

---

**1.15** DMA requires the CPU to be involved in every data transfer.

**Answer: False**

**Explanation:**
- DMA (Direct Memory Access) bypasses the CPU
- CPU only involved at start (setup) and end (completion)
- Data transfers happen directly between I/O and memory

---

**1.16** A dedicated bus has separate lines for address and data.

**Answer: True**

**Explanation:**
- Dedicated bus: separate physical lines for address and data
- Multiplexed bus: shared lines for address and data
- This is the definition of dedicated bus

---

**1.17** Asynchronous bus timing requires a common clock signal.

**Answer: False**

**Explanation:**
- Asynchronous timing uses **handshaking** (REQ/ACK), no common clock
- Synchronous timing requires a common clock signal
- This is the key difference

---

**1.18** Centralized bus arbitration has a single point of failure.

**Answer: True**

**Explanation:**
- Centralized arbitration uses a single arbiter
- If arbiter fails, entire bus system fails
- Distributed arbitration has no single point of failure

---

**1.19** The Instruction Register (IR) holds the address of the next instruction to execute.

**Answer: False**

**Explanation:**
- IR holds the **current instruction** being executed
- PC (Program Counter) holds the address of the next instruction
- These are different registers with different purposes

---

**1.20** Cache blocks are typically larger than a single word to exploit spatial locality.

**Answer: True**

**Explanation:**
- Spatial locality: nearby items likely to be accessed
- Larger blocks bring in nearby data
- This improves hit rate for sequential access patterns

---

## Problem 2: Set-Associative Cache Solutions

### 2.1 Address Format and Cache Organization [15 pts]

**Given:**
- Cache size: 256 bytes
- Line size: 16 bytes
- Address size: 20 bits
- 8-way set associative

**Calculations:**
- Number of lines = 256 / 16 = 16 lines
- Number of sets = 16 / 8 = 2 sets = 2¹
- Word offset bits = log₂(16) = 4 bits
- Set index bits = log₂(2) = 1 bit
- Tag bits = 20 - 1 - 4 = 15 bits

**Address Format:**
```
┌──────────────┬──────┬──────┐
│     Tag      │ Set  │ Word │
│   15 bits    │1 bit │4 bits│
└──────────────┴──────┴──────┘
```

**Cache Organization:**
- 2 sets, each with 8 lines
- Each line: 16 bytes (determined by 4 LSB for word offset)

**Mapping Description:**
- Each memory block maps to a specific set: **Set = (Block number) mod 2**
- Within the assigned set, block can be in any of the 8 lines
- When set is full, replacement algorithm selects which line to replace

**Diagram:**
```
Set 0: [Line 0] [Line 1] [Line 2] [Line 3] [Line 4] [Line 5] [Line 6] [Line 7]
Set 1: [Line 0] [Line 1] [Line 2] [Line 3] [Line 4] [Line 5] [Line 6] [Line 7]
```

---

### 2.2 Address Assignment [5 pts]

**Address: 3F5A1₁₆ = 0011 1111 0101 1010 0001₂**

**Breaking down the 20-bit address:**
- Tag: 0011 1111 0101 101 (15 bits)
- Set: 0 (1 bit) = Set 0
- Word: 0001 (4 bits)

**Answer:** The address 3F5A1₁₆ can be assigned to **Set 0**, which contains **8 lines** (Line 0 through Line 7 of Set 0).

The block can be placed in any of the 8 lines within Set 0.

---

### 2.3 Cache Set Assignment [4 pts]

**Given addresses:**
- 3F5A1₁₆ = 0011 1111 0101 1010 0001₂
- 2C4Bx₁₆ = 0010 1100 0100 1011 xxxx₂

**For same set assignment:**
- 3F5A1₁₆ has Set = 0 (bit 4 from right)
- 2C4Bx₁₆ must have Set = 0

**2C4Bx₁₆ in binary:** 0010 1100 0100 1011 xxxx₂
- Set bit is position 4 from right
- We need: Set bit = 0

**Converting x to binary (4 bits):**
- x = 0: 2C4B0₁₆ = ...1011 0000₂ → Set = 0 ✓
- x = 1: 2C4B1₁₆ = ...1011 0001₂ → Set = 0 ✓
- x = 2: 2C4B2₁₆ = ...1011 0010₂ → Set = 0 ✓
- x = 3: 2C4B3₁₆ = ...1011 0011₂ → Set = 0 ✓
- x = 4: 2C4B4₁₆ = ...1011 0100₂ → Set = 0 ✓
- x = 5: 2C4B5₁₆ = ...1011 0101₂ → Set = 0 ✓
- x = 6: 2C4B6₁₆ = ...1011 0110₂ → Set = 0 ✓
- x = 7: 2C4B7₁₆ = ...1011 0111₂ → Set = 0 ✓
- x = 8: 2C4B8₁₆ = ...1011 1000₂ → Set = 0 ✓
- x = 9: 2C4B9₁₆ = ...1011 1001₂ → Set = 0 ✓
- x = A: 2C4BA₁₆ = ...1011 1010₂ → Set = 0 ✓
- x = B: 2C4BB₁₆ = ...1011 1011₂ → Set = 0 ✓
- x = C: 2C4BC₁₆ = ...1011 1100₂ → Set = 0 ✓
- x = D: 2C4BD₁₆ = ...1011 1101₂ → Set = 0 ✓
- x = E: 2C4BE₁₆ = ...1011 1110₂ → Set = 0 ✓
- x = F: 2C4BF₁₆ = ...1011 1111₂ → Set = 0 ✓

**Answer:** x can be **any hexadecimal digit (0-F)** because the set bit (position 4) is determined by the lower 4 bits, and all values of x result in Set = 0.

Wait, let me recalculate. The set bit is the 5th bit from the right (after 4 word bits). Looking at 2C4Bx:
- 2C4B in binary: 0010 1100 0100 1011
- The set bit is position 5 from right
- For Set = 0, we need bit 5 = 0

Actually, all values of x (0-F) will have the same set bit since x only affects the lower 4 bits (word offset), and the set bit is the 5th bit.

**Answer: x can be any value 0-F (all 16 hexadecimal digits)**

---

### 2.4 Comparators [6 pts]

**Number of Comparators:**
- This is an 8-way set associative cache
- Each set has 8 lines
- We need to check the tag in all lines of the set
- **Number of comparators = 8** (one per line in each set)

**Size of Each Comparator:**
- Each comparator compares the tag field
- Tag size = 15 bits (from part 2.1)
- **Size of each comparator = 15 bits**

**Justification:**
- After determining the set (using set index bit), we search all 8 lines in that set
- We compare the 15-bit tag from the address with the tag stored in each cache line
- Since there are 8 lines per set, we need 8 comparators operating in parallel
- Each comparator compares 15-bit tags

---

### 2.5 Replacement Algorithms Comparison [10 pts]

**LRU (Least Recently Used):**
- **Principle:** Replace the line that has been accessed least recently
- **Implementation:** Track access order for each set (can use counters or state machines)
- **Advantages:**
  - Exploits temporal locality effectively
  - Generally provides good hit rates
  - Keeps recently used data in cache
- **Disadvantages:**
  - More complex hardware (requires tracking access history)
  - Higher cost (counters or state machines needed)
  - Can be expensive for high associativity

**FIFO (First-In-First-Out):**
- **Principle:** Replace the line that has been in cache longest
- **Implementation:** Round-robin or circular buffer (simple counter)
- **Advantages:**
  - Simple to implement
  - Low hardware cost
  - Easy to understand
- **Disadvantages:**
  - Doesn't consider recent usage
  - May evict frequently used blocks
  - Less effective than LRU

**Which is Better for This Cache:**
- **LRU would be better** for this 8-way set associative cache because:
  1. **High associativity (8-way):** More choices per set means LRU can better exploit temporal locality
  2. **Better hit rate:** LRU typically provides 5-10% better hit rate than FIFO
  3. **Worth the cost:** For 8-way, the hardware cost of LRU is reasonable
  4. **Performance benefit:** The improved hit rate justifies the added complexity

**However:** For very high associativity (16-way or more), the cost of LRU might not be justified, and simpler algorithms might be preferred.

---

## Problem 3: Direct-Mapped Cache Solutions

### 3.1 Address Division [4 pts]

**Given:**
- Memory block size: 8 bytes
- Number of blocks: 32 blocks
- Cache data size: 32 bytes

**Calculations:**
- Total memory size = 32 blocks × 8 bytes = 256 bytes = 2⁸ → 8-bit address needed
- Number of cache lines = 32 bytes / 8 bytes = 4 lines = 2² → 2 bits for index
- Word offset = log₂(8) = 3 bits (for 8 bytes per block)
- Tag bits = 8 - 2 - 3 = 3 bits

**Address Format:**
```
┌──────┬──────┬──────┐
│ Tag  │Index │Offset│
│3 bits│2 bits│3 bits│
└──────┴──────┴──────┘
```

---

### 3.2 Cache Hit/Miss Simulation [8 pts]

**Memory references:** 24, 16, 8, 40, 32, 8, 24, 48

**Converting to binary (8 bits):**
- 24 = 00011000₂
- 16 = 00010000₂
- 8 = 00001000₂
- 40 = 00101000₂
- 32 = 00100000₂
- 8 = 00001000₂
- 24 = 00011000₂
- 48 = 00110000₂

**Breaking down each address (Tag | Index | Offset):**

| Address | Binary      | Tag | Index | Block | Hit/Miss | Cache State After |
|---------|-------------|-----|-------|-------|----------|-------------------|
| 24      | 00011000    | 000 | 11    | 3     | M        | Line 3: Block 3   |
| 16      | 00010000    | 000 | 10    | 2     | M        | Line 2: Block 2   |
| 8       | 00001000    | 000 | 01    | 1     | M        | Line 1: Block 1   |
| 40      | 00101000    | 001 | 01    | 5     | M        | Line 1: Block 5   |
| 32      | 00100000    | 001 | 00    | 4     | M        | Line 0: Block 4   |
| 8       | 00001000    | 000 | 01    | 1     | M        | Line 1: Block 1   |
| 24      | 00011000    | 000 | 11    | 3     | H        | Line 3: Block 3   |
| 48      | 00110000    | 001 | 10    | 6     | M        | Line 2: Block 6   |

**Final Answer:**
- 24: **M**
- 16: **M**
- 8: **M**
- 40: **M**
- 32: **M**
- 8: **M**
- 24: **H**
- 48: **M**

**Cache Contents (Final State):**
- Line 0 (Index 00): Block 4 (Tag 001)
- Line 1 (Index 01): Block 1 (Tag 000) - replaced Block 5
- Line 2 (Index 10): Block 6 (Tag 001) - replaced Block 2
- Line 3 (Index 11): Block 3 (Tag 000)

---

## Problem 4: Cache Performance Solutions

### 4.1 AMAT Calculation [8 pts]

**Given:**
- Line size: 64 bytes
- Word size: 8 bytes
- Cache access time: 4 ns
- Hit rate: 96% → Miss rate = 4% = 0.04
- First word miss penalty: 25 ns
- Subsequent word penalty: 4 ns per word

**Calculations:**
- Words per line = 64 / 8 = 8 words
- First word: 25 ns
- Remaining 7 words: 7 × 4 ns = 28 ns
- **Total miss penalty = 25 + 28 = 53 ns**

**AMAT Formula:**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
AMAT = 4 ns + (0.04 × 53 ns)
AMAT = 4 ns + 2.12 ns
AMAT = 6.12 ns
```

**Answer: Average Memory Access Time = 6.12 ns**

---

### 4.2 Multi-Level Cache Miss Rates [5 pts]

**Given:**
- Total memory references: 200
- L1 misses: 12
- L2 misses: 5 (out of 12 L1 misses)
- L3 misses: 2 (out of 5 L2 misses)

**L1 Cache:**
- **Global miss rate = 12 / 200 = 0.06 = 6%**
- **Local miss rate = 12 / 200 = 0.06 = 6%**
  - (All 200 references access L1)

**L2 Cache:**
- **Global miss rate = 5 / 200 = 0.025 = 2.5%**
- **Local miss rate = 5 / 12 = 0.417 = 41.7%**
  - (Only 12 L1 misses access L2)

**L3 Cache:**
- **Global miss rate = 2 / 200 = 0.01 = 1%**
- **Local miss rate = 2 / 5 = 0.4 = 40%**
  - (Only 5 L2 misses access L3)

**Summary:**
- L1: Global 6%, Local 6%
- L2: Global 2.5%, Local 41.7%
- L3: Global 1%, Local 40%

---

### 4.3 Cache Size, Associativity, and Performance [5 pts]

**Cache Size:**
- **Larger cache:**
  - **Pros:** Lower miss rate (more data fits), better performance
  - **Cons:** Higher hit time (more complex addressing), higher cost, more power
- **Smaller cache:**
  - **Pros:** Faster hit time, lower cost, less power
  - **Cons:** Higher miss rate, worse performance

**Associativity:**
- **Higher associativity:**
  - **Pros:** Lower miss rate (more flexibility), reduces conflicts
  - **Cons:** Higher hit time (more comparators), higher cost, more complex
- **Lower associativity:**
  - **Pros:** Faster hit time, simpler, cheaper
  - **Cons:** Higher miss rate, more conflicts

**Trade-offs:**
1. **Size vs. Speed:** Larger = better hit rate but slower hit time
2. **Associativity vs. Cost:** Higher = better hit rate but more expensive
3. **Optimal Balance:** Modern processors use moderate size with moderate associativity (e.g., 32KB L1, 4-way)

**Performance Impact:**
- AMAT = Hit Time + (Miss Rate × Miss Penalty)
- Increasing size/associativity reduces miss rate but may increase hit time
- Optimal design balances these factors

---

## Problem 5: Processor Performance Solutions

### 5.1 Execution Time Comparison [4 pts]

**Given:**
- Instruction Count (IC) = 1.5 × 10⁹
- Processor P: Clock Rate = 2.5 GHz = 2.5 × 10⁹ Hz, CPI = 2.0
- Processor Q: Clock Rate = 3.5 GHz = 3.5 × 10⁹ Hz, CPI = 2.8

**Formula:**
```
Execution Time = (CPI × IC) / Clock Rate
```

**Processor P:**
```
Time_P = (2.0 × 1.5 × 10⁹) / (2.5 × 10⁹)
Time_P = 3.0 × 10⁹ / 2.5 × 10⁹
Time_P = 1.2 seconds
```

**Processor Q:**
```
Time_Q = (2.8 × 1.5 × 10⁹) / (3.5 × 10⁹)
Time_Q = 4.2 × 10⁹ / 3.5 × 10⁹
Time_Q = 1.2 seconds
```

**Comparison:**
- Both processors have the same execution time (1.2 seconds)
- They are equally fast

**Answer: Both processors have equal performance (1.2 seconds each)**

---

### 5.2 Optimization Impact [4 pts]

**Optimization:**
- Instruction count reduced by 20%: IC_new = 1.5 × 10⁹ × 0.80 = 1.2 × 10⁹
- CPI increased by 30%

**New CPI:**
- CPI_P_new = 2.0 × 1.30 = 2.6
- CPI_Q_new = 2.8 × 1.30 = 3.64

**New Execution Times:**

**Processor P:**
```
Time_P_new = (2.6 × 1.2 × 10⁹) / (2.5 × 10⁹)
Time_P_new = 3.12 × 10⁹ / 2.5 × 10⁹
Time_P_new = 1.248 seconds
```

**Processor Q:**
```
Time_Q_new = (3.64 × 1.2 × 10⁹) / (3.5 × 10⁹)
Time_Q_new = 4.368 × 10⁹ / 3.5 × 10⁹
Time_Q_new = 1.248 seconds
```

**Comparison:**
- Both still have equal execution time (1.248 seconds)
- **Processor P benefits more** because:
  - Original CPI was lower (2.0 vs 2.8)
  - The 30% CPI increase has less absolute impact on P
  - P's new CPI (2.6) is still lower than Q's new CPI (3.64)

**Answer: Processor P benefits more from the optimization because it started with a lower CPI, so the percentage increase has less absolute impact.**

---

### 5.3 CPI, Clock Rate, and Instruction Count [2 pts]

**All three factors contribute to execution time:**

**Formula:** Execution Time = (CPI × IC) / Clock Rate

**CPI (Cycles Per Instruction):**
- Lower CPI = fewer cycles per instruction = faster execution
- Depends on: instruction complexity, pipeline efficiency, cache performance
- Can be improved through: better instruction set, pipelining, cache optimization

**Clock Rate (Frequency):**
- Higher clock rate = more cycles per second = faster execution
- But: higher clock rate may increase CPI (more pipeline stages, complexity)
- Trade-off: speed vs. power, heat, complexity

**Instruction Count (IC):**
- Fewer instructions = less work to do = faster execution
- Depends on: instruction set efficiency, compiler optimizations
- Can be reduced through: better algorithms, compiler optimizations, RISC architectures

**Key Insight:** All three must be considered together. A processor with high clock rate but high CPI might be slower than one with lower clock rate but lower CPI.

---

## Problem 6: Instruction Cycle Solutions

### 6.1 Memory Operations [2 pts]

**Given:**
- PC = 11001
- Claimed: MAR = 11001, MBR = 1011 0010

**Analysis:**
- During fetch cycle:
  - MAR is loaded with PC value = **11001** ✓
  - Instruction is read from memory[11001] = **1011 0010** ✓
  - MBR contains the instruction = **1011 0010** ✓

**Answer: True**

The statement is correct. MAR contains the address (11001) and MBR contains the instruction data (1011 0010).

---

### 6.2 Instruction Cycle Order [2 pts]

**Correct order:**
1. d) Determine instruction address (PC)
2. c) Read instruction from memory (Fetch)
3. f) Analyze instruction (Decode)
4. g) Calculate operand address
5. a) Fetch operand from memory
6. e) Perform operation (Execute)
7. b) Write result to memory (Write back)

**Answer: d - c - f - g - a - e - b**

---

### 6.3 Indirect Addressing Cycle [3 pts]

**What happens:**
1. Instruction contains an address (indirect address)
2. This address is placed in MAR
3. Memory is read to get the **actual address** (effective address)
4. The actual address is loaded into MAR
5. Then normal operand fetch/execute proceeds

**When used:**
- Indirect addressing mode
- Pointer dereferencing
- Array indexing through pointers
- When instruction specifies "address of address"

**Example:**
- Instruction: LOAD R1, *R2 (load from address in R2)
- Indirect cycle: Read R2 → get address → use that address to fetch data

---

### 6.4 Memory Accesses for MULTIPLY [3 pts]

**Instruction:** MULTIPLY C, A, B (C = A × B)

**Memory Accesses Required:**

1. **Read memory location A** → Load value into register (1 access)
2. **Read memory location B** → Load value into register (1 access)
3. **Multiply values** (in CPU/ALU, no memory access)
4. **Write result to memory location C** → Store result (1 access)

**Total: 3 memory accesses** (2 reads + 1 write)

**Justification:**
- Must read both operands (A and B) from memory
- Multiplication happens in CPU (no memory access)
- Result must be written to destination (C)
- This is why memory-to-memory operations are slower than register operations

---

**End of Solution Guide**
