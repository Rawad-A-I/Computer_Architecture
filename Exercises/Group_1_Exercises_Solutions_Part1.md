# Group 1: Foundations of Computer Architecture
## Comprehensive Exercise Solutions - Part 1

**Chapter 3: Top-Level View of Computer Function and Interconnection**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)
3. [Short Answer Solutions](#short-answer-solutions)
4. [Calculation Problem Solutions](#calculation-problem-solutions)

---

## Multiple Choice Solutions

### Section 1: Program Concept and Computer Components

**1.1** What is the fundamental difference between hardwired and programmable systems?

**Answer: b) Programmable systems use the same hardware to execute different programs**

**Explanation:**
- Hardwired systems have fixed functionality and require physical rewiring to change behavior
- Programmable systems use the same hardware but execute different instruction sequences
- The key difference is flexibility: programmable systems can perform different tasks with the same hardware by changing the program (sequence of instructions)
- Options a, c, and d are incorrect: hardwired systems aren't necessarily faster or more expensive, and programmable systems don't require physical rewiring

---

**1.2** Which component of the CPU is responsible for generating control signals?

**Answer: b) Control Unit**

**Explanation:**
- The Control Unit (CU) is responsible for generating control signals that coordinate all operations
- It translates instruction codes (opcodes) into control signals that activate the appropriate hardware components
- The ALU performs arithmetic/logical operations but doesn't generate control signals
- Registers store data, and cache is memory, not control signal generators

---

**1.3** What does the Control Unit do?

**Answer: b) Translates instruction codes into control signals**

**Explanation:**
- The Control Unit's primary function is to decode instructions and generate the appropriate control signals
- It reads the opcode from the Instruction Register and activates the necessary control lines
- It does not perform arithmetic (that's the ALU), store data (that's registers), or directly manage memory access (though it generates signals for memory operations)

---

**1.4** Which of the following is NOT one of the four essential computer components?

**Answer: d) Hard Disk Drive**

**Explanation:**
- The four essential components are: CPU, Main Memory, I/O Modules, and System Interconnection (Bus)
- A Hard Disk Drive is an external storage device that connects through an I/O module
- It is not a fundamental component itself, but rather a peripheral device
- The I/O module is the essential component that interfaces with devices like hard drives

---

**1.5** Main memory is considered volatile because:

**Answer: b) It loses data when power is off**

**Explanation:**
- Volatile memory loses its contents when power is removed
- Main memory (RAM) is volatile - it requires continuous power to maintain data
- This is different from non-volatile storage (like hard drives or SSDs) which retain data without power
- Speed, writability, and storing instructions are not what makes memory volatile

---

### Section 2: Instruction Cycle

**2.1** The instruction cycle consists of which two main phases?

**Answer: b) Fetch and Execute**

**Explanation:**
- The basic instruction cycle has two phases: Fetch and Execute
- Fetch: Retrieve the instruction from memory
- Execute: Perform the operation specified by the instruction
- Decode is part of the execute phase, and Load/Store are types of operations, not phases of the cycle

---

**2.2** During the fetch cycle, what is loaded into the Instruction Register (IR)?

**Answer: c) The instruction from memory**

**Explanation:**
- During fetch, the instruction is read from memory at the address in the Program Counter
- This instruction is loaded into the Instruction Register (IR) for decoding and execution
- Data operands are loaded later during the execute cycle
- Memory addresses are used to access memory, not loaded into IR

---

**2.3** What happens during the indirect addressing cycle?

**Answer: b) The effective address is calculated**

**Explanation:**
- Indirect addressing means the instruction contains the address of another address
- During the indirect cycle, the CPU reads the address from memory to get the effective address
- This effective address is then used in the execute cycle to access the actual data
- The indirect cycle is only needed when indirect addressing is used

---

**2.4** An instruction that requires 3 memory accesses during execution will have:

**Answer: c) 1 fetch cycle and 1 execute cycle with 3 memory operations**

**Explanation:**
- Every instruction has exactly 1 fetch cycle (to get the instruction itself)
- The execute cycle may contain multiple memory operations
- For example, `ADD B, A` might: read A, read B, then write result back to A (3 memory accesses in execute)
- The number of memory accesses in execute doesn't change the number of fetch cycles

---

**2.5** The Program Counter (PC) is updated:

**Answer: a) During the fetch cycle**

**Explanation:**
- The PC is automatically incremented during the fetch cycle to point to the next instruction
- This happens after the instruction is fetched but before execution
- The PC may also be updated during execute if a jump/branch instruction is executed
- But the automatic increment always happens during fetch

