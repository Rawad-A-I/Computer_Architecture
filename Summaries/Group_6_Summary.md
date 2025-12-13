# Group 6: Input/Output Systems & Interfaces - Concise Summary

## Introduction to I/O Systems

### Why I/O Modules are Needed
- **Wide variety of peripherals:** Different methods, formats, speeds
- **Speed mismatch:** Peripherals often slower (or faster) than memory/processor
- **Data format differences:** Different word lengths, need conversion
- **Solution:** I/O module interfaces between processor/memory and peripherals

### I/O Module Purpose
- **Two major functions:**
  1. Interface to processor and memory (via system bus)
  2. Interface to peripheral devices (via data links)
- **Acts as:** Translator and buffer between system and peripherals

## I/O Module Structure and Functions

### Major Functions

#### 1. Control and Timing
- Coordinate flow between internal resources and external devices
- Manage processor-I/O module interactions
- Handle timing of operations, bus arbitration

#### 2. Processor Communication
- **Command Decoding:** Accepts commands from processor
- **Data Exchange:** Bidirectional data transfer
- **Status Reporting:** Reports device status (BUSY, READY)
- **Address Recognition:** Recognizes unique device addresses

#### 3. Device Communication
- Sends commands to device
- Receives status from device
- Handles device-specific protocols
- Abstracts device details from processor

#### 4. Data Buffering
- **Purpose:** Balance speed differences between device and memory
- **From Memory to Device:** Buffer rapid bursts, send at device rate
- **From Device to Memory:** Accumulate slow data, transfer efficiently
- **Speed Matching:** Operates at both device and memory speeds

#### 5. Error Detection
- **Mechanical/Electrical Malfunctions:** Reported by device
- **Transmission Errors:** Detected using parity bits, CRC, checksums
- **Parity Bit:** Even/odd parity for single-bit error detection

### I/O Module Structure
- **Data Registers:** Hold data being transferred
- **Status/Control Registers:** Device status and control information
- **I/O Logic:** Address recognition, command decoding, status reporting
- **Device Interface Logic:** Device-specific communication

## External Devices

### Categories
1. **Human Readable:** Video displays, printers, keyboards, mice
2. **Machine Readable:** Magnetic disk/tape, sensors, actuators
3. **Communication:** Terminals, remote devices, other computers

### Block Diagram Components
- **Transducer:** Converts physical ↔ electrical signals
- **Buffer:** Temporary storage, speed matching
- **Control Logic:** Device control functions, interprets control signals

## I/O Techniques

### Three I/O Techniques

#### 1. Programmed I/O
- **Concept:** Processor directly controls I/O operation
- **Process:** Processor issues command, checks status repeatedly, waits for completion
- **Characteristics:** CPU waits, polling, simple but inefficient
- **Drawbacks:** Processor tied up, wastes CPU cycles
- **Best For:** Simple devices, small transfers

#### 2. Interrupt-Driven I/O
- **Concept:** I/O module interrupts processor when ready
- **Process:** Processor issues command, does other work, handles interrupt when ready
- **Characteristics:** CPU not waiting, asynchronous, more efficient
- **Advantages:** Better CPU utilization, can handle multiple I/O operations
- **Drawbacks:** Still involves processor in each transfer, interrupt overhead
- **Best For:** General I/O, medium transfers

#### 3. Direct Memory Access (DMA)
- **Concept:** I/O module and memory exchange data directly without processor
- **Process:** Processor sets up, DMA transfers block, processor notified at end
- **Characteristics:** Minimal CPU involvement, direct transfer, very efficient
- **Advantages:** Maximum efficiency, CPU free during transfer, best for large transfers
- **Drawbacks:** Most complex, requires DMA controller, bus arbitration needed
- **Best For:** Large transfers, high-speed devices (disk, network)

### Comparison

| Technique | CPU Involvement | Efficiency | Complexity | Best For |
|-----------|----------------|------------|------------|----------|
| **Programmed I/O** | High (waits) | Low | Simple | Simple devices, small transfers |
| **Interrupt-Driven** | Medium (handles interrupts) | Medium | Medium | General I/O, medium transfers |
| **DMA** | Low (start/end only) | High | Complex | Large transfers, high-speed devices |

**Evolution:** Programmed → Interrupt-Driven → DMA (increasing efficiency and complexity)

## I/O Mapping and Addressing

### Two Addressing Modes

#### 1. Memory-Mapped I/O
- **Concept:** I/O devices and memory share single address space
- **Characteristics:** No special commands, uses memory instructions, flexible
- **Advantages:** Large selection of commands, simpler instruction set, flexible addressing
- **Disadvantages:** Reduces memory address space, memory and I/O compete
- **Modern Practice:** Most systems use memory-mapped I/O

