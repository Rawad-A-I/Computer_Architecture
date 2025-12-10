# Group 3: Instruction Set Architecture (ISA)
## Part 1: Instruction Set Fundamentals
## Detailed Study Guide

**Chapters 12-13: Instruction Sets & Addressing Modes (Part 1)**

---

## Table of Contents
1. [Introduction: What is an Instruction Set?](#introduction-what-is-an-instruction-set)
2. [Elements of a Machine Instruction](#elements-of-a-machine-instruction)
3. [Number of Addresses in Instructions](#number-of-addresses-in-instructions)
4. [Types of Operands](#types-of-operands)
5. [Types of Operations](#types-of-operations)
6. [Instruction Set Design Considerations](#instruction-set-design-considerations)
7. [Design Trade-offs](#design-trade-offs)
8. [Key Concepts Summary](#key-concepts-summary)
9. [Practice Problems and Examples](#practice-problems-and-examples)

---

## Introduction: What is an Instruction Set?

### Definition

**Instruction Set:** The vocabulary of commands understood by a given computer architecture.

**Key Characteristics:**
- Different computers have different instruction sets
- But many aspects are common across architectures
- All computers are built from similar underlying principles
- All computers must provide a few basic operations

### Common Goals

**Design Objectives:**
1. **Easy to build hardware:** Simple instructions are easier to implement
2. **Easy to build compiler:** Instructions should map well from high-level languages
3. **Maximize performance:** Fast execution
4. **Minimize cost:** Affordable to manufacture
5. **Minimize energy:** Power-efficient operation

**Modern Trend:** Many modern computers have **simple instruction sets** (RISC - Reduced Instruction Set Computer).

**Key Insight:** The instruction set is the **interface** between software and hardware. It defines what operations the processor can perform and how programs specify those operations.

---

## Elements of a Machine Instruction

### Four Essential Elements

Every machine instruction consists of four elements:

#### 1. Operation Code (Opcode)

**Definition:** Specifies the operation to be performed.

**Examples:**
- ADD: Addition
- SUB: Subtraction
- MUL: Multiplication
- LOAD: Load from memory
- STORE: Store to memory
- JUMP: Unconditional branch
- BRANCH: Conditional branch
- I/O: Input/Output operations

**Representation:**
- Binary code (machine language)
- Each operation has a unique binary pattern
- Opcode field in instruction word

**Example:**
```
Opcode: 000000 (6 bits) = ADD operation
Opcode: 100011 (6 bits) = LOAD WORD operation
```

#### 2. Source Operand Reference

**Definition:** Specifies one or more source operands (inputs for the operation).

**Characteristics:**
- Operation may involve one or more source operands
- Unary operations: 1 source operand (e.g., NOT, NEGATE)
- Binary operations: 2 source operands (e.g., ADD, SUBTRACT)
- Some operations have no source operands (e.g., NOP - No Operation)

**Example:**
```
ADD R1, R2, R3
     │   │   │
     │   │   └─► Source operand 2 (R3)
     │   └─────► Source operand 1 (R2)
     └─────────► Destination (R1)
```

#### 3. Result Operand Reference

**Definition:** Specifies where the result of the operation should be stored.

**Characteristics:**
- Not all operations produce results (e.g., BRANCH, JUMP)
- Result may be stored in:
  - Register
  - Memory location
  - Condition codes (flags)
  - Multiple locations

**Example:**
```
ADD R1, R2, R3
     │
     └─► Result stored in R1
```

#### 4. Next Instruction Reference

**Definition:** Tells the processor where to fetch the next instruction.

**Characteristics:**
- In most architectures, this is **implicit** (from Program Counter)
- PC is automatically incremented after each instruction
- Only explicit for:
  - Branch instructions (conditional)
  - Jump instructions (unconditional)
  - Subroutine calls
  - Returns from subroutines

**Example:**
```
Normal: PC = PC + 4 (next sequential instruction)
Branch: PC = target_address (if condition true)
Jump:   PC = target_address (always)
```

### Complete Instruction Structure

```
┌─────────┬──────────────┬──────────────┬──────────────┐
│ Opcode  │ Source 1     │ Source 2     │ Destination  │
│ (6 bits)│ (5 bits)     │ (5 bits)     │ (5 bits)     │
└─────────┴──────────────┴──────────────┴──────────────┘
```

**Note:** Actual structure varies by instruction type and architecture.

---

## Number of Addresses in Instructions

### Maximum Number Needed

**Question:** What is the maximum number of addresses one might need in an instruction?

**Analysis:**
1. **Source Operands:**
   - Arithmetic/logic operations are unary (1 source) or binary (2 sources)
   - Maximum: **2 addresses** for source operands

2. **Result Storage:**
   - Result must be stored somewhere
   - Maximum: **1 address** for destination

3. **Next Instruction:**
   - Address of next instruction
   - Maximum: **1 address** (usually implicit)

**Theoretical Maximum:** 3 addresses (2 sources + 1 destination)

**Practical Maximum:** 3 addresses (next instruction usually implicit via PC)

### Instruction Address Categories

#### Zero-Address Instructions

**Concept:** Instructions that don't explicitly specify addresses.

**Application:** **Stack-based architecture**

**How It Works:**
- Operands are on a **stack** (Last-In-First-Out)
- Top two stack elements are in processor registers
- Operations work on top of stack
- Results pushed back onto stack

**Stack Operations:**
- **PUSH:** Push value onto stack
- **POP:** Pop value from stack
- **ADD:** Pop two values, add them, push result
- **MULTIPLY:** Pop two values, multiply, push result

**Example - Postfix Notation:**
```
Expression: (A + B) × C
Postfix:    A B + C ×

Instructions:
PUSH A      # Stack: [A]
PUSH B      # Stack: [A, B]
ADD         # Pop B, Pop A, Add, Push result
            # Stack: [A+B]
PUSH C      # Stack: [A+B, C]
MULTIPLY    # Pop C, Pop (A+B), Multiply, Push result
            # Stack: [(A+B)×C]
```

**Advantages:**
- Short instructions (no address fields)
- Simple hardware
- Good for expression evaluation

**Disadvantages:**
- Requires postfix notation
- More instructions needed
- Stack management overhead

#### One-Address Instructions

**Concept:** One explicit address, one implicit (accumulator).

**How It Works:**
- One operand specified explicitly (in instruction)
- Other operand is implicit (in **Accumulator register - AC**)
- Result stored in accumulator

**Example:**
```
LOAD A      # AC = A
ADD B       # AC = AC + B
STORE C     # C = AC
```

**To compute: C = A + B:**
```
LOAD A      # AC = A
ADD B       # AC = A + B
STORE C     # C = A + B
```

**Characteristics:**
- Accumulator is implicit source and destination
- Only one general-purpose register (AC)
- Common in early computers

**Advantages:**
- Short instructions
- Simple hardware
- Fewer bits needed

**Disadvantages:**
- Limited flexibility
- More instructions needed
- Accumulator becomes bottleneck

#### Two-Address Instructions

**Concept:** Two explicit addresses.

**How It Works:**
- First address: Source operand 1
- Second address: Source operand 2 AND destination
- One address serves dual purpose

**Example:**
```
ADD A, B    # A = A + B
            # B is source, A is source and destination
```

**To compute: C = A + B:**
```
MOVE C, A   # C = A (copy A to C)
ADD C, B    # C = C + B (add B to C)
```

**Characteristics:**
- More flexible than one-address
- Common in many architectures
- One operand modified in place

**Advantages:**
- Moderate instruction length
- Good flexibility
- Efficient for many operations

**Disadvantages:**
- One operand is destroyed
- May need extra MOVE instructions

#### Three-Address Instructions

**Concept:** Three explicit addresses.

**How It Works:**
- First address: Source operand 1
- Second address: Source operand 2
- Third address: Destination (separate from sources)

**Example:**
```
ADD C, A, B    # C = A + B
               # A and B unchanged
```

**To compute: C = A + B:**
```
ADD C, A, B    # Single instruction!
```

**Characteristics:**
- Most flexible
- No operands destroyed
- Common in modern RISC architectures

**Advantages:**
- Maximum flexibility
- No operand destruction
- Fewer instructions needed
- Easier for compilers

**Disadvantages:**
- Longer instructions (more bits)
- More complex hardware
- More register ports needed

### Comparison Table

| Type | Example | Instructions for C = A + B | Flexibility | Instruction Length |
|------|---------|---------------------------|-------------|-------------------|
| 0-address | ADD | PUSH A, PUSH B, ADD, POP C | Low | Shortest |
| 1-address | ADD B | LOAD A, ADD B, STORE C | Low | Short |
| 2-address | ADD A, B | MOVE C, A, ADD C, B | Medium | Medium |
| 3-address | ADD C, A, B | ADD C, A, B | High | Longest |

### Modern Practice

**Most contemporary machines employ a mixture:**
- **Two-address instructions:** For most operations
- **Three-address instructions:** For arithmetic/logical operations
- **One-address instructions:** For special cases (stack operations)
- **Zero-address instructions:** Rarely used (stack machines)

**Reason:** Balance between flexibility and instruction size.

---

## Types of Operands

### Overview

**Definition:** The data types that machine instructions operate on.

**Key Point:** Machine instructions operate on **data**, and different types of data require different handling.

### Four Main Categories

#### 1. Addresses

**Definition:** Memory addresses used for:
- Pointing to data locations
- Specifying instruction locations (for branches/jumps)
- Array indexing
- Pointer operations

**Characteristics:**
- Typically same size as address bus width
- 32-bit systems: 32-bit addresses
- 64-bit systems: 64-bit addresses
- Unsigned integers

**Uses:**
- Memory addressing
- Array indexing
- Pointer arithmetic
- Function calls (return addresses)

**Example:**
```
LOAD R1, [1000]      # Address: 1000
BRANCH label         # Address: label
```

#### 2. Numbers

**Types:**

##### A. Integers
- **Signed integers:** Two's complement representation
  - Range: -2^(n-1) to 2^(n-1) - 1 (for n bits)
  - Example: 8-bit signed: -128 to +127
- **Unsigned integers:** Binary representation
  - Range: 0 to 2^n - 1 (for n bits)
  - Example: 8-bit unsigned: 0 to 255

##### B. Floating-Point Numbers
- **IEEE 754 standard:** Most common format
- **Single precision:** 32 bits (1 sign + 8 exponent + 23 mantissa)
- **Double precision:** 64 bits (1 sign + 11 exponent + 52 mantissa)
- **Special values:** Infinity, NaN (Not a Number)

**Operations:**
- Arithmetic: ADD, SUBTRACT, MULTIPLY, DIVIDE
- Comparison: Compare, test for zero
- Conversion: Integer ↔ Floating-point

**Example:**
```
ADD R1, R2, R3        # Integer addition
FADD F1, F2, F3       # Floating-point addition
```

#### 3. Characters

**Definition:** Text data represented as character codes.

**Common Encodings:**
- **ASCII:** 7-bit (128 characters), extended to 8-bit (256 characters)
  - 'A' = 65 (0x41)
  - 'a' = 97 (0x61)
  - '0' = 48 (0x30)
- **Unicode/UTF-8:** Multi-byte encoding for international characters
  - Variable length (1-4 bytes per character)
  - Supports millions of characters

**Operations:**
- Comparison: Compare strings
- Conversion: Character ↔ Number
- Manipulation: Concatenate, extract

**Example:**
```
LOAD R1, 'A'          # Load ASCII code 65
COMPARE R1, R2        # Compare characters
```

#### 4. Logical Data

**Definition:** Bit-level data treated as logical values.

**Characteristics:**
- Each bit is independent
- No arithmetic meaning
- Used for:
  - Boolean operations
  - Bit masks
  - Flags
  - Packed data

**Operations:**
- **AND:** Bitwise AND
- **OR:** Bitwise OR
- **XOR:** Bitwise exclusive OR
- **NOT:** Bitwise complement
- **SHIFT:** Left/right shift
- **ROTATE:** Circular shift

**Example:**
```
AND R1, R2, R3        # R1 = R2 AND R3 (bitwise)
OR  R1, R2, R3        # R1 = R2 OR R3 (bitwise)
XOR R1, R2, R3        # R1 = R2 XOR R3 (bitwise)
SHIFT R1, R2, 3       # R1 = R2 << 3 (left shift by 3)
```

**Use Cases:**
- Setting/clearing flags
- Extracting bit fields
- Packing multiple values into one word
- Cryptography operations

---

## Types of Operations

### Overview

**Key Point:** The number of different opcodes varies widely from machine to machine, but the same general types of operations are found on all machines.

**Categorization:** Operations can be grouped into several categories.

### Seven Main Categories

#### 1. Data Transfer

**Purpose:** Move data between locations.

**Operations:**
- **LOAD:** Transfer from memory to register
- **STORE:** Transfer from register to memory
- **MOVE:** Transfer between registers
- **PUSH:** Push onto stack
- **POP:** Pop from stack
- **EXCHANGE:** Swap two operands

**Characteristics:**
- Most common type of operation
- No data transformation (just movement)
- May involve address calculation

**Example:**
```
LOAD R1, [1000]       # R1 = memory[1000]
STORE R1, [2000]      # memory[2000] = R1
MOVE R2, R1           # R2 = R1
```

#### 2. Arithmetic

**Purpose:** Perform mathematical calculations.

**Operations:**
- **ADD:** Addition
- **SUBTRACT:** Subtraction
- **MULTIPLY:** Multiplication
- **DIVIDE:** Division
- **MODULO:** Remainder
- **INCREMENT:** Add 1
- **DECREMENT:** Subtract 1
- **NEGATE:** Two's complement negation
- **ABSOLUTE VALUE:** |x|

**Types:**
- **Integer arithmetic:** Operates on integers
- **Floating-point arithmetic:** Operates on floating-point numbers
- **Fixed-point arithmetic:** Operates on fixed-point numbers

**Example:**
```
ADD R1, R2, R3        # R1 = R2 + R3
SUB R1, R2, R3        # R1 = R2 - R3
MUL R1, R2, R3        # R1 = R2 × R3
DIV R1, R2, R3        # R1 = R2 ÷ R3
```

#### 3. Logical

**Purpose:** Perform bitwise logical operations.

**Operations:**
- **AND:** Bitwise AND
- **OR:** Bitwise OR
- **XOR:** Bitwise exclusive OR
- **NOT:** Bitwise complement (one's complement)
- **NAND:** Bitwise NAND
- **NOR:** Bitwise NOR

**Uses:**
- Bit manipulation
- Masking
- Setting/clearing flags
- Boolean logic

**Example:**
```
AND R1, R2, R3        # R1 = R2 AND R3
OR  R1, R2, R3        # R1 = R2 OR R3
XOR R1, R2, R3        # R1 = R2 XOR R3
NOT R1, R2            # R1 = NOT R2
```

#### 4. Conversion

**Purpose:** Convert data from one format to another.

**Operations:**
- **Integer to Floating-point:** Convert integer to float
- **Floating-point to Integer:** Convert float to integer (truncate/round)
- **Sign Extension:** Extend signed number to more bits
- **Zero Extension:** Extend unsigned number to more bits
- **Byte Swap:** Change byte order (endianness)

**Example:**
```
INT_TO_FLOAT F1, R1   # F1 = (float) R1
FLOAT_TO_INT R1, F1   # R1 = (int) F1
SIGN_EXTEND R1, R2    # Extend R2 (8-bit) to R1 (32-bit)
```

#### 5. I/O (Input/Output)

**Purpose:** Transfer data between processor and I/O devices.

**Operations:**
- **IN:** Read from I/O port
- **OUT:** Write to I/O port
- **READ:** Read from I/O device
- **WRITE:** Write to I/O device

**Characteristics:**
- May be memory-mapped (treated like memory)
- May use special I/O instructions
- Often involves device addressing

**Example:**
```
IN R1, PORT5          # R1 = input from port 5
OUT PORT5, R1         # Output R1 to port 5
```

#### 6. System Control

**Purpose:** Control processor and system operation.

**Operations:**
- **HALT:** Stop processor
- **NOP:** No operation (do nothing)
- **WAIT:** Wait for interrupt
- **INTERRUPT ENABLE/DISABLE:** Control interrupts
- **PRIVILEGE MODE:** Change processor mode
- **CACHE CONTROL:** Flush/invalidate cache
- **TLB CONTROL:** Translation Lookaside Buffer operations

**Characteristics:**
- Usually privileged (OS/kernel only)
- Control system behavior
- Not available to user programs

**Example:**
```
HALT                  # Stop processor
NOP                   # No operation
EI                    # Enable interrupts
DI                    # Disable interrupts
```

#### 7. Transfer of Control

**Purpose:** Alter the normal sequential execution flow.

**Operations:**
- **JUMP:** Unconditional branch
- **BRANCH:** Conditional branch
- **CALL:** Subroutine call
- **RETURN:** Return from subroutine
- **SKIP:** Skip next instruction

**Conditional Branches:**
- **BRANCH IF ZERO:** Branch if result is zero
- **BRANCH IF NOT ZERO:** Branch if result is not zero
- **BRANCH IF EQUAL:** Branch if two values equal
- **BRANCH IF NOT EQUAL:** Branch if two values not equal
- **BRANCH IF LESS:** Branch if first < second
- **BRANCH IF GREATER:** Branch if first > second
- **BRANCH IF LESS OR EQUAL:** Branch if first ≤ second
- **BRANCH IF GREATER OR EQUAL:** Branch if first ≥ second

**Example:**
```
JUMP label            # Unconditional jump to label
BRANCH IF ZERO label  # Jump if zero flag set
CALL subroutine       # Call function
RETURN                # Return from function
```

---

## Instruction Set Design Considerations

### Five Key Design Aspects

#### 1. Operation Repertoire

**Questions:**
- How many operations to provide?
- Which operations to include?
- How complex should operations be?

**Trade-offs:**
- **More operations:** More functionality, but more complex hardware
- **Fewer operations:** Simpler hardware, but may need multiple instructions for complex operations
- **Complex operations:** Fewer instructions, but slower execution
- **Simple operations:** Faster execution, but more instructions needed

**Examples:**
- **CISC (Complex Instruction Set Computer):** Many complex instructions
- **RISC (Reduced Instruction Set Computer):** Few simple instructions

#### 2. Data Types

**Questions:**
- What data types to support?
- How are they represented?
- What operations are available for each type?

**Common Types:**
- Integers (signed/unsigned, various sizes)
- Floating-point (single/double precision)
- Characters
- Logical (bit strings)
- Addresses

**Considerations:**
- Hardware support vs. software emulation
- Performance vs. cost
- Compatibility requirements

#### 3. Instruction Format

**Questions:**
- How long should instructions be?
- How many addresses per instruction?
- How are fields organized?
- Fixed-length or variable-length?

**Factors:**
- **Instruction length:** Affects code density and memory usage
- **Number of addresses:** Affects flexibility and instruction size
- **Field sizes:** Must accommodate opcodes, registers, addresses, immediates
- **Format consistency:** Regular formats simplify decoding

**Examples:**
- **Fixed-length:** All instructions same size (e.g., 32 bits)
- **Variable-length:** Different instructions different sizes (e.g., x86: 1-15 bytes)

#### 4. Registers

**Questions:**
- How many registers?
- What are they used for?
- How are they organized?

**Considerations:**
- **More registers:** Better performance, but more expensive
- **Fewer registers:** Cheaper, but more memory accesses
- **Special-purpose vs. general-purpose:** Flexibility vs. optimization
- **Register windows:** For procedure calls

**Examples:**
- **MIPS:** 32 general-purpose registers
- **x86:** 8 general-purpose registers (32-bit), 16 (64-bit)
- **ARM:** 16 general-purpose registers

#### 5. Addressing

**Questions:**
- What addressing modes to support?
- How are addresses specified?
- How are addresses calculated?

**Addressing Modes:**
- Immediate
- Direct
- Indirect
- Register
- Register indirect
- Displacement (base + offset)
- Indexed
- Stack

**Considerations:**
- **More modes:** More flexibility, but more complex
- **Fewer modes:** Simpler, but may need more instructions
- **Address calculation:** Hardware vs. software

---

## Design Trade-offs

### Fewer Addresses per Instruction

**Advantages:**
- **More primitive instructions:** Simpler processor design
- **Shorter instructions:** Fewer bits needed
- **Lower hardware complexity:** Easier to implement

**Disadvantages:**
- **More total instructions:** Programs are longer
- **Longer execution times:** More instructions to execute
- **More complex programs:** Harder to write and optimize

**Example:**
```
3-address: ADD C, A, B        # 1 instruction
1-address: LOAD A, ADD B, STORE C  # 3 instructions
```

### One-Address vs. Multiple-Address

**One-Address (Accumulator):**
- **Single register (AC):** Limited flexibility
- **More memory references:** Slower execution
- **Simpler hardware:** Lower cost

**Multiple-Address:**
- **Multiple registers:** More flexibility
- **Fewer memory references:** Faster execution (registers are faster)
- **More complex hardware:** Higher cost

**Key Insight:** Register references are **faster** than memory references, so multiple registers speed up execution.

**Modern Practice:** Most contemporary machines use a **mixture of two- and three-address instructions** for flexibility and performance.

### Other Factors

**Additional Considerations:**

1. **Memory vs. Register References:**
   - Fewer registers → fewer bits needed for register reference
   - More registers → more flexibility but more bits needed

2. **Addressing Modes:**
   - More modes → more flexibility but more bits needed
   - Mode specification takes 1 or more bits

3. **Instruction Format Variety:**
   - Fixed format: Simpler decoding
   - Variable format: Better code density
   - Most processors use **variety of formats**

**Example:**
```
R-format:  ADD R1, R2, R3     # All registers
I-format:  ADD R1, R2, 100    # Register + immediate
J-format:  JUMP label          # Jump address
```

---

## Key Concepts Summary

### Instruction Set Fundamentals

1. **Instruction Set = Vocabulary:** Defines what operations processor can perform
2. **Four Elements:** Opcode, source operands, result, next instruction
3. **Address Count:** 0, 1, 2, or 3 addresses (trade-offs exist)
4. **Operand Types:** Addresses, numbers, characters, logical data
5. **Operation Types:** Data transfer, arithmetic, logical, conversion, I/O, system control, transfer of control

### Design Principles

1. **Trade-offs Everywhere:**
   - Flexibility vs. simplicity
   - Performance vs. cost
   - Instruction size vs. functionality

2. **Modern Trend:**
   - Simple instruction sets (RISC)
   - Multiple registers
   - Load-store architecture
   - Regular instruction formats

3. **Key Factors:**
   - Operation repertoire
   - Data types
   - Instruction format
   - Registers
   - Addressing modes

---

## Practice Problems and Examples

### Problem 1: Instruction Elements

**Question:** Identify the four elements in this instruction: `ADD R1, R2, R3`

**Answer:**
- **Opcode:** ADD (operation code)
- **Source Operand 1:** R2
- **Source Operand 2:** R3
- **Result Operand:** R1
- **Next Instruction:** Implicit (PC + instruction_size)

### Problem 2: Address Count Comparison

**Question:** Convert this 3-address instruction to 1-address format: `MULTIPLY C, A, B`

**Answer:**
```
LOAD A        # AC = A
MULTIPLY B    # AC = AC × B
STORE C       # C = AC
```

### Problem 3: Operand Types

**Question:** Classify the operand types in: `ADD R1, R2, 42`

**Answer:**
- **R1:** Register (address of register)
- **R2:** Register (address of register)
- **42:** Immediate (number - integer constant)

### Problem 4: Operation Categories

**Question:** Classify these operations:
- `LOAD R1, [1000]`
- `ADD R1, R2, R3`
- `AND R1, R2, R3`
- `BRANCH IF ZERO label`

**Answer:**
- `LOAD`: Data transfer
- `ADD`: Arithmetic
- `AND`: Logical
- `BRANCH`: Transfer of control

### Problem 5: Design Trade-off

**Question:** Why do modern processors use multiple registers instead of a single accumulator?

**Answer:**
- **Performance:** Register accesses are much faster than memory accesses
- **Flexibility:** Multiple registers allow more operations without memory access
- **Parallelism:** Can work with multiple values simultaneously
- **Compiler optimization:** Easier to optimize code with more registers

---

## Study Tips

1. **Understand Trade-offs:**
   - Every design decision has pros and cons
   - Compare different approaches
   - Understand why certain choices are made

2. **Practice Conversions:**
   - Convert between different address formats
   - Understand how same operation can be expressed differently

3. **Classify Operations:**
   - Learn to identify operation types
   - Understand what each category does

4. **Think About Implementation:**
   - How would hardware implement this?
   - What are the performance implications?
   - What are the cost implications?

5. **Compare Architectures:**
   - RISC vs. CISC
   - Different register organizations
   - Different addressing modes

---

## Conclusion

Part 1 of Group 3 covers the **fundamental concepts** of instruction set architecture:

1. **What instructions are:** Vocabulary of processor commands
2. **What they contain:** Opcode, operands, results, next instruction
3. **How many addresses:** 0, 1, 2, or 3 (with trade-offs)
4. **What data types:** Addresses, numbers, characters, logical
5. **What operations:** Seven main categories
6. **How to design:** Five key considerations with trade-offs

These fundamentals are essential before diving into specific architectures (like MIPS) in Part 2. Understanding these concepts will help you:
- Analyze different instruction sets
- Understand design decisions
- Evaluate performance implications
- Appreciate modern RISC architectures

**Next:** Part 2 covers the MIPS architecture as a concrete example, showing how these principles are applied in practice.

---

*End of Group 3 Part 1 Study Guide*

