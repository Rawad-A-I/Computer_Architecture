# Group 1: Foundations of Computer Architecture
## Comprehensive Exercises

**Chapter 3: Top-Level View of Computer Function and Interconnection**

---

## Table of Contents
1. [Multiple Choice Questions](#multiple-choice-questions)
2. [True/False Questions](#truefalse-questions)
3. [Short Answer Questions](#short-answer-questions)
4. [Calculation Problems](#calculation-problems)
5. [Diagram and Flowchart Questions](#diagram-and-flowchart-questions)
6. [Problem-Solving Exercises](#problem-solving-exercises)
7. [Conceptual Questions](#conceptual-questions)
8. [Answer Key](#answer-key)

---

## Multiple Choice Questions

### Section 1: Program Concept and Computer Components

**1.1** What is the fundamental difference between hardwired and programmable systems?

a) Hardwired systems are faster
b) Programmable systems use the same hardware to execute different programs
c) Hardwired systems are more expensive
d) Programmable systems require physical rewiring to change functionality

**1.2** Which component of the CPU is responsible for generating control signals?

a) ALU
b) Control Unit
c) Registers
d) Cache

**1.3** What does the Control Unit do?

a) Performs arithmetic operations
b) Translates instruction codes into control signals
c) Stores temporary data
d) Manages memory access

**1.4** Which of the following is NOT one of the four essential computer components?

a) CPU
b) Main Memory
c) I/O Modules
d) Hard Disk Drive

**1.5** Main memory is considered volatile because:

a) It is very fast
b) It loses data when power is off
c) It can be written to
d) It stores instructions

### Section 2: Instruction Cycle

**2.1** The instruction cycle consists of which two main phases?

a) Fetch and Decode
b) Fetch and Execute
c) Decode and Execute
d) Load and Store

**2.2** During the fetch cycle, what is loaded into the Instruction Register (IR)?

a) The data operand
b) The memory address
c) The instruction from memory
d) The result of the operation

**2.3** What happens during the indirect addressing cycle?

a) The instruction is decoded
b) The effective address is calculated
c) The instruction is executed
d) The result is stored

**2.4** An instruction that requires 3 memory accesses during execution will have:

a) 1 fetch cycle and 1 execute cycle
b) 1 fetch cycle, 1 indirect cycle, and 1 execute cycle
c) 1 fetch cycle and 1 execute cycle with 3 memory operations
d) 3 fetch cycles and 1 execute cycle

**2.5** The Program Counter (PC) is updated:

a) During the fetch cycle
b) During the execute cycle
c) During the indirect cycle
d) Only when a jump instruction is executed

### Section 3: Interrupts

**3.1** Which of the following is NOT a class of interrupts?

a) Program interrupts
b) Timer interrupts
c) I/O interrupts
d) Cache interrupts

**3.2** What is the primary purpose of interrupts?

a) To stop program execution
b) To improve processing efficiency by allowing CPU to do other work
c) To increase memory speed
d) To reduce bus traffic

**3.3** When an interrupt occurs, what must be saved before processing the interrupt?

a) Only the Program Counter
b) Only the Processor Status Word
c) The context (PC, PSW, registers)
d) Only the data in memory

**3.4** In a priority-based interrupt system, what happens when a high-priority interrupt occurs during processing of a low-priority interrupt?

a) The high-priority interrupt is ignored
b) The high-priority interrupt is queued
c) The low-priority interrupt is suspended and the high-priority interrupt is processed
d) Both interrupts are processed simultaneously

**3.5** Timer interrupts are primarily used for:

a) Error handling
b) Pre-emptive multi-tasking and time slicing
c) I/O device communication
d) Hardware failure detection

### Section 4: System Bus

**4.1** The system bus consists of how many separate buses?

a) One
b) Two
c) Three
d) Four

**4.2** Which bus carries the actual data and instructions?

a) Address Bus
b) Data Bus
c) Control Bus
d) System Bus

**4.3** If a system has a 32-bit address bus, what is the maximum addressable memory?

a) 32 bytes
b) 4 GB (2^32 bytes)
c) 32 KB
d) 4 MB

**4.4** The control bus carries:

a) Data and instructions
b) Memory addresses
c) Control and timing signals
d) Power signals

**4.5** A 64-bit data bus can transfer:

