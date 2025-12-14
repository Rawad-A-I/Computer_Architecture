# Mock Exam 5: Solution Guide
## Comprehensive Final Examination

---

## Problem 1: True/False Solutions

**1.1** The ALU performs arithmetic operations while the Control Unit generates control signals.

**Answer: True**

**Explanation:**
- ALU (Arithmetic Logic Unit) performs arithmetic and logical operations
- Control Unit generates control signals to coordinate operations
- These are separate components with different functions

---

**1.2** Interrupts improve CPU efficiency by allowing the CPU to do other work while waiting for I/O.

**Answer: True**

**Explanation:**
- Without interrupts: CPU waits (programmed I/O)
- With interrupts: CPU does other work, I/O interrupts when ready
- Much better CPU utilization

---

**1.3** A 24-bit address bus can address 16 MB of memory in a byte-addressable system.

**Answer: True**

**Explanation:**
- 24-bit address = 2²⁴ = 16,777,216 locations
- Byte-addressable: 16,777,216 bytes = 16 MB

---

**1.4** MIPS uses three instruction formats: R-format, I-format, and J-format.

**Answer: True**

**Explanation:**
- R-format: Register operations
- I-format: Immediate, load/store, branches
- J-format: Jumps
- All instructions are 32 bits

---

**1.5** The MIPS register $0 always contains the value zero and cannot be written to.

**Answer: True**

**Explanation:**
- $0 is hardwired to zero
- Writing to $0 has no effect
- Useful for constants and comparisons

---

**1.6** PC-relative addressing is used for branch instructions in MIPS.

**Answer: True**

**Explanation:**
- Branches use PC-relative addressing
- EA = PC + 4 + (offset × 4)
- Allows branching within ±128 KB of PC

---

**1.7** Spatial locality is exploited by bringing entire cache blocks into cache when one word is accessed.

**Answer: True**

**Explanation:**
- Spatial locality: nearby items likely to be accessed
- Bringing entire block exploits this
- Adjacent words likely to be needed soon

---

**1.8** Set-associative cache is a compromise between direct-mapped and fully associative cache.

**Answer: True**

**Explanation:**
- Direct-mapped: 1 choice, simple, fast
- Fully associative: N choices, complex, slow
- Set-associative: k choices (compromise)
- Most common in practice

---

**1.9** LRU replacement algorithm is more effective than FIFO but requires more complex hardware.

**Answer: True**

**Explanation:**
- LRU: Better hit rate (exploits temporal locality)
- FIFO: Simpler (just tracks insertion order)
- LRU needs access history tracking (more complex)

---

**1.10** Write-back cache policy reduces memory write traffic compared to write-through.

**Answer: True**

**Explanation:**
- Write-through: Every write goes to memory
- Write-back: Only dirty blocks written on replacement
- Write-back minimizes memory writes

---

**1.11** DRAM is used for main memory because it provides higher density and lower cost than SRAM.

**Answer: True**

**Explanation:**
- DRAM: High density, low cost (capacitor-based)
- SRAM: Low density, high cost (flip-flop based)
- Main memory needs large capacity at reasonable cost

---

**1.12** DDR SDRAM transfers data on both the rising and falling edges of the clock.

**Answer: True**

**Explanation:**
- DDR = Double Data Rate
- Data on both clock edges
- Doubles data rate compared to SDRAM

---

**1.13** RAID 5 uses distributed parity and can survive the failure of one disk.

**Answer: True**

**Explanation:**
- RAID 5: Parity distributed across all disks
- Can reconstruct data from remaining disks + parity
- Fault tolerance: 1 disk

---

**1.14** The average rotational latency for a disk is independent of the disk's rotational speed.

**Answer: False**

**Explanation:**
- Rotational latency = (1/2) × (60 / RPM) × 1000 ms
- Directly depends on rotational speed
- Higher RPM = lower latency

---

**1.15** SSDs have no seek time or rotational latency because they have no moving parts.

**Answer: True**

**Explanation:**
- SSDs: No mechanical components
- No head movement (seek time)
- No rotation (rotational latency)
- Much faster random access

---

**1.16** DMA is most beneficial for large data transfers where the transfer time is much longer than the setup overhead.

**Answer: True**

**Explanation:**
- DMA has setup overhead (CPU programming)
- For large transfers, overhead is small compared to transfer time
- For small transfers, overhead may not be worth it

