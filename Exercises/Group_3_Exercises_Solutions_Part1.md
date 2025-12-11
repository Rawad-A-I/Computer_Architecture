# Group 3: Instruction Set Architecture (ISA)
## Comprehensive Exercise Solutions - Part 1

**Chapters 12-13: Instruction Sets & Addressing Modes**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)
3. [Short Answer Solutions (Sections 1-3)](#short-answer-solutions-sections-1-3)

---

## Multiple Choice Solutions

### Section 1: Instruction Set Fundamentals

**1.1** Every machine instruction consists of how many essential elements?

**Answer: c) Four**

**Explanation:**
- Every machine instruction has four essential elements:
  1. Operation Code (Opcode) - what operation to perform
  2. Source Operand Reference - where to get input operands
  3. Result Operand Reference - where to store the result
  4. Next Instruction Reference - where to get the next instruction
- These four elements define what the instruction does and how it fits into program execution.

---

**1.2** The operation code (opcode) specifies:

**Answer: b) What operation to perform**

**Explanation:**
- The opcode (operation code) is a binary code that specifies the operation
- Examples: ADD, SUBTRACT, LOAD, STORE, JUMP, BRANCH
- It tells the processor what action to take
- The opcode does not specify where operands are or where results go (those are separate fields)

---

**1.3** In a three-address instruction format, how many addresses are specified?

**Answer: c) Three**

**Explanation:**
- Three-address format: `OP destination, source1, source2`
- Example: `ADD R1, R2, R3` means R1 = R2 + R3
- Three addresses: destination, source1, source2
- This format is common in RISC architectures like MIPS

---

**1.4** Zero-address instructions typically use:

**Answer: c) A stack**

**Explanation:**
- Zero-address instructions don't specify operands explicitly
- Operands are taken from the top of a stack
- Results are pushed back onto the stack
- Example: `ADD` pops two values, adds them, pushes result
- Used in stack-based architectures and some virtual machines

---

**1.5** Which addressing format typically requires the fewest instruction bits?

**Answer: d) Zero-address**

**Explanation:**
- Zero-address: No address fields needed (operands on stack)
- One-address: One address field
- Two-address: Two address fields
- Three-address: Three address fields
- Fewer address fields = fewer bits needed in instruction
- However, zero-address may require more instructions to accomplish the same task

---

### Section 2: Operands and Operations

**2.1** Which of the following is NOT a type of operand?

**Answer: d) Instructions**

**Explanation:**
- The four main types of operands are:
  1. Addresses - memory locations
  2. Numbers - integers, floating-point
  3. Characters - ASCII, Unicode
  4. Logical Data - bits, flags
- Instructions are not operands - they are the operations themselves
- Instructions operate on operands, but instructions are not a type of operand

---

**2.2** Floating-point numbers are used to represent:

**Answer: b) Real numbers with decimal points**

**Explanation:**
- Floating-point numbers represent real numbers (numbers with fractional parts)
- Examples: 3.14159, -0.5, 1.23e10
- They use scientific notation: sign × mantissa × 2^exponent
- Can represent very large and very small numbers
- Different from integers which represent whole numbers only

---

**2.3** Which operation category includes ADD, SUBTRACT, MULTIPLY, and DIVIDE?

**Answer: b) Arithmetic**

**Explanation:**
- Arithmetic operations perform mathematical calculations
- ADD, SUBTRACT, MULTIPLY, DIVIDE are all arithmetic operations
- They operate on numeric operands
- Data Transfer moves data, Logical performs bitwise operations, I/O handles input/output

---

**2.4** The operation that moves data from one location to another is:

**Answer: b) Data Transfer**

**Explanation:**
- Data Transfer operations move data between locations
- Examples: LOAD (memory to register), STORE (register to memory), MOVE (register to register)
- They don't modify the data, just copy it
- Essential for getting data to where it's needed

---

**2.5** Branch and jump instructions belong to which operation category?

**Answer: c) Transfer of Control**

**Explanation:**
- Transfer of Control operations change program flow
- Branch: conditional jump (if condition is true, jump)
- Jump: unconditional jump (always jump)
- They change the Program Counter (PC) to a new address
- Essential for loops, conditionals, and procedure calls

---

### Section 3: MIPS Architecture

**3.1** MIPS uses how many instruction formats?

**Answer: c) Three**

