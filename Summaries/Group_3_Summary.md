# Group 3: Instruction Set Architecture (ISA) - Concise Summary

## Instruction Set Fundamentals

### What is an Instruction Set?
- **Definition:** Vocabulary of commands understood by a computer architecture
- **Interface:** Between software and hardware
- **Design Goals:** Easy to build hardware/compiler, maximize performance, minimize cost/energy
- **Modern Trend:** Simple instruction sets (RISC - Reduced Instruction Set Computer)

### Four Elements of Machine Instructions
1. **Operation Code (Opcode):** Specifies operation (ADD, SUB, LOAD, etc.)
2. **Source Operand Reference:** Inputs for the operation (1 or 2 operands)
3. **Result Operand Reference:** Where result is stored (register, memory, flags)
4. **Next Instruction Reference:** Usually implicit (PC), explicit for branches/jumps

## Number of Addresses in Instructions

### Categories

#### Zero-Address Instructions
- **Stack-based:** Operands on stack, operations work on top of stack
- **Example:** `PUSH A, PUSH B, ADD, POP C` for C = A + B
- **Advantages:** Short instructions, simple hardware
- **Disadvantages:** Requires postfix notation, more instructions

#### One-Address Instructions
- **Accumulator architecture:** One explicit operand, one implicit (AC)
- **Example:** `LOAD A, ADD B, STORE C` for C = A + B
- **Advantages:** Short instructions, simple hardware
- **Disadvantages:** Limited flexibility, accumulator bottleneck

#### Two-Address Instructions
- **Two explicit addresses:** First is source, second is source AND destination
- **Example:** `MOVE C, A` then `ADD C, B` for C = A + B
- **Advantages:** Moderate length, good flexibility
- **Disadvantages:** One operand destroyed, may need extra MOVE

#### Three-Address Instructions
- **Three explicit addresses:** Two sources, one separate destination
- **Example:** `ADD C, A, B` for C = A + B (single instruction)
- **Advantages:** Maximum flexibility, no operand destruction
- **Disadvantages:** Longer instructions, more complex hardware

### Modern Practice
- **Mixture:** Two-address and three-address instructions
- **Balance:** Flexibility vs. instruction size

## Types of Operands