---

**1.17** Memory-mapped I/O reduces the available memory address space.

**Answer: True**

**Explanation:**
- Memory-mapped I/O shares address space with memory
- I/O addresses reduce available memory addresses
- Trade-off: flexibility vs. address space

---

**1.18** Vectored interrupts allow faster interrupt processing by eliminating the need to poll devices.

**Answer: True**

**Explanation:**
- Vectored: Device provides identifier automatically
- No need to poll each device
- Faster than software polling

---

**1.19** Point-to-point interconnects like PCIe provide better scalability than traditional shared buses.

**Answer: True**

**Explanation:**
- Point-to-point: Direct connections, no shared bus
- No arbitration overhead
- Better scalability (add more connections without degradation)

---

**1.20** Pipeline throughput is improved by pipelining, but individual instruction latency remains the same.

**Answer: True**

**Explanation:**
- Throughput: Instructions per second (improves)
- Latency: Time per instruction (does NOT improve)
- Key insight: Pipelining improves throughput, not latency

---

## Problem 2: Comprehensive Cache Analysis Solutions

### 2.1 Address Format and Set Calculation [8 pts]

**Given:**
- Cache size: 512 bytes
- Line size: 32 bytes
- Address size: 18 bits
- 4-way set associative

**Calculations:**
- Number of lines = 512 / 32 = 16 lines
- Number of sets = 16 / 4 = 4 sets = 2²
- Word offset bits = log₂(32) = 5 bits
- Set index bits = log₂(4) = 2 bits
- Tag bits = 18 - 2 - 5 = 11 bits

**Address Format:**
```
┌──────────┬──────┬──────┐
│   Tag    │ Set  │ Word │
│ 11 bits  │2 bits│5 bits│
└──────────┴──────┴──────┘
```

**Answer:** 4 sets (2 bits for set index)

---

### 2.2 Cache Organization Diagram [6 pts]

```
Set 0 (00): [Line 0] [Line 1] [Line 2] [Line 3]
Set 1 (01): [Line 0] [Line 1] [Line 2] [Line 3]
Set 2 (10): [Line 0] [Line 1] [Line 2] [Line 3]
Set 3 (11): [Line 0] [Line 1] [Line 2] [Line 3]

Each line contains:
- Valid bit
- 11-bit tag
- 32 bytes of data (8 words of 4 bytes each)
```

**Organization:**
- 4 sets (2-bit set index: 00, 01, 10, 11)
- 4 lines per set (4-way associative)
- Each line: 32 bytes

---

### 2.3 Address Assignment [4 pts]

**Address: 2A5F1₁₆**

**Convert to binary (18 bits):**
- 2A5F1₁₆ = 0010 1010 0101 1111 0001₂

**Breaking down:**
- Tag: 0010 1010 010 (11 bits)
- Set: 11 (2 bits) = Set 3
- Word: 1111 0001 (5 bits)

**Answer:** Address 2A5F1₁₆ maps to **Set 3** (binary 11)

---

### 2.4 Comparators [4 pts]

**Number of Comparators:**
- 4-way set associative = 4 lines per set
- Must check all 4 lines in the set for tag match
- **Number of comparators = 4** (one per line in each set)

**Size of Each Comparator:**
- Each comparator compares the tag field
- Tag size = 11 bits
- **Size of each comparator = 11 bits**

**Justification:**
- After determining set (using 2-bit set index), search all 4 lines in that set
- Compare 11-bit tag from address with tag in each cache line
- 4 comparators operate in parallel (one per line)
- Matching tag indicates hit

---

### 2.5 Cache Miss Handling [8 pts]

**a) How Set is Determined:**
- Extract set index bits (bits 5-6 from right) from address
- Set index = (Block number) mod (Number of sets)
- Example: Address 2A5F1₁₆ → Set bits = 11 → Set 3

**b) Tag Comparison:**
- Extract 11-bit tag from address (bits 7-17)
- Compare with tag stored in each of the 4 lines in the set
- Use 4 comparators operating in parallel
- If tag matches and valid bit is set → **Hit**
- If no match in any line → **Miss**

