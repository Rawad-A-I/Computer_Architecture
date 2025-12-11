# Group 3: Instruction Set Architecture (ISA)
## Comprehensive Exercises

**Chapters 12-13: Instruction Sets & Addressing Modes**

---

## Table of Contents
1. [Multiple Choice Questions](#multiple-choice-questions)
2. [True/False Questions](#truefalse-questions)
3. [Short Answer Questions](#short-answer-questions)
4. [Calculation Problems](#calculation-problems)
5. [Code Analysis Questions](#code-analysis-questions)
6. [Problem-Solving Exercises](#problem-solving-exercises)
7. [Conceptual Questions](#conceptual-questions)
8. [Answer Key](#answer-key)

---

## Multiple Choice Questions

### Section 1: Instruction Set Fundamentals

**1.1** Every machine instruction consists of how many essential elements?

a) Two
b) Three
c) Four
d) Five

**1.2** The operation code (opcode) specifies:

a) Where to store the result
b) What operation to perform
c) Where to find operands
d) The next instruction address

**1.3** In a three-address instruction format, how many addresses are specified?

a) One
b) Two
c) Three
d) Four

**1.4** Zero-address instructions typically use:

a) Registers
b) Memory locations
c) A stack
d) Immediate values

**1.5** Which addressing format typically requires the fewest instruction bits?

a) Three-address
b) Two-address
c) One-address
d) Zero-address

### Section 2: Operands and Operations

**2.1** Which of the following is NOT a type of operand?

a) Addresses
b) Numbers
c) Characters
d) Instructions

**2.2** Floating-point numbers are used to represent:

a) Only integers
b) Real numbers with decimal points
c) Only positive numbers
d) Only negative numbers

**2.3** Which operation category includes ADD, SUBTRACT, MULTIPLY, and DIVIDE?

a) Data Transfer
b) Arithmetic
c) Logical
d) I/O

**2.4** The operation that moves data from one location to another is:

a) Arithmetic
b) Data Transfer
c) Logical
d) Conversion

**2.5** Branch and jump instructions belong to which operation category?

a) Data Transfer
b) Arithmetic
c) Transfer of Control
d) System Control

### Section 3: MIPS Architecture

**3.1** MIPS uses how many instruction formats?

a) One
b) Two
c) Three
d) Four

**3.2** In MIPS, all instructions are:

a) 16 bits
b) 24 bits
c) 32 bits
d) 64 bits

**3.3** MIPS is a:

a) CISC architecture
b) RISC architecture
c) VLIW architecture
d) EPIC architecture

**3.4** In MIPS, memory is:

a) Word-addressable
b) Byte-addressable
c) Bit-addressable
d) Block-addressable

**3.5** MIPS word size is:

a) 16 bits
b) 32 bits
c) 64 bits
d) 128 bits

### Section 4: MIPS Instruction Formats

**4.1** The R-format instruction is used for:

a) Immediate operations
b) Jump operations
c) Register-to-register operations
d) Memory operations only

**4.2** In R-format, the funct field is:

a) 5 bits
b) 6 bits
c) 10 bits
d) 16 bits

**4.3** I-format instructions include:

a) Only arithmetic operations
b) Load, store, and immediate operations
c) Only jump operations
d) Only branch operations

**4.4** In I-format, the immediate field is:

a) 8 bits
b) 16 bits
c) 20 bits
d) 26 bits

**4.5** J-format is used for:

a) Register operations
b) Immediate operations
c) Jump instructions
d) Branch instructions

### Section 5: MIPS Memory Operations

**5.1** In MIPS load-store architecture:

a) All operations can access memory directly
b) Only load and store instructions access memory
c) Arithmetic operations can access memory
d) No instructions access memory

**5.2** The instruction `lw $t0, 8($s0)` loads:

a) 8 bytes from address in $s0
b) A word (4 bytes) from address ($s0 + 8)
c) 8 words from address in $s0
d) A byte from address ($s0 + 8)

**5.3** In MIPS, word addresses must be:

a) Aligned to byte boundaries
b) Aligned to word boundaries (multiple of 4)
c) Aligned to double-word boundaries
d) Can be at any address

**5.4** The base register in `sw $t1, 12($s2)` is:

a) $t1
b) $s2
c) 12
d) $t1 + $s2

**5.5** MIPS uses which endianness by default?

a) Little endian
b) Big endian
c) Bi-endian
d) No endianness

### Section 6: Addressing Modes

