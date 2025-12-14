# Mock Exam 3: Solution Guide
## Computer Architecture - Final Examination

---

## Problem 1: True/False Solutions

**1.1** MIPS uses a load-store architecture where arithmetic operations can only be performed on registers.

**Answer: True**

**Explanation:**
- MIPS is a load-store architecture
- Arithmetic operations (ADD, SUB, etc.) only work on registers
- Memory access requires separate LOAD and STORE instructions

---

**1.2** In MIPS, all instructions are 32 bits in length.

**Answer: True**

**Explanation:**
- MIPS uses fixed-length 32-bit instructions
- This simplifies instruction decoding and pipelining
- All three formats (R, I, J) are 32 bits

---

**1.3** The MIPS instruction `LW $t0, 8($s1)` uses displacement addressing mode.

**Answer: True**

**Explanation:**
- Displacement addressing: EA = Register + offset
- `LW $t0, 8($s1)` calculates address as $s1 + 8
- This is displacement (base + offset) addressing

---

**1.4** A 3-address instruction format requires more bits than a 2-address format.

**Answer: True**

**Explanation:**
- 3-address: 2 source addresses + 1 destination address
- 2-address: 1 source address + 1 source/destination address
- More addresses = more bits needed in instruction

---

**1.5** Temporal locality is exploited by keeping recently accessed data in cache.

**Answer: True**

**Explanation:**
- Temporal locality: recently accessed items likely to be accessed again
- Cache keeps recently accessed data
- This exploits temporal locality

---

**1.6** In a direct-mapped cache, conflicts occur when multiple blocks map to the same cache line.

**Answer: True**

**Explanation:**
- Direct-mapped: each block maps to exactly one line
- Multiple blocks mapping to same line cause conflicts
- This is called "thrashing"

---

**1.7** Write-back cache policy with write allocate is the most common approach in modern processors.

**Answer: True**

**Explanation:**
- Write-back + write allocate is standard in modern processors
- Provides best performance (minimizes memory writes)
- Write allocate loads block on write miss

---

**1.8** Increasing cache associativity always improves cache performance.

**Answer: False**

**Explanation:**
- Higher associativity reduces miss rate BUT increases hit time
- More comparators needed = slower access
- Trade-off: better hit rate vs. slower hit time
- May not always improve overall performance (AMAT)

---

**1.9** DRAM refresh is required because capacitors lose their charge over time.

**Answer: True**

**Explanation:**
- DRAM stores data as charge in capacitors
- Capacitors leak charge (discharge over time)
- Periodic refresh (every 64 ms) restores charge
- This is fundamental to DRAM operation

---

**1.10** SRAM uses flip-flop circuits to store data, eliminating the need for refresh.

**Answer: True**

**Explanation:**
- SRAM uses flip-flop circuits (stable state)
- No capacitors = no charge leakage
- No refresh needed as long as power is maintained

---

**1.11** RAID 1 provides better read performance than a single disk because data can be read from either disk.

**Answer: True**

**Explanation:**
- RAID 1 (mirroring) has two copies of data
- Can read from either disk
- Can balance read load or read from faster disk
- Potentially 2x read performance

---

**1.12** The average rotational latency for a 7200 RPM disk is approximately 4.17 milliseconds.

**Answer: True**

**Explanation:**
- Time per revolution = 60 / 7200 = 0.00833 s = 8.33 ms
- Average latency = 8.33 / 2 = 4.17 ms
- This is the standard calculation

---

**1.13** SSDs have write endurance limitations due to finite write cycles per flash cell.

**Answer: True**

**Explanation:**
- Flash memory cells can only be written finite number of times (1K-100K)
- Each write/erase cycle wears out the cell
- This is a fundamental limitation of flash memory

---

**1.14** Optical disks use a single spiral track, unlike magnetic disks which use concentric tracks.

**Answer: True**

**Explanation:**
- Optical disks (CD, DVD, Blu-ray): single spiral track from center to edge
- Magnetic disks: concentric circular tracks
- This is a fundamental difference in organization

