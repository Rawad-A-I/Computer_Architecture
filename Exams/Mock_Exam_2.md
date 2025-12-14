# Mock Exam 2: Computer Architecture
## Final Examination

**Time Allowed:** 2 hours  
**Total Points:** 100 points

---

## Instructions
- Answer all questions in the spaces provided
- Show all your work for calculation problems
- For True/False questions, clearly circle your answer
- Good luck!

---

## Problem 1: True/False Questions
**For each of the following statements, circle either True or False. [20 pts]**

**1.1** The Control Unit generates control signals based on the instruction opcode.

True / False

**1.2** In a load-store architecture, arithmetic operations can be performed directly on memory operands.

True / False

**1.3** A 16-bit address bus allows direct addressing of 64 KB in a byte-addressable system.

True / False

**1.4** Pipeline hazards always result in pipeline stalls.

True / False

**5.5** Forwarding (bypassing) can eliminate all data hazards without stalling.

True / False

**1.6** In a 4-way set associative cache, each set contains exactly 4 cache lines.

True / False

**1.7** Write-through cache policy reduces memory write traffic compared to write-back.

True / False

**1.8** The miss penalty is the time required to access the cache.

True / False

**1.9** DRAM has faster access time than SRAM.

True / False

**1.10** RAID 5 can survive the failure of one disk.

True / False

**1.11** The average seek time of a disk is typically one-third of the full stroke time.

True / False

**1.12** SSDs have no moving parts, making them more durable than HDDs.

True / False

**1.13** Programmed I/O is more efficient than interrupt-driven I/O for slow devices.

True / False

**1.14** In isolated I/O, memory and I/O devices share the same address space.

True / False

**1.15** DMA requires the CPU to be involved in every data transfer.

True / False

**1.16** A dedicated bus has separate lines for address and data.

True / False

**1.17** Asynchronous bus timing requires a common clock signal.

True / False

**1.18** Centralized bus arbitration has a single point of failure.

True / False

**1.19** The Instruction Register (IR) holds the address of the next instruction to execute.

True / False

**1.20** Cache blocks are typically larger than a single word to exploit spatial locality.

True / False

---

## Problem 2: Set-Associative Cache Analysis
**Consider an 8-way set associative cache. The cache size is 256 bytes and each line consists of 16 bytes. The physical address size is 20 bits, and the smallest addressable unit is 1 byte. [40 pts]**

**2.1** Show the address format and draw a diagram showing the organization of the cache and clearly describe how the mapping is performed. [15 pts]

---

**2.2** To what set and lines of the cache can the address 3F5A1₁₆ be assigned? Show your work. [5 pts]

---

**2.3** If the addresses 3F5A1₁₆ and 2C4Bx₁₆ can be simultaneously assigned to the same cache set, what values can the hexadecimal digit x have? Justify your answer. [4 pts]

---

**2.4** How many comparators will this cache need, and what is the size of each comparator? Justify your answers. [6 pts]

---

**2.5** Compare and contrast LRU and FIFO replacement algorithms. Explain which would be better for this cache and why. [10 pts]

---

## Problem 3: Direct-Mapped Cache Simulation
**Consider a direct-mapped cache in a byte-addressable system with the following specifications:**
- Memory block size: 8 bytes
- Number of blocks of memory: 32 blocks
- Cache data size: 32 bytes

**[12 pts]**

**3.1** Show how the address will be divided among the different fields (tag, index, offset). Show all calculations. [4 pts]

---

**3.2** For an initially empty cache, label each of the following memory references as a hit (H) or miss (M). Show the contents of the cache after all references. [8 pts]

Memory references: 24, 16, 8, 40, 32, 8, 24, 48

---

## Problem 4: Cache Performance Analysis
**[18 pts]**

**4.1** A 2-way set associative cache has a line size of 64 bytes. The word size is 8 bytes. The cache has an access time of 4 ns and a hit rate of 96%. During a cache miss, it takes 25 ns to bring the first word of a block from main memory to the processor, while each subsequent word takes 4 ns. What is the average memory access time? Show all calculations. [8 pts]

---

**4.2** Consider a system with 3 levels of cache: L1, L2, and L3. There are 200 memory references. 12 references miss at L1. Out of those 12, 5 miss at L2. Out of those 5, 2 miss at L3. Calculate the global and local miss rates for each cache level. [5 pts]

---

**4.3** Explain the relationship between cache size, associativity, and performance. What are the trade-offs? [5 pts]

---

## Problem 5: Processor Performance Analysis
**Two processors, P and Q, that implement the same instruction set architecture, are running the same benchmark consisting of 1.5 × 10⁹ instructions.**

| Processor | Clock Rate | Average CPI |
|-----------|------------|-------------|
| P         | 2.5 GHz    | 2.0         |
| Q         | 3.5 GHz    | 2.8         |

**[10 pts]**

**5.1** Compute the execution time for each processor. Which processor is faster and by how much? Show all calculations. [4 pts]

---

**5.2** An optimization reduces the instruction count by 20%, but increases the CPI by 30%. Recompute the execution time for each processor after applying the optimization. Which processor benefits more from this optimization? [4 pts]

---

**5.3** Explain how CPI, clock rate, and instruction count all contribute to overall processor performance. [2 pts]

---

## Problem 6: Instruction Cycle and System Architecture
**[10 pts]**

**6.1** Given the following memory segment from a Von Neumann model computer. If the PC contains 11001, and we fetch the instruction, what will be in the MAR and MBR? [2 pts]

| Address | Contents    |
|---------|-------------|
| 11000   | 0100 1101   |
| 11001   | 1011 0010   |
| 11010   | 0011 1110   |
| 11011   | 1100 0001   |

True / False: MAR = 11001, MBR = 1011 0010

---

**6.2** Arrange the following instruction cycle steps in the correct order: [2 pts]

a) Fetch operand from memory  
b) Write result to memory  
c) Read instruction from memory  
d) Determine instruction address  
e) Perform operation  
f) Analyze instruction  
g) Calculate operand address

**Correct order:** _________________________________

---

**6.3** Explain what happens during the indirect addressing cycle. When is it used? [3 pts]

---

**6.4** For the instruction "MULTIPLY C, A, B" (C = A × B), how many memory accesses occur during the execute cycle? Justify your answer. [3 pts]

---

**End of Exam**
