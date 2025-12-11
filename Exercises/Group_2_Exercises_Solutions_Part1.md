# Group 2: CPU Architecture & Instruction Execution
## Comprehensive Exercise Solutions - Part 1

**Chapter 16: Processor Structure & Function**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)
3. [Short Answer Solutions (Sections 1-3)](#short-answer-solutions-sections-1-3)

---

## Multiple Choice Solutions

### Section 1: Processor Organization

**1.1** Which of the following is NOT one of the five fundamental processor operations?

**Answer: d) Cache Data**

**Explanation:**
- The five fundamental processor operations are:
  1. Fetch Instruction
  2. Interpret Instruction
  3. Fetch Data
  4. Process Data
  5. Write Data
- "Cache Data" is not one of these operations. Caching is a performance optimization technique, not a fundamental operation.

---

**1.2** The processor needs temporary storage primarily for:

**Answer: b) Instructions, operands, intermediate results, and control information**

**Explanation:**
- The processor needs temporary storage for multiple purposes:
  - Instructions being executed (stored in IR)
  - Operands being processed (stored in registers)
  - Intermediate results (stored in registers)
  - Control information (PC, PSW, etc.)
- This temporary storage is provided by CPU registers, which are fast but limited in capacity.

---

**1.3** In the memory hierarchy, which is the fastest but smallest?

**Answer: c) CPU Registers**

**Explanation:**
- Memory hierarchy (fastest to slowest, smallest to largest):
  1. CPU Registers - fastest, smallest, most expensive
  2. Cache Memory - very fast, small, expensive
  3. Main Memory - fast, larger, moderate cost
  4. Secondary Storage - slow, very large, cheap
- CPU registers are at the top of the hierarchy: fastest access but smallest capacity.

---

**1.4** The "Process Data" operation typically occurs in which component?

**Answer: b) ALU (Arithmetic Logic Unit)**

**Explanation:**
- The "Process Data" operation involves performing arithmetic and logical operations
- This is the primary function of the ALU (Arithmetic Logic Unit)
- The ALU performs operations like ADD, SUBTRACT, AND, OR, etc.
- The Control Unit coordinates operations but doesn't perform the actual computation.

---

**1.5** Which operation determines what action an instruction requires?

**Answer: b) Interpret Instruction**

**Explanation:**
- The "Interpret Instruction" operation (also called decode) determines:
  - What operation the instruction specifies (opcode)
  - What operands are needed
  - Where operands are located
  - What control signals to generate
- This is performed by the Control Unit, which reads the opcode and generates appropriate control signals.

---

### Section 2: CPU Internal Structure

**2.1** The CPU connects to the system bus through which components?

**Answer: c) Multiple internal components (MAR, MBR, etc.)**

**Explanation:**
- The CPU connects to the system bus through several internal components:
  - MAR (Memory Address Register) - connects to address bus
  - MBR (Memory Buffer Register) - connects to data bus
  - Control Unit - generates control signals for control bus
- These components act as interfaces between the CPU internals and the system bus.

---

**2.2** The Memory Address Register (MAR) holds:

**Answer: b) The address of the memory location to access**

**Explanation:**
- MAR (Memory Address Register) contains the address of the memory location to be accessed
- During a memory operation, the CPU places the address in MAR
- MAR is connected to the address bus
- The address is then sent to memory to specify which location to read or write

---

**2.3** The Memory Buffer Register (MBR) is also known as:

**Answer: b) Memory Data Register (MDR)**

**Explanation:**
- MBR (Memory Buffer Register) and MDR (Memory Data Register) are different names for the same register
- It holds data being transferred to/from memory
- During read: holds data read from memory
- During write: holds data to be written to memory
- Connected to the data bus

---

**2.4** During a memory read operation, data flows from:

**Answer: b) Memory to MBR**

**Explanation:**
- During a memory read:
  1. CPU places address in MAR
  2. CPU asserts Read signal
  3. Memory places data on data bus
  4. Data flows from memory → data bus → MBR
- MBR receives the data read from memory

