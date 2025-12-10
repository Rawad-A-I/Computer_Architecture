# Chapter 12-13 -  Instruction Sets & Addressing Modes

## Page 1

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_1_img_1.png" alt="Image 1 from page 1" />

Instruction Sets: 
Characteristics and Functions
Addressing Modes and Formats

Chapters 13 & 14
Based on: 
William Stallings 
Computer Organization and 
Architecture, 11th Global Edition

Patterson and Hennessy
Computer Organization and Design
5th Edition


## Page 2

Instruction Set


The vocabulary of commands understood by a given architecture


Different computers have different instruction sets but with many aspects in common

all computers are constructed from hardware technologies based on similar underlying

principles
there are a few basic operations that all computers must provide
common goal: find a language that makes it easy to build the hardware and the compiler while

maximizing performance and minimizing cost and energy


Many modern computers also have simple instruction sets

2


## Page 3

Elements of a Machine Instruction


Operation code:

specifies operation to be performed (e.g., ADD, I/O)
binary code, known as the operation code, or opcode


Source operand reference:

operation may involve one or more source operands, that is, operands that are inputs for the

operation


Result operand reference:

operation may produce a result


Next instruction reference:

tells the processor where to fetch the next instruction after the execution of this instruction is

complete

3


## Page 4

Source and Result Operands


Main or virtual memory

main or virtual memory address must be supplied


Processor register

processor contains one or more registers that may be referenced by machine instructions
if only one register exists, reference to it may be implicit
if more than one register exists, then each register is assigned a unique name or number, and

the instruction must contain the number of the desired register


Immediate

value of the operand is contained in a field in the instruction being executed


I/O device

instruction must specify the I/O module and device for the operation

4


## Page 5

Number of Addresses


What is the maximum number of addresses one might need in an instruction?


Arithmetic and logic instructions will require the most operands

All arithmetic and logic operations are either unary (one source operand) or binary (two

source operands)
We would need a maximum of two addresses to reference source operands. 
The result of an operation must be stored, suggesting a third address, which defines a

destination operand. 
Finally, after completion of an instruction, the next instruction must be fetched, and its address

is needed.


In most architectures, many instructions have one, two, or three operand addresses, with the 
address of the next instruction being implicit (obtained from the program counter).

5


## Page 6

Programs to Execute

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_6_img_1.png" alt="Image 1 from page 6" />

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_6_img_2.png" alt="Image 2 from page 6" />

6


## Page 7

Zero-Address Instructions


Possible to make do with zero addresses for some instructions


Zero-address instructions are applicable to a special memory organization called a stack

A stack is a last-in-first-out set of locations
At least the top two elements are in processor registers
Zero-address instructions would reference the top two stack elements


Need to represent expression in postfix notation


Examples

7


## Page 8

Utilization of Instruction Addresses

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_8_img_1.png" alt="Image 1 from page 8" />

8


## Page 9

Design Trade-offs


Fewer addresses per instruction

instructions that are more primitive, requiring a less complex processor
instructions of shorter length
programs contain more total instructions, which in general results in longer execution times and longer,

more complex programs

One-address vs multiple address

with one-address instructions, programmer generally has available only one general-purpose register,

the AC
with multiple-address instructions, it is common to have multiple general-purpose registers
this allows some operations to be performed solely on registers
because register references are faster than memory references, this speeds up execution
for flexibility and the ability to use multiple registers, most contemporary machines employ a mixture of

two- and three- address instructions

Other factors complicate this design trade-off

whether an address references a memory location or a register
because there are fewer registers, fewer bits are needed for a register reference
a machine may offer variety of addressing modes, and the specification of mode takes one or more bits

most processor designs involve a variety of instruction formats

9


## Page 10

Instruction Set Design


Programmer’s means of controlling the processor


Operation repertoire

How many and which operations to provide, and how complex operations should be


Data types

The various types of data upon which operations are performed


Instruction format

Instruction length (in bits), number of addresses, size of various fields, and so on


Registers

Number of processor registers that can be referenced by instructions, and their use


Addressing

The mode or modes by which the address of an operand is specified

10


## Page 11

Types of Operands


Machine instructions operate on data


