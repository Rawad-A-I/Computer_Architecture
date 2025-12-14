# Mock Exam 4: Solution Guide
## Computer Architecture - Final Examination

---

## Problem 1: True/False Solutions

**1.1** The four essential components of a computer are CPU, Main Memory, I/O Modules, and System Bus.

**Answer: True**

**Explanation:**
- These are the four fundamental components
- System Bus (System Interconnection) connects all components
- All computers have these four components

---

**1.2** The Control Unit performs arithmetic and logical operations.

**Answer: False**

**Explanation:**
- Control Unit generates control signals and coordinates operations
- ALU (Arithmetic Logic Unit) performs arithmetic and logical operations
- These are separate components

---

**1.3** During the fetch cycle, the Program Counter is automatically incremented.

**Answer: True**

**Explanation:**
- After fetching instruction, PC is incremented to point to next instruction
- This happens automatically during fetch cycle
- PC = PC + instruction_size

---

**1.4** An interrupt can occur between any two instructions in a program.

**Answer: True**

**Explanation:**
- Interrupts are checked after each instruction completes
- Can occur between any two instructions
- Current instruction must complete before interrupt is processed

---

**1.5** Pipelining improves instruction latency by reducing the time each instruction takes to complete.

**Answer: False**

**Explanation:**
- Pipelining improves **throughput** (instructions per second)
- Pipelining does **NOT** improve latency (time per instruction)
- Latency remains the same, but multiple instructions execute simultaneously

---

**1.6** A RAW (Read After Write) hazard occurs when an instruction tries to read a value before it's written.

**Answer: True**

**Explanation:**
- RAW = Read After Write
- Instruction 2 tries to read operand before Instruction 1 writes it
- This is a true dependency (most common data hazard)

---

**1.7** Forwarding can completely eliminate the need for pipeline stalls in all cases.

**Answer: False**

**Explanation:**
- Forwarding eliminates many data hazards
- However, load-use hazards still require at least 1-cycle stall
- Data must be available before it can be forwarded

---

**1.8** Branch prediction accuracy of 90% means 10% of branches cause pipeline stalls.

**Answer: True**

**Explanation:**
- 90% accuracy = 90% predicted correctly (no penalty)
- 10% mispredicted = 10% cause pipeline stalls/penalties
- This is the definition of prediction accuracy

---

**1.9** The Program Status Word (PSW) contains condition codes and processor status information.

**Answer: True**

**Explanation:**
- PSW contains condition codes (Z, S, C, V)
- Also contains status flags (interrupt enable, supervisor mode, etc.)
- Used for conditional branches and system control

---

**1.10** User-visible registers can be directly accessed by assembly language programs.

**Answer: True**

**Explanation:**
- User-visible registers are accessible to programs
- Can be referenced in assembly/machine code
- Control/status registers are not directly accessible

---

**1.11** The Memory Address Register (MAR) is connected to the address bus.

**Answer: True**

**Explanation:**
- MAR holds the address for memory operations
- Connected to address bus
- Address from MAR is placed on address bus

---

**1.12** In a 5-stage pipeline, the clock cycle is determined by the fastest stage.

**Answer: False**

**Explanation:**
- Clock cycle is determined by the **slowest** stage
- All stages must complete within one clock cycle
- Pipeline speed limited by bottleneck stage

---

**1.13** Control hazards are caused by branch instructions that change the instruction sequence.

**Answer: True**

**Explanation:**
- Control hazards occur with branches/jumps
- Branch decision not known until later in pipeline
- Already fetched instructions may be wrong
- Causes pipeline stalls or penalties

---

**1.14** The ideal speedup of a pipeline equals the number of pipeline stages.

**Answer: True**

**Explanation:**
- Ideal speedup = number of stages (if stages are balanced)
- Assumes no hazards or stalls
- With 5 stages, ideal speedup = 5x

---

**1.15** Load-use hazards always require at least one pipeline stall cycle.

**Answer: True**

**Explanation:**
- Load instruction: data available after MEM stage
- Next instruction needs data in EX stage
- Even with forwarding, 1-cycle stall needed
- Data not available early enough

---

**1.16** I/O modules are needed because peripherals operate at different speeds than the processor.

**Answer: True**

**Explanation:**
- Peripherals often much slower than processor
- I/O modules handle speed matching
- Also handle data format conversion and device protocols

---

**1.17** In isolated I/O, I/O devices have their own separate address space from memory.

**Answer: True**