#### 2. Isolated I/O (Port-Mapped I/O)
- **Concept:** Separate address spaces for memory and I/O
- **Characteristics:** Special I/O commands (IN, OUT), limited I/O instructions
- **Advantages:** Full memory address space, clear separation
- **Disadvantages:** Limited set of I/O instructions, less flexible

### Comparison

| Aspect | Memory-Mapped I/O | Isolated I/O |
|--------|-------------------|--------------|
| **Address Space** | Shared | Separate |
| **Instructions** | Memory instructions | Special I/O instructions |
| **Flexibility** | High | Lower |
| **Memory Space** | Reduced | Full |

## Interrupt-Driven I/O

### Why Interrupt-Driven I/O?
- **Problem with Programmed I/O:** Processor must wait, wastes time
- **Solution:** Processor issues command, does other work, I/O interrupts when ready

### Simple Interrupt Processing
- **Hardware Steps:** Device issues interrupt, processor finishes instruction, acknowledges, saves PSW/PC
- **Software Steps:** Save process state, process interrupt, restore state, restore PSW/PC

### Design Issues

#### 1. Device Identification
**Four Techniques:**

1. **Multiple Interrupt Lines:**
   - Separate line for each I/O module
   - Simple but limited number of lines

2. **Daisy Chain (Hardware Poll, Vectored):**
   - Interrupt acknowledge daisy-chained
   - First requesting module responds with vector
   - Fast, automatic identification

3. **Bus Arbitration (Vectored):**
   - Module gains bus control, raises interrupt
   - Places vector on data lines
   - Flexible priority, works with bus systems

4. **Software Poll:**
   - General interrupt routine polls each module
   - Simple hardware but time-consuming

#### 2. Priority Handling
- **Fixed Priority:** Each device has fixed priority
- **Programmable Priority:** Priority can be changed
- **Nested Interrupts:** Higher priority can interrupt lower priority
- **Interrupt Masking:** Processor can disable interrupts

## Direct Memory Access (DMA)

### Why DMA?
- **Drawbacks of Programmed/Interrupt-Driven:** Transfer rate limited, processor tied up
- **Solution:** Direct I/O-to-memory transfer without processor involvement

### DMA Concept
- **Definition:** I/O module transfers data directly to/from memory
- **Key Points:** Processor only involved at start and end, DMA controller handles transfer

### DMA Block Diagram Components
- **Data Count Register:** Number of bytes/words to transfer
- **Data Register:** Temporary data storage
- **Address Register:** Memory address for transfer
- **Control Logic:** Manages DMA operation, bus requests

### DMA Operation
1. **Initialization (Processor):** Sets up starting address, count, direction
2. **Transfer (DMA Controller):** Requests bus, transfers data directly, increments address/decrements count
3. **Completion (DMA Controller):** Interrupts processor when complete

### DMA Breakpoints
- **DMA:** Can interrupt during instruction cycle (steals bus cycles)
- **Interrupts:** Typically only between instructions
- **DMA More Flexible:** Can interrupt during execution

### DMA Configurations

#### 1. Single-Bus, Detached DMA
- DMA on system bus, competes with processor
- Simple but may cause contention

#### 2. Single-Bus, Integrated DMA-I/O
- DMA integrated with I/O module
- More efficient, common configuration

#### 3. I/O Bus
- Separate I/O bus, DMA controller bridges buses
- Reduces system bus load, better performance

### Fly-By DMA Controller
- **Concept:** Data does not pass through DMA chip
- **Characteristics:** DMA only between I/O port and memory
- **Not:** Between two I/O ports or two memory locations
- **Memory-to-Memory:** Can do via register (less efficient)

## I/O Controllers and Interfaces

### 82C59A Programmable Interrupt Controller (PIC)
- **Purpose:** Manage multiple interrupt sources
- **Features:** 8 interrupt request lines (IR0-IR7), priority management, interrupt vector generation
- **Cascading:** Multiple PICs can be cascaded (master + slaves)
- **Total:** Up to 64 interrupt sources with cascading

### 8255A Programmable Peripheral Interface (PPI)
- **Purpose:** Interface to parallel I/O devices
- **Features:** Three 8-bit ports (A, B, C), multiple modes, handshaking
- **Modes:** Mode 0 (basic I/O), Mode 1 (handshaking), Mode 2 (bidirectional)
- **Applications:** Keyboard, display, printer interfaces

## External Interconnection Standards

