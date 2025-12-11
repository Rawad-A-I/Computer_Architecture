# Group 1: Foundations of Computer Architecture
## Comprehensive Exercise Solutions - Part 4

**Chapter 3: Top-Level View of Computer Function and Interconnection**

---

## Table of Contents
1. [Problem-Solving Exercise Solutions](#problem-solving-exercise-solutions)
2. [Conceptual Question Solutions](#conceptual-question-solutions)

---

## Problem-Solving Exercise Solutions

### Problem 1: Instruction Execution Analysis

**PS 1.1** Consider the following instruction: `ADD (B), A`

This instruction adds the value at the address stored in memory location B to the value at memory location A, and stores the result in A.

Trace through the complete instruction cycle:
- a) How many memory accesses are required?
- b) List each memory access and what it does
- c) Draw a diagram showing the data flow

**Solution:**

**a) Total Memory Accesses:**
- **Fetch cycle:** 1 access (to get the instruction)
- **Indirect cycle:** 1 access (to read the address from location B)
- **Execute cycle:** 3 accesses (read A, read value at address from B, write result to A)
- **Total: 5 memory accesses**

**b) Detailed Memory Access List:**

1. **Fetch Cycle:**
   - **Access 1:** Read instruction `ADD (B), A` from memory at address in PC
   - Purpose: Get the instruction to execute

2. **Indirect Cycle:**
   - **Access 2:** Read memory location B to get the effective address
   - Purpose: Get the address stored in B (let's say B contains address 2000)
   - Result: Effective address = 2000

3. **Execute Cycle:**
   - **Access 3:** Read memory location A to get first operand
   - Purpose: Get the value at A (let's say A contains value 10)
   - Result: Operand1 = 10
   
   - **Access 4:** Read memory at effective address (2000) to get second operand
   - Purpose: Get the value at the address stored in B (value at address 2000, say 5)
   - Result: Operand2 = 5
   
   - **Access 5:** Write result to memory location A
   - Purpose: Store the sum (10 + 5 = 15) back to location A
   - Result: A now contains 15

**c) Data Flow Diagram:**

```
Memory:
┌─────┐     ┌─────┐     ┌──────┐
│  PC │     │  A  │     │  B   │     ┌──────┐
│ 100 │     │ 10  │     │ 2000 │     │ 2000 │
└──┬──┘     └──┬──┘     └──┬───┘     └──┬───┘
   │           │           │            │
   │ Fetch     │           │            │
   │ Access 1  │           │            │
   ▼           │           │            │
┌──────────┐   │           │            │
│ Instruction│  │           │            │
│ ADD (B), A│  │           │            │
└──────────┘   │           │            │
   │           │           │            │
   │ Indirect  │           │            │
   │ Access 2  │           │            │
   └───────────┼───────────┘            │
               │                         │
               │ Execute                 │
               │ Access 3                │
               ▼                         │
          Read A (10)                    │
               │                         │
               │ Execute                 │
               │ Access 4                │
               └─────────────────────────┘
                          │
                          ▼
                    Read 2000 (5)
                          │
                          │
               ┌──────────┴──────────┐
               │  ALU: 10 + 5 = 15  │
               └──────────┬──────────┘
                          │
               Execute    │
               Access 5   │
                          ▼
                    Write A (15)

Final State:
- A = 15 (updated)
- B = 2000 (unchanged)
- Memory[2000] = 5 (unchanged)
```

---

**PS 1.2** An instruction `MOVE A, (B)` copies data from the address stored in B to location A.

Determine:
- a) Number of fetch cycles needed
- b) Number of indirect cycles needed
- c) Number of memory accesses during execute cycle
- d) Total memory accesses for the complete instruction

**Solution:**

**a) Number of Fetch Cycles:**
- **Answer: 1 fetch cycle**
- Every instruction requires exactly one fetch cycle to retrieve the instruction itself

**b) Number of Indirect Cycles:**
- **Answer: 1 indirect cycle**
- The instruction uses indirect addressing: `(B)` means "the address stored in B"
- The indirect cycle reads memory location B to get the effective address

**c) Memory Accesses During Execute Cycle:**
- **Answer: 2 memory accesses**
  1. Read from the effective address (the address stored in B) to get the source data
  2. Write to memory location A to store the copied data

**d) Total Memory Accesses:**
- Fetch cycle: 1 access (get instruction)
- Indirect cycle: 1 access (read B to get effective address)
- Execute cycle: 2 accesses (read source, write destination)
- **Total: 4 memory accesses**

**Step-by-Step Breakdown:**

1. **Fetch:** Read instruction `MOVE A, (B)` from memory
2. **Indirect:** Read location B (e.g., B contains address 3000)
3. **Execute - Read:** Read from address 3000 (e.g., get value 42)
4. **Execute - Write:** Write value 42 to location A

**Result:** A now contains the value that was at the address stored in B.

---

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

Draw a timeline showing when each interrupt occurs, which handler is executing, and the context stack.

**Solution:**

**Timeline Diagram:**

