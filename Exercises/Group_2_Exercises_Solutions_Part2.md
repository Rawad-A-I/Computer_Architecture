# Group 2: CPU Architecture & Instruction Execution
## Comprehensive Exercise Solutions - Part 2

**Chapter 16: Processor Structure & Function**

---

## Table of Contents
1. [Short Answer Solutions (Sections 1-5)](#short-answer-solutions-sections-1-5)
2. [Short Answer Solutions (Sections 6-9)](#short-answer-solutions-sections-6-9)

---

## Short Answer Solutions (Sections 1-5)

### Section 1: Processor Organization

**SA 1.1** List and briefly describe the five fundamental operations that a processor must perform.

**Answer:**

1. **Fetch Instruction:**
   - Retrieve the next instruction from memory
   - Instruction is read from the address in the Program Counter
   - Instruction is loaded into the Instruction Register
   - PC is incremented to point to next instruction

2. **Interpret Instruction (Decode):**
   - Determine what operation the instruction specifies
   - Decode the opcode to identify operation type
   - Determine operand locations (registers, memory, immediate)
   - Generate control signals needed for execution

3. **Fetch Data:**
   - Retrieve operands needed for instruction execution
   - Operands may come from:
     - Registers (fastest)
     - Memory (slower)
     - I/O modules (for I/O operations)
   - Not all instructions require data fetch (some operate on registers only)

4. **Process Data:**
   - Perform the actual computation
   - Operations include:
     - Arithmetic: ADD, SUBTRACT, MULTIPLY, DIVIDE
     - Logical: AND, OR, NOT, XOR, SHIFT, ROTATE
     - Comparison: Compare values, set condition codes
   - Typically performed in the ALU (Arithmetic Logic Unit)

5. **Write Data:**
   - Store results of computation
   - Results may be written to:
     - Registers (fastest)
     - Memory (slower)
     - I/O modules (for output operations)
   - Condition codes may also be updated

---

**SA 1.2** Why does the processor need temporary storage? What is used for this purpose?

**Answer:**

**Why Temporary Storage is Needed:**

1. **Instructions Being Executed:**
   - Current instruction must be held while it's being decoded and executed
   - Stored in Instruction Register (IR)

2. **Operands Being Processed:**
   - Data values needed for operations
   - Intermediate values during calculations
   - Stored in general-purpose registers

3. **Intermediate Results:**
   - Values produced during multi-step operations
   - Results before final storage
   - Stored in registers

4. **Control Information:**
   - Program Counter (PC) - current execution point
   - Processor Status Word (PSW) - condition codes, flags
   - Control signals and state information

**What is Used:**

- **CPU Registers** provide temporary storage:
  - Fastest form of storage (nanosecond access)
  - Small capacity (typically 16-64 registers)
  - Located within the CPU
  - Much faster than main memory

**Memory Hierarchy:**
- Registers (fastest, smallest) → Cache → Main Memory → Secondary Storage (slowest, largest)
- Registers are at the top of this hierarchy for speed

---

**SA 1.3** Explain the memory hierarchy from fastest to slowest, and why this hierarchy exists.

**Answer:**

**Memory Hierarchy (Fastest to Slowest):**

1. **CPU Registers:**
   - Speed: < 1 nanosecond
   - Size: 16-64 registers (typically 32-64 bits each)
   - Cost: Most expensive per bit
   - Location: Inside CPU

2. **Cache Memory:**
   - Speed: 1-10 nanoseconds
   - Size: KB to MB
   - Cost: Very expensive per bit
   - Location: On-chip or very close to CPU

3. **Main Memory (RAM):**
   - Speed: 10-100 nanoseconds
   - Size: GB to TB
   - Cost: Moderate per bit
   - Location: Separate from CPU, connected via bus

4. **Secondary Storage (Disk/SSD):**
   - Speed: Microseconds to milliseconds
   - Size: TB to PB
   - Cost: Cheapest per bit
   - Location: External storage devices

**Why This Hierarchy Exists:**

1. **Speed vs. Cost Trade-off:**
   - Faster memory is more expensive
   - Slower memory is cheaper
   - Hierarchy balances speed and cost

2. **Capacity vs. Speed Trade-off:**
   - Faster memory is smaller
   - Slower memory is larger
   - Need both speed and capacity

3. **Locality of Reference:**
   - Programs access small amounts of data frequently
   - Keep frequently used data in fast memory
   - Move less-used data to slower memory

4. **Performance Optimization:**
   - Most accesses go to fast memory (registers, cache)
   - Average access time is much better than if only slow memory existed
   - System appears fast while using cheaper storage

**Principle:** Small, fast, expensive memory for active data; large, slow, cheap memory for bulk storage.

---

**SA 1.4** Describe what happens during the "Process Data" operation. Where does it occur?

**Answer:**

**What Happens During "Process Data":**

1. **Operands are Prepared:**
   - Data values are routed to the ALU inputs
   - Operands may come from registers, memory, or be immediate values

2. **Operation is Performed:**
   - ALU performs the specified operation based on opcode
   - **Arithmetic Operations:**
     - Addition, subtraction, multiplication, division
     - May handle signed/unsigned arithmetic
   - **Logical Operations:**
     - AND, OR, NOT, XOR
     - Bitwise operations
   - **Shift/Rotate Operations:**
     - Logical shifts, arithmetic shifts
     - Rotations (left/right)
   - **Comparison Operations:**
     - Compare two values
     - Set condition codes based on result

3. **Result is Generated:**
   - ALU produces the result
   - Result may be a data value or condition codes

4. **Condition Codes are Set:**
   - Zero flag: result is zero
   - Sign flag: result is negative
   - Carry flag: arithmetic produced carry
   - Overflow flag: signed arithmetic overflow
   - These flags are stored in PSW

**Where It Occurs:**

- **Location: ALU (Arithmetic Logic Unit)**
  - ALU is a component within the CPU
  - Connected to registers via internal data paths
  - Receives control signals from Control Unit
  - Performs all arithmetic and logical operations

**Data Flow:**
```
Registers → ALU Inputs → ALU Operation → ALU Output → Result Register
                                    ↓
                            Condition Codes → PSW
```

**Timing:**
- Typically takes 1 clock cycle for simple operations
- Complex operations (multiply, divide) may take multiple cycles
- Result is available at the end of the execute cycle

---

### Section 2: CPU Internal Structure

**SA 2.1** Describe the function of the Memory Address Register (MAR) and Memory Buffer Register (MBR).

**Answer:**

**Memory Address Register (MAR):**

**Function:**
- Holds the address of the memory location to be accessed
- Acts as interface between CPU and address bus

**Usage:**
- **During Memory Read:**
  1. CPU places address in MAR
  2. Address is sent to memory via address bus
  3. Memory uses address to locate data
- **During Memory Write:**
  1. CPU places destination address in MAR
  2. Address sent to memory
  3. Memory uses address to determine where to write

**Characteristics:**
- Size matches address bus width (e.g., 32 bits for 32-bit addresses)
- Unidirectional: addresses flow from CPU to memory
- Connected to address bus
- Part of CPU-memory interface

**Memory Buffer Register (MBR) / Memory Data Register (MDR):**

**Function:**
- Holds data being transferred to/from memory
- Acts as interface between CPU and data bus

**Usage:**
- **During Memory Read:**
  1. Memory places data on data bus
  2. Data is loaded into MBR
  3. CPU reads data from MBR
- **During Memory Write:**
  1. CPU places data in MBR
  2. Data is sent to memory via data bus
  3. Memory reads data from bus

**Characteristics:**
- Size matches data bus width (e.g., 32 or 64 bits)
- Bidirectional: data flows both ways
- Connected to data bus
- Part of CPU-memory interface

**Working Together:**
- MAR specifies WHERE (address)
- MBR holds WHAT (data)
- Together they enable CPU-memory communication

---

**SA 2.2** Explain how data flows during a memory read operation in the CPU.

**Answer:**

**Memory Read Operation Data Flow:**

1. **Address Setup:**
   - Program Counter (PC) or instruction specifies memory address
   - Address is placed in Memory Address Register (MAR)
   - MAR is connected to address bus

2. **Read Request:**
   - Control Unit generates Read control signal
   - Read signal is sent on control bus to memory
   - Address from MAR is sent on address bus to memory

3. **Memory Access:**
   - Memory receives address and read signal
   - Memory locates data at specified address
   - Memory places data on data bus

4. **Data Transfer:**
   - Data flows from memory → data bus → Memory Buffer Register (MBR)
   - MBR receives the data read from memory

5. **Data Use:**
   - Data in MBR can be:
     - Transferred to Instruction Register (if reading instruction)
     - Transferred to general-purpose register (if reading data)
     - Used directly by ALU (if operand)

**Detailed Flow Diagram:**

```
CPU Side:                    Memory Side:
┌─────────┐                  ┌──────────┐
│   PC    │                  │          │
│  (addr) │                  │          │
└────┬────┘                  │          │
     │                       │          │
     ▼                       │          │
┌─────────┐    Address Bus  │          │
│   MAR   │─────────────────►│ Memory   │
└─────────┘                  │          │
     │                       │          │
     │    Control Bus        │          │
     │    (Read signal)      │          │
     └───────────────────────►│          │
                             │          │
                             │   Data   │
                             │   (read) │
                             │          │
┌─────────┐    Data Bus     │          │
│   MBR   │◄─────────────────┘          │
└────┬────┘                  └──────────┘
     │
     ▼
┌─────────┐
│   IR    │  (if instruction)
│ or Reg  │  (if data)
└─────────┘
```

**Timing:**
- Address setup: 1 cycle
- Memory access: Multiple cycles (depends on memory speed)
- Data transfer: 1 cycle
- Total: Several cycles (memory is slower than CPU)

---

**SA 2.3** What is the internal CPU data path, and what does it connect?

**Answer:**

**Internal CPU Data Path:**

**Definition:**
- A network of connections (wires, buses) that link CPU components internally
- Allows data to flow between CPU components
- Separate from but connected to the system bus

**What It Connects:**

1. **ALU (Arithmetic Logic Unit):**
   - Connected to register file for operands
   - Connected to register file for results
   - Receives control signals from Control Unit

2. **Register File:**
   - General-purpose registers
   - Connected to ALU inputs/outputs
   - Connected to MBR for memory operations
   - Connected to IR for instruction operands

3. **Special-Purpose Registers:**
   - Program Counter (PC)
   - Instruction Register (IR)
   - Memory Address Register (MAR)
   - Memory Buffer Register (MBR)
   - Processor Status Word (PSW)

4. **Control Unit:**
   - Generates control signals
   - Controls data path routing
   - Decodes instructions

**Data Path Structure:**

```
                    ┌──────────┐
                    │ Control  │
                    │   Unit   │
                    └────┬─────┘
                         │ (control signals)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌────────┐      ┌─────────┐      ┌──────┐
   │Register│──────►│   ALU   │──────►│Register│
   │  File  │      └─────────┘      │  File  │
   └───┬────┘                        └──────┘
       │                                    │
       │                                    │
   ┌───┴────┐                          ┌───┴────┐
   │  MAR   │                          │  MBR   │
   └───┬────┘                          └───┬────┘
       │                                    │
       └────────── System Bus ──────────────┘
```

**Functions:**
- Routes operands to ALU
- Routes results from ALU to registers
- Connects registers to memory interface (MAR/MBR)
- Enables data movement within CPU

**Characteristics:**
- Internal to CPU (not visible externally)
- Much faster than system bus
- Width matches register size (typically 32 or 64 bits)
- Controlled by Control Unit

---

**SA 2.4** How does the CPU connect to the system bus? What components are involved?

**Answer:**

**CPU-System Bus Connection:**

**Components Involved:**

1. **Memory Address Register (MAR):**
   - **Connection:** To address bus
   - **Function:** Sends memory addresses to memory
   - **Direction:** CPU → Memory (unidirectional)

2. **Memory Buffer Register (MBR):**
   - **Connection:** To data bus
   - **Function:** Transfers data to/from memory
   - **Direction:** Bidirectional (CPU ↔ Memory)

3. **Control Unit:**
   - **Connection:** To control bus
   - **Function:** Sends control signals (Read, Write, Interrupt, etc.)
   - **Direction:** Mostly CPU → Memory/I/O (some signals bidirectional)

**Connection Architecture:**

```
                    CPU
        ┌───────────────────────────┐
        │                           │
        │  ┌────┐    ┌────┐        │
        │  │ MAR│    │ MBR│        │
        │  └──┬─┘    └──┬─┘        │
        │     │         │           │
        │     │         │           │
        │  ┌──▼─────────▼──┐        │
        │  │  Control Unit │        │
        │  └──┬────────────┘        │
        │     │                     │
        └─────┼─────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
Address    Data     Control
  Bus       Bus       Bus
    │         │         │
    └─────────┼─────────┘
              │
        System Bus
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
 Memory    I/O      Other
          Modules   Devices
```

**Data Flow Examples:**

**Memory Read:**
1. CPU places address in MAR → Address Bus → Memory
2. Control Unit sends Read signal → Control Bus → Memory
3. Memory places data → Data Bus → MBR

**Memory Write:**
1. CPU places address in MAR → Address Bus → Memory
2. CPU places data in MBR → Data Bus → Memory
3. Control Unit sends Write signal → Control Bus → Memory

**Key Points:**
- MAR, MBR, and Control Unit act as interfaces
- System bus is shared by all components (CPU, Memory, I/O)
- Bus arbitration ensures only one component uses bus at a time
- Internal CPU operations don't use system bus (use internal data path)

---

### Section 3: Register Organization

**SA 3.1** Distinguish between user-visible registers and control/status registers. Give examples of each.

**Answer:**

**User-Visible Registers:**

**Definition:**
- Registers that can be explicitly referenced in machine or assembly language
- Accessible to programmers for storing data and addresses
- Can be used directly in instructions

**Examples:**
- **General-Purpose Registers:** R0, R1, R2, ... (can hold data or addresses)
- **Data Registers:** D0, D1, D2, ... (specifically for data values)
- **Address Registers:** A0, A1, A2, ... (specifically for memory addresses)
- **Accumulator:** ACC (used for arithmetic operations)

**Characteristics:**
- Programmers can read/write these registers
- Used for temporary storage, operands, results
- Part of the instruction set architecture

---

**Control and Status Registers:**

**Definition:**
- Registers used by the control unit and operating system
- Not directly accessible to user programs
- Manage processor operation and system state

**Examples:**
- **Program Counter (PC):** Contains address of next instruction
- **Instruction Register (IR):** Holds current instruction
- **Memory Address Register (MAR):** Holds memory address
- **Memory Buffer Register (MBR):** Holds data for memory transfer
- **Processor Status Word (PSW):** Contains condition codes and control bits

**Characteristics:**
- Managed by processor, not directly accessible to user
- Essential for instruction execution control
- Saved/restored during context switches

**Key Differences:**

| Aspect | User-Visible | Control/Status |
|--------|--------------|----------------|
| Accessibility | Direct access in code | Managed by processor |
| Purpose | Data/address storage | Control/status info |
| Modification | By instructions | By processor/OS |
| Examples | R0-R31, ACC | PC, IR, MAR, PSW |

---

**SA 3.2** What are general-purpose registers, and how do they differ from specialized registers?

**Answer:**

**General-Purpose Registers:**

**Definition:**
- Registers that can be used for multiple purposes
- Flexible - can hold data, addresses, or intermediate results
- Not restricted to a single function

**Characteristics:**
- **Versatility:** Can be used for various operations
- **Flexibility:** Same register can hold data in one instruction, address in another
- **Uniformity:** All general-purpose registers are equivalent
- **Efficiency:** Reduces need for data movement between specialized registers

**Advantages:**
- More flexible programming
- Better register utilization
- Simpler instruction set
- Easier compiler optimization

**Example Usage:**
```
ADD R1, R2, R3    ; R1, R2, R3 used for data
LOAD R1, 1000     ; R1 used for address
MOVE R2, R1       ; R2 used for data, R1 as source
```

---

**Specialized Registers:**

**Definition:**
- Registers designed for specific purposes
- Each register has a dedicated function
- Cannot be used interchangeably

**Types:**
- **Data Registers:** Only for data values (D0, D1, ...)
- **Address Registers:** Only for addresses (A0, A1, ...)
- **Accumulator:** Only for arithmetic operations (ACC)
- **Index Registers:** Only for indexing (IX, IY)

**Characteristics:**
- **Dedicated Function:** Each register has specific purpose
- **Restrictions:** Cannot use address register for data, etc.
- **Hardware Optimization:** Can be optimized for specific function
- **Clear Semantics:** Purpose is explicit

**Advantages:**
- Hardware can be optimized for specific function
- Clear separation of concerns
- May allow parallel operations

**Disadvantages:**
- Less flexible
- May require more data movement
- More complex instruction set
- Potential underutilization

**Comparison:**

| Aspect | General-Purpose | Specialized |
|--------|----------------|-------------|
| Flexibility | High | Low |
| Versatility | Can do multiple things | Single purpose |
| Register Utilization | Better | May be worse |
| Instruction Complexity | Simpler | More complex |
| Hardware Optimization | Less specific | More specific |

**Modern Trend:**
- Most modern architectures use general-purpose registers
- RISC architectures (MIPS, ARM) use general-purpose registers
- Some architectures use hybrid approach

---

**SA 3.3** Explain what condition codes (flags) are and how they are used.

**Answer:**

**Condition Codes (Flags):**

**Definition:**
- Bits in the Processor Status Word (PSW) that indicate the result of previous operations
- Set automatically by the ALU based on operation results
- Used by conditional branch instructions

**Common Flags:**

1. **Zero Flag (Z):**
   - Set to 1 if result is zero
   - Set to 0 if result is non-zero
   - Used for equality comparisons

2. **Sign Flag (S/N):**
   - Set to 1 if result is negative (MSB = 1)
   - Set to 0 if result is positive or zero
   - Used for signed comparisons

3. **Carry Flag (C):**
   - Set to 1 if arithmetic operation produced carry
   - Set to 0 if no carry
   - Used for unsigned arithmetic, multi-precision operations

4. **Overflow Flag (V):**
   - Set to 1 if signed arithmetic overflow occurred
   - Set to 0 if no overflow
   - Used for error detection in signed arithmetic

5. **Parity Flag (P):**
   - Set based on number of 1s in result (even/odd parity)
   - Used for error detection

**How They Are Set:**

- Automatically by ALU after arithmetic/logical operations
- Based on operation result
- Example:
  ```
  ADD R1, R2, R3    ; R1 = R2 + R3
  ; ALU automatically sets:
  ; Z = 1 if R1 == 0
  ; S = 1 if R1 < 0
  ; C = 1 if addition produced carry
  ; V = 1 if signed overflow
  ```

**How They Are Used:**

1. **Conditional Branching:**
   ```
   ADD R1, R2, R3    ; Sets flags
   BEQ R1, R0, Label ; Branch if Z flag set (R1 == 0)
   BGT R1, R0, Label ; Branch if S flag clear and Z flag clear (R1 > 0)
   ```

2. **Conditional Execution:**
   - Some architectures allow conditional execution based on flags
   - Reduces need for branches

3. **Multi-Precision Arithmetic:**
   ```
   ADD R1, R2, R3    ; Sets carry flag
   ADC R4, R5, R6    ; Add with carry (for multi-word addition)
   ```

4. **Error Detection:**
   - Overflow flag indicates arithmetic errors
   - Can trigger exceptions or error handling

**Example Usage:**

```
; Compare two numbers
SUB R1, R2, R3      ; R1 = R2 - R3, sets flags
BLT Label           ; Branch if R2 < R3 (sign flag set)
BGT Label2          ; Branch if R2 > R3 (sign clear, zero clear)
BEQ Label3          ; Branch if R2 == R3 (zero flag set)
```

**Key Points:**
- Flags are set automatically (no explicit instruction needed)
- Flags persist until next operation that sets them
- Flags enable efficient conditional operations
- Essential for program flow control

---

**SA 3.4** Describe the Program Status Word (PSW) and what information it contains.

**Answer:**

**Program Status Word (PSW):**

**Definition:**
- A register (or set of registers) containing condition codes plus other status and control information
- Represents the complete processor state
- Critical for context switching and interrupt handling

**Contents:**

1. **Condition Codes (Flags):**
   - **Zero (Z):** Result is zero
   - **Sign (S/N):** Result is negative
   - **Carry (C):** Arithmetic produced carry
   - **Overflow (V):** Signed arithmetic overflow
   - **Parity (P):** Even/odd parity
   - **Auxiliary Carry (AC):** BCD arithmetic

2. **Interrupt Control:**
   - **Interrupt Enable (I):** Master interrupt enable/disable
   - **Interrupt Mask:** Which interrupts are enabled
   - **Interrupt Priority:** Current interrupt priority level

3. **Processor Mode:**
   - **Supervisor/User Mode (S):** Kernel mode vs. user mode
   - **Privilege Level:** Access control level

4. **Other Status:**
   - **Trap Flag:** Single-step debugging
   - **Direction Flag:** String operation direction
   - **Virtualization:** Virtual machine state

**PSW Structure Example:**

```
PSW (32 bits):
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│S │Z │C │V │P │I │M │...│
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
 │  │  │  │  │  │  │
 │  │  │  │  │  │  └─ Mode (Supervisor/User)
 │  │  │  │  │  └───── Interrupt Enable
 │  │  │  │  └───────── Parity
 │  │  │  └───────────── Overflow
 │  │  └───────────────── Carry
 │  └───────────────────── Zero
 └───────────────────────── Sign
```

**Usage:**

1. **Conditional Branching:**
   - Branch instructions check condition codes
   - Determine program flow based on flags

2. **Interrupt Handling:**
   - PSW saved when interrupt occurs
   - PSW restored when interrupt handler completes
   - Interrupt enable bits control interrupt processing

3. **Context Switching:**
   - PSW saved when switching between processes
   - PSW restored when process resumes
   - Preserves processor state

4. **Privilege Control:**
   - Mode bits control access to privileged instructions
   - User programs cannot execute privileged operations
   - OS runs in supervisor mode

**Operations on PSW:**

- **Automatic Updates:** Condition codes set by ALU operations
- **Explicit Updates:** Some instructions can modify PSW bits
- **Save/Restore:** PSW saved/restored during interrupts and context switches
- **Privileged Access:** Some PSW bits only modifiable in supervisor mode

**Importance:**
- PSW represents complete processor state
- Essential for correct program execution
- Critical for system security and protection
- Must be preserved across context switches

---

**SA 3.5** What is the difference between data registers and address registers?

**Answer:**

**Data Registers:**

**Purpose:**
- Specifically designed to hold data values
- Used for arithmetic and logical operations
- Store operands and results

**Characteristics:**
- Hold numeric values (integers, floating-point)
- Used as operands for ALU operations
- Typically 32 or 64 bits wide
- Can hold signed or unsigned values

**Usage:**
```
ADD D0, D1, D2     ; D0, D1, D2 are data registers
MUL D3, D4, D5     ; Data registers for multiplication
AND D6, D7, D8     ; Data registers for logical operations
```

**Limitations:**
- Cannot be used directly for memory addressing
- May need to transfer value to address register for memory access

---

**Address Registers:**

**Purpose:**
- Specifically designed to hold memory addresses
- Used for memory addressing and pointer operations
- Store base addresses, offsets, pointers

**Characteristics:**
- Hold memory addresses (typically 32 or 64 bits)
- Used for calculating effective addresses
- Can be used in address calculation modes
- May support auto-increment/decrement

**Usage:**
```
LOAD D0, (A0)      ; A0 is address register, D0 is data register
STORE D1, (A1)     ; A1 holds address, D1 holds data
ADD A2, A3, #4     ; Address arithmetic (pointer arithmetic)
```

**Capabilities:**
- Can be used in various addressing modes
- May support indexing and offset calculation
- Often used for array and structure access

---

**Key Differences:**

| Aspect | Data Registers | Address Registers |
|--------|---------------|-------------------|
| **Purpose** | Hold data values | Hold memory addresses |
| **Operations** | Arithmetic, logical | Address calculation |
| **Memory Access** | Cannot address directly | Can be used for addressing |
| **Width** | Matches data width | Matches address width |
| **Usage** | Operands, results | Pointers, base addresses |

**Example Showing Both:**

```
; Data operation
ADD D0, D1, D2     ; D0 = D1 + D2 (data registers)

; Memory access
MOVE A0, #1000     ; A0 = 1000 (address register)
LOAD D3, (A0)      ; D3 = memory[A0] (A0 provides address, D3 receives data)
STORE D4, (A0)     ; memory[A0] = D4 (A0 provides address, D4 provides data)
```

**Modern Architectures:**
- Many modern architectures use general-purpose registers (can be both)
- RISC architectures (MIPS, ARM) don't distinguish
- CISC architectures (x86) may have some specialization
- Trend is toward general-purpose registers for flexibility

---

*[Continued in next part with Sections 4-9...]*