---

**2.5** The internal CPU data path connects:

**Answer: c) All major CPU components**

**Explanation:**
- The internal CPU data path is a network of connections that links:
  - ALU
  - Registers (general-purpose and special-purpose)
  - Control Unit
  - MAR, MBR, IR, PC
- This allows data to flow between components within the CPU
- It's separate from but connected to the system bus

---

### Section 3: Register Organization

**3.1** User-visible registers are:

**Answer: b) Accessible to machine and assembly language programmers**

**Explanation:**
- User-visible registers can be explicitly referenced in machine or assembly language
- Programmers can use these registers in their code
- Examples: general-purpose registers, data registers, address registers
- Control/status registers are typically not directly accessible to user programs

---

**3.2** General-purpose registers can be used for:

**Answer: c) Both data and address storage**

**Explanation:**
- General-purpose registers are flexible - they can hold:
  - Data values (numbers, characters, etc.)
  - Memory addresses (pointers)
  - Intermediate results
- This flexibility makes them versatile for various operations
- Some architectures have separate data and address registers, but general-purpose registers can do both

---

**3.3** Condition codes (flags) indicate:

**Answer: b) The result of previous operations (zero, carry, overflow, etc.)**

**Explanation:**
- Condition codes (flags) are set based on the results of arithmetic and logical operations
- Common flags include:
  - Zero (Z): result is zero
  - Carry (C): arithmetic produced carry
  - Overflow (V): signed arithmetic overflow
  - Sign (S/N): result is negative
- These flags are used by conditional branch instructions

---

**3.4** The Program Counter (PC) is a:

**Answer: b) Control and status register**

**Explanation:**
- PC is a control and status register, not a user-visible register
- It's managed by the processor, not directly accessible to user programs
- Programmers cannot directly modify PC (except through branch/jump instructions)
- It's essential for instruction execution control

---

**3.5** The Program Status Word (PSW) typically contains:

**Answer: b) Condition codes, interrupt enable bits, and processor mode**

**Explanation:**
- PSW (Program Status Word) is a register containing:
  - Condition codes (flags): Z, C, V, S, etc.
  - Interrupt enable/disable bits
  - Processor mode (user/supervisor)
  - Other control and status information
- It does not contain the Program Counter (PC is a separate register)

---

### Section 4: Instruction Cycle

**4.1** The complete instruction cycle includes which phases?

**Answer: b) Fetch, Indirect, Execute, and Interrupt**

**Explanation:**
- The complete instruction cycle has four phases:
  1. Fetch - get instruction from memory
  2. Indirect - get effective address (if indirect addressing used)
  3. Execute - perform the operation
  4. Interrupt - check for interrupts
- Not all instructions require the indirect phase, but the cycle includes it when needed.

---

**4.2** During the fetch cycle, the instruction is loaded into:

**Answer: b) Instruction Register**

**Explanation:**
- During fetch cycle:
  1. Address from PC goes to MAR
  2. Instruction is read from memory
  3. Instruction is placed in MBR
  4. Instruction is transferred from MBR to IR (Instruction Register)
- IR holds the instruction for decoding and execution

---

**4.3** The indirect cycle is needed when:

**Answer: b) Indirect addressing mode is used**

**Explanation:**
- Indirect cycle is only needed when an instruction uses indirect addressing
- In indirect addressing, the instruction contains the address of another address
- The indirect cycle reads this address to get the effective address
- Not all instructions use indirect addressing, so the cycle is optional

---

**4.4** Register-to-register operations require:

**Answer: b) No memory access**

**Explanation:**
- Register-to-register operations work entirely with CPU registers
- Operands are in registers, result goes to a register
- No need to access memory during execution
- This makes them the fastest type of operations

---

**4.5** During the interrupt cycle, what must be saved?

**Answer: c) Processor context (PC, PSW, registers)**

**Explanation:**
- When an interrupt occurs, the complete processor context must be saved:
  - Program Counter (PC) - to resume execution
  - Processor Status Word (PSW) - condition codes and control info
  - General-purpose registers - program data
