# Group 3: Instruction Set Architecture (ISA)
## Comprehensive Exercise Solutions - Part 1

**Chapters 12-13: Instruction Sets & Addressing Modes**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)

---

## Multiple Choice Solutions

### Section 1: Instruction Set Fundamentals

**1.1** Every machine instruction consists of how many essential elements?

**Answer: c) Four**

**Explanation:**
- Every machine instruction has four essential elements:
  1. Operation Code (Opcode) - what operation to perform
  2. Source Operand Reference - where to get inputs
  3. Result Operand Reference - where to store output
  4. Next Instruction Reference - where to get next instruction
- These four elements are necessary for complete instruction specification.

---

**1.2** The operation code (opcode) specifies:

**Answer: b) What operation to perform**

**Explanation:**
- Opcode (operation code) identifies the specific operation
- Examples: ADD, SUBTRACT, LOAD, STORE, JUMP
- It tells the processor what action to take
- Does not specify operands or results (those are separate fields)

---

**1.3** In a three-address instruction format, how many addresses are specified?

**Answer: c) Three**

**Explanation:**
- Three-address format: `OP dest, src1, src2`
- Example: `ADD R1, R2, R3` (R1 = R2 + R3)
- Specifies: destination address, source address 1, source address 2
- Total: 3 addresses explicitly specified in the instruction

---

**1.4** Zero-address instructions typically use:

**Answer: c) A stack**

**Explanation:**
- Zero-address instructions don't specify operands explicitly
- Operands are on a stack (implicit)
- Example: `ADD` pops two values, adds them, pushes result
- Stack-based architecture (like Java Virtual Machine)
- Reduces instruction size but requires stack management

---

**1.5** Which addressing format typically requires the fewest instruction bits?

**Answer: d) Zero-address**

**Explanation:**
- Zero-address: No address fields needed (operands on stack)
- One-address: 1 address field
- Two-address: 2 address fields
- Three-address: 3 address fields
- Fewer address fields = fewer bits needed
- However, zero-address may need more instructions to accomplish same task

---

### Section 2: Operands and Operations

**2.1** Which of the following is NOT a type of operand?

**Answer: d) Instructions**

**Explanation:**
- The four main types of operands are:
  1. Addresses - memory locations
  2. Numbers - integers, floating-point
  3. Characters - text data
  4. Logical Data - bits, flags
- Instructions are not operands - they are the operations themselves
- Instructions operate on operands

---

**2.2** Floating-point numbers are used to represent:

**Answer: b) Real numbers with decimal points**

**Explanation:**
- Floating-point represents real numbers (numbers with fractional parts)
- Examples: 3.14, -0.5, 1.23e10
- Can represent very large and very small numbers
- Uses scientific notation (mantissa × base^exponent)
- Different from integers which are whole numbers only

---

**2.3** Which operation category includes ADD, SUBTRACT, MULTIPLY, and DIVIDE?

**Answer: b) Arithmetic**

**Explanation:**
- Arithmetic operations perform mathematical calculations
- ADD, SUBTRACT, MULTIPLY, DIVIDE are all arithmetic
- Operate on numeric operands
- Produce numeric results
- Different from logical operations (AND, OR) which operate on bits

---

**2.4** The operation that moves data from one location to another is:

**Answer: b) Data Transfer**

**Explanation:**
- Data Transfer operations move/copy data
- Examples: LOAD, STORE, MOVE, PUSH, POP
- Transfer data between: registers, memory, I/O
- Do not modify data, just move it
- Essential for getting data to where it's needed

---

**2.5** Branch and jump instructions belong to which operation category?

**Answer: c) Transfer of Control**

**Explanation:**
- Transfer of Control operations change program flow
- Branch: conditional jump (if condition is true)
- Jump: unconditional jump
- Call: procedure/function call
- Return: return from procedure
- These change the Program Counter (PC)

---

### Section 3: MIPS Architecture

**3.1** MIPS uses how many instruction formats?

**Answer: c) Three**

**Explanation:**
- MIPS uses three instruction formats:
  1. R-format (Register format) - register operations
  2. I-format (Immediate format) - immediate, load, store, branch
  3. J-format (Jump format) - jump instructions
- All instructions fit into one of these three formats
- This simplicity aids pipelining and hardware design

---

**3.2** In MIPS, all instructions are:

**Answer: c) 32 bits**

