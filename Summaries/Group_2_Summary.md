# Group 2: CPU Architecture & Instruction Execution - Concise Summary

## Processor Organization

### Five Fundamental Operations
1. **Fetch Instruction:** Read next instruction from memory
2. **Interpret Instruction:** Decode opcode, determine operation
3. **Fetch Data:** Retrieve operands (from memory, I/O, or registers)
4. **Process Data:** Perform computation (ALU operations)
5. **Write Data:** Store results (to memory, I/O, or registers)

### Internal Memory Requirement
- **Registers:** Fast, temporary storage within CPU
- **Memory Hierarchy:** Registers (fastest) → Cache → Main Memory → Secondary Storage

## CPU Internal Structure

### Key Components
- **Control Unit (CU):** Generates control signals based on instructions
- **Arithmetic Logic Unit (ALU):** Performs arithmetic/logical operations
- **Register File:** User-visible registers for operands/results
- **Control & Status Registers:** PC, IR, MAR, MBR, PSW

### Connection to System Bus
- **Data Bus:** Transfer data and instructions
- **Address Bus:** Specify memory/I/O addresses
- **Control Bus:** Control and timing signals

## Register Organization

### Two Categories

#### 1. User-Visible Registers
- **General-Purpose:** Can be used for any purpose (data, addresses)
- **Data Registers:** Hold data only (cannot be used in address calculations)
- **Address Registers:** Used for addressing (segment pointers, index registers, stack pointer)
- **Condition Codes (Flags):** Z (zero), S (sign), C (carry), V (overflow)

#### 2. Control and Status Registers
- **Program Counter (PC):** Address of next instruction
- **Instruction Register (IR):** Currently executing instruction
- **Memory Address Register (MAR):** Address for memory operations
- **Memory Buffer Register (MBR/MDR):** Data for memory read/write
- **Program Status Word (PSW):** Condition codes + status (interrupt enable, supervisor mode)

## Instruction Cycle Details

### Complete Cycle Phases

1. **Fetch Cycle:**
   - PC → MAR → Address Bus → Memory
   - Memory → Data Bus → MBR → IR
   - Increment PC

2. **Indirect Cycle (Optional):**
   - Handle indirect addressing
   - Read actual address from memory

3. **Execute Cycle:**
   - **Register-to-Register:** ALU operations
   - **Memory Read:** LOAD operations
   - **Memory Write:** STORE operations
   - **Control Transfer:** Branches, jumps

4. **Interrupt Cycle (Optional):**
   - Save context (PC, PSW, registers)
   - Jump to interrupt handler

### State Diagram
```
FETCH → [Indirect?] → EXECUTE → [Interrupt?] → FETCH
```

## Pipelining Fundamentals

### Problem: Sequential Execution
- **Non-Pipelined:** Each instruction completes before next starts
- **Time per instruction:** Sum of all stages
- **Throughput:** 1 instruction per (sum of stages)

### Solution: Pipelining
- **Concept:** Overlap execution of multiple instructions
- **Benefit:** Improves **throughput** (not latency)
- **Ideal Speedup:** Equal to number of stages (if balanced)

### Pipeline Stages (6-Stage Example)
1. **FI (Fetch Instruction):** Read instruction from memory
2. **DI (Decode Instruction):** Determine opcode and operands
3. **CO (Calculate Operands):** Calculate effective addresses
4. **FO (Fetch Operands):** Retrieve operands from memory/registers
5. **EI (Execute Instruction):** Perform operation in ALU
6. **WO (Write Operand):** Store result

### Pipeline Performance
- **Clock Cycle:** Limited by **slowest stage**
- **Throughput:** 1 instruction per clock cycle (in steady state)
- **Latency:** Still sum of all stages (not reduced)
- **Speedup:** Non-pipelined time / Pipelined time

## MIPS Pipeline Case Study

### 5-Stage Pipeline
1. **IF (Instruction Fetch):** 200ps - Fetch instruction, update PC
2. **ID (Instruction Decode & Register Read):** 100ps - Decode, read registers
3. **EX (Execute):** 200ps - ALU operation, address calculation
4. **MEM (Memory Access):** 200ps - Load/store only (R-format/branch skip)
5. **WB (Write Back):** 100ps - Write result to register