a) 64 bits per clock cycle
b) 64 bytes per clock cycle
c) 64 words per clock cycle
d) 64 addresses per clock cycle

### Section 5: Bus Architecture

**5.1** In synchronous bus timing, operations are:

a) Independent of the clock
b) Synchronized with the clock signal
c) Asynchronous
d) Random

**5.2** Bus arbitration is needed when:

a) Only one device uses the bus
b) Multiple devices need to use the bus simultaneously
c) The bus is idle
d) Data is being transferred

**5.3** Which bus arbitration method uses a daisy chain?

a) Centralized parallel arbitration
b) Distributed arbitration using self-selection
c) Distributed arbitration using collision detection
d) Priority-based daisy chain

**5.4** In a centralized bus arbitration scheme:

a) Each device has its own arbiter
b) A single bus controller manages all requests
c) Devices negotiate among themselves
d) No arbitration is needed

**5.5** Bus bandwidth is determined by:

a) Only the data bus width
b) Only the clock frequency
c) The data bus width and clock frequency
d) Only the address bus width

---

## True/False Questions

**T/F 1.1** A hardwired system can be reprogrammed by changing the instruction sequence without physical modification.

**T/F 1.2** The ALU performs arithmetic and logical operations, while the Control Unit generates control signals.

**T/F 1.3** Main memory stores both instructions and data.

**T/F 1.4** The instruction cycle always consists of exactly two phases: fetch and execute.

**T/F 1.5** During the fetch cycle, the Program Counter is automatically incremented to point to the next instruction.

**T/F 2.1** An indirect addressing cycle is always required for every instruction.

**T/F 2.2** The execute cycle may require zero, one, or multiple memory accesses depending on the instruction.

**T/F 2.3** All instructions require the same amount of time to execute.

**T/F 3.1** Interrupts always improve system performance.

**T/F 3.2** When an interrupt occurs, the CPU must save the current context before processing the interrupt.

**T/F 3.3** In a system with disabled interrupts, all interrupts are lost and cannot be processed later.

**T/F 3.4** Timer interrupts are essential for implementing pre-emptive multi-tasking in operating systems.

**T/F 3.5** Hardware failure interrupts have the highest priority in most systems.

**T/F 4.1** The address bus is bidirectional, allowing addresses to flow in both directions.

**T/F 4.2** A wider data bus generally allows for faster data transfer.

**T/F 4.3** The control bus is unidirectional, carrying signals only from the CPU to other components.

**T/F 4.4** The maximum addressable memory is determined solely by the address bus width.

**T/F 5.1** Synchronous buses are simpler to implement but less flexible than asynchronous buses.

**T/F 5.2** Bus arbitration is only needed when multiple devices try to use the bus at the same time.

**T/F 5.3** In a daisy chain arbitration scheme, the device closest to the CPU always has the highest priority.

**T/F 5.4** Bus bandwidth can be increased by either increasing the data bus width or increasing the clock frequency.

---

## Short Answer Questions

### Section 1: Program Concept

**SA 1.1** Explain the difference between hardwired and programmable systems. Give one example of each.

**SA 1.2** What is a program, and how does it relate to control signals?

**SA 1.3** Describe the role of the Control Unit in a programmable system.

### Section 2: Computer Components

**SA 2.1** List and briefly describe the four essential components of a computer system.

**SA 2.2** What are the two main parts of the CPU, and what does each do?

**SA 2.3** Why is main memory considered temporary storage, and what does "volatile" mean in this context?

**SA 2.4** What is the purpose of I/O modules in a computer system?

### Section 3: Instruction Cycle

**SA 3.1** Describe the steps that occur during the fetch cycle.

**SA 3.2** What is the difference between direct and indirect addressing? When is an indirect cycle needed?

**SA 3.3** Explain why different instructions may require different numbers of memory accesses during execution.

**SA 3.4** What information is stored in the Program Counter (PC) and Instruction Register (IR)?

### Section 4: Interrupts

**SA 4.1** List the four classes of interrupts and give one example of each.

**SA 4.2** Explain how interrupts improve processing efficiency, especially in I/O operations.

**SA 4.3** Describe what happens during the interrupt cycle. What context information must be saved?

**SA 4.4** Compare and contrast the two strategies for handling multiple interrupts: disabling interrupts vs. priority-based nested interrupts.

