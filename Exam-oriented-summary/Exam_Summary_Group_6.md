# Group 6: Input/Output Systems & Interfaces - Exam Summary

## Key Exam Topics

### 1. I/O Module Functions (MCQ/Short Answer)
**Five Major Functions:**
1. **Control and Timing:** Coordinate traffic flow
2. **Processor Communication:** Commands, data, status reporting
3. **Device Communication:** Device-specific protocols
4. **Data Buffering:** Speed matching between device and memory
5. **Error Detection:** Detect and report errors (parity, CRC)

**Why Needed:**
- Wide variety of peripherals (different speeds, formats)
- Speed mismatch (peripherals often slower)
- Data format differences
- **Solution:** I/O module acts as translator and buffer

### 2. I/O Techniques (MCQ/Comparison)
**Three Techniques:**

**A. Programmed I/O:**
- Processor directly controls I/O
- **CPU waits** for I/O completion
- **Polling:** Must check status repeatedly
- **Efficiency:** Low (CPU tied up)
- **Use:** Simple devices, small transfers

**B. Interrupt-Driven I/O:**
- I/O module interrupts processor when ready
- **CPU does other work** while waiting
- **Efficiency:** Medium (CPU not waiting)
- **Use:** General I/O, medium transfers

**C. Direct Memory Access (DMA):**
- I/O module transfers data directly to/from memory
- **CPU only involved at start and end**
- **Efficiency:** High (CPU free during transfer)
- **Use:** Large transfers, high-speed devices

**Comparison:**
| Technique | CPU Involvement | Efficiency | Complexity | Best For |
|-----------|----------------|------------|------------|----------|
| Programmed | High (waits) | Low | Simple | Small transfers |
| Interrupt | Medium | Medium | Medium | General I/O |
| DMA | Low (start/end) | High | Complex | Large transfers |

### 3. I/O Mapping and Addressing (MCQ/Comparison)
**Two Modes:**

**Memory-Mapped I/O:**
- I/O and memory share **single address space**
- **No special I/O commands** (use memory instructions)
- **Advantages:** Large instruction set available, flexible
- **Disadvantages:** Reduces memory address space

**Isolated I/O (Port-Mapped):**
- **Separate address spaces** for memory and I/O
- **Special I/O commands** (IN, OUT, Test I/O)
- **Advantages:** Full memory address space
- **Disadvantages:** Limited I/O instructions

**Modern Practice:** Memory-mapped I/O (more common)

### 4. Interrupt-Driven I/O (MCQ/Diagram)
**Interrupt Processing:**
1. Device issues interrupt
2. Processor finishes current instruction
3. Processor saves context (PC, PSW, registers)
4. Processor jumps to interrupt handler
5. Handler processes interrupt
6. Processor restores context
7. Resume interrupted program

**Device Identification Methods:**
1. **Multiple Interrupt Lines:** Separate line per device
2. **Daisy Chain:** Hardware poll, vectored
3. **Bus Arbitration:** Vectored, flexible priority
4. **Software Poll:** Poll each module (slowest)

**Priority Handling:**
- **Fixed Priority:** Each device has fixed priority
- **Programmable Priority:** Can be changed
- **Nested Interrupts:** Higher priority can interrupt lower

### 5. Direct Memory Access (DMA) (MCQ/Diagram)
**DMA Concept:**
- I/O module transfers data directly to/from memory
- **Bypasses CPU** during transfer
- CPU only sets up transfer and handles completion

**DMA Components:**
- **Data Count Register:** Number of bytes to transfer
- **Address Register:** Memory address
- **Control Logic:** Manages transfer

**DMA Operation:**
1. **Initialization:** CPU sets up (address, count, direction)
2. **Transfer:** DMA controller transfers data directly
3. **Completion:** DMA interrupts CPU when done

**DMA Configurations:**
- **Single-Bus, Detached:** DMA on system bus
- **Single-Bus, Integrated:** DMA integrated with I/O module
- **I/O Bus:** Separate I/O bus, DMA bridges buses

**Fly-By DMA:**
- Data does **not** pass through DMA chip
- Direct: I/O ↔ Memory
- **Not:** I/O ↔ I/O or Memory ↔ Memory

### 6. I/O Controllers (MCQ/Short Answer)
**82C59A PIC (Programmable Interrupt Controller):**
- **8 interrupt request lines** (IR0-IR7)
- Priority management
- **Cascading:** Multiple PICs (1 master + slaves = up to 64 interrupts)

