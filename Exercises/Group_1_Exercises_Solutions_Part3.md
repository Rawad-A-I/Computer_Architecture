# Group 1: Foundations of Computer Architecture
## Comprehensive Exercise Solutions - Part 3

**Chapter 3: Top-Level View of Computer Function and Interconnection**

---

## Table of Contents
1. [Calculation Problem Solutions](#calculation-problem-solutions)
2. [Diagram and Flowchart Solutions](#diagram-and-flowchart-solutions)
3. [Problem-Solving Exercise Solutions](#problem-solving-exercise-solutions)
4. [Conceptual Question Solutions](#conceptual-question-solutions)

---

## Calculation Problem Solutions

### Problem 1: Address Bus and Memory Capacity

**CP 1.1** A computer system has a 24-bit address bus.
- a) What is the maximum number of addressable memory locations?
- b) If each location stores 1 byte, what is the maximum memory capacity in bytes?
- c) Express the capacity in KB, MB, and GB.

**Solution:**

**a) Maximum Number of Addressable Memory Locations:**
- With n-bit address bus, maximum addresses = 2^n
- 24-bit address bus: 2^24 = 16,777,216 locations
- **Answer: 16,777,216 locations**

**b) Maximum Memory Capacity (1 byte per location):**
- Capacity = Number of addresses × Bytes per address
- Capacity = 16,777,216 × 1 = 16,777,216 bytes
- **Answer: 16,777,216 bytes**

**c) Capacity in Different Units:**
- **Kilobytes (KB):** 16,777,216 / 1,024 = 16,384 KB
- **Megabytes (MB):** 16,384 / 1,024 = 16 MB
- **Gigabytes (GB):** 16 / 1,024 = 0.015625 GB ≈ 0.016 GB

**Answer:**
- 16,384 KB
- 16 MB
- 0.016 GB (or 15.625 MB)

---

**CP 1.2** A system has a 20-bit address bus and each memory location stores 2 bytes (16 bits).
- a) How many memory locations can be addressed?
- b) What is the total memory capacity in bytes?
- c) What is the capacity in MB?

**Solution:**

**a) Number of Addressable Memory Locations:**
- 20-bit address bus: 2^20 = 1,048,576 locations
- **Answer: 1,048,576 locations**

**b) Total Memory Capacity in Bytes:**
- Capacity = Number of locations × Bytes per location
- Capacity = 1,048,576 × 2 = 2,097,152 bytes
- **Answer: 2,097,152 bytes**

**c) Capacity in MB:**
- Megabytes = 2,097,152 / (1,024 × 1,024) = 2,097,152 / 1,048,576 = 2 MB
- **Answer: 2 MB**

---

### Problem 2: Data Bus and Transfer Rates

**CP 2.1** A system has a 32-bit data bus operating at 100 MHz.
- a) What is the maximum data transfer rate in bits per second?
- b) What is the transfer rate in bytes per second?
- c) What is the transfer rate in MB/s?

**Solution:**

**a) Transfer Rate in Bits per Second:**
- Bandwidth = Data Bus Width × Clock Frequency
- Bandwidth = 32 bits × 100,000,000 Hz = 3,200,000,000 bits/s
- **Answer: 3,200,000,000 bits/s (3.2 Gbps)**

**b) Transfer Rate in Bytes per Second:**
- Bytes per second = Bits per second / 8
- Bytes per second = 3,200,000,000 / 8 = 400,000,000 bytes/s
- **Answer: 400,000,000 bytes/s**

**c) Transfer Rate in MB/s:**
- MB/s = Bytes per second / 1,000,000
- MB/s = 400,000,000 / 1,000,000 = 400 MB/s
- **Answer: 400 MB/s**

---

**CP 2.2** A 64-bit data bus operates at 2.5 GHz.
- a) Calculate the theoretical maximum transfer rate in GB/s.
- b) If the bus efficiency is 80%, what is the actual transfer rate?

**Solution:**

**a) Theoretical Maximum Transfer Rate:**
- Bandwidth = 64 bits × 2,500,000,000 Hz = 160,000,000,000 bits/s
- In bytes: 160,000,000,000 / 8 = 20,000,000,000 bytes/s
- In GB/s: 20,000,000,000 / 1,000,000,000 = 20 GB/s
- **Answer: 20 GB/s**