**SA 4.5** Why are timer interrupts important for operating systems?

### Section 5: System Bus

**SA 5.1** Describe the three types of buses that make up the system bus and what each carries.

**SA 5.2** How does the width of the address bus determine the maximum addressable memory?

**SA 5.3** Explain the relationship between data bus width and data transfer speed.

**SA 5.4** What types of signals are carried on the control bus? Give three examples.

### Section 6: Bus Architecture

**SA 6.1** Compare synchronous and asynchronous bus timing. What are the advantages and disadvantages of each?

**SA 6.2** What is bus arbitration, and why is it necessary?

**SA 6.3** Describe how a daisy chain arbitration scheme works.

**SA 6.4** Explain how bus bandwidth is calculated and what factors affect it.

---

## Calculation Problems

### Problem 1: Address Bus and Memory Capacity

**CP 1.1** A computer system has a 24-bit address bus.
- a) What is the maximum number of addressable memory locations?
- b) If each location stores 1 byte, what is the maximum memory capacity in bytes?
- c) Express the capacity in KB, MB, and GB.

**CP 1.2** A system has a 20-bit address bus and each memory location stores 2 bytes (16 bits).
- a) How many memory locations can be addressed?
- b) What is the total memory capacity in bytes?
- c) What is the capacity in MB?

### Problem 2: Data Bus and Transfer Rates

**CP 2.1** A system has a 32-bit data bus operating at 100 MHz.
- a) What is the maximum data transfer rate in bits per second?
- b) What is the transfer rate in bytes per second?
- c) What is the transfer rate in MB/s?

**CP 2.2** A 64-bit data bus operates at 2.5 GHz.
- a) Calculate the theoretical maximum transfer rate in GB/s.
- b) If the bus efficiency is 80%, what is the actual transfer rate?

### Problem 3: Bus Bandwidth

**CP 3.1** Calculate the bus bandwidth for the following configurations:
- a) 16-bit data bus at 50 MHz
- b) 32-bit data bus at 100 MHz
- c) 64-bit data bus at 200 MHz

**CP 3.2** A system needs to transfer 1 GB of data. The bus has a 32-bit width and operates at 133 MHz.
- a) What is the bus bandwidth in MB/s?
- b) How long will it take to transfer 1 GB of data (theoretically)?

### Problem 4: Instruction Cycle Timing

**CP 4.1** An instruction requires:
- Fetch cycle: 2 clock cycles
- Execute cycle: 5 clock cycles
- The system clock is 1 GHz

Calculate:
- a) Time for one complete instruction cycle
- b) Number of instructions that can be executed per second (theoretical)

**CP 4.2** A program has 1000 instructions. Each instruction takes:
- Fetch: 3 cycles
- Execute: 4 cycles (average)
- Clock frequency: 500 MHz

Calculate:
- a) Total cycles needed
- b) Total execution time in microseconds

### Problem 5: Interrupt Overhead

**CP 5.1** An interrupt service routine takes 50 clock cycles to execute. The system clock is 2 GHz.
- a) What is the interrupt processing time in nanoseconds?
- b) If 1000 interrupts occur per second, what percentage of CPU time is spent on interrupts?

**CP 5.2** A system processes interrupts at a rate of 500 per second. Each interrupt handler takes 100 cycles, and the clock is 1 GHz.
- a) Calculate the interrupt overhead in cycles per second.
- b) What percentage of CPU time is used for interrupt processing?

---

## Diagram and Flowchart Questions

### Diagram 1: Instruction Cycle

**DF 1.1** Draw a flowchart showing the complete instruction cycle including:
- Fetch cycle
- Indirect cycle (if needed)
- Execute cycle
- Interrupt check

Label all decision points and show the flow of control.

**DF 1.2** Draw a state diagram for the instruction cycle with the following states:
- Fetch
- Indirect
- Execute
- Interrupt

Show the transitions between states.

### Diagram 2: Interrupt Processing

**DF 2.1** Draw a flowchart showing what happens when an interrupt occurs:
- Interrupt detection
- Context saving
- Interrupt handler execution
- Context restoration
- Return to interrupted program

**DF 2.2** Draw a timeline diagram showing:
- Normal program execution
- I/O operation starting
- Interrupt occurring
- Interrupt handler execution
- Return to program

