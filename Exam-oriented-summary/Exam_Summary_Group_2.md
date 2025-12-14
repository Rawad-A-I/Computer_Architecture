# Group 2: CPU Architecture & Instruction Execution - Exam Summary

## Key Exam Topics

### 1. Processor Requirements (MCQ/Short Answer)
**Five Fundamental Operations:**
1. Fetch Instruction
2. Interpret Instruction
3. Fetch Data
4. Process Data
5. Write Data

**Key Point:** Processor needs internal memory (registers) for temporary storage.

### 2. Register Organization (MCQ/Classification)
**Two Categories:**

**A. User-Visible Registers:**
- **General-Purpose:** Can be used for any purpose
- **Data Registers:** Hold data only
- **Address Registers:** Used for addressing (SP, BP, index)
- **Condition Codes (Flags):** Z, S, C, V (Zero, Sign, Carry, Overflow)

**B. Control & Status Registers:**
- **PC (Program Counter):** Address of next instruction
- **IR (Instruction Register):** Current instruction
- **MAR (Memory Address Register):** Address for memory access
- **MBR (Memory Buffer Register):** Data to/from memory
- **PSW (Program Status Word):** Condition codes + status

**Key Point:** User-visible = accessible by programs; Control/Status = internal use only.

### 3. Instruction Cycle Phases (Diagram/Short Answer)
**Four Phases:**
1. **Fetch:** PC → MAR → Memory → MBR → IR, Increment PC
2. **Indirect (Optional):** Handle indirect addressing
3. **Execute:** Perform operation (varies by instruction type)
4. **Interrupt (Optional):** Handle interrupts

**State Diagram:**
```
FETCH → [Indirect?] → EXECUTE → [Interrupt?] → FETCH
```

### 4. Pipelining Fundamentals (Calculation/Diagram)
**Concept:** Overlap execution of multiple instructions.

**Key Metrics:**
- **Throughput:** Instructions per unit time (improves)
- **Latency:** Time per instruction (does NOT improve)
- **Speedup:** Non-pipelined time / Pipelined time

**Ideal Speedup:** Equal to number of stages (if balanced)

**Clock Cycle:** Limited by **slowest stage**

**Example Calculation:**
- Stages: 200ps, 150ps, 200ps, 180ps, 150ps
- Clock cycle = 200ps (slowest)
- Non-pipelined = 880ps
- Speedup = 880/200 = 4.4x

### 5. MIPS Pipeline (Diagram/Calculation)
**5 Stages:**
1. **IF (Instruction Fetch):** 200ps
2. **ID (Instruction Decode & Register Read):** 100ps
3. **EX (Execute):** 200ps
4. **MEM (Memory Access):** 200ps
5. **WB (Write Back):** 100ps

**Clock Cycle:** 200ps (slowest stage)

**Throughput:**
- Non-pipelined: 1 instruction per 800ps
- Pipelined: 1 instruction per 200ps
- **Speedup: 4x**

### 6. Pipeline Hazards (MCQ/Classification)
**Three Types:**

**A. Structure Hazards:**
- Resource conflict (e.g., single memory for instructions and data)
- **Solution:** Separate I-cache and D-cache

**B. Data Hazards:**
- **RAW (Read After Write):** Most common, true dependency
- **WAR (Write After Read):** Anti-dependency (rare in simple pipelines)
- **WAW (Write After Write):** Output dependency
- **RAR (Read After Read):** NOT a hazard
- **Solution:** Forwarding (bypassing), stalling

**C. Control Hazards:**
- Branch decision not known until later in pipeline
- **Penalty:** 2-3 cycles typically
- **Solutions:** Branch prediction, delayed branch, prefetch target

### 7. Forwarding (Bypassing) (Diagram/Short Answer)
**Concept:** Use result directly from pipeline stage, not waiting for register write.

**Forwarding Paths:**
- EX/MEM → EX (previous instruction)
- MEM/WB → EX (two instructions ago)
- EX/MEM → MEM (for stores)

**Limitation:** Load-use hazard still needs 1-cycle stall (data only available after MEM).

### 8. Branch Prediction (MCQ/Short Answer)
**Strategies:**
- **Always Not Taken:** Assume branch never taken
- **Always Taken:** Assume branch always taken
- **Dynamic Prediction:** Use history (branch prediction buffer)

**Performance:**
- Correct prediction: No penalty
- Wrong prediction: 2-cycle penalty
- Modern processors: >95% accuracy

### 9. Performance Calculations (Calculation)
**Average CPI with Cache:**
```
CPI_actual = CPI_base + (I-cache miss rate × Miss penalty) + 
             (Load/store fraction × D-cache miss rate × Miss penalty)
```

**Example:**
- Base CPI = 2
- I-cache miss rate = 2%
- D-cache miss rate = 5%
- Load/store fraction = 40%
- Miss penalty = 100 cycles

**CPI = 2 + (0.02 × 100) + (0.4 × 0.05 × 100) = 2 + 2 + 2 = 6**

---

## Common Exam Questions

### Calculation Questions:
1. **Pipeline Speedup:** Given stage times, calculate clock cycle and speedup
2. **CPI with Hazards:** Calculate actual CPI with stall cycles
3. **Branch Penalty:** Calculate performance impact of branches

### True/False:
- "Pipelining improves latency" → **False** (improves throughput)
- "Forwarding eliminates all data hazards" → **False** (load-use still needs stall)
- "Control hazards always cause 2-cycle penalty" → **False** (depends on prediction)

### MCQ Topics:
- Which hazard type is most common? → **RAW (Read After Write)**
- What limits pipeline clock cycle? → **Slowest stage**
- Which register holds current instruction? → **IR (Instruction Register)**

### Diagram Questions:
- Draw 5-stage pipeline timing diagram
- Show forwarding paths in pipeline
- Identify hazards in instruction sequence

### Classification:
- Classify register types (user-visible vs. control/status)
- Identify hazard types (structure/data/control)
- Match forwarding paths to instruction dependencies

---

## Key Formulas

1. **Pipeline Speedup:** Non-pipelined time / Pipelined time
2. **Clock Cycle:** max(stage times)
3. **CPI with Cache:** CPI_base + Instruction_miss_cycles + Data_miss_cycles
4. **Average Branch Penalty:** (1 - accuracy) × penalty_cycles

---

## Critical Definitions

- **Pipeline:** Overlap execution of multiple instructions
- **Hazard:** Situation preventing next instruction in next cycle
- **Forwarding (Bypassing):** Use result from pipeline stage directly
- **RAW Hazard:** Read After Write - true dependency
- **Branch Prediction:** Predict whether branch will be taken

---

## Pipeline Timing Example

**Instructions:**
```
I1: add $s0, $t0, $t1
I2: sub $t2, $s0, $t3
```

**Without Forwarding:**
- I2 must wait for I1 to write $s0 (stall needed)

**With Forwarding:**
- I2 can use $s0 directly from I1's EX stage (no stall)