**Explanation:**
- MIPS uses fixed-length 32-bit instructions
- All instructions are exactly 32 bits
- Simplifies instruction fetch and decode
- Makes pipelining easier (no variable-length instruction complexity)
- Trade-off: some bits may be unused in some instructions

---

**3.3** MIPS is a:

**Answer: b) RISC architecture**

**Explanation:**
- MIPS = Microprocessor without Interlocked Pipeline Stages
- RISC = Reduced Instruction Set Computer
- Characteristics: simple instructions, fixed length, load-store architecture
- Contrast with CISC (Complex Instruction Set Computer) like x86
- RISC philosophy: simpler hardware, let compiler do more work

---

**3.4** In MIPS, memory is:

**Answer: b) Byte-addressable**

**Explanation:**
- MIPS memory is byte-addressable
- Each memory address refers to 1 byte (8 bits)
- Words are 32 bits = 4 bytes
- Word addresses must be aligned (multiple of 4)
- Allows fine-grained memory access

---

**3.5** MIPS word size is:

**Answer: b) 32 bits**

**Explanation:**
- MIPS word = 32 bits = 4 bytes
- This is the natural data size for MIPS
- Registers are 32 bits
- Most operations work on 32-bit words
- Some MIPS variants support 64-bit (MIPS64)

---

### Section 4: MIPS Instruction Formats

**4.1** The R-format instruction is used for:

**Answer: c) Register-to-register operations**

**Explanation:**
- R-format (Register format) is for operations between registers
- Examples: ADD, SUBTRACT, AND, OR (register versions)
- Format: `OP rd, rs, rt` where all operands are registers
- No memory access, no immediate values
- Fastest operations (all data in registers)

---

**4.2** In R-format, the funct field is:

**Answer: b) 6 bits**

**Explanation:**
- R-format structure: op (6) + rs (5) + rt (5) + rd (5) + shamt (5) + funct (6) = 32 bits
- funct field is 6 bits (allows 64 different operations)
- Used when opcode is 0 (special opcode for R-format)
- Specifies the actual operation (ADD, SUB, AND, etc.)

---

**4.3** I-format instructions include:

**Answer: b) Load, store, and immediate operations**

**Explanation:**
- I-format (Immediate format) is used for:
  - Load instructions: `lw` (load word)
  - Store instructions: `sw` (store word)
  - Immediate arithmetic: `addi` (add immediate)
  - Branch instructions: `beq`, `bne` (branch if equal/not equal)
- Contains a 16-bit immediate value or offset

---

**4.4** In I-format, the immediate field is:

**Answer: b) 16 bits**

**Explanation:**
- I-format structure: op (6) + rs (5) + rt (5) + immediate (16) = 32 bits
- Immediate field is 16 bits
- Can represent values from -32,768 to 32,767 (signed)
- Or 0 to 65,535 (unsigned)
- For larger values, need multiple instructions

---

**4.5** J-format is used for:

**Answer: c) Jump instructions**

**Explanation:**
- J-format (Jump format) is for unconditional jump instructions
- Examples: `j` (jump), `jal` (jump and link)
- Format: op (6) + address (26) = 32 bits
- 26-bit address field for jump target
- Used for long-distance jumps

---

### Section 5: MIPS Memory Operations

**5.1** In MIPS load-store architecture:

**Answer: b) Only load and store instructions access memory**

**Explanation:**
- MIPS is a load-store architecture
- Only `lw` (load word) and `sw` (store word) access memory
- Arithmetic operations work only on registers
- Must load data from memory to registers first
- Then perform operations on registers
- Then store results back to memory if needed

---

**5.2** The instruction `lw $t0, 8($s0)` loads:

**Answer: b) A word (4 bytes) from address ($s0 + 8)**

**Explanation:**
- `lw` = load word (32 bits = 4 bytes)
- Format: `lw rt, offset(base)`
- Effective address = contents of base register + offset
- `lw $t0, 8($s0)` loads word from address = ($s0) + 8
- Loads 4 bytes (one word) into register $t0

---

**5.3** In MIPS, word addresses must be:

**Answer: b) Aligned to word boundaries (multiple of 4)**

**Explanation:**
- MIPS requires word alignment
- Word addresses must be multiples of 4 (0, 4, 8, 12, ...)
- Hardware enforces this - misaligned access causes exception
- Byte addresses: 0, 1, 2, 3, 4, 5, 6, 7, ...
- Word addresses: 0, 4, 8, 12, ...
- Simplifies hardware design

---

**5.4** The base register in `sw $t1, 12($s2)` is:

**Answer: b) $s2**

**Explanation:**
- Format: `sw rt, offset(base)`
- `sw $t1, 12($s2)` means:
  - Store register $t1 to memory
  - Base register is $s2
  - Offset is 12
  - Effective address = ($s2) + 12
- $t1 is the source register (data to store)
- $s2 is the base register (address calculation)

---

**5.5** MIPS uses which endianness by default?

**Answer: b) Big endian**

**Explanation:**
- MIPS uses big endian by default
- Big endian: most significant byte at lowest address
- Example: 0x12345678 stored at address 100:
  - Address 100: 0x12 (MSB)
  - Address 101: 0x34
  - Address 102: 0x56
  - Address 103: 0x78 (LSB)
- Some MIPS implementations support both (bi-endian)

---

### Section 6: Addressing Modes

**6.1** Immediate addressing means:

**Answer: c) The operand is part of the instruction**

**Explanation:**
- Immediate addressing: operand value is in the instruction itself
- Example: `addi $t0, $t1, 100` - 100 is immediate value
- No memory access needed for operand
- Fastest (value already available)
- Limited range (16 bits in MIPS)

---

**6.2** Direct addressing means:

**Answer: b) The address is part of the instruction**

**Explanation:**
- Direct addressing: memory address is in the instruction
- Instruction contains the actual memory address
- Example: `LOAD R1, 1000` - address 1000 is in instruction
- One memory access to get operand
- Limited address range (can only address part of memory)

---

**6.3** Register indirect addressing means:

**Answer: b) The register contains the address**

**Explanation:**
- Register indirect: register holds the memory address
- Example: `LOAD R1, (R2)` - R2 contains address, load from that address
- Two steps: read register to get address, then access memory
- More flexible than direct (address can be computed)
- Common in MIPS: `lw $t0, 0($s0)` uses $s0 as base address

---

**6.4** Displacement addressing uses:

**Answer: a) Base register + offset**

**Explanation:**
- Displacement (base + offset) addressing:
  - Base register contains base address
  - Offset is constant in instruction
  - Effective address = base + offset
- Example: `lw $t0, 8($s0)` - EA = ($s0) + 8
- Very common in MIPS
- Good for arrays and structures

---

**6.5** MIPS supports how many addressing modes?

**Answer: c) Three**

**Explanation:**
- MIPS supports three addressing modes:
  1. Base or Displacement: base register + offset (for load/store)
  2. PC-Relative: PC + offset (for branches)
  3. Pseudodirect: PC[31:28] || address (for jumps)
- Simplicity is a MIPS design principle
- Other architectures support more modes, but MIPS keeps it simple

---

### Section 7: MIPS Procedures and Stack

**7.1** In MIPS, function arguments are typically passed in:

**Answer: b) Registers $a0-$a3**

**Explanation:**
- MIPS calling convention uses registers for arguments
- First 4 arguments: $a0, $a1, $a2, $a3
- Additional arguments go on stack
- Fast (register access) for common case (≤4 arguments)
- Part of MIPS design: make common case fast

---

**7.2** The return address in MIPS procedure calls is stored in:

**Answer: a) $ra register**

**Explanation:**
- `jal` (jump and link) instruction:
  - Jumps to procedure
  - Saves return address in $ra (register 31)
- Return with `jr $ra` (jump register)
- Fast (register) for common case
- Must save $ra if procedure makes nested calls

---

**7.3** Function return values in MIPS are typically returned in:

**Answer: b) $v0-$v1**

**Explanation:**
- MIPS uses $v0 and $v1 for return values
- $v0 for single return value (most common)
- $v1 for second return value (if needed)
- Fast register access
- Part of standard MIPS calling convention

---

**7.4** The stack pointer in MIPS is:

**Answer: a) $sp**

**Explanation:**
- $sp (register 29) is the stack pointer
- Points to top of stack
- Stack grows downward (toward lower addresses)
- Decremented when pushing, incremented when popping
- Must be preserved across procedure calls

---

**7.5** A stack frame typically contains:

**Answer: c) Local variables, saved registers, and return address**

**Explanation:**
- Stack frame (activation record) contains:
  - Local variables
  - Saved registers (if callee-saved registers used)
  - Return address (if $ra needs saving)
  - Saved frame pointer (if $fp used)
  - Space for outgoing arguments (if >4 arguments)
- Organized layout for procedure execution

---

## True/False Solutions