**Explanation:**
- MIPS uses three instruction formats:
  1. R-format (Register format) - for register-to-register operations
  2. I-format (Immediate format) - for immediate operations, loads, stores, branches
  3. J-format (Jump format) - for jump instructions
- This simplicity makes MIPS easy to decode and pipeline

---

**3.2** In MIPS, all instructions are:

**Answer: c) 32 bits**

**Explanation:**
- MIPS uses fixed-length 32-bit instructions
- All instructions are exactly 32 bits (4 bytes)
- This simplifies instruction fetch and decoding
- Makes pipelining easier (all instructions same size)
- Contrasts with variable-length instruction sets (like x86)

---

**3.3** MIPS is a:

**Answer: b) RISC architecture**

**Explanation:**
- MIPS = Microprocessor without Interlocked Pipeline Stages
- RISC = Reduced Instruction Set Computer
- Characteristics: Simple instructions, fixed length, load-store architecture
- Designed for efficient pipelining
- Contrasts with CISC (Complex Instruction Set Computer)

---

**3.4** In MIPS, memory is:

**Answer: b) Byte-addressable**

**Explanation:**
- MIPS memory is byte-addressable
- Each memory address refers to 1 byte (8 bits)
- Words are 32 bits = 4 bytes
- Word addresses must be aligned (multiple of 4)
- Allows access to individual bytes, halfwords, words

---

**3.5** MIPS word size is:

**Answer: b) 32 bits**

**Explanation:**
- MIPS word = 32 bits = 4 bytes
- This is the natural data size for MIPS operations
- Registers are 32 bits
- Most operations work on 32-bit words
- Some MIPS variants use 64-bit (MIPS64)

---

### Section 4: MIPS Instruction Formats

**4.1** The R-format instruction is used for:

**Answer: c) Register-to-register operations**

**Explanation:**
- R-format is used for operations between registers
- Examples: ADD, SUBTRACT, AND, OR (register versions)
- Format: `op rs rt rd shamt funct`
- No immediate values or memory addresses
- Fastest operations (no memory access)

---

**4.2** In R-format, the funct field is:

**Answer: b) 6 bits**

**Explanation:**
- R-format structure:
  - op: 6 bits
  - rs: 5 bits
  - rt: 5 bits
  - rd: 5 bits
  - shamt: 5 bits
  - funct: 6 bits
- When opcode is 0, funct field specifies the actual operation
- 6 bits allows 64 different operations

---

**4.3** I-format instructions include:

**Answer: b) Load, store, and immediate operations**

**Explanation:**
- I-format is used for:
  - Immediate arithmetic: `addi`, `ori`, `andi`
  - Load instructions: `lw`, `lh`, `lb`
  - Store instructions: `sw`, `sh`, `sb`
  - Branch instructions: `beq`, `bne`, `blt`
- Format: `op rs rt immediate`

---

**4.4** In I-format, the immediate field is:

**Answer: b) 16 bits**

**Explanation:**
- I-format structure:
  - op: 6 bits
  - rs: 5 bits
  - rt: 5 bits
  - immediate: 16 bits
- 16-bit immediate is signed (can represent -32768 to +32767)
- For larger values, need multiple instructions

---

**4.5** J-format is used for:

**Answer: c) Jump instructions**

**Explanation:**
- J-format is used for jump instructions (`j`, `jal`)
- Format: `op address`
  - op: 6 bits
  - address: 26 bits
- 26-bit address is combined with PC to form 32-bit jump target
- Used for long-distance jumps

---

### Section 5: MIPS Memory Operations

**5.1** In MIPS load-store architecture:

**Answer: b) Only load and store instructions access memory**

**Explanation:**
- MIPS is a load-store architecture
- Only `lw`, `sw`, `lh`, `sh`, `lb`, `sb` instructions access memory
- Arithmetic operations work only on registers
- Must load data from memory to registers before operating
- Must store results from registers to memory after operating
- This simplifies the architecture and enables efficient pipelining

---

**5.2** The instruction `lw $t0, 8($s0)` loads:

**Answer: b) A word (4 bytes) from address ($s0 + 8)**

**Explanation:**
- `lw` = load word (32 bits = 4 bytes)
- Format: `lw rt, offset(base)`
- Effective address = contents of base register + offset
- `lw $t0, 8($s0)` loads word from address ($s0 + 8) into $t0
- The offset (8) is added to the base register ($s0) value

---

