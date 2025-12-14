# Mock Exam 3: Computer Architecture
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

**1.1** MIPS uses a load-store architecture where arithmetic operations can only be performed on registers.

True / False

**1.2** In MIPS, all instructions are 32 bits in length.

True / False

**1.3** The MIPS instruction `LW $t0, 8($s1)` uses displacement addressing mode.

True / False

**1.4** A 3-address instruction format requires more bits than a 2-address format.

True / False

**1.5** Temporal locality is exploited by keeping recently accessed data in cache.

True / False

**1.6** In a direct-mapped cache, conflicts occur when multiple blocks map to the same cache line.

True / False

**1.7** Write-back cache policy with write allocate is the most common approach in modern processors.

True / False

**1.8** Increasing cache associativity always improves cache performance.

True / False

**1.9** DRAM refresh is required because capacitors lose their charge over time.

True / False

**1.10** SRAM uses flip-flop circuits to store data, eliminating the need for refresh.

True / False

**1.11** RAID 1 provides better read performance than a single disk because data can be read from either disk.

True / False

**1.12** The average rotational latency for a 7200 RPM disk is approximately 4.17 milliseconds.

True / False

**1.13** SSDs have write endurance limitations due to finite write cycles per flash cell.

True / False

**1.14** Optical disks use a single spiral track, unlike magnetic disks which use concentric tracks.

True / False

**1.15** Interrupt-driven I/O requires the CPU to poll the I/O device status continuously.

True / False

**1.16** DMA transfers data directly between I/O devices and memory, bypassing the CPU.

True / False

**1.17** Memory-mapped I/O allows I/O devices to be accessed using the same instructions as memory.

True / False

**1.18** In a vectored interrupt system, the interrupting device provides its identifier to the processor.

True / False

**1.19** The bus width determines both the maximum addressable memory and the data transfer rate.

True / False

**1.20** Point-to-point interconnects like QPI eliminate the need for bus arbitration.

True / False

---

## Problem 2: MIPS Instruction Set Architecture
**[25 pts]**

**2.1** For the MIPS instruction `ADD $s0, $t0, $t1`:
   a) Identify the instruction format (R, I, or J)
   b) Show how the 32-bit instruction is divided into fields
   c) Specify the values for each field [8 pts]

---

**2.2** Translate the following C code to MIPS assembly. Assume variables are stored in registers: `g` in `$s1`, `h` in `$s2`, and array `A` base address in `$s3`. [6 pts]

```c
g = h + A[5];
```

---

**2.3** For the MIPS instruction `LW $t0, 8($s1)`:
   a) What addressing mode is used?
   b) Calculate the effective address if `$s1` contains 0x1000
   c) Explain what this instruction does [6 pts]

---

**2.4** How would you load the 32-bit constant 0xABCD1234 into register `$t0` in MIPS? Show the instructions needed. [5 pts]

---

## Problem 3: Cache Memory Design
**Consider a fully associative cache. The cache size is 128 bytes and each line consists of 8 bytes. The physical address size is 14 bits, and the smallest addressable unit is 1 byte. [25 pts]**

**3.1** Show the address format and explain how the fully associative mapping works. [10 pts]

---

**3.2** How many comparators will this cache need, and what is the size of each comparator? Justify your answers. [5 pts]

---

**3.3** Compare fully associative cache with direct-mapped cache in terms of:
   a) Flexibility
   b) Hardware cost
   c) Hit rate
   d) Access time [10 pts]

---

## Problem 4: Memory Hierarchy and Performance
**[15 pts]**

**4.1** A system has the following memory hierarchy:
   - L1 cache: 1 cycle access, 2% miss rate
   - L2 cache: 10 cycles access, 0.5% global miss rate
   - Main memory: 100 cycles access

   Calculate the Average Memory Access Time (AMAT). Show all calculations. [8 pts]

---

**4.2** Explain the principle of locality and how it enables the memory hierarchy to work effectively. [7 pts]

---

## Problem 5: External Memory and Storage
**[15 pts]**

**5.1** A disk drive has the following characteristics:
   - Average seek time: 10 ms
   - Rotational speed: 10,000 RPM
   - 200 sectors per track
   - Sector size: 512 bytes

   Calculate the average time to read one sector. Show all calculations. [8 pts]

---

**5.2** Compare and contrast RAID 0, RAID 1, and RAID 5 in terms of:
   a) Redundancy
   b) Fault tolerance
   c) Capacity overhead
   d) Performance [7 pts]

---

## Problem 6: I/O Systems and Interrupts
**[15 pts]**

**6.1** Compare the three I/O techniques (Programmed I/O, Interrupt-Driven I/O, and DMA) in terms of:
   a) CPU involvement
   b) Efficiency
   c) Best use cases [9 pts]

---

**6.2** Explain how DMA improves system performance for large data transfers. Include in your explanation:
   a) How DMA works
   b) Why it's more efficient than interrupt-driven I/O for large transfers
   c) What happens during a DMA transfer [6 pts]

---

**End of Exam**