**6.1** Immediate addressing means:

a) The operand is in a register
b) The operand is in memory
c) The operand is part of the instruction
d) The operand is on the stack

**6.2** Direct addressing means:

a) The address is in a register
b) The address is part of the instruction
c) The address is calculated
d) The address is on the stack

**6.3** Register indirect addressing means:

a) The register contains the data
b) The register contains the address
c) The register is the address
d) The register is not used

**6.4** Displacement addressing uses:

a) Base register + offset
b) Only base register
c) Only offset
d) PC + offset

**6.5** MIPS supports how many addressing modes?

a) One
b) Two
c) Three
d) Four

### Section 7: MIPS Procedures and Stack

**7.1** In MIPS, function arguments are typically passed in:

a) Memory
b) Registers $a0-$a3
c) Stack only
d) Global variables

**7.2** The return address in MIPS procedure calls is stored in:

a) $ra register
b) Stack
c) Memory
d) $v0 register

**7.3** Function return values in MIPS are typically returned in:

a) $a0-$a3
b) $v0-$v1
c) Stack
d) Memory

**7.4** The stack pointer in MIPS is:

a) $sp
b) $fp
c) $ra
d) $gp

**7.5** A stack frame typically contains:

a) Only local variables
b) Only arguments
c) Local variables, saved registers, and return address
d) Only return address

---

## True/False Questions

**T/F 1.1** Every machine instruction must specify an operation code (opcode).

**T/F 1.2** Three-address instructions require more instruction bits than two-address instructions.

**T/F 1.3** Zero-address instructions are the most common in modern processors.

**T/F 1.4** The number of addresses in an instruction affects both instruction length and execution speed.

**T/F 2.1** Characters are typically represented using ASCII or Unicode encoding.

**T/F 2.2** Logical operations include AND, OR, NOT, and XOR.

**T/F 2.3** I/O operations are always performed using special I/O instructions.

**T/F 2.4** Conversion operations change data from one format to another.

**T/F 3.1** MIPS uses fixed-length 32-bit instructions for simplicity.

**T/F 3.2** MIPS is a load-store architecture, meaning only load and store instructions access memory.

**T/F 3.3** In MIPS, all registers are general-purpose and can be used for any purpose.

**T/F 3.4** MIPS word addresses must be aligned to 4-byte boundaries.

**T/F 4.1** R-format instructions use the funct field to specify the operation when opcode is 0.

**T/F 4.2** I-format instructions can be used for both arithmetic and memory operations.

**T/F 4.3** J-format instructions use a 26-bit address field for the jump target.

**T/F 4.4** All MIPS instructions fit into one of three formats: R, I, or J.

**T/F 5.1** In MIPS, you cannot perform arithmetic directly on memory operands.

**T/F 5.2** The instruction `lw $t0, 0($s0)` loads a word from the address stored in $s0.

**T/F 5.3** MIPS supports unaligned memory accesses for words.

**T/F 5.4** Big endian stores the most significant byte at the lowest address.

**T/F 6.1** Immediate addressing is the fastest because the operand is in the instruction.

**T/F 6.2** Register addressing is faster than memory addressing.

**T/F 6.3** MIPS uses PC-relative addressing for branch instructions.

**T/F 6.4** Displacement addressing combines a base register with an offset.

**T/F 7.1** MIPS procedure calls use the jal instruction to jump and link.

**T/F 7.2** The stack grows downward (toward lower addresses) in MIPS.

**T/F 7.3** Saved registers must be preserved by the callee function.

**T/F 7.4** The frame pointer ($fp) points to the top of the current stack frame.

---

## Short Answer Questions

### Section 1: Instruction Set Fundamentals

**SA 1.1** List and describe the four essential elements of a machine instruction.

**SA 1.2** Compare zero-address, one-address, two-address, and three-address instruction formats. What are the advantages and disadvantages of each?

**SA 1.3** Explain why three-address instructions require more bits but may be more efficient for compilers.

**SA 1.4** What is the relationship between the number of addresses in an instruction and the instruction length?

### Section 2: Operands and Operations

**SA 2.1** List and describe the four main types of operands.

**SA 2.2** Explain the difference between integer and floating-point number representation.

**SA 2.3** List and describe the seven main categories of operations.

**SA 2.4** What is the purpose of conversion operations? Give examples.

**SA 2.5** Explain the difference between data transfer and arithmetic operations.

### Section 3: MIPS Architecture

**SA 3.1** What are the key characteristics of the MIPS architecture?

