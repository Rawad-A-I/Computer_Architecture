# Group 3: Instruction Set Architecture - Exam Summary

## Part 1: Instruction Set Fundamentals

### 1. Elements of Machine Instruction (MCQ/Short Answer)
**Four Elements:**
1. **Operation Code (Opcode):** Specifies operation (ADD, SUB, LOAD, etc.)
2. **Source Operand Reference:** Input operands (1 or 2)
3. **Result Operand Reference:** Where result stored
4. **Next Instruction Reference:** Usually implicit (PC), explicit for branches/jumps

### 2. Number of Addresses (MCQ/Comparison)
**Categories:**

**Zero-Address (Stack):**
- Operands on stack
- Example: `PUSH A, PUSH B, ADD`
- **Instructions for C = A + B:** 4 instructions

**One-Address (Accumulator):**
- One explicit operand, accumulator implicit
- Example: `LOAD A, ADD B, STORE C`
- **Instructions for C = A + B:** 3 instructions

**Two-Address:**
- Two explicit addresses (one is source and destination)
- Example: `MOVE C, A, ADD C, B`
- **Instructions for C = A + B:** 2 instructions

**Three-Address:**
- Three explicit addresses (2 sources, 1 destination)
- Example: `ADD C, A, B`
- **Instructions for C = A + B:** 1 instruction

**Trade-off:** More addresses = fewer instructions but longer instructions.

### 3. Types of Operands (MCQ/Classification)
**Four Main Types:**
1. **Addresses:** Memory addresses, pointers
2. **Numbers:** Integers (signed/unsigned), Floating-point
3. **Characters:** ASCII, Unicode
4. **Logical Data:** Bit-level operations (AND, OR, XOR, SHIFT)

### 4. Types of Operations (MCQ/Classification)
**Seven Categories:**
1. **Data Transfer:** LOAD, STORE, MOVE, PUSH, POP
2. **Arithmetic:** ADD, SUB, MUL, DIV, MOD
3. **Logical:** AND, OR, XOR, NOT, SHIFT, ROTATE
4. **Conversion:** Integer ↔ Float, Sign/Zero extension
5. **I/O:** IN, OUT, READ, WRITE
6. **System Control:** HALT, NOP, Interrupt Enable/Disable
7. **Transfer of Control:** JUMP, BRANCH, CALL, RETURN

### 5. Instruction Set Design Considerations (Short Answer)
**Five Key Aspects:**
1. **Operation Repertoire:** How many operations?
2. **Data Types:** What types to support?
3. **Instruction Format:** Fixed or variable length?
4. **Registers:** How many? What for?
5. **Addressing:** What addressing modes?

---

## Part 2: MIPS Case Study

### 6. MIPS Characteristics (MCQ/True-False)
- **Word Size:** 32 bits
- **Memory:** Byte-addressable
- **Instructions:** All 32 bits (fixed length)
- **Opcode:** 6 bits
- **Registers:** 32 registers ($0-$31)
- **Architecture:** Load-store (arithmetic only on registers)

### 7. MIPS Instruction Formats (Diagram/MCQ)
**Three Formats:**

**R-Format (Register):**
```
┌──────┬─────┬─────┬─────┬──────┬──────┐
│ op   │ rs  │ rt  │ rd  │shamt │funct │
│ 6    │ 5   │ 5   │ 5   │ 5    │ 6    │
└──────┴─────┴─────┴─────┴──────┴──────┘
```
- **Use:** Register operations (ADD, SUB, AND, OR)
- **Example:** `ADD $s0, $t0, $t1`

**I-Format (Immediate):**
```
┌──────┬─────┬─────┬──────────────────┐
│ op   │ rs  │ rt  │ constant/address │
│ 6    │ 5   │ 5   │ 16               │
└──────┴─────┴─────┴──────────────────┘
```
- **Use:** Immediate arithmetic, load/store, branches
- **Example:** `ADDI $t0, $t1, 100`, `LW $t0, 8($s1)`
- **Range:** -32,768 to 32,767 (16-bit signed)

**J-Format (Jump):**
```
┌──────┬──────────────────────────────┐
│ op   │ address                      │
│ 6    │ 26                           │
└──────┴──────────────────────────────┘
```
- **Use:** Unconditional jumps
- **Example:** `J label`, `JAL label`
- **Range:** 256 MB region

### 8. MIPS Registers (MCQ/Short Answer)
**32 Registers ($0-$31):**
- **$0:** Always zero (hardwired)
- **$t0-$t9:** Temporary (caller-saved)
- **$s0-$s7:** Saved (callee-saved)
- **$a0-$a3:** Arguments
- **$v0-$v1:** Return values
- **$sp ($29):** Stack pointer
- **$fp ($30):** Frame pointer
- **$ra ($31):** Return address