---

**1.15** Interrupt-driven I/O requires the CPU to poll the I/O device status continuously.

**Answer: False**

**Explanation:**
- Interrupt-driven I/O: device interrupts CPU when ready
- CPU does NOT need to poll continuously
- Programmed I/O requires continuous polling

---

**1.16** DMA transfers data directly between I/O devices and memory, bypassing the CPU.

**Answer: True**

**Explanation:**
- DMA (Direct Memory Access) bypasses CPU
- I/O module transfers directly to/from memory
- CPU only involved at start (setup) and end (completion)

---

**1.17** Memory-mapped I/O allows I/O devices to be accessed using the same instructions as memory.

**Answer: True**

**Explanation:**
- Memory-mapped I/O shares address space with memory
- I/O devices appear as memory locations
- Same LOAD/STORE instructions work for both

---

**1.18** In a vectored interrupt system, the interrupting device provides its identifier to the processor.

**Answer: True**

**Explanation:**
- Vectored interrupt: device provides vector (identifier/address)
- Processor uses vector to jump directly to handler
- No need to poll to identify device

---

**1.19** The bus width determines both the maximum addressable memory and the data transfer rate.

**Answer: False**

**Explanation:**
- **Address bus width** determines maximum addressable memory
- **Data bus width** determines data transfer rate
- These are different buses with different purposes

---

**1.20** Point-to-point interconnects like QPI eliminate the need for bus arbitration.

**Answer: True**

**Explanation:**
- Point-to-point: direct connections between components
- No shared bus = no arbitration needed
- Each connection is independent
- This is a key advantage over shared bus

---

## Problem 2: MIPS Instruction Set Architecture Solutions

### 2.1 Instruction Format Analysis [8 pts]

**Instruction:** `ADD $s0, $t0, $t1`

**a) Instruction Format:** **R-format** (Register format)

**b) 32-bit Instruction Division:**
```
┌──────┬─────┬─────┬─────┬──────┬──────┐
│ op   │ rs  │ rt  │ rd  │shamt │funct │
│ 6    │ 5   │ 5   │ 5   │ 5    │ 6    │
└──────┴─────┴─────┴─────┴──────┴──────┘
```

**c) Field Values:**
- **op (6 bits):** 000000 (R-format opcode)
- **rs (5 bits):** $t0 = register 8 = 01000
- **rt (5 bits):** $t1 = register 9 = 01001
- **rd (5 bits):** $s0 = register 16 = 10000
- **shamt (5 bits):** 00000 (not a shift instruction)
- **funct (6 bits):** 100000 (ADD function code)

**Complete Instruction:**
```
000000 01000 01001 10000 00000 100000
```

---

### 2.2 C to MIPS Translation [6 pts]

**C Code:** `g = h + A[5];`

**MIPS Assembly:**
```mips
LW $t0, 20($s3)    # $t0 = A[5]
                   # Offset = 5 × 4 = 20 bytes
ADD $s1, $s2, $t0  # $s1 = $s2 + $t0 (g = h + A[5])
```

**Explanation:**
- Array index 5 requires offset of 5 × 4 = 20 bytes (4 bytes per word)
- Load A[5] into temporary register $t0
- Add h ($s2) and A[5] ($t0), store result in g ($s1)

---

### 2.3 Addressing Mode Analysis [6 pts]

**Instruction:** `LW $t0, 8($s1)`

**a) Addressing Mode:** **Displacement (Base + Offset) addressing**

**b) Effective Address Calculation:**
- Base register: $s1 = 0x1000
- Offset: 8
- **Effective Address = 0x1000 + 8 = 0x1008**

**c) What the instruction does:**
- Calculates memory address as $s1 + 8
- Reads word (4 bytes) from that memory address
- Loads the value into register $t0
- Equivalent to: `$t0 = memory[$s1 + 8]`

---

### 2.4 Loading Large Constant [5 pts]