```
Time    CPU Activity              Context Stack        Interrupt Status
─────────────────────────────────────────────────────────────────────
t=0     Execute Inst @ 1000      [PC=1000, ...]      None
t=1     Inst @ 1000 completes    [PC=1000, ...]      Timer IRQ pending
t=2     Save context             [PC=1000, ...]      Processing Timer
        (PC=1001, PSW, regs)     [PC=1001, PSW, Regs]│
        ──────────────────────    ────────────────────┘
t=3     Timer handler starts     [PC=1001, PSW, Regs] Timer active
        (PC=timer_handler)       [PC=timer_handler]   │
                                                      │
t=4     Timer handler executing  [PC=1001, PSW, Regs] Timer active
        ...                       [PC=timer_handler]   I/O IRQ pending
                                                      │
t=5     I/O interrupt occurs!     [PC=1001, PSW, Regs] I/O interrupts
        Save timer context       [PC=timer_handler]   Timer
        (PC=timer_handler+50,    [PC=timer_handler+50,PSW,Regs]│
         PSW, regs)              ────────────────────┘
t=6     I/O handler starts       [PC=1001, PSW, Regs] I/O active
        (PC=io_handler)          [PC=timer_handler]   (Timer suspended)
                                 [PC=io_handler]
                                                      │
t=7     I/O handler executing    [PC=1001, PSW, Regs] I/O active
        ...                       [PC=timer_handler]   (Timer suspended)
                                 [PC=io_handler]
                                                      │
t=8     I/O handler completes    [PC=1001, PSW, Regs] I/O complete
        Restore timer context    [PC=timer_handler]   Resume Timer
        ──────────────────────    ────────────────────┘
t=9     Timer handler resumes    [PC=1001, PSW, Regs] Timer active
        (continues from where     [PC=timer_handler+50]
         it was interrupted)
                                                      │
t=10    Timer handler completes  [PC=1001, PSW, Regs] Timer complete
        Restore program context  ────────────────────┘
        ──────────────────────
t=11    Resume program           [PC=1001, ...]      None
        (Execute Inst @ 1001)
```

**Context Stack Evolution:**

```
Initial:                    [Program: PC=1000]
After Timer Save:           [Program: PC=1001, PSW, Regs]
                            [Timer Handler: PC=timer_handler]
After I/O Save:             [Program: PC=1001, PSW, Regs]
                            [Timer Handler: PC=timer_handler+50, PSW, Regs]
                            [I/O Handler: PC=io_handler]
After I/O Restore:          [Program: PC=1001, PSW, Regs]
                            [Timer Handler: PC=timer_handler+50]
After Timer Restore:        [Program: PC=1001]
```

**Key Points:**
- High-priority I/O interrupt can interrupt medium-priority timer handler
- Context is saved/restored in LIFO (stack) order
- Each handler resumes exactly where it was interrupted
- Final program resumes at instruction 1001 (next after 1000)

---

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

**Solution:**

**a) What happens to the I/O interrupt handler:**

- The I/O interrupt handler is **suspended** (not cancelled)
- The CPU saves the current state of the I/O handler:
  - Program Counter (where in the I/O handler it was)
  - Processor Status Word
  - All register contents
- This context is pushed onto the interrupt stack
- The I/O handler execution is paused
- The I/O handler will resume later after the timer interrupt completes

**b) What happens when the timer interrupt completes:**

1. **Timer handler finishes its work**
2. **Context restoration:**
   - The saved I/O handler context is popped from the stack
   - PC, PSW, and registers are restored to their pre-timer-interrupt values
3. **I/O handler resumes:**
   - Execution continues from exactly where it was interrupted
   - The I/O handler completes its remaining work
4. **I/O handler completes:**
   - I/O handler finishes
   - Original program context is restored
   - Original program resumes

**c) Interrupt Nesting Diagram:**

```
Priority Level:    1 (Highest) ──────────────────────────────
                   2 ────────────────────┐
                   3 ────────┐           │
                   4 (Lowest)│           │
                             │           │
Time:          ┌─────────────┴───────────┴─────────────┐
               │                                         │
Program        │ Execute Program Instructions          │
Execution      │                                         │
               └─────────────┬─────────────────────────┘
                             │
                             ▼ I/O Interrupt (Priority 3)
               ┌─────────────┴─────────────┐
               │                           │
I/O Handler    │ Process I/O Interrupt     │
(Priority 3)   │                           │
               └─────────────┬─────────────┘
                             │
                             ▼ Timer Interrupt (Priority 2)
               ┌─────────────┴─────────────┐
               │                           │
Timer Handler  │ Process Timer Interrupt   │
(Priority 2)   │ (Higher priority, so it   │
               │  interrupts I/O handler)   │
               └─────────────┬─────────────┘
                             │
                             ▼ Timer completes
               ┌─────────────┴─────────────┐
               │                           │
I/O Handler    │ Resume I/O Handler        │
(Priority 3)   │ (Continues from where    │
               │  it was interrupted)      │
               └─────────────┬─────────────┘
                             │
                             ▼ I/O completes
               ┌─────────────┴─────────────┐
               │                           │
Program        │ Resume Original Program   │
Execution      │                           │
               └───────────────────────────┘

Stack State Evolution:

Initial:           [Program Context]
After I/O Save:    [Program Context]
                   [I/O Handler Context]
After Timer Save:  [Program Context]
                   [I/O Handler Context] ← Suspended
                   [Timer Handler Context] ← Active
After Timer Done:  [Program Context]
                   [I/O Handler Context] ← Resumed
After I/O Done:    [Program Context] ← Resumed
```

**Key Observations:**
- Higher priority interrupts can interrupt lower priority handlers
- Context is saved in stack order (LIFO)
- Handlers resume in reverse order of interruption
- Priority determines which interrupt can interrupt which

---

### Problem 3: Bus Design

**PS 3.1** Design a bus system for a computer with the following requirements:
- Maximum memory: 4 GB
- Data transfer rate: At least 800 MB/s
- Clock frequency: 200 MHz

Determine:
- a) Minimum address bus width needed
- b) Minimum data bus width needed
- c) Verify that the design meets the transfer rate requirement

**Solution:**

**a) Minimum Address Bus Width:**

- Maximum memory = 4 GB = 4,294,967,296 bytes
- Number of addresses needed = 4,294,967,296
- We need: 2^n ≥ 4,294,967,296
- 2^32 = 4,294,967,296 ✓
- **Answer: 32-bit address bus minimum**

**Verification:**
- 32-bit address bus can address 2^32 = 4 GB ✓
- 31-bit would only address 2 GB (insufficient)
- 32-bit is the minimum required

---

**b) Minimum Data Bus Width:**