**Explanation:**
- Isolated I/O uses separate address spaces
- Memory: full address space
- I/O: separate address space
- Requires special I/O instructions

---

**1.18** DMA requires the CPU to transfer each byte of data individually.

**Answer: False**

**Explanation:**
- DMA transfers entire blocks automatically
- CPU only sets up transfer (address, count, direction)
- CPU not involved during transfer
- Much more efficient than byte-by-byte

---

**1.19** A vectored interrupt system allows the processor to identify the interrupting device automatically.

**Answer: True**

**Explanation:**
- Vectored interrupt: device provides vector (identifier)
- Processor uses vector to jump to handler
- No need to poll devices
- Automatic device identification

---

**1.20** Write buffers are used to improve the performance of write-through cache policies.

**Answer: True**

**Explanation:**
- Write-through: every write goes to memory (slow)
- Write buffer: holds writes, CPU continues immediately
- Reduces performance penalty of write-through
- Common optimization

---

## Problem 2: Instruction Cycle and Interrupts Solutions

### 2.1 Four Phases of Instruction Cycle [8 pts]

**1. Fetch Cycle:**
- **Purpose:** Retrieve the next instruction from memory
- **Steps:**
  - PC → MAR (transfer program counter to memory address register)
  - Assert Read signal
  - Memory → MBR (memory places instruction in memory buffer register)
  - MBR → IR (transfer instruction to instruction register)
  - Increment PC (PC = PC + instruction_size)

**2. Indirect Cycle (Optional):**
- **Purpose:** Handle indirect addressing
- **When used:** When instruction specifies indirect address
- **Steps:**
  - IR address field → MAR
  - Read memory to get actual address
  - Actual address → MAR (for operand fetch)

**3. Execute Cycle:**
- **Purpose:** Perform the operation specified by the instruction
- **Varies by instruction type:**
  - **Data Processing:** Read operands, perform ALU operation, write result
  - **Memory Operations:** Calculate address, read/write memory
  - **Control Operations:** Update PC for branches/jumps
  - **I/O Operations:** Transfer data to/from I/O devices

**4. Interrupt Cycle (Optional):**
- **Purpose:** Handle interrupts
- **When used:** After execute cycle, if interrupt pending
- **Steps:**
  - Save context (PC, PSW, registers)
  - Disable interrupts
  - Load interrupt handler address into PC
  - Jump to interrupt service routine

---

### 2.2 Memory Operations [2 pts]

**Given:**
- PC = 10110
- Memory[10110] = 1100 1011

**During Fetch Cycle:**
- **MAR:** Loaded with PC value = **10110**
- **MBR:** Loaded with instruction from memory[10110] = **1100 1011**

**Answer:** MAR = 10110, MBR = 1100 1011

---

### 2.3 Instruction Cycle Order [2 pts]

**Correct Order:**
1. c) Determine instruction address (PC)
2. b) Read instruction from memory (Fetch)
3. e) Analyze instruction (Decode)
4. g) Calculate operand address
5. f) Fetch operand from memory
6. d) Perform operation (Execute)
7. a) Write result to memory (Write back)

**Answer: c - b - e - g - f - d - a**

---

### 2.4 Interrupt Cycle [8 pts]

**a) When Interrupts are Checked:**
- Interrupts are checked **after each instruction completes**
- Specifically, after the execute cycle
- Before fetching the next instruction
- If interrupt pending, interrupt cycle begins instead of fetch

**b) Context Saved:**
- **Program Counter (PC):** Address of next instruction to execute
- **Program Status Word (PSW):** Condition codes and status flags
- **General-Purpose Registers:** All register values
- **Other Processor State:** Any other relevant state information
- Typically saved to stack or special system memory

**c) How Processor Resumes:**
1. **Interrupt Handler Executes:**
   - Processes the interrupt
   - Performs necessary operations
   - Prepares to return

2. **Return from Interrupt:**
   - Restore saved context from stack
   - Restore PC (points to instruction after interrupt)
   - Restore PSW (restores condition codes and flags)
   - Restore all registers
   - Re-enable interrupts (if appropriate)

3. **Resume Execution:**
   - Continue from where interrupted
   - Execute instruction at restored PC
   - Program continues as if interrupt never occurred

**Key Point:** Interrupt is transparent to the interrupted program - it resumes exactly where it left off.

---

## Problem 3: Pipeline Hazards and Performance Solutions

### 3.1 Data Hazard Identification [8 pts]

**Instruction Sequence:**
```mips
ADD $s0, $t0, $t1
SUB $t2, $s0, $t3
```

