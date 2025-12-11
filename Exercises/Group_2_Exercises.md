# Group 2: CPU Architecture & Instruction Execution
## Comprehensive Exercises

**Chapter 16: Processor Structure & Function**

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

### Section 1: Processor Organization

**1.1** Which of the following is NOT one of the five fundamental processor operations?

a) Fetch Instruction
b) Interpret Instruction
c) Fetch Data
d) Cache Data

**1.2** The processor needs temporary storage primarily for:

a) Long-term data storage
b) Instructions, operands, intermediate results, and control information
c) Only for final results
d) Only for input data

**1.3** In the memory hierarchy, which is the fastest but smallest?

a) Cache Memory
b) Main Memory
c) CPU Registers
d) Secondary Storage

**1.4** The "Process Data" operation typically occurs in which component?

a) Control Unit
b) ALU (Arithmetic Logic Unit)
c) Memory
d) I/O Module

**1.5** Which operation determines what action an instruction requires?

a) Fetch Instruction
b) Interpret Instruction
c) Fetch Data
d) Write Data

### Section 2: CPU Internal Structure

**2.1** The CPU connects to the system bus through which components?

a) Only the Control Unit
b) Only the ALU
c) Multiple internal components (MAR, MBR, etc.)
d) Only registers

**2.2** The Memory Address Register (MAR) holds:

a) The data being transferred
b) The address of the memory location to access
c) The instruction being executed
d) The result of an operation

**2.3** The Memory Buffer Register (MBR) is also known as:

a) Memory Address Register
b) Memory Data Register (MDR)
c) Instruction Register
d) Program Counter

**2.4** During a memory read operation, data flows from:

a) MAR to Memory
b) Memory to MBR
c) MBR to Memory
d) IR to Memory

**2.5** The internal CPU data path connects:

a) Only ALU and registers
b) ALU, registers, and control unit
c) All major CPU components
d) Only memory and CPU

### Section 3: Register Organization

**3.1** User-visible registers are:

a) Only accessible by the operating system
b) Accessible to machine and assembly language programmers
c) Only used for control purposes
d) Not accessible to programs

**3.2** General-purpose registers can be used for:

a) Only data storage
b) Only address storage
c) Both data and address storage
d) Only control information

**3.3** Condition codes (flags) indicate:

a) The current instruction
b) The result of previous operations (zero, carry, overflow, etc.)
c) Memory addresses
d) Register contents

**3.4** The Program Counter (PC) is a:

a) User-visible register
b) Control and status register
c) General-purpose register
d) Data register

**3.5** The Program Status Word (PSW) typically contains:

a) Only the Program Counter
b) Condition codes, interrupt enable bits, and processor mode
c) Only condition codes
d) Only memory addresses

### Section 4: Instruction Cycle

**4.1** The complete instruction cycle includes which phases?

a) Fetch and Execute only
b) Fetch, Indirect, Execute, and Interrupt
c) Fetch, Decode, and Execute only
d) Only Execute

**4.2** During the fetch cycle, the instruction is loaded into:

a) Program Counter
b) Instruction Register
c) Memory Address Register
d) Memory Buffer Register

**4.3** The indirect cycle is needed when:

a) Every instruction executes
b) Indirect addressing mode is used
c) A branch instruction is executed
d) An interrupt occurs

**4.4** Register-to-register operations require:

a) Memory access
b) No memory access
c) I/O access
d) Cache access only

**4.5** During the interrupt cycle, what must be saved?

a) Only the Program Counter
b) Only registers
c) Processor context (PC, PSW, registers)
d) Only memory contents

### Section 5: Pipelining Fundamentals

**5.1** Pipelining improves performance by:

a) Making instructions execute faster individually
b) Overlapping execution of multiple instructions
c) Reducing the number of instructions
d) Increasing clock frequency

**5.2** In a 5-stage pipeline, if each stage takes 1 cycle, how many cycles does it take to complete one instruction?

