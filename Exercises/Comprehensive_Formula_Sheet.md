# Comprehensive Formula Sheet
## All Groups - Computer Architecture

**Covering Groups 1-6: Foundations, CPU, ISA, Memory, Storage, and I/O**

---

## Table of Contents
1. [Group 1: Foundations of Computer Architecture](#group-1-foundations-of-computer-architecture)
2. [Group 2: CPU Architecture & Instruction Execution](#group-2-cpu-architecture--instruction-execution)
3. [Group 3: Instruction Set Architecture](#group-3-instruction-set-architecture)
4. [Group 4: Memory Architecture & Hierarchy](#group-4-memory-architecture--hierarchy)
5. [Group 5: External Memory & Storage Systems](#group-5-external-memory--storage-systems)
6. [Group 6: Input/Output Systems & Interfaces](#group-6-inputoutput-systems--interfaces)

---

## Group 1: Foundations of Computer Architecture

### Bus Bandwidth and Transfer Rates

**Bus Bandwidth (Theoretical):**
```
Bandwidth (bits/s) = Data Bus Width (bits) × Clock Frequency (Hz)
Bandwidth (bytes/s) = (Data Bus Width / 8) × Clock Frequency (Hz)
Bandwidth (MB/s) = (Data Bus Width / 8) × Clock Frequency (Hz) / 1,000,000
Bandwidth (GB/s) = (Data Bus Width / 8) × Clock Frequency (Hz) / 1,000,000,000
```

**Actual Bandwidth (with efficiency):**
```
Actual Bandwidth = Theoretical Bandwidth × Efficiency Factor
```

**Example:**
- 64-bit bus at 200 MHz
- Bandwidth = 64 × 200,000,000 = 12,800,000,000 bits/s = 1.6 GB/s

---

### Address Bus and Memory Capacity

**Maximum Addressable Memory:**
```
Maximum Addresses = 2^(Address Bus Width)
Maximum Memory (bytes) = 2^(Address Bus Width) × Bytes per Address
```

**If each address stores 1 byte:**
```
Maximum Memory = 2^(Address Bus Width) bytes
```

**Examples:**
- 20-bit address bus: 2^20 = 1,048,576 addresses = 1 MB
- 24-bit address bus: 2^24 = 16,777,216 addresses = 16 MB
- 32-bit address bus: 2^32 = 4,294,967,296 addresses = 4 GB
- 64-bit address bus: 2^64 = 18,446,744,073,709,551,616 addresses = 16 EB

---

### Instruction Cycle Timing

**Instruction Execution Time:**
```
Time per Instruction = (Fetch Cycles + Execute Cycles) × Clock Period
Clock Period = 1 / Clock Frequency
```

**Instructions Per Second:**
```
Instructions per Second = Clock Frequency / Cycles per Instruction
MIPS = (Instructions per Second) / 1,000,000
```

**Example:**
- Fetch: 2 cycles, Execute: 5 cycles, Clock: 1 GHz
- Time = 7 × (1/1,000,000,000) = 7 ns
- Instructions/s = 1,000,000,000 / 7 = 142.9 MIPS

---

### Interrupt Overhead

**Interrupt Processing Time:**
```
Interrupt Time = Interrupt Cycles × Clock Period
```

**Interrupt Overhead:**
```
Interrupt Cycles per Second = Interrupts per Second × Cycles per Interrupt
Interrupt Overhead (%) = (Interrupt Cycles per Second / Total Cycles per Second) × 100%
```

**Example:**
- 1000 interrupts/s, 200 cycles each, 1 GHz clock
- Overhead = (1000 × 200) / 1,000,000,000 = 0.02%

---

## Group 2: CPU Architecture & Instruction Execution

### Pipeline Performance

**Ideal Pipeline Speedup:**
```
Ideal Speedup = Number of Pipeline Stages
```

**Pipeline Throughput:**
```
Throughput = Clock Frequency / Cycles per Instruction (CPI)
Ideal CPI = 1 (for pipeline with no hazards)
```

**Pipeline Latency:**
```
Latency = Number of Stages × Clock Period
Latency = Number of Stages / Clock Frequency
```

**Example:**
- 5-stage pipeline, 2 GHz clock
- Ideal CPI = 1
- Throughput = 2,000,000,000 instructions/s
- Latency = 5 / 2,000,000,000 = 2.5 ns

---

### Effective CPI with Hazards

**Effective CPI:**
```
Effective CPI = Ideal CPI + Stall Cycles per Instruction
Effective CPI = 1 + (Stall Cycles / Total Instructions)
```

**Stall Cycles:**
```
Stall Cycles = Data Hazard Stalls + Control Hazard Stalls + Structure Hazard Stalls
```

**Example:**
- Ideal CPI = 1.0
- Data hazards: 0.2 stalls/instruction
- Control hazards: 0.1 stalls/instruction
- Effective CPI = 1.0 + 0.2 + 0.1 = 1.3

---

### Pipeline Execution Time

**Total Execution Time:**
```
Time = (Number of Instructions × Effective CPI) / Clock Frequency
Time = Number of Instructions × Effective CPI × Clock Period
```

**Speedup:**
```
Speedup = Time (Non-pipelined) / Time (Pipelined)
Speedup = (Cycles per Instruction × Total Instructions) / (Effective CPI × Total Instructions)
```

**Example:**
- 1000 instructions, Non-pipelined: 5 CPI, Pipelined: 1.3 CPI, 2 GHz clock
- Non-pipelined: 1000 × 5 / 2,000,000,000 = 2.5 μs
- Pipelined: 1000 × 1.3 / 2,000,000,000 = 0.65 μs
- Speedup = 2.5 / 0.65 = 3.85×

---

### Cache Performance Impact on CPI

**Memory Stall Cycles:**
```
Memory Stall Cycles per Instruction = Miss Rate × Miss Penalty
```

**Effective CPI with Cache:**
```
Effective CPI = Base CPI + Memory Stall Cycles per Instruction
Effective CPI = Base CPI + (Instruction Miss Rate × Instruction Miss Penalty) + 
                 (Data Miss Rate × Data Miss Penalty × Memory Access Frequency)
```

**Example:**
- Base CPI = 1.5
- Instruction miss rate = 2%, Miss penalty = 100 cycles
- Data miss rate = 5%, 40% of instructions are loads/stores
- Memory stalls = 0.02 × 100 + 0.40 × 0.05 × 100 = 2 + 2 = 4 cycles
- Effective CPI = 1.5 + 4 = 5.5

---

## Group 3: Instruction Set Architecture

### MIPS Instruction Encoding

**R-Format Instruction:**
```
[6 bits op] [5 bits rs] [5 bits rt] [5 bits rd] [5 bits shamt] [6 bits funct]
Total: 32 bits
```

**I-Format Instruction:**
```
[6 bits op] [5 bits rs] [5 bits rt] [16 bits immediate]
Total: 32 bits
```

**J-Format Instruction:**
```
[6 bits op] [26 bits address]
Total: 32 bits
```

**Jump Target Calculation (J-format):**
```
Jump Target = (PC[31:28] || address || 00)
PC-relative: Target = PC + 4 + (offset × 4)
```

---

### MIPS Address Calculations

**Load/Store Effective Address:**
```
Effective Address = Base Register + Sign-Extended Immediate
```

**Branch Target Address:**
```
Branch Target = PC + 4 + (Sign-Extended Immediate × 4)
Branch Range = ±2^15 instructions = ±128 KB (in instructions)
```

**Example:**
- `lw $t0, 8($s0)` where $s0 = 0x2000
- Effective address = 0x2000 + 8 = 0x2008

---

### Immediate Value Range

**16-bit Signed Immediate:**
```
Range: -32,768 to +32,767 (decimal)
Range: 0x8000 to 0x7FFF (hexadecimal)
```

**26-bit Address (J-format):**
```
Address Range: 0 to 67,108,863
Jump Range: 256 MB region
```

---

## Group 4: Memory Architecture & Hierarchy

### Cache Address Breakdown

**Direct-Mapped Cache:**
```
Block Offset Bits = log₂(Block Size in bytes)
Index Bits = log₂(Number of Cache Blocks)
Tag Bits = Address Bits - Index Bits - Block Offset Bits
```

**Set-Associative Cache:**
```
Block Offset Bits = log₂(Block Size in bytes)
Index Bits = log₂(Number of Sets)
Tag Bits = Address Bits - Index Bits - Block Offset Bits
Number of Sets = Cache Size / (Block Size × Associativity)
```

**Example:**
- 8 KB cache, 32-byte blocks, direct-mapped, 32-bit addresses
- Block offset = log₂(32) = 5 bits
- Number of blocks = 8192 / 32 = 256
- Index = log₂(256) = 8 bits
- Tag = 32 - 8 - 5 = 19 bits

---

### Average Memory Access Time (AMAT)

**Basic AMAT:**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Multi-Level Cache AMAT:**
```
AMAT = L1 Hit Time + L1 Miss Rate × (L2 Hit Time + L2 Miss Rate × Memory Access Time)
```

**Example:**
- L1: 1 cycle, 5% miss rate
- L2: 10 cycles, 20% miss rate (of L1 misses)
- Memory: 100 cycles
- AMAT = 1 + 0.05 × (10 + 0.20 × 100) = 1 + 0.05 × 30 = 2.5 cycles

---

### Cache Performance Metrics

**Hit Rate and Miss Rate:**
```
Hit Rate = Hits / Total Accesses
Miss Rate = Misses / Total Accesses = 1 - Hit Rate
```

**Memory Stall Cycles:**
```
Memory Stall Cycles per Instruction = Miss Rate × Miss Penalty
```

**Effective CPI with Cache:**
```
Effective CPI = Base CPI + Memory Stall Cycles per Instruction
```

**Example:**
- Base CPI = 1.0
- Instruction miss rate = 2%, Miss penalty = 100 cycles
- Data miss rate = 5%, 40% loads/stores, Miss penalty = 100 cycles
- Stalls = 0.02 × 100 + 0.40 × 0.05 × 100 = 2 + 2 = 4 cycles
- Effective CPI = 1.0 + 4 = 5.0

---

### Cache Size Calculations

**Total Cache Size:**
```
Cache Size = Number of Blocks × Block Size
Cache Size = Number of Sets × Associativity × Block Size
```

**Cache Overhead:**
```
Overhead per Block = Tag Bits + Valid Bit + Dirty Bit (if write-back)
Total Overhead = Number of Blocks × Overhead per Block
```

**Example:**
- 64 KB cache, 64-byte blocks, 4-way set-associative
- Number of sets = 65536 / (64 × 4) = 256 sets
- 32-bit addresses: Tag = 32 - log₂(256) - log₂(64) = 32 - 8 - 6 = 18 bits
- Overhead per block = 18 + 1 (valid) + 1 (dirty) = 20 bits
- Total overhead = 256 × 4 × 20 = 20,480 bits = 2.5 KB

---

### Memory Hierarchy Performance

**Average Access Time (Hierarchy):**
```
Average Access Time = Σ (Access Time_i × Probability_i)
```

**Locality Exploitation:**
```
Most accesses go to fast memory (registers, cache)
Average time << Slow memory access time
```

---

## Group 5: External Memory & Storage Systems

### Disk Access Time

**Total Access Time:**
```
Access Time = Seek Time + Rotational Latency + Transfer Time
```

**Average Rotational Latency:**
```
Average Rotational Latency = 1/2 × Rotation Time
Rotation Time = 60 / RPM (seconds)
Average Rotational Latency = 30 / RPM (seconds) = 30,000 / RPM (milliseconds)
```

**Transfer Time:**
```
Transfer Time = Amount of Data / Transfer Rate
Transfer Rate = (Rotation Speed × Data Density) or (Measured MB/s)
```

**Examples:**
- 7200 RPM: Rotation time = 60/7200 = 8.33 ms, Average latency = 4.17 ms
- 10,000 RPM: Rotation time = 60/10000 = 6 ms, Average latency = 3 ms
- Transfer 64 KB at 100 MB/s: Time = 64/100 = 0.64 ms

---

### Disk Performance Calculations

**Complete I/O Time:**
```
Total I/O Time = Seek Time + Rotational Latency + Transfer Time + Overhead
```

**Throughput:**
```
Throughput = Data Transferred / Total Time
IOPS = 1 / Total Access Time (for random access)
```

**Example:**
- Seek: 8 ms, Latency: 4 ms, Transfer 4 KB at 100 MB/s: 0.04 ms
- Total = 8 + 4 + 0.04 = 12.04 ms
- IOPS = 1 / 0.01204 = 83 IOPS

---

### RAID Capacity Calculations

**RAID 0 (Striping):**
```
Usable Capacity = Number of Disks × Disk Capacity
```

**RAID 1 (Mirroring):**
```
Usable Capacity = (Number of Disks / 2) × Disk Capacity
```

**RAID 5 (Distributed Parity):**
```
Usable Capacity = (Number of Disks - 1) × Disk Capacity
```

**RAID 6 (Dual Parity):**
```
Usable Capacity = (Number of Disks - 2) × Disk Capacity
```

**Examples:**
- 4 × 1 TB disks:
  - RAID 0: 4 TB
  - RAID 1: 2 TB
  - RAID 5: 3 TB
  - RAID 6: 2 TB

---

### RAID Performance

**RAID 0 Read Performance:**
```
Read Speed ≈ Number of Disks × Single Disk Speed (theoretical)
```

**RAID 1 Read Performance:**
```
Read Speed ≈ Number of Disks × Single Disk Speed (can read from all)
Write Speed = Single Disk Speed (must write to all)
```

**RAID 5 Read Performance:**
```
Read Speed ≈ (Number of Disks - 1) × Single Disk Speed
Write Speed ≈ (Number of Disks - 1) / Number of Disks × Single Disk Speed
(Parity calculation overhead)
```

---

### Transfer Rate Calculations

**Maximum Transfer Rate (Disk):**
```
Transfer Rate = (RPM / 60) × Sectors per Track × Bytes per Sector
Transfer Rate = Rotation Speed × Data Density
```

**SSD Transfer Rate:**
```
Sequential Read/Write: Given specification (e.g., 500 MB/s)
Random IOPS: IOPS × Block Size = Transfer Rate
```

**Example:**
- 7200 RPM, 500 sectors/track, 512 bytes/sector
- Transfer rate = (7200/60) × 500 × 512 = 30,720,000 bytes/s ≈ 30 MB/s

---

## Group 6: Input/Output Systems & Interfaces

### I/O Technique Performance

**Programmed I/O Time:**
```
Total Time = Setup Time + (Polling Time × Number of Polls) + Transfer Time
CPU Time = Total Time (CPU waiting)
```

**Interrupt-Driven I/O Time:**
```
Total Time = Command Issue Time + Device Operation Time + Interrupt Handler Time
CPU Time = Command Issue Time + Interrupt Handler Time
(CPU can do other work during device operation)
```

**DMA Time:**
```
Total Time = Setup Time + Transfer Time + Completion Interrupt Time
CPU Time = Setup Time + Completion Interrupt Time
Transfer Time = Data Size / Transfer Rate
```

**Example:**
- Transfer 1 MB at 10 MB/s
- Programmed I/O: CPU waits 100 ms
- Interrupt-driven: CPU uses 0.1 ms, device takes 100 ms
- DMA: CPU uses 0.05 ms, transfer takes 100 ms

---

### Interrupt Overhead

**Interrupt Processing:**
```
Interrupt Time = Handler Cycles × Clock Period
Interrupt Overhead = Interrupts per Second × Interrupt Time
CPU Overhead (%) = (Interrupt Overhead / Total CPU Time) × 100%
```

**Example:**
- 1000 interrupts/s, 200 cycles each, 1 GHz clock
- Interrupt time = 200 / 1,000,000,000 = 0.2 μs
- Overhead = 1000 × 0.2 μs = 200 μs/s
- CPU overhead = 200 / 1,000,000 = 0.02%

---

### DMA Performance

**DMA Transfer Time:**
```
DMA Time = Setup Time + (Data Size / Transfer Rate) + Completion Time
CPU Time = Setup Time + Completion Time
```

**DMA Efficiency:**
```
Efficiency Improvement = (Programmed I/O Time - DMA Time) / Programmed I/O Time × 100%
```

**Example:**
- Transfer 10 MB at 100 MB/s
- DMA setup: 50 cycles, Completion: 50 cycles, 2 GHz clock
- Transfer time = 10 / 100 = 0.1 s = 100 ms
- CPU time = (50 + 50) / 2,000,000,000 = 0.05 μs
- Total = 100.00005 ms (CPU overhead negligible)

---

### I/O Throughput

**I/O Bandwidth:**
```
I/O Bandwidth = Data Transferred / Time
Average I/O Bandwidth = Σ (Device Bandwidth × Utilization)
```

**Bus Utilization:**
```
Bus Utilization = I/O Bandwidth / Bus Bandwidth × 100%
```

**Example:**
- Device 1: 10 MB/s, 10% active
- Device 2: 50 MB/s, 5% active
- Average = 10 × 0.10 + 50 × 0.05 = 1 + 2.5 = 3.5 MB/s

---

### Memory-Mapped I/O Address Space

**Address Space Allocation:**
```
Total Address Space = 2^(Address Bus Width)
Available Memory = Total Address Space - I/O Address Space
```

**Example:**
- 32-bit address bus, 256 MB for I/O
- Total = 4 GB
- Available memory = 4 GB - 256 MB = 3.75 GB

---

## General Performance Formulas

### Speedup Calculations

**Speedup:**
```
Speedup = Time (Old) / Time (New)
Speedup = Performance (New) / Performance (Old)
```

**Efficiency:**
```
Efficiency = Speedup / Ideal Speedup × 100%
```

---

### Percentage Calculations

**Performance Improvement:**
```
Improvement (%) = ((New Performance - Old Performance) / Old Performance) × 100%
```

**Overhead Percentage:**
```
Overhead (%) = (Overhead Time / Total Time) × 100%
```

---

### Time Conversions

**Common Conversions:**
```
1 second = 1,000 milliseconds (ms)
1 millisecond = 1,000 microseconds (μs)
1 microsecond = 1,000 nanoseconds (ns)
1 nanosecond = 1,000 picoseconds (ps)
```

**Frequency to Period:**
```
Period (seconds) = 1 / Frequency (Hz)
Period (ns) = 1,000,000,000 / Frequency (Hz)
```

**Examples:**
- 1 GHz = 1,000,000,000 Hz → Period = 1 ns
- 2 GHz = 2,000,000,000 Hz → Period = 0.5 ns
- 100 MHz = 100,000,000 Hz → Period = 10 ns

---

### Data Size Conversions

**Binary (Base 2):**
```
1 KB = 1,024 bytes = 2^10 bytes
1 MB = 1,024 KB = 2^20 bytes
1 GB = 1,024 MB = 2^30 bytes
1 TB = 1,024 GB = 2^40 bytes
```

**Decimal (Base 10):**
```
1 KB = 1,000 bytes = 10^3 bytes
1 MB = 1,000 KB = 10^6 bytes
1 GB = 1,000 MB = 10^9 bytes
1 TB = 1,000 GB = 10^12 bytes
```

**Note:** Storage devices often use decimal, memory often uses binary.

---

## Quick Reference: Common Values

### Typical Clock Frequencies
- CPU: 1-5 GHz
- System Bus: 100-400 MHz
- Memory Bus: 200-800 MHz
- I/O Bus: 33-133 MHz

### Typical Access Times
- CPU Registers: < 1 ns
- L1 Cache: 1-2 ns
- L2 Cache: 5-20 ns
- Main Memory (DRAM): 50-100 ns
- SSD: 0.1-1 ms
- HDD: 5-15 ms

### Typical Transfer Rates
- CPU-Memory Bus: 10-50 GB/s
- PCIe 3.0 x16: 16 GB/s
- SATA 3.0: 6 GB/s
- USB 3.0: 5 Gbps
- Ethernet (Gigabit): 1 Gbps
- WiFi (802.11ac): 1.3 Gbps

### Typical Capacities
- CPU Registers: ~100 bytes
- L1 Cache: 8-64 KB
- L2 Cache: 256 KB - 8 MB
- Main Memory: 4-64 GB
- SSD: 128 GB - 4 TB
- HDD: 500 GB - 20 TB

---

## Formula Summary by Topic

### Performance
- **Speedup** = Old Time / New Time
- **Efficiency** = Actual Speedup / Ideal Speedup
- **Throughput** = Work / Time
- **Latency** = Time to Complete One Operation

### Memory
- **Capacity** = 2^(Address Bits) × Bytes per Address
- **AMAT** = Hit Time + (Miss Rate × Miss Penalty)
- **Hit Rate** = Hits / Total Accesses
- **Miss Rate** = 1 - Hit Rate

### CPU
- **CPI** = Cycles / Instructions
- **Execution Time** = Instructions × CPI / Frequency
- **MIPS** = Frequency / (CPI × 1,000,000)

### Storage
- **Access Time** = Seek + Latency + Transfer
- **IOPS** = 1 / Access Time
- **Transfer Time** = Size / Rate

### I/O
- **AMAT (I/O)** = Setup + Transfer + Completion
- **Overhead** = Overhead Time / Total Time
- **Bandwidth** = Data / Time

---

*End of Comprehensive Formula Sheet*