**Hazard Type:** **RAW (Read After Write) Data Hazard**

**Explanation:**
- `ADD` writes to $s0 in WB stage (cycle 5)
- `SUB` needs $s0 in ID stage (cycle 3) - too early!
- `SUB` tries to read $s0 before `ADD` writes it
- This is a true dependency (RAW hazard)

**Resolution Methods:**

**1. Pipeline Stall:**
- Insert bubbles (NOP instructions) until data available
- `SUB` waits until `ADD` completes WB stage
- **Penalty:** 2-cycle stall

**2. Forwarding (Bypassing):**
- Use result directly from EX/MEM stage
- `ADD` computes $s0 in EX stage (cycle 3)
- Forward $s0 directly to `SUB`'s EX stage (cycle 4)
- **No stall needed!**

**3. Instruction Reordering:**
- Compiler reorders instructions to avoid hazard
- Move independent instructions between `ADD` and `SUB`
- May not always be possible

**Best Solution:** Forwarding eliminates the stall in this case.

---

### 3.2 Pipeline Performance Calculations [9 pts]

**Given Stage Times:**
- IF: 150 ps
- ID: 100 ps
- EX: 200 ps
- MEM: 180 ps
- WB: 120 ps

**a) Pipeline Clock Cycle:**
- Clock cycle = **max(stage times) = 200 ps**
- Limited by slowest stage (EX)

**b) Ideal Speedup:**
- Non-pipelined time = 150 + 100 + 200 + 180 + 120 = 750 ps
- Pipelined throughput = 1 instruction per 200 ps
- **Ideal speedup = 750 / 200 = 3.75x**
- Maximum possible = 5x (number of stages), but stages not balanced

**c) Actual Speedup with Stalls:**
- 15% of instructions cause 1-cycle stalls
- Average CPI = 1 + 0.15 × 1 = 1.15
- Effective cycle time = 200 ps × 1.15 = 230 ps
- **Actual speedup = 750 / 230 = 3.26x**

---

### 3.3 Hazard Types [8 pts]

**1. Structure Hazards:**
- **Definition:** Required resource is busy when needed
- **Cause:** Multiple instructions need same hardware simultaneously
- **Example:** 
  - Instruction fetch (IF stage) and data access (MEM stage) both need memory
  - Solution: Separate instruction cache and data cache (Harvard architecture)

**2. Data Hazards:**
- **Definition:** Instruction needs data before it's ready
- **Cause:** Data dependencies between instructions
- **Example:**
  - `ADD $s0, $t0, $t1` followed by `SUB $t2, $s0, $t3`
  - `SUB` needs $s0 before `ADD` writes it (RAW hazard)
  - Solution: Forwarding, stalling, or instruction reordering

**3. Control Hazards:**
- **Definition:** Branch decision affects which instruction to fetch next
- **Cause:** Branch instructions change instruction sequence
- **Example:**
  - `BEQ $t0, $t1, label` - don't know if branch taken until EX stage
  - Already fetched next instruction may be wrong
  - Solution: Branch prediction, delayed branch, prefetch target

**Key Differences:**
- **Structure:** Resource conflict (hardware limitation)
- **Data:** Data dependency (logical dependency)
- **Control:** Control flow change (branch/jump)

---

## Problem 4: Register Organization Solutions

### 4.1 User-Visible vs Control/Status Registers [8 pts]

**User-Visible Registers:**
- **Definition:** Can be directly accessed by programs (assembly/machine code)
- **Purpose:** Enable programmers to optimize code, minimize memory accesses
- **Examples:**
  1. **General-Purpose Registers:** Can be used for any purpose
     - MIPS: $t0-$t9, $s0-$s7
     - Purpose: Hold operands, results, addresses
  2. **Stack Pointer (SP):** Points to top of stack
     - MIPS: $sp ($29)
     - Purpose: Manage stack operations, function calls

**Control/Status Registers:**
- **Definition:** Used internally by processor and OS, not directly accessible
- **Purpose:** Control instruction execution and system operation
- **Examples:**
  1. **Program Counter (PC):** Address of next instruction
     - Purpose: Controls instruction fetch sequence
  2. **Instruction Register (IR):** Current instruction being executed
     - Purpose: Holds instruction for decoding

**Key Differences:**
- **Accessibility:** User-visible = accessible to programs; Control/Status = internal only
- **Purpose:** User-visible = data operations; Control/Status = execution control
- **Modification:** User-visible = programmer control; Control/Status = hardware/OS control