---

### Section 3: Interrupts

**3.1** Which of the following is NOT a class of interrupts?

**Answer: d) Cache interrupts**

**Explanation:**
- The four classes of interrupts are: Program, Timer, I/O, and Hardware Failure
- Cache interrupts are not a standard class of interrupts
- Cache misses are handled by the memory system, not through interrupts
- Cache operations are typically transparent to the interrupt system

---

**3.2** What is the primary purpose of interrupts?

**Answer: b) To improve processing efficiency by allowing CPU to do other work**

**Explanation:**
- The main purpose is efficiency: CPU can continue working while waiting for slow I/O operations
- Instead of polling or waiting, the CPU issues an I/O command and continues
- When I/O completes, an interrupt notifies the CPU
- This dramatically improves system throughput

---

**3.3** When an interrupt occurs, what must be saved before processing the interrupt?

**Answer: c) The context (PC, PSW, registers)**

**Explanation:**
- The complete context must be saved to allow resumption of the interrupted program
- This includes: Program Counter (PC), Processor Status Word (PSW), and general-purpose registers
- Saving only PC or only PSW is insufficient - the entire processor state must be preserved
- This context is restored after the interrupt handler completes

---

**3.4** In a priority-based interrupt system, what happens when a high-priority interrupt occurs during processing of a low-priority interrupt?

**Answer: c) The low-priority interrupt is suspended and the high-priority interrupt is processed**

**Explanation:**
- Priority-based systems support nested interrupts
- When a higher priority interrupt arrives, the current (lower priority) handler is suspended
- The higher priority interrupt is processed immediately
- After the high-priority handler completes, the system returns to the suspended low-priority handler
- This allows critical events to be handled promptly

---

**3.5** Timer interrupts are primarily used for:

**Answer: b) Pre-emptive multi-tasking and time slicing**

**Explanation:**
- Timer interrupts are essential for operating system scheduling
- They enable pre-emptive multi-tasking by periodically interrupting running processes
- The OS scheduler runs on timer interrupts to switch between processes
- This ensures fair CPU time allocation and responsive system behavior

---

### Section 4: System Bus

**4.1** The system bus consists of how many separate buses?

**Answer: c) Three**

**Explanation:**
- The system bus consists of three separate buses: Data Bus, Address Bus, and Control Bus
- Each serves a different purpose and carries different types of information
- They operate together but are physically and logically separate

---

**4.2** Which bus carries the actual data and instructions?

**Answer: b) Data Bus**

**Explanation:**
- The Data Bus carries the actual data and instructions being transferred
- It is bidirectional - data can flow in both directions (read or write)
- The Address Bus carries memory addresses, and the Control Bus carries control signals

---

**4.3** If a system has a 32-bit address bus, what is the maximum addressable memory?

**Answer: b) 4 GB (2^32 bytes)**

**Explanation:**
- A 32-bit address bus can represent 2^32 different addresses
- 2^32 = 4,294,967,296 addresses
- If each address stores 1 byte, maximum memory = 4,294,967,296 bytes = 4 GB
- This is a fundamental limitation: address bus width determines maximum memory capacity

---

**4.4** The control bus carries:

**Answer: c) Control and timing signals**

**Explanation:**
- The Control Bus carries various control and timing signals
- Examples: Read, Write, Interrupt, Clock, Ready, Acknowledge
- It coordinates operations between components
- It is not unidirectional - different signals flow in different directions

---

**4.5** A 64-bit data bus can transfer:

**Answer: a) 64 bits per clock cycle**

**Explanation:**
- The data bus width determines how many bits can be transferred in one clock cycle
- A 64-bit bus transfers 64 bits (8 bytes) per cycle
- The actual transfer rate depends on the clock frequency
- Bandwidth = bus width × clock frequency

---

### Section 5: Bus Architecture

**5.1** In synchronous bus timing, operations are:

**Answer: b) Synchronized with the clock signal**

**Explanation:**
- Synchronous buses use a clock signal to coordinate all operations
- All bus operations are synchronized to clock edges
- This simplifies design but requires all devices to operate at the same speed
- Asynchronous buses don't use a clock and rely on handshaking signals

---

**5.2** Bus arbitration is needed when:

**Answer: b) Multiple devices need to use the bus simultaneously**

**Explanation:**
- Bus arbitration resolves conflicts when multiple devices want to use the bus at the same time
- Only one device can use the bus at a time
- Arbitration determines which device gets access and in what order
- If only one device uses the bus, no arbitration is needed