**T/F 1.1** Every machine instruction must specify an operation code (opcode).

**Answer: True**

**Explanation:**
- Opcode is essential - tells processor what to do
- Without opcode, processor doesn't know what operation to perform
- Every instruction must have an opcode field

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
- Zero-address (stack-based) is not most common
- Most modern processors use 2-address or 3-address formats
- Zero-address used in some specialized architectures (JVM, some embedded)
- General-purpose processors typically use register-based addressing

---

**T/F 1.4** The number of addresses in an instruction affects both instruction length and execution speed.

**Answer: True**

**Explanation:**
- More addresses = longer instructions (more bits)
- But may need fewer instructions (more efficient)
- Fewer addresses = shorter instructions but may need more instructions
- Affects code size, memory bandwidth, execution time

---

**T/F 2.1** Characters are typically represented using ASCII or Unicode encoding.

**Answer: True**

**Explanation:**
- ASCII: 7-bit encoding (128 characters)
- Extended ASCII: 8-bit (256 characters)
- Unicode: multi-byte encoding (supports many languages)
- Characters stored as numeric codes in memory

---

**T/F 2.2** Logical operations include AND, OR, NOT, and XOR.

**Answer: True**

**Explanation:**
- Logical operations operate on bits
- AND: bitwise AND
- OR: bitwise OR
- NOT: bitwise complement
- XOR: exclusive OR
- Used for bit manipulation, masking, flags

---

**T/F 2.3** I/O operations are always performed using special I/O instructions.

**Answer: False**

**Explanation:**
- Some architectures use special I/O instructions (isolated I/O)
- Other architectures use memory-mapped I/O (I/O devices appear as memory)
- MIPS uses memory-mapped I/O (no special I/O instructions)
- Depends on architecture design

---

**T/F 2.4** Conversion operations change data from one format to another.

**Answer: True**

**Explanation:**
- Conversion operations transform data
- Examples: integer to floating-point, signed to unsigned, byte to word
- Necessary when data formats don't match operation requirements
- May involve format changes, sign extension, etc.

---

**T/F 3.1** MIPS uses fixed-length 32-bit instructions for simplicity.

**Answer: True**

**Explanation:**
- All MIPS instructions are 32 bits
- Fixed length simplifies:
  - Instruction fetch (always fetch 32 bits)
  - Instruction decode (know where fields are)
  - Pipelining (uniform instruction size)
- Trade-off: some bits may be unused

---

**T/F 3.2** MIPS is a load-store architecture, meaning only load and store instructions access memory.

**Answer: True**

**Explanation:**
- Load-store architecture: only `lw` and `sw` access memory
- Arithmetic operations work only on registers
- Must load data to registers first, operate, then store if needed
- Simplifies hardware, enables pipelining

---

**T/F 3.3** In MIPS, all registers are general-purpose and can be used for any purpose.

**Answer: False**

**Explanation:**
- MIPS has register usage conventions
- Some registers have specific purposes:
  - $zero (always 0)
  - $at (assembler temporary)
  - $sp (stack pointer)
  - $ra (return address)
  - $a0-$a3 (arguments)
  - $v0-$v1 (return values)
- While technically general-purpose, conventions exist for compatibility

---

**T/F 3.4** MIPS word addresses must be aligned to 4-byte boundaries.

**Answer: True**

**Explanation:**
- Word = 32 bits = 4 bytes
- Word addresses must be multiples of 4
- Valid: 0, 4, 8, 12, 16, ...
- Invalid: 1, 2, 3, 5, 6, 7, ...
- Hardware enforces alignment (exception if misaligned)

---

**T/F 4.1** R-format instructions use the funct field to specify the operation when opcode is 0.

**Answer: True**

**Explanation:**
- R-format uses opcode = 0 (special value)
- funct field (6 bits) specifies actual operation
- Allows many R-format operations with same opcode
- Examples: ADD (funct=32), SUB (funct=34), AND (funct=36)

---

**T/F 4.2** I-format instructions can be used for both arithmetic and memory operations.

**Answer: True**

**Explanation:**
- I-format is versatile:
  - Arithmetic: `addi`, `andi`, `ori` (immediate operations)
  - Memory: `lw`, `sw` (load/store)
  - Control: `beq`, `bne` (branches)
- All use same format but different opcodes

---

**T/F 4.3** J-format instructions use a 26-bit address field for the jump target.

**Answer: True**