The most important general categories of data are

Addresses
Numbers
Characters
Logical data

11


## Page 12

Types of Operations


Number of different opcodes varies widely from machine to machine


Same general types of operations found on all machines


Useful and typical categorization:

Data transfer
Arithmetic
Logical
Conversion
I/O
System control
Transfer of control

12


## Page 13

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_13_img_1.png" alt="Image 1 from page 13" />

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_13_img_3.png" alt="Image 3 from page 13" />

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_13_img_2.png" alt="Image 2 from page 13" />

13


## Page 14

Case Study: MIPS


Word is 32 bits


Memory is byte addressable


Instructions are 32 bits


Opcode is 6 bits


3 Instruction types

R-format
I-format
J-format

14


## Page 15

Register Operands


Operands of arithmetic instructions are restricted

Must be from a limited number of registers

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_15_img_1.png" alt="Image 1 from page 15" />


Arithmetic instructions use register operands


MIPS has a 32 ×32-bit register file


Use for frequently accessed data


Numbered 0 to 31


Two read ports


One write port

15


## Page 16

Memory Operands


Main memory used for composite data

Arrays, structures, …


In MIPS instructions, arithmetic operations occur only on registers

MIPS must include instructions that transfer data between memory and registers
data transfer instructions


To apply arithmetic operations

Load values from memory into registers
Store result from register to memory


Load/store architecture

16


## Page 17

Data Transfer Instructions


To access a word in memory, the instruction must supply the memory address


Format of the load instruction:

name of the operation 
followed by the register to be loaded
then a constant and register used to access memory
The sum of the constant portion of the instruction and the contents of the second register

forms the memory address.


MIPS name for this instruction is lw, standing for load word


Example:  lw $t0, 8($s3)

sw $t0, 8($s3)

17


## Page 18

Memory


Memory is byte addressed

Each address identifies an 8-bit byte


Words are aligned in memory

Address must be a multiple of 4


MIPS is Big Endian

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_18_img_1.png" alt="Image 1 from page 18" />


Example

32-bit hex: 12345678 stored at byte location 184

4 bytes
least significant byte containing the value 78
most significant byte containing the value 12

Little endian
Big endian

18


## Page 19

Example


C code: g = h + A[8];

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_19_img_1.png" alt="Image 1 from page 19" />

g in $s1, h in $s2, base address of A in $s3


Compiled MIPS code:

Index 8 requires offset of 32
4 bytes per word

offset

lw $t0, 32($s3) # load word

base register

add $s1, $s2, $t0

19


## Page 20

Registers vs Memory


Registers

Small set, typically 8 to 32
Fast locations for data
In MIPS, data must be in registers to perform arithmetic
Compiler must use registers for variables as much as possible


Memory

Accessed only by data transfer instructions (ld/st)
MIPS uses byte addresses, sequential word accesses differ by 4
Memory holds data structures, arrays, and spilled registers (less frequently used variables)

20


## Page 21

Immediate Operands


Program will use a constant in an operation

e.g. incrementing an index to point to the next element of an array


Load a constant from memory to use one

For example, to add the constant 4 to register $s3:

lw $t0, AddrConstant4($s1)   # $t0 = constant 4

add $s3, $s3, $t0            # $s3 = $s3 + $t0


An alternative is to use immediate operands


To add 4 to register $s3:

addi $s3, $s3, 4   # $s3 = $s3 + 4

21


## Page 22

Representing Instructions


Instructions are encoded in binary

Called machine code


MIPS instructions

Encoded as 32-bit instruction words
Small number of formats encoding operation code (opcode), register numbers, …
Regularity

22


## Page 23

MIPS R-Format Instructions

op
rs
rt
rd
shamt
funct

6 bits
6 bits
5 bits
5 bits
5 bits
5 bits


Instruction fields

op: operation code (opcode)
rs: first source register number
rt: second source register number
rd: destination register number
shamt: shift amount 
funct: function code (extends opcode)

23


## Page 24

MIPS I-Format Instructions

op
rs
rt
constant or address

6 bits
5 bits
5 bits
16 bits


Immediate arithmetic and load/store instructions