### Diagram 3: System Bus Architecture

**DF 3.1** Draw a block diagram of a computer system showing:
- CPU (with Control Unit and ALU)
- Main Memory
- I/O Module
- System Bus (Data, Address, Control buses)
- Connections between components

**DF 3.2** Draw a diagram showing how multiple devices connect to a system bus, including:
- CPU
- Memory
- I/O Module 1
- I/O Module 2
- Bus arbitration signals

### Diagram 4: Bus Timing

**DF 4.1** Draw a timing diagram for a synchronous bus read operation showing:
- Clock signal
- Address on address bus
- Control signals (read, ready)
- Data on data bus
- Show the relationship between signals

**DF 4.2** Draw a timing diagram comparing:
- Synchronous bus operation
- Asynchronous bus operation
- Show the key differences

---

## Problem-Solving Exercises

### Problem 1: Instruction Execution Analysis

**PS 1.1** Consider the following instruction: `ADD (B), A`

This instruction adds the value at the address stored in memory location B to the value at memory location A, and stores the result in A.

Trace through the complete instruction cycle:
- a) How many memory accesses are required?
- b) List each memory access and what it does
- c) Draw a diagram showing the data flow

**PS 1.2** An instruction `MOVE A, (B)` copies data from the address stored in B to location A.

Determine:
- a) Number of fetch cycles needed
- b) Number of indirect cycles needed
- c) Number of memory accesses during execute cycle
- d) Total memory accesses for the complete instruction

### Problem 2: Interrupt Scenario

**PS 2.1** A CPU is executing a program when the following sequence occurs:
1. Instruction at address 1000 completes
2. Timer interrupt occurs
3. During timer interrupt handler, I/O interrupt occurs
4. I/O interrupt handler completes
5. Timer interrupt handler completes
6. Program resumes

Assume:
- Timer interrupt priority: Medium
- I/O interrupt priority: High
- Program priority: Low

Draw a timeline showing:
- a) When each interrupt occurs
- b) Which handler is executing at each time
- c) The context stack (what is saved/restored)

**PS 2.2** A system uses priority-based nested interrupts with the following priorities:
- Hardware failure: Priority 1 (highest)
- Timer: Priority 2
- I/O: Priority 3
- Program: Priority 4 (lowest)

While processing an I/O interrupt (Priority 3), a timer interrupt (Priority 2) occurs.

Explain:
- a) What happens to the I/O interrupt handler?
- b) What happens when the timer interrupt completes?
- c) Draw a diagram showing the interrupt nesting

### Problem 3: Bus Design

**PS 3.1** Design a bus system for a computer with the following requirements:
- Maximum memory: 4 GB
- Data transfer rate: At least 800 MB/s
- Clock frequency: 200 MHz

Determine:
- a) Minimum address bus width needed
- b) Minimum data bus width needed
- c) Verify that the design meets the transfer rate requirement

**PS 3.2** A system currently has:
- 16-bit data bus
- 100 MHz clock
- Needs to upgrade to support 1.6 GB/s transfer rate

Options:
- Option A: Increase data bus to 32 bits, keep 100 MHz
- Option B: Keep 16-bit bus, increase clock to 200 MHz
- Option C: Increase to 32 bits and 200 MHz

For each option:
- a) Calculate the new transfer rate
- b) Determine if it meets the requirement
- c) Discuss cost/complexity trade-offs

### Problem 4: Performance Analysis

**PS 4.1** Compare two systems:

**System A:**
- 32-bit data bus, 100 MHz clock
- Instruction: 2-cycle fetch, 3-cycle execute (average)

**System B:**
- 64-bit data bus, 50 MHz clock
- Instruction: 1-cycle fetch, 4-cycle execute (average)

For a program with 1 million instructions:
- a) Calculate execution time for each system
- b) Which system is faster?
- c) What are the trade-offs?

**PS 4.2** A CPU executes instructions with the following characteristics:
- Fetch cycle: 2 clock cycles
- Execute cycle: 3-8 clock cycles (average 5)
- Clock: 2 GHz
- 10% of instructions cause cache misses adding 50 cycles each

Calculate:
- a) Average instruction execution time
- b) Instructions per second (IPS)
- c) How cache misses affect performance