- This allows the interrupted program to resume exactly where it left off

---

### Section 5: Pipelining Fundamentals

**5.1** Pipelining improves performance by:

**Answer: b) Overlapping execution of multiple instructions**

**Explanation:**
- Pipelining doesn't make individual instructions faster
- Instead, it allows multiple instructions to be in different stages simultaneously
- While one instruction is executing, the next is being decoded, and the one after is being fetched
- This increases throughput (instructions completed per unit time)

---

**5.2** In a 5-stage pipeline, if each stage takes 1 cycle, how many cycles does it take to complete one instruction?

**Answer: b) 5 cycles**

**Explanation:**
- Each instruction must go through all 5 stages
- If each stage takes 1 cycle, one instruction takes 5 cycles to complete
- However, after the pipeline is full, a new instruction completes every cycle
- The first instruction takes 5 cycles, but subsequent instructions complete every cycle

---

**5.3** The speedup from pipelining is ideally equal to:

**Answer: a) The number of pipeline stages**

**Explanation:**
- Ideal speedup = number of pipeline stages
- For a 5-stage pipeline, ideal speedup = 5×
- This assumes no hazards and a long sequence of instructions
- Real speedup is less due to hazards and pipeline fill/flush overhead

---

**5.4** Pipeline throughput refers to:

**Answer: b) Number of instructions completed per unit time**

**Explanation:**
- Throughput = instructions completed per second (or per cycle)
- In an ideal pipeline, throughput = 1 instruction per cycle (CPI = 1)
- Latency (time for one instruction) is different from throughput
- Pipelining improves throughput, not latency

---

**5.5** In pipelining, the first instruction still takes:

**Answer: b) The full pipeline depth in cycles**

**Explanation:**
- The first instruction must go through all pipeline stages
- In a 5-stage pipeline, the first instruction takes 5 cycles
- Subsequent instructions complete every cycle (after pipeline is full)
- This is the pipeline "fill" time

---

### Section 6: MIPS Pipeline

**6.1** The MIPS pipeline has how many stages?

**Answer: c) 5 stages**

**Explanation:**
- MIPS pipeline has 5 stages:
  1. IF - Instruction Fetch
  2. ID - Instruction Decode & Register Read
  3. EX - Execute
  4. MEM - Memory Access
  5. WB - Write Back

---

**6.2** In the MIPS pipeline, register read occurs in which stage?

**Answer: b) ID (Instruction Decode)**

**Explanation:**
- In the ID stage:
  - Instruction is decoded
  - Register file is read to get operand values
  - Register addresses come from the instruction fields
- Registers are read before execution begins

---

**6.3** The ALU operation in MIPS occurs in which stage?

**Answer: c) EX**

**Explanation:**
- The EX (Execute) stage performs:
  - ALU operations (arithmetic, logical)
  - Address calculation for memory operations
  - Branch condition evaluation
- This is where the actual computation happens

---

**6.4** For a load instruction (lw), data is written to the register in which stage?

**Answer: c) WB (Write Back)**

**Explanation:**
- Load instruction flow:
  - IF: Fetch instruction
  - ID: Decode, read base register
  - EX: Calculate address
  - MEM: Read data from memory
  - WB: Write data to destination register
- Register write always occurs in WB stage

---

**6.5** In a 5-stage pipeline with no hazards, the ideal CPI (Cycles Per Instruction) is:

**Answer: a) 1**

**Explanation:**
- In an ideal pipeline with no hazards:
  - One instruction completes every cycle
  - CPI (Cycles Per Instruction) = 1
  - This is the best possible CPI for a pipelined processor
- Hazards increase CPI above 1

---

### Section 7: Pipeline Hazards

**7.1** Which of the following is NOT a type of pipeline hazard?

**Answer: d) Timing hazard**

**Explanation:**
- The three main types of pipeline hazards are:
  1. Structure hazard - resource conflicts
  2. Data hazard - data dependencies
  3. Control hazard - branch/jump instructions
- "Timing hazard" is not a standard category of pipeline hazard