**Explanation:**
- J-format: op (6) + address (26) = 32 bits
- 26-bit address field
- Combined with PC[31:28] to form 32-bit jump target
- Allows jumping to any address in same 256MB region

---

**T/F 4.4** All MIPS instructions fit into one of three formats: R, I, or J.

**Answer: True**

**Explanation:**
- MIPS design principle: simplicity and regularity
- All instructions use one of three formats
- Makes instruction decode simple and regular
- Hardware knows format based on opcode

---

**T/F 5.1** In MIPS, you cannot perform arithmetic directly on memory operands.

**Answer: True**

**Explanation:**
- Load-store architecture
- Arithmetic works only on registers
- Must: load memory → register, operate on registers, store register → memory
- This is by design (simplifies hardware, enables pipelining)

---

**T/F 5.2** The instruction `lw $t0, 0($s0)` loads a word from the address stored in $s0.

**Answer: True**

**Explanation:**
- `lw $t0, 0($s0)` means:
  - Load word into $t0
  - From address = ($s0) + 0 = address in $s0
- Base register $s0 contains the address
- Offset is 0 (no displacement)

---

**T/F 5.3** MIPS supports unaligned memory accesses for words.

**Answer: False**

**Explanation:**
- MIPS requires word alignment
- Word addresses must be multiples of 4
- Unaligned access causes exception (error)
- Hardware enforces this restriction
- Simplifies hardware design

---

**T/F 5.4** Big endian stores the most significant byte at the lowest address.

**Answer: True**

**Explanation:**
- Big endian: MSB at lowest address
- Example: 0x12345678 at address 100:
  - 100: 0x12 (MSB)
  - 101: 0x34
  - 102: 0x56
  - 103: 0x78 (LSB)
- MIPS default is big endian

---

**T/F 6.1** Immediate addressing is the fastest because the operand is in the instruction.

**Answer: True**

**Explanation:**
- Immediate: operand in instruction (no memory/register access needed)
- Fastest: value already available during instruction fetch
- No additional memory or register read required
- Limited range (16 bits in MIPS)

---

**T/F 6.2** Register addressing is faster than memory addressing.

**Answer: True**

**Explanation:**
- Registers are fastest storage (inside CPU)
- Memory is slower (external, bus access)
- Register access: 1 cycle typically
- Memory access: multiple cycles (cache, main memory)
- This is why load-store architecture loads to registers first

---

**T/F 6.3** MIPS uses PC-relative addressing for branch instructions.

**Answer: True**

**Explanation:**
- Branch instructions use PC-relative addressing
- Target = PC + 4 + (offset × 4)
- Offset is 16-bit signed immediate
- Allows branching within ±32KB of current instruction
- Enables position-independent code

---

**T/F 6.4** Displacement addressing combines a base register with an offset.

**Answer: True**

**Explanation:**
- Displacement (base + offset):
  - Base register contains base address
  - Offset is constant in instruction
  - Effective address = base + offset
- Used in MIPS for load/store: `lw $t0, offset($base)`
- Very common and flexible

---

**T/F 7.1** MIPS procedure calls use the jal instruction to jump and link.

**Answer: True**

**Explanation:**
- `jal` (jump and link):
  - Jumps to target address
  - Saves return address in $ra (PC + 4)
- Return with `jr $ra` (jump register)
- Standard MIPS procedure call mechanism

---

**T/F 7.2** The stack grows downward (toward lower addresses) in MIPS.

**Answer: True**

**Explanation:**
- MIPS stack grows downward
- Push: decrement $sp, then store
- Pop: load, then increment $sp
- Stack pointer points to top of stack
- Common convention (also used in x86, ARM)

---

**T/F 7.3** Saved registers must be preserved by the callee function.

**Answer: True**

**Explanation:**
- Callee-saved registers ($s0-$s7):
  - Callee (called function) must save/restore if used
  - Caller can assume values unchanged
- Caller-saved registers ($t0-$t9):
  - Caller must save if needed after call
  - Callee can modify freely
- Convention ensures register values preserved across calls

---

**T/F 7.4** The frame pointer ($fp) points to the top of the current stack frame.

**Answer: True**

**Explanation:**
- $fp (frame pointer, register 30) points to fixed location in stack frame
- Points to saved $fp of previous frame (or start of current frame)
- Allows easy access to local variables and arguments
- $sp may change during function execution, but $fp stays fixed
- Not always used (some code uses $sp with offsets)

---

*[Continued in Part 2 with Short Answer Solutions...]*

