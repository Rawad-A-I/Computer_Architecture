# Chapter 16 - Processor Structure & Function

## Page 1

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_1_img_1.png" alt="Image 1 from page 1" />

Processor Structure & Function

Chapter 16

Based on:

William Stallings 
Computer Organization and Architecture, 11th Global Edition

Patterson and Hennessy
Computer Organization and Design, 5th Edition


## Page 2

Processor Organization

Processor Requirements:

Fetch instruction

Processor reads an instruction from memory (register, cache, main memory)

Interpret instruction

Instruction is decoded to determine what action is required

Fetch data

Execution of an instruction may require reading data from memory or an I/O module

Process data

Execution of an instruction may require performing some arithmetic or logical operation on

data

Write data

Results of an execution may require writing data to memory or an I/O module

Processor needs to store some data temporarily and therefore needs a small internal memory

2


## Page 3

The CPU with the System Bus

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_3_img_1.png" alt="Image 1 from page 3" />

3


## Page 4

Internal Structure of the CPU

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_4_img_1.png" alt="Image 1 from page 4" />

4


## Page 5

Register Organization


Within the processor there is a set of registers that function as a level of memory above main 
memory and cache in the hierarchy


The registers in the processor perform two roles:

User-Visible Registers

Enable the machine or assembly language programmer to minimize main memory

references by optimizing use of registers
Control and Status Registers

Used by the control unit to control the operation of the processor and by privileged,

operating system programs to control the execution of programs

5


## Page 6

User-Visible Registers


Referenced by means of the machine language that the processor executes


Categories:

General purpose

Can be assigned to a variety of functions by the programmer
Data

May be used only to hold data and cannot be employed in the calculation of an operand

address
Address

May be somewhat general purpose or may be devoted to a particular addressing mode
Examples:  segment pointers, index registers, stack pointer
Condition codes

Also referred to as flags
Bits set by the processor hardware as the result of operations

6


## Page 7

Control and Status Registers

Four registers are essential to instruction execution:


Program counter (PC)

Contains the address of an instruction to be fetched


Instruction register (IR)

Contains the instruction most recently fetched


Memory address register (MAR)

Contains the address of a location in memory


Memory buffer register (MBR)

Contains a word of data to be written to memory or the word most recently read

7


## Page 8

Program Status Word (PSW)


Register or set of registers that contain condition codes plus other status information


Common fields or flags include:

Sign
Zero
Carry
Equal
Overflow
Interrupt Enable/Disable
Supervisor

8


## Page 9

Instruction Cycle State Diagram

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_9_img_1.jpeg" alt="Image 1 from page 9" />

9


## Page 10

Data Flow, Fetch Cycle

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_10_img_1.png" alt="Image 1 from page 10" />

10


## Page 11

Data Flow, Indirect Cycle

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_11_img_1.png" alt="Image 1 from page 11" />

11


## Page 12

Data Flow, Interrupt Cycle

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_12_img_1.png" alt="Image 1 from page 12" />

12


## Page 13

Pipelining Analogy


Pipelined laundry: overlapping execution

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_13_img_1.png" alt="Image 1 from page 13" />

Parallelism improves performance


Four loads:

Speedup = 8/3.5 = 2.3


If all the stages take about the same amount of time 
and there is enough work to do, then the speed-up 
due to pipelining is equal to the number of stages in 
the pipeline (4 in this case)

13


## Page 14

Instruction Stages


Fetch instruction (FI)

Read the next expected instruction into a buffer

Decode instruction (DI)

Determine the opcode and the operand specifiers

Calculate operands (CO)

Calculate the effective address of each source operand
This may involve displacement, register indirect, indirect, or other forms of address calculation

Fetch operands (FO)

Fetch each operand from memory
Operands in registers need not be fetched

Execute instruction (EI)

Perform the indicated operation and store the result, if any, in the specified destination operand

location

Write operand (WO)

Store the result in memory

14


## Page 15

Case Study: MIPS Pipeline


Five stages, one step per stage

1.
IF: Instruction fetch from memory
2.
ID: Instruction decode & register read
3.
EX: Execute operation or calculate address
4.
MEM: Access memory operand
5.
WB: Write result back to register


Each of these five steps will take one clock cycle to complete

15


## Page 16

Pipeline Performance


Assume time for stages is

100ps for register read or write
200ps for other stages


Compare pipelined datapath with single-cycle datapath

Instr
Instr fetch
Register 
read

ALU op
Memory 
access

Register 
write

Total time

lw
200ps
100 ps
200ps
200ps
100 ps
800ps