**5.3** In MIPS, word addresses must be:

**Answer: b) Aligned to word boundaries (multiple of 4)**

**Explanation:**
- MIPS requires word alignment
- Word addresses must be multiples of 4 (0, 4, 8, 12, ...)
- This simplifies hardware design
- Misaligned accesses cause exceptions
- Halfwords must be aligned to 2-byte boundaries

---

**5.4** The base register in `sw $t1, 12($s2)` is:

**Answer: b) $s2**

**Explanation:**
- Format: `sw rt, offset(base)`
- `sw $t1, 12($s2)` stores $t1 to address ($s2 + 12)
- Base register is $s2 (provides base address)
- Offset is 12 (added to base)
- $t1 is the source register (data to store)

---

**5.5** MIPS uses which endianness by default?

**Answer: b) Big endian**

**Explanation:**
- MIPS uses big endian by default
- Big endian: most significant byte at lowest address
- Example: 0x12345678 stored as:
  - Address 0: 0x12 (MSB)
  - Address 1: 0x34
  - Address 2: 0x56
  - Address 3: 0x78 (LSB)
- Some MIPS implementations support both (bi-endian)

---

### Section 6: Addressing Modes

**6.1** Immediate addressing means:

**Answer: c) The operand is part of the instruction**

**Explanation:**
- Immediate addressing: operand value is encoded in the instruction
- Example: `addi $t0, $t1, 100` - 100 is immediate value
- No memory access needed for operand
- Fastest addressing mode
- Limited range (16 bits in MIPS)

---

**6.2** Direct addressing means:

**Answer: b) The address is part of the instruction**

**Explanation:**
- Direct addressing: memory address is encoded in instruction
- Instruction contains the actual address
- Example: `LOAD R1, 1000` - address 1000 is in instruction
- One memory access to get operand
- Limited address range (size of address field)

---

**6.3** Register indirect addressing means:

**Answer: b) The register contains the address**

**Explanation:**
- Register indirect: register holds the memory address
- Example: `LOAD R1, (R2)` - R2 contains address, load from that address
- Two steps: read register, then access memory
- Flexible - address can be computed
- Common in MIPS: `lw $t0, 0($s0)` uses $s0 as base address

---

**6.4** Displacement addressing uses:

**Answer: a) Base register + offset**

**Explanation:**
- Displacement (base + offset) addressing:
  - Base register provides base address
  - Offset (immediate value) is added
  - Effective address = base + offset
- Example: `lw $t0, 8($s0)` - address = $s0 + 8
- Very common in MIPS for array access, stack frames

---

**6.5** MIPS supports how many addressing modes?

**Answer: c) Three**

**Explanation:**
- MIPS supports three addressing modes:
  1. Base or Displacement: `lw $t0, offset($s0)`
  2. PC-Relative: `beq $t0, $t1, label` (PC + offset)
  3. Pseudodirect: `j target` (PC[31:28] || address || 00)
- This simplicity is a key MIPS design principle

---

### Section 7: MIPS Procedures and Stack

**7.1** In MIPS, function arguments are typically passed in:

**Answer: b) Registers $a0-$a3**

**Explanation:**
- MIPS calling convention uses registers for arguments
- $a0, $a1, $a2, $a3 for first 4 arguments
- Additional arguments passed on stack
- Fast (no memory access)
- Limited to 4 register arguments

---

**7.2** The return address in MIPS procedure calls is stored in:

**Answer: a) $ra register**

**Explanation:**
- `jal` (jump and link) instruction:
  - Jumps to procedure address
  - Saves return address in $ra (return address register)
- Procedure returns using `jr $ra` (jump register)
- If procedure calls another procedure, must save $ra on stack

---

**7.3** Function return values in MIPS are typically returned in:

**Answer: b) $v0-$v1**

**Explanation:**
- MIPS uses $v0 and $v1 for return values
- $v0 for single return value (most common)
- $v1 for second return value (if needed)
- Fast (register-based)
- Convention, not hardware requirement

---

**7.4** The stack pointer in MIPS is:

**Answer: a) $sp**

**Explanation:**
- $sp (register 29) is the stack pointer
- Points to top of stack
- Stack grows downward (toward lower addresses)
- Modified by `addi $sp, $sp, -size` to allocate stack frame
- Restored by `addi $sp, $sp, size` to deallocate

---

**7.5** A stack frame typically contains:

**Answer: c) Local variables, saved registers, and return address**

**Explanation:**
- Stack frame (activation record) contains:
  - Saved registers (callee-saved: $s0-$s7, $ra)
  - Local variables
  - Return address (if function calls another)
  - Space for outgoing arguments (if more than 4)
- Layout varies by compiler and function needs

---

## True/False Solutions

**T/F 1.1** Every machine instruction must specify an operation code (opcode).

**Answer: True**

**Explanation:**
- Opcode is essential - it tells the processor what operation to perform
- Without opcode, processor doesn't know what to do
- All instructions have an opcode field

---

**T/F 1.2** Three-address instructions require more instruction bits than two-address instructions.

**Answer: True**

**Explanation:**
- Three-address: 3 address fields
- Two-address: 2 address fields
- More address fields = more bits needed
- Trade-off: more bits but potentially fewer instructions needed

---

**T/F 1.3** Zero-address instructions are the most common in modern processors.

**Answer: False**

**Explanation:**
- Zero-address (stack-based) is not common in modern processors
- Most modern processors use two-address or three-address formats
- Zero-address used in some virtual machines (Java VM) but not in hardware

---

**T/F 1.4** The number of addresses in an instruction affects both instruction length and execution speed.

**Answer: True**

**Explanation:**
- More addresses = longer instructions (more bits)
- But may require fewer instructions total
- Fewer addresses = shorter instructions but may need more instructions
- Affects code size, memory bandwidth, and execution efficiency

---

**T/F 2.1** Characters are typically represented using ASCII or Unicode encoding.

**Answer: True**

**Explanation:**
- ASCII: 7-bit encoding (128 characters)
- Unicode: multi-byte encoding (supports many languages)
- Characters stored as numeric codes
- Processors treat characters as numbers

---

**T/F 2.2** Logical operations include AND, OR, NOT, and XOR.

**Answer: True**

**Explanation:**
- Logical (bitwise) operations:
  - AND: bitwise and
  - OR: bitwise or
  - NOT: bitwise complement
  - XOR: exclusive or
- Operate on individual bits

---

**T/F 2.3** I/O operations are always performed using special I/O instructions.

**Answer: False**

**Explanation:**
- Some architectures use memory-mapped I/O (no special I/O instructions)
- I/O devices mapped to memory addresses
- Regular load/store instructions access I/O
- MIPS uses memory-mapped I/O

---

**T/F 2.4** Conversion operations change data from one format to another.

**Answer: True**

**Explanation:**
- Conversion operations transform data:
  - Integer to floating-point
  - Signed to unsigned
  - Byte to word
  - ASCII to binary
- Essential for data type compatibility

---

**T/F 3.1** MIPS uses fixed-length 32-bit instructions for simplicity.

**Answer: True**

**Explanation:**
- Fixed 32-bit length simplifies:
  - Instruction fetch
  - Decoding
  - Pipelining
- All instructions same size = predictable

---

**T/F 3.2** MIPS is a load-store architecture, meaning only load and store instructions access memory.

**Answer: True**

**Explanation:**
- Load-store architecture: only memory access instructions touch memory
- Arithmetic works only on registers
- Must explicitly load/store data
- Simplifies pipeline design

---

**T/F 3.3** In MIPS, all registers are general-purpose and can be used for any purpose.

**Answer: False**

**Explanation:**
- MIPS has register usage conventions:
  - $zero: always 0
  - $at: assembler temporary
  - $v0-$v1: return values
  - $a0-$a3: arguments
  - $s0-$s7: saved (callee-saved)
  - $t0-$t9: temporary (caller-saved)
  - $sp, $ra, $gp: special purpose
- Conventions, not hardware restrictions

---

**T/F 3.4** MIPS word addresses must be aligned to 4-byte boundaries.

**Answer: True**

**Explanation:**
- Word = 4 bytes
- Word addresses must be multiples of 4
- Hardware enforces alignment
- Misaligned access causes exception

---

**T/F 4.1** R-format instructions use the funct field to specify the operation when opcode is 0.

**Answer: True**

**Explanation:**
- When opcode = 0, it's an R-format instruction
- funct field (6 bits) specifies actual operation
- Allows many R-format operations with same opcode
- Example: op=0, funct=32 = ADD

---

**T/F 4.2** I-format instructions can be used for both arithmetic and memory operations.

**Answer: True**