- Required bandwidth = 800 MB/s
- Clock frequency = 200 MHz = 200,000,000 Hz
- Bandwidth = Data Bus Width × Clock Frequency
- Required: Data Bus Width × 200,000,000 ≥ 800,000,000 bytes/s
- Data Bus Width ≥ 800,000,000 / 200,000,000 = 4 bytes = 32 bits
- **Answer: 32-bit data bus minimum**

**Calculation:**
- 32 bits = 4 bytes
- Bandwidth = 4 bytes × 200,000,000 Hz = 800,000,000 bytes/s = 800 MB/s ✓

---

**c) Verification of Transfer Rate:**

**Design Specification:**
- Address bus: 32 bits
- Data bus: 32 bits
- Clock frequency: 200 MHz

**Theoretical Bandwidth:**
- Bandwidth = 32 bits × 200,000,000 Hz
- = 6,400,000,000 bits/s
- = 800,000,000 bytes/s
- = 800 MB/s

**Verification:**
- Required: ≥ 800 MB/s
- Provided: 800 MB/s
- **Meets requirement: ✓**

**Note:** This is theoretical maximum. Actual bandwidth may be slightly less due to:
- Bus overhead (address setup, control signals)
- Protocol overhead
- Efficiency factors (typically 80-95%)

But the design meets the minimum requirement.

---

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

**Solution:**

**Current System:**
- Bandwidth = 16 bits × 100 MHz = 1,600 Mbits/s = 200 MB/s
- Required: 1.6 GB/s = 1,600 MB/s
- Current system is insufficient (need 8× improvement)

---

**Option A: 32-bit bus, 100 MHz**

**a) New Transfer Rate:**
- Bandwidth = 32 bits × 100,000,000 Hz
- = 3,200,000,000 bits/s
- = 400,000,000 bytes/s
- = 400 MB/s

**b) Meets Requirement?**
- Required: 1,600 MB/s
- Provided: 400 MB/s
- **No, does not meet requirement** (only 25% of needed)

**c) Cost/Complexity:**
- **Cost:** Moderate increase (more pins, wider traces)
- **Complexity:** Moderate (wider data paths, more routing)
- **Power:** Slight increase
- **Compatibility:** May require new motherboard/chipset

---

**Option B: 16-bit bus, 200 MHz**

**a) New Transfer Rate:**
- Bandwidth = 16 bits × 200,000,000 Hz
- = 3,200,000,000 bits/s
- = 400,000,000 bytes/s
- = 400 MB/s

**b) Meets Requirement?**
- Required: 1,600 MB/s
- Provided: 400 MB/s
- **No, does not meet requirement** (only 25% of needed)

**c) Cost/Complexity:**
- **Cost:** Low to moderate (better clock generation)
- **Complexity:** High (signal integrity challenges at 200 MHz)
- **Power:** Significant increase (higher frequency)
- **Signal Integrity:** Critical (timing, crosstalk, EMI)
- **Compatibility:** May work with existing bus width

---

**Option C: 32-bit bus, 200 MHz**

**a) New Transfer Rate:**
- Bandwidth = 32 bits × 200,000,000 Hz
- = 6,400,000,000 bits/s
- = 800,000,000 bytes/s
- = 800 MB/s

**Wait, this still doesn't meet 1.6 GB/s requirement!**

Let me recalculate what's needed:
- Required: 1.6 GB/s = 1,600 MB/s
- Need: 1,600 MB/s / 200 MHz = 8 bytes = 64 bits

**Revised Option C: 64-bit bus, 200 MHz**

**a) New Transfer Rate:**
- Bandwidth = 64 bits × 200,000,000 Hz
- = 12,800,000,000 bits/s
- = 1,600,000,000 bytes/s
- = 1,600 MB/s = 1.6 GB/s

**b) Meets Requirement?**
- Required: 1,600 MB/s
- Provided: 1,600 MB/s
- **Yes, meets requirement exactly** ✓

**c) Cost/Complexity:**
- **Cost:** High (many more pins, complex routing)
- **Complexity:** Very high (64-bit data paths, signal integrity)
- **Power:** Significant increase
- **Physical Size:** Larger connectors, more board space
- **Compatibility:** Requires new design

---

**Comparison Summary:**

| Option | Bus Width | Clock | Bandwidth | Meets Req? | Cost | Complexity |
|--------|-----------|-------|-----------|------------|------|------------|
| A      | 32-bit    | 100 MHz| 400 MB/s  | No         | Mod  | Mod        |
| B      | 16-bit    | 200 MHz| 400 MB/s  | No         | Low  | High       |
| C      | 64-bit    | 200 MHz| 1.6 GB/s  | Yes        | High | Very High |

**Recommendation:**
- **Option C (64-bit, 200 MHz)** is the only one that meets the requirement
- However, consider if requirement can be relaxed or if other optimizations are possible
- May want to consider: burst transfers, efficiency improvements, or accepting lower bandwidth

---

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

**Solution:**

**a) Execution Time Calculation:**

**System A:**
- Cycles per instruction = Fetch + Execute = 2 + 3 = 5 cycles
- Total cycles = 1,000,000 × 5 = 5,000,000 cycles
- Clock period = 1 / 100,000,000 = 10 ns
- Execution time = 5,000,000 × 10 ns = 50,000,000 ns = 50 ms
- **Answer: 50 milliseconds**

**System B:**
- Cycles per instruction = Fetch + Execute = 1 + 4 = 5 cycles
- Total cycles = 1,000,000 × 5 = 5,000,000 cycles
- Clock period = 1 / 50,000,000 = 20 ns
- Execution time = 5,000,000 × 20 ns = 100,000,000 ns = 100 ms
- **Answer: 100 milliseconds**

**b) Which System is Faster?**
- **System A is 2× faster** (50 ms vs 100 ms)
- System A executes the program in half the time

**c) Trade-offs:**

**System A Advantages:**
- Faster execution (2×)
- Higher clock frequency
- Better for CPU-bound workloads