**c) What Happens on Miss in Full Set:**
1. **Set is full:** All 4 lines in the set contain valid data
2. **Replacement algorithm selects victim:**
   - LRU: Replace least recently used line
   - FIFO: Replace oldest line
   - Random: Replace random line
3. **Load new block:**
   - Read block from lower level memory (L2 or main memory)
   - Place in selected line
   - Update tag, set valid bit
   - If replaced line was dirty (write-back), write it to memory first
4. **Deliver requested word:**
   - Extract word from loaded block
   - Deliver to processor

**Complete Miss Process:**
- Determine set → Compare tags → Miss detected → Select victim → Load block → Update cache → Deliver data

---

## Problem 3: MIPS Architecture Solutions

### 3.1 Instruction Format Identification [6 pts]

**a) `ADD $s0, $t0, $t1`**
- **Format: R-format**
- **Reason:** All operands are registers, arithmetic operation
- Uses: op, rs, rt, rd, shamt, funct fields

**b) `LW $t0, 16($s1)`**
- **Format: I-format**
- **Reason:** Contains immediate value (offset 16), load instruction
- Uses: op, rs, rt, immediate fields

**c) `J label`**
- **Format: J-format**
- **Reason:** Unconditional jump, only needs address
- Uses: op, address fields

---

### 3.2 C to MIPS Translation [6 pts]

**C Code:** `f = g + h + B[3];`

**MIPS Assembly:**
```mips
LW $t0, 12($s4)    # $t0 = B[3]
                   # Offset = 3 × 4 = 12 bytes
ADD $t1, $s1, $s2  # $t1 = g + h ($s1 = g, $s2 = h)
ADD $s0, $t1, $t0  # $s0 = (g + h) + B[3] = f
```

**Alternative (more efficient):**
```mips
ADD $t0, $s1, $s2  # $t0 = g + h
LW $t1, 12($s4)    # $t1 = B[3]
ADD $s0, $t0, $t1  # $s0 = (g + h) + B[3] = f
```

**Explanation:**
- Array index 3 requires offset of 3 × 4 = 12 bytes
- Load B[3] into temporary register
- Add g and h
- Add result to B[3]
- Store final result in f ($s0)

---

### 3.3 MIPS Addressing Modes [8 pts]

**1. Displacement (Base + Offset) Addressing:**
- **Use:** Load and store instructions
- **Formula:** EA = Register[rs] + offset
- **Example:** `LW $t0, 8($s1)`
  - EA = $s1 + 8
  - Loads word from memory[$s1 + 8]
- **Range:** ±32 KB (16-bit signed offset)

**2. PC-Relative Addressing:**
- **Use:** Branch instructions
- **Formula:** EA = PC + 4 + (offset × 4)
- **Example:** `BEQ $t0, $t1, label`
  - If $t0 == $t1, branch to PC + 4 + (offset × 4)
  - Offset is in words, multiplied by 4 for bytes
- **Range:** ±128 KB from PC (16-bit signed offset in words)

**3. Pseudodirect Addressing:**
- **Use:** Jump instructions
- **Formula:** EA = (PC[31:28] || address[25:0] || 00)
- **Example:** `J label`
  - Upper 4 bits of PC preserved
  - 26-bit address from instruction
  - Lower 2 bits = 00 (word-aligned)
- **Range:** 256 MB region (within same 256 MB segment as PC)

**Key Differences:**
- **Displacement:** For data access (arrays, structures)
- **PC-Relative:** For local branches (within function)
- **Pseudodirect:** For long-range jumps

---

## Problem 4: Processor Performance Solutions

### 4.1 Processor Comparison [6 pts]

**Given:**
- Instruction Count (IC) = 1.0 × 10⁹
- Processor M: Clock Rate = 2.0 GHz = 2.0 × 10⁹ Hz, CPI = 2.5
- Processor N: Clock Rate = 3.0 GHz = 3.0 × 10⁹ Hz, CPI = 3.0

**Formula:**
```
Execution Time = (CPI × IC) / Clock Rate
```

**Processor M:**
```
Time_M = (2.5 × 1.0 × 10⁹) / (2.0 × 10⁹)
Time_M = 2.5 × 10⁹ / 2.0 × 10⁹
Time_M = 1.25 seconds
```

**Processor N:**
```
Time_N = (3.0 × 1.0 × 10⁹) / (3.0 × 10⁹)
Time_N = 3.0 × 10⁹ / 3.0 × 10⁹
Time_N = 1.0 seconds
```