**SA 3.2** Explain what "load-store architecture" means and why it's used.

**SA 3.3** What is byte addressing, and how does it relate to word alignment in MIPS?

**SA 3.4** Explain the difference between big endian and little endian byte ordering.

**SA 3.5** Why does MIPS use fixed-length 32-bit instructions?

### Section 4: MIPS Instruction Formats

**SA 4.1** Describe the R-format instruction structure and when it is used.

**SA 4.2** Describe the I-format instruction structure and give examples of instructions that use it.

**SA 4.3** Describe the J-format instruction structure and its purpose.

**SA 4.4** How does the funct field work in R-format instructions?

**SA 4.5** Compare the three MIPS instruction formats in terms of fields and usage.

### Section 5: MIPS Memory Operations

**SA 5.1** Explain how the `lw` (load word) instruction works, including its format and addressing.

**SA 5.2** Explain how the `sw` (store word) instruction works.

**SA 5.3** What is memory alignment, and why is it important in MIPS?

**SA 5.4** Give an example of accessing an array element in MIPS using load/store instructions.

**SA 5.5** Why can't MIPS perform arithmetic directly on memory operands?

### Section 6: Addressing Modes

**SA 6.1** List and describe the basic addressing modes.

**SA 6.2** Which addressing modes does MIPS support? Give examples of each.

**SA 6.3** Explain how PC-relative addressing works and why it's used for branches.

**SA 6.4** What is displacement (base + offset) addressing, and how is it used in MIPS?

**SA 6.5** Compare immediate addressing, register addressing, and memory addressing in terms of speed and flexibility.

### Section 7: MIPS Procedures

**SA 7.1** Explain how MIPS handles procedure calls, including argument passing and return values.

**SA 7.2** Describe the MIPS register usage conventions ($a0-$a3, $v0-$v1, $ra, $sp, etc.).

**SA 7.3** What is a stack frame, and what information does it contain?

**SA 7.4** Explain the difference between caller-saved and callee-saved registers.

**SA 7.5** How does the `jal` (jump and link) instruction work?

---

## Calculation Problems

### Problem 1: Instruction Format Sizes

**CP 1.1** Calculate the number of bits needed for each field in a three-address instruction format:
- Opcode: 8 bits
- Address field: 16 bits each
- How many total bits?
- How many different operations can be encoded?
- How many memory locations can be addressed?

**CP 1.2** Compare instruction sizes:
- Three-address: 3 address fields of 12 bits each, 6-bit opcode
- Two-address: 2 address fields of 12 bits each, 6-bit opcode
- One-address: 1 address field of 16 bits, 6-bit opcode
- Calculate total bits for each format

### Problem 2: MIPS Instruction Encoding

**CP 2.1** For the MIPS instruction `add $t0, $s1, $s2`:
- $t0 = register 8, $s1 = register 17, $s2 = register 18
- Encode this as a 32-bit R-format instruction
- Show binary representation

**CP 2.2** For the MIPS instruction `lw $t0, 100($s1)`:
- $t0 = register 8, $s1 = register 17
- Encode this as a 32-bit I-format instruction
- Show binary representation

### Problem 3: Memory Addressing

**CP 3.1** In MIPS, if a word is stored at address 0x1000:
- What are the byte addresses for this word?
- If using big endian, how is 0x12345678 stored?
- If using little endian, how is 0x12345678 stored?

**CP 3.2** Calculate effective addresses for:
- `lw $t0, 8($s0)` where $s0 = 0x2000
- `lw $t1, -4($s1)` where $s1 = 0x3000
- `sw $t2, 16($s2)` where $s2 = 0x4000

### Problem 4: Branch Range

**CP 4.1** In MIPS, branch instructions use 16-bit signed immediate for PC-relative addressing:
- What is the range of addresses that can be reached (in instructions)?
- If current PC is 0x00400000, what is the range of branch targets?
- Express in both instructions and bytes

**CP 4.2** A branch instruction is at address 0x00401000:
- Target address is 0x00402000
- Can this be reached with a branch instruction?
- If not, what instruction should be used instead?

### Problem 5: Immediate Values

**CP 5.1** MIPS I-format uses 16-bit signed immediate:
- What is the range of values that can be represented?
- How would you load the value 0x12345678 into a register?
- Show the instruction sequence

**CP 5.2** For the instruction `addi $t0, $s0, 1000`:
- What is the maximum value that can be added?
- What happens if you need to add a larger value?

