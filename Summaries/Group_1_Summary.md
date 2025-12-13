# Group 1: Foundations of Computer Architecture - Concise Summary

## Core Concepts

### Programmable Hardware
- **Key Principle:** Modern computers use programmable hardware (same hardware, different programs) rather than hardwired systems
- **Program:** Sequence of instructions that generate control signals
- **Control Unit:** Translates instruction codes (opcodes) into control signals

### Four Essential Components
1. **CPU:** Control Unit (CU) + Arithmetic Logic Unit (ALU) + Registers
2. **Main Memory:** Stores instructions and data (volatile, addressable locations)
3. **I/O Modules:** Interface between computer and external devices
4. **System Interconnection:** Bus connecting all components

## Instruction Cycle

### Two-Phase Cycle
1. **Fetch Cycle:**
   - Read Program Counter (PC)
   - Fetch instruction from memory
   - Increment PC
   - Load instruction into Instruction Register (IR)

2. **Execute Cycle:**
   - **Processor-Memory:** Data transfer CPU ↔ Memory
   - **Data Processing:** Arithmetic/logical operations
   - **Control:** Alter instruction sequence (jumps, branches)
   - **Processor-I/O:** Data transfer CPU ↔ I/O

**Note:** Execute cycle may require multiple memory accesses (e.g., `ADD B, A` needs 3 accesses: 2 reads, 1 write)

## Interrupts

### Purpose
- Improve efficiency (CPU doesn't wait for slow I/O)
- Error handling
- Real-time response

### Classes
1. **Program:** Overflow, division by zero, illegal instruction
2. **Timer:** Pre-emptive multitasking, time slicing
3. **I/O:** Device ready, device error, data available
4. **Hardware Failure:** Power failure, memory parity error

### Interrupt Cycle
- Added to instruction cycle: `FETCH → EXECUTE → [INTERRUPT CHECK]`
- Process: Save context → Jump to handler → Process interrupt → Restore context → Resume

### Multiple Interrupts
- **Disable Strategy:** Process one at a time
- **Priority-Based:** Nested interrupts (high priority can interrupt low priority)

## System Interconnection: The Bus

### Three Types of Buses
1. **Data Bus:**
   - Bidirectional (data flows both ways)
   - Width determines transfer size (8/16/32/64 bits)
   - Carries both data and instructions (no distinction at bus level)

2. **Address Bus:**
   - Unidirectional (CPU → Memory/I/O)
   - Width determines memory capacity: n bits = 2^n locations
   - Example: 32-bit = 4 GB addressable

3. **Control Bus:**
   - Carries control/timing signals
   - Signals: Memory Read/Write, I/O Read/Write, Interrupt Request/Acknowledge, Clock, Reset

## Bus Architecture and Design

### Single Bus Problems
- Propagation delays
- Bus contention
- Bandwidth limitations

### Solutions: Multiple Buses
- **Traditional:** System Bus (CPU/Cache) → Memory Bus → Expansion Bus (I/O)
- **High Performance:** Local Bus (CPU/Cache) → System Bus (Memory) → Expansion Bus (I/O)

### Bus Types
- **Dedicated:** Separate lines for address/data (better performance, more expensive)
- **Multiplexed:** Shared lines (fewer wires, lower cost, requires two cycles)

### Bus Arbitration
- **Problem:** Multiple devices want bus simultaneously
- **Centralized:** Single arbiter controls access (simple, single point of failure)
- **Distributed:** Each device has arbitration logic (scalable, more complex)

### Bus Timing
- **Synchronous:** Clock-based, predictable, limited by slowest device
- **Asynchronous:** Handshaking (REQ/ACK), flexible, works with different speeds

### Direct Memory Access (DMA)
- I/O modules exchange data directly with memory, bypassing CPU
- CPU grants DMA authority, then does other work
- I/O notifies CPU when complete (interrupt)

## Modern Interconnect Technologies

### Evolution: Bus → Point-to-Point
**Why?** Electrical constraints, synchronization issues, multicore challenges

**Advantages:** Lower latency, higher data rates, better scalability, no arbitration overhead

### Quick Path Interconnect (QPI)
- **Layers:**
  1. **Physical:** 20-bit Phit, differential signaling
  2. **Link:** 80-bit Flit (72-bit payload + 8-bit CRC), flow control, error control
  3. **Routing:** Packet path determination
  4. **Protocol:** Cache coherency, packet exchange

### PCI Express (PCIe)
- **Layers:**
  1. **Physical:** Bidirectional lanes (1/4/8/16/32), 130-bit encoding
  2. **Data Link:** DLLP, flow control, ACK/NAK
  3. **Transaction:** TLP, split transactions, 32/64-bit addressing

## Key Takeaways

1. **Programmable hardware** enables flexibility (same hardware, different programs)
2. **Instruction cycle** repeats: Fetch → Execute → Interrupt Check
3. **Interrupts** improve efficiency by allowing CPU to work while I/O operates
4. **Three buses:** Data (bidirectional), Address (unidirectional), Control (signals)
5. **Bus design trade-offs:** Dedicated vs. Multiplexed, Synchronous vs. Asynchronous
6. **Modern systems** use point-to-point interconnects (QPI, PCIe) instead of shared buses

## Performance Considerations

- **Address Bus Width:** Determines maximum memory capacity
- **Data Bus Width:** Affects transfer rate (wider = faster)
- **Interrupts:** Enable CPU efficiency during I/O operations
- **Multiple Buses:** Reduce contention and improve performance
- **Point-to-Point:** Eliminates bus bottlenecks in modern systems