**Constant:** 0xABCD1234

**Method:** Use LUI (Load Upper Immediate) + ORI (OR Immediate)

```mips
LUI $t0, 0xABCD    # $t0 = 0xABCD0000
                   # Loads upper 16 bits, lower 16 bits = 0
ORI $t0, $t0, 0x1234  # $t0 = 0xABCD0000 OR 0x1234 = 0xABCD1234
```

**Explanation:**
- LUI loads 0xABCD into upper 16 bits: 0xABCD0000
- ORI sets lower 16 bits: 0xABCD0000 OR 0x1234 = 0xABCD1234
- Two instructions needed because immediate field is only 16 bits

---

## Problem 3: Cache Memory Design Solutions

### 3.1 Fully Associative Cache Address Format [10 pts]

**Given:**
- Cache size: 128 bytes
- Line size: 8 bytes
- Address size: 14 bits
- Fully associative

**Calculations:**
- Number of lines = 128 / 8 = 16 lines
- Word offset bits = log₂(8) = 3 bits
- Tag bits = 14 - 3 = 11 bits (no index bits needed)

**Address Format:**
```
┌──────────┬──────┐
│   Tag    │ Word │
│ 11 bits  │3 bits│
└──────────┴──────┘
```

**How Fully Associative Mapping Works:**
- **No index field:** Block can be placed in any cache line
- **Tag comparison:** All 16 lines must be checked for tag match
- **Mapping:** Block number doesn't determine placement (unlike direct-mapped)
- **Replacement:** When cache is full, replacement algorithm selects which line to replace
- **Flexibility:** Maximum flexibility - no conflicts from mapping restrictions

---

### 3.2 Comparators for Fully Associative Cache [5 pts]

**Number of Comparators:**
- Fully associative cache with 16 lines
- Must check all lines for tag match
- **Number of comparators = 16** (one per cache line)

**Size of Each Comparator:**
- Each comparator compares the tag field
- Tag size = 11 bits (from part 3.1)
- **Size of each comparator = 11 bits**

**Justification:**
- In fully associative cache, we don't know which line contains the block
- Must search all lines in parallel
- Each line needs a comparator to check if its tag matches the address tag
- All 16 comparators operate simultaneously
- The one with matching tag indicates a hit

---

### 3.3 Comparison: Fully Associative vs Direct-Mapped [10 pts]

**a) Flexibility:**
- **Fully Associative:** Maximum flexibility - block can be in any line
- **Direct-Mapped:** No flexibility - block can only be in one specific line
- **Winner:** Fully Associative

**b) Hardware Cost:**
- **Fully Associative:** High cost - needs N comparators (N = number of lines)
- **Direct-Mapped:** Low cost - needs only 1 comparator
- **Winner:** Direct-Mapped

**c) Hit Rate:**
- **Fully Associative:** Highest hit rate - no conflicts from mapping restrictions
- **Direct-Mapped:** Lower hit rate - conflicts when multiple blocks map to same line
- **Winner:** Fully Associative

**d) Access Time:**
- **Fully Associative:** Slower - must check all lines (more comparators, longer paths)
- **Direct-Mapped:** Faster - direct lookup, only one line to check
- **Winner:** Direct-Mapped

**Summary:**
- Fully Associative: Better hit rate and flexibility, but higher cost and slower
- Direct-Mapped: Lower cost and faster, but lower hit rate and no flexibility
- **Set-Associative:** Compromise between the two (most common in practice)

---

## Problem 4: Memory Hierarchy and Performance Solutions

### 4.1 AMAT Calculation [8 pts]

**Given:**
- L1: 1 cycle, 2% miss rate
- L2: 10 cycles, 0.5% global miss rate
- Main memory: 100 cycles

**Calculations:**

**L1 Hit:**
- Probability: 98% = 0.98
- Time: 1 cycle
- Contribution: 0.98 × 1 = 0.98 cycles