---

## Code Analysis Questions

### Code 1: Instruction Format Identification

**CA 1.1** Identify the instruction format (R, I, or J) for each MIPS instruction:
- `add $t0, $t1, $t2`
- `lw $s0, 8($sp)`
- `beq $t0, $t1, label`
- `j target`
- `addi $t0, $t1, 100`
- `sw $s1, -4($sp)`

**CA 1.2** For each instruction above, identify:
- Opcode
- Register fields
- Immediate/address fields
- Operation being performed

### Code 2: Memory Operations

**CA 2.1** Analyze the following MIPS code:
```mips
lw $t0, 0($s0)      # Load word from address in $s0
addi $t0, $t0, 1    # Add 1 to $t0
sw $t0, 0($s0)      # Store word to address in $s0
```
- What does this code do?
- What addressing mode is used?
- How many memory accesses occur?

**CA 2.2** Convert the following C code to MIPS:
```c
int array[10];
array[5] = array[3] + 7;
```
- Show the MIPS assembly code
- Explain register usage
- Calculate memory addresses

### Code 3: Arithmetic Operations

**CA 3.1** Analyze:
```mips
add $t0, $s1, $s2   # $t0 = $s1 + $s2
sub $t1, $t0, $s3   # $t1 = $t0 - $s3
mul $t2, $t1, $s4   # $t2 = $t1 * $s4
```
- What is the final value in $t2?
- What instruction format is used?
- Are there any data dependencies?

**CA 3.2** Convert to MIPS:
```c
int a = 10;
int b = 20;
int c = a + b * 2;
```
- Show MIPS code
- Use appropriate registers
- Handle immediate values

### Code 4: Control Flow

**CA 4.1** Analyze:
```mips
loop:   beq $t0, $zero, end
        addi $t0, $t0, -1
        j loop
end:    add $s0, $s0, $s1
```
- What does this code do?
- How many times does the loop execute (if $t0 starts at 5)?
- What addressing mode is used for the branch?

**CA 4.2** Convert to MIPS:
```c
if (a > b) {
    c = a + b;
} else {
    c = a - b;
}
```
- Show MIPS code with proper labels
- Use branch instructions
- Explain the control flow

### Code 5: Procedures

**CA 5.1** Analyze this MIPS procedure:
```mips
func:   addi $sp, $sp, -8
        sw $ra, 4($sp)
        sw $s0, 0($sp)
        # function body
        lw $s0, 0($sp)
        lw $ra, 4($sp)
        addi $sp, $sp, 8
        jr $ra
```
- What is the purpose of each instruction?
- What is saved on the stack?
- Why is this necessary?

**CA 5.2** Write a MIPS function that:
- Takes two arguments in $a0 and $a1
- Returns their sum in $v0
- Follows MIPS calling conventions

---

## Problem-Solving Exercises

### Problem 1: Instruction Design

**PS 1.1** Design an instruction format for a processor with:
- 32 general-purpose registers
- 16-bit memory addresses
- Need to support: 3-address arithmetic, 2-address moves, load/store, branches
- Determine:
  - How many bits for register fields?
  - How many bits for address fields?
  - Instruction format(s) needed
  - Total instruction size

**PS 1.2** Compare RISC vs. CISC instruction sets:
- RISC: Simple instructions, fixed length, load-store
- CISC: Complex instructions, variable length, memory operands
- For a specific operation (e.g., array element access), compare:
  - Number of instructions needed
  - Total code size
  - Execution time
  - Hardware complexity

### Problem 2: MIPS Code Generation

**PS 2.1** Convert the following C code to MIPS assembly:
```c
int sum = 0;
for (int i = 0; i < 10; i++) {
    sum = sum + array[i];
}
```
- Use appropriate registers
- Handle array indexing
- Implement the loop
- Show complete code

**PS 2.2** Optimize the following MIPS code:
```mips
lw $t0, 0($s0)
addi $t0, $t0, 1
sw $t0, 0($s0)
lw $t1, 4($s0)
addi $t1, $t1, 1
sw $t1, 4($s0)
```
- Identify inefficiencies
- Suggest optimizations
- Show optimized code

### Problem 3: Addressing Mode Analysis

**PS 3.1** For each addressing mode, determine:
- Number of memory accesses required
- Instruction size
- Flexibility
- Speed
- Use cases

**PS 3.2** Design a memory addressing scheme for:
- 32-bit addresses
- Support for: direct, indirect, indexed, base+offset
- Determine instruction format
- Calculate instruction sizes
- Compare with MIPS approach