rt: destination or source register number
Constant: –215 to +215 – 1
Address: offset added to base address in rs

24


## Page 25

Conditional Operations


Branch to a labeled instruction if a condition is true

otherwise, continue sequentially

branch if 
equal


beq rs, rt, L1

if (rs == rt) branch to instruction labeled L1

branch if not 
equal


bne rs, rt, L1

if (rs != rt) branch to instruction labeled L1


j L1

unconditional jump (unconditional branch) to instruction labeled L1


beq and bne are called conditional branches

25


## Page 26

More Conditional Operators


Useful to see if a variable is less than another variable

E.g, a for loop may want to test to see if the index variable is less than 0

Instruction that compares two registers and sets a third register to 1 if the first is less than the
second; otherwise, it is set to 0

The MIPS instruction is called set on less than, or slt
slt $t0, $s3, $s4
# $t0 = 1 if $s3 < $s4, else $t0 = 0
slt rd, rs, rt                    slti rt, rs, constant

if (rs <  rt) rd = 1; else rd = 0;                           if (rs <  constant) rt = 1; else rt = 0;


MIPS compilers use the slt, slti, beq, bne, and the fixed value of 0 to create all relative
conditions: equal, not equal, less than, less than or equal, greater than, greater than or equal.

Use in combination with beq, bne

slt $t0, $s1, $s2    # if ($s1 < $s2)
bne $t0, $zero, L    #   branch to L

26


## Page 27

More Addressing


Branch Addressing

Branch instructions specify

Opcode, two registers, target address
Most branch targets are near branch

op
rs
rt
constant or address

6 bits
5 bits
5 bits
16 bits

Forward or backward
PC-relative addressing


Jump Addressing

Jump (j and jal) targets could be anywhere in text segment

Encode full address in instruction

op
address

6 bits
26 bits

27


## Page 28

Supporting Procedures in Computer HW


Structure programs and allow code to be reused


Steps required
1. Place parameters in registers
2. Transfer control to procedure
3. Acquire storage for procedure
4. Perform procedure’s operations
5. Place result in register for caller
6. Return to place of call

28


## Page 29

Use of Stack to Implement Nested Subroutines

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_29_img_1.png" alt="Image 1 from page 29" />

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_29_img_2.png" alt="Image 2 from page 29" />

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_29_img_3.png" alt="Image 3 from page 29" />

29


## Page 30

MIPS Design Principles


Simplicity favors regularity

Fixed size instructions
Small number of instruction formats
Opcode always first 6 bits


Smaller is faster

Limited instruction set
Limited number of registers in register file
Limited number of addressing modes


Make the common case fast

Arithmetic operands from the register file(load-store architecture)
Allow instructions to contain immediate operands


Good design demands good compromises

Three instruction formats

30


## Page 31

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_31_img_1.png" alt="Image 1 from page 31" />

Addressing Modes


Immediate


Direct


Indirect


Register


Register indirect


Displacement


Stack

31


## Page 32

Basic Addressing Modes

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_32_img_1.png" alt="Image 1 from page 32" />


A   = contents of an address field in the instruction


R    = contents of an address field in the instruction that refers to a register


EA = actual (effective) address of the location containing the referenced operand


(X) = contents of memory location X or register X

32


## Page 33

<img src="./Chapter%2012-13%20-%20%20Instruction%20Sets%20%26%20Addressing%20Modes_images/page_33_img_1.png" alt="Image 1 from page 33" />

MIPS Addressing Modes


Base or displacement addressing: 
operand is at the memory location whose 
address is the sum of a register and a 
constant in the instruction


PC-relative addressing: branch address is 
the sum of the PC and a constant in the 
instruction


Pseudodirect addressing: jump address is 
the 26 bits of the instruction concatenated 
with the upper bits of the PC

33


## Page 34

Variable Length Instructions


So far have used a single fixed instruction length


Designer may choose to provide a variety of instruction formats of different lengths


Makes it easy to provide a large repertoire of opcodes, with different opcode lengths


Addressing can be more flexible, with various combinations of register and memory references 
plus addressing modes


With variable-length instructions, these many variations can be provided efficiently and compactly


Increase in complexity of processor

34