**System A Disadvantages:**
- Narrower data bus (32-bit vs 64-bit)
- Lower memory bandwidth (400 MB/s vs 400 MB/s - same in this case)
- May be bottlenecked for data-intensive operations

**System B Advantages:**
- Wider data bus (64-bit)
- Can transfer more data per cycle when needed
- Better for memory-intensive workloads
- Lower power consumption (lower frequency)

**System B Disadvantages:**
- Slower execution (2× slower)
- Lower clock frequency
- May be overkill if data bus width isn't fully utilized

**Key Insight:**
- In this case, instruction execution time dominates
- System A's higher clock frequency outweighs System B's wider bus
- For data-intensive programs, System B might perform better despite slower clock

---

**PS 4.2** A CPU executes instructions with the following characteristics:
- Fetch cycle: 2 clock cycles
- Execute cycle: 3-8 clock cycles (average 5)
- Clock: 2 GHz
- 10% of instructions cause cache misses adding 50 cycles each

Calculate:
- a) Average instruction execution time
- b) Instructions per second (IPS)
- c) How cache misses affect performance

**Solution:**

**a) Average Instruction Execution Time:**

**Without Cache Misses:**
- Average cycles per instruction = Fetch + Execute = 2 + 5 = 7 cycles
- Clock period = 1 / 2,000,000,000 = 0.5 ns
- Time per instruction (no miss) = 7 × 0.5 ns = 3.5 ns

**With Cache Misses:**
- 90% of instructions: 7 cycles (no miss)
- 10% of instructions: 7 + 50 = 57 cycles (cache miss penalty)
- Average cycles = (0.90 × 7) + (0.10 × 57)
- = 6.3 + 5.7 = 12 cycles

- Average time per instruction = 12 × 0.5 ns = 6 ns
- **Answer: 6 nanoseconds average**

**b) Instructions Per Second (IPS):**

- IPS = Clock Frequency / Average Cycles Per Instruction
- IPS = 2,000,000,000 / 12 = 166,666,667 instructions/s
- **Answer: Approximately 166.7 million instructions per second (166.7 MIPS)**

**Alternative calculation:**
- Average time per instruction = 6 ns
- Instructions per second = 1 / (6 × 10^-9) = 166,666,667 /s

**c) Cache Miss Performance Impact:**

**Performance Without Cache Misses:**
- Cycles per instruction = 7
- IPS = 2,000,000,000 / 7 = 285,714,286 instructions/s
- Time per instruction = 3.5 ns

**Performance With Cache Misses:**
- Cycles per instruction = 12 (average)
- IPS = 2,000,000,000 / 12 = 166,666,667 instructions/s
- Time per instruction = 6 ns

**Impact:**
- **Slowdown factor:** 12 / 7 = 1.71× slower
- **IPS reduction:** 285.7 MIPS → 166.7 MIPS (41.7% reduction)
- **Time increase:** 3.5 ns → 6 ns (71% increase)

**Key Observations:**
- Cache misses have a significant impact (1.71× slowdown)
- Even though only 10% of instructions miss, the 50-cycle penalty is severe
- Cache performance is critical for overall system performance
- Reducing cache miss rate or miss penalty would significantly improve performance

---

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

**Solution:**

**a) CPU Time Wasted in Strategy 1 (Programmed I/O):**

- CPU checks every 1 μs
- Device ready after 10 ms
- Number of checks = 10 ms / 1 μs = 10,000 checks
- Each check takes some time, but even if minimal, the CPU is busy-waiting
- **CPU time wasted ≈ 10 ms** (CPU is occupied checking, cannot do other work)

**More precisely:**
- If each check takes 10 cycles at 2 GHz:
- Time per check = 10 / 2,000,000,000 = 5 ns
- Total wasted time = 10,000 × 5 ns = 50,000 ns = 50 μs (just for checks)
- But CPU is blocked for the entire 10 ms waiting period
- **Answer: 10 milliseconds wasted** (CPU cannot do useful work during this time)

**b) CPU Time Used in Strategy 2 (Interrupt-Driven I/O):**

- CPU issues I/O command (minimal time, say 100 cycles)
- CPU continues with other work for 10 ms
- When interrupt occurs: handler takes 100 cycles
- Clock period = 1 / 2,000,000,000 = 0.5 ns
- Handler time = 100 × 0.5 ns = 50 ns
- **Answer: 50 nanoseconds** (just the interrupt handler time)

**c) Efficiency Improvement:**

**Strategy 1:**
- CPU time wasted: 10 ms = 10,000,000 ns
- CPU cannot do other work during this time

**Strategy 2:**
- CPU time used: 50 ns (for interrupt handler)
- CPU can do 10 ms of useful work while I/O operates

**Efficiency Improvement:**
- Time saved = 10,000,000 ns - 50 ns = 9,999,950 ns
- Improvement factor = 10,000,000 / 50 = 200,000×
- **Answer: 200,000× more efficient**

**Percentage Improvement:**
- Strategy 1 efficiency: 0% (wasted time)
- Strategy 2 efficiency: 99.9995% (only 50 ns overhead)
- **Improvement: 99.9995% more efficient**

**Key Insight:**
- Interrupt-driven I/O allows CPU to do useful work while waiting
- The efficiency gain is enormous for slow I/O devices
- Even with interrupt overhead, the improvement is dramatic

---

**PS 5.2** A system processes:
- 1000 I/O interrupts per second
- Each interrupt handler: 200 cycles
- Clock: 1 GHz
- Average instruction: 4 cycles

Calculate:
- a) Cycles per second used for interrupts
- b) Instructions per second lost to interrupts
- c) Percentage of CPU time for interrupts

**Solution:**

**a) Cycles Per Second Used for Interrupts:**

- Interrupts per second = 1,000
- Cycles per interrupt = 200
- Total cycles per second = 1,000 × 200 = 200,000 cycles/s
- **Answer: 200,000 cycles per second**