**L1 Miss, L2 Hit:**
- Probability: 2% × (hit rate in L2)
- L2 global miss rate = 0.5%, so L2 hit rate = 99.5% of L1 misses
- Actually: L1 miss rate = 2%, L2 global miss = 0.5%
- So: L1 miss but L2 hit = 2% - 0.5% = 1.5% = 0.015
- Time: 1 (L1 access) + 10 (L2 access) = 11 cycles
- Contribution: 0.015 × 11 = 0.165 cycles

**L1 Miss, L2 Miss (Main Memory):**
- Probability: 0.5% = 0.005
- Time: 1 (L1) + 10 (L2) + 100 (Memory) = 111 cycles
- Contribution: 0.005 × 111 = 0.555 cycles

**AMAT:**
```
AMAT = 0.98 + 0.165 + 0.555
AMAT = 1.7 cycles
```

**Answer: Average Memory Access Time = 1.7 cycles**

---

### 4.2 Principle of Locality [7 pts]

**Principle of Locality:**
Programs tend to access a small proportion of their address space at any given time, and these accesses exhibit patterns.

**Two Types:**

**1. Temporal Locality:**
- Recently accessed items are likely to be accessed again soon
- **Example:** Loop variables, function calls
- **How hierarchy exploits:** Keep recently accessed data in fast memory (cache)

**2. Spatial Locality:**
- Items near recently accessed items are likely to be accessed soon
- **Example:** Sequential instructions, array elements
- **How hierarchy exploits:** When accessing one word, bring entire block into cache

**How Hierarchy Works:**
1. **Store everything in slow, cheap memory** (disk/main memory)
2. **Copy recently accessed items to fast memory** (cache)
   - Exploits temporal locality
3. **Copy nearby items when accessing** (entire blocks)
   - Exploits spatial locality
4. **Result:** Most accesses satisfied by fast memory, few require slow memory

**Why It Works:**
- Programs access small working set repeatedly (temporal)
- Programs access data sequentially (spatial)
- Hierarchy keeps working set in fast memory
- Average access time much closer to fast memory than slow memory

**Example:**
- 95% cache hits at 1 cycle
- 5% cache misses at 100 cycles
- AMAT = 0.95 × 1 + 0.05 × 100 = 5.95 cycles (much better than 100!)

---

## Problem 5: External Memory and Storage Solutions

### 5.1 Disk Access Time Calculation [8 pts]

**Given:**
- Average seek time: 10 ms
- Rotational speed: 10,000 RPM
- Sectors per track: 200
- Sector size: 512 bytes

**Calculations:**

**1. Seek Time:**
- Average seek time = 10 ms

**2. Rotational Latency:**
- Time per revolution = 60 / 10,000 = 0.006 s = 6 ms
- Average latency = 6 / 2 = 3 ms

**3. Transfer Time:**
- Time per track = 6 ms (one revolution)
- Sectors per track = 200
- Time per sector = 6 ms / 200 = 0.03 ms

**Total Access Time:**
```
Total = Seek + Rotational Latency + Transfer
Total = 10 + 3 + 0.03
Total = 13.03 ms
```

**Answer: Average time to read one sector = 13.03 ms**

---

### 5.2 RAID Comparison [7 pts]

**RAID 0 (Striping):**
- **Redundancy:** None
- **Fault Tolerance:** 0 disks (one failure = data loss)
- **Capacity Overhead:** 0% (full capacity usable)
- **Performance:** High (parallel access, no parity calculation)

**RAID 1 (Mirroring):**
- **Redundancy:** Full copy (100% redundancy)
- **Fault Tolerance:** 1 disk (can survive one failure)
- **Capacity Overhead:** 50% (half capacity for redundancy)
- **Performance:** Good read (can read from either disk), medium write (must write to both)

**RAID 5 (Distributed Parity):**
- **Redundancy:** Parity distributed across all disks
- **Fault Tolerance:** 1 disk (can survive one failure)
- **Capacity Overhead:** 1 disk (N-1 disks usable)
- **Performance:** Good read, medium write (parity calculation overhead)