sw
200ps
100 ps
200ps
200ps
700ps

R-format
200ps
100 ps
200ps
100 ps
600ps

beq
200ps
100 ps
200ps
500ps

16


## Page 17

Pipelined MIPS Processor

The next instruction starts before the current one completes

Improves throughput: total amount of work done in a given time
Instruction latency (time from the start of an instruction to its completion) is not reduced

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_17_img_1.png" alt="Image 1 from page 17" />

Clk cycle (pipeline stage time) is limited by the slowest stage

Some stages do not need the whole clk cycle
For some instructions, some stages are wasted (nothing is done during that cycle for that

instruction)

17


## Page 18

Multi-Cycle Pipeline Diagram

Traditional form

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_18_img_1.png" alt="Image 1 from page 18" />

18


## Page 19

Multi-Cycle Pipeline Diagram

Form showing resource usage

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_19_img_1.png" alt="Image 1 from page 19" />

19


## Page 20

Timing Diagram for Instruction Pipeline Operation

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_20_img_1.png" alt="Image 1 from page 20" />

20


## Page 21

Effect of a Conditional Branch on Instruction Pipeline Operation

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_21_img_1.png" alt="Image 1 from page 21" />

21


## Page 22

Hazards


Situations that prevent starting the next instruction in the next cycle


Structure hazard

A required resource is busy


Data hazard

Attempt to use data before it’s ready
Need to wait for previous instruction to complete its data read/write


Control hazard

Deciding on control action depends on previous instruction
Attempt to make a decision about program control flow before the condition has been

evaluated and the new PC target address calculated

22


## Page 23

Structure Hazards

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_23_img_1.png" alt="Image 1 from page 23" />


Conflict for use of a resource


With a single memory

Load/store requires data access
Instruction fetch would have to stall for that cycle

Would cause a pipeline “bubble” (nop)

23


## Page 24

Data Hazards


An instruction depends on completion of data access by a previous instruction

add
$s0, $t0, $t1
sub
$t2, $s0, $t3

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_24_img_1.png" alt="Image 1 from page 24" />

24


## Page 25

Forwarding (aka Bypassing)


Use result when it is computed

Don’t wait for it to be stored in a register
Requires extra connections in the datapath

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_25_img_1.png" alt="Image 1 from page 25" />

25


## Page 26

Types of Data Hazards


RAW: Read After Write (true dependency)


WAR: Write After Read (anti-dependency)


WAW: Write After Write (output dependency)


RAR: Read After Read (not a hazard)

26


## Page 27

RAW - Example


Extremely common


Instruction 2 tries to read an operand before instruction 1 writes to it


Example of the dependency:

I1: add R1, R2, R3       # I1 writes to R1
I2: add R5, R1, R4       # I2 reads from R1

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_27_img_1.png" alt="Image 1 from page 27" />

27


## Page 28

WAR - Example

Instruction 2 tries to write to a destination before it is read by instruction 1.

Example of the dependency:

I1: add R4, R1, R5       # I1 reads from R5
I2: add R5, R1, R2       # I2 writes to R5

In the situation where I2 might finish before I1 (e.g. concurrent execution), it must be

ensured that the result of R5 is not stored before I1 has had the chance to fetch it.

WAR hazard is uncommon/impossible in a reasonable (in-order) pipeline

28


## Page 29

WAW - Example


Instruction 2 tries to write to an operand before instruction 1 writes to it


Example of the dependency:

I1: add R1, R2, R3       # I1 writes to R1
I2: add R1, R2, R4       # I2 writes to R1

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_29_img_1.png" alt="Image 1 from page 29" />


The WB of I2 must be delayed until I1 finishes executing


WAW hazard possible in a reasonable pipeline, but not in the very simple pipeline we’re 
assuming

29


## Page 30

RAR - Example


Not a hazard


Example of the dependency:

I1: add R1, R2, R3       # I1 reads from R2
I2: add R5, R4, R2       # I2 reads from R2


Register value does not change


The order of the two reads is not important

30


## Page 31

Example

<img src="./Chapter%2016%20-%20Processor%20Structure%20%26%20Function_images/page_31_img_1.png" alt="Image 1 from page 31" />

31


## Page 32

Control Hazards


Branch determines flow of control

Fetching next instruction depends on branch outcome
Pipeline can’t always fetch correct instruction

Still working on ID stage of branch


Occurs when the pipeline makes the wrong decision on a branch prediction


Brings instructions into the pipeline that must subsequently be discarded


Dealing with Branches:

Stall on branch
Multiple streams
Prefetch branch target
Loop buffer
Branch prediction

32