**b) Instructions Per Second Lost to Interrupts:**

- Cycles used for interrupts = 200,000 cycles/s
- Average cycles per instruction = 4
- Instructions that could have been executed = 200,000 / 4 = 50,000 instructions/s
- **Answer: 50,000 instructions per second lost**

**Alternative interpretation:**
- If CPU was doing useful work, it could execute:
- Clock frequency = 1,000,000,000 cycles/s
- Instructions per second (theoretical) = 1,000,000,000 / 4 = 250,000,000 instructions/s
- Interrupts use 200,000 cycles/s
- Lost instructions = 200,000 / 4 = 50,000 instructions/s

**c) Percentage of CPU Time for Interrupts:**

- Total CPU cycles per second = 1,000,000,000 cycles/s
- Interrupt cycles per second = 200,000 cycles/s
- Percentage = (200,000 / 1,000,000,000) × 100%
- = 0.0002 × 100% = 0.02%
- **Answer: 0.02% of CPU time**

**Interpretation:**
- Interrupts consume a very small fraction of CPU time (0.02%)
- The system can still execute 99.98% of its capacity for other work
- This is a very reasonable overhead for interrupt-driven I/O
- The benefit (allowing CPU to work while I/O operates) far outweighs this small cost

---

## Conceptual Question Solutions

### Concept 1: System Design

**CQ 1.1** Explain why a computer system needs all four components (CPU, Memory, I/O, Bus). What would happen if one component was missing?

**Solution:**

**Why All Four Components Are Essential:**

1. **CPU (Central Processing Unit):**
   - **Purpose:** Executes instructions and coordinates system operations
   - **Without CPU:** System cannot process data or execute programs
   - **Result:** Computer would be non-functional - no computation possible

2. **Main Memory:**
   - **Purpose:** Stores programs and data currently being processed
   - **Without Memory:** No place to store instructions or data
   - **Result:** CPU would have nothing to execute, system cannot function

3. **I/O Modules:**
   - **Purpose:** Interface with external world (keyboard, display, storage, network)
   - **Without I/O:** Cannot receive input or produce output
   - **Result:** Computer would be isolated, unable to interact with users or other systems

4. **System Bus (Interconnection):**
   - **Purpose:** Communication pathway connecting all components
   - **Without Bus:** Components cannot communicate or transfer data
   - **Result:** CPU cannot access memory or I/O, system completely non-functional

**Interdependence:**
- All components work together as an integrated system
- Removing any component breaks the system
- Each component depends on others to function

**Analogy:** Like a human body needs brain (CPU), memory (Memory), senses/actions (I/O), and nervous system (Bus) - all are essential.

---

**CQ 1.2** Discuss the trade-offs between hardwired and programmable systems. In what situations would you choose each?

**Solution:**

**Hardwired Systems:**

**Advantages:**
- **Speed:** Optimized for specific task, can be very fast
- **Efficiency:** No instruction interpretation overhead
- **Reliability:** Fixed functionality, fewer failure modes
- **Cost (for high volume):** Lower per-unit cost in mass production
- **Power:** Can be more power-efficient for dedicated tasks

**Disadvantages:**
- **Inflexibility:** Cannot change functionality without physical modification
- **Limited functionality:** Designed for specific task only
- **Development cost:** High initial design cost
- **Not adaptable:** Cannot adapt to new requirements

**Use Cases:**
- **Embedded systems:** Traffic lights, washing machines, calculators
- **Dedicated controllers:** Industrial control systems
- **High-performance specialized tasks:** Graphics processors (GPUs), network processors
- **Safety-critical systems:** Where fixed behavior is required

---

**Programmable Systems:**

**Advantages:**
- **Flexibility:** Can perform different tasks by changing programs
- **Adaptability:** Can be updated with new software
- **Versatility:** One system can handle many different applications
- **Development:** Easier to develop and modify
- **Cost (for low volume):** Lower development cost

**Disadvantages:**
- **Speed:** Instruction interpretation adds overhead
- **Complexity:** More complex design
- **Power:** Generally higher power consumption
- **Cost (for high volume):** May be more expensive per unit

**Use Cases:**
- **General-purpose computers:** PCs, servers, workstations
- **Smartphones and tablets:** Need to run various applications
- **Embedded systems requiring updates:** Routers, smart devices
- **Systems requiring flexibility:** Research, development, prototyping

---

**Trade-off Summary:**

| Aspect | Hardwired | Programmable |
|--------|-----------|--------------|
| Speed | Faster | Slower (overhead) |
| Flexibility | Low | High |
| Cost (development) | High | Lower |
| Cost (production) | Lower (volume) | Higher |
| Power | Lower | Higher |
| Adaptability | None | High |

**Decision Factors:**
- **Choose Hardwired when:**
  - Task is fixed and well-defined
  - Performance is critical
  - High volume production
  - Power constraints
  - Safety-critical fixed behavior

- **Choose Programmable when:**
  - Requirements may change
  - Multiple different tasks needed
  - Low to medium volume
  - Flexibility is important
  - Development time is critical

**Modern Trend:** Many systems use hybrid approaches - programmable CPU with hardwired accelerators for specific tasks.

---

**CQ 1.3** Why is the bus architecture critical to system performance? What happens if the bus becomes a bottleneck?

**Solution:**

**Why Bus Architecture is Critical:**

1. **All Data Transfer Goes Through Bus:**
   - CPU-memory transfers (instructions, data)
   - CPU-I/O transfers (commands, data)
   - Memory-I/O transfers (DMA operations)
   - Every operation depends on bus performance

2. **Bus Bandwidth Limits System Throughput:**
   - Bus bandwidth determines maximum data transfer rate
   - If bus is slow, fast CPU cannot be fully utilized
   - Memory access speed is limited by bus speed
   - I/O performance depends on bus bandwidth