a) 1 cycle
b) 5 cycles
c) 10 cycles
d) Depends on the instruction

**5.3** The speedup from pipelining is ideally equal to:

a) The number of pipeline stages
b) Half the number of stages
c) The clock frequency
d) The number of instructions

**5.4** Pipeline throughput refers to:

a) Time to complete one instruction
b) Number of instructions completed per unit time
c) Clock frequency
d) Pipeline depth

**5.5** In pipelining, the first instruction still takes:

a) 1 cycle
b) The full pipeline depth in cycles
c) Half the pipeline depth
d) Zero cycles

### Section 6: MIPS Pipeline

**6.1** The MIPS pipeline has how many stages?

a) 3 stages
b) 4 stages
c) 5 stages
d) 6 stages

**6.2** In the MIPS pipeline, register read occurs in which stage?

a) IF (Instruction Fetch)
b) ID (Instruction Decode)
c) EX (Execute)
d) MEM (Memory Access)

**6.3** The ALU operation in MIPS occurs in which stage?

a) IF
b) ID
c) EX
d) MEM

**6.4** For a load instruction (lw), data is written to the register in which stage?

a) EX
b) MEM
c) WB (Write Back)
d) ID

**6.5** In a 5-stage pipeline with no hazards, the ideal CPI (Cycles Per Instruction) is:

a) 1
b) 5
c) 0.2
d) Depends on the instruction

### Section 7: Pipeline Hazards

**7.1** Which of the following is NOT a type of pipeline hazard?

a) Structure hazard
b) Data hazard
c) Control hazard
d) Timing hazard

**7.2** A structure hazard occurs when:

a) Data dependencies exist
b) Multiple instructions need the same resource simultaneously
c) A branch instruction is encountered
d) An interrupt occurs

**7.3** A RAW (Read After Write) hazard is also known as:

a) Anti-dependency
b) Output dependency
c) True dependency
d) False dependency

**7.4** Control hazards are caused by:

a) Data dependencies
b) Resource conflicts
c) Branch and jump instructions
d) Memory access

**7.5** To resolve a data hazard, one common technique is:

a) Increasing clock frequency
b) Adding more pipeline stages
c) Forwarding (bypassing)
d) Removing the instruction

### Section 8: Data Hazards and Forwarding

**8.1** Forwarding (bypassing) allows:

a) Instructions to skip pipeline stages
b) Results to be used before they are written to the register file
c) Instructions to execute out of order
d) Hazards to be ignored

**8.2** A load-use hazard requires:

a) Only forwarding
b) A pipeline stall (bubble)
c) Branch prediction
d) No special handling

**8.3** WAR (Write After Read) is a:

a) True dependency that always requires stalling
b) Anti-dependency that may not be a problem in in-order pipelines
c) Output dependency
d) Not a real hazard

**8.4** Forwarding can resolve hazards between instructions that are:

a) Any distance apart
b) Adjacent in the pipeline
c) In different pipeline stages
d) Only in the EX stage

**8.5** The minimum number of cycles a load-use hazard causes is:

a) 0 cycles (forwarding resolves it)
b) 1 cycle (one stall)
c) 2 cycles
d) 3 cycles

### Section 9: Control Hazards

**9.1** A control hazard occurs when:

a) Data is not ready
b) A branch instruction changes the program flow
c) Two instructions need the same resource
d) An interrupt occurs

**9.2** The branch penalty in a 5-stage pipeline (if branch is resolved in ID stage) is typically:

a) 0 cycles
b) 1 cycle
c) 2 cycles
d) 3 cycles

**9.3** Branch prediction attempts to:

a) Eliminate branches
b) Predict whether a branch will be taken before it's resolved
c) Speed up instruction fetch
d) Remove control hazards completely

**9.4** A delayed branch:

a) Executes the branch immediately
b) Always executes the instruction after the branch
c) Executes instructions in the delay slot regardless of branch outcome
d) Eliminates the branch penalty