---

### 4.2 Register Roles [7 pts]

**a) Program Counter (PC):**
- **Role:** Contains the address of the next instruction to fetch
- **Behavior:**
  - Automatically incremented after each instruction fetch
  - Updated on branches, jumps, subroutine calls
  - Saved on interrupts, restored on return
- **Critical for:** Controlling program flow

**b) Instruction Register (IR):**
- **Role:** Contains the instruction most recently fetched
- **Behavior:**
  - Loaded during fetch cycle
  - Used by control unit for decoding
  - Holds instruction until execution completes
- **Critical for:** Instruction decoding and execution

**c) Memory Address Register (MAR):**
- **Role:** Contains the address of a location in memory
- **Behavior:**
  - Holds address for memory read operations
  - Holds address for memory write operations
  - Connected to address bus
- **Critical for:** Memory addressing

**d) Memory Buffer Register (MBR):**
- **Role:** Contains data to be written to memory or data most recently read
- **Behavior:**
  - Holds data being written to memory
  - Holds data read from memory
  - Connected to data bus
- **Critical for:** Data transfer between CPU and memory

**Data Flow Example (Memory Read):**
1. PC → MAR (address of instruction)
2. Memory → MBR (instruction data)
3. MBR → IR (instruction loaded)
4. For operand: Address → MAR, Memory → MBR, MBR → Register

---

## Problem 5: I/O Systems and DMA Solutions

### 5.1 Memory-Mapped vs Isolated I/O [10 pts]

**a) Address Space Organization:**

**Memory-Mapped I/O:**
- I/O and memory share **single address space**
- Combined total of memory and I/O addresses
- Example: 10-bit address = 1024 locations total (can be 512 memory + 512 I/O)

**Isolated I/O:**
- **Separate address spaces** for memory and I/O
- Memory: Full address space (e.g., 1024 locations)
- I/O: Separate address space (e.g., 1024 I/O ports)
- Total: More addressable locations

**b) Instruction Set Requirements:**

**Memory-Mapped I/O:**
- **No special I/O instructions** needed
- Uses same instructions as memory (LOAD, STORE, etc.)
- Can use all memory access instructions
- Example: `LOAD R1, [I/O_PORT]` uses same instruction as `LOAD R1, [MEMORY]`

**Isolated I/O:**
- **Special I/O instructions** required
- Limited set: IN, OUT, Test I/O
- Cannot use memory instructions for I/O
- Example: `IN R1, PORT5` (special instruction)

**c) Advantages and Disadvantages:**

**Memory-Mapped I/O:**
- **Advantages:**
  - Large instruction set available (all memory instructions)
  - Flexible addressing
  - Simpler instruction set
- **Disadvantages:**
  - Reduces memory address space
  - Memory and I/O compete for addresses

**Isolated I/O:**
- **Advantages:**
  - Full memory address space available
  - Clear separation between memory and I/O
  - No address space competition
- **Disadvantages:**
  - Limited I/O instructions
  - Less flexible than memory-mapped
  - More complex instruction set

**Modern Practice:** Memory-mapped I/O is more common for flexibility.

---

### 5.2 DMA Performance Calculation [10 pts]

**Given:**
- Data size: 64 KB = 65,536 bytes
- Transfer rate: 10 MB/s = 10,000,000 bytes/s
- CPU speed: 2 GHz = 2,000,000,000 instructions/s
- Interrupt-driven: 100 cycles per 4-byte transfer

**a) DMA Transfer Time:**
```
Transfer time = Data size / Transfer rate
Transfer time = 65,536 bytes / 10,000,000 bytes/s
Transfer time = 0.0065536 seconds = 6.55 ms
```

**b) CPU Instructions During DMA:**
```
CPU instructions = CPU speed × Transfer time
CPU instructions = 2,000,000,000 × 0.0065536
CPU instructions = 13,107,200 instructions
```

**c) Comparison with Interrupt-Driven I/O:**

**Interrupt-Driven I/O:**
- Number of transfers = 65,536 / 4 = 16,384 transfers
- CPU cycles per transfer = 100 cycles
- Total CPU cycles = 16,384 × 100 = 1,638,400 cycles
- CPU time = 1,638,400 / 2,000,000,000 = 0.0008192 s = 0.82 ms
- **But:** CPU is tied up during this time, cannot do other work

