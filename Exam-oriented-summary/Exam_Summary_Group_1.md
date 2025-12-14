# Group 1: Foundations of Computer Architecture - Exam Summary

## Key Exam Topics

### 1. Computer Components (MCQ/Short Answer)
**Four Essential Components:**
- **CPU:** Control Unit (CU) + Arithmetic Logic Unit (ALU) + Registers
- **Main Memory:** Stores instructions and data (volatile)
- **I/O Modules:** Interface between computer and external devices
- **System Interconnection:** Bus (communication pathway)

**Key Point:** All components communicate via system bus.

### 2. Instruction Cycle (Diagram/Short Answer)
**Two Main Phases:**
1. **Fetch Cycle:**
   - PC → MAR
   - Read instruction from memory
   - MBR → IR
   - Increment PC

2. **Execute Cycle:**
   - Processor-Memory (read/write)
   - Data Processing (arithmetic/logical)
   - Control (branches/jumps)
   - Processor-I/O

**Important:** Execute cycle may require multiple memory accesses (e.g., ADD B,A needs 3 accesses: read A, read B, write A).

### 3. Interrupts (MCQ/True-False/Calculation)
**Four Classes:**
1. **Program:** Overflow, division by zero, illegal instruction
2. **Timer:** Pre-emptive multitasking, time slicing
3. **I/O:** Device ready, device error, data available
4. **Hardware Failure:** Power failure, memory parity error

**Interrupt Cycle Added to Instruction Cycle:**
```
FETCH → EXECUTE → [INTERRUPT CHECK] → FETCH
```

**Efficiency Calculation:**
- I/O operation: 10 ms
- CPU: 1 billion instructions/second
- Instructions during I/O: 10,000,000 instructions
- **Without interrupts:** CPU waits (0 instructions)

### 4. Bus Types (MCQ/Short Answer)
**Three Types:**
1. **Data Bus:** Bidirectional, width determines transfer size
   - 8-bit = 1 byte/cycle
   - 32-bit = 4 bytes/cycle
   - 64-bit = 8 bytes/cycle

2. **Address Bus:** Unidirectional (CPU → Memory/I/O)
   - n-bit address bus = 2^n addressable locations
   - 16-bit = 64 KB
   - 32-bit = 4 GB

3. **Control Bus:** Control and timing signals
   - Memory Read/Write
   - I/O Read/Write
   - Interrupt Request/Acknowledge
   - Bus Request/Grant

**Calculation Example:**
- 20-bit address bus → 2^20 = 1,048,576 locations = 1 MB
- 32-bit data bus @ 100 MHz → 4 bytes × 100M = 400 MB/s

### 5. Bus Architecture (MCQ/Comparison)
**Dedicated vs. Multiplexed:**
- **Dedicated:** Separate lines for address/data (better performance, more expensive)
- **Multiplexed:** Shared lines (lower cost, lower performance, requires 2 cycles)

**Synchronous vs. Asynchronous:**
- **Synchronous:** Clock-based, simple, limited by slowest device
- **Asynchronous:** Handshaking (REQ/ACK), flexible, more complex

**Bus Arbitration:**
- **Centralized:** Single arbiter (simple, single point of failure)
- **Distributed:** Each device has logic (no single point of failure, more complex)

### 6. Modern Interconnects (MCQ/Short Answer)
**QPI (Quick Path Interconnect):**
- Point-to-point (no arbitration)
- Layers: Physical (Phit), Link (Flit), Routing, Protocol
- 20 data lanes per direction

**PCIe (PCI Express):**
- Point-to-point, replaces PCI bus
- Configurable lanes: x1, x4, x8, x16
- 128-bit processing, 130-bit encoding

### 7. DMA Fundamentals (Short Answer)
**Concept:** I/O modules exchange data directly with memory, bypassing CPU.

**Benefits:**
- CPU not tied up during transfer
- Faster for large transfers
- Better overall performance

---

## Common Exam Questions

### Calculation Questions:
1. **Address Bus:** "20-bit address bus → ? MB capacity"
2. **Data Transfer Rate:** "32-bit bus @ 100 MHz → ? MB/s"
3. **Interrupt Efficiency:** "I/O takes 10ms, CPU @ 1GHz → ? instructions during I/O"

### True/False:
- "Data bus is unidirectional" → **False** (bidirectional)
- "Address bus width determines memory capacity" → **True**
- "All instructions require same number of memory accesses" → **False**

### MCQ Topics:
- Which component generates control signals? → **Control Unit**
- What happens first in instruction cycle? → **Fetch**
- Which interrupt class handles multitasking? → **Timer**

### Diagram Questions:
- Draw instruction cycle state diagram
- Label bus types in system diagram
- Show interrupt cycle flow

---

## Key Formulas

1. **Memory Capacity:** 2^n locations (n = address bus width)
2. **Transfer Rate:** Bus width (bytes) × Frequency (Hz)
3. **Interrupt Efficiency:** CPU speed × I/O time = instructions executed

---

## Critical Definitions

- **Program:** Sequence of instructions generating control signals
- **Bus:** Communication pathway connecting devices
- **Interrupt:** Mechanism to interrupt normal instruction execution
- **DMA:** Direct Memory Access - I/O to memory without CPU