**9.5** Static branch prediction assumes:

a) All branches are taken
b) All branches are not taken
c) A fixed prediction (e.g., backward taken, forward not taken)
d) Dynamic prediction based on history

---

## True/False Questions

**T/F 1.1** The processor must perform five fundamental operations: fetch instruction, interpret instruction, fetch data, process data, and write data.

**T/F 1.2** CPU registers are the fastest but smallest form of memory in the system.

**T/F 1.3** The "Process Data" operation always requires memory access.

**T/F 2.1** The Memory Address Register (MAR) holds the address of the memory location to be accessed.

**T/F 2.2** The Memory Buffer Register (MBR) is bidirectional - it can hold data being read from or written to memory.

**T/F 2.3** The internal CPU data path is separate from the system bus.

**T/F 3.1** User-visible registers can be used by assembly language programmers.

**T/F 3.2** General-purpose registers can only store data, not addresses.

**T/F 3.3** Condition codes are set based on the results of arithmetic and logical operations.

**T/F 3.4** The Program Counter (PC) is a user-visible register that programmers can directly modify.

**T/F 3.5** The Program Status Word (PSW) contains condition codes and processor control information.

**T/F 4.1** Every instruction requires an indirect cycle.

**T/F 4.2** Register-to-register operations are the fastest because they don't require memory access.

**T/F 4.3** During the interrupt cycle, the processor context must be saved to allow resumption.

**T/F 5.1** Pipelining reduces the time to execute a single instruction.

**T/F 5.2** In an ideal pipeline with N stages, the speedup approaches N for long instruction sequences.

**T/F 5.3** Pipeline throughput is the number of instructions completed per unit time.

**T/F 5.4** The first instruction in a pipeline still takes the full pipeline depth to complete.

**T/F 6.1** The MIPS pipeline has 5 stages: IF, ID, EX, MEM, WB.

**T/F 6.2** In MIPS, register write occurs in the WB (Write Back) stage.

**T/F 6.3** All instruction types use all 5 pipeline stages in MIPS.

**T/F 7.1** Structure hazards occur when multiple instructions need the same hardware resource.

**T/F 7.2** Data hazards can always be resolved with forwarding.

**T/F 7.3** Control hazards are caused by branch and jump instructions.

**T/F 8.1** Forwarding allows results to be used before they are written to the register file.

**T/F 8.2** A load-use hazard can be resolved with forwarding alone.

**T/F 8.3** RAW (Read After Write) hazards represent true data dependencies.

**T/F 9.1** Branch prediction can eliminate all branch penalties.

**T/F 9.2** The branch penalty depends on when the branch outcome is determined in the pipeline.

**T/F 9.3** Delayed branches always eliminate the branch penalty.

---

## Short Answer Questions

### Section 1: Processor Organization

**SA 1.1** List and briefly describe the five fundamental operations that a processor must perform.

**SA 1.2** Why does the processor need temporary storage? What is used for this purpose?

**SA 1.3** Explain the memory hierarchy from fastest to slowest, and why this hierarchy exists.

**SA 1.4** Describe what happens during the "Process Data" operation. Where does it occur?

### Section 2: CPU Internal Structure

**SA 2.1** Describe the function of the Memory Address Register (MAR) and Memory Buffer Register (MBR).

**SA 2.2** Explain how data flows during a memory read operation in the CPU.

**SA 2.3** What is the internal CPU data path, and what does it connect?

**SA 2.4** How does the CPU connect to the system bus? What components are involved?

### Section 3: Register Organization

**SA 3.1** Distinguish between user-visible registers and control/status registers. Give examples of each.

**SA 3.2** What are general-purpose registers, and how do they differ from specialized registers?

**SA 3.3** Explain what condition codes (flags) are and how they are used.

**SA 3.4** Describe the Program Status Word (PSW) and what information it contains.

**SA 3.5** What is the difference between data registers and address registers?