**DMA:**
- CPU only involved at start and end
- Setup: ~1000 cycles = 0.0005 ms
- Completion interrupt: ~1000 cycles = 0.0005 ms
- **Total CPU time: ~0.001 ms**
- **CPU free for 6.55 ms to do other work**

**Comparison:**
- **DMA:** CPU free for 6.55 ms, can execute 13+ million instructions
- **Interrupt-Driven:** CPU tied up for 0.82 ms, cannot do other work
- **DMA is much more efficient** - CPU can do useful work during transfer

**Key Insight:** For large transfers, DMA allows CPU to do other work, while interrupt-driven I/O ties up CPU.

---

## Problem 6: Bus Architecture Solutions

### 6.1 Dedicated vs Multiplexed Bus [8 pts]

**a) Number of Physical Lines:**

**Dedicated Bus:**
- Separate lines for address and data
- Example: 32-bit system
  - 32 address lines
  - 32 data lines
  - Control lines
  - **Total: 64+ lines**

**Multiplexed Bus:**
- Shared lines for address and data
- Example: 32-bit system
  - 32 shared address/data lines
  - Control lines (including ALE - Address Latch Enable)
  - **Total: 32+ lines**

**Multiplexed requires fewer lines** (approximately half)

**b) Performance Characteristics:**

**Dedicated Bus:**
- **Faster:** Can transfer address and data simultaneously (in some cases)
- **Better performance:** No need to multiplex
- **Higher bandwidth:** Parallel address and data transfer

**Multiplexed Bus:**
- **Slower:** Requires two cycles (address, then data)
- **Lower performance:** Multiplexing overhead
- **Lower bandwidth:** Sequential address/data transfer

**c) Cost:**

**Dedicated Bus:**
- **Higher cost:** More physical lines (wires)
- More complex physical layout
- More pins on chips

**Multiplexed Bus:**
- **Lower cost:** Fewer physical lines
- Simpler physical layout
- Fewer pins on chips

**d) Use Cases:**

**Dedicated Bus:**
- High-performance systems
- Where speed is critical
- When cost is less important

**Multiplexed Bus:**
- Cost-sensitive systems
- Embedded systems
- When pin count is limited
- Lower performance acceptable

**Modern Practice:** Most modern systems use dedicated buses for performance, but multiplexed is still used in cost-sensitive applications.

---

### 6.2 Synchronous vs Asynchronous Timing [6 pts]

**a) How Each Works:**

**Synchronous Timing:**
- Uses **common clock signal** on control bus
- All devices read same clock
- Events synchronized to clock edges (usually rising edge)
- Single clock cycle per event
- Timing determined by clock period

**Asynchronous Timing:**
- **No common clock**
- Uses **handshaking signals** (REQ/ACK)
- Initiator asserts REQ (request)
- Target responds with ACK (acknowledge)
- Timing determined by device speeds, not fixed clock

**b) Advantages and Disadvantages:**

**Synchronous:**
- **Advantages:**
  - Simple to implement
  - Predictable timing
  - Easy to design for
- **Disadvantages:**
  - Limited by slowest device
  - Clock skew problems at high speeds
  - Inflexible (all devices must use same clock)

**Asynchronous:**
- **Advantages:**
  - Works with devices of different speeds
  - No clock skew issues
  - More flexible
- **Disadvantages:**
  - More complex control logic
  - Harder to design
  - Variable timing (harder to predict)

**c) When Each is Preferred:**

**Synchronous:**
- High-speed systems
- When all devices can operate at same speed
- When simplicity is important
- Most modern high-speed buses

**Asynchronous:**
- Systems with mixed-speed devices
- Legacy device compatibility
- When flexibility is more important than speed
- Some I/O buses

---

### 6.3 Bus Transfer Rate Calculation [6 pts]

**Given:**
- Data bus width: 32 bits = 4 bytes
- Bus frequency: 200 MHz = 200,000,000 cycles/s

**a) Maximum Transfer Rate:**
```
Transfer rate = Bus width × Frequency
Transfer rate = 4 bytes × 200,000,000 cycles/s
Transfer rate = 800,000,000 bytes/s
Transfer rate = 800 MB/s
```

**b) Time to Transfer 1 MB:**
```
Data size = 1 MB = 1,048,576 bytes
Transfer time = Data size / Transfer rate
Transfer time = 1,048,576 / 800,000,000
Transfer time = 0.00131072 seconds
Transfer time = 1.31 ms
```

**Answer:**
- Maximum transfer rate: **800 MB/s**
- Time for 1 MB: **1.31 ms**

---

**End of Solution Guide**