3. **Bus Latency Affects Response Time:**
   - Time to transfer data affects overall system latency
   - Slow bus increases wait times for all components
   - Affects system responsiveness

4. **Bus Contention Reduces Efficiency:**
   - Multiple devices competing for bus access
   - Arbitration overhead
   - Waiting for bus availability

**What Happens if Bus Becomes a Bottleneck:**

1. **CPU Underutilization:**
   - Fast CPU waits for slow bus transfers
   - CPU cannot fetch instructions/data fast enough
   - CPU performance wasted

2. **Memory Access Delays:**
   - Memory may be fast, but bus limits access speed
   - Cache misses become more expensive
   - System performance degrades

3. **I/O Performance Suffers:**
   - I/O devices cannot transfer data efficiently
   - Network, disk operations become slow
   - User experience degrades

4. **System-Wide Impact:**
   - All components affected
   - Overall system performance limited by bus
   - Upgrading other components provides little benefit

**Example Scenario:**
- CPU: 4 GHz, can process 1 billion instructions/second
- Memory: Fast DDR4, can provide data at 25 GB/s
- Bus: 32-bit, 100 MHz, bandwidth = 400 MB/s
- **Result:** Bus becomes bottleneck, CPU and memory underutilized

**Solutions to Bus Bottlenecks:**
- Increase bus width (16-bit → 32-bit → 64-bit)
- Increase bus frequency
- Use multiple buses (separate memory and I/O buses)
- Use cache to reduce bus traffic
- Use DMA to bypass CPU for I/O transfers
- Use point-to-point interconnects (PCIe) instead of shared bus

**Key Insight:** Bus performance must match or exceed the needs of the fastest component, otherwise it becomes the limiting factor.

---

### Concept 2: Instruction Execution

**CQ 2.1** Why do different instructions require different numbers of memory accesses? Give examples of instructions with 0, 1, 2, and 3+ memory accesses.

**Solution:**

**Why Different Memory Accesses:**

1. **Operand Location:**
   - Register operands: 0 memory accesses
   - Memory operands: 1+ memory accesses per operand
   - Immediate operands: 0 memory accesses (in instruction)

2. **Number of Operands:**
   - More operands = more potential memory accesses
   - Results may need to be written back to memory

3. **Addressing Modes:**
   - Direct addressing: 1 access per operand
   - Indirect addressing: 2 accesses per operand (address + data)
   - Indexed addressing: Additional accesses

4. **Instruction Type:**
   - Arithmetic: May read operands, write results
   - Load/Store: Explicit memory operations
   - Control: May modify PC (stored in memory in some architectures)

**Examples:**

**0 Memory Accesses:**
- `ADD R1, R2` - Register-to-register addition
  - Operands in registers, result to register
  - No memory access needed

**1 Memory Access:**
- `LOAD R1, A` - Load from memory
  - Read memory location A
  - 1 memory access

- `STORE R1, A` - Store to memory
  - Write to memory location A
  - 1 memory access

**2 Memory Accesses:**
- `MOVE A, B` - Copy from B to A
  - Read from B, write to A
  - 2 memory accesses

- `ADD R1, A` - Add memory to register, store back
  - Read A, write result back to A (if result stored in memory)
  - 2 memory accesses

**3+ Memory Accesses:**
- `ADD B, A` - Add B to A, store in A
  - Read A, read B, write result to A
  - 3 memory accesses

- `ADD (B), A` - Indirect addressing
  - Fetch: 1 (get instruction)
  - Indirect: 1 (read B to get address)
  - Execute: 3 (read A, read effective address, write result)
  - Total: 5 memory accesses

**Performance Implications:**
- More memory accesses = longer execution time
- Memory is slower than registers
- Minimizing memory accesses improves performance
- This is why registers and caches are important

---

**CQ 2.2** Explain the purpose of indirect addressing. When is it useful, and what is the cost (in terms of memory accesses)?

**Solution:**

**Purpose of Indirect Addressing:**

1. **Dynamic Addressing:**
   - Address determined at runtime, not compile time
   - Allows programs to work with variable data structures
   - Enables pointer-based programming

2. **Data Structures:**
   - Arrays: Base address + index
   - Linked lists: Follow pointers
   - Trees: Navigate through nodes
   - Dynamic memory allocation

3. **Function Pointers:**
   - Jump tables
   - Callback functions
   - Dynamic dispatch

4. **Flexibility:**
   - Same code works with different data locations
   - Enables generic programming
   - Supports advanced programming constructs

**When Indirect Addressing is Useful:**

1. **Array Processing:**
   ```
   Base address in register, index calculated
   Effective address = Base + Index
   ```

2. **Pointer Following:**
   ```
   Pointer contains address of data
   Follow pointer to get actual data
   ```

3. **Function Calls:**
   ```
   Jump to address stored in register/memory
   Enables dynamic function calls
   ```

4. **Data Structures:**
   ```
   Linked list: Follow next pointer
   Tree: Follow child pointers
   ```

**Cost in Terms of Memory Accesses:**

**Direct Addressing:**
- 1 memory access to get operand
- Example: `LOAD R1, A` - 1 access

**Indirect Addressing:**
- 2 memory accesses: address + data
- Example: `LOAD R1, (A)` - 2 accesses
  1. Read A to get address (say 2000)
  2. Read address 2000 to get data

**Indirect Addressing with Multiple Levels:**
- Each level of indirection adds 1 memory access
- Double indirect: 3 accesses
- Triple indirect: 4 accesses

**Performance Trade-off:**
- **Benefit:** Flexibility, dynamic behavior
- **Cost:** Extra memory access (slower)
- **Mitigation:** Use registers for frequently accessed pointers
- **Modern systems:** Cache helps reduce penalty

**Example Cost Analysis:**
- Direct: 1 access × 100 ns = 100 ns
- Indirect: 2 accesses × 100 ns = 200 ns
- **Overhead: 100 ns (2× slower for memory access)**