### Four Main Categories
1. **Addresses:** Memory addresses, pointers, array indices (unsigned integers)
2. **Numbers:**
   - **Integers:** Signed (two's complement) or unsigned
   - **Floating-point:** IEEE 754 (single/double precision)
3. **Characters:** ASCII, Unicode/UTF-8 encoding
4. **Logical Data:** Bit-level data (AND, OR, XOR, NOT, SHIFT, ROTATE)

## Types of Operations

### Seven Main Categories
1. **Data Transfer:** LOAD, STORE, MOVE, PUSH, POP, EXCHANGE
2. **Arithmetic:** ADD, SUBTRACT, MULTIPLY, DIVIDE, MODULO, INCREMENT, DECREMENT
3. **Logical:** AND, OR, XOR, NOT, NAND, NOR (bitwise operations)
4. **Conversion:** Integer ↔ Floating-point, sign/zero extension, byte swap
5. **I/O:** IN, OUT, READ, WRITE (device communication)
6. **System Control:** HALT, NOP, WAIT, interrupt enable/disable, privilege mode
7. **Transfer of Control:** JUMP, BRANCH (conditional), CALL, RETURN, SKIP

## Instruction Set Design Considerations

### Five Key Aspects
1. **Operation Repertoire:** How many operations? How complex?
2. **Data Types:** What types to support? Hardware vs. software?
3. **Instruction Format:** Fixed or variable length? How many addresses?
4. **Registers:** How many? General-purpose or special-purpose?
5. **Addressing:** What addressing modes? How are addresses calculated?

### Design Trade-offs
- **Fewer addresses:** Simpler hardware, but more instructions needed
- **More registers:** Better performance, but more expensive
- **More addressing modes:** More flexibility, but more complex
- **Fixed format:** Simpler decoding, but less code density

## MIPS Architecture Overview

### Key Characteristics
- **Word Size:** 32 bits
- **Memory:** Byte-addressable (each address = 1 byte)
- **Instructions:** All 32 bits (fixed length)
- **Opcode:** 6 bits (64 operations)
- **Formats:** 3 main formats (R, I, J)
- **Endianness:** Big endian (default)

### Memory Organization
- **Byte addressing:** Address 0, 1, 2, 3... (each = 1 byte)
- **Word alignment:** Word addresses must be multiples of 4 (0, 4, 8, 12...)
- **Misaligned access:** Causes exception

## MIPS Instruction Formats

### Three Formats

#### 1. R-Format (Register Format)
```
┌──────┬─────┬─────┬─────┬──────┬──────┐
│ op   │ rs  │ rt  │ rd  │shamt │funct │
│ 6    │ 5   │ 5   │ 5   │ 5    │ 6    │
└──────┴─────┴─────┴─────┴──────┴──────┘
```
- **Use:** Register-to-register operations
- **Fields:** op (usually 0x00), rs (source 1), rt (source 2), rd (destination), shamt (shift), funct (operation)
- **Examples:** ADD, SUB, AND, OR, XOR, SLT, shifts, JR

#### 2. I-Format (Immediate Format)
```
┌──────┬─────┬─────┬──────────────────┐
│ op   │ rs  │ rt  │ constant/address │
│ 6    │ 5   │ 5   │ 16               │
└──────┴─────┴─────┴──────────────────┘
```
- **Use:** Immediate arithmetic, load/store, branches
- **Fields:** op, rs (source/base), rt (target), immediate/offset (16-bit signed)
- **Range:** -32,768 to 32,767
- **Examples:** ADDI, LW, SW, BEQ, BNE

#### 3. J-Format (Jump Format)
```
┌──────┬──────────────────────────────┐
│ op   │ address                      │
│ 6    │ 26                           │
└──────┴──────────────────────────────┘
```
- **Use:** Unconditional jumps
- **Fields:** op, address (26 bits)
- **Range:** 256MB region (uses upper 4 bits of PC)
- **Examples:** J, JAL

## Register Operands

### MIPS Register File
- **32 registers:** $0 to $31, each 32 bits
- **$0:** Always zero (hardwired, cannot be written)
- **Conventions:**
  - `$t0-$t9` ($8-$15, $24-$25): Temporary (caller-saved)
  - `$s0-$s7` ($16-$23): Saved (callee-saved)
  - `$a0-$a3` ($4-$7): Arguments
  - `$v0-$v1` ($2-$3): Return values
  - `$sp` ($29): Stack pointer
  - `$fp` ($30): Frame pointer
  - `$ra` ($31): Return address

### Key Principle
- **Arithmetic only on registers:** All arithmetic/logical operations work on registers
- **Why:** Registers are fastest (in CPU), no memory access needed

## Memory Operands and Load/Store

### Load-Store Architecture
- **Principle:** Arithmetic only on registers; memory accessed only through load/store
- **Why:** Simplicity, performance, easier pipelining

### Load Word (LW)
- **Format:** `LW rt, offset(rs)`
- **Operation:** `rt = memory[rs + offset]`
- **Example:** `LW $t0, 8($s1)` → `$t0 = memory[$s1 + 8]`

### Store Word (SW)
- **Format:** `SW rt, offset(rs)`
- **Operation:** `memory[rs + offset] = rt`
- **Example:** `SW $t0, 8($s1)` → `memory[$s1 + 8] = $t0`

### Array Access
- **Offset calculation:** Index × 4 (bytes per word)
- **Example:** `A[8]` → `LW $t0, 32($s3)` (offset = 8 × 4 = 32)

## Immediate Operands

### What are Immediate Operands?
- **Definition:** Constants embedded directly in instruction
- **Advantages:** Fast (no memory access), single instruction
- **Range:** 16-bit signed (-32,768 to 32,767)

### Common Operations
- **ADDI:** `ADDI $t0, $t1, 100` (add immediate)
- **ANDI, ORI:** Logical operations with immediate
- **SLTI:** Set on less than immediate

### Loading Large Constants
- **Problem:** 16-bit immediate too small for large values
- **Solution:** Use LUI (Load Upper Immediate) + ORI/ADDI
- **Example:** Load 0x12345678 → `LUI $t0, 0x1234` then `ORI $t0, $t0, 0x5678`

## Conditional Operations

### Branch Instructions
- **BEQ:** Branch if equal (`BEQ $t0, $t1, label`)
- **BNE:** Branch if not equal (`BNE $t0, $t1, label`)

### Comparison Operations
- **SLT:** Set on less than (`SLT $t0, $s3, $s4` → `$t0 = 1 if $s3 < $s4`)
- **SLTI:** Set on less than immediate

### Building All Comparisons
- **Equal:** BEQ
- **Not Equal:** BNE
- **Less Than:** SLT then BNE
- **Less/Equal, Greater, Greater/Equal:** Combinations of SLT and branches

### Unconditional Jump
- **J:** Jump to label
- **JAL:** Jump and Link (for function calls, saves return address in $ra)

## Addressing Modes

### Basic Addressing Modes

1. **Immediate:** Operand in instruction (`ADDI $t0, $t1, 42`)
2. **Direct:** Address in instruction (`LOAD R1, [1000]`)
3. **Indirect:** Address points to location containing address (`LOAD R1, [[1000]]`)
4. **Register:** Operand in register (`ADD $s0, $t0, $t1`)
5. **Register Indirect:** Register contains address (`LW $t0, 0($s1)`)
6. **Displacement (Base + Offset):** `EA = Register + offset` (`LW $t0, 8($s1)`)
7. **Stack:** Operands on stack (implicit addressing)

### Comparison

| Mode | Speed | Flexibility | Use Case |
|------|-------|-------------|----------|
| Immediate | Fastest | Low | Constants |
| Register | Fastest | Medium | Arithmetic |
| Displacement | Medium | Very High | Arrays, structures |
| Register Indirect | Medium | High | Pointers |
| Indirect | Slow | High | Dynamic addressing |

## MIPS Addressing Modes

### Three Addressing Modes

#### 1. Displacement (Base + Offset)
- **Use:** Load/store instructions
- **Format:** `LW rt, offset(rs)`
- **EA:** `EA = Register[rs] + offset`
- **Range:** ±32KB (16-bit signed offset)
- **Applications:** Arrays, structures, stack frames

#### 2. PC-Relative
- **Use:** Branch instructions
- **Format:** `BEQ rs, rt, label`
- **EA:** `EA = PC + 4 + (offset × 4)`
- **Range:** ±128KB from PC (16-bit signed offset in words)
- **Why:** Most branches are local (within function)

#### 3. Pseudodirect
- **Use:** Jump instructions
- **Format:** `J label`
- **EA:** `EA = (PC[31:28] || address[25:0] || 00)`
- **Range:** 256MB region (uses upper 4 bits of PC)
- **For full 32-bit:** Use `JR $ra` (Jump Register)

## Procedures and Stack Usage

### Procedure Call Requirements
1. Place parameters (arguments)
2. Transfer control (jump to procedure)
3. Acquire storage (local variables)
4. Perform operations
5. Place result (return value)
6. Return control (jump back)

### MIPS Convention
- **Arguments:** `$a0-$a3` (first 4), more on stack
- **Return values:** `$v0-$v1` (up to 2)
- **Call:** `JAL func` (saves return address in `$ra`)
- **Return:** `JR $ra` (jump to return address)

### Stack Usage
- **Stack pointer:** `$sp` ($29), grows downward
- **Stack frame:** Stores local variables, saved registers, return address
- **Prologue:** Allocate frame, save registers
- **Epilogue:** Restore registers, deallocate frame

### Stack Frame Layout
```
High Address
┌─────────────┐
│ Saved $ra   │  +20
├─────────────┤
│ Saved $s0   │  +16
├─────────────┤
│ Local vars  │  +4, +8, ...
├─────────────┤
│ (unused)    │  +0  ← $sp
Low Address
```

## MIPS Design Principles

### Four Key Principles

1. **Simplicity Favors Regularity**
   - Fixed-size instructions (32 bits)
   - Small number of formats (3 formats)
   - Opcode always first 6 bits
   - Regular field positions

2. **Smaller is Faster**
   - Limited instruction set
   - Limited registers (32)
   - Limited addressing modes (3)
   - Faster execution, lower power

3. **Make the Common Case Fast**
   - Load-store architecture
   - Immediate operands
   - Optimize frequent operations (ADD, LOAD, STORE)

4. **Good Design Demands Good Compromises**
   - Three formats (not too simple, not too complex)
   - Balance between flexibility and simplicity
   - Practical performance

## Key Takeaways

1. **Instruction elements:** Opcode, source operands, result, next instruction
2. **Address count:** 0, 1, 2, or 3 addresses (trade-offs exist)
3. **Operand types:** Addresses, numbers, characters, logical data
4. **Operation types:** 7 main categories (data transfer, arithmetic, logical, etc.)
5. **MIPS:** 32-bit fixed-length, 3 formats (R, I, J), load-store architecture
6. **Addressing modes:** Displacement, PC-relative, pseudodirect
7. **Registers:** 32 registers, arithmetic only on registers
8. **Design principles:** Simplicity, performance, balance

## Performance Considerations

- **Register vs. Memory:** Registers are much faster (1 cycle vs. many cycles)
- **Load-store architecture:** Minimizes memory accesses
- **Immediate operands:** Fast constants (no memory access)
- **Fixed-length instructions:** Simple decoding, easy pipelining
- **Simple addressing modes:** Fast address calculation
- **Register conventions:** Efficient procedure calls