### Problem 5: Interrupt Efficiency

**PS 5.1** Compare two I/O strategies:

**Strategy 1: Programmed I/O**
- CPU checks device status every 1 μs
- Device ready after 10 ms
- CPU wasted: 10,000 checks

**Strategy 2: Interrupt-Driven I/O**
- CPU issues command, continues working
- Interrupt occurs after 10 ms
- Interrupt handler: 100 cycles at 2 GHz

Calculate:
- a) CPU time wasted in Strategy 1
- b) CPU time used in Strategy 2
- c) Efficiency improvement

**PS 5.2** A system processes:
- 1000 I/O interrupts per second
- Each interrupt handler: 200 cycles
- Clock: 1 GHz
- Average instruction: 4 cycles

Calculate:
- a) Cycles per second used for interrupts
- b) Instructions per second lost to interrupts
- c) Percentage of CPU time for interrupts

---

## Conceptual Questions

### Concept 1: System Design

**CQ 1.1** Explain why a computer system needs all four components (CPU, Memory, I/O, Bus). What would happen if one component was missing?

**CQ 1.2** Discuss the trade-offs between hardwired and programmable systems. In what situations would you choose each?

**CQ 1.3** Why is the bus architecture critical to system performance? What happens if the bus becomes a bottleneck?

### Concept 2: Instruction Execution

**CQ 2.1** Why do different instructions require different numbers of memory accesses? Give examples of instructions with 0, 1, 2, and 3+ memory accesses.

**CQ 2.2** Explain the purpose of indirect addressing. When is it useful, and what is the cost (in terms of memory accesses)?

**CQ 2.3** How does the instruction cycle relate to the fetch-decode-execute model? Are they the same thing?

### Concept 3: Interrupts

**CQ 3.1** Explain how interrupts enable multitasking in operating systems. How do timer interrupts support time-sharing?

**CQ 3.2** Discuss the trade-offs between disabling interrupts vs. priority-based nested interrupts. When would you use each approach?

**CQ 3.3** Why must context be saved when an interrupt occurs? What would happen if context wasn't saved?

### Concept 4: Bus Architecture

**CQ 4.1** Compare centralized and distributed bus arbitration. What are the advantages and disadvantages of each?

**CQ 4.2** Explain why bus bandwidth is important and how it relates to overall system performance.

**CQ 4.3** Discuss the relationship between data bus width, address bus width, and system capabilities. How do they affect each other?

### Concept 5: System Integration

**CQ 5.1** How do interrupts, the instruction cycle, and bus operations work together in a complete computer system? Give an example.

**CQ 5.2** Explain how the concepts in this chapter (instruction cycle, interrupts, bus) form the foundation for understanding more advanced topics like pipelining and caching.

**CQ 5.3** Discuss how modern computer systems have evolved from the basic model presented in this chapter. What has changed, and what has remained the same?

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - b | 1.2 - b | 1.3 - b | 1.4 - d | 1.5 - b

**Section 2:**
2.1 - b | 2.2 - c | 2.3 - b | 2.4 - c | 2.5 - a

**Section 3:**
3.1 - d | 3.2 - b | 3.3 - c | 3.4 - c | 3.5 - b

**Section 4:**
4.1 - c | 4.2 - b | 4.3 - b | 4.4 - c | 4.5 - a

**Section 5:**
5.1 - b | 5.2 - b | 5.3 - d | 5.4 - b | 5.5 - c

### True/False Answers

**Section 1:**
1.1 - False | 1.2 - True | 1.3 - True | 1.4 - False | 1.5 - True

**Section 2:**
2.1 - False | 2.2 - True | 2.3 - False | 2.4 - True | 2.5 - True

**Section 3:**
3.1 - False | 3.2 - True | 3.3 - False | 3.4 - True | 3.5 - True

**Section 4:**
4.1 - False | 4.2 - True | 4.3 - False | 4.4 - True | 4.5 - True

**Section 5:**
5.1 - True | 5.2 - True | 5.3 - True | 5.4 - True

### Calculation Problem Solutions

**CP 1.1:**
- a) 2^24 = 16,777,216 locations
- b) 16,777,216 bytes = 16 MB
- c) 16,384 KB = 16 MB = 0.015625 GB