### Problem 4: Procedure Implementation

**PS 4.1** Implement a recursive factorial function in MIPS:
```c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}
```
- Handle stack frames
- Save/restore registers
- Pass arguments
- Return values
- Handle recursion

**PS 4.2** Analyze stack usage for nested procedure calls:
- Function A calls Function B
- Function B calls Function C
- Show stack frames at each level
- Calculate stack space needed
- Show register save/restore

### Problem 5: Performance Analysis

**PS 5.1** Compare instruction sequences for `x = y + z`:
- Three-address: `ADD x, y, z` (1 instruction)
- Two-address: `MOVE x, y` then `ADD x, z` (2 instructions)
- One-address: Load y, Add z, Store x (3 instructions)
- Calculate: code size, execution time, memory accesses

**PS 5.2** Analyze MIPS code efficiency:
- Original: 10 instructions, 5 memory accesses
- Optimized: 8 instructions, 3 memory accesses
- If each instruction takes 1 cycle and memory access takes 10 cycles:
  - Calculate execution time for each
  - Calculate speedup
  - Identify optimization techniques used

---

## Conceptual Questions

### Concept 1: Instruction Set Design

**CQ 1.1** Discuss the trade-offs between RISC and CISC instruction set architectures. When would you choose each?

**CQ 1.2** Explain why fixed-length instructions (like MIPS) are easier to pipeline than variable-length instructions.

**CQ 1.3** What are the advantages and disadvantages of having many addressing modes vs. few addressing modes?

### Concept 2: MIPS Architecture

**CQ 2.1** Why does MIPS use a load-store architecture? What are the benefits and limitations?

**CQ 2.2** Explain how MIPS design principles (simplicity, regularity, make common case fast) are reflected in the instruction set.

**CQ 2.3** How does MIPS balance the need for instruction variety with the goal of simplicity?

### Concept 3: Addressing Modes

**CQ 3.1** Why does MIPS support only three addressing modes when other architectures support many more?

**CQ 3.2** Explain how PC-relative addressing enables position-independent code.

**CQ 3.3** Discuss the trade-offs between different addressing modes in terms of instruction size, execution speed, and flexibility.

### Concept 4: Procedures and Stack

**CQ 4.1** Why is a stack necessary for procedure calls? Could procedures work without a stack?

**CQ 4.2** Explain the difference between caller-saved and callee-saved registers. Why is this distinction important?

**CQ 4.3** How does the stack frame layout affect procedure call efficiency and recursion support?

### Concept 5: Modern Architectures

**CQ 5.1** How do modern processor features (pipelining, superscalar, out-of-order execution) influence instruction set design?

**CQ 5.2** Compare MIPS with modern architectures (ARM, x86). What design principles have persisted, and what has changed?

**CQ 5.3** Discuss how instruction set design affects compiler optimization opportunities.

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - c | 1.2 - b | 1.3 - c | 1.4 - c | 1.5 - d

**Section 2:**
2.1 - d | 2.2 - b | 2.3 - b | 2.4 - b | 2.5 - c

**Section 3:**
3.1 - c | 3.2 - c | 3.3 - b | 3.4 - b | 3.5 - b

**Section 4:**
4.1 - c | 4.2 - b | 4.3 - b | 4.4 - b | 4.5 - c

**Section 5:**
5.1 - b | 5.2 - b | 5.3 - b | 5.4 - b | 5.5 - b

**Section 6:**
6.1 - c | 6.2 - b | 6.3 - b | 6.4 - a | 6.5 - c

**Section 7:**
7.1 - b | 7.2 - a | 7.3 - b | 7.4 - a | 7.5 - c

### True/False Answers

**Section 1:**
1.1 - True | 1.2 - True | 1.3 - False | 1.4 - True

**Section 2:**
2.1 - True | 2.2 - True | 2.3 - False | 2.4 - True

**Section 3:**
3.1 - True | 3.2 - True | 3.3 - False | 3.4 - True

**Section 4:**
4.1 - True | 4.2 - True | 4.3 - True | 4.4 - True

**Section 5:**
5.1 - True | 5.2 - True | 5.3 - False | 5.4 - True

**Section 6:**
6.1 - True | 6.2 - True | 6.3 - True | 6.4 - True

**Section 7:**
7.1 - True | 7.2 - True | 7.3 - True | 7.4 - True

---

*End of Group 3 Exercises*