---

**7.2** A structure hazard occurs when:

**Answer: b) Multiple instructions need the same resource simultaneously**

**Explanation:**
- Structure hazard = resource conflict
- Example: Single memory port for both instructions and data
- When instruction fetch and data access happen simultaneously, one must wait
- Solution: Separate instruction and data memories/caches

---

**7.3** A RAW (Read After Write) hazard is also known as:

**Answer: c) True dependency**

**Explanation:**
- RAW (Read After Write) = True dependency
- Instruction 2 reads a value that instruction 1 writes
- Instruction 2 truly depends on instruction 1's result
- This is a real data dependency that must be handled

---

**7.4** Control hazards are caused by:

**Answer: c) Branch and jump instructions**

**Explanation:**
- Control hazards occur when:
  - Branch/jump instructions change program flow
  - Pipeline doesn't know which instruction to fetch next
  - Pipeline may fetch wrong instructions
- Solutions: stalling, prediction, delayed branch, etc.

---

**7.5** To resolve a data hazard, one common technique is:

**Answer: c) Forwarding (bypassing)**

**Explanation:**
- Forwarding (bypassing) is a common technique to resolve data hazards
- Results are forwarded directly from one pipeline stage to another
- Avoids waiting for value to be written to register file
- Can resolve many data hazards without stalling

---

### Section 8: Data Hazards and Forwarding

**8.1** Forwarding (bypassing) allows:

**Answer: b) Results to be used before they are written to the register file**

**Explanation:**
- Forwarding allows pipeline stages to use results directly
- Value from EX stage can be forwarded to next instruction's EX stage
- No need to wait for WB stage to write to register file
- Reduces or eliminates need for stalls

---

**8.2** A load-use hazard requires:

**Answer: b) A pipeline stall (bubble)**

**Explanation:**
- Load-use hazard: instruction uses value loaded by previous load instruction
- Load data is only available after MEM stage
- Next instruction needs it in EX stage
- Forwarding cannot help (data not ready yet)
- Must stall pipeline for 1 cycle

---

**8.3** WAR (Write After Read) is a:

**Answer: b) Anti-dependency that may not be a problem in in-order pipelines**

**Explanation:**
- WAR = Write After Read = Anti-dependency
- Instruction 2 writes a value that instruction 1 reads
- In in-order pipelines, instruction 1 reads before instruction 2 writes
- Not a problem in in-order execution
- Can be a problem in out-of-order execution

---

**8.4** Forwarding can resolve hazards between instructions that are:

**Answer: c) In different pipeline stages**

**Explanation:**
- Forwarding works by connecting pipeline stages
- EX stage can forward to next instruction's EX stage
- MEM stage can forward to next instruction's EX stage
- Forwarding paths connect different stages
- Allows data to flow directly between stages

---

**8.5** The minimum number of cycles a load-use hazard causes is:

**Answer: b) 1 cycle (one stall)**

**Explanation:**
- Load-use hazard: load in MEM stage, use in next instruction's EX stage
- Load data available after MEM stage completes
- Next instruction needs it in EX stage
- Must stall for 1 cycle to allow load to complete
- Minimum penalty is 1 cycle

---

### Section 9: Control Hazards

**9.1** A control hazard occurs when:

**Answer: b) A branch instruction changes the program flow**

**Explanation:**
- Control hazard occurs when branch/jump changes program flow
- Pipeline doesn't know which instruction to fetch next
- May fetch wrong instructions (wrong path)
- Must flush pipeline and fetch correct instructions

---

**9.2** The branch penalty in a 5-stage pipeline (if branch is resolved in ID stage) is typically:

**Answer: c) 2 cycles**

**Explanation:**
- In 5-stage MIPS pipeline:
  - Branch resolved in ID stage (after register read)
  - Two instructions already in pipeline (IF and ID stages)
  - Must flush these two instructions
  - Penalty = 2 cycles (if branch taken)

---

**9.3** Branch prediction attempts to:

**Answer: b) Predict whether a branch will be taken before it's resolved**