### Section 4: Instruction Cycle

**SA 4.1** Describe the four phases of the complete instruction cycle.

**SA 4.2** What happens during the fetch cycle? List the steps.

**SA 4.3** When is an indirect cycle needed? What happens during this cycle?

**SA 4.4** Compare register-to-register operations with memory operations in terms of speed and complexity.

**SA 4.5** What must be saved during the interrupt cycle, and why?

### Section 5: Pipelining Fundamentals

**SA 5.1** Explain the concept of pipelining and how it improves performance.

**SA 5.2** Use the laundry analogy to explain how pipelining works.

**SA 5.3** What is the difference between pipeline latency and pipeline throughput?

**SA 5.4** List and describe the typical stages of an instruction pipeline.

**SA 5.5** Why doesn't pipelining reduce the time to execute a single instruction?

### Section 6: MIPS Pipeline

**SA 6.1** List the five stages of the MIPS pipeline and what happens in each stage.

**SA 6.2** Trace a load word (lw) instruction through the MIPS pipeline stages.

**SA 6.3** Trace a store word (sw) instruction through the MIPS pipeline stages.

**SA 6.4** How does an R-format instruction (like ADD) use the MIPS pipeline stages?

**SA 6.5** What is the ideal CPI (Cycles Per Instruction) for a pipelined processor with no hazards?

### Section 7: Pipeline Hazards

**SA 7.1** What are pipeline hazards? List the three main types.

**SA 7.2** Explain what a structure hazard is and give an example.

**SA 7.3** Explain what a data hazard is and give an example.

**SA 7.4** Explain what a control hazard is and give an example.

**SA 7.5** How do hazards affect pipeline performance?

### Section 8: Data Hazards and Forwarding

**SA 8.1** List and explain the four types of data dependencies (RAW, WAR, WAW, RAR).

**SA 8.2** What is forwarding (bypassing), and how does it resolve data hazards?

**SA 8.3** Explain what a load-use hazard is and why it requires a stall.

**SA 8.4** Draw a diagram showing how forwarding works between pipeline stages.

**SA 8.5** Why can't forwarding always resolve data hazards?

### Section 9: Control Hazards

**SA 9.1** What causes control hazards, and why are they a problem?

**SA 9.2** Explain what branch penalty is and how it's calculated.

**SA 9.3** List and briefly describe at least three solutions to control hazards.

**SA 9.4** How does branch prediction work? Explain static vs. dynamic prediction.

**SA 9.5** What is a delayed branch, and how does it help with control hazards?

---

## Calculation Problems

### Problem 1: Pipeline Performance

**CP 1.1** A non-pipelined processor takes 5 cycles per instruction. If this is converted to a 5-stage pipeline:
- a) What is the ideal speedup?
- b) If there are 1000 instructions, how many cycles does the non-pipelined processor take?
- c) How many cycles does the pipelined processor take (assuming no hazards)?
- d) What is the actual speedup?

**CP 1.2** A 6-stage pipeline processes 10,000 instructions. Each stage takes 1 cycle. Calculate:
- a) Total cycles needed (assuming no hazards)
- b) Time to complete (if clock is 2 GHz)
- c) Throughput in instructions per second

### Problem 2: Pipeline Speedup

**CP 2.1** Compare two processors:
- **Processor A:** Non-pipelined, 4 cycles per instruction, 1 GHz clock
- **Processor B:** 4-stage pipeline, 1 GHz clock, no hazards

For 100 instructions:
- a) Calculate execution time for each processor
- b) Calculate the speedup
- c) What is the ideal CPI for each?

**CP 2.2** A processor is upgraded from non-pipelined (6 cycles/instruction) to a 6-stage pipeline. For a program with 500 instructions:
- a) Calculate cycles for non-pipelined version
- b) Calculate cycles for pipelined version (no hazards)
- c) Calculate speedup
- d) If pipeline has 10% overhead (hazards), what is the actual speedup?