---

**5.3** Which bus arbitration method uses a daisy chain?

**Answer: d) Priority-based daisy chain**

**Explanation:**
- Daisy chain arbitration uses a priority chain where devices are connected in series
- The device closest to the arbiter has highest priority
- When a device requests the bus, the request propagates down the chain
- The first device in the chain that wants the bus gets it

---

**5.4** In a centralized bus arbitration scheme:

**Answer: b) A single bus controller manages all requests**

**Explanation:**
- Centralized arbitration uses a single bus controller (arbiter)
- All devices send requests to this central arbiter
- The arbiter decides which device gets bus access based on priority
- This is simpler than distributed arbitration but creates a single point of control

---

**5.5** Bus bandwidth is determined by:

**Answer: c) The data bus width and clock frequency**

**Explanation:**
- Bus bandwidth = Data Bus Width × Clock Frequency
- Both factors are important: wider bus or higher frequency increases bandwidth
- Address bus width affects memory capacity, not bandwidth
- Control signals don't directly determine bandwidth

---

## True/False Solutions

**T/F 1.1** A hardwired system can be reprogrammed by changing the instruction sequence without physical modification.

**Answer: False**

**Explanation:**
- Hardwired systems have fixed functionality built into the hardware
- They cannot be reprogrammed by changing instructions - they don't use instructions
- Only programmable systems can be changed by modifying the instruction sequence
- Hardwired systems require physical rewiring to change functionality

---

**T/F 1.2** The ALU performs arithmetic and logical operations, while the Control Unit generates control signals.

**Answer: True**

**Explanation:**
- This is correct: ALU (Arithmetic Logic Unit) performs calculations and logic operations
- Control Unit generates control signals to coordinate operations
- This is the standard division of responsibilities in CPU design

---

**T/F 1.3** Main memory stores both instructions and data.

**Answer: True**

**Explanation:**
- Main memory (RAM) stores both program instructions and data
- This is the von Neumann architecture principle
- Instructions and data are stored in the same memory space
- The CPU fetches instructions from memory and operates on data from memory

---

**T/F 1.4** The instruction cycle always consists of exactly two phases: fetch and execute.

**Answer: False**

**Explanation:**
- The basic cycle has fetch and execute, but an indirect cycle may be inserted between them
- The complete cycle can be: Fetch → [Indirect] → Execute → Interrupt Check
- Not all instructions require indirect addressing, but when they do, there are three phases
- The statement is too absolute

---

**T/F 1.5** During the fetch cycle, the Program Counter is automatically incremented to point to the next instruction.

**Answer: True**

**Explanation:**
- After fetching an instruction, the PC is automatically incremented
- This prepares the PC to point to the next instruction in sequence
- The PC may be modified during execute (by jump/branch instructions), but the automatic increment happens in fetch

---

**T/F 2.1** An indirect addressing cycle is always required for every instruction.

**Answer: False**

**Explanation:**
- Indirect addressing is only needed when an instruction uses indirect addressing mode
- Many instructions use direct addressing and don't need an indirect cycle
- The indirect cycle is optional and only inserted when required

---

**T/F 2.2** The execute cycle may require zero, one, or multiple memory accesses depending on the instruction.

**Answer: True**

**Explanation:**
- Different instructions have different memory access requirements
- Register operations: 0 memory accesses (operate on registers only)
- Load: 1 memory access (read from memory)
- Store: 1 memory access (write to memory)
- Complex instructions: multiple accesses (read operands, write results)

---

**T/F 2.3** All instructions require the same amount of time to execute.

**Answer: False**

**Explanation:**
- Instructions vary greatly in execution time
- Simple register operations: 1 cycle
- Memory operations: multiple cycles
- Complex operations (multiply, divide): many cycles
- Execution time depends on instruction complexity and operand locations

---

**T/F 3.1** Interrupts always improve system performance.

**Answer: False**

**Explanation:**
- Interrupts have overhead: context saving/restoration takes time
- For very fast operations, polling might be more efficient
- Too many interrupts can degrade performance
- Interrupts improve efficiency for I/O operations, but not always for all scenarios

---

**T/F 3.2** When an interrupt occurs, the CPU must save the current context before processing the interrupt.

**Answer: True**

**Explanation:**
- Context must be saved to allow resumption of the interrupted program
- This includes PC, PSW, and registers
- Without saving context, the interrupted program cannot be correctly resumed
- Context is restored after interrupt handling completes

---