**Explanation:**
- Branch prediction guesses branch outcome early
- Allows pipeline to continue fetching predicted path
- If prediction is correct, no penalty
- If wrong, must flush and fetch correct path
- Improves performance by reducing branch penalties

---

**9.4** A delayed branch:

**Answer: c) Executes instructions in the delay slot regardless of branch outcome**

**Explanation:**
- Delayed branch: instruction after branch always executes
- This instruction is in the "delay slot"
- Executes whether branch is taken or not
- Compiler/assembler must fill delay slot with useful instruction
- Reduces branch penalty

---

**9.5** Static branch prediction assumes:

**Answer: c) A fixed prediction (e.g., backward taken, forward not taken)**

**Explanation:**
- Static prediction uses fixed rules
- Common rule: backward branches (loops) taken, forward branches not taken
- Same prediction every time for same branch
- Simple but less accurate than dynamic prediction
- No history tracking needed

---

## True/False Solutions

**T/F 1.1** The processor must perform five fundamental operations: fetch instruction, interpret instruction, fetch data, process data, and write data.

**Answer: True**

**Explanation:**
- These are the five fundamental operations every processor must perform
- They form the basis of instruction execution

---

**T/F 1.2** CPU registers are the fastest but smallest form of memory in the system.

**Answer: True**

**Explanation:**
- CPU registers are at the top of the memory hierarchy
- Fastest access time, but smallest capacity
- Most expensive per bit

---

**T/F 1.3** The "Process Data" operation always requires memory access.

**Answer: False**

**Explanation:**
- Process Data can work with register operands
- Register-to-register operations don't require memory access
- Only memory operations require memory access

---

**T/F 2.1** The Memory Address Register (MAR) holds the address of the memory location to be accessed.

**Answer: True**

**Explanation:**
- MAR contains the memory address for read/write operations
- Connected to address bus

---

**T/F 2.2** The Memory Buffer Register (MBR) is bidirectional - it can hold data being read from or written to memory.

**Answer: True**

**Explanation:**
- MBR holds data in both directions:
  - Read: data from memory
  - Write: data to memory
- Connected to data bus

---

**T/F 2.3** The internal CPU data path is separate from the system bus.

**Answer: True**

**Explanation:**
- Internal data path connects CPU components internally
- System bus connects CPU to external components (memory, I/O)
- They are separate but connected through MAR/MBR

---

**T/F 3.1** User-visible registers can be used by assembly language programmers.

**Answer: True**

**Explanation:**
- User-visible registers can be explicitly referenced in code
- Assembly language can use these registers directly

---

**T/F 3.2** General-purpose registers can only store data, not addresses.

**Answer: False**

**Explanation:**
- General-purpose registers are flexible
- Can store both data and addresses
- This is their advantage over specialized registers

---

**T/F 3.3** Condition codes are set based on the results of arithmetic and logical operations.

**Answer: True**

**Explanation:**
- ALU automatically sets condition codes based on operation results
- Used by conditional branch instructions

---

**T/F 3.4** The Program Counter (PC) is a user-visible register that programmers can directly modify.

**Answer: False**

**Explanation:**
- PC is a control/status register
- Not directly accessible to user programs
- Can only be modified through branch/jump instructions

---

**T/F 3.5** The Program Status Word (PSW) contains condition codes and processor control information.

**Answer: True**

**Explanation:**
- PSW contains condition codes, interrupt enable bits, processor mode, etc.
- Critical for processor state management

---

**T/F 4.1** Every instruction requires an indirect cycle.

**Answer: False**

**Explanation:**
- Indirect cycle is only needed for indirect addressing
- Most instructions use direct addressing
- Indirect cycle is optional

---

**T/F 4.2** Register-to-register operations are the fastest because they don't require memory access.

**Answer: True**

**Explanation:**
- No memory access = no memory latency
- Registers are fastest storage
- Register operations are fastest

---

**T/F 4.3** During the interrupt cycle, the processor context must be saved to allow resumption.

**Answer: True**

