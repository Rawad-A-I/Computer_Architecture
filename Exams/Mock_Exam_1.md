# Mock Exam 1: Computer Architecture
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

**1.1** In a Harvard architecture, instructions and data are stored in separate memory spaces.

True / False

**1.2** The Memory Address Register (MAR) contains the data being read from or written to memory.

True / False

**1.3** A 20-bit address bus can directly address 1 MB of memory in a byte-addressable system.

True / False

**1.4** Pipelining improves both instruction throughput and instruction latency.

True / False

**1.5** In a direct-mapped cache, each memory block can be placed in exactly one cache line.

True / False

**1.6** Write-back cache policy always writes to main memory immediately when data is modified in cache.

True / False

**1.7** Temporal locality refers to the tendency to access data items that are close together in memory.

True / False

**1.8** A fully associative cache requires more comparators than a direct-mapped cache of the same size.

True / False

**1.9** DRAM requires periodic refresh cycles to maintain data integrity.

True / False

**1.10** SRAM is typically used for main memory due to its high density and low cost.

True / False

**1.11** RAID 0 provides fault tolerance through data redundancy.

True / False

**1.12** The average rotational latency of a disk is equal to half the time for one complete rotation.

True / False

**1.13** DMA allows I/O devices to transfer data directly to memory without CPU involvement.

True / False

**1.14** Memory-mapped I/O uses the same address space for both memory and I/O devices.

True / False

**1.15** Interrupt-driven I/O is more efficient than programmed I/O because the CPU can do other work while waiting for I/O completion.

True / False

**1.16** A multiplexed bus requires fewer physical lines than a dedicated bus.

True / False

**1.17** Synchronous bus timing is simpler to implement than asynchronous bus timing.

True / False

**1.18** In set-associative cache, a block can be placed in any line within its assigned set.

True / False

**1.19** The Program Counter (PC) is automatically incremented after each instruction fetch.

True / False

**1.20** Cache hit time is typically much longer than main memory access time.

True / False

---

## Problem 2: Cache Memory Analysis
**Consider a 2-way set associative cache. The cache size is 64 bytes and each line consists of 4 bytes. The physical address size is 12 bits, and the smallest addressable unit is 1 byte. [40 pts]**

**2.1** Show the address format and draw a diagram showing the organization of the cache and clearly describe how the mapping is performed. [15 pts]

---

**2.2** To what lines of the cache can the address 5A3₁₆ be assigned? Show your work. [5 pts]

---

**2.3** If the addresses 5A3₁₆ and 3Bx₁₆ can be simultaneously assigned to the same cache set, what values can the hexadecimal digit x have? Justify your answer. [4 pts]

---

**2.4** How many comparators will this cache need, and what is the size of each comparator? Justify your answers. [6 pts]

---

**2.5** Describe two cache replacement algorithms and explain how they can be applied to this cache. [10 pts]

---

## Problem 3: Direct-Mapped Cache Simulation
**Consider a direct-mapped cache in a byte-addressable system with the following specifications:**
- Memory block size: 4 bytes
- Number of blocks of memory: 16 blocks
- Cache data size: 16 bytes

**[12 pts]**

**3.1** Show how the address will be divided among the different fields (tag, index, offset). [4 pts]

---

**3.2** For an initially empty cache, label each of the following memory references as a hit (H) or miss (M). Show the contents of the cache to validate your answers. [8 pts]

Memory references: 12, 8, 4, 20, 16, 4, 12, 24

---

## Problem 4: Cache Performance Analysis
**[18 pts]**

**4.1** A direct-mapped cache has a line size of 128 bytes. The word size is 4 bytes. The cache has an access time of 2 ns and a hit rate of 98%. During a cache miss, it takes 15 ns to bring the first word of a block from main memory to the processor, while each subsequent word takes 3 ns. What is the average memory access time? Show all calculations. [8 pts]

---

**4.2** When several levels of cache exist, a distinction is made between the global miss rate and the local miss rate:
- Global miss rate = # of misses in this cache / # of all memory references
- Local miss rate = # of misses / # of accesses to this cache

Assume a system with 2 levels of cache: L1 and L2, and 100 memory references. 8 of those are missed at the L1 cache. Out of those 8, 3 are missed at the L2 cache. What are the global miss rate and the local miss rate for each of L1 and L2? [5 pts]

---

**4.3** Explain why increasing cache size does not always improve performance. [5 pts]

---

## Problem 5: Processor Performance Comparison
**Two processors, X and Y, that implement the same instruction set architecture, are running the same benchmark consisting of 2.0 × 10⁹ instructions.**

| Processor | Clock Rate | Average CPI |
|-----------|------------|-------------|
| X         | 4 GHz      | 1.8         |
| Y         | 3 GHz      | 2.5         |

**[10 pts]**

**5.1** Compute the execution time for each processor. Which processor is faster and by how much? Show all calculations. [4 pts]

---

**5.2** An optimization is applied that reduces the instruction count by 15%, but increases the CPI by 25% due to added complexity. Recompute the execution time for each processor after applying the optimization. Which processor is faster and by how much? [4 pts]

---

**5.3** Briefly explain why, in general, a higher clock rate alone does not guarantee better performance. [2 pts]

---

## Problem 6: Instruction Cycle and Memory Operations
**[10 pts]**

**6.1** Given the following table that shows a segment of memory from a Von Neumann model computer. Assuming that the PC contains the value 10110, the MAR will be loaded with 0011 0100, and the MBR will be loaded with 10110. [2 pts]

| Address | Contents    |
|---------|-------------|
| 10110   | 0011 0100   |
| 10111   | 1100 1011   |
| 11000   | 0101 1110   |
| 11001   | 1001 0011   |

True / False

---

**6.2** The following list of steps is the correct order for the stages of an instruction cycle: d - e - a - b - g - f - c. [2 pts]

a) Analyze instruction to determine type of operation to be performed and operand(s) to be used.  
b) Determine the address of the operand.  
c) Write the result into memory or out to I/O.  
d) Determine the address of the instruction to be executed.  
e) Read instruction from its memory location into the processor.  
f) Perform the operation indicated in the instruction.  
g) Fetch the operand from memory or read it in from I/O.

True / False

---

**6.3** Explain the difference between the fetch cycle and the execute cycle in the instruction cycle. [3 pts]

---

**6.4** How many memory accesses are required for an instruction that adds the value at memory location B to the value at memory location A, storing the result back to location A? Justify your answer. [3 pts]

---

**End of Exam**