**Key Principle:** Arithmetic operations **only** on registers.

### 9. Load/Store Instructions (MCQ/Translation)
**Load Word (LW):**
```
LW rt, offset(rs)    # rt = memory[rs + offset]
```
- **Example:** `LW $t0, 8($s1)` → `$t0 = memory[$s1 + 8]`

**Store Word (SW):**
```
SW rt, offset(rs)    # memory[rs + offset] = rt
```
- **Example:** `SW $t0, 8($s1)` → `memory[$s1 + 8] = $t0`

**Array Access:**
- `A[8]` where `$s3 = &A[0]` → `LW $t0, 32($s3)` (offset = 8 × 4 = 32)

### 10. Immediate Operands (MCQ/Calculation)
**ADDI (Add Immediate):**
```
ADDI rt, rs, immediate    # rt = rs + immediate
```

**Range:** -32,768 to 32,767 (16-bit signed)

**Large Constants:**
```
LUI $t0, 0x1234       # $t0 = 0x12340000
ORI $t0, $t0, 0x5678  # $t0 = 0x12345678
```

### 11. Conditional Operations (MCQ/Translation)
**Branches:**
- `BEQ rs, rt, label` → Branch if equal
- `BNE rs, rt, label` → Branch if not equal

**Comparisons:**
- `SLT rd, rs, rt` → Set on less than (rd = 1 if rs < rt)
- `SLTI rd, rs, immediate` → Set on less than immediate

**Building All Comparisons:**
- Less Than: `SLT $t0, $s1, $s2` then `BNE $t0, $zero, label`
- Greater Than: `SLT $t0, $s2, $s1` then `BNE $t0, $zero, label`

### 12. Addressing Modes (MCQ/Classification)
**MIPS Supports Three:**

**1. Displacement (Base + Offset):**
- **Use:** Load/store
- **EA = Register[rs] + offset**
- **Example:** `LW $t0, 8($s1)` → EA = $s1 + 8
- **Range:** ±32 KB

**2. PC-Relative:**
- **Use:** Branches
- **EA = PC + 4 + (offset × 4)**
- **Example:** `BEQ $t0, $t1, label`
- **Range:** ±128 KB from PC

**3. Pseudodirect:**
- **Use:** Jumps
- **EA = (PC[31:28] || address[25:0] || 00)**
- **Example:** `J label`
- **Range:** 256 MB region

### 13. Procedures and Stack (Diagram/Short Answer)
**Call Convention:**
- **Arguments:** $a0-$a3 (first 4), stack for more
- **Return Values:** $v0-$v1
- **Call:** `JAL func` (saves return address in $ra)
- **Return:** `JR $ra`

**Stack Frame:**
- **$sp ($29):** Stack pointer (grows downward)
- **$fp ($30):** Frame pointer
- **Layout:** Saved registers, local variables, return address

---

## Common Exam Questions

### Calculation Questions:
1. **Instruction Format:** Identify format and field values
2. **Address Calculation:** Calculate effective address
3. **Array Indexing:** Convert C array access to MIPS

### Translation Questions:
- C code → MIPS assembly
- MIPS assembly → C code
- Convert between address formats

### True/False:
- "MIPS uses variable-length instructions" → **False** (all 32 bits)
- "MIPS arithmetic can operate on memory" → **False** (registers only)
- "PC-relative addressing used for jumps" → **False** (used for branches)

### MCQ Topics:
- Which format for `ADD $s0, $t0, $t1`? → **R-format**
- Which addressing mode for `LW $t0, 8($s1)`? → **Displacement**
- What is range of 16-bit signed immediate? → **-32,768 to 32,767**

### Diagram Questions:
- Draw instruction format fields
- Show stack frame layout
- Label addressing mode components

---

## Key Formulas

1. **Array Offset:** index × element_size (bytes)
2. **PC-Relative Address:** PC + 4 + (offset × 4)
3. **Large Constant:** LUI (upper 16 bits) + ORI/ADDI (lower 16 bits)

---

## Critical Definitions

- **Load-Store Architecture:** Arithmetic only on registers, memory accessed via load/store
- **Immediate Operand:** Constant embedded in instruction
- **Addressing Mode:** Method for specifying operand address
- **Displacement Addressing:** Base register + offset
- **PC-Relative:** Address relative to Program Counter

---

## MIPS Design Principles

1. **Simplicity Favors Regularity:** Fixed 32-bit instructions, 3 formats
2. **Smaller is Faster:** Limited instruction set, 32 registers
3. **Make Common Case Fast:** Load-store, immediate operands
4. **Good Design Demands Compromises:** Balance flexibility and simplicity