### Clock Cycle
- **Determined by:** Slowest stage = 200ps
- **Throughput:** 1 instruction per 200ps
- **Speedup:** ~4x (close to ideal 5x)

### Instruction Types
- **Load (lw):** IF → ID → EX → MEM → WB (800ps total)
- **Store (sw):** IF → ID → EX → MEM (700ps, no WB)
- **R-Format (add):** IF → ID → EX → WB (600ps, no MEM)
- **Branch (beq):** IF → ID → EX (500ps, no MEM/WB)

## Pipeline Hazards

### Definition
Situations that prevent starting next instruction in next cycle, causing stalls (bubbles).

### Three Types

#### 1. Structure Hazards
- **Cause:** Resource conflicts (multiple instructions need same resource)
- **Example:** Single memory for instructions and data
- **Solutions:**
  - Stall pipeline
  - Separate instruction/data memory (Harvard architecture)
  - Separate I-cache and D-cache

#### 2. Data Hazards
- **Cause:** Data dependencies (instruction needs result from previous instruction)
- **Types:**
  - **RAW (Read After Write):** Most common - true dependency
  - **WAR (Write After Read):** Rare in simple pipelines
  - **WAW (Write After Write):** Possible but uncommon
  - **RAR (Read After Read):** Not a hazard
- **Solutions:**
  - **Forwarding (Bypassing):** Use result directly from pipeline stage
  - **Stalling:** Insert bubbles until data ready
  - **Instruction Reordering:** Compiler optimization

#### 3. Control Hazards
- **Cause:** Branch instructions determine next instruction, but decision made late
- **Problem:** Already fetched wrong instruction
- **Penalty:** 2-3 cycles when branch taken
- **Solutions:**
  - **Stall on Branch:** Wait for decision (simple, high penalty)
  - **Branch Prediction:** Predict taken/not taken
  - **Delayed Branch:** Always execute instruction after branch
  - **Prefetch Branch Target:** Fetch target while branch executes

## Data Hazards and Forwarding

### Forwarding (Bypassing)
- **Concept:** Use result directly from EX/MEM stage without waiting for WB
- **Implementation:** Extra datapath connections, forwarding unit, multiplexers
- **Forwarding Paths:**
  - EX/MEM → EX (previous instruction)
  - MEM/WB → EX (two instructions ago)
  - EX/MEM → MEM (for store instructions)

### Load-Use Hazard
- **Special Case:** Load instruction followed by instruction using loaded value
- **Problem:** Data only available after MEM stage
- **Solution:** **1-cycle stall** + forwarding (cannot be completely eliminated)

## Control Hazards

### Branch Problem
- Branch decision made in EX stage
- Next instruction already fetched in IF stage
- If branch taken, wrong instruction fetched (must flush)

### Branch Penalty
- **Minimum:** 2 cycles (wrong instruction in pipeline)
- **Typical:** 2-3 cycles

### Branch Prediction Strategies
1. **Always Not Taken:** Assume branch never taken
2. **Always Taken:** Assume branch always taken
3. **Dynamic Prediction:** Use history (branch prediction buffer)
   - 1-bit predictor
   - 2-bit predictor (state machine)
   - Branch Target Buffer (BTB)
   - Modern processors: >95% accuracy

## Key Takeaways

1. **Five operations:** Fetch, Interpret, Fetch Data, Process Data, Write Data
2. **Registers:** Fastest memory, two categories (user-visible, control/status)
3. **Instruction cycle:** Fetch → (Indirect) → Execute → (Interrupt)
4. **Pipelining:** Improves throughput by overlapping execution
5. **Pipeline clock:** Limited by slowest stage
6. **Hazards:** Structure (resources), Data (dependencies), Control (branches)
7. **Forwarding:** Eliminates most data hazard stalls
8. **Branch prediction:** Reduces control hazard penalty

## Performance Considerations

- **Register usage:** Minimize memory accesses
- **Pipeline balance:** Equal stage times maximize efficiency
- **Hazard detection:** Identify and handle efficiently
- **Forwarding:** Critical for data hazard performance
- **Branch prediction:** Essential for control hazard performance
- **CPI (Cycles Per Instruction):** Affected by stalls and hazards