**T/F 3.3** In a system with disabled interrupts, all interrupts are lost and cannot be processed later.

**Answer: False**

**Explanation:**
- When interrupts are disabled, they are typically held pending
- The system checks for pending interrupts after re-enabling interrupts
- Interrupts are not lost - they wait until interrupts are enabled again
- This is different from losing interrupts entirely

---

**T/F 3.4** Timer interrupts are essential for implementing pre-emptive multi-tasking in operating systems.

**Answer: True**

**Explanation:**
- Timer interrupts enable the OS to periodically regain control
- The OS scheduler runs on timer interrupts to switch between processes
- Without timer interrupts, cooperative multitasking would be required (less reliable)
- Pre-emptive multitasking requires timer interrupts

---

**T/F 3.5** Hardware failure interrupts have the highest priority in most systems.

**Answer: True**

**Explanation:**
- Hardware failures (power failure, memory errors) are critical
- They must be handled immediately to prevent data loss or system damage
- These typically have the highest priority in interrupt systems
- System integrity depends on handling these promptly

---

**T/F 4.1** The address bus is bidirectional, allowing addresses to flow in both directions.

**Answer: False**

**Explanation:**
- The address bus is unidirectional - addresses flow from CPU to memory/I/O
- The CPU generates addresses and sends them to memory
- Memory/I/O devices don't send addresses back to the CPU
- Only the data bus is bidirectional

---

**T/F 4.2** A wider data bus generally allows for faster data transfer.

**Answer: True**

**Explanation:**
- Wider data bus means more bits transferred per clock cycle
- This increases bandwidth (transfer rate)
- However, wider buses are more expensive and require more pins
- There are practical limits to bus width

---

**T/F 4.3** The control bus is unidirectional, carrying signals only from the CPU to other components.

**Answer: False**

**Explanation:**
- The control bus carries signals in both directions
- CPU sends: Read, Write, Clock
- Devices send back: Ready, Acknowledge, Interrupt
- It's a collection of various control signals, some input, some output

---

**T/F 4.4** The maximum addressable memory is determined solely by the address bus width.

**Answer: True**

**Explanation:**
- Address bus width determines how many unique addresses can be represented
- Maximum memory = 2^(address bus width) × bytes per address
- If each address stores 1 byte, it's simply 2^(address bus width) bytes
- This is a fundamental architectural limit

---

**T/F 5.1** Synchronous buses are simpler to implement but less flexible than asynchronous buses.

**Answer: True**

**Explanation:**
- Synchronous buses use a clock, making timing simpler
- All devices must operate at the same speed
- Asynchronous buses use handshaking, allowing different speed devices
- Synchronous is simpler but less flexible

---

**T/F 5.2** Bus arbitration is only needed when multiple devices try to use the bus at the same time.

**Answer: True**

**Explanation:**
- Arbitration resolves conflicts when multiple devices want bus access simultaneously
- If only one device uses the bus, or devices never conflict, arbitration isn't needed
- However, most systems have multiple devices, so arbitration is usually necessary

---

**T/F 5.3** In a daisy chain arbitration scheme, the device closest to the CPU always has the highest priority.

**Answer: True**

**Explanation:**
- Daisy chain connects devices in a priority order
- The device closest to the arbiter/CPU has highest priority
- Requests propagate down the chain, and the first requesting device gets access
- Priority is fixed by physical position

---

**T/F 5.4** Bus bandwidth can be increased by either increasing the data bus width or increasing the clock frequency.

**Answer: True**

**Explanation:**
- Bandwidth = Data Bus Width × Clock Frequency
- Increasing either factor increases bandwidth
- Both are valid approaches, with different trade-offs
- Width: more expensive, more pins
- Frequency: power consumption, signal integrity challenges

---

## Short Answer Solutions

### Section 1: Program Concept

**SA 1.1** Explain the difference between hardwired and programmable systems. Give one example of each.

**Answer:**

**Hardwired Systems:**
- Have fixed functionality built into the hardware circuitry
- Cannot be changed without physical modification or rewiring
- Designed for a specific task or set of tasks
- Example: Early calculators, traffic light controllers, dedicated control systems

**Programmable Systems:**
- Use the same hardware to execute different programs (sequences of instructions)
- Functionality changes by loading different programs
- Flexible - can perform many different tasks
- Example: Modern computers, smartphones, tablets, general-purpose processors

**Key Difference:** Hardwired systems are inflexible but potentially faster for their specific task. Programmable systems are flexible but require instruction interpretation overhead.

---