### Problem 3: Pipeline Efficiency

**CP 3.1** A 5-stage pipeline executes a program with the following characteristics:
- Total instructions: 2000
- Data hazards causing stalls: 200 cycles
- Control hazards causing stalls: 150 cycles
- Structure hazards: 50 cycles

Calculate:
- a) Ideal cycles (no hazards)
- b) Actual cycles (with hazards)
- c) Pipeline efficiency
- d) Effective CPI

**CP 3.2** A pipeline has an ideal CPI of 1.0, but actual CPI is 1.5 due to hazards. If the clock is 3 GHz:
- a) What is the ideal throughput?
- b) What is the actual throughput?
- c) What percentage of performance is lost?

### Problem 4: Data Hazards and Stalls

**CP 4.1** In a 5-stage pipeline, a load instruction is followed by an instruction that uses the loaded value. The load-use hazard causes a 1-cycle stall. If 20% of instructions are loads, and 30% of loads cause load-use hazards:
- a) How many stalls occur in 1000 instructions?
- b) What is the CPI increase?
- c) What is the performance impact?

**CP 4.2** Forwarding resolves 80% of data hazards. In a program with 1000 instructions, there are 150 potential data hazards. Calculate:
- a) Number of hazards resolved by forwarding
- b) Number of stalls remaining
- c) CPI impact

### Problem 5: Control Hazards

**CP 5.1** In a 5-stage pipeline, branches are resolved in the ID stage, causing a 1-cycle penalty when taken. If 15% of instructions are branches, and 60% of branches are taken:
- a) How many branch penalties occur in 1000 instructions?
- b) What is the CPI increase?
- c) If branch prediction is 90% accurate, how many penalties remain?

**CP 5.2** A processor uses branch prediction with 85% accuracy. Branches occur 20% of the time, and mispredicted branches cause a 3-cycle penalty. For 1000 instructions:
- a) How many branches?
- b) How many mispredictions?
- c) Total penalty cycles?
- d) CPI impact?

---

## Diagram and Flowchart Questions

### Diagram 1: CPU Internal Structure

**DF 1.1** Draw a block diagram of the CPU internal structure showing:
- ALU, Control Unit, Registers
- MAR, MBR, IR, PC
- Internal data paths
- Connection to system bus

**DF 1.2** Draw a diagram showing data flow during a memory read operation, including all relevant registers and buses.

### Diagram 2: Instruction Cycle

**DF 2.1** Draw a state diagram for the complete instruction cycle showing:
- Fetch, Indirect, Execute, Interrupt states
- Transitions between states
- Conditions for each transition

**DF 2.2** Draw a timing diagram showing the instruction cycle phases and when each register is used.

### Diagram 3: Pipeline Operation

**DF 3.1** Draw a pipeline timing diagram showing 5 instructions executing in a 5-stage pipeline (no hazards).

**DF 3.2** Draw a pipeline diagram showing a data hazard and how forwarding resolves it.

**DF 3.3** Draw a pipeline diagram showing a load-use hazard requiring a stall.

### Diagram 4: MIPS Pipeline

**DF 4.1** Draw the MIPS 5-stage pipeline showing the stages and data flow for an ADD instruction.

**DF 4.2** Draw a pipeline diagram showing a load word (lw) instruction through all 5 stages.

**DF 4.3** Draw a pipeline diagram showing a branch instruction and the control hazard it causes.

### Diagram 5: Hazards and Solutions

**DF 5.1** Draw a diagram showing a RAW (Read After Write) data hazard and how forwarding resolves it.

**DF 5.2** Draw a diagram showing a control hazard from a branch and the pipeline stall/bubble.

**DF 5.3** Draw a diagram comparing pipeline execution with and without hazards.

---

## Problem-Solving Exercises

### Problem 1: Pipeline Design