**Comparison Table:**

| RAID Level | Redundancy | Fault Tolerance | Capacity Overhead | Read Performance | Write Performance |
|------------|------------|-----------------|------------------|------------------|-------------------|
| RAID 0     | None       | 0 disks         | 0%               | High             | High              |
| RAID 1     | Full copy  | 1 disk          | 50%              | High             | Medium            |
| RAID 5     | Parity     | 1 disk          | 1 disk           | High             | Medium            |

**Use Cases:**
- **RAID 0:** Performance-critical, non-critical data
- **RAID 1:** Critical data, small arrays, maximum reliability
- **RAID 5:** General-purpose, network servers, balanced approach

---

## Problem 6: I/O Systems and Interrupts Solutions

### 6.1 I/O Techniques Comparison [9 pts]

**A. Programmed I/O:**
- **CPU Involvement:** High - CPU directly controls I/O, waits for completion
- **Efficiency:** Low - CPU tied up during I/O, wastes cycles polling
- **Best Use Cases:**
  - Simple devices
  - Small transfers
  - Status checks
  - When I/O is very fast

**B. Interrupt-Driven I/O:**
- **CPU Involvement:** Medium - CPU sets up I/O, does other work, handles interrupt when ready
- **Efficiency:** Medium - Better CPU utilization, but CPU still involved in each transfer
- **Best Use Cases:**
  - General I/O operations
  - Medium-sized transfers
  - Asynchronous events
  - Most common I/O operations

**C. DMA (Direct Memory Access):**
- **CPU Involvement:** Low - CPU only involved at start (setup) and end (completion)
- **Efficiency:** High - CPU free during transfer, maximum efficiency
- **Best Use Cases:**
  - Large transfers (disk, network)
  - High-speed devices
  - Bulk data movement
  - When transfer time >> interrupt overhead

**Comparison Summary:**

| Technique | CPU Involvement | Efficiency | Complexity | Best For |
|-----------|----------------|------------|------------|----------|
| Programmed | High (waits) | Low | Simple | Small transfers |
| Interrupt | Medium | Medium | Medium | General I/O |
| DMA | Low (start/end) | High | Complex | Large transfers |

---

### 6.2 DMA Performance Improvement [6 pts]

**a) How DMA Works:**
1. **Setup Phase:** CPU programs DMA controller with:
   - Starting memory address
   - Number of bytes to transfer
   - Direction (read/write)
   - I/O device address
2. **Transfer Phase:** DMA controller:
   - Requests bus control
   - Transfers data directly between I/O and memory
   - CPU is free to do other work
3. **Completion Phase:** DMA controller:
   - Interrupts CPU when transfer complete
   - CPU checks status and continues

**b) Why More Efficient for Large Transfers:**
- **Interrupt-Driven I/O:** CPU handles each word/block transfer
  - For 1 MB transfer: 262,144 interrupts (assuming 4-byte transfers)
  - Each interrupt: save context, service, restore context
  - Total overhead: 262,144 × interrupt_overhead
- **DMA:** CPU only involved at start and end
  - For 1 MB transfer: 1 setup + 1 completion interrupt
  - Total overhead: 2 × interrupt_overhead
  - **Massive reduction in CPU overhead**

**c) What Happens During DMA Transfer:**
1. DMA controller requests bus (bus request signal)
2. CPU grants bus (bus grant signal)
3. DMA controller takes control of bus
4. DMA reads from I/O device (or memory)
5. DMA writes to memory (or I/O device)
6. DMA increments address, decrements count
7. Repeats until count reaches zero
8. DMA releases bus
9. DMA interrupts CPU (transfer complete)
10. CPU resumes normal operation

**Performance Example:**
- Transfer 1 MB via interrupt-driven: CPU involved in 262,144 transfers
- Transfer 1 MB via DMA: CPU involved in 2 operations (setup + completion)
- **DMA is 131,072x more efficient for CPU involvement!**

---

**End of Solution Guide**