**SA 1.2** What is a program, and how does it relate to control signals?

**Answer:**

A **program** is a sequence of instructions, where each instruction specifies an operation to be performed.

**Relationship to Control Signals:**
- Each instruction has a unique operation code (opcode)
- The Control Unit reads the opcode and generates the appropriate control signals
- These control signals activate specific hardware components (ALU, registers, memory, I/O)
- The sequence of instructions determines the sequence of control signals
- Different programs produce different sequences of control signals, enabling different behaviors

**Example:** An ADD instruction generates control signals to: route operands to ALU, set ALU to addition mode, route result to destination register, update status flags.

---

**SA 1.3** Describe the role of the Control Unit in a programmable system.

**Answer:**

The **Control Unit** is responsible for:

1. **Instruction Decoding:**
   - Reads the opcode from the Instruction Register (IR)
   - Determines what operation the instruction specifies

2. **Control Signal Generation:**
   - Generates the sequence of control signals needed to execute the instruction
   - Activates appropriate hardware components at the right times
   - Coordinates data flow between components

3. **Instruction Cycle Management:**
   - Controls the fetch, indirect (if needed), and execute phases
   - Manages the Program Counter
   - Handles interrupt checks

4. **System Coordination:**
   - Coordinates CPU, memory, and I/O operations
   - Manages timing and sequencing of operations

**Without the Control Unit:** The system would be unable to interpret instructions or coordinate operations. It's the "brain" that makes the hardware programmable.

---

### Section 2: Computer Components

**SA 2.1** List and briefly describe the four essential components of a computer system.

**Answer:**

1. **Central Processing Unit (CPU):**
   - The "brain" of the computer
   - Contains Control Unit (generates control signals) and ALU (performs operations)
   - Has registers for fast temporary storage
   - Executes instructions and coordinates system operations

2. **Main Memory:**
   - Stores both instructions and data
   - Volatile (loses data when power is off)
   - Organized as addressable locations
   - Much larger but slower than CPU registers

3. **Input/Output (I/O) Modules:**
   - Interface between computer and external devices
   - Handle data transfer to/from peripherals
   - Examples: keyboard, mouse, display, printer, disk drives, network interfaces
   - Translate between device-specific protocols and system bus

4. **System Interconnection (Bus):**
   - Communication pathway connecting all components
   - Consists of Data Bus, Address Bus, and Control Bus
   - Enables data, address, and control signal transfer
   - Critical for system performance

**All four are essential** - removing any one makes the system non-functional.

---

**SA 2.2** What are the two main parts of the CPU, and what does each do?

**Answer:**

1. **Control Unit (CU):**
   - **Function:** Manages instruction execution and generates control signals
   - Reads and decodes instructions
   - Generates control signals to activate appropriate hardware
   - Coordinates the instruction cycle (fetch, indirect, execute)
   - Manages program flow and system timing

2. **Arithmetic and Logic Unit (ALU):**
   - **Function:** Performs arithmetic and logical operations
   - Arithmetic: addition, subtraction, multiplication, division
   - Logical: AND, OR, NOT, XOR, shifts, comparisons
   - Operates on data from registers
   - Produces results and status flags (zero, carry, overflow, etc.)

**Working Together:** The Control Unit tells the ALU what operation to perform and when, while the ALU performs the actual computation.

---

**SA 2.3** Why is main memory considered temporary storage, and what does "volatile" mean in this context?

**Answer:**

**Temporary Storage:**
- Main memory (RAM) is used for active programs and data currently being processed
- Data is loaded from permanent storage (disk) when needed
- When programs finish, their memory is freed for other programs
- It's a working space, not permanent storage

**Volatile:**
- **Definition:** Volatile memory loses its contents when power is removed
- Main memory requires continuous electrical power to maintain stored data
- When the computer is turned off, all data in main memory is lost
- This is why we save files to disk (non-volatile storage) before shutting down

**Contrast:** Non-volatile storage (hard drives, SSDs, flash memory) retains data without power, making it suitable for long-term storage.

---

**SA 2.4** What is the purpose of I/O modules in a computer system?

**Answer:**

I/O modules serve several critical purposes:

1. **Interface Between System and Devices:**
   - Connect external devices to the computer system
   - Translate between device-specific protocols and system bus standards

2. **Data Buffering:**
   - Temporarily store data during transfers
   - Compensate for speed differences between CPU and devices
   - Allow CPU to continue working while I/O operations proceed

3. **Error Detection and Handling:**
   - Detect device errors and report them to the CPU
   - Handle device-specific error conditions
   - Provide status information about device state

