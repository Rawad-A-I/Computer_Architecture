# Mock Exam 4: Computer Architecture
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

**1.1** The four essential components of a computer are CPU, Main Memory, I/O Modules, and System Bus.

True / False

**1.2** The Control Unit performs arithmetic and logical operations.

True / False

**1.3** During the fetch cycle, the Program Counter is automatically incremented.

True / False

**1.4** An interrupt can occur between any two instructions in a program.

True / False

**1.5** Pipelining improves instruction latency by reducing the time each instruction takes to complete.

True / False

**1.6** A RAW (Read After Write) hazard occurs when an instruction tries to read a value before it's written.

True / False

**1.7** Forwarding can completely eliminate the need for pipeline stalls in all cases.

True / False

**1.8** Branch prediction accuracy of 90% means 10% of branches cause pipeline stalls.

True / False

**1.9** The Program Status Word (PSW) contains condition codes and processor status information.

True / False

**1.10** User-visible registers can be directly accessed by assembly language programs.

True / False

**1.11** The Memory Address Register (MAR) is connected to the address bus.

True / False

**1.12** In a 5-stage pipeline, the clock cycle is determined by the fastest stage.

True / False

**1.13** Control hazards are caused by branch instructions that change the instruction sequence.

True / False

**1.14** The ideal speedup of a pipeline equals the number of pipeline stages.

True / False

**1.15** Load-use hazards always require at least one pipeline stall cycle.

True / False

**1.16** I/O modules are needed because peripherals operate at different speeds than the processor.

True / False

**1.17** In isolated I/O, I/O devices have their own separate address space from memory.

True / False

**1.18** DMA requires the CPU to transfer each byte of data individually.

True / False

**1.19** A vectored interrupt system allows the processor to identify the interrupting device automatically.

True / False

**1.20** Write buffers are used to improve the performance of write-through cache policies.

True / False

---

## Problem 2: Instruction Cycle and Interrupts
**[20 pts]**

**2.1** List and explain the four main phases of the instruction cycle. [8 pts]

---

**2.2** Given the following memory segment from a Von Neumann model computer. If the PC contains 10110, what will be loaded into MAR and MBR during the fetch cycle? [2 pts]

| Address | Contents    |
|---------|-------------|
| 10110   | 1100 1011   |
| 10111   | 0011 0100   |
| 11000   | 1010 1110   |
| 11001   | 0101 0011   |

---

**2.3** Arrange the following instruction cycle steps in the correct order: [2 pts]

a) Write result to memory  
b) Read instruction from memory  
c) Determine instruction address  
d) Perform operation  
e) Analyze instruction  
f) Fetch operand  
g) Calculate operand address

**Correct order:** _________________________________

---

**2.4** Explain what happens during an interrupt cycle. Include:
   a) When interrupts are checked
   b) What context is saved
   c) How the processor resumes execution [8 pts]

---

## Problem 3: Pipeline Hazards and Performance
**[25 pts]**

**3.1** Identify the type of hazard in the following MIPS instruction sequence and explain how it can be resolved: [8 pts]

```mips
ADD $s0, $t0, $t1
SUB $t2, $s0, $t3
```

---

**3.2** Consider a 5-stage pipeline with the following stage times:
   - IF: 150 ps
   - ID: 100 ps
   - EX: 200 ps
   - MEM: 180 ps
   - WB: 120 ps

   a) What is the pipeline clock cycle time?
   b) What is the ideal speedup compared to non-pipelined execution?
   c) If 15% of instructions cause 1-cycle stalls, what is the actual speedup? [9 pts]

---

**3.3** Explain the difference between structure hazards, data hazards, and control hazards. Give one example of each. [8 pts]

---

## Problem 4: Register Organization and CPU Structure
**[15 pts]**

**4.1** Distinguish between user-visible registers and control/status registers. Give two examples of each category and explain their purposes. [8 pts]

---

**4.2** Explain the role of the following registers in instruction execution:
   a) Program Counter (PC)
   b) Instruction Register (IR)
   c) Memory Address Register (MAR)
   d) Memory Buffer Register (MBR) [7 pts]

---

## Problem 5: I/O Systems and DMA
**[20 pts]**

**5.1** Compare memory-mapped I/O and isolated I/O in terms of:
   a) Address space organization
   b) Instruction set requirements
   c) Advantages and disadvantages [10 pts]

---

**5.2** A DMA controller transfers 64 KB of data from a disk to memory. The transfer rate is 10 MB/s. The CPU runs at 2 GHz. Calculate:
   a) How long the DMA transfer takes
   b) How many CPU instructions could be executed during this transfer (assuming 1 CPI)
   c) Compare this to interrupt-driven I/O where each 4-byte transfer requires 100 CPU cycles [10 pts]

---

## Problem 6: Bus Architecture and Interconnection
**[20 pts]**

**6.1** Compare dedicated bus and multiplexed bus in terms of:
   a) Number of physical lines required
   b) Performance characteristics
   c) Cost
   d) Use cases [8 pts]

---

**6.2** Explain the difference between synchronous and asynchronous bus timing. Include:
   a) How each works
   b) Advantages and disadvantages
   c) When each is preferred [6 pts]

---

**6.3** A system has a 32-bit data bus running at 200 MHz. Calculate:
   a) The theoretical maximum data transfer rate
   b) How long it would take to transfer 1 MB of data at this rate [6 pts]

---

**End of Exam**
