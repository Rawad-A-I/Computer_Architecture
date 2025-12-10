# Group 6: Input/Output Systems & Interfaces
## Detailed Study Guide

**Chapter 8: Input/Output**

---

## Table of Contents
1. [Introduction to I/O Systems](#introduction-to-io-systems)
2. [I/O Module Structure and Functions](#io-module-structure-and-functions)
3. [External Devices](#external-devices)
4. [I/O Techniques](#io-techniques)
5. [I/O Mapping and Addressing](#io-mapping-and-addressing)
6. [Interrupt-Driven I/O](#interrupt-driven-io)
7. [Direct Memory Access (DMA)](#direct-memory-access-dma)
8. [I/O Controllers and Interfaces](#io-controllers-and-interfaces)
9. [External Interconnection Standards](#external-interconnection-standards)
10. [Evolution of I/O Function](#evolution-of-io-function)
11. [Key Concepts Summary](#key-concepts-summary)
12. [Practice Problems and Examples](#practice-problems-and-examples)

---

## Introduction to I/O Systems

### Why I/O Modules are Needed

**Problem:** Why not connect peripherals directly to system bus?

**Reasons:**

1. **Wide Variety of Peripherals:**
   - Different methods of operation
   - Different data formats
   - Different speeds
   - **Impractical** to incorporate control logic within processor

2. **Speed Mismatch:**
   - **Peripherals often slower** than memory/processor
   - Impractical to use high-speed system bus directly
   - Would waste bus bandwidth

3. **Some Peripherals Faster:**
   - Some devices faster than memory/processor
   - Mismatch leads to inefficiencies if not managed

4. **Data Format Differences:**
   - Peripherals use different data formats
   - Different word lengths
   - Need conversion/translation

**Solution:** **I/O Module** required to interface between processor/memory and peripherals.

### I/O Module Purpose

**Two Major Functions:**

1. **Interface to Processor and Memory:**
   - Via system bus or central switch
   - Handles communication with CPU
   - Manages data transfer to/from memory

2. **Interface to Peripheral Devices:**
   - Via data links
   - Handles device-specific protocols
   - Manages device control and status

**Result:** I/O module acts as **translator** and **buffer** between system and peripherals.

---

## I/O Module Structure and Functions

### Generic I/O Module Model

**Components:**
- **Address Lines:** Identify I/O module and device
- **Data Lines:** Transfer data
- **Control Lines:** Control and timing signals
- **Links to Peripheral Devices:** Device-specific interfaces

### Major Functions of I/O Module

#### 1. Control and Timing

**Purpose:** Coordinate flow of traffic between internal resources and external devices.

**Responsibilities:**
- Coordinate processor and I/O module interactions
- Manage shared resources (bus, memory)
- Handle timing of operations

**Example Sequence:**
1. Processor interrogates I/O module (check device status)
2. I/O module returns device status
3. If device ready, processor requests data transfer
4. I/O module obtains data from external device
5. Data transferred from I/O module to processor

**Bus Arbitration:**
- Each interaction may involve bus arbitration
- Multiple devices competing for bus access
- I/O module must coordinate with bus controller

#### 2. Processor Communication

**Purpose:** Enable communication between processor and I/O module.

**Components:**

**Command Decoding:**
- I/O module accepts commands from processor
- Commands sent as signals on control bus
- Example: Disk drive commands (READ SECTOR, WRITE SECTOR, SEEK)

**Data Exchange:**
- Data exchanged over data bus
- Bidirectional communication
- Handles data format conversion

**Status Reporting:**
- **Critical:** Peripherals are slow
- I/O module reports status to processor
- Common status signals:
  - **BUSY:** Module working on previous command
  - **READY:** Module ready for new command
- Processor can check status before proceeding

**Address Recognition:**
- Each I/O device has unique address
- I/O module recognizes address for its peripherals
- Similar to memory addressing

#### 3. Device Communication

**Purpose:** Enable communication between I/O module and external device.

**Components:**
- **Commands:** I/O module sends commands to device
- **Status Information:** Device reports status to I/O module
- **Data:** Actual data transfer

**Device-Specific:**
- Each device type has different protocol
- I/O module handles device-specific communication
- Abstracts device details from processor

#### 4. Data Buffering

**Purpose:** Balance speed differences between device and memory.

**Problem:**
- **Memory/Processor:** Very high transfer rates
- **Peripherals:** Often much slower (orders of magnitude)

**Solution - Buffering:**

**From Memory to Device:**
- Data sent from memory in rapid burst
- **Buffered in I/O module**
- Sent to device at device's slower rate

**From Device to Memory:**
- Data received from device slowly
- **Buffered in I/O module**
- Prevents tying up memory in slow transfer
- Can accumulate data before transferring to memory

**Speed Matching:**
- I/O module must operate at **both** device and memory speeds
- Handles speed conversion
- Prevents bottlenecks

**Fast Devices:**
- Some devices faster than memory
- I/O module buffers to prevent memory bottleneck
- Manages high-speed data streams

#### 5. Error Detection

**Purpose:** Detect and report errors to processor.

**Error Types:**

**1. Mechanical/Electrical Malfunctions:**
- Reported by device itself
- Examples:
  - Paper jam (printer)
  - Bad disk track
  - Device failure

**2. Transmission Errors:**
- Unintentional changes to bit pattern
- During transmission from device to I/O module
- Need error detection codes

**Error Detection Methods:**

**Parity Bit:**
- Simple example: Parity bit on each character
- Example: IRA character code (7 bits) + 1 parity bit
- **Even parity:** Total number of 1s is even
- **Odd parity:** Total number of 1s is odd
- I/O module checks parity on receipt
- Detects single-bit errors

**More Advanced:**
- CRC (Cyclic Redundancy Check)
- Checksums
- Error-correcting codes

### I/O Module Block Diagram

**Internal Structure:**

```
Interface to System Bus:
├── Address Lines
├── Data Lines
└── Control Lines

I/O Module:
├── Data Registers
├── Status/Control Registers
├── I/O Logic
│   ├── Address Recognition
│   ├── Command Decoding
│   └── Status Reporting
└── Device Interface Logic

Interface to External Device:
├── Data Lines
├── Status Lines
└── Control Lines
```

**Registers:**
- **Data Registers:** Hold data being transferred
- **Status/Control Registers:** Device status and control information

---

## External Devices

### What are External Devices?

**Definition:** Provide means of exchanging data between external environment and computer.

**Connection:** Attached to computer by link to I/O module.

**Link Purpose:** Exchange control, status, and data between I/O module and external device.

### Categories of External Devices

#### 1. Human Readable

**Purpose:** Suitable for communicating with computer user.

**Examples:**
- **Video display terminals:** Monitors, screens
- **Printers:** Output devices
- **Keyboards:** Input devices
- **Mice:** Input devices

**Characteristics:**
- Designed for human interaction
- Text, graphics, audio output
- Human-readable input

#### 2. Machine Readable

**Purpose:** Suitable for communicating with equipment.

**Examples:**
- **Magnetic disk and tape systems:** Storage devices
- **Sensors:** Environmental sensors, temperature, pressure
- **Actuators:** Motors, valves, switches

**Characteristics:**
- Designed for machine-to-machine communication
- Binary data formats
- Automated operation

#### 3. Communication

**Purpose:** Suitable for communicating with remote devices.

**Examples:**
- **Terminals:** Remote terminals
- **Machine readable devices:** Remote equipment
- **Other computers:** Network communication

**Characteristics:**
- Network connectivity
- Remote access
- Protocol-based communication

### Block Diagram of External Device

**Components:**

1. **Transducer:**
   - Converts between physical world and electrical signals
   - Input: Physical → Electrical
   - Output: Electrical → Physical

2. **Buffer:**
   - Temporary storage
   - Holds data during transfer
   - Speed matching

3. **Control Logic:**
   - Device control functions
   - Interprets control signals
   - Manages device operation

**Signals:**
- **Control signals from I/O module:** Determine device function
- **Status signals to I/O module:** Indicate device state
- **Data bits:** To and from I/O module
- **Data to/from environment:** Device-specific data

---

## I/O Techniques

### Three I/O Techniques

**Classification:**

1. **Programmed I/O**
   - No interrupts
   - I/O-to-memory transfer through processor

2. **Interrupt-Driven I/O**
   - Use of interrupts
   - I/O-to-memory transfer through processor

3. **Direct Memory Access (DMA)**
   - Use of interrupts
   - Direct I/O-to-memory transfer

**Key Difference:** Role of processor in data transfer.

### Programmed I/O

#### Concept

**Definition:** Processor directly controls I/O operation.

**Process:**
1. Processor executes I/O instruction
2. Issues command to I/O module
3. I/O module performs action
4. Sets status bits in status register
5. **Processor must periodically check status**
6. Processor waits until operation complete

**Key Characteristic:** **I/O module does NOT interrupt processor.**

**Processor Responsibility:**
- Must check status repeatedly
- Waits for I/O completion
- Cannot do other work while waiting

#### I/O Commands

**Four Types of I/O Commands:**

1. **Control:**
   - Activate peripheral
   - Tell device what to do
   - Example: Start printer, seek disk track

2. **Test:**
   - Test status conditions
   - Check I/O module and peripheral status
   - Example: Check if device ready, check for errors

3. **Read:**
   - I/O module obtains data from peripheral
   - Places data in internal buffer
   - Processor reads from buffer

4. **Write:**
   - I/O module takes data from data bus
   - Transmits data to peripheral
   - Processor writes to I/O module

#### Programmed I/O Flow

**Input of Block of Data:**

```
1. Issue Read command to I/O module
2. Read status of I/O module
3. Check if ready
   - If not ready: Loop back to step 2
   - If ready: Continue
4. Read word from I/O module
5. Write word into memory
6. Check if done
   - If not done: Go to step 1 (next word)
   - If done: Next instruction
```

**Characteristics:**
- **CPU waits:** Processor tied up during I/O
- **Polling:** Must check status repeatedly
- **Inefficient:** Wastes processor time
- **Simple:** Easy to implement

**Drawbacks:**
- Processor cannot do other work
- Wastes CPU cycles checking status
- Slow for slow devices

### Interrupt-Driven I/O

#### Concept

**Definition:** I/O module interrupts processor when ready.

**Process:**
1. Processor issues I/O command
2. **Processor continues executing other instructions**
3. I/O module works on I/O operation
4. When ready, I/O module **interrupts processor**
5. Processor handles interrupt
6. Executes data transfer
7. Resumes former processing

**Key Advantage:** **Processor can do other work while waiting.**

#### Interrupt-Driven I/O Flow

**Input of Block of Data:**

```
1. Issue Read command to I/O module
2. Do something else (other instructions)
3. Interrupt occurs (I/O module ready)
4. Read status of I/O module
5. Check for error condition
6. Read word from I/O module
7. Write word into memory
8. Check if done
   - If not done: Go to step 1
   - If done: Return to interrupted program
```

**Characteristics:**
- **CPU not waiting:** Can do other work
- **Asynchronous:** I/O happens in background
- **Efficient:** Better CPU utilization
- **More complex:** Requires interrupt handling

**Advantages:**
- Better CPU utilization
- Can handle multiple I/O operations
- More responsive system

**Drawbacks:**
- Still involves processor in each transfer
- Interrupt overhead
- More complex than programmed I/O

### Direct Memory Access (DMA)

#### Concept

**Definition:** I/O module and memory exchange data directly without processor involvement.

**Process:**
1. Processor issues block read command to DMA module
2. **Processor continues executing other instructions**
3. DMA module transfers entire block directly to/from memory
4. DMA module interrupts processor when complete

**Key Advantage:** **Processor only involved at start and end.**

#### DMA Flow

**Input of Block of Data:**

```
1. Issue Read block command to DMA module
2. Do something else (other instructions)
3. DMA transfers data directly to memory
   (Processor not involved)
4. Interrupt occurs (DMA complete)
5. Read status of DMA module
6. Check for error condition
7. Next instruction
```

**Characteristics:**
- **Minimal CPU involvement:** Only at start and end
- **Direct transfer:** I/O to memory, bypassing CPU
- **Very efficient:** Best for large transfers
- **Most complex:** Requires DMA controller

**Advantages:**
- **Maximum efficiency:** CPU free during transfer
- **High throughput:** Can transfer large blocks
- **Best for bulk data:** Disk, network transfers

**Drawbacks:**
- Most complex implementation
- Requires DMA controller hardware
- Bus arbitration needed

### Comparison of I/O Techniques

| Technique | CPU Involvement | Efficiency | Complexity | Best For |
|-----------|----------------|------------|------------|----------|
| **Programmed I/O** | High (waits) | Low | Simple | Simple devices, small transfers |
| **Interrupt-Driven** | Medium (handles interrupts) | Medium | Medium | General I/O, medium transfers |
| **DMA** | Low (start/end only) | High | Complex | Large transfers, high-speed devices |

**Evolution:** Programmed → Interrupt-Driven → DMA (increasing efficiency and complexity)

---

## I/O Mapping and Addressing

### The Addressing Problem

**Question:** How does processor identify I/O devices?

**Answer:** Two modes of addressing when processor, memory, and I/O share common bus.

### Memory-Mapped I/O

**Concept:** I/O devices and memory locations share **single address space**.

**Characteristics:**
- I/O looks just like memory read/write
- **No special commands** for I/O
- Processor uses **same machine instructions** for memory and I/O
- Status and data registers treated as memory locations

**Address Space:**
- Combined total of memory and I/O addresses
- Example: 10 address lines → 2^10 = 1024 locations
- Can be any combination (e.g., 512 memory + 512 I/O)

**Advantages:**
- **Large selection of memory access commands available**
- Can use all memory instructions (load, store, arithmetic)
- Simpler instruction set
- Flexible addressing

**Disadvantages:**
- **Reduces memory address space**
- Memory and I/O compete for addresses
- Need to reserve address space for I/O

**Example:**
```
Address 516: Keyboard input data register
Address 517: Keyboard input status register

Load AC, 517        ; Get status
Branch if Sign = 0, 202  ; Loop until ready
Load AC, 516        ; Load data byte
```

### Isolated I/O (Port-Mapped I/O)

**Concept:** **Separate address spaces** for memory and I/O.

**Characteristics:**
- Need **I/O or memory select lines** on bus
- **Special commands** for I/O (IN, OUT, Test I/O)
- Limited set of I/O instructions
- I/O addresses separate from memory addresses

**Address Space:**
- Memory: Full address space (e.g., 1024 locations)
- I/O: Separate address space (e.g., 1024 I/O ports)
- **Total:** More addressable locations

**Advantages:**
- **Full memory address space** available
- Memory and I/O don't compete
- Clear separation

**Disadvantages:**
- **Limited set of I/O instructions**
- Special instructions needed
- Less flexible than memory-mapped

**Example:**
```
Load I/O, 5         ; Initiate keyboard read
Test I/O, 5         ; Check for completion
Branch Not Ready, 201  ; Loop until complete
In, 5               ; Load data byte
```

### Comparison

| Aspect | Memory-Mapped I/O | Isolated I/O |
|--------|-------------------|--------------|
| **Address Space** | Shared | Separate |
| **Instructions** | Memory instructions | Special I/O instructions |
| **Flexibility** | High | Lower |
| **Memory Space** | Reduced | Full |
| **Complexity** | Simpler | More complex |

**Modern Practice:** Most systems use **memory-mapped I/O** for flexibility.

---

## Interrupt-Driven I/O

### Why Interrupt-Driven I/O?

**Problem with Programmed I/O:**
- Processor must wait long time for I/O module
- Wastes processor time
- Inefficient

**Solution:**
- Processor issues I/O command
- Goes on to do other useful work
- I/O module interrupts when ready
- Processor handles transfer and resumes

### Simple Interrupt Processing

**Hardware Steps:**
1. Device controller issues interrupt
2. Processor finishes current instruction
3. Processor signals acknowledgment
4. Processor pushes PSW and PC onto control stack

**Software Steps:**
1. Save remainder of process state information
2. Process interrupt
3. Restore process state information
4. Restore old PSW and PC

**Result:** Processor loads new PC value based on interrupt, executes interrupt service routine, then returns.

### Changes During Interrupt

**Before Interrupt:**
- Program Counter: N
- Stack Pointer: T
- General Registers: Various values
- User's Program executing

**After Interrupt:**
- Program Counter: Y (interrupt service routine)
- Stack Pointer: T - M (pushed values)
- General Registers: Saved on stack
- Interrupt Service Routine executing

**Return from Interrupt:**
- Restore PC, PSW, registers from stack
- Resume user program at instruction N+1

### Design Issues

**Two Key Questions:**

1. **Device Identification:**
   - How does processor determine which device issued interrupt?
   - Multiple I/O modules may interrupt

2. **Priority:**
   - If multiple interrupts occur, which to process first?
   - Need priority system

### Device Identification Techniques

**Four Categories:**

#### 1. Multiple Interrupt Lines

**Concept:** Separate interrupt line for each I/O module.

**Characteristics:**
- Most straightforward approach
- Processor knows device from interrupt line
- **Problem:** Limited number of interrupt lines
- Even with multiple lines, each line may have multiple modules

**Use:** Simple systems, few devices

#### 2. Daisy Chain (Hardware Poll, Vectored)

**Concept:** Interrupt acknowledge line daisy-chained through modules.

**Process:**
1. Processor detects interrupt
2. Processor responds on interrupt acknowledge line
3. Signal passes through daisy chain
4. First requesting module responds
5. Module places **vector** (address/identifier) on data lines
6. Processor uses vector to identify device

**Vector:**
- Address of I/O module or unique identifier
- **Vectored interrupt:** Processor uses vector as pointer to service routine
- Avoids need for general interrupt service routine first

**Advantages:**
- Automatic device identification
- Fast (hardware-based)
- Vectored interrupts efficient

**Disadvantages:**
- Fixed priority (order in chain)
- More complex hardware

#### 3. Bus Arbitration (Vectored)

**Concept:** I/O module must gain control of bus before raising interrupt.

**Process:**
1. I/O module requests bus control
2. Gains bus control
3. Raises interrupt request line
4. Processor detects interrupt
5. Processor responds on interrupt acknowledge
6. Requesting module places vector on data lines

**Advantages:**
- Flexible priority (bus arbitration)
- Vectored interrupts
- Works with bus-based systems

**Disadvantages:**
- Requires bus arbitration
- More complex

#### 4. Software Poll

**Concept:** Processor branches to interrupt service routine that polls each I/O module.

**Process:**
1. Processor detects interrupt
2. Branches to general interrupt service routine
3. Routine polls each I/O module
4. Determines which module caused interrupt
5. Branches to specific device service routine

**Advantages:**
- Simple hardware
- Flexible (software-controlled)
- No special hardware needed

**Disadvantages:**
- **Time consuming:** Must check each module
- Slower than hardware methods
- Higher interrupt latency

**Use:** Systems with many devices, when hardware cost is concern

### Priority Handling

**Problem:** Multiple interrupts may occur simultaneously.

**Solutions:**

1. **Fixed Priority:**
   - Each device has fixed priority
   - Higher priority interrupts lower priority
   - Simple but inflexible

2. **Programmable Priority:**
   - Priority can be changed
   - More flexible
   - Requires priority controller

3. **Nested Interrupts:**
   - Higher priority can interrupt lower priority
   - Requires interrupt masking
   - More complex

**Interrupt Masking:**
- Processor can disable interrupts
- Critical sections protected
- Interrupt enable/disable flags

---

## Direct Memory Access (DMA)

### Why DMA?

**Drawbacks of Programmed and Interrupt-Driven I/O:**

1. **Transfer Rate Limited:**
   - Limited by speed processor can test and service device
   - Processor bottleneck

2. **Processor Tied Up:**
   - Processor involved in managing transfer
   - Multiple instructions per I/O transfer
   - Wastes processor cycles

**Solution:** **Direct Memory Access (DMA)** for large data volumes.

### DMA Concept

**Definition:** I/O module transfers data directly to/from memory without processor involvement.

**Key Points:**
- Processor only involved at **start and end**
- DMA controller handles transfer
- Data bypasses processor
- Very efficient for large transfers

### DMA Block Diagram

**Components:**

1. **Data Count Register:**
   - Number of bytes/words to transfer
   - Decremented during transfer
   - Interrupts when reaches zero

2. **Data Register:**
   - Temporary data storage
   - For some DMA configurations

3. **Address Register:**
   - Memory address for transfer
   - Incremented during transfer

4. **Control Logic:**
   - Manages DMA operation
   - Handles bus requests
   - Coordinates transfer

**Signals:**
- **Request to DMA:** Device requests DMA transfer
- **Acknowledge from DMA:** DMA acknowledges request
- **Read/Write:** Control signals
- **Interrupt:** Signal completion

### DMA Operation

**Process:**

1. **Initialization (Processor):**
   - Processor sets up DMA:
     - Starting memory address
     - Number of bytes to transfer
     - Direction (read/write)
   - Processor issues DMA command

2. **Transfer (DMA Controller):**
   - DMA controller requests bus
   - Gains bus control
   - Transfers data directly:
     - Read from I/O device
     - Write to memory (or vice versa)
   - Increments address, decrements count
   - Continues until complete

3. **Completion (DMA Controller):**
   - DMA controller interrupts processor
   - Signals completion
   - Processor checks status

**Key:** Processor free during entire transfer!

### DMA Breakpoints

**When Can DMA Interrupt?**

**DMA Breakpoints:**
- Can interrupt during instruction cycle
- Typically between:
  - Instruction fetch and decode
  - Operand fetch and execute
  - Execute and store result

**Interrupt Breakpoints:**
- Typically only between instructions
- Must complete current instruction

**DMA More Flexible:**
- Can interrupt during instruction execution
- Steals bus cycles
- Processor may need to wait for DMA

### DMA Configurations

#### 1. Single-Bus, Detached DMA

**Structure:**
```
Processor ──┐
            ├── System Bus ── Memory
DMA ────────┘
I/O ────────┘
```

**Characteristics:**
- DMA on system bus
- Competes with processor for bus
- Bus arbitration needed
- Simple but may cause contention

#### 2. Single-Bus, Integrated DMA-I/O

**Structure:**
```
Processor ──┐
            ├── System Bus ── Memory
DMA+I/O ────┘
```

**Characteristics:**
- DMA integrated with I/O module
- Still on system bus
- More efficient (no separate DMA module)
- Common configuration

#### 3. I/O Bus

**Structure:**
```
Processor ── System Bus ── Memory
                │
            DMA Controller
                │
            I/O Bus ── I/O ── I/O ── I/O
```

**Characteristics:**
- Separate I/O bus
- DMA controller bridges buses
- Reduces system bus load
- More complex but better performance

### Fly-By DMA Controller

**Concept:** Data does **not** pass through DMA chip.

**Characteristics:**
- DMA only between I/O port and memory
- **Not** between two I/O ports
- **Not** between two memory locations
- Data flows directly: I/O ↔ Memory

**Memory-to-Memory:**
- Can do via register
- Less efficient
- Requires two transfers

**Example: Intel 8237:**
- Contains four DMA channels
- Each channel programmed independently
- Any one channel active at a time
- Fly-by operation

### DMA Usage Example

**Intel 8237 DMA Controller:**

**Signals:**
- **DREQ:** DMA request (from device)
- **HRQ:** Hold request (to processor)
- **HLDA:** Hold acknowledge (from processor)
- **DACK:** DMA acknowledge (to device)

**Control Bus Signals:**
- **IOR:** I/O read
- **IOW:** I/O write
- **MEMR:** Memory read
- **MEMW:** Memory write

**Operation:**
1. Device requests DMA (DREQ)
2. DMA requests bus (HRQ)
3. Processor acknowledges (HLDA)
4. DMA transfers data using control signals
5. DMA completes, releases bus

---

## I/O Controllers and Interfaces

### 82C59A Programmable Interrupt Controller (PIC)

**Purpose:** Manage multiple interrupt sources.

**Features:**
- **8 interrupt request lines (IR0-IR7)**
- Priority management
- Interrupt vector generation
- Cascading support

**Cascading:**
- Multiple PICs can be cascaded
- Master PIC connects to processor
- Slave PICs connect to master
- Example: 1 master + 3 slaves = 32 interrupt lines

**Configuration:**
```
Master 82C59A ── Processor (INTR)
    │
    ├── IR0-IR7 (8 devices)
    ├── Slave 82C59A (via IR)
    │   └── IR0-IR7 (8 devices)
    ├── Slave 82C59A (via IR)
    │   └── IR0-IR7 (8 devices)
    └── Slave 82C59A (via IR)
        └── IR0-IR7 (8 devices)
```

**Total:** Up to 64 interrupt sources (with cascading)

### 8255A Programmable Peripheral Interface (PPI)

**Purpose:** Interface to parallel I/O devices.

**Features:**
- **Three 8-bit ports:** Port A, Port B, Port C
- **Port C split:** Upper (PC7-PC4) and Lower (PC3-PC0)
- **Multiple modes:** Input, output, bidirectional
- **Handshaking:** Control signals for device communication

**Ports:**
- **Port A:** 8-bit I/O port (Group A)
- **Port B:** 8-bit I/O port (Group B)
- **Port C:** 8-bit I/O port or control signals

**Modes:**
- **Mode 0:** Basic input/output
- **Mode 1:** Handshaking I/O
- **Mode 2:** Bidirectional bus

**Applications:**
- Keyboard interfaces
- Display interfaces
- Parallel printer interfaces
- General-purpose I/O

**Example: Keyboard/Display Interface**
- Port A: Keyboard input
- Port B: Display output
- Port C: Control signals (data ready, acknowledge)

---

## External Interconnection Standards

### Universal Serial Bus (USB)

**Purpose:** Widely used for peripheral connections.

**Characteristics:**
- **Default interface** for slower speed devices (keyboard, mouse)
- **Commonly used** for high-speed I/O (printers, disk drives, network adapters)
- **Multiple generations:** USB 1.0, 2.0, 3.0, 3.1, 3.2, USB-C
- **Hot-pluggable:** Connect/disconnect without powering down
- **Automatic configuration:** Plug and play

**Advantages:**
- Universal standard
- Easy to use
- Hot-pluggable
- Power delivery (USB-C)

### FireWire Serial Bus

**Purpose:** High-speed I/O for smaller systems.

**Characteristics:**
- Alternative to SCSI for personal computers
- **Daisy chain configuration:** Up to 63 devices
- **Hot plugging:** Connect/disconnect without power down
- **Automatic configuration**
- High I/O rates

**Use Cases:**
- Video capture
- External storage
- Professional audio/video equipment

### SCSI (Small Computer System Interface)

**Purpose:** Standard for connecting peripheral devices.

**Status:**
- **Once common** for disks, modems, printers
- **Lost popularity** to USB and FireWire in smaller systems
- **High-speed versions** remain popular for enterprise systems
- Used in some mainframes

**Characteristics:**
- High performance
- Multiple device support
- More complex than USB

### Thunderbolt

**Purpose:** Fastest peripheral connection technology.

**Characteristics:**
- **Developed by Intel** with Apple collaboration
- **Combines:** Data, video, audio, and power
- **Single high-speed connection**
- Very high data rates

**Applications:**
- Hard drives
- RAID arrays
- Video-capture boxes
- Network interfaces

### InfiniBand

**Purpose:** High-end server market I/O specification.

**Characteristics:**
- **Heavily used** by IBM zEnterprise mainframes
- **Architecture** for data flow among processors and I/O devices
- **Storage area networking:** Popular for SAN
- **Central fabric:** Switches and links
- Very high performance

**Use Cases:**
- Enterprise servers
- Storage area networks
- High-performance computing

### SATA (Serial Advanced Technology Attachment)

**Purpose:** Interface for disk storage systems.

**Characteristics:**
- **Data rates:** Up to 6 Gbps
- **Maximum per device:** 300 Mbps
- **Widely used:** Desktop computers, industrial, embedded
- Replaced parallel ATA (PATA)

**Generations:**
- SATA 1.0: 1.5 Gbps
- SATA 2.0: 3 Gbps
- SATA 3.0: 6 Gbps

### PCI Express

**Purpose:** High-speed bus system for peripherals.

**Characteristics:**
- **Wide variety** of device types and speeds
- **Point-to-point** connections
- **Scalable:** x1, x4, x8, x16 lanes
- Very high bandwidth

**Applications:**
- Graphics cards
- Network adapters
- Storage controllers
- High-speed peripherals

### Ethernet

**Purpose:** Predominant wired networking technology.

**Characteristics:**
- **Data rates:** Up to 100 Gbps
- **Distances:** Few meters to tens of kilometers
- **Widely used:** Local area networks
- **Standard:** IEEE 802.3

**Evolution:**
- 10 Mbps → 100 Mbps → 1 Gbps → 10 Gbps → 100 Gbps

### WiFi

**Purpose:** Predominant wireless Internet access technology.

**Characteristics:**
- **IEEE 802.11** standards
- **Multiple versions:** 802.11a/b/g/n/ac/ax
- **Increasing speeds** with each generation
- **Public hotspots:** Free Internet access

**Evolution:**
- 802.11: 2 Mbps
- 802.11b: 11 Mbps
- 802.11g: 54 Mbps
- 802.11n: 600 Mbps
- 802.11ac: 6.77 Gbps
- 802.11ax (WiFi 6): Higher speeds

---

## Evolution of I/O Function

### Six Stages of Evolution

**1. CPU Direct Control:**
- CPU directly controls peripheral device
- Simplest but least efficient
- CPU tied up during I/O

**2. Controller/I/O Module Added (Programmed I/O):**
- I/O module added
- CPU uses programmed I/O without interrupts
- CPU still waits for I/O
- Better than direct control

**3. Interrupts Employed:**
- Same configuration as stage 2
- But now interrupts are used
- CPU need not wait
- **Increases efficiency**

**4. DMA Added:**
- I/O module given direct access to memory
- Can move block of data without CPU involvement
- CPU only involved at beginning and end
- **Much more efficient** for large transfers

**5. I/O Module as Processor:**
- I/O module enhanced to become processor
- Specialized instruction set for I/O
- Can execute I/O programs
- **Reduces CPU involvement further**

**6. I/O Module with Local Memory:**
- I/O module has local memory
- Computer in its own right
- Large set of I/O devices controlled with minimal CPU involvement
- **Maximum efficiency**

**Trend:** Increasing autonomy of I/O modules, reducing CPU involvement.

---

## Key Concepts Summary

### I/O Module Functions

1. **Control and Timing:** Coordinate traffic flow
2. **Processor Communication:** Commands, data, status
3. **Device Communication:** Device-specific protocols
4. **Data Buffering:** Speed matching
5. **Error Detection:** Detect and report errors

### I/O Techniques

1. **Programmed I/O:** CPU waits, simple but inefficient
2. **Interrupt-Driven I/O:** CPU does other work, more efficient
3. **DMA:** Direct memory access, most efficient for large transfers

### I/O Addressing

1. **Memory-Mapped I/O:** Shared address space, flexible
2. **Isolated I/O:** Separate address spaces, full memory space

### Interrupts

1. **Device Identification:** Multiple lines, daisy chain, bus arbitration, software poll
2. **Priority:** Fixed or programmable, nested interrupts
3. **Processing:** Save state, service interrupt, restore state

### DMA

1. **Purpose:** Direct I/O-to-memory transfer
2. **Operation:** CPU sets up, DMA transfers, CPU notified
3. **Configurations:** Single bus, integrated, I/O bus
4. **Fly-by:** Data doesn't pass through DMA chip

### Evolution

1. **Trend:** Increasing I/O module autonomy
2. **Goal:** Reduce CPU involvement
3. **Result:** Better system efficiency

---

## Practice Problems and Examples

### Problem 1: I/O Technique Selection

**Question:** Which I/O technique is best for:
a) Reading a single byte from keyboard
b) Transferring 1 MB file from disk to memory
c) Checking printer status

**Solution:**
a) **Interrupt-Driven I/O:** Small transfer, device-initiated
b) **DMA:** Large transfer, needs efficiency
c) **Programmed I/O:** Simple status check

### Problem 2: Memory-Mapped I/O Address Space

**Question:** System has 16-bit address bus, uses memory-mapped I/O. If 48 KB memory, how many I/O addresses available?

**Solution:**
```
Total address space: 2^16 = 64 KB
Memory: 48 KB = 48,000 bytes
I/O addresses: 64 KB - 48 KB = 16 KB = 16,384 addresses
```

**Answer:** 16,384 I/O addresses

### Problem 3: DMA Transfer Time

**Question:** DMA transfers 64 KB block. Memory access time 100 ns, I/O device rate 10 MB/s. How long does transfer take?

**Solution:**
```
Data size: 64 KB = 65,536 bytes
I/O device rate: 10 MB/s = 10,000,000 bytes/s

Transfer time = 65,536 / 10,000,000 = 0.0065536 s = 6.55 ms
```

**Answer:** 6.55 ms (CPU free during this time)

### Problem 4: Interrupt Overhead

**Question:** Interrupt service routine takes 50 cycles. System has 1000 interrupts/second. What is interrupt overhead?

**Solution:**
```
Interrupts per second: 1000
Cycles per interrupt: 50
Total cycles per second: 1000 × 50 = 50,000 cycles

If CPU runs at 1 GHz (1,000,000,000 cycles/s):
Overhead = 50,000 / 1,000,000,000 = 0.00005 = 0.005%
```

**Answer:** 0.005% CPU overhead

### Problem 5: Programmed vs. Interrupt-Driven I/O

**Question:** Device transfers 1 byte every 10 ms. Programmed I/O: CPU checks every 1 μs. Interrupt-driven: 100 cycle overhead per interrupt. Which is more efficient?

**Solution:**
```
Programmed I/O:
- Checks every 1 μs
- 10 ms = 10,000 μs
- Number of checks: 10,000
- Wastes 10,000 checks

Interrupt-Driven I/O:
- One interrupt per byte
- 100 cycles overhead
- CPU free for 10 ms - interrupt time
- Much more efficient
```

**Answer:** Interrupt-driven is much more efficient

---

## Study Tips

1. **Understand the Evolution:**
   - Why each technique developed
   - Trade-offs between techniques
   - When to use each

2. **Master DMA Concepts:**
   - How DMA works
   - When DMA is beneficial
   - DMA configurations

3. **Compare Techniques:**
   - Programmed vs. Interrupt vs. DMA
   - Memory-mapped vs. Isolated I/O
   - Different device identification methods

4. **Understand Interrupts:**
   - Interrupt processing flow
   - Device identification
   - Priority handling

5. **Know Standards:**
   - Common I/O standards
   - Their characteristics
   - When each is used

---

## Conclusion

Group 6 (Input/Output Systems & Interfaces) completes the picture of computer communication:

1. **I/O modules** bridge processor/memory and peripherals
2. **Three I/O techniques** provide different efficiency levels
3. **Interrupts** enable asynchronous I/O
4. **DMA** provides maximum efficiency for large transfers
5. **I/O standards** enable device connectivity

Understanding I/O systems is crucial because:
- I/O is often the system bottleneck
- I/O design impacts overall performance
- I/O completes the communication picture
- Modern systems rely heavily on efficient I/O

Master these concepts, and you'll understand how computers communicate with the outside world, completing your understanding of computer architecture!

---

*End of Group 6 Study Guide*