### Universal Serial Bus (USB)
- **Purpose:** Widely used for peripheral connections
- **Characteristics:** Default for slower devices, multiple generations (USB 1.0-3.2, USB-C)
- **Advantages:** Universal standard, hot-pluggable, automatic configuration, power delivery

### FireWire Serial Bus
- **Purpose:** High-speed I/O for smaller systems
- **Characteristics:** Daisy chain (up to 63 devices), hot plugging, automatic configuration
- **Use Cases:** Video capture, external storage, professional audio/video

### SCSI (Small Computer System Interface)
- **Purpose:** Standard for connecting peripheral devices
- **Status:** Lost popularity to USB/FireWire in smaller systems, still used in enterprise
- **Characteristics:** High performance, multiple device support, more complex

### Thunderbolt
- **Purpose:** Fastest peripheral connection technology
- **Characteristics:** Combines data, video, audio, power, very high data rates
- **Applications:** Hard drives, RAID arrays, video-capture, network interfaces

### InfiniBand
- **Purpose:** High-end server market I/O specification
- **Characteristics:** Used by IBM mainframes, storage area networking, very high performance
- **Use Cases:** Enterprise servers, SAN, high-performance computing

### SATA (Serial Advanced Technology Attachment)
- **Purpose:** Interface for disk storage systems
- **Characteristics:** Up to 6 Gbps, widely used, replaced parallel ATA
- **Generations:** SATA 1.0 (1.5 Gbps), 2.0 (3 Gbps), 3.0 (6 Gbps)

### PCI Express
- **Purpose:** High-speed bus system for peripherals
- **Characteristics:** Point-to-point connections, scalable (x1, x4, x8, x16), very high bandwidth
- **Applications:** Graphics cards, network adapters, storage controllers

### Ethernet
- **Purpose:** Predominant wired networking technology
- **Characteristics:** Up to 100 Gbps, distances from meters to kilometers, IEEE 802.3
- **Evolution:** 10 Mbps → 100 Mbps → 1 Gbps → 10 Gbps → 100 Gbps

### WiFi
- **Purpose:** Predominant wireless Internet access technology
- **Characteristics:** IEEE 802.11 standards, multiple versions (a/b/g/n/ac/ax)
- **Evolution:** 2 Mbps → 11 Mbps → 54 Mbps → 600 Mbps → 6.77 Gbps → Higher

## Evolution of I/O Function

### Six Stages of Evolution

1. **CPU Direct Control:** CPU directly controls peripheral (simplest, least efficient)
2. **Controller/I/O Module Added (Programmed I/O):** I/O module added, CPU waits
3. **Interrupts Employed:** Interrupts used, CPU need not wait (increases efficiency)
4. **DMA Added:** Direct memory access, CPU only at start/end (much more efficient)
5. **I/O Module as Processor:** I/O module becomes processor, specialized instruction set
6. **I/O Module with Local Memory:** I/O module has local memory, maximum efficiency

**Trend:** Increasing autonomy of I/O modules, reducing CPU involvement

## Key Takeaways

1. **I/O modules:** Bridge processor/memory and peripherals, handle speed/format differences
2. **I/O module functions:** Control/timing, processor communication, device communication, buffering, error detection
3. **I/O techniques:** Programmed (simple, inefficient), Interrupt-driven (balanced), DMA (efficient for large transfers)
4. **I/O addressing:** Memory-mapped (flexible, shared space) vs. Isolated (separate space)
5. **Interrupts:** Enable asynchronous I/O, device identification (multiple lines, daisy chain, bus arbitration, software poll)
6. **DMA:** Direct I/O-to-memory transfer, processor only at start/end, most efficient for large transfers
7. **DMA configurations:** Single bus (detached/integrated), I/O bus
8. **I/O standards:** USB (universal), FireWire (high-speed), SCSI (enterprise), Thunderbolt (fastest), SATA (disk), PCIe (high-speed), Ethernet/WiFi (networking)
9. **Evolution:** Increasing I/O module autonomy, reducing CPU involvement
10. **Performance:** DMA best for large transfers, interrupts for general I/O, programmed for simple devices

## Performance Considerations

- **Programmed I/O:** Simple but wastes CPU cycles waiting
- **Interrupt-Driven I/O:** Better CPU utilization, interrupt overhead
- **DMA:** Maximum efficiency, CPU free during transfer, best for large blocks
- **Memory-mapped I/O:** Flexible but reduces memory address space
- **Isolated I/O:** Full memory space but limited I/O instructions
- **Device identification:** Hardware methods (daisy chain, bus arbitration) faster than software poll
- **I/O standards:** Choose based on speed, distance, device type requirements
