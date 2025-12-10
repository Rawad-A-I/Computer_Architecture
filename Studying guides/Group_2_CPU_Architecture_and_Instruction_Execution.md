# Group 2: CPU Architecture & Instruction Execution
## Detailed Study Guide

**Chapter 16: Processor Structure & Function**

---

## Table of Contents
1. [Introduction: Processor Organization](#introduction-processor-organization)
2. [CPU Internal Structure](#cpu-internal-structure)
3. [Register Organization](#register-organization)
4. [Instruction Cycle Details](#instruction-cycle-details)
5. [Pipelining Fundamentals](#pipelining-fundamentals)
6. [MIPS Pipeline Case Study](#mips-pipeline-case-study)
7. [Pipeline Hazards](#pipeline-hazards)
8. [Data Hazards and Forwarding](#data-hazards-and-forwarding)
9. [Control Hazards](#control-hazards)
10. [Key Concepts Summary](#key-concepts-summary)
11. [Practice Problems and Examples](#practice-problems-and-examples)

---

## Introduction: Processor Organization

### Processor Requirements

A processor must perform five fundamental operations:

#### 1. Fetch Instruction
- **Purpose:** Read the next instruction to execute
- **Source:** Memory (register, cache, or main memory)
- **Process:**
  - Read instruction from memory location
  - Load instruction into processor
  - Prepare for execution

#### 2. Interpret Instruction
- **Purpose:** Determine what action the instruction requires
- **Process:**
  - Decode the instruction opcode
  - Identify operation type (ADD, SUB, LOAD, STORE, etc.)
  - Determine operand locations
  - Generate control signals

#### 3. Fetch Data
- **Purpose:** Retrieve operands needed for instruction execution
- **Sources:**
  - Memory (main memory or cache)
  - I/O modules (for I/O operations)
  - Registers (fastest source)
- **Note:** Not all instructions require data fetch (some operate on registers only)

#### 4. Process Data
- **Purpose:** Perform the actual computation
- **Operations:**
  - **Arithmetic:** ADD, SUBTRACT, MULTIPLY, DIVIDE
  - **Logical:** AND, OR, NOT, XOR, SHIFT, ROTATE
  - **Comparison:** Compare values, set condition codes
- **Location:** Typically performed in ALU (Arithmetic Logic Unit)

#### 5. Write Data
- **Purpose:** Store results of computation
- **Destinations:**
  - Memory (main memory or cache)
  - I/O modules (for output operations)
  - Registers (fastest destination)

### Internal Memory Requirement

**Key Point:** The processor needs **temporary storage** for:
- Instructions being executed
- Operands being processed
- Intermediate results
- Control information

**Solution:** **Registers** - fast, small memory locations within the CPU.

**Memory Hierarchy (Fastest to Slowest):**
1. **CPU Registers** (fastest, smallest, most expensive)
2. **Cache Memory** (very fast, small, expensive)
3. **Main Memory** (fast, larger, moderate cost)
4. **Secondary Storage** (slow, very large, cheap)

---

## CPU Internal Structure

### CPU-System Bus Connection

The CPU connects to the system bus, which provides:
- **Data Bus:** For transferring data and instructions
- **Address Bus:** For specifying memory/I/O addresses
- **Control Bus:** For control and timing signals

**Connection Points:**
- CPU reads instructions from memory via bus
- CPU reads/writes data via bus
- CPU sends control signals via bus
- CPU receives interrupt signals via bus

### Internal CPU Organization

**Key Components:**

```
┌─────────────────────────────────────┐
│           CPU INTERNAL              │
│                                     │
│  ┌──────────┐      ┌──────────┐   │
│  │ Control  │      │   ALU    │   │
│  │   Unit   │◄────►│          │   │
│  └────┬─────┘      └────┬─────┘   │
│       │                 │          │
│  ┌────┴─────────────────┴─────┐   │
│  │      Register File          │   │
│  │  (User-Visible Registers)    │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Control & Status Registers  │   │
│  │  (PC, IR, MAR, MBR, PSW)     │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Data Flow:**
1. **Control Unit:** Generates control signals based on instruction
2. **ALU:** Performs arithmetic/logical operations
3. **Registers:** Store operands and results
4. **Internal Buses:** Connect components within CPU

**Key Insight:** The CPU is a complex system with multiple components working together. Understanding how these components interact is crucial.

---

## Register Organization

### Register Hierarchy

Registers are the **fastest level** of the memory hierarchy, located directly within the CPU.

**Purpose:**
- Minimize main memory references
- Store frequently accessed data
- Hold operands and results
- Control processor operation

### Two Categories of Registers

#### 1. User-Visible Registers

**Definition:** Registers that can be referenced by machine language or assembly language programs.

**Purpose:** Enable programmers to optimize code by minimizing memory accesses.

**Categories:**

##### A. General-Purpose Registers
- **Function:** Can be assigned to various functions by the programmer
- **Uses:**
  - Hold operands for arithmetic/logical operations
  - Hold addresses for memory operations
  - Hold intermediate results
  - Hold function parameters and return values
- **Examples:**
  - x86: EAX, EBX, ECX, EDX (and more)
  - MIPS: $0-$31 (32 general-purpose registers)
  - ARM: R0-R15 (16 general-purpose registers)

**Advantages:**
- Flexibility: Can be used for any purpose
- Efficiency: Fast access, no memory references needed

##### B. Data Registers
- **Function:** Used only to hold data
- **Restriction:** Cannot be used in address calculations
- **Use Case:** Specialized registers for data operations
- **Example:** Some architectures separate data registers from address registers

##### C. Address Registers
- **Function:** Used for address calculations and memory addressing
- **Types:**
  - **Segment Pointers:** Hold segment base addresses (x86 architecture)
  - **Index Registers:** Used in indexed addressing modes
  - **Stack Pointer (SP):** Points to top of stack
  - **Base Pointer (BP):** Points to base of stack frame
- **Examples:**
  - x86: ESI (source index), EDI (destination index), ESP (stack pointer), EBP (base pointer)
  - MIPS: $sp (stack pointer), $fp (frame pointer)

##### D. Condition Codes (Flags)
- **Function:** Bits set by processor hardware as result of operations
- **Common Flags:**
  - **Zero (Z):** Result is zero
  - **Sign (S/N):** Result is negative
  - **Carry (C):** Arithmetic carry occurred
  - **Overflow (V):** Arithmetic overflow occurred
  - **Parity (P):** Even/odd parity
- **Use:** Control conditional branches and program flow
- **Example:**
  ```
  ADD R1, R2, R3    # R1 = R2 + R3
  # Processor automatically sets:
  # Z flag = 1 if R1 == 0
  # N flag = 1 if R1 < 0
  # C flag = 1 if addition produced carry
  # V flag = 1 if signed overflow occurred
  ```

#### 2. Control and Status Registers

**Definition:** Registers used by the control unit and operating system to control processor operation.

**Purpose:** Manage instruction execution and system state.

**Essential Registers:**

##### A. Program Counter (PC)
- **Function:** Contains the address of the next instruction to fetch
- **Behavior:**
  - Incremented after each instruction fetch
  - Updated on branches, jumps, and subroutine calls
  - Saved on interrupts, restored on return
- **Size:** Typically matches address bus width
- **Example:**
  ```
  PC = 1000  → Fetch instruction from memory[1000]
  PC = 1004  → Fetch instruction from memory[1004] (next instruction)
  ```

##### B. Instruction Register (IR)
- **Function:** Contains the instruction most recently fetched
- **Behavior:**
  - Loaded during fetch cycle
  - Used by control unit for decoding
  - Holds instruction until execution completes
- **Size:** Matches instruction width (typically 32 or 64 bits)

##### C. Memory Address Register (MAR)
- **Function:** Contains the address of a location in memory
- **Use:**
  - Holds address for memory read operations
  - Holds address for memory write operations
  - Connected to address bus
- **Size:** Matches address bus width

##### D. Memory Buffer Register (MBR)
- **Function:** Contains data to be written to memory or data most recently read
- **Also Known As:** Memory Data Register (MDR)
- **Use:**
  - Holds data being written to memory
  - Holds data read from memory
  - Connected to data bus
- **Size:** Matches data bus width

**Data Flow Example (Memory Read):**
```
1. CPU places address in MAR
2. CPU asserts Read signal
3. Memory places data in MBR
4. CPU reads data from MBR
```

**Data Flow Example (Memory Write):**
```
1. CPU places address in MAR
2. CPU places data in MBR
3. CPU asserts Write signal
4. Memory reads data from MBR and writes to address in MAR
```

### Program Status Word (PSW)

**Definition:** A register (or set of registers) containing condition codes plus other status information.

**Common Fields/Flags:**

1. **Sign (S/N):**
   - Set when result is negative
   - Used for signed comparisons

2. **Zero (Z):**
   - Set when result is zero
   - Used for equality comparisons

3. **Carry (C):**
   - Set when arithmetic operation produces carry
   - Used for unsigned arithmetic and multi-precision operations

4. **Equal:**
   - Set when two values are equal
   - Used for comparisons

5. **Overflow (V):**
   - Set when signed arithmetic overflow occurs
   - Used for error detection in signed arithmetic

6. **Interrupt Enable/Disable:**
   - Controls whether interrupts are processed
   - Critical for interrupt handling

7. **Supervisor (S):**
   - Indicates processor mode (user vs. supervisor/kernel)
   - Controls access to privileged instructions

**PSW Example:**
```
PSW = [S|Z|C|E|V|I|M|...]
      │ │ │ │ │ │ │
      │ │ │ │ │ │ └─ Mode (Supervisor/User)
      │ │ │ │ │ └─── Interrupt Enable
      │ │ │ │ └───── Overflow
      │ │ │ └─────── Equal
      │ │ └───────── Carry
      │ └─────────── Zero
      └───────────── Sign
```

**Usage:**
- Condition codes set automatically by ALU
- Used by conditional branch instructions
- Saved/restored on context switches
- Critical for program flow control

---

## Instruction Cycle Details

### Complete Instruction Cycle

The instruction cycle consists of multiple phases, each with specific data flow patterns.

#### Phase 1: Fetch Cycle

**Purpose:** Retrieve instruction from memory.

**Steps:**
1. **PC → MAR:** Transfer program counter to memory address register
2. **Assert Read:** Signal memory to read
3. **Memory → MBR:** Memory places instruction in memory buffer register
4. **MBR → IR:** Transfer instruction to instruction register
5. **Increment PC:** PC = PC + instruction_size

**Data Flow:**
```
PC ──► MAR ──► Address Bus ──► Memory
                                    │
                                    ▼
MBR ◄── Data Bus ◄── Memory
  │
  ▼
 IR
```

**Timing:**
- Typically takes 1-3 clock cycles
- Depends on memory speed and cache hit/miss

#### Phase 2: Indirect Cycle

**Purpose:** Handle indirect addressing (when instruction specifies indirect address).

**Steps:**
1. **IR → MAR:** Address field of instruction to MAR
2. **Assert Read:** Read indirect address from memory
3. **Memory → MBR:** Get actual address
4. **MBR → MAR:** Use actual address for operand fetch

**When Used:**
- Indirect addressing mode
- Pointer dereferencing
- Array indexing through pointers

**Example:**
```
Instruction: ADD *R1, R2
# *R1 means "value at address in R1"

Indirect Cycle:
1. Read address from R1 → MAR
2. Read value at that address → MBR
3. Use MBR as operand for ADD
```

#### Phase 3: Execute Cycle

**Purpose:** Perform the actual operation.

**Types of Execute Cycles:**

##### A. Register-to-Register Operations
```
Example: ADD R1, R2, R3
1. Read R2 and R3 from register file
2. ALU performs R2 + R3
3. Write result to R1
```

##### B. Memory Read Operations
```
Example: LOAD R1, [1000]
1. Address 1000 → MAR
2. Assert Read
3. Memory → MBR
4. MBR → R1
```

##### C. Memory Write Operations
```
Example: STORE R1, [1000]
1. R1 → MBR
2. Address 1000 → MAR
3. Assert Write
4. Memory reads from MBR
```

##### D. Arithmetic/Logical Operations
```
Example: ADD R1, R2, R3
1. R2, R3 → ALU inputs
2. ALU performs addition
3. ALU output → R1
4. Update condition codes (PSW)
```

##### E. Control Transfer Operations
```
Example: BRANCH IF ZERO, target
1. Check Z flag in PSW
2. If Z=1: PC = target
3. If Z=0: PC = PC + 1 (continue)
```

#### Phase 4: Interrupt Cycle

**Purpose:** Handle interrupts (covered in detail in Group 1).

**Steps:**
1. **Save Context:** PC, PSW, registers → stack or special registers
2. **Disable Interrupts:** Set interrupt disable flag
3. **Load Handler Address:** Interrupt vector → PC
4. **Jump to Handler:** Begin executing interrupt service routine

**Data Flow:**
```
Current PC ──► Save to stack
Current PSW ──► Save to stack
Registers ──► Save to stack
Interrupt Vector ──► PC
```

### Instruction Cycle State Diagram

**States:**
```
START
  │
  ▼
FETCH ──► [Indirect?] ──► EXECUTE ──► [Interrupt?] ──► FETCH
           │ Yes                            │ Yes
           │                                │
           ▼                                ▼
      INDIRECT                          INTERRUPT
           │                                │
           └──────── EXECUTE ───────────────┘
```

**Key Points:**
- Fetch always occurs first
- Indirect cycle is optional (only for indirect addressing)
- Execute always occurs (but varies greatly)
- Interrupt check occurs after execute
- Cycle repeats indefinitely

---

## Pipelining Fundamentals

### The Problem: Sequential Execution

**Traditional Approach (Non-Pipelined):**
```
Instruction 1: [Fetch] [Decode] [Execute] [Write] ──► Complete
Instruction 2:         [Fetch] [Decode] [Execute] [Write] ──► Complete
Instruction 3:                 [Fetch] [Decode] [Execute] [Write] ──► Complete
```

**Time per instruction:** Sum of all stages
**Throughput:** 1 instruction per (sum of stages)

**Example:**
- Fetch: 200ps
- Decode: 100ps
- Execute: 200ps
- Write: 100ps
- **Total: 600ps per instruction**

### The Solution: Pipelining

**Concept:** Overlap execution of multiple instructions.

**Pipelined Approach:**
```
Time:    1     2     3     4     5     6     7     8
Inst 1: [F]   [D]   [E]   [W]
Inst 2:       [F]   [D]   [E]   [W]
Inst 3:             [F]   [D]   [E]   [W]
Inst 4:                   [F]   [D]   [E]   [W]
```

**Key Insight:** While Instruction 1 is in Execute stage, Instruction 2 can be in Decode stage, and Instruction 3 can be in Fetch stage.

**Benefits:**
- **Throughput:** Multiple instructions in pipeline simultaneously
- **Efficiency:** Better resource utilization
- **Performance:** Significant speedup (ideally equal to number of stages)

### Pipelining Analogy: Laundry

**Non-Pipelined Laundry:**
```
Load 1: [Wash 30min] [Dry 30min] [Fold 20min] = 80min
Load 2:                              [Wash 30min] [Dry 30min] [Fold 20min] = 80min
Load 3:                                                      [Wash 30min] [Dry 30min] [Fold 20min] = 80min
Total: 240 minutes for 3 loads
```

**Pipelined Laundry:**
```
Time:    0-30   30-60   60-80   80-110  110-140  140-160
Load 1: [Wash] [Dry]   [Fold]
Load 2:        [Wash] [Dry]   [Fold]
Load 3:               [Wash] [Dry]   [Fold]
Total: 160 minutes for 3 loads
Speedup: 240/160 = 1.5x
```

**With 4 Loads:**
- Non-pipelined: 320 minutes
- Pipelined: 200 minutes (30 + 30 + 20 + 3×30)
- **Speedup: 320/200 = 1.6x**

**Ideal Speedup:** If all stages take equal time and there's enough work, speedup = number of stages.

### Instruction Pipeline Stages

A typical instruction pipeline divides instruction execution into multiple stages:

#### Stage 1: Fetch Instruction (FI)
- **Function:** Read the next expected instruction into a buffer
- **Operations:**
  - PC → MAR
  - Assert Read
  - Memory → MBR → Instruction Buffer
  - Increment PC
- **Time:** Depends on memory/cache access time

#### Stage 2: Decode Instruction (DI)
- **Function:** Determine the opcode and operand specifiers
- **Operations:**
  - Extract opcode from instruction
  - Identify instruction type
  - Determine operand locations
  - Generate control signals
- **Time:** Typically fast (register access)

#### Stage 3: Calculate Operands (CO)
- **Function:** Calculate the effective address of each source operand
- **Operations:**
  - Handle addressing modes:
    - Immediate: Use constant from instruction
    - Direct: Use address from instruction
    - Indirect: Read address, then use it
    - Displacement: Base register + offset
    - Register indirect: Use register value as address
- **Time:** Depends on addressing mode complexity

#### Stage 4: Fetch Operands (FO)
- **Function:** Fetch each operand from memory (if needed)
- **Operations:**
  - Read operands from memory
  - Read operands from registers
  - Note: Register operands don't require memory access
- **Time:** Depends on operand location (register = fast, memory = slow)

#### Stage 5: Execute Instruction (EI)
- **Function:** Perform the indicated operation
- **Operations:**
  - Arithmetic operations in ALU
  - Logical operations in ALU
  - Address calculations
  - Comparisons
- **Time:** Depends on operation complexity

#### Stage 6: Write Operand (WO)
- **Function:** Store the result in memory or register
- **Operations:**
  - Write result to destination register
  - Write result to memory (if needed)
  - Update condition codes
- **Time:** Depends on destination (register = fast, memory = slow)

### Pipeline Performance Characteristics

**Key Metrics:**

1. **Throughput:** Instructions completed per unit time
   - **Non-pipelined:** 1 instruction per (sum of all stages)
   - **Pipelined:** 1 instruction per (longest stage time)

2. **Latency:** Time from start to completion of single instruction
   - **Non-pipelined:** Sum of all stages
   - **Pipelined:** Still sum of all stages (not reduced!)

3. **Speedup:** Ratio of non-pipelined time to pipelined time
   - **Ideal:** Number of stages (if stages are balanced)
   - **Actual:** Less than ideal due to hazards and stalls

**Critical Insight:** Pipelining improves **throughput** (how many instructions per second), but **not latency** (how long each instruction takes).

---

## MIPS Pipeline Case Study

### MIPS Pipeline Overview

**Architecture:** 5-stage pipeline, one step per stage.

**Stages:**

#### Stage 1: IF (Instruction Fetch)
- Fetch instruction from memory
- Update PC
- **Time:** 200ps (memory access)

#### Stage 2: ID (Instruction Decode & Register Read)
- Decode instruction
- Read register operands
- **Time:** 100ps (register access)

#### Stage 3: EX (Execute)
- Perform ALU operation
- Calculate address (for load/store)
- **Time:** 200ps (ALU operation)

#### Stage 4: MEM (Memory Access)
- Access memory operand (for load/store only)
- **Time:** 200ps (memory access)
- **Note:** R-format and branch instructions skip this stage

#### Stage 5: WB (Write Back)
- Write result back to register
- **Time:** 100ps (register write)

### Instruction Types and Pipeline Usage

#### Load Word (lw)
```
lw $t0, 4($s1)  # $t0 = memory[$s1 + 4]

IF: Fetch instruction (200ps)
ID: Decode, read $s1 (100ps)
EX: Calculate address $s1 + 4 (200ps)
MEM: Read memory[$s1 + 4] (200ps)
WB: Write to $t0 (100ps)
Total: 800ps
```

#### Store Word (sw)
```
sw $t0, 4($s1)  # memory[$s1 + 4] = $t0

IF: Fetch instruction (200ps)
ID: Decode, read $s1 and $t0 (100ps)
EX: Calculate address $s1 + 4 (200ps)
MEM: Write memory[$s1 + 4] (200ps)
WB: (no write back for store)
Total: 700ps (no WB stage needed)
```

#### R-Format (Register Operations)
```
add $s0, $t0, $t1  # $s0 = $t0 + $t1

IF: Fetch instruction (200ps)
ID: Decode, read $t0 and $t1 (100ps)
EX: ALU operation $t0 + $t1 (200ps)
MEM: (no memory access)
WB: Write to $s0 (100ps)
Total: 600ps
```

#### Branch (beq)
```
beq $t0, $t1, label  # if $t0 == $t1, branch to label

IF: Fetch instruction (200ps)
ID: Decode, read $t0 and $t1 (100ps)
EX: Compare $t0 and $t1, calculate target address (200ps)
MEM: (no memory access)
WB: (no write back)
Total: 500ps
```

### Pipeline Clock Cycle

**Critical Constraint:** Pipeline clock cycle is limited by the **slowest stage**.

**Example:**
- IF: 200ps
- ID: 100ps
- EX: 200ps
- MEM: 200ps
- WB: 100ps
- **Clock cycle = 200ps** (slowest stage)

**Implication:** All stages must complete within one clock cycle, even if they don't need the full time.

**Wasted Time:**
- ID stage completes in 100ps but must wait 200ps
- WB stage completes in 100ps but must wait 200ps
- **Trade-off:** Simpler design vs. efficiency

### Pipeline Throughput

**Non-Pipelined:**
- Longest instruction: 800ps (lw)
- Throughput: 1 instruction per 800ps = 1.25 × 10^9 instructions/second

**Pipelined:**
- Clock cycle: 200ps (slowest stage)
- Throughput: 1 instruction per 200ps = 5 × 10^9 instructions/second
- **Speedup: 4x** (close to ideal 5x for 5 stages)

**Key Point:** Even though some instructions take 800ps to complete, the pipeline can start a new instruction every 200ps.

### Pipeline Timing Diagram

**Non-Pipelined Execution:**
```
Time:    0-800   800-1500  1500-2100  2100-2600
Inst 1: [lw]    
Inst 2:         [sw]
Inst 3:                 [add]
Inst 4:                         [beq]
```

**Pipelined Execution:**
```
Time:    0-200   200-400   400-600   600-800   800-1000  1000-1200
Inst 1: [IF]    [ID]      [EX]      [MEM]     [WB]
Inst 2:         [IF]      [ID]      [EX]      [MEM]     [WB]
Inst 3:                   [IF]      [ID]      [EX]      [MEM]     [WB]
Inst 4:                             [IF]      [ID]      [EX]      [MEM]     [WB]
```

**Observation:** At time 800ps, Instruction 1 completes, but Instructions 2, 3, and 4 are already in progress.

---

## Pipeline Hazards

### What are Hazards?

**Definition:** Situations that prevent starting the next instruction in the next cycle.

**Impact:** Cause pipeline stalls (bubbles), reducing performance.

**Types:**
1. **Structure Hazards:** Resource conflicts
2. **Data Hazards:** Data dependencies
3. **Control Hazards:** Branch dependencies

### Structure Hazards

**Definition:** A required resource is busy when needed.

**Common Cause:** Multiple instructions need the same hardware resource simultaneously.

#### Example: Single Memory for Instructions and Data

**Problem:**
```
Cycle 1: Instruction 1 in MEM stage (accessing data memory)
Cycle 1: Instruction 2 in IF stage (needs to fetch instruction)
         └─► CONFLICT! Both need memory access
```

**Solution Options:**

1. **Stall Pipeline:**
   ```
   Inst 1: [IF] [ID] [EX] [MEM] [WB]
   Inst 2: [IF] [stall] [stall] [IF] [ID] [EX] [MEM] [WB]
   ```
   - Insert "bubble" (NOP - No Operation)
   - Performance penalty

2. **Separate Instruction and Data Memory:**
   - Harvard Architecture
   - No conflict possible
   - More expensive

3. **Cache with Separate I-Cache and D-Cache:**
   - Instruction cache for IF stage
   - Data cache for MEM stage
   - Modern solution

**Other Structure Hazards:**
- Multiple instructions needing ALU simultaneously
- Register file port conflicts (need multiple read/write ports)

### Data Hazards

**Definition:** Attempt to use data before it's ready.

**Cause:** Instruction depends on result of previous instruction that hasn't completed yet.

#### Example:
```mips
add $s0, $t0, $t1    # I1: $s0 = $t0 + $t1
sub $t2, $s0, $t3    # I2: $t2 = $s0 - $t3 (depends on I1)
```

**Pipeline Timeline:**
```
Time:    1     2     3     4     5     6
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Needs $s0 here, but I1 writes in cycle 5!
```

**Problem:** I2 needs $s0 in cycle 3 (ID stage), but I1 doesn't write $s0 until cycle 5 (WB stage).

**Solutions:**
1. **Stall Pipeline:** Insert bubbles until data is ready
2. **Forwarding (Bypassing):** Use result directly from EX/MEM stage
3. **Instruction Reordering:** Compiler reorders instructions to avoid hazard

### Control Hazards

**Definition:** Deciding on control action depends on previous instruction.

**Cause:** Branch instructions determine which instruction to fetch next, but decision isn't known until later in pipeline.

#### Example:
```mips
beq $t0, $t1, label  # Branch if $t0 == $t1
add $s0, $s1, $s2    # Next instruction (may or may not execute)
```

**Problem:**
```
Time:    1     2     3     4     5
beq:    [IF]  [ID]  [EX]  [MEM] [WB]
add:          [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Branch decision made here
                    But we already fetched 'add'!
```

**Issue:** We don't know if branch will be taken until EX stage, but we already fetched the next instruction.

**Solutions:**
1. **Stall on Branch:** Wait until branch decision is known
2. **Branch Prediction:** Predict whether branch will be taken
3. **Delayed Branch:** Always execute instruction after branch
4. **Multiple Streams:** Fetch from both possible paths
5. **Prefetch Branch Target:** Prefetch target instruction

---

## Data Hazards and Forwarding

### Types of Data Hazards

#### 1. RAW (Read After Write) - True Dependency

**Definition:** Instruction 2 tries to read an operand before Instruction 1 writes to it.

**Example:**
```mips
I1: add $s0, $t0, $t1    # I1 writes to $s0
I2: sub $t2, $s0, $t3    # I2 reads from $s0
```

**Timeline:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► $s0 written here
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Needs $s0 here (too early!)
```

**Frequency:** Extremely common - most data dependencies are RAW.

**Solution:** Forwarding (bypassing) - use result from EX/MEM stage directly.

#### 2. WAR (Write After Read) - Anti-Dependency

**Definition:** Instruction 2 tries to write to a destination before Instruction 1 reads from it.

**Example:**
```mips
I1: add $t4, $t1, $t5    # I1 reads from $t5
I2: add $t5, $t1, $t2    # I2 writes to $t5
```

**Timeline:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Reads $t5 here
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► Writes $t5 here
```

**Frequency:** Uncommon/impossible in simple in-order pipelines.

**Why:** In simple pipelines, instructions execute in order, so I1 always reads before I2 writes.

**Occurs In:** Out-of-order execution, superscalar processors.

#### 3. WAW (Write After Write) - Output Dependency

**Definition:** Instruction 2 tries to write to an operand before Instruction 1 writes to it.

**Example:**
```mips
I1: add $s0, $t0, $t1    # I1 writes to $s0
I2: add $s0, $t2, $t3    # I2 writes to $s0
```

**Timeline:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► Writes $s0 here
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                                    └─► Writes $s0 here (must wait)
```

**Frequency:** Possible in simple pipelines, but not in the very simple pipeline we're assuming.

**Solution:** Delay I2's write until I1 completes.

#### 4. RAR (Read After Read) - Not a Hazard

**Definition:** Both instructions read from the same register.

**Example:**
```mips
I1: add $t1, $t2, $t3    # I1 reads from $t2
I2: add $t5, $t4, $t2    # I2 reads from $t2
```

**Why Not a Hazard:** Reading doesn't change the register value. Order doesn't matter.

**Timeline:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Reads $t2
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Reads $t2 (no problem!)
```

### Forwarding (Bypassing)

**Concept:** Use result directly from pipeline stage where it's computed, without waiting for it to be written to register.

**Problem Without Forwarding:**
```
Time:    1     2     3     4     5     6     7     8
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► $s0 available here
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Needs $s0, must wait (stall)
                    [stall] [stall] [EX] [MEM] [WB]
```

**Solution With Forwarding:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► $s0 computed here
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Forward $s0 directly from I1's EX stage
```

**Implementation:**
- **Extra Connections:** Datapath connections from EX/MEM stage to EX stage inputs
- **Forwarding Unit:** Detects data hazards and selects forwarded data
- **Multiplexers:** Route forwarded data to ALU inputs

**Forwarding Paths:**
1. **EX/MEM → EX:** Forward result from previous instruction's EX stage
2. **MEM/WB → EX:** Forward result from two instructions ago
3. **EX/MEM → MEM:** Forward result for store instructions

**Example:**
```mips
add $s0, $t0, $t1    # I1
sub $t2, $s0, $t3    # I2: needs $s0
```

**With Forwarding:**
- I1 computes $s0 in EX stage (cycle 3)
- I2 needs $s0 in EX stage (cycle 4)
- Forwarding unit detects hazard
- Routes I1's EX output directly to I2's EX input
- **No stall needed!**

**Limitations:**
- Forwarding can't help if data isn't computed yet
- Load instructions: Data only available after MEM stage
- May still need 1-cycle stall for load-use hazards

### Load-Use Hazard

**Special Case:** Load instruction followed by instruction using loaded value.

**Example:**
```mips
lw $s0, 0($t0)       # I1: Load from memory
add $t2, $s0, $t1    # I2: Use loaded value
```

**Timeline:**
```
Time:    1     2     3     4     5     6     7
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► $s0 available here (after memory read)
I2:           [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Needs $s0 here (too early!)
```

**Problem:** $s0 only available after MEM stage, but I2 needs it in EX stage.

**Solution:** **1-cycle stall** + forwarding
```
Time:    1     2     3     4     5     6     7     8
I1:     [IF]  [ID]  [EX]  [MEM] [WB]
                              └─► $s0 available
I2:           [IF]  [ID]  [stall] [EX] [MEM] [WB]
                                    └─► Forward $s0 from I1's MEM stage
```

**Key Point:** Even with forwarding, load-use hazards require at least 1 stall cycle.

---

## Control Hazards

### The Branch Problem

**Issue:** Branch instruction determines which instruction to fetch next, but decision isn't known until later in pipeline.

**Example:**
```mips
beq $t0, $t1, label  # Branch if $t0 == $t1
add $s0, $s1, $s2    # Next instruction (may be wrong!)
sub $t2, $t3, $t4    # Instruction at label (may be correct)
```

**Pipeline Timeline:**
```
Time:    1     2     3     4     5
beq:    [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Branch decision made here
add:          [IF]  [ID]  [EX]  [MEM] [WB]
                    └─► Already fetched, but may be wrong!
```

**Problem:**
- Branch decision (taken/not taken) known in EX stage
- But we already fetched next instruction in IF stage
- If branch is taken, we fetched wrong instruction
- Must flush pipeline and fetch correct instruction

### Branch Penalty

**Cost:** 2-3 cycles wasted when branch is taken.

**Why:**
- Branch decision in EX stage (cycle 3)
- Wrong instruction already in pipeline (cycles 2-3)
- Must flush and fetch correct instruction
- **Total penalty: 2 cycles minimum**

### Solutions to Control Hazards

#### 1. Stall on Branch

**Approach:** Don't fetch next instruction until branch decision is known.

**Implementation:**
```
beq:    [IF]  [ID]  [EX]  [MEM] [WB]
next:   [IF]  [stall] [stall] [IF] [ID] [EX] [MEM] [WB]
                    └─► Wait for branch decision
```

**Performance:** 2-cycle penalty for every branch (taken or not).

**Advantage:** Simple, always correct.

**Disadvantage:** High performance penalty.

#### 2. Branch Prediction

**Approach:** Predict whether branch will be taken, fetch predicted instruction.

**Predictions:**
- **Always Not Taken:** Assume branch never taken
  - If correct: No penalty
  - If wrong: 2-cycle penalty
- **Always Taken:** Assume branch always taken
  - Fetch target immediately
  - If correct: No penalty
  - If wrong: 2-cycle penalty
- **Dynamic Prediction:** Use history to predict
  - Branch prediction buffer/cache
  - Tracks previous branch behavior
  - More accurate predictions

**Performance:** 
- Correct prediction: No penalty
- Wrong prediction: 2-cycle penalty
- **Accuracy matters!**

#### 3. Delayed Branch

**Approach:** Always execute instruction immediately after branch.

**Example:**
```mips
beq $t0, $t1, label
add $s0, $s1, $s2    # Always executes (delay slot)
# If branch taken, jump to label
# If branch not taken, continue normally
```

**Compiler's Job:** Fill delay slot with useful instruction (or NOP if none available).

**Performance:** No penalty if delay slot filled usefully.

**Disadvantage:** Complicates compiler and instruction set.

#### 4. Multiple Streams

**Approach:** Fetch from both possible paths (taken and not taken).

**Implementation:**
- Fetch next sequential instruction
- Also fetch branch target instruction
- Execute both until branch decision known
- Discard wrong path

**Disadvantage:** Wastes resources, complex.

#### 5. Prefetch Branch Target

**Approach:** Prefetch instruction at branch target while branch executes.

**Implementation:**
- When branch detected, start fetching target
- If branch taken, target already fetched
- If branch not taken, discard prefetched instruction

**Performance:** Reduces penalty if branch taken.

#### 6. Loop Buffer

**Approach:** Small buffer holding recently fetched instructions.

**Use Case:** Small loops that fit in buffer.

**Benefit:** If loop branches back, instructions already in buffer (no fetch needed).

### Modern Branch Prediction

**Techniques:**
1. **1-bit Predictor:** Remember last outcome
2. **2-bit Predictor:** State machine (strong/weak taken/not taken)
3. **Branch Target Buffer (BTB):** Cache branch targets
4. **Return Address Stack:** Predict return addresses
5. **Correlation-based:** Use history of other branches

**Performance:** Modern processors achieve >95% branch prediction accuracy.

---

## Key Concepts Summary

### Processor Organization Principles

1. **Five Fundamental Operations:**
   - Fetch, Interpret, Fetch Data, Process Data, Write Data
   - All instructions follow this pattern (with variations)

2. **Register Hierarchy:**
   - Fastest memory level
   - Minimize main memory accesses
   - Two categories: User-visible and Control/Status

3. **Instruction Cycle:**
   - Fetch → (Indirect) → Execute → (Interrupt)
   - Each phase has specific data flow patterns

### Pipelining Fundamentals

1. **Goal:** Improve throughput, not latency
2. **Method:** Overlap execution of multiple instructions
3. **Ideal Speedup:** Equal to number of stages (if balanced)
4. **Clock Cycle:** Limited by slowest stage

### Pipeline Hazards

1. **Structure Hazards:**
   - Resource conflicts
   - Solved by: Separate resources, stalling

2. **Data Hazards:**
   - Data dependencies
   - Solved by: Forwarding, stalling, instruction reordering
   - Types: RAW (common), WAR (rare), WAW (possible), RAR (not a hazard)

3. **Control Hazards:**
   - Branch dependencies
   - Solved by: Prediction, stalling, delayed branch
   - Penalty: 2-3 cycles typically

### Performance Optimization

1. **Forwarding:** Eliminates most data hazard stalls
2. **Branch Prediction:** Reduces control hazard penalty
3. **Balanced Pipeline:** Minimize wasted time in stages
4. **Hazard Detection:** Identify and handle hazards efficiently

---

## Practice Problems and Examples

### Problem 1: Register Organization

**Question:** What is the difference between user-visible registers and control/status registers?

**Answer:**
- **User-Visible Registers:** Can be directly accessed by programs (assembly/machine code). Used for data operations, addresses, condition codes. Examples: General-purpose registers, stack pointer.

- **Control/Status Registers:** Used internally by processor and OS. Not directly accessible to user programs. Control instruction execution. Examples: PC, IR, MAR, MBR, PSW.

### Problem 2: Pipeline Speedup

**Question:** A 5-stage pipeline has stage times: 200ps, 150ps, 200ps, 180ps, 150ps. What is the clock cycle time and ideal speedup?

**Solution:**
- Clock cycle = slowest stage = 200ps
- Non-pipelined time = 200 + 150 + 200 + 180 + 150 = 880ps
- Pipelined throughput = 1 instruction per 200ps
- Ideal speedup = 880/200 = 4.4x
- Maximum possible speedup = 5x (number of stages)

**Answer:** Clock cycle = 200ps, Ideal speedup ≈ 4.4x

### Problem 3: Data Hazard Detection

**Question:** Identify the data hazard in this code:
```mips
add $s0, $t0, $t1
sub $t2, $s0, $t3
mul $s1, $s0, $t4
```

**Answer:**
- **RAW Hazard 1:** `sub` reads $s0 before `add` writes it
- **RAW Hazard 2:** `mul` reads $s0 before `add` writes it
- **Solution:** Forwarding can handle both (if $s0 available in time)

### Problem 4: Control Hazard Penalty

**Question:** In a 5-stage pipeline, a branch instruction makes its decision in the EX stage. What is the minimum branch penalty?

**Solution:**
- Branch decision in EX stage (cycle 3)
- Wrong instruction already fetched in IF stage (cycle 2)
- Must flush wrong instruction and fetch correct one
- **Minimum penalty: 2 cycles** (cycles 2-3 wasted)

**Answer:** 2 cycles minimum

### Problem 5: Forwarding Analysis

**Question:** Can forwarding eliminate the stall in this sequence?
```mips
lw $s0, 0($t0)
add $t2, $s0, $t1
```

**Answer:**
- **No, cannot completely eliminate stall**
- $s0 only available after MEM stage of `lw`
- `add` needs $s0 in EX stage
- **1-cycle stall required** (load-use hazard)
- Forwarding can be used after the stall to avoid additional delays

### Problem 6: Pipeline Efficiency

**Question:** A pipeline has 5 stages, each taking 100ps. If 20% of instructions cause 1-cycle stalls, what is the average CPI (Cycles Per Instruction)?

**Solution:**
- Ideal CPI = 1 (one instruction per cycle in steady state)
- 20% of instructions cause 1 extra cycle
- Average CPI = 1 + 0.2 × 1 = 1.2

**Answer:** Average CPI = 1.2

### Problem 7: Branch Prediction Impact

**Question:** A program has 20% branch instructions. With 80% prediction accuracy, what is the average branch penalty?

**Solution:**
- 20% of instructions are branches
- 80% predicted correctly → 0 penalty
- 20% predicted incorrectly → 2-cycle penalty
- Average penalty per branch = 0.8 × 0 + 0.2 × 2 = 0.4 cycles
- Average penalty per instruction = 0.2 × 0.4 = 0.08 cycles

**Answer:** 0.08 cycles per instruction average penalty

---

## Study Tips

1. **Understand Data Flow:**
   - Trace how data moves through pipeline stages
   - Understand register usage and memory access patterns
   - Visualize instruction execution step-by-step

2. **Master Hazard Types:**
   - Structure: Resource conflicts
   - Data: Dependencies (RAW most important)
   - Control: Branches

3. **Practice Pipeline Diagrams:**
   - Draw pipeline timing diagrams
   - Identify hazards visually
   - Show forwarding paths

4. **Calculate Performance:**
   - Throughput vs. latency
   - Speedup calculations
   - CPI and performance impact

5. **Compare Solutions:**
   - Forwarding vs. stalling
   - Branch prediction strategies
   - Pipeline design trade-offs

6. **Relate to Real Processors:**
   - MIPS pipeline as concrete example
   - Modern processors use similar concepts
   - Understand why certain designs are used

---

## Conclusion

Group 2 (CPU Architecture & Instruction Execution) dives deep into how processors actually work internally. Key takeaways:

1. **Processors are complex:** Multiple components working together
2. **Registers are critical:** Fastest memory, essential for performance
3. **Pipelining improves throughput:** Overlap execution for speed
4. **Hazards limit performance:** Must be detected and handled
5. **Forwarding is powerful:** Eliminates most data hazard stalls
6. **Branches are expensive:** Control hazards require sophisticated solutions

This foundation is essential for understanding:
- Instruction sets (Group 3) - what instructions look like
- Memory systems (Group 4) - how data is stored and retrieved
- I/O systems (Group 6) - how external communication works

Master these concepts, and you'll understand the heart of how computers execute programs!

---

*End of Group 2 Study Guide*