**When Worth the Cost:**
- When flexibility is more important than speed
- When working with dynamic data structures
- When code reuse is valuable
- Modern systems: Cache makes indirect addressing penalty smaller

---

**CQ 2.3** How does the instruction cycle relate to the fetch-decode-execute model? Are they the same thing?

**Solution:**

**Fetch-Decode-Execute Model:**

This is a **conceptual model** that describes the basic operation of a CPU:

1. **Fetch:** Get instruction from memory
2. **Decode:** Determine what the instruction does
3. **Execute:** Perform the operation

**Instruction Cycle (Detailed):**

This is the **actual implementation** with more detail:

1. **Fetch Cycle:** Get instruction from memory
2. **Indirect Cycle (optional):** Get effective address if indirect addressing
3. **Execute Cycle:** Decode and perform operation
4. **Interrupt Check:** Check for interrupts after execution

**Relationship:**

**They are related but not identical:**

1. **Fetch Phase:**
   - **Model:** Fetch instruction
   - **Cycle:** Fetch cycle - detailed steps (place PC on bus, read memory, load IR, increment PC)

2. **Decode Phase:**
   - **Model:** Decode instruction
   - **Cycle:** Part of execute cycle - Control Unit decodes opcode

3. **Execute Phase:**
   - **Model:** Execute operation
   - **Cycle:** Execute cycle - detailed steps (fetch operands, perform operation, store results)

**Additional Details in Instruction Cycle:**

1. **Indirect Cycle:**
   - Not explicitly in basic model
   - Added when indirect addressing is used
   - Model assumes direct addressing

2. **Interrupt Check:**
   - Not in basic model
   - Added for real systems
   - Allows system to respond to events

**Are They the Same?**

**No, but closely related:**

- **Fetch-Decode-Execute:** Simplified, conceptual model
- **Instruction Cycle:** Detailed, implementation-level description

**The instruction cycle is an expansion of the fetch-decode-execute model:**
- Adds indirect cycle when needed
- Adds interrupt handling
- Provides detailed steps for each phase
- Includes timing and control aspects

**Educational Purpose:**
- **Model:** Easy to understand, teaches basic concept
- **Cycle:** More accurate, shows real implementation
- **Progression:** Learn model first, then detailed cycle

**Modern Systems:**
- Both models are simplified
- Real systems have pipelining, caching, branch prediction
- But the basic cycle remains the foundation

**Summary:**
- Fetch-decode-execute is a **simplified model**
- Instruction cycle is the **detailed implementation**
- Instruction cycle = Fetch-Decode-Execute + Indirect + Interrupts
- They describe the same process at different levels of detail

---

### Concept 3: Interrupts

**CQ 3.1** Explain how interrupts enable multitasking in operating systems. How do timer interrupts support time-sharing?

**Solution:**

**How Interrupts Enable Multitasking:**

1. **OS Regains Control:**
   - Without interrupts, user programs run until they voluntarily yield
   - Interrupts allow OS to forcibly regain control
   - OS can switch between programs

2. **Pre-emptive Scheduling:**
   - OS can interrupt running program
   - Switch to different program
   - Return to original program later
   - Programs don't need to cooperate

3. **Fair Resource Allocation:**
   - OS ensures each program gets CPU time
   - Prevents one program from monopolizing CPU
   - Enables responsive system

**Timer Interrupts and Time-Sharing:**

1. **Periodic Interrupts:**
   - Timer generates interrupt at fixed intervals (e.g., every 10 ms)
   - Interrupt occurs regardless of what program is running
   - OS scheduler runs on each timer interrupt

2. **Time Slicing:**
   - Each program gets a time slice (quantum)
   - Timer interrupt occurs when time slice expires
   - OS switches to next program
   - Fair CPU time distribution

3. **Process Switching:**
   - On timer interrupt:
     - Save current program's context
     - Select next program to run
     - Restore next program's context
     - Resume execution

**Example Timeline:**

```
Time    Program A          Program B          OS
─────────────────────────────────────────────────────
0-10ms  [Running]          [Waiting]          [Idle]
10ms    [Interrupted] ────> [Timer Interrupt] ──┐
        [Context Saved]    [OS Scheduler]      │
                          [Select Program B]   │
                          [Context Restored]   │
10-20ms [Waiting]          [Running] <─────────┘
20ms    [Timer Interrupt] <─────────────────────┐
        [OS Scheduler]                          │
        [Select Program A]                      │
        [Context Restored]                      │
20-30ms [Running]          [Waiting] <─────────┘
```

**Benefits:**

1. **Responsiveness:**
   - System remains responsive to user input
   - No single program can freeze system
   - Interactive programs get regular CPU time

2. **Fairness:**
   - All programs get equal (or priority-weighted) time
   - Prevents starvation
   - Better user experience

3. **Reliability:**
   - Misbehaving program cannot block others
   - OS maintains control
   - System stability

**Without Timer Interrupts:**
- Only cooperative multitasking possible
- Programs must voluntarily yield CPU
- One misbehaving program can freeze system
- Unreliable and unpredictable

**Key Insight:** Timer interrupts are the mechanism that makes pre-emptive multitasking possible, enabling modern operating systems.

---

**CQ 3.2** Discuss the trade-offs between disabling interrupts vs. priority-based nested interrupts. When would you use each approach?

**Solution:**

**Disabling Interrupts:**

**How It Works:**
- When processing interrupt, disable further interrupts
- New interrupts held pending
- After handler completes, re-enable interrupts
- Process pending interrupts

**Advantages:**
- **Simplicity:** Easy to implement
- **Predictability:** No nested complexity
- **Lower Overhead:** No nested context saving
- **Easier Debugging:** Linear execution flow
- **Resource Efficient:** Less stack space needed

