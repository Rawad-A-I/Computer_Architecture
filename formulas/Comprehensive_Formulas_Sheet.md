# Comprehensive Computer Architecture Formulas Sheet
## All Study Groups (1-6) - Complete Reference

---

## Table of Contents
1. [Group 1: Foundations & Bus Architecture](#group-1-foundations--bus-architecture)
2. [Group 2: CPU Architecture & Pipelining](#group-2-cpu-architecture--pipelining)
3. [Group 3: Instruction Set Architecture (MIPS)](#group-3-instruction-set-architecture-mips)
4. [Group 4: Memory Architecture & Cache](#group-4-memory-architecture--cache)
5. [Group 5: External Memory & Storage](#group-5-external-memory--storage)
6. [Group 6: I/O Systems & Interfaces](#group-6-io-systems--interfaces)
7. [Quick Reference Summary](#quick-reference-summary)

---

## Group 1: Foundations & Bus Architecture

### Address Bus Calculations

**Maximum Addressable Memory:**
```
Addressable Locations = 2^n
Where: n = address bus width (bits)
```

**Example:**
- 20-bit address bus: 2^20 = 1,048,576 locations = 1 MB (if byte-addressable)
- 32-bit address bus: 2^32 = 4,294,967,296 locations = 4 GB

**Memory Capacity:**
```
Memory Capacity = 2^n × Word Size
Where: n = address bus width, Word Size = bytes per location
```

### Data Bus Transfer Rate

**Theoretical Maximum Transfer Rate:**
```
Transfer Rate = Bus Width (bytes) × Bus Frequency (Hz)
```

**Example:**
- 32-bit bus (4 bytes) at 100 MHz
- Transfer rate = 4 bytes × 100,000,000 cycles/s = 400 MB/s

**Time to Transfer Data:**
```
Transfer Time = Data Size / Transfer Rate
```

### Instruction Cycle Timing

**Total Cycle Time:**
```
Total Cycle Time = Fetch Time + Execute Time
```

**With Multiple Memory Accesses:**
```
Total Time = Fetch Time + (Number of Memory Accesses × Memory Access Time)
```

**Example - ADD B, A (3 memory accesses):**
```
Total Time = Fetch + (3 × Memory Access Time)
```

### Interrupt Efficiency

**Instructions Executed During I/O:**
```
Instructions = CPU Speed (instructions/sec) × I/O Time (seconds)
```

**Example:**
- I/O operation: 10 ms
- CPU speed: 1 billion instructions/second
- Instructions = 1,000,000,000 × 0.01 = 10,000,000 instructions

---

## Group 2: CPU Architecture & Pipelining

### Pipeline Clock Cycle

**Critical Constraint:**
```
Pipeline Clock Cycle = max(Stage 1 Time, Stage 2 Time, ..., Stage N Time)
```

**Key Point:** Pipeline clock is limited by the **slowest stage**.

### Pipeline Throughput

**Non-Pipelined:**
```
Throughput = 1 / (Sum of all stage times)
```

**Pipelined:**
```
Throughput = 1 / (Longest stage time)
```

**Example:**
- Stages: 200ps, 100ps, 200ps, 180ps, 150ps
- Non-pipelined: 1 / 830ps = 1.2 × 10^9 instructions/sec
- Pipelined: 1 / 200ps = 5 × 10^9 instructions/sec

### Pipeline Speedup

**Ideal Speedup:**
```
Ideal Speedup = (Sum of stage times) / (Longest stage time)
```

**Maximum Possible Speedup:**
```
Maximum Speedup = Number of Stages
(If all stages are balanced)
```

**Actual Speedup:**
```
Actual Speedup = (Non-pipelined time) / (Pipelined time)
```

**Example:**
- Non-pipelined: 880ps per instruction
- Pipelined: 200ps per instruction (clock cycle)
- Speedup = 880 / 200 = 4.4x

### Effective CPI (Cycles Per Instruction)

**Base CPI:**
```
CPI_base = Base cycles per instruction (without stalls)
```

**With Cache Misses:**
```
CPI_actual = CPI_base + (I-cache miss rate × Miss penalty) + 
             (Load/store fraction × D-cache miss rate × Miss penalty)
```

**With Pipeline Stalls:**
```
CPI_actual = CPI_base + (Stall cycles per instruction)
```

**Average CPI with Hazards:**
```
CPI_actual = CPI_base + (Fraction causing stalls × Stall cycles)
```

**Example:**
- Base CPI = 1
- 20% of instructions cause 1-cycle stalls
- CPI_actual = 1 + 0.2 × 1 = 1.2

### CPU Time

**General Formula:**
```
CPU Time = (CPU execution cycles + Memory stall cycles) × Clock cycle time
```

**With Cache:**
```
CPU Time = (Instructions × CPI_actual) × Clock cycle time
```

**Memory Stall Cycles:**
```
Memory Stall Cycles = (Instructions × I-cache miss rate × Miss penalty) + 
                      (Instructions × Load/store fraction × D-cache miss rate × Miss penalty)
```

**Example:**
- Instructions = 1,000,000
- CPI_base = 2
- I-cache miss rate = 2% = 0.02
- D-cache miss rate = 5% = 0.05
- Load/store fraction = 40% = 0.4
- Miss penalty = 100 cycles
- Clock cycle = 0.25 ns

```
I-cache stalls = 1,000,000 × 0.02 × 100 = 2,000,000 cycles
D-cache stalls = 1,000,000 × 0.4 × 0.05 × 100 = 2,000,000 cycles
Total stalls = 4,000,000 cycles
CPU Time = (1,000,000 × 2 + 4,000,000) × 0.25 ns = 1.5 ms
```

### Branch Prediction Impact

**Average Branch Penalty:**
```
Average Penalty = (Correct predictions × 0) + (Incorrect predictions × Penalty cycles)
```

**Per Instruction:**
```
Average Penalty per Instruction = (Branch fraction × Incorrect prediction rate × Penalty)
```

**Example:**
- 20% branch instructions
- 80% prediction accuracy
- 2-cycle penalty when wrong
- Average penalty = 0.2 × 0.2 × 2 = 0.08 cycles per instruction

---

## Group 3: Instruction Set Architecture (MIPS)

### MIPS Instruction Format Calculations

**R-Format (32 bits total):**
```
┌──────┬─────┬─────┬─────┬──────┬──────┐
│ op   │ rs  │ rt  │ rd  │shamt │funct │
│ 6    │ 5   │ 5   │ 5   │ 5    │ 6    │
└──────┴─────┴─────┴─────┴──────┴──────┘
```

**I-Format (32 bits total):**
```
┌──────┬─────┬─────┬──────────────────┐
│ op   │ rs  │ rt  │ constant/address │
│ 6    │ 5   │ 5   │ 16               │
└──────┴─────┴─────┴──────────────────┘
```

**J-Format (32 bits total):**
```
┌──────┬──────────────────────────────┐
│ op   │ address                      │
│ 6    │ 26                           │
└──────┴──────────────────────────────┘
```

### MIPS Addressing Mode Calculations

**Displacement Addressing:**
```
Effective Address = Register[rs] + offset
Where: offset = 16-bit signed immediate (-32,768 to 32,767)
```

**PC-Relative Addressing (Branches):**
```
Effective Address = PC + 4 + (offset × 4)
Where: offset = 16-bit signed word offset
Range: ±128 KB from PC
```

**Pseudodirect Addressing (Jumps):**
```
Effective Address = (PC[31:28] || address[25:0] || 00)
Where: address = 26-bit jump target (in words)
Range: 256 MB region
```

### Array Indexing

**Byte Offset Calculation:**
```
Offset = Index × Element Size (bytes)
```

**Example:**
- Array index: 5
- Element size: 4 bytes (word)
- Offset = 5 × 4 = 20 bytes

**MIPS Load Instruction:**
```
LW $t0, offset($s3)  # $t0 = A[index]
Where: offset = index × 4
```

### Loading Large Constants

**32-bit Constant Loading:**
```
Step 1: LUI $t0, upper_16_bits    # Load upper 16 bits
Step 2: ORI $t0, $t0, lower_16_bits  # Set lower 16 bits
```

**Example - Load 0x12345678:**
```
LUI $t0, 0x1234       # $t0 = 0x12340000
ORI $t0, $t0, 0x5678  # $t0 = 0x12345678
```

---

## Group 4: Memory Architecture & Cache

### Cache Organization Calculations

**Number of Cache Lines:**
```
Number of Lines = Cache Size / Line Size
```

**Number of Sets (Set-Associative):**
```
Number of Sets = Number of Lines / Associativity (k)
```

**Block Number:**
```
Block Number = Address / Block Size
```

### Address Breakdown Formulas

**Direct-Mapped Cache:**
```
Tag Bits = Total Address Bits - Index Bits - Word Bits
Index Bits = log₂(Number of Lines)
Word Bits = log₂(Line Size)
```

**Fully Associative Cache:**
```
Tag Bits = Total Address Bits - Word Bits
Word Bits = log₂(Line Size)
Index Bits = 0 (none)
```

**Set-Associative Cache (k-way):**
```
Tag Bits = Total Address Bits - Set Bits - Word Bits
Set Bits = log₂(Number of Sets)
Word Bits = log₂(Line Size)
Number of Sets = Number of Lines / k
```

**Verification:**
```
Tag Bits + Index/Set Bits + Word Bits = Total Address Bits
```

### Cache Mapping Formulas

**Direct-Mapped:**
```
Cache Line = (Block Number) mod (Number of Lines)
i = j mod m
Where: i = cache line, j = block number, m = number of lines
```

**Set-Associative:**
```
Set Number = (Block Number) mod (Number of Sets)
Within set: Block can be in ANY of k lines
```

### Cache Performance Formulas

**Average Memory Access Time (AMAT):**
```
AMAT = Hit Time + (Miss Rate × Miss Penalty)
```

**Where:**
- Hit Time: Time to access cache (typically 1-10 cycles)
- Miss Rate: Fraction of accesses that miss (0.0 to 1.0)
- Miss Penalty: Time to handle miss (typically 10-100+ cycles)

**Example:**
- Hit time = 1 cycle
- Miss rate = 5% = 0.05
- Miss penalty = 100 cycles
- AMAT = 1 + 0.05 × 100 = 6 cycles

### Multi-Level Cache AMAT

**Two-Level Cache:**
```
AMAT = L1_Hit_Time + 
       L1_Miss_Rate × (L2_Hit_Time + 
       L2_Miss_Rate × Memory_Access_Time)
```

**Three-Level Cache:**
```
AMAT = L1_Hit_Time + 
       L1_Miss_Rate × (L2_Hit_Time + 
       L2_Miss_Rate × (L3_Hit_Time + 
       L3_Miss_Rate × Memory_Access_Time))
```

**Example:**
- L1: 1 cycle, 2% miss rate
- L2: 10 cycles, 0.5% global miss rate
- Memory: 100 cycles

```
AMAT = 1 + 0.02 × (10 + 0.005 × 100)
     = 1 + 0.02 × (10 + 0.5)
     = 1 + 0.02 × 10.5
     = 1 + 0.21
     = 1.21 cycles
```

### CPU Time with Cache

**Memory Stall Cycles:**
```
Memory Stall Cycles = (Instructions × I-cache miss rate × Miss penalty) + 
                      (Instructions × Load/store fraction × D-cache miss rate × Miss penalty)
```

**Effective CPI:**
```
CPI_actual = CPI_base + (I-cache miss rate × Miss penalty) + 
             (Load/store fraction × D-cache miss rate × Miss penalty)
```

**Example:**
- Base CPI = 3
- I-cache miss rate = 4% = 0.04
- D-cache miss rate = 8% = 0.08
- Load/store fraction = 60% = 0.6
- Miss penalty = 125 cycles

```
CPI_actual = 3 + (0.04 × 125) + (0.6 × 0.08 × 125)
           = 3 + 5 + 6
           = 14 cycles
```

### Cache Hit/Miss Rates

**Hit Rate:**
```
Hit Rate = Hits / Total Accesses
```

**Miss Rate:**
```
Miss Rate = Misses / Total Accesses = 1 - Hit Rate
```

### Comparator Calculations

**Number of Comparators:**
- **Direct-Mapped:** 1 comparator
- **Fully Associative:** Number of Lines comparators
- **Set-Associative:** Associativity (k) comparators

**Comparator Size:**
```
Comparator Size = Tag Bits
```

---

## Group 5: External Memory & Storage

### Disk Performance Formulas

**Total Access Time:**
```
Total Access Time = Seek Time + Rotational Latency + Transfer Time
```

**Average Seek Time:**
```
Average Seek Time ≈ (1/3) × Full Stroke Time
```

**Rotational Latency:**
```
Time per Revolution = 60 / RPM (seconds)
Average Rotational Latency = (1/2) × Time per Revolution
Average Rotational Latency = (1/2) × (60 / RPM) × 1000 (milliseconds)
```

**Example:**
- 7200 RPM disk
- Time per revolution = 60/7200 = 0.00833 s = 8.33 ms
- Average latency = 8.33 / 2 = 4.17 ms

**Transfer Time:**
```
Transfer Time = (Number of Sectors) / (Sectors per Track × RPM / 60)
```

**Or:**
```
Transfer Time = (Data Size) / (Transfer Rate)
```

**Example:**
- 1 sector to transfer
- 200 sectors per track
- 10,000 RPM

```
Time per revolution = 60/10000 = 0.006 s = 6 ms
Time per sector = 6 / 200 = 0.03 ms
```

### Disk Transfer Rate

**Sequential Transfer Rate:**
```
Transfer Rate = (Sectors per Track × Sector Size) / (Time per Revolution)
```

**Example:**
- 200 sectors per track
- 512 bytes per sector
- 10,000 RPM

```
Data per track = 200 × 512 = 102,400 bytes = 100 KB
Time per revolution = 60/10000 = 0.006 s
Transfer rate = 100 KB / 0.006 s = 16.67 MB/s
```

### RAID Capacity Formulas

**RAID 0 (Striping):**
```
Usable Capacity = N × Disk Capacity
Where: N = number of disks
Overhead = 0%
```

**RAID 1 (Mirroring):**
```
Usable Capacity = (N/2) × Disk Capacity
Where: N = number of disks (must be even)
Overhead = 50%
```

**RAID 3, 4, 5 (Parity):**
```
Usable Capacity = (N-1) × Disk Capacity
Where: N = number of disks
Overhead = 1 disk
```

**RAID 6 (Dual Parity):**
```
Usable Capacity = (N-2) × Disk Capacity
Where: N = number of disks
Overhead = 2 disks
```

**Example:**
- RAID 5 with 5 disks, each 1 TB
- Usable capacity = (5-1) × 1 TB = 4 TB

### RAID Performance

**RAID 0 Sequential Read:**
```
Maximum Rate = N × Single Disk Rate
Where: N = number of disks
```

**RAID 1 Read:**
```
Maximum Rate = 2 × Single Disk Rate (can read from either disk)
```

**RAID 5 Read:**
```
Maximum Rate ≈ (N-1) × Single Disk Rate
```

### SSD Performance Considerations

**Write Amplification:**
```
Write Amplification = (Data Written to Flash) / (Data Requested)
```

**Typical Values:** 2-5x (depends on workload)

**Endurance:**
```
Total Writes = (Write Cycles per Cell) × (Number of Cells)
```

**Lifetime Estimation:**
```
Remaining Lifetime = (Remaining Write Cycles) / (Average Writes per Day)
```

---

## Group 6: I/O Systems & Interfaces

### I/O Transfer Time

**Programmed I/O:**
```
Total Time = Setup Time + (Data Size / Device Rate) + Status Check Time
```

**Interrupt-Driven I/O:**
```
Total Time = Setup Time + (Data Size / Device Rate) + Interrupt Overhead
```

**DMA Transfer Time:**
```
DMA Transfer Time = (Data Size) / (Transfer Rate)
CPU Involvement = Setup Time + Completion Interrupt Time
```

**Example:**
- Transfer 64 KB block
- Device rate: 10 MB/s
- Transfer time = 64 KB / 10 MB/s = 0.0064 s = 6.4 ms

### Interrupt Overhead

**Interrupt Overhead:**
```
Interrupt Overhead = (Interrupt Service Time) × (Number of Interrupts)
```

**CPU Overhead Percentage:**
```
CPU Overhead % = (Total Interrupt Cycles / Total CPU Cycles) × 100
```

**Example:**
- Interrupt service routine: 50 cycles
- 1000 interrupts/second
- CPU speed: 1 GHz (1,000,000,000 cycles/s)

```
Total interrupt cycles = 1000 × 50 = 50,000 cycles/s
Overhead = 50,000 / 1,000,000,000 = 0.00005 = 0.005%
```

### I/O Efficiency Comparison

**Programmed I/O Efficiency:**
```
Efficiency = (Useful Work Time) / (Total Time)
Where: Total Time includes waiting/polling time
```

**Interrupt-Driven I/O Efficiency:**
```
Efficiency = (Useful Work Time) / (Total Time)
Where: Total Time = Useful Work + Interrupt Overhead
```

**DMA Efficiency:**
```
Efficiency = (Useful Work Time) / (Total Time)
Where: Total Time = Useful Work + Setup + Completion
```

### Memory-Mapped I/O Address Space

**Total Address Space:**
```
Total Address Space = 2^n
Where: n = address bus width
```

**I/O Address Space:**
```
I/O Address Space = Total Address Space - Memory Address Space
```

**Example:**
- 16-bit address bus: 2^16 = 64 KB total
- Memory: 48 KB
- I/O addresses: 64 KB - 48 KB = 16 KB = 16,384 addresses

### DMA Transfer Efficiency

**CPU Cycles Saved:**
```
CPU Cycles Saved = (Data Size / Word Size) × (Cycles per Word Transfer)
```

**Example:**
- Transfer 1 MB = 1,048,576 bytes
- Word size: 4 bytes
- Cycles per word: 10 cycles

```
Words transferred = 1,048,576 / 4 = 262,144 words
Cycles saved = 262,144 × 10 = 2,621,440 cycles
```

---

## Quick Reference Summary

### Performance Metrics

| Metric | Formula |
|--------|---------|
| **AMAT** | Hit Time + (Miss Rate × Miss Penalty) |
| **CPI** | Base CPI + Stall Cycles per Instruction |
| **CPU Time** | (Instructions × CPI) × Clock Cycle Time |
| **Pipeline Speedup** | Non-pipelined Time / Pipelined Time |
| **Throughput** | 1 / (Longest Stage Time) |

### Cache Formulas

| Calculation | Formula |
|-------------|---------|
| **Lines** | Cache Size / Line Size |
| **Sets** | Lines / Associativity |
| **Tag Bits** | Address Bits - Index/Set Bits - Word Bits |
| **Index Bits** | log₂(Number of Lines) |
| **Set Bits** | log₂(Number of Sets) |
| **Word Bits** | log₂(Line Size) |

### Disk Formulas

| Calculation | Formula |
|-------------|---------|
| **Access Time** | Seek Time + Rotational Latency + Transfer Time |
| **Rotational Latency** | (1/2) × (60 / RPM) × 1000 ms |
| **Transfer Time** | Data Size / Transfer Rate |
| **Transfer Rate** | (Sectors/Track × Sector Size) / Time per Revolution |

### RAID Capacity

| RAID Level | Capacity Formula |
|------------|------------------|
| **RAID 0** | N × Disk Capacity |
| **RAID 1** | (N/2) × Disk Capacity |
| **RAID 5** | (N-1) × Disk Capacity |
| **RAID 6** | (N-2) × Disk Capacity |

### Address Calculations

| Type | Formula |
|------|---------|
| **Addressable Memory** | 2^n locations (n = address bits) |
| **Displacement EA** | Register[rs] + offset |
| **PC-Relative EA** | PC + 4 + (offset × 4) |
| **Array Offset** | Index × Element Size |

---

## Common Calculation Patterns

### Pattern 1: Performance Improvement

**Speedup:**
```
Speedup = Old Time / New Time
```

**Percentage Improvement:**
```
Improvement % = ((Old Time - New Time) / Old Time) × 100
```

### Pattern 2: Average Calculations

**Weighted Average:**
```
Average = Σ(Value × Weight) / Σ(Weights)
```

**Example - Multi-level Cache:**
```
AMAT = (Hit Rate × Hit Time) + (Miss Rate × Miss Time)
```

### Pattern 3: Rate Calculations

**Rate:**
```
Rate = Amount / Time
```

**Time:**
```
Time = Amount / Rate
```

**Amount:**
```
Amount = Rate × Time
```

### Pattern 4: Percentage and Fraction Conversions

**Percentage to Fraction:**
```
Fraction = Percentage / 100
```

**Fraction to Percentage:**
```
Percentage = Fraction × 100
```

**Example:**
- 5% miss rate = 0.05 fraction
- 0.02 fraction = 2% miss rate

---

## Verification Checklist

### After Any Calculation

**✓ Check 1: Units Match**
- Time: seconds, milliseconds, nanoseconds, cycles
- Size: bytes, KB, MB, GB
- Rate: bytes/sec, MB/s, cycles/sec

**✓ Check 2: Reasonableness**
- AMAT should be between hit time and miss penalty
- CPI should be ≥ 1
- Speedup should be ≥ 1
- Hit rate + Miss rate = 1

**✓ Check 3: Bit Totals**
- Tag + Index/Set + Word = Total Address Bits
- Instruction format bits sum to instruction size

**✓ Check 4: Cache Organization**
- Number of Lines = 2^(Index/Set bits)
- Number of Sets = 2^(Set bits)
- Line Size = 2^(Word bits)

---

## Common Mistakes to Avoid

### Mistake 1: Unit Confusion
- **Wrong:** Mixing seconds and milliseconds
- **Correct:** Convert to same units before calculating

### Mistake 2: Miss Rate vs. Hit Rate
- **Wrong:** Using hit rate where miss rate needed
- **Correct:** Miss rate = 1 - Hit rate

### Mistake 3: Cache Address Breakdown
- **Wrong:** Forgetting word offset bits in tag calculation
- **Correct:** Tag = Address Bits - Index/Set Bits - Word Bits

### Mistake 4: Pipeline Speedup
- **Wrong:** Assuming speedup = number of stages always
- **Correct:** Speedup limited by slowest stage

### Mistake 5: RAID Capacity
- **Wrong:** RAID 1 capacity = N × Disk Capacity
- **Correct:** RAID 1 capacity = (N/2) × Disk Capacity (mirroring)

---

**End of Comprehensive Formulas Sheet**