**PS 1.1** Design a pipeline for a processor that executes instructions in the following stages:
- Fetch: 2 cycles
- Decode: 1 cycle
- Execute: 3 cycles
- Write: 1 cycle

Determine:
- a) How many pipeline stages should be used?
- b) What is the clock cycle time (assuming balanced stages)?
- c) What is the ideal speedup over non-pipelined execution?
- d) What challenges might arise?

**PS 1.2** A processor has instructions that take different amounts of time:
- Simple instructions: 3 cycles
- Complex instructions: 6 cycles
- Memory instructions: 5 cycles

How would you design a pipeline for this processor? Discuss the trade-offs.

### Problem 2: Data Hazard Analysis

**PS 2.1** Analyze the following instruction sequence for data hazards in a 5-stage pipeline:

```
ADD R1, R2, R3    ; R1 = R2 + R3
SUB R4, R1, R5    ; R4 = R1 - R5
AND R6, R4, R7    ; R6 = R4 & R7
OR  R8, R1, R9    ; R8 = R1 | R9
```

For each potential hazard:
- a) Identify the type (RAW, WAR, WAW)
- b) Determine if forwarding can resolve it
- c) Show the pipeline execution with forwarding

**PS 2.2** Consider this sequence with a load instruction:

```
LW  R1, 0(R2)     ; Load from memory
ADD R3, R1, R4   ; Use loaded value
SUB R5, R3, R6   ; Use result
```

- a) Identify all data hazards
- b) Show which require stalls
- c) Draw the pipeline execution showing stalls

### Problem 3: Control Hazard Analysis

**PS 3.1** A 5-stage pipeline resolves branches in the ID stage. For the following code:

```
LOOP: ADD R1, R1, R2
      SUB R3, R3, #1
      BNE R3, R0, LOOP  ; Branch if R3 != 0
      ADD R4, R4, R5
```

Assume the loop executes 10 times:
- a) How many branch penalties occur?
- b) What is the total overhead?
- c) How would branch prediction help?

**PS 3.2** Compare three branch handling strategies for a program with 20% branches (60% taken):
- Strategy A: Always stall (2-cycle penalty)
- Strategy B: Predict not taken (1-cycle penalty when wrong)
- Strategy C: 90% accurate prediction (2-cycle penalty when wrong)

For 1000 instructions, calculate:
- a) Total penalties for each strategy
- b) CPI for each strategy
- c) Which is best?

### Problem 4: Performance Analysis

**PS 4.1** Compare two processors executing the same program:

**Processor X:**
- Non-pipelined
- 4 cycles per instruction
- 2 GHz clock

**Processor Y:**
- 4-stage pipeline
- 1.2 CPI (due to hazards)
- 2 GHz clock

For 1000 instructions:
- a) Calculate execution time for each
- b) Which is faster and by how much?
- c) What would Processor Y's CPI need to be to match Processor X?

**PS 4.2** A pipelined processor has:
- Ideal CPI: 1.0
- Actual CPI: 1.4
- Clock: 3 GHz
- Program: 1 million instructions

Calculate:
- a) Ideal execution time
- b) Actual execution time
- c) Performance loss
- d) If hazards are reduced by 50%, what is the new CPI and execution time?

### Problem 5: Pipeline Optimization

**PS 5.1** A 5-stage pipeline has the following hazard rates:
- Data hazards: 15% of instructions (80% resolved by forwarding)
- Control hazards: 12% of instructions (branch penalty: 2 cycles, 70% taken)
- Structure hazards: 3% of instructions (1-cycle penalty)

For 1000 instructions:
- a) Calculate total stall cycles
- b) Calculate actual CPI
- c) If forwarding is improved to resolve 95% of data hazards, what is the new CPI?

**PS 5.2** A processor designer is considering adding more pipeline stages. Current design:
- 5-stage pipeline, CPI = 1.3, 2 GHz clock

Proposed design:
- 8-stage pipeline, CPI = 1.5 (more hazards), can run at 2.5 GHz

