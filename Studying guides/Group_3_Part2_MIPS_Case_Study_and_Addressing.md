# Group 3: Instruction Set Architecture (ISA)
## Part 2: MIPS Case Study and Addressing Modes
## Detailed Study Guide

**Chapters 12-13: Instruction Sets & Addressing Modes (Part 2)**

---

## Table of Contents
1. [MIPS Architecture Overview](#mips-architecture-overview)
2. [MIPS Instruction Formats](#mips-instruction-formats)
3. [Register Operands](#register-operands)
4. [Memory Operands and Load/Store](#memory-operands-and-loadstore)
5. [Immediate Operands](#immediate-operands)
6. [Conditional Operations](#conditional-operations)
7. [Addressing Modes](#addressing-modes)
8. [MIPS Addressing Modes](#mips-addressing-modes)
9. [Procedures and Stack Usage](#procedures-and-stack-usage)
10. [MIPS Design Principles](#mips-design-principles)
11. [Key Concepts Summary](#key-concepts-summary)
12. [Practice Problems and Examples](#practice-problems-and-examples)

---

## MIPS Architecture Overview

### MIPS Characteristics

**MIPS (Microprocessor without Interlocked Pipeline Stages):**
- Classic RISC architecture
- Simple, regular instruction set
- Designed for efficient pipelining
- Widely used in education and embedded systems

#### Key Features:

1. **Word Size:** 32 bits
2. **Memory:** Byte-addressable (each address refers to 1 byte)
3. **Instructions:** All instructions are 32 bits (fixed length)
4. **Opcode:** 6 bits (allows up to 64 different operations)
5. **Instruction Types:** 3 main formats (R, I, J)

### Memory Organization

**Byte Addressing:**
- Each memory address refers to 1 byte (8 bits)
- Words are 32 bits = 4 bytes
- Word addresses must be **aligned** (multiple of 4)

**Example:**
```
Address:  0    1    2    3    4    5    6    7
Bytes:    [B0] [B1] [B2] [B3] [B4] [B5] [B6] [B7]
          └───────── Word 0 ─────────┘ └───────── Word 1 ─────────┘
```

**Word Alignment:**
- Valid word addresses: 0, 4, 8, 12, 16, ...
- Invalid word addresses: 1, 2, 3, 5, 6, 7, ...
- Hardware enforces alignment (exception if misaligned)

### Endianness

**Big Endian (MIPS default):**
- Most significant byte at lowest address
- Example: 32-bit value 0x12345678 at address 100
  - Address 100: 0x12 (most significant)
  - Address 101: 0x34
  - Address 102: 0x56
  - Address 103: 0x78 (least significant)

**Little Endian:**
- Least significant byte at lowest address
- Example: 32-bit value 0x12345678 at address 100
  - Address 100: 0x78 (least significant)
  - Address 101: 0x56
  - Address 102: 0x34
  - Address 103: 0x12 (most significant)

**Why It Matters:**
- Data portability between systems
- Network byte order (usually big endian)
- File formats

---

## MIPS Instruction Formats

### Three Instruction Formats

MIPS uses **three instruction formats** to encode all instructions:

#### 1. R-Format (Register Format)

**Purpose:** Register-to-register operations

**Format:**
```
┌──────┬─────┬─────┬─────┬──────┬──────┐
│ op   │ rs  │ rt  │ rd  │shamt │funct │
│ 6    │ 5   │ 5   │ 5   │ 5    │ 6    │
└──────┴─────┴─────┴─────┴──────┴──────┘
```

**Fields:**
- **op (6 bits):** Operation code (usually 0x00 for R-format)
- **rs (5 bits):** First source register number (0-31)
- **rt (5 bits):** Second source register number (0-31)
- **rd (5 bits):** Destination register number (0-31)
- **shamt (5 bits):** Shift amount (for shift instructions)
- **funct (6 bits):** Function code (specifies actual operation)

**Examples:**
```
ADD $s0, $t0, $t1
op = 0x00, rs = $t0 (8), rt = $t1 (9), rd = $s0 (16), shamt = 0, funct = 0x20

SUB $s1, $s2, $s3
op = 0x00, rs = $s2 (18), rt = $s3 (19), rd = $s1 (17), shamt = 0, funct = 0x22
```

**Common R-Format Operations:**
- ADD, SUB, AND, OR, XOR, NOR
- SLT (Set on Less Than)
- SLL, SRL, SRA (shifts)
- JR (Jump Register)

#### 2. I-Format (Immediate Format)

**Purpose:** Immediate arithmetic, load/store, branches

**Format:**
```
┌──────┬─────┬─────┬──────────────────┐
│ op   │ rs  │ rt  │ constant/address │
│ 6    │ 5   │ 5   │ 16               │
└──────┴─────┴─────┴──────────────────┘
```

**Fields:**
- **op (6 bits):** Operation code
- **rs (5 bits):** Source register (base register for load/store)
- **rt (5 bits):** Target register (destination for load/immediate, source for store)
- **constant/address (16 bits):** Immediate value or address offset

**Uses:**
- **Immediate arithmetic:** `ADDI $t0, $t1, 100`
- **Load word:** `LW $t0, 8($s1)` (load from address $s1 + 8)
- **Store word:** `SW $t0, 8($s1)` (store to address $s1 + 8)
- **Branches:** `BEQ $t0, $t1, label` (branch if equal)

**Examples:**
```
ADDI $t0, $t1, 42
op = 0x08, rs = $t1 (9), rt = $t0 (8), constant = 42

LW $t0, 8($s1)
op = 0x23, rs = $s1 (17), rt = $t0 (8), offset = 8
```

**Limitations:**
- Immediate value: -2^15 to 2^15 - 1 (-32,768 to 32,767)
- Address offset: ±32KB range
- For larger values, use multiple instructions

#### 3. J-Format (Jump Format)

**Purpose:** Unconditional jumps

**Format:**
```
┌──────┬──────────────────────────────┐
│ op   │ address                      │
│ 6    │ 26                           │
└──────┴──────────────────────────────┘
```

**Fields:**
- **op (6 bits):** Operation code (0x02 for J, 0x03 for JAL)
- **address (26 bits):** Jump target address (26 bits)

**Address Calculation:**
- 26-bit address is concatenated with upper 4 bits of PC
- Allows jumping anywhere in 256MB region
- For full 32-bit address, use JR (Jump Register) with R-format

**Examples:**
```
J label
op = 0x02, address = label_address (26 bits)

JAL label  # Jump and Link (for function calls)
op = 0x03, address = label_address (26 bits)
```

### Instruction Format Summary

| Format | Opcode | Fields | Use |
|--------|--------|--------|-----|
| R | 6 bits | rs, rt, rd, shamt, funct | Register operations |
| I | 6 bits | rs, rt, immediate/offset | Immediate, load/store, branches |
| J | 6 bits | address | Jumps |

**Key Point:** All instructions are 32 bits, making decoding simple and regular.

---

## Register Operands

### MIPS Register File

**Organization:**
- **32 registers:** Each 32 bits wide
- **Numbered:** $0 to $31
- **Two read ports:** Can read two registers simultaneously
- **One write port:** Can write one register per cycle

**Register Naming Conventions:**
- **$0:** Always zero (hardwired to 0, cannot be written)
- **$1-$31:** General-purpose registers
- **Conventional names:**
  - `$t0-$t9` ($8-$15, $24-$25): Temporary registers (caller-saved)
  - `$s0-$s7` ($16-$23): Saved registers (callee-saved)
  - `$a0-$a3` ($4-$7): Argument registers
  - `$v0-$v1` ($2-$3): Return value registers
  - `$gp` ($28): Global pointer
  - `$sp` ($29): Stack pointer
  - `$fp` ($30): Frame pointer
  - `$ra` ($31): Return address

### Register Usage in Arithmetic

**Key Principle:** Arithmetic operations **only** work on registers.

**Example:**
```mips
ADD $s0, $t0, $t1    # $s0 = $t0 + $t1
                     # All operands are registers
```

**Why Registers?**
- **Speed:** Registers are fastest storage (in CPU)
- **Efficiency:** No memory access needed
- **Pipelining:** Register operations are easy to pipeline

**Compiler's Job:**
- Allocate variables to registers when possible
- Spill to memory when registers are full
- Minimize memory accesses

### Register File Access

**Read Operation:**
```
Read Port 1: rs → Register[rs]
Read Port 2: rt → Register[rt]
```

**Write Operation:**
```
Write Port: rd ← result (at end of instruction)
```

**Timing:**
- Read: Available in same cycle
- Write: Available in next cycle (pipeline consideration)

---

## Memory Operands and Load/Store

### Load-Store Architecture

**Principle:** Arithmetic operations only on registers. Memory accessed only through load/store instructions.

**Why?**
- **Simplicity:** Clear separation between memory and computation
- **Performance:** Registers are much faster than memory
- **Pipelining:** Easier to pipeline register operations

### Load Word (LW)

**Format:** `LW rt, offset(rs)`

**Operation:**
1. Calculate address: `address = Register[rs] + offset`
2. Read word from memory[address]
3. Store in register rt: `Register[rt] = memory[address]`

**Example:**
```mips
LW $t0, 8($s1)    # $t0 = memory[$s1 + 8]
                  # Load word at address ($s1 + 8) into $t0
```

**Breaking it down:**
- `$s1`: Base register (contains base address)
- `8`: Offset (constant, 16-bit signed: -32,768 to 32,767)
- `$t0`: Destination register

### Store Word (SW)

**Format:** `SW rt, offset(rs)`

**Operation:**
1. Calculate address: `address = Register[rs] + offset`
2. Write register to memory: `memory[address] = Register[rt]`

**Example:**
```mips
SW $t0, 8($s1)    # memory[$s1 + 8] = $t0
                  # Store $t0 to address ($s1 + 8)
```

**Breaking it down:**
- `$s1`: Base register
- `8`: Offset
- `$t0`: Source register (value to store)

### Array Access Example

**C Code:**
```c
g = h + A[8];
```

**Assumptions:**
- `g` in `$s1`
- `h` in `$s2`
- Base address of array `A` in `$s3`

**MIPS Code:**
```mips
LW $t0, 32($s3)    # $t0 = A[8]
                   # Offset = 8 × 4 = 32 (4 bytes per word)
ADD $s1, $s2, $t0  # $s1 = $s2 + $t0 (g = h + A[8])
```

**Why offset 32?**
- Array index: 8
- Bytes per word: 4
- Offset: 8 × 4 = 32 bytes

### Memory Alignment

**Requirement:** Word addresses must be multiples of 4.

**Valid:**
```
LW $t0, 0($s1)    # Address: $s1 + 0 (aligned if $s1 is aligned)
LW $t0, 4($s1)    # Address: $s1 + 4 (aligned)
LW $t0, 8($s1)    # Address: $s1 + 8 (aligned)
```

**Invalid:**
```
LW $t0, 1($s1)    # Address: $s1 + 1 (misaligned - exception!)
LW $t0, 2($s1)    # Address: $s1 + 2 (misaligned - exception!)
LW $t0, 3($s1)    # Address: $s1 + 3 (misaligned - exception!)
```

**Why Alignment?**
- Hardware simplification
- Performance (aligned access is faster)
- Some architectures require it

### Registers vs. Memory

**Comparison:**

| Aspect | Registers | Memory |
|--------|-----------|--------|
| **Quantity** | Small set (8-32) | Very large (millions) |
| **Speed** | Very fast (1 cycle) | Slower (many cycles) |
| **Access** | Direct (register number) | Indirect (address calculation) |
| **Use in MIPS** | Arithmetic operations | Data structures, arrays |
| **Instructions** | All arithmetic/logical | Only load/store |

**Compiler Strategy:**
- Keep frequently used variables in registers
- Spill less frequently used variables to memory
- Minimize load/store instructions

---

## Immediate Operands

### What are Immediate Operands?

**Definition:** Constants embedded directly in the instruction.

**Why Needed?**
- Programs often use constants (e.g., incrementing by 1, comparing to 0)
- Loading constants from memory is slow
- Immediate operands are fast (no memory access)

### Without Immediate Operands

**To add 4 to a register:**
```mips
# Load constant 4 from memory
LW $t0, AddrConstant4($s1)   # $t0 = 4 (from memory)
ADD $s3, $s3, $t0           # $s3 = $s3 + 4
```

**Problems:**
- Requires memory access (slow)
- Uses extra register ($t0)
- Two instructions instead of one

### With Immediate Operands

**To add 4 to a register:**
```mips
ADDI $s3, $s3, 4    # $s3 = $s3 + 4
                    # Constant 4 is in instruction
```

**Advantages:**
- No memory access (fast)
- Single instruction
- No extra register needed

### Immediate Instruction Format

**I-Format:**
```
ADDI rt, rs, immediate
     │   │   └─► 16-bit signed constant
     │   └─────► Source register
     └─────────► Destination register
```

**Range:**
- 16-bit signed: -32,768 to 32,767
- For larger constants, use multiple instructions

### Common Immediate Operations

**Arithmetic:**
```mips
ADDI $t0, $t1, 100    # $t0 = $t1 + 100
SUBI $t0, $t1, 50    # $t0 = $t1 - 50 (pseudo-instruction)
```

**Logical:**
```mips
ANDI $t0, $t1, 0xFF   # $t0 = $t1 AND 0xFF (mask lower 8 bits)
ORI  $t0, $t1, 0x80   # $t0 = $t1 OR 0x80 (set bit 7)
```

**Comparison:**
```mips
SLTI $t0, $t1, 100    # $t0 = 1 if $t1 < 100, else 0
```

### Loading Large Constants

**Problem:** 16-bit immediate can only hold -32,768 to 32,767.

**Solution:** Use two instructions (LUI + ORI/ADDI)

**Example: Load 0x12345678 into $t0:**
```mips
LUI $t0, 0x1234       # Load Upper Immediate
                      # $t0 = 0x12340000
ORI $t0, $t0, 0x5678  # $t0 = 0x12345678
```

**LUI (Load Upper Immediate):**
- Loads 16-bit immediate into upper 16 bits
- Lower 16 bits set to 0
- Then use ORI/ADDI to set lower 16 bits

---

## Conditional Operations

### Branch Instructions

**Purpose:** Alter program flow based on conditions.

**Format:** `BEQ rs, rt, label` or `BNE rs, rt, label`

**BEQ (Branch if Equal):**
```mips
BEQ $t0, $t1, label
    # If $t0 == $t1, jump to label
    # Otherwise, continue to next instruction
```

**BNE (Branch if Not Equal):**
```mips
BNE $t0, $t1, label
    # If $t0 != $t1, jump to label
    # Otherwise, continue to next instruction
```

### Comparison Operations

**SLT (Set on Less Than):**
```mips
SLT $t0, $s3, $s4
    # $t0 = 1 if $s3 < $s4
    # $t0 = 0 if $s3 >= $s4
```

**SLTI (Set on Less Than Immediate):**
```mips
SLTI $t0, $s3, 100
    # $t0 = 1 if $s3 < 100
    # $t0 = 0 if $s3 >= 100
```

### Building All Comparisons

**MIPS provides:** BEQ, BNE, SLT, SLTI

**Can build all comparisons:**
- **Equal:** `BEQ $t0, $t1, label`
- **Not Equal:** `BNE $t0, $t1, label`
- **Less Than:** `SLT $t0, $s1, $s2` then `BNE $t0, $zero, label`
- **Less Than or Equal:** `SLT $t0, $s2, $s1` then `BEQ $t0, $zero, label`
- **Greater Than:** `SLT $t0, $s2, $s1` then `BNE $t0, $zero, label`
- **Greater Than or Equal:** `SLT $t0, $s1, $s2` then `BEQ $t0, $zero, label`

**Example - Less Than:**
```mips
SLT $t0, $s1, $s2    # $t0 = 1 if $s1 < $s2
BNE $t0, $zero, L    # Branch to L if $t0 != 0 (i.e., $s1 < $s2)
```

### Unconditional Jump

**J (Jump):**
```mips
J label    # Unconditionally jump to label
```

**JAL (Jump and Link):**
```mips
JAL label  # Jump to label, save return address in $ra
           # Used for function calls
```

---

## Addressing Modes

### What is an Addressing Mode?

**Definition:** The method by which the address of an operand is specified.

**Key Concept:** Same operation can access data in different ways.

### Basic Addressing Modes

#### 1. Immediate Addressing

**Definition:** Operand is contained in the instruction itself.

**Effective Address (EA):** Not applicable (operand is in instruction)

**Example:**
```mips
ADDI $t0, $t1, 42
                └─► Operand 42 is in instruction
```

**Advantages:**
- Fast (no memory access)
- Simple
- Good for constants

**Limitations:**
- Limited range (16 bits in MIPS)
- Value cannot change

#### 2. Direct Addressing

**Definition:** Address field contains the effective address directly.

**Effective Address (EA):** EA = A (address field)

**Example:**
```
LOAD R1, [1000]
            └─► Address 1000 is in instruction
```

**Advantages:**
- Simple
- Direct access

**Disadvantages:**
- Limited address range (16 bits in I-format)
- Address must be known at compile time

#### 3. Indirect Addressing

**Definition:** Address field points to location containing the effective address.

**Effective Address (EA):** EA = (A) (contents of address A)

**Example:**
```
LOAD R1, [[1000]]
            └─► Instruction contains 1000
                Memory[1000] contains actual address (e.g., 5000)
                Load from memory[5000]
```

**Advantages:**
- Flexible (address can be computed)
- Supports pointers

**Disadvantages:**
- Requires extra memory access
- Slower

#### 4. Register Addressing

**Definition:** Operand is in a register.

**Effective Address (EA):** Not applicable (operand is in register)

**Example:**
```mips
ADD $s0, $t0, $t1
         └─► Operands in registers
```

**Advantages:**
- Very fast (no memory access)
- Efficient

**Disadvantages:**
- Limited number of registers
- Must load values into registers first

#### 5. Register Indirect Addressing

**Definition:** Register contains the address of the operand.

**Effective Address (EA):** EA = (R) (contents of register R)

**Example:**
```mips
LW $t0, 0($s1)
         └─► $s1 contains address
             Load from memory[$s1]
```

**Advantages:**
- Flexible (address in register can change)
- Efficient for arrays/pointers

**Disadvantages:**
- Requires register to hold address
- One extra level of indirection

#### 6. Displacement (Base + Offset) Addressing

**Definition:** Effective address is sum of base register and offset.

**Effective Address (EA):** EA = (R) + A (register + constant)

**Example:**
```mips
LW $t0, 8($s1)
         └─► EA = $s1 + 8
```

**Advantages:**
- Very flexible
- Good for arrays (base = array start, offset = index × element_size)
- Good for stack frames (base = frame pointer, offset = variable offset)

**Disadvantages:**
- Requires address calculation
- Limited offset range (16 bits in MIPS)

#### 7. Stack Addressing

**Definition:** Operands are on a stack (implicit addressing).

**Effective Address (EA):** Top of stack (implicit)

**Example:**
```
PUSH A    # Push A onto stack
PUSH B    # Push B onto stack
ADD       # Pop two values, add, push result
```

**Advantages:**
- Very compact instructions
- Natural for expression evaluation

**Disadvantages:**
- Requires stack management
- Less flexible

### Addressing Mode Comparison

| Mode | EA Calculation | Example | Speed | Flexibility |
|------|----------------|---------|-------|-------------|
| Immediate | N/A (in instruction) | `ADDI $t0, $t1, 42` | Fastest | Low |
| Register | N/A (in register) | `ADD $s0, $t0, $t1` | Fastest | Medium |
| Direct | EA = A | `LOAD R1, [1000]` | Fast | Low |
| Register Indirect | EA = (R) | `LW $t0, 0($s1)` | Medium | High |
| Displacement | EA = (R) + A | `LW $t0, 8($s1)` | Medium | Very High |
| Indirect | EA = (A) | `LOAD R1, [[1000]]` | Slow | High |
| Stack | Top of stack | `ADD` (stack) | Fast | Low |

---

## MIPS Addressing Modes

### MIPS Supports Three Addressing Modes

#### 1. Base or Displacement Addressing

**Use:** Load/store instructions

**Format:** `LW rt, offset(rs)`

**Effective Address:** EA = Register[rs] + offset

**Example:**
```mips
LW $t0, 8($s1)    # EA = $s1 + 8
                  # Load from memory[$s1 + 8]
```

**Applications:**
- Array access: `A[i]` → `LW $t0, i×4($s3)` (where $s3 = &A[0])
- Structure access: `struct.field` → `LW $t0, offset($s1)` (where $s1 = &struct)
- Stack frame access: Local variables relative to frame pointer

#### 2. PC-Relative Addressing

**Use:** Branch instructions

**Format:** `BEQ rs, rt, label`

**Effective Address:** EA = PC + 4 + (offset × 4)

**Why PC + 4?**
- PC points to current instruction
- By time branch executes, PC already incremented to next instruction
- Offset is in words (multiply by 4 for bytes)

**Range:**
- 16-bit signed offset: -32,768 to 32,767 words
- = -128 KB to +128 KB from PC
- Covers most branches (branches are usually local)

**Example:**
```mips
BEQ $t0, $t1, label
    # If $t0 == $t1, jump to label
    # label must be within ±128KB of current instruction
```

**Advantages:**
- Most branches are local (within function)
- Compact encoding (16 bits sufficient)
- Position-independent code

#### 3. Pseudodirect Addressing

**Use:** Jump instructions

**Format:** `J label`

**Effective Address:** EA = (PC[31:28] || address[25:0] || 00)

**Breaking it down:**
- Upper 4 bits of PC: Preserved
- 26-bit address from instruction: Jump target (in words)
- Lower 2 bits: 00 (word-aligned)
- Result: 32-bit address

**Range:**
- 256 MB region (2^28 bytes)
- Can jump anywhere in current 256MB segment
- For full 32-bit address, use `JR $ra` (Jump Register)

**Example:**
```mips
J label    # Jump to label
           # label can be anywhere in 256MB region
```

**Why Pseudodirect?**
- Not fully direct (uses PC bits)
- Not indirect (doesn't use memory)
- Hybrid approach

### MIPS Addressing Summary

| Mode | Instruction Type | EA Calculation | Range |
|------|-----------------|----------------|-------|
| Displacement | Load/Store | (R) + offset | ±32KB |
| PC-Relative | Branch | PC + 4 + offset×4 | ±128KB |
| Pseudodirect | Jump | PC[31:28] \|\| addr[25:0] \|\| 00 | 256MB |

**Key Point:** MIPS uses **simple addressing modes** for simplicity and performance.

---

## Procedures and Stack Usage

### Supporting Procedures

**Requirements for procedure calls:**

1. **Place parameters:** Pass arguments to procedure
2. **Transfer control:** Jump to procedure code
3. **Acquire storage:** Allocate space for local variables
4. **Perform operations:** Execute procedure code
5. **Place result:** Return value to caller
6. **Return control:** Jump back to caller

### MIPS Procedure Call Convention

#### Argument Passing

**Registers:**
- `$a0-$a3`: First 4 arguments
- More arguments: Use stack

**Example:**
```mips
# Call: func(a, b, c, d)
MOVE $a0, $s0    # $a0 = a
MOVE $a1, $s1    # $a1 = b
MOVE $a2, $s2    # $a2 = c
MOVE $a3, $s3    # $a3 = d
JAL func          # Call function
```

#### Return Values

**Registers:**
- `$v0-$v1`: Return values (up to 2)

**Example:**
```mips
# In function:
ADD $v0, $a0, $a1    # Return a + b
JR $ra                # Return to caller

# In caller:
JAL func
MOVE $s0, $v0        # $s0 = return value
```

#### Call and Return

**JAL (Jump and Link):**
```mips
JAL func
    # 1. Save return address: $ra = PC + 4
    # 2. Jump to func
```

**JR (Jump Register):**
```mips
JR $ra
    # Jump to address in $ra (return address)
```

### Stack Usage

**Purpose:** Store local variables, saved registers, return addresses.

**Stack Pointer:** `$sp` ($29) points to top of stack.

**Stack Growth:** Grows downward (decrement to allocate, increment to deallocate).

#### Stack Frame Layout

```
High Address
┌─────────────┐
│ Saved $ra   │  +20
├─────────────┤
│ Saved $s0   │  +16
├─────────────┤
│ Saved $s1   │  +12
├─────────────┤
│ Local var 1 │  +8
├─────────────┤
│ Local var 2 │  +4
├─────────────┤
│ (unused)    │  +0  ← $sp (after allocation)
└─────────────┘
Low Address
```

#### Function Prologue

**Allocate stack frame and save registers:**
```mips
func:
    ADDI $sp, $sp, -20    # Allocate 20 bytes (5 words)
    SW $ra, 16($sp)       # Save return address
    SW $s0, 12($sp)       # Save $s0 (callee-saved)
    SW $s1, 8($sp)        # Save $s1 (callee-saved)
    # ... function body ...
```

#### Function Epilogue

**Restore registers and deallocate stack:**
```mips
    LW $s1, 8($sp)        # Restore $s1
    LW $s0, 12($sp)       # Restore $s0
    LW $ra, 16($sp)       # Restore return address
    ADDI $sp, $sp, 20     # Deallocate stack frame
    JR $ra                # Return
```

### Nested Procedures

**Problem:** What if procedure calls another procedure?

**Solution:** Stack stores multiple return addresses and frames.

**Example:**
```
main calls func1
func1 calls func2
func2 returns to func1
func1 returns to main
```

**Stack during execution:**
```
┌─────────────┐
│ func2 frame │  ← $sp
├─────────────┤
│ func1 frame │
├─────────────┤
│ main frame  │
└─────────────┘
```

**Key Point:** Each procedure has its own stack frame. Stack pointer moves as procedures are called and return.

---

## MIPS Design Principles

### Four Key Principles

#### 1. Simplicity Favors Regularity

**Principles:**
- **Fixed-size instructions:** All instructions 32 bits
- **Small number of formats:** Only 3 formats (R, I, J)
- **Opcode always first 6 bits:** Easy to decode
- **Regular field positions:** Same fields in same positions

**Benefits:**
- Simple hardware (easy to decode)
- Easy to pipeline
- Predictable instruction boundaries

**Example:**
```
All instructions: 32 bits
Opcode: Always bits 31-26
Registers: Always in same positions
```

#### 2. Smaller is Faster

**Principles:**
- **Limited instruction set:** Fewer instructions to implement
- **Limited registers:** 32 registers (not 64 or 128)
- **Limited addressing modes:** Only 3 modes

**Benefits:**
- Faster execution (simpler hardware)
- Lower power consumption
- Easier to optimize

**Trade-off:**
- May need more instructions for complex operations
- But instructions execute faster

#### 3. Make the Common Case Fast

**Principles:**
- **Load-store architecture:** Arithmetic only on registers (fast)
- **Immediate operands:** Constants in instructions (no memory access)
- **Optimize for frequent operations:** ADD, LOAD, STORE are fast

**Benefits:**
- Most programs spend most time in simple operations
- Optimizing common operations gives best overall performance

**Example:**
- Register operations: 1 cycle
- Memory operations: Many cycles
- Solution: Keep data in registers, minimize memory access

#### 4. Good Design Demands Good Compromises

**Principles:**
- **Three instruction formats:** Balance between flexibility and simplicity
- **Not too simple (0 formats):** Would be too limited
- **Not too complex (many formats):** Would be too slow

**Benefits:**
- Practical balance
- Good performance
- Reasonable complexity

**Example:**
- R-format: For register operations (most common)
- I-format: For immediate, load/store, branches (very common)
- J-format: For jumps (less common, but needed)

---

## Key Concepts Summary

### MIPS Architecture

1. **32-bit fixed-length instructions:** Simple and regular
2. **Three instruction formats:** R, I, J
3. **Load-store architecture:** Arithmetic only on registers
4. **32 registers:** Good balance between performance and cost
5. **Three addressing modes:** Displacement, PC-relative, pseudodirect

### Instruction Formats

1. **R-format:** Register operations (ADD, SUB, AND, OR, etc.)
2. **I-format:** Immediate, load/store, branches
3. **J-format:** Jumps

### Addressing Modes

1. **Displacement:** For arrays and structures
2. **PC-relative:** For branches (local jumps)
3. **Pseudodirect:** For jumps (long-range)

### Design Philosophy

1. **Simplicity:** Regular, predictable
2. **Performance:** Fast common operations
3. **Balance:** Good compromises

---

## Practice Problems and Examples

### Problem 1: Instruction Format Identification

**Question:** Identify the format of: `ADD $s0, $t0, $t1`

**Answer:**
- **R-format**
- op = 0x00, rs = $t0 (8), rt = $t1 (9), rd = $s0 (16), shamt = 0, funct = 0x20

### Problem 2: Load Instruction

**Question:** Translate to MIPS: Load `A[5]` where `$s3` contains base address of A.

**Answer:**
```mips
LW $t0, 20($s3)    # Offset = 5 × 4 = 20
```

### Problem 3: Addressing Mode

**Question:** What addressing mode is used in `LW $t0, 8($s1)`?

**Answer:**
- **Displacement (Base + Offset) addressing**
- EA = $s1 + 8

### Problem 4: Branch Range

**Question:** A branch instruction uses PC-relative addressing with 16-bit offset. What is the range?

**Answer:**
- Offset: -32,768 to 32,767 words
- In bytes: -128 KB to +128 KB from PC
- Range: ±128 KB

### Problem 5: Large Constant

**Question:** How to load constant 0x12345678 into `$t0`?

**Answer:**
```mips
LUI $t0, 0x1234       # $t0 = 0x12340000
ORI $t0, $t0, 0x5678  # $t0 = 0x12345678
```

---

## Study Tips

1. **Memorize Formats:**
   - R-format: op, rs, rt, rd, shamt, funct
   - I-format: op, rs, rt, immediate
   - J-format: op, address

2. **Practice Conversions:**
   - C code → MIPS assembly
   - Understand array indexing
   - Understand procedure calls

3. **Understand Addressing:**
   - When to use each mode
   - How addresses are calculated
   - Range limitations

4. **Know Design Principles:**
   - Why MIPS is designed this way
   - Trade-offs made
   - Performance implications

---

## Conclusion

Part 2 of Group 3 covers the **MIPS architecture** as a concrete example of instruction set design:

1. **MIPS characteristics:** 32-bit, fixed-length, load-store
2. **Three formats:** R, I, J for different instruction types
3. **Register usage:** 32 registers, arithmetic only on registers
4. **Memory access:** Load/store only, displacement addressing
5. **Addressing modes:** Three simple modes for different purposes
6. **Design principles:** Simplicity, performance, balance

MIPS demonstrates how the fundamental principles from Part 1 are applied in practice. Understanding MIPS helps you:
- Understand other RISC architectures
- Write efficient assembly code
- Appreciate design trade-offs
- See how hardware and software interact

**Together, Parts 1 and 2** provide complete coverage of instruction set architecture, from general principles to specific implementation.

---

*End of Group 3 Part 2 Study Guide*