**b) Actual Transfer Rate with 80% Efficiency:**
- Actual rate = Theoretical rate × Efficiency
- Actual rate = 20 GB/s × 0.80 = 16 GB/s
- **Answer: 16 GB/s**

---

### Problem 3: Bus Bandwidth

**CP 3.1** Calculate the bus bandwidth for the following configurations:
- a) 16-bit data bus at 50 MHz
- b) 32-bit data bus at 100 MHz
- c) 64-bit data bus at 200 MHz

**Solution:**

**a) 16-bit bus at 50 MHz:**
- Bandwidth = 16 bits × 50,000,000 Hz = 800,000,000 bits/s
- In bytes: 800,000,000 / 8 = 100,000,000 bytes/s
- In MB/s: 100,000,000 / 1,000,000 = 100 MB/s
- **Answer: 100 MB/s**

**b) 32-bit bus at 100 MHz:**
- Bandwidth = 32 bits × 100,000,000 Hz = 3,200,000,000 bits/s
- In bytes: 3,200,000,000 / 8 = 400,000,000 bytes/s
- In MB/s: 400,000,000 / 1,000,000 = 400 MB/s
- **Answer: 400 MB/s**

**c) 64-bit bus at 200 MHz:**
- Bandwidth = 64 bits × 200,000,000 Hz = 12,800,000,000 bits/s
- In bytes: 12,800,000,000 / 8 = 1,600,000,000 bytes/s
- In MB/s: 1,600,000,000 / 1,000,000 = 1,600 MB/s = 1.6 GB/s
- **Answer: 1.6 GB/s**

---

**CP 3.2** A system needs to transfer 1 GB of data. The bus has a 32-bit width and operates at 133 MHz.
- a) What is the bus bandwidth in MB/s?
- b) How long will it take to transfer 1 GB of data (theoretically)?

**Solution:**

**a) Bus Bandwidth:**
- Bandwidth = 32 bits × 133,000,000 Hz = 4,256,000,000 bits/s
- In bytes: 4,256,000,000 / 8 = 532,000,000 bytes/s
- In MB/s: 532,000,000 / 1,000,000 = 532 MB/s
- **Answer: 532 MB/s**

**b) Transfer Time for 1 GB:**
- 1 GB = 1,000,000,000 bytes (using decimal) or 1,024,000,000 bytes (using binary)
- Using decimal: Time = 1,000,000,000 bytes / 532,000,000 bytes/s = 1.88 seconds
- Using binary: Time = 1,024,000,000 bytes / 532,000,000 bytes/s = 1.92 seconds
- **Answer: Approximately 1.9 seconds**

---

### Problem 4: Instruction Cycle Timing

**CP 4.1** An instruction requires:
- Fetch cycle: 2 clock cycles
- Execute cycle: 5 clock cycles
- The system clock is 1 GHz

Calculate:
- a) Time for one complete instruction cycle
- b) Number of instructions that can be executed per second (theoretical)

**Solution:**

**a) Time for One Instruction Cycle:**
- Total cycles per instruction = Fetch cycles + Execute cycles
- Total cycles = 2 + 5 = 7 cycles
- Clock period = 1 / Clock frequency = 1 / 1,000,000,000 = 1 × 10^-9 seconds = 1 ns
- Time per instruction = 7 cycles × 1 ns/cycle = 7 ns
- **Answer: 7 nanoseconds**

**b) Instructions Per Second:**
- Instructions per second = Clock frequency / Cycles per instruction
- Instructions per second = 1,000,000,000 Hz / 7 = 142,857,143 instructions/s
- **Answer: Approximately 142.9 million instructions per second (142.9 MIPS)**

---

**CP 4.2** A program has 1000 instructions. Each instruction takes:
- Fetch: 3 cycles
- Execute: 4 cycles (average)
- Clock frequency: 500 MHz

Calculate:
- a) Total cycles needed
- b) Total execution time in microseconds

**Solution:**

**a) Total Cycles Needed:**
- Cycles per instruction = Fetch + Execute = 3 + 4 = 7 cycles
- Total cycles = Number of instructions × Cycles per instruction
- Total cycles = 1,000 × 7 = 7,000 cycles
- **Answer: 7,000 cycles**