**CP 1.2:**
- a) 2^20 = 1,048,576 locations
- b) 1,048,576 × 2 = 2,097,152 bytes
- c) 2 MB

**CP 2.1:**
- a) 32 bits × 100,000,000 Hz = 3,200,000,000 bits/s
- b) 3,200,000,000 / 8 = 400,000,000 bytes/s
- c) 400 MB/s

**CP 2.2:**
- a) 64 bits × 2,500,000,000 Hz = 160,000,000,000 bits/s = 20 GB/s
- b) 20 GB/s × 0.80 = 16 GB/s

**CP 3.1:**
- a) 16 bits × 50 MHz = 800 Mbits/s = 100 MB/s
- b) 32 bits × 100 MHz = 3,200 Mbits/s = 400 MB/s
- c) 64 bits × 200 MHz = 12,800 Mbits/s = 1,600 MB/s = 1.6 GB/s

**CP 3.2:**
- a) 32 bits × 133 MHz = 4,256 Mbits/s = 532 MB/s
- b) 1 GB / 532 MB/s = 1,024 MB / 532 MB/s ≈ 1.92 seconds

**CP 4.1:**
- a) 2 + 5 = 7 cycles; 7 / 1,000,000,000 = 7 ns
- b) 1,000,000,000 / 7 ≈ 142,857,143 instructions/second

**CP 4.2:**
- a) 1000 × (3 + 4) = 7,000 cycles
- b) 7,000 / 500,000,000 = 0.000014 s = 14 μs

**CP 5.1:**
- a) 50 / 2,000,000,000 = 25 ns
- b) (50 × 1000) / 2,000,000,000 = 0.000025 = 0.0025%

**CP 5.2:**
- a) 500 × 100 = 50,000 cycles/s
- b) 50,000 / 1,000,000,000 = 0.00005 = 0.005%

### Short Answer Sample Answers

**SA 1.1:** Hardwired systems have fixed functionality and require physical modification to change behavior. Programmable systems use the same hardware but execute different instruction sequences. Example: Early calculator (hardwired) vs. modern computer (programmable).

**SA 3.1:** Fetch cycle steps: 1) PC contains address of next instruction, 2) Address placed on address bus, 3) Control unit issues read signal, 4) Instruction fetched from memory, 5) Instruction loaded into IR, 6) PC incremented to next instruction.

**SA 4.2:** Interrupts allow CPU to continue useful work while waiting for slow I/O. Instead of polling/waiting, CPU issues I/O command and continues. When I/O completes, interrupt notifies CPU, which then handles the result. This dramatically improves efficiency.

**SA 5.1:** Data Bus: Carries actual data and instructions. Address Bus: Carries memory addresses. Control Bus: Carries control and timing signals (read, write, interrupt, clock, etc.).

### Problem-Solving Sample Solutions

**PS 1.1:** 
- a) 5 memory accesses total
- b) Fetch: 1 access (get instruction), Indirect: 1 access (get address from B), Execute: 3 accesses (read B's address, read A, write result to A)
- c) [Diagram showing data flow through memory and CPU]

**PS 3.1:**
- a) 4 GB = 2^32 bytes, need 32-bit address bus
- b) 800 MB/s = 6,400 Mbits/s, at 200 MHz need 32-bit data bus (32 × 200 = 6,400)
- c) 32 bits × 200 MHz = 6,400 Mbits/s = 800 MB/s ✓ Meets requirement

**PS 5.1:**
- a) Strategy 1: 10,000 checks × 1 μs = 10 ms wasted
- b) Strategy 2: 100 cycles / 2 GHz = 50 ns used
- c) Improvement: (10 ms - 50 ns) / 10 ms = 99.9995% more efficient

---

## Study Tips

1. **Practice drawing diagrams:** Instruction cycles, interrupt flows, and bus architectures are easier to understand when visualized.

2. **Work through calculations:** Understanding bus bandwidth, memory capacity, and timing requires practice with the formulas.

3. **Trace instruction execution:** Practice following an instruction through fetch, indirect (if needed), and execute cycles.

4. **Understand interrupt scenarios:** Be able to trace what happens when multiple interrupts occur with different priorities.

5. **Connect concepts:** See how instruction cycle, interrupts, and bus operations work together in a complete system.

---

*End of Group 1 Exercises*