4. **Control and Status Management:**
   - Control device operations (start, stop, configure)
   - Monitor device status (ready, busy, error)
   - Generate interrupts when operations complete

5. **Data Format Conversion:**
   - Convert between device data formats and system formats
   - Handle serial/parallel conversions
   - Manage data encoding/decoding

**Without I/O modules:** The computer would be unable to communicate with the outside world (no keyboard, display, storage, network, etc.).

---

### Section 3: Instruction Cycle

**SA 3.1** Describe the steps that occur during the fetch cycle.

**Answer:**

The fetch cycle retrieves the next instruction from memory. Steps:

1. **Address Generation:**
   - The Program Counter (PC) contains the address of the next instruction to fetch
   - This address is placed on the Address Bus

2. **Memory Read Request:**
   - The Control Unit generates a Read control signal
   - This signal is sent on the Control Bus to memory

3. **Instruction Retrieval:**
   - Memory responds by placing the instruction on the Data Bus
   - The instruction is read from memory at the specified address

4. **Instruction Loading:**
   - The instruction is loaded into the Instruction Register (IR)
   - The IR now contains the instruction to be executed

5. **Program Counter Update:**
   - The PC is automatically incremented to point to the next instruction
   - This prepares for the next fetch cycle
   - (PC may be modified later by jump/branch instructions during execute)

**Result:** The instruction is now in the IR, ready for decoding and execution, and the PC points to the next instruction.

---

**SA 3.2** What is the difference between direct and indirect addressing? When is an indirect cycle needed?

**Answer:**

**Direct Addressing:**
- The instruction contains the actual memory address of the operand
- Example: `LOAD R1, 1000` - loads data from address 1000 directly
- No additional memory access needed to get the address
- Faster but less flexible

**Indirect Addressing:**
- The instruction contains the address of another address (pointer)
- The CPU must first read this address to get the effective address
- Example: `LOAD R1, (1000)` - address 1000 contains another address (say 2000), and we load from address 2000
- Requires an extra memory access
- More flexible (allows dynamic addressing, data structures)

**When Indirect Cycle is Needed:**
- When an instruction uses indirect addressing mode
- The indirect cycle is inserted between fetch and execute
- During indirect cycle: read the address from memory, use it as the effective address
- Not all instructions use indirect addressing, so the cycle is optional

**Use Cases for Indirect Addressing:**
- Arrays and data structures (base address + offset)
- Function pointers and jump tables
- Dynamic memory allocation
- Implementing stacks and linked lists

---

**SA 3.3** Explain why different instructions may require different numbers of memory accesses during execution.

**Answer:**

Different instructions have different operand requirements and operations:

**0 Memory Accesses:**
- Register-to-register operations: `ADD R1, R2`
- Operands are in registers, result goes to register
- No memory access needed

**1 Memory Access:**
- Load: `LOAD R1, A` - read from memory address A
- Store: `STORE R1, A` - write to memory address A
- Jump: `JUMP A` - read new PC value (if stored in memory)

**2 Memory Accesses:**
- `ADD R1, A` - read operand from A, write result back to A
- `MOVE A, B` - read from B, write to A

**3+ Memory Accesses:**
- `ADD B, A` - read A, read B, write result to A
- Complex instructions with multiple operands and results
- Instructions using indirect addressing (extra access for address)

**Factors Affecting Memory Accesses:**
- Number of operands in memory
- Number of results to write back
- Use of indirect addressing
- Instruction complexity

**Performance Impact:** More memory accesses mean longer execution time, which is why registers (0 memory accesses) are preferred for speed.

---

**SA 3.4** What information is stored in the Program Counter (PC) and Instruction Register (IR)?

**Answer:**

**Program Counter (PC):**
- **Contents:** The memory address of the next instruction to be fetched
- **Purpose:** Keeps track of where the program is in memory
- **Behavior:**
  - Automatically incremented after each fetch (points to next sequential instruction)
  - Can be modified by jump/branch instructions (non-sequential execution)
  - Saved during interrupts (to resume execution later)

**Instruction Register (IR):**
- **Contents:** The current instruction being executed
- **Purpose:** Holds the instruction fetched from memory
- **Behavior:**
  - Loaded during fetch cycle with instruction from memory
  - Contains opcode (operation code) and operands
  - Used by Control Unit to generate control signals
  - Remains constant during execution of that instruction

**Relationship:** PC points to where the instruction is, IR holds what the instruction is.

---

*[Continued in Part 2...]*