**b) Total Execution Time:**
- Clock period = 1 / 500,000,000 = 2 × 10^-9 seconds = 2 ns
- Total time = Total cycles × Clock period
- Total time = 7,000 × 2 ns = 14,000 ns
- In microseconds: 14,000 ns / 1,000 = 14 μs
- **Answer: 14 microseconds**

---

### Problem 5: Interrupt Overhead

**CP 5.1** An interrupt service routine takes 50 clock cycles to execute. The system clock is 2 GHz.
- a) What is the interrupt processing time in nanoseconds?
- b) If 1000 interrupts occur per second, what percentage of CPU time is spent on interrupts?

**Solution:**

**a) Interrupt Processing Time:**
- Clock period = 1 / 2,000,000,000 = 0.5 × 10^-9 seconds = 0.5 ns
- Interrupt time = 50 cycles × 0.5 ns/cycle = 25 ns
- **Answer: 25 nanoseconds**

**b) Percentage of CPU Time:**
- Time per interrupt = 25 ns
- Total interrupt time per second = 1,000 × 25 ns = 25,000 ns = 25 μs
- Percentage = (Interrupt time / Total time) × 100%
- Percentage = (25 × 10^-6 / 1) × 100% = 0.0025%
- **Answer: 0.0025% of CPU time**

---

**CP 5.2** A system processes interrupts at a rate of 500 per second. Each interrupt handler takes 100 cycles, and the clock is 1 GHz.
- a) Calculate the interrupt overhead in cycles per second.
- b) What percentage of CPU time is used for interrupt processing?

**Solution:**

**a) Interrupt Overhead in Cycles per Second:**
- Cycles per interrupt = 100 cycles
- Interrupts per second = 500
- Total cycles per second = 500 × 100 = 50,000 cycles/s
- **Answer: 50,000 cycles per second**

**b) Percentage of CPU Time:**
- Clock frequency = 1,000,000,000 cycles/s
- Interrupt cycles = 50,000 cycles/s
- Percentage = (50,000 / 1,000,000,000) × 100% = 0.005%
- **Answer: 0.005% of CPU time**

---

## Diagram and Flowchart Solutions

### Diagram 1: Instruction Cycle

**DF 1.1** Draw a flowchart showing the complete instruction cycle including:
- Fetch cycle
- Indirect cycle (if needed)
- Execute cycle
- Interrupt check

**Solution:**

```
                    START
                      │
                      ▼
        ┌─────────────────────────┐
        │   FETCH CYCLE           │
        │   - Place PC on addr bus│
        │   - Read instruction    │
        │   - Load into IR        │
        │   - Increment PC        │
        └─────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────┐
        │  Indirect Addressing?   │
        │      (Check IR)         │
        └─────────────────────────┘
              │              │
            YES              NO
              │              │
              ▼              │
  ┌───────────────────┐      │
  │ INDIRECT CYCLE    │      │
  │ - Read address    │      │
  │   from memory     │      │
  │ - Get effective   │      │
  │   address         │      │
  └───────────────────┘      │
              │              │
              └──────┬───────┘
                     │
                     ▼
        ┌─────────────────────────┐
        │   EXECUTE CYCLE         │
        │   - Decode instruction  │
        │   - Fetch operands      │
        │   - Perform operation   │
        │   - Store results       │
        └─────────────────────────┘
                     │
                     ▼
        ┌─────────────────────────┐
        │   INTERRUPT CHECK       │
        │   - Check for interrupt │
        │     signals             │
        └─────────────────────────┘
              │              │
         Interrupt?          No
              │              │
            YES              │
              │              │
              ▼              │
  ┌───────────────────┐      │
  │ SAVE CONTEXT      │      │
  │ - Save PC         │      │
  │ - Save PSW        │      │
  │ - Save registers  │      │
  └───────────────────┘      │
              │              │
              ▼              │
  ┌───────────────────┐      │
  │ PROCESS INTERRUPT │      │
  │ - Execute handler │      │
  └───────────────────┘      │
              │              │
              ▼              │
  ┌───────────────────┐      │
  │ RESTORE CONTEXT   │      │
  │ - Restore PC      │      │
  │ - Restore PSW     │      │
  │ - Restore registers│     │
  └───────────────────┘      │
              │              │
              └──────┬───────┘
                     │
                     ▼
              More instructions?
                     │
                   YES
                     │
                     └─────┐
                           │
                           ▼
                         END
```