**Comparison:**
- Processor N is faster (1.0 s < 1.25 s)
- Speedup = Time_M / Time_N = 1.25 / 1.0 = 1.25

**Answer: Processor N is faster by 1.25 times (or 25% faster)**

**Key Insight:** Despite lower clock rate, Processor N is faster because it has lower CPI.

---

### 4.2 Pipeline Performance [9 pts]

**Given Stage Times:**
- Stage 1: 100 ps
- Stage 2: 150 ps
- Stage 3: 120 ps
- Stage 4: 130 ps

**a) Pipeline Clock Cycle:**
- Clock cycle = **max(100, 150, 120, 130) = 150 ps**
- Limited by slowest stage (Stage 2)

**b) Ideal Speedup:**
- Non-pipelined time = 100 + 150 + 120 + 130 = 500 ps
- Pipelined throughput = 1 instruction per 150 ps
- **Ideal speedup = 500 / 150 = 3.33x**
- Maximum possible = 4x (number of stages), but stages not balanced

**c) Actual Speedup with Stalls:**
- 20% of instructions cause 2-cycle stalls
- Average CPI = 1 + 0.20 × 2 = 1.4
- Effective cycle time = 150 ps × 1.4 = 210 ps
- **Actual speedup = 500 / 210 = 2.38x**

**Performance Impact:**
- Stalls reduce speedup from 3.33x to 2.38x
- Still better than non-pipelined (2.38x > 1x)

---

## Problem 5: Memory Hierarchy and Storage Solutions

### 5.1 AMAT Calculation [7 pts]

**Given:**
- L1: 0.5 cycle, 3% miss rate
- L2: 5 cycles, 0.8% global miss rate
- Main memory: 80 cycles

**Calculations:**

**L1 Hit:**
- Probability: 97% = 0.97
- Time: 0.5 cycles
- Contribution: 0.97 × 0.5 = 0.485 cycles

**L1 Miss, L2 Hit:**
- L1 miss rate = 3% = 0.03
- L2 global miss = 0.8% = 0.008
- L1 miss but L2 hit = 3% - 0.8% = 2.2% = 0.022
- Time: 0.5 (L1) + 5 (L2) = 5.5 cycles
- Contribution: 0.022 × 5.5 = 0.121 cycles

**L1 Miss, L2 Miss (Main Memory):**
- Probability: 0.8% = 0.008
- Time: 0.5 (L1) + 5 (L2) + 80 (Memory) = 85.5 cycles
- Contribution: 0.008 × 85.5 = 0.684 cycles

**AMAT:**
```
AMAT = 0.485 + 0.121 + 0.684
AMAT = 1.29 cycles
```

**Answer: Average Memory Access Time = 1.29 cycles**

---

### 5.2 RAID 5 Capacity [4 pts]

**Given:**
- 6 disks, each 2 TB
- RAID 5: Distributed parity

**a) Usable Capacity:**
- RAID 5: (N-1) × disk capacity
- N = 6 disks
- **Usable capacity = (6-1) × 2 TB = 5 × 2 TB = 10 TB**

**b) Capacity Overhead:**
- Total capacity = 6 × 2 TB = 12 TB
- Usable capacity = 10 TB
- Overhead = 12 - 10 = 2 TB
- **Overhead percentage = 2 / 12 = 16.67%** (or 1 disk out of 6)

**c) Disk Failures:**
- **RAID 5 can survive 1 disk failure**
- Parity distributed across all disks
- Can reconstruct data from remaining 5 disks + parity
- If 2 disks fail → data loss

**Answer:**
- Usable capacity: **10 TB**
- Overhead: **2 TB (16.67%)**
- Fault tolerance: **1 disk failure**

---

### 5.3 Rotational Latency [4 pts]

**Given:**
- Rotational speed: 15,000 RPM

**Calculation:**
- Time per revolution = 60 / 15,000 = 0.004 s = 4 ms
- Average rotational latency = Time per revolution / 2
- **Average latency = 4 / 2 = 2 ms**

**Answer: Average rotational latency = 2 ms**

**Note:** Higher RPM = lower latency. 15,000 RPM is faster than typical 7,200 RPM (which has 4.17 ms latency).

---

**End of Solution Guide**
