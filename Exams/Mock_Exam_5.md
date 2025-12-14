# Mock Exam 5: Computer Architecture
## Comprehensive Final Examination

**Time Allowed:** 2 hours  
**Total Points:** 100 points

---

## Instructions
- Answer all questions in the spaces provided
- Show all your work for calculation problems
- For True/False questions, clearly circle your answer
- This exam covers all topics from Groups 1-6
- Good luck!

---

## Problem 1: True/False Questions
**For each of the following statements, circle either True or False. [20 pts]**

**1.1** The ALU performs arithmetic operations while the Control Unit generates control signals.

True / False

**1.2** Interrupts improve CPU efficiency by allowing the CPU to do other work while waiting for I/O.

True / False

**1.3** A 24-bit address bus can address 16 MB of memory in a byte-addressable system.

True / False

**1.4** MIPS uses three instruction formats: R-format, I-format, and J-format.

True / False

**1.5** The MIPS register $0 always contains the value zero and cannot be written to.

True / False

**1.6** PC-relative addressing is used for branch instructions in MIPS.

True / False

**1.7** Spatial locality is exploited by bringing entire cache blocks into cache when one word is accessed.

True / False

**1.8** Set-associative cache is a compromise between direct-mapped and fully associative cache.

True / False

**1.9** LRU replacement algorithm is more effective than FIFO but requires more complex hardware.

True / False

**1.10** Write-back cache policy reduces memory write traffic compared to write-through.

True / False

**1.11** DRAM is used for main memory because it provides higher density and lower cost than SRAM.

True / False

**1.12** DDR SDRAM transfers data on both the rising and falling edges of the clock.

True / False

**1.13** RAID 5 uses distributed parity and can survive the failure of one disk.

True / False

**1.14** The average rotational latency for a disk is independent of the disk's rotational speed.

True / False

**1.15** SSDs have no seek time or rotational latency because they have no moving parts.

True / False

**1.16** DMA is most beneficial for large data transfers where the transfer time is much longer than the setup overhead.

True / False

**1.17** Memory-mapped I/O reduces the available memory address space.

True / False

**1.18** Vectored interrupts allow faster interrupt processing by eliminating the need to poll devices.

True / False

**1.19** Point-to-point interconnects like PCIe provide better scalability than traditional shared buses.

True / False

**1.20** Pipeline throughput is improved by pipelining, but individual instruction latency remains the same.

True / False

---

## Problem 2: Comprehensive Cache Analysis
**Consider a 4-way set associative cache with the following specifications:**
- Cache size: 512 bytes
- Line size: 32 bytes
- Physical address size: 18 bits
- Byte-addressable system

**[30 pts]**

**2.1** Show the address format (tag, set, word fields) and calculate the number of sets. Show all calculations. [8 pts]

---

**2.2** Draw a diagram showing the cache organization. Label the sets and lines clearly. [6 pts]

---

**2.3** To what set can the address 2A5F1₁₆ be assigned? Show your work including the binary conversion. [4 pts]

---

**2.4** How many comparators are needed and what is the size of each? Justify your answer. [4 pts]

---

**2.5** Explain how a cache miss is handled in this cache, including:
   a) How the set is determined
   b) How the tag comparison works
   c) What happens when a miss occurs in a full set [8 pts]

---

## Problem 3: MIPS Architecture and Instruction Formats
**[20 pts]**

**3.1** For each of the following MIPS instructions, identify the format (R, I, or J) and explain why: [6 pts]

   a) `ADD $s0, $t0, $t1`
   b) `LW $t0, 16($s1)`
   c) `J label`

---

**3.2** Translate the following C code to MIPS assembly. Assume: `f` in `$s0`, `g` in `$s1`, `h` in `$s2`, array `B` base address in `$s4`. [6 pts]

```c
f = g + h + B[3];
```

---

**3.3** Explain the three addressing modes used in MIPS. Give an example instruction for each. [8 pts]

---

## Problem 4: Processor Performance and Pipelining
**[15 pts]**

**4.1** Two processors execute the same program with 1.0 × 10⁹ instructions:
   - Processor M: 2.0 GHz clock, CPI = 2.5
   - Processor N: 3.0 GHz clock, CPI = 3.0

   Which processor is faster and by how much? Show all calculations. [6 pts]

---

**4.2** A 4-stage pipeline has stage times: 100 ps, 150 ps, 120 ps, 130 ps.
   a) What is the pipeline clock cycle?
   b) What is the ideal speedup?
   c) If 20% of instructions cause 2-cycle stalls, what is the actual speedup? [9 pts]

---

## Problem 5: Memory Hierarchy and Storage Systems
**[15 pts]**

**5.1** A system has:
   - L1 cache: 0.5 cycle, 3% miss rate
   - L2 cache: 5 cycles, 0.8% global miss rate  
   - Main memory: 80 cycles

   Calculate the AMAT. Show all steps. [7 pts]

---

**5.2** A RAID 5 array consists of 6 disks, each 2 TB. Calculate:
   a) The total usable capacity
   b) The capacity overhead
   c) How many disk failures it can survive [4 pts]

---

**5.3** A disk rotates at 15,000 RPM. Calculate the average rotational latency. [4 pts]

---

**End of Exam**