---

**DF 1.2** Draw a state diagram for the instruction cycle with the following states:
- Fetch
- Indirect
- Execute
- Interrupt

**Solution:**

```
                    [START]
                       │
                       ▼
        ┌──────────────────────────┐
        │        FETCH            │
        │  - Read instruction     │
        │  - Load IR, Increment PC│
        └──────────────────────────┘
                 │         │
        Indirect?│         │No
                 │         │
                 ▼         │
        ┌──────────────────────────┐
        │      INDIRECT            │
        │  - Get effective address │
        └──────────────────────────┘
                 │
                 │
                 ▼
        ┌──────────────────────────┐
        │       EXECUTE            │
        │  - Perform operation     │
        └──────────────────────────┘
                 │
        Interrupt?│
                 │
                 ▼
        ┌──────────────────────────┐
        │      INTERRUPT           │
        │  - Save context         │
        │  - Process interrupt    │
        │  - Restore context      │
        └──────────────────────────┘
                 │
                 │
                 ▼
            [Continue to
             next instruction]
```

---

### Diagram 2: Interrupt Processing

**DF 2.1** Draw a flowchart showing what happens when an interrupt occurs.

**Solution:**

```
        Normal Program Execution
                 │
                 ▼
        ┌────────────────────┐
        │ Instruction completes│
        └────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Interrupt signal   │
        │ detected?          │
        └────────────────────┘
           │            │
          YES          NO
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ Complete current │  │
  │ instruction      │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ Disable further  │  │
  │ interrupts       │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ SAVE CONTEXT     │  │
  │ - Push PC to stack│ │
  │ - Push PSW to stack│ │
  │ - Push registers │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ Identify interrupt│ │
  │ source and type  │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ Load interrupt   │  │
  │ handler address │  │
  │ into PC         │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ EXECUTE INTERRUPT │  │
  │ HANDLER          │  │
  │ - Process interrupt│ │
  │ - Perform required│ │
  │   operations      │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ RESTORE CONTEXT  │  │
  │ - Pop registers  │  │
  │ - Pop PSW       │  │
  │ - Pop PC        │  │
  └──────────────────┘  │
           │            │
           ▼            │
  ┌──────────────────┐  │
  │ Re-enable        │  │
  │ interrupts       │  │
  └──────────────────┘  │
           │            │
           ▼            │
    Resume interrupted  │
         program        │
           │            │
           └────────────┘
                 │
                 ▼
        Continue execution
```

---

**DF 2.2** Draw a timeline diagram showing normal execution, I/O operation, interrupt, and return.

**Solution:**

```
Timeline:

CPU Activity:     [Execute Inst 1] [Execute Inst 2] [Execute Inst 3] [Interrupt Handler] [Execute Inst 4] [Execute Inst 5]
                     │                │                │                │                    │                │
                     │                │                │                │                    │                │
I/O Device:          [Idle]           [Start I/O]      [Working...]     [Complete] ──────────┘                [Idle]
                     │                │                │                │                                      │
                     │                │                │                │                                      │
Time:              t=0              t=1              t=2              t=3 (interrupt)                      t=4

Detailed View:

t=0:  CPU executing instruction 1
t=1:  CPU issues I/O command, continues with instruction 2
t=2:  CPU continues with instruction 3 while I/O device works
t=3:  I/O completes, sends interrupt signal
      - CPU completes current instruction
      - Saves context
      - Jumps to interrupt handler
      - Handler processes I/O completion
      - Restores context
t=4:  CPU resumes with instruction 4 (next instruction after interrupt)
t=5:  CPU continues normal execution

Key Points:
- I/O operates in parallel with CPU
- Interrupt occurs asynchronously
- Context is saved/restored transparently
- Program resumes exactly where it left off
```

---

### Diagram 3: System Bus Architecture

**DF 3.1** Draw a block diagram of a computer system showing CPU, Memory, I/O, and buses.

**Solution:**