**Explanation:**
- Complete context (PC, PSW, registers) must be saved
- Allows interrupted program to resume correctly

---

**T/F 5.1** Pipelining reduces the time to execute a single instruction.

**Answer: False**

**Explanation:**
- Pipelining doesn't reduce latency of single instruction
- Still takes same number of cycles per instruction
- Improves throughput (instructions per unit time)

---

**T/F 5.2** In an ideal pipeline with N stages, the speedup approaches N for long instruction sequences.

**Answer: True**

**Explanation:**
- Ideal speedup = number of stages
- For long sequences, pipeline is always full
- Speedup approaches N

---

**T/F 5.3** Pipeline throughput is the number of instructions completed per unit time.

**Answer: True**

**Explanation:**
- Throughput = instructions/second or instructions/cycle
- Different from latency (time per instruction)

---

**T/F 5.4** The first instruction in a pipeline still takes the full pipeline depth to complete.

**Answer: True**

**Explanation:**
- First instruction must go through all stages
- Takes full pipeline depth in cycles
- Subsequent instructions complete every cycle

---

**T/F 6.1** The MIPS pipeline has 5 stages: IF, ID, EX, MEM, WB.

**Answer: True**

**Explanation:**
- Standard MIPS pipeline has these 5 stages
- Each stage performs specific functions

---

**T/F 6.2** In MIPS, register write occurs in the WB (Write Back) stage.

**Answer: True**

**Explanation:**
- All register writes occur in WB stage
- Results from EX or MEM stage are written back

---

**T/F 6.3** All instruction types use all 5 pipeline stages in MIPS.

**Answer: False**

**Explanation:**
- Different instruction types use different stages
- R-format: IF, ID, EX, WB (no MEM)
- Load: uses all 5 stages
- Store: IF, ID, EX, MEM (no WB)

---

**T/F 7.1** Structure hazards occur when multiple instructions need the same hardware resource.

**Answer: True**

**Explanation:**
- Resource conflict = structure hazard
- Multiple instructions compete for same resource

---

**T/F 7.2** Data hazards can always be resolved with forwarding.

**Answer: False**

**Explanation:**
- Forwarding can resolve many data hazards
- But load-use hazards require stalls
- Not all hazards can be resolved by forwarding alone

---

**T/F 7.3** Control hazards are caused by branch and jump instructions.

**Answer: True**

**Explanation:**
- Branches/jumps change program flow
- Cause control hazards
- Pipeline doesn't know next instruction

---

**T/F 8.1** Forwarding allows results to be used before they are written to the register file.

**Answer: True**

**Explanation:**
- Forwarding bypasses register file
- Results used directly from pipeline stages
- Reduces need for stalls

---

**T/F 8.2** A load-use hazard can be resolved with forwarding alone.

**Answer: False**

**Explanation:**
- Load-use hazard: data not ready until after MEM stage
- Next instruction needs it in EX stage
- Forwarding cannot help (data not available yet)
- Must stall

---

**T/F 8.3** RAW (Read After Write) hazards represent true data dependencies.

**Answer: True**

**Explanation:**
- RAW = true dependency
- Instruction 2 truly depends on instruction 1's result
- Must wait for instruction 1 to complete

---

**T/F 9.1** Branch prediction can eliminate all branch penalties.

**Answer: False**

**Explanation:**
- Branch prediction reduces penalties
- But mispredictions still cause penalties
- Cannot eliminate all penalties (unless 100% accurate)

---

**T/F 9.2** The branch penalty depends on when the branch outcome is determined in the pipeline.

**Answer: True**

**Explanation:**
- Earlier resolution = smaller penalty
- Later resolution = larger penalty
- Penalty = number of instructions to flush

---

**T/F 9.3** Delayed branches always eliminate the branch penalty.

**Answer: False**

**Explanation:**
- Delayed branch reduces penalty
- But delay slot must be filled with useful instruction
- If delay slot is NOP, penalty still exists
- Doesn't always eliminate penalty

---

*[Continued in Part 2 with Short Answer Solutions...]*