**Disadvantages:**
- **Delayed Response:** High-priority interrupts must wait
- **Not Real-Time:** Unsuitable for time-critical systems
- **Potential Starvation:** Low-priority interrupts can block high-priority ones
- **Less Efficient:** Cannot handle urgent events promptly

**Use Cases:**
- Simple embedded systems
- Low interrupt rates
- Non-critical applications
- Systems where simplicity is more important than responsiveness
- Legacy systems

---

**Priority-Based Nested Interrupts:**

**How It Works:**
- Each interrupt has priority level
- Higher priority interrupts can interrupt lower priority handlers
- Context saved/restored in stack order
- Handlers resume in reverse order

**Advantages:**
- **Immediate Response:** Critical events handled promptly
- **Real-Time Capable:** Suitable for time-critical systems
- **Efficient:** Urgent events don't wait
- **Flexible:** Supports complex priority schemes
- **Better Performance:** Critical operations not delayed

**Disadvantages:**
- **Complexity:** More complex implementation
- **Higher Overhead:** Nested context saving/restoration
- **Stack Management:** Risk of stack overflow
- **Debugging:** More difficult (nested execution)
- **Resource Intensive:** More memory for stacks

**Use Cases:**
- Real-time systems
- Embedded systems with mixed priorities
- Systems with critical events
- Modern operating systems
- Safety-critical systems

---

**Comparison:**

| Aspect | Disable Interrupts | Priority-Based Nested |
|--------|-------------------|----------------------|
| Complexity | Low | High |
| Overhead | Low | Higher |
| Response Time | Slower | Faster |
| Real-Time Support | Poor | Good |
| Implementation | Simple | Complex |
| Debugging | Easier | Harder |
| Stack Usage | Low | Higher |
| Flexibility | Low | High |

**Decision Factors:**

**Choose Disable Interrupts When:**
- System is simple
- Interrupt rates are low
- Real-time response not critical
- Development resources limited
- Predictability more important than speed

**Choose Priority-Based Nested When:**
- Real-time requirements exist
- Mixed priority events
- Critical events must be handled immediately
- System complexity acceptable
- Performance is important

**Hybrid Approaches:**
- Many systems use hybrid:
  - Disable interrupts for very short critical sections
  - Priority-based for normal operation
  - Best of both worlds

**Modern Trend:**
- Most modern systems use priority-based nested interrupts
- Hardware support for priorities
- Efficient context switching
- Better overall system performance

---

**CQ 3.3** Why must context be saved when an interrupt occurs? What would happen if context wasn't saved?

**Solution:**

**Why Context Must Be Saved:**

1. **Resume Execution:**
   - Interrupted program must resume exactly where it left off
   - Need to restore program state to continue correctly
   - Without saved context, cannot resume properly

2. **Register Contents:**
   - Registers contain intermediate calculation results
   - Local variables, loop counters, temporary values
   - These values are lost if not saved

3. **Program Counter:**
   - PC points to next instruction to execute
   - Must know where to resume
   - Without PC, cannot continue program

4. **Processor Status:**
   - Condition codes, flags, processor mode
   - Important for correct program behavior
   - Affects subsequent instructions

5. **Transparency:**
   - Interrupt should be transparent to program
   - Program should not know it was interrupted
   - Requires perfect state restoration

**What Context Includes:**
- Program Counter (PC)
- Processor Status Word (PSW)
- General-purpose registers
- Stack pointer
- Other processor state

**What Would Happen Without Context Saving:**

**Scenario 1: Registers Not Saved**
```
Program executing: R1 = 10, R2 = 20, calculating R1 + R2
Interrupt occurs: Handler uses R1, R2
Handler completes: R1, R2 now contain different values
Program resumes: Uses wrong values, incorrect results
```

**Scenario 2: PC Not Saved**
```
Program at instruction 1000
Interrupt occurs: Handler executes
Handler completes: PC points to handler's end
Program resumes: Jumps to wrong location, crashes
```

**Scenario 3: PSW Not Saved**
```
Program: Overflow flag set, affects next instruction
Interrupt: Handler clears flags
Handler completes: Flags changed
Program resumes: Wrong condition codes, incorrect behavior
```

**Consequences:**

1. **Data Corruption:**
   - Register values overwritten
   - Intermediate results lost
   - Incorrect calculations

2. **Program Crashes:**
   - Wrong instruction executed
   - Invalid memory access
   - System instability

3. **Unpredictable Behavior:**
   - Different results each time
   - Non-deterministic execution
   - Impossible to debug

4. **System Failure:**
   - Programs cannot run correctly
   - System becomes unreliable
   - Complete system failure possible

**Example Without Context Saving:**

```
Program State Before Interrupt:
  PC = 1000 (next instruction)
  R1 = 42
  R2 = 17
  PSW = [Zero=0, Carry=0, Overflow=0]

Interrupt Handler Executes:
  Uses R1, R2 for its work
  R1 = 99, R2 = 88 (changed!)
  Modifies flags

Program Resumes (without restoration):
  PC = ??? (unknown, probably wrong)
  R1 = 99 (wrong value!)
  R2 = 88 (wrong value!)
  PSW = [wrong flags]
  
Result: Program executes incorrectly, produces wrong results, may crash
```

**Example With Context Saving:**

```
Program State Before Interrupt:
  PC = 1000, R1 = 42, R2 = 17, PSW = [flags]

Interrupt Handler:
  Saves: PC=1000, R1=42, R2=17, PSW=[flags] to stack
  Uses registers for its work
  R1 = 99, R2 = 88 (temporary, for handler)

Program Resumes (with restoration):
  Restores: PC=1000, R1=42, R2=17, PSW=[flags] from stack
  Continues exactly where it left off
  
Result: Program executes correctly, transparent interrupt
```

**Key Insight:** Context saving/restoration is essential for correct system operation. Without it, interrupts would break programs, making the system unusable.

---

*End of Group 1 Exercise Solutions*