**8255A PPI (Programmable Peripheral Interface):**
- **Three 8-bit ports:** Port A, Port B, Port C
- Multiple modes: Input, output, bidirectional, handshaking
- **Use:** Keyboard, display, parallel printer interfaces

### 7. External Interconnection Standards (MCQ/Short Answer)
**USB (Universal Serial Bus):**
- **Default interface** for slower devices (keyboard, mouse)
- **Commonly used** for high-speed I/O
- **Hot-pluggable:** Connect/disconnect without power down
- **Generations:** USB 1.0, 2.0, 3.0, 3.1, 3.2, USB-C

**FireWire:**
- High-speed I/O for smaller systems
- **Daisy chain:** Up to 63 devices
- **Use:** Video capture, external storage

**SATA (Serial ATA):**
- Interface for disk storage
- **Data rates:** Up to 6 Gbps
- **Use:** Desktop computers, industrial, embedded

**PCI Express:**
- High-speed bus system
- **Point-to-point** connections
- **Scalable:** x1, x4, x8, x16 lanes
- **Use:** Graphics cards, network adapters, storage controllers

**Ethernet:**
- Predominant wired networking
- **Data rates:** Up to 100 Gbps
- **Use:** Local area networks

**WiFi:**
- Predominant wireless Internet access
- **IEEE 802.11** standards
- **Multiple versions:** 802.11a/b/g/n/ac/ax

### 8. Evolution of I/O Function (MCQ/Short Answer)
**Six Stages:**
1. **CPU Direct Control:** Simplest, least efficient
2. **Controller/I/O Module (Programmed I/O):** CPU waits
3. **Interrupts Employed:** CPU need not wait
4. **DMA Added:** Direct memory access
5. **I/O Module as Processor:** Specialized I/O processor
6. **I/O Module with Local Memory:** Maximum autonomy

**Trend:** Increasing I/O module autonomy, reducing CPU involvement.

---

## Common Exam Questions

### Calculation Questions:
1. **DMA Transfer Time:** Data size / Transfer rate
2. **Interrupt Overhead:** Interrupts/sec × Cycles/interrupt
3. **Memory-Mapped I/O Address Space:** Total - Memory = I/O addresses

### True/False:
- "DMA transfers data through CPU" → **False** (bypasses CPU)
- "Programmed I/O is most efficient" → **False** (DMA is most efficient)
- "Memory-mapped I/O uses special I/O instructions" → **False** (uses memory instructions)

### MCQ Topics:
- Which I/O technique is most efficient? → **DMA**
- Which device identification method is fastest? → **Multiple interrupt lines**
- What is default interface for keyboard? → **USB**

### Comparison Questions:
- Compare I/O techniques (efficiency, CPU involvement)
- Compare memory-mapped vs. isolated I/O
- Compare device identification methods

### Diagram Questions:
- Draw interrupt processing flow
- Show DMA operation sequence
- Label I/O module structure

---

## Key Formulas

1. **DMA Transfer Time:** Data size (bytes) / Transfer rate (bytes/s)
2. **Interrupt Overhead:** (Interrupts/sec) × (Cycles/interrupt) / CPU_speed
3. **I/O Address Space:** Total addresses - Memory addresses

---

## Critical Definitions

- **Programmed I/O:** CPU directly controls I/O, waits for completion
- **Interrupt-Driven I/O:** I/O module interrupts CPU when ready
- **DMA:** Direct Memory Access - I/O to memory without CPU
- **Memory-Mapped I/O:** I/O and memory share address space
- **Isolated I/O:** Separate address spaces for I/O and memory
- **Vectored Interrupt:** Interrupt includes device identifier
- **Fly-By DMA:** Data doesn't pass through DMA chip

---

## I/O Technique Selection

**Programmed I/O:**
- Simple devices
- Small transfers
- Status checks

**Interrupt-Driven I/O:**
- General I/O operations
- Medium transfers
- Asynchronous events

**DMA:**
- Large transfers (disk, network)
- High-speed devices
- Bulk data movement

---

## Performance Considerations

**Programmed I/O:**
- CPU tied up during I/O
- Wastes CPU cycles
- Simple but inefficient

**Interrupt-Driven I/O:**
- CPU can do other work
- Interrupt overhead
- Better CPU utilization

**DMA:**
- CPU free during transfer
- Only overhead at start/end
- Maximum efficiency for large transfers