**Explanation:**
- I-format used for:
  - Immediate arithmetic: `addi`, `ori`
  - Load: `lw`, `lh`, `lb`
  - Store: `sw`, `sh`, `sb`
  - Branch: `beq`, `bne`
- All use same format, different opcodes

---

**T/F 4.3** J-format instructions use a 26-bit address field for the jump target.

**Answer: True**

**Explanation:**
- J-format: 6-bit opcode + 26-bit address
- 26-bit address combined with PC to form 32-bit target
- Used for `j` and `jal` instructions
- Allows jumps within 256MB region

---

**T/F 4.4** All MIPS instructions fit into one of three formats: R, I, or J.

**Answer: True**

**Explanation:**
- MIPS design principle: simplicity
- All instructions use one of three formats
- Makes decoding simple and regular
- Easier to pipeline

---

**T/F 5.1** In MIPS, you cannot perform arithmetic directly on memory operands.

**Answer: True**

**Explanation:**
- MIPS is load-store architecture
- Arithmetic works only on registers
- Must load memory to register first
- Then perform arithmetic
- Then store result back if needed

---

**T/F 5.2** The instruction `lw $t0, 0($s0)` loads a word from the address stored in $s0.

**Answer: True**

**Explanation:**
- `lw $t0, 0($s0)` means:
  - Effective address = $s0 + 0 = $s0
  - Load word from that address into $t0
- Base register $s0 provides address
- Offset 0 means no displacement

---

**T/F 5.3** MIPS supports unaligned memory accesses for words.

**Answer: False**

**Explanation:**
- MIPS requires word alignment
- Word addresses must be multiples of 4
- Unaligned access causes exception
- Hardware enforces this

---

**T/F 5.4** Big endian stores the most significant byte at the lowest address.

**Answer: True**

**Explanation:**
- Big endian: MSB at lowest address
- Example: 0x12345678
  - Address 0: 0x12 (MSB)
  - Address 3: 0x78 (LSB)
- MIPS default is big endian

---

**T/F 6.1** Immediate addressing is the fastest because the operand is in the instruction.

**Answer: True**

**Explanation:**
- Immediate: operand in instruction
- No memory access needed
- No register read needed
- Fastest addressing mode
- But limited range

---

**T/F 6.2** Register addressing is faster than memory addressing.

**Answer: True**

**Explanation:**
- Registers are fastest storage (in CPU)
- Memory access is slower (off-chip, through bus)
- Register operations: 1 cycle
- Memory operations: multiple cycles
- Registers are preferred for speed

---

**T/F 6.3** MIPS uses PC-relative addressing for branch instructions.

**Answer: True**

**Explanation:**
- Branch instructions use PC-relative addressing
- Target = PC + 4 + (offset × 4)
- Offset is 16-bit signed immediate
- Allows branches within ±32KB (in instructions)
- Position-independent code

---

**T/F 6.4** Displacement addressing combines a base register with an offset.

**Answer: True**

**Explanation:**
- Displacement: effective address = base + offset
- Base from register, offset from instruction
- Very common in MIPS: `lw $t0, offset($s0)`
- Useful for arrays, stack frames, structures

---

**T/F 7.1** MIPS procedure calls use the jal instruction to jump and link.

**Answer: True**

**Explanation:**
- `jal` = jump and link
- Jumps to procedure address
- Saves return address in $ra
- Procedure returns with `jr $ra`

---

**T/F 7.2** The stack grows downward (toward lower addresses) in MIPS.

**Answer: True**

**Explanation:**
- MIPS stack grows downward
- Allocate: `addi $sp, $sp, -size` (decrease $sp)
- Deallocate: `addi $sp, $sp, size` (increase $sp)
- Common convention (also used in x86)

---

**T/F 7.3** Saved registers must be preserved by the callee function.

**Answer: True**

**Explanation:**
- Callee-saved registers: $s0-$s7, $ra
- If callee uses them, must save on stack
- Must restore before returning
- Caller can assume they're unchanged

---

**T/F 7.4** The frame pointer ($fp) points to the top of the current stack frame.

**Answer: False**

**Explanation:**
- $fp (frame pointer) points to fixed location in stack frame
- Typically points to saved $fp of previous frame
- Allows easy access to local variables and arguments
- $sp points to top of stack (changes during function)

---

*[Continued in Part 2 with Short Answer Solutions...]*