```
                    ┌─────────────────────────────────────┐
                    │         SYSTEM BUS                  │
                    │                                     │
    ┌───────────────┼───────────────┐                     │
    │               │               │                     │
    ▼               ▼               ▼                     │
┌───────┐      ┌────────┐      ┌─────────┐              │
│       │      │        │      │         │              │
│  CPU  │      │ Memory │      │ I/O     │              │
│       │      │        │      │ Module  │              │
│ ┌───┐ │      │        │      │         │              │
│ │CU │ │      │        │      │ ┌─────┐ │              │
│ └───┘ │      │        │      │ │Device│ │              │
│ ┌───┐ │      │        │      │ └─────┘ │              │
│ │ALU│ │      │        │      │         │              │
│ └───┘ │      │        │      │         │              │
│ ┌───┐ │      │        │      │         │              │
│ │Reg│ │      │        │      │         │              │
│ └───┘ │      │        │      │         │              │
└───────┘      └────────┘      └─────────┘              │
    │               │               │                     │
    └───────────────┼───────────────┘                     │
                    │                                     │
                    └─────────────────────────────────────┘

Bus Components:
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Data Bus    │  │ Address Bus │  │ Control Bus │
│ (Bidirectional)│ (Unidirectional)│ (Mixed)      │
│             │  │             │  │             │
│ Carries:    │  │ Carries:    │  │ Carries:    │
│ - Data      │  │ - Memory    │  │ - Read/Write│
│ - Instructions│ │   addresses│  │ - Interrupt │
│             │  │ - I/O ports │  │ - Clock     │
│             │  │             │  │ - Ready     │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

**DF 3.2** Draw a diagram showing multiple devices on a bus with arbitration.

**Solution:**

```
                    ┌──────────┐
                    │   CPU    │
                    │ (Arbiter)│
                    └────┬─────┘
                         │
                    ┌────┴────┐
                    │   Bus    │
                    │ Arbitration│
                    │  Controller│
                    └────┬─────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌────────┐       ┌────────┐       ┌────────┐
   │ Memory │       │ I/O    │       │ I/O    │
   │ Module │       │ Module │       │ Module │
   │        │       │  1     │       │  2     │
   │        │       │        │       │        │
   │        │       │ ┌────┐ │       │ ┌────┐ │
   │        │       │ │Dev │ │       │ │Dev │ │
   │        │       │ └────┘ │       │ └────┘ │
   └────────┘       └────────┘       └────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                    ┌────┴────┐
                    │         │
                    │  Bus    │
                    │ (Data,   │
                    │ Address, │
                    │ Control) │
                    │         │
                    └─────────┘

Bus Signals:
- BR (Bus Request): From devices to arbiter
- BG (Bus Grant): From arbiter to devices
- Bus Busy: Indicates bus in use
- Priority signals (for priority-based arbitration)
```

---

### Diagram 4: Bus Timing

**DF 4.1** Draw a timing diagram for a synchronous bus read operation.

**Solution:**

```
Clock:        ─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐
                └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─
                T1  T2  T3  T4  T5  T6  T7  T8

Address Bus:   ────[Address]───────────────────
                ────┐     └───────────────────

Control Bus:   
  Read:        ────┐     └───────────────────
  (Active Low)     └─────────────────────────

Data Bus:      ────────────────────[Data]───────
                ────────────────────┐     └────

Ready:         ────────────────────┐     └────
                ────────────────────┐     └────

Timing:
T1: Address placed on address bus
T2: Read signal asserted (goes low)
T3: Memory decodes address
T4: Memory accesses data
T5: Memory places data on data bus
T6: Memory asserts Ready signal
T7: CPU reads data from data bus
T8: Read signal deasserted, operation complete
```

---

**DF 4.2** Draw a timing diagram comparing synchronous and asynchronous bus operations.

**Solution:**

```
SYNCHRONOUS BUS:

Clock:        ─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐
                └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─┘ └─
Address:      ────[Addr]──────────────────────
Read:         ────┐     └──────────────────────
Data:         ────────────────[Data]────────────
                Fixed timing (3 clock cycles)

ASYNCHRONOUS BUS:

Address:      ────[Addr]──────────────────────
Read:         ────┐                         └──
Ready:        ────────────────────┐     └───────
Data:         ────────────────────[Data]───────
                Variable timing (depends on device speed)

Key Differences:
1. Synchronous: Fixed timing, clock-driven
2. Asynchronous: Variable timing, handshaking-driven
3. Synchronous: All devices must match clock speed
4. Asynchronous: Devices can operate at different speeds
```

---

*[Continued in next part with Problem-Solving and Conceptual Solutions...]*