For 1 million instructions:
- a) Calculate execution time for each
- b) Which is faster?
- c) What are the trade-offs?

---

## Conceptual Questions

### Concept 1: Processor Design

**CQ 1.1** Explain why processors need both user-visible and control/status registers. What would happen if all registers were user-visible?

**CQ 1.2** Discuss the trade-offs between having many general-purpose registers vs. specialized registers. What are the advantages and disadvantages of each approach?

**CQ 1.3** Why is the memory hierarchy (registers, cache, main memory) necessary? What would happen if we only had one type of memory?

### Concept 2: Pipelining

**CQ 2.1** Explain why pipelining improves throughput but not the latency of individual instructions. Use examples to illustrate.

**CQ 2.2** What are the limitations of pipelining? Why can't we achieve infinite speedup by adding more pipeline stages?

**CQ 2.3** Compare pipelining to other performance improvement techniques (faster clock, better algorithms). When is pipelining the best choice?

### Concept 3: Hazards

**CQ 3.1** Explain why data hazards represent fundamental limitations of pipelining, not just implementation issues.

**CQ 3.2** Compare the three types of hazards (structure, data, control). Which are easiest to resolve and why?

**CQ 3.3** Discuss the trade-offs between different solutions to control hazards (stalling, prediction, delayed branch). When would you use each?

### Concept 4: Forwarding

**CQ 4.1** Explain how forwarding works and why it's necessary. Why can't we just wait for values to be written to registers?

**CQ 4.2** What are the limitations of forwarding? Why can't it resolve all data hazards?

**CQ 4.3** Describe the hardware complexity required for forwarding. Is the performance gain worth the complexity?

### Concept 5: Modern Processors

**CQ 5.1** How do the concepts in this chapter (pipelining, hazards, forwarding) relate to modern processor features like superscalar execution and out-of-order execution?

**CQ 5.2** Discuss how branch prediction has evolved from simple static prediction to complex dynamic prediction with branch target buffers.

**CQ 5.3** Explain how understanding basic pipelining helps in understanding more advanced processor architectures.

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - d | 1.2 - b | 1.3 - c | 1.4 - b | 1.5 - b

**Section 2:**
2.1 - c | 2.2 - b | 2.3 - b | 2.4 - b | 2.5 - c

**Section 3:**
3.1 - b | 3.2 - c | 3.3 - b | 3.4 - b | 3.5 - b

**Section 4:**
4.1 - b | 4.2 - b | 4.3 - b | 4.4 - b | 4.5 - c

**Section 5:**
5.1 - b | 5.2 - b | 5.3 - a | 5.4 - b | 5.5 - b

**Section 6:**
6.1 - c | 6.2 - b | 6.3 - c | 6.4 - c | 6.5 - a

**Section 7:**
7.1 - d | 7.2 - b | 7.3 - c | 7.4 - c | 7.5 - c

**Section 8:**
8.1 - b | 8.2 - b | 8.3 - b | 8.4 - c | 8.5 - b

**Section 9:**
9.1 - b | 9.2 - c | 9.3 - b | 9.4 - c | 9.5 - c

### True/False Answers

**Section 1:**
1.1 - True | 1.2 - True | 1.3 - False

**Section 2:**
2.1 - True | 2.2 - True | 2.3 - True

**Section 3:**
3.1 - True | 3.2 - False | 3.3 - True | 3.4 - False | 3.5 - True

**Section 4:**
4.1 - False | 4.2 - True | 4.3 - True

**Section 5:**
5.1 - False | 5.2 - True | 5.3 - True | 5.4 - True

**Section 6:**
6.1 - True | 6.2 - True | 6.3 - False

**Section 7:**
7.1 - True | 7.2 - False | 7.3 - True

**Section 8:**
8.1 - True | 8.2 - False | 8.3 - True

**Section 9:**
9.1 - False | 9.2 - True | 9.3 - False

---

*End of Group 2 Exercises*


