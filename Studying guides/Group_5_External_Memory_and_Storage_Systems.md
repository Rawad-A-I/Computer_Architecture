# Group 5: External Memory & Storage Systems
## Detailed Study Guide

**Chapter 7: External Memory**

---

## Table of Contents
1. [Introduction to External Memory](#introduction-to-external-memory)
2. [Magnetic Disk Fundamentals](#magnetic-disk-fundamentals)
3. [Disk Organization and Formatting](#disk-organization-and-formatting)
4. [Disk Performance Parameters](#disk-performance-parameters)
5. [RAID Systems](#raid-systems)
6. [Solid State Drives (SSDs)](#solid-state-drives-ssds)
7. [Optical Storage](#optical-storage)
8. [Magnetic Tape](#magnetic-tape)
9. [Storage System Comparison](#storage-system-comparison)
10. [Key Concepts Summary](#key-concepts-summary)
11. [Practice Problems and Examples](#practice-problems-and-examples)

---

## Introduction to External Memory

### Purpose of External Memory

**Primary Functions:**
1. **File Storage:**
   - Programs
   - Data files
   - System settings
   - User documents

2. **Virtual Memory:**
   - Extension of main memory
   - Swap space for processes
   - Allows larger programs than physical RAM

3. **Backup and Archive:**
   - Long-term data preservation
   - Disaster recovery
   - Historical data storage

### Storage System Characteristics

**Performance Metrics:**

1. **Throughput:**
   - Data transfer rate (MB/s, GB/s)
   - Improving, but **not as quickly as processor speed**
   - Often the system bottleneck

2. **Latency:**
   - Access time (time to first byte)
   - Improving but **very slowly**
   - Critical for random access performance

**Reliability:**
- Data integrity
- Error rates
- Mean time between failures (MTBF)
- Data recovery capabilities

**Diversity:**
- **Magnetic disks:** Hard disk drives (HDDs)
- **Optical disks:** CD, DVD, Blu-ray
- **Magnetic tape:** Backup and archive
- **Solid state drives (SSDs):** Flash-based storage

### Storage Hierarchy Context

**External Memory in the Hierarchy:**
```
CPU Registers (fastest, smallest)
    ↓
Cache Memory
    ↓
Main Memory (DRAM)
    ↓
External Memory (HDD, SSD, Optical, Tape) ← We are here
```

**Characteristics:**
- **Largest capacity:** Terabytes to petabytes
- **Slowest access:** Milliseconds to seconds
- **Cheapest per bit:** Very low cost
- **Non-volatile:** Data persists without power

---

## Magnetic Disk Fundamentals

### What is a Magnetic Disk?

**Definition:** Storage device using magnetic recording on rotating platters.

**Examples:**
- **Hard disk drive (HDD):** Primary storage in computers
- **Floppy disk:** Historical, now obsolete

### Physical Structure

**Components:**

1. **Platter:**
   - Circular disk
   - Constructed of **nonmagnetic material** (substrate)
   - Coated with **magnetizable material**

2. **Substrate Material:**
   - **Historical:** Aluminium
   - **Modern:** Glass
   - **Why glass?**
     - Better uniformity of magnetic film surface
     - Fewer surface defects (reduces read-write errors)
     - Better stiffness (reduces disk dynamics)
     - Greater shock resistance

3. **Read/Write Head:**
   - Conductive coil called a **head**
   - May be single read/write head or separate ones
   - During operation: **Head is stationary, platter rotates**

### Magnetic Read and Write Mechanisms

#### Write Operation

**Process:**
1. Current flows through coil
2. Produces magnetic field
3. Pulses sent to head
4. Magnetic pattern recorded on surface below head

**Principle:** Electrical current → Magnetic field → Magnetic pattern on disk

#### Read Operation

**Traditional Method:**
- Magnetic field moving relative to coil produces current
- Same coil used for read and write
- Inductive reading

**Contemporary Method (MR - Magneto Resistive):**
- **Separate read head** (close to write head)
- **Partially shielded magneto resistive (MR) sensor**
- **Electrical resistance depends on direction of magnetic field**
- **High frequency operation**
- More sensitive, better performance

**Principle:** Magnetic pattern → Electrical signal → Data read

### Disk Geometry

**Basic Structure:**
- **Tracks:** Concentric rings on platter surface
- **Sectors:** Divisions of tracks
- **Cylinders:** Same track position across all platters
- **Blocks:** Minimum unit of data transfer (typically one sector)

**Key Points:**
- Tracks are **concentric circles** (not spiral)
- Gaps between tracks prevent interference
- Same number of bits per track (variable packing density)
- Minimum block size = one sector

---

## Disk Organization and Formatting

### Track Organization

**Tracks:**
- **Concentric rings** on disk surface
- **Gaps between tracks:**
  - Prevent errors from head misalignment
  - Prevent interference between magnetic fields
  - Can reduce gap to increase capacity (but increases error risk)

**Variable Packing Density:**
- Same number of bits per track
- Outer tracks: Bits more spread out (lower density)
- Inner tracks: Bits closer together (higher density)

### Sector Organization

**Sectors:**
- Tracks divided into **sectors**
- **Minimum block size** = one sector
- Typical sector sizes: 512 bytes, 4 KB

**Sector Addressing:**
- Each sector has unique address
- Format: (Cylinder, Head, Sector) or logical block addressing (LBA)

### Disk Velocity and Data Density

#### The Problem

**Physical Reality:**
- Disk rotates at **constant angular velocity**
- **Outer tracks:** Longer circumference → bits pass head faster
- **Inner tracks:** Shorter circumference → bits pass head slower

**Challenge:** Read all data bits at the same rate despite varying linear speed

#### Solutions

**1. Constant Angular Velocity (CAV)**

**Method:**
- Rotate disk at constant angular velocity
- **Pie-shaped sectors** and concentric tracks
- Individual tracks and sectors addressable
- Move head to track, wait for sector

**Characteristics:**
- **Waste of space on outer tracks:**
  - Outer tracks have more physical space
  - But store same number of bits as inner tracks
  - Lower data density on outer tracks

**Advantages:**
- Simple addressing
- Easy to implement
- Predictable access

**Disadvantages:**
- Inefficient use of disk space
- Lower overall capacity

**2. Zoned Bit Recording (ZBR)**

**Method:**
- Surface divided into **concentric zones**
- Each zone contains contiguous tracks
- **Within a zone:** Number of bits per track is constant
- **Between zones:** Outer zones have more bits per track

**Characteristics:**
- Zones farther from center contain **more bits** (more sectors)
- Example:
  - Innermost zones: 2 tracks, 9 sectors each
  - Middle zones: 3 tracks, 12 sectors each
  - Outermost zones: 4 tracks, 16 sectors each

**Advantages:**
- **Better capacity utilization**
- Higher data density
- More efficient use of disk space

**Disadvantages:**
- **More complex circuitry**
- Variable sectors per track
- More complex addressing

**Modern Practice:** Most modern disks use **zoned bit recording** for better capacity.

### Disk Formatting

**Purpose:** Prepare disk for use by marking tracks and sectors.

**Format Information:**
- Additional information not available to user
- Marks start of tracks and sectors
- Includes:
  - **Gap:** Space between sectors
  - **Sync field:** Synchronization information
  - **Address field:** Sector address
  - **Data field:** Actual data
  - **Error detection:** CRC or checksum

**Low-Level Formatting:**
- Physical formatting of disk
- Creates track and sector structure
- Done at factory

**High-Level Formatting:**
- Logical formatting
- Creates file system
- Done by operating system

### Physical Characteristics

#### Head Configuration

**1. Fixed-Head Disk:**
- **One read-write head per track**
- Heads mounted on fixed rigid arm
- Arm extends across all tracks
- **No seek time** (head always at correct track)
- **Expensive** (many heads needed)
- **Fast access** (no head movement)

**2. Moveable-Head Disk:**
- **One read-write head per side**
- Mounted on **movable arm**
- Arm can be extended or retracted
- **Seek time required** (head must move to track)
- **Cheaper** (fewer heads)
- **Slower access** (head movement needed)

**Modern Practice:** Almost all disks use **moveable-head** configuration.

#### Removability

**1. Non-Removable Disk:**
- Permanently mounted in disk drive
- Example: Hard disk in personal computer
- **Advantages:**
  - Better performance (no mechanical connection issues)
  - More reliable
  - Higher capacity

**2. Removable Disk:**
- Can be removed and replaced
- Example: Floppy disks (historical)
- **Advantages:**
  - Unlimited storage capacity (by swapping disks)
  - Easy data transfer between systems
  - Portability

**Modern Practice:** Most disks are **non-removable** for better performance and reliability.

#### Sidedness

**Double-Sided Disk:**
- Magnetizable coating on **both sides** of platter
- Two surfaces per platter
- Doubles capacity per platter

**Modern Practice:** All modern disks are **double-sided**.

---

## Disk Performance Parameters

### Access Time Components

**To read or write:**
1. Head must be positioned at desired **track**
2. Head must wait for desired **sector** to rotate under it

**Total Access Time = Seek Time + Rotational Latency**

#### 1. Seek Time

**Definition:** Time to move head to correct track.

**Factors:**
- **Distance:** How far head must travel
- **Speed:** How fast head moves
- **Acceleration/Deceleration:** Head must accelerate, then decelerate

**Typical Values:**
- **Average seek time:** 3-15 ms
- **Track-to-track:** 0.5-2 ms
- **Full stroke:** 10-25 ms

**Calculation:**
- **Average seek time:** Time to move from random track to random track
- Typically: 1/3 of full stroke time

#### 2. Rotational Latency (Rotational Delay)

**Definition:** Time waiting for desired sector to rotate under head.

**Factors:**
- **Disk rotation speed:** RPM (revolutions per minute)
- **Sector position:** Where sector is relative to head

**Calculation:**
- **Average rotational latency:** Time for half rotation
- Formula: `Average latency = (1/2) × (60 seconds / RPM) × 1000 ms`

**Typical Values:**
- 5400 RPM: 5.56 ms average
- 7200 RPM: 4.17 ms average
- 10000 RPM: 3.00 ms average
- 15000 RPM: 2.00 ms average

**Example:**
```
7200 RPM disk:
Time per revolution = 60/7200 = 0.00833 seconds = 8.33 ms
Average latency = 8.33 / 2 = 4.17 ms
```

#### 3. Access Time

**Formula:**
```
Access Time = Seek Time + Rotational Latency
```

**Definition:** Time to get into position to read or write.

**Does NOT include:** Actual data transfer time.

**Typical Values:**
- Average: 5-20 ms
- Depends on disk speed and seek characteristics

### Transfer Time

**Definition:** Time to actually transfer data.

**Factors:**
- **Disk rotation speed:** How fast data passes under head
- **Sectors per track:** How much data per track
- **Amount of data:** How many sectors to transfer

**Calculation:**
```
Transfer Time = (Number of sectors to transfer) / (Sectors per track × RPM / 60)
```

**Or:**
```
Transfer Time = (Data size) / (Transfer rate)
```

**Typical Transfer Rates:**
- Sequential: 100-200 MB/s (modern HDDs)
- Random: Much lower (1-10 MB/s)

### Complete I/O Time

**Total Time for Disk I/O:**
```
Total Time = Seek Time + Rotational Latency + Transfer Time
```

**Example:**
```
Seek time: 8 ms
Rotational latency: 4 ms
Transfer time: 2 ms (for 1 sector)
Total: 14 ms
```

### Performance Example

**Given:**
- 1000 cylinders
- 10 sectors per track
- Head assembly at cylinder 0 initially
- Head moves at 10 μs/cylinder
- Disk rotates 100 times/second

**Calculate average time to read a randomly chosen byte:**

**Step 1: Average Seek Time**
- Average distance: 1000/3 = 333 cylinders
- Seek time: 333 × 10 μs = 3.33 ms

**Step 2: Average Rotational Latency**
- Time per revolution: 1/100 = 0.01 seconds = 10 ms
- Average latency: 10/2 = 5 ms

**Step 3: Transfer Time**
- One sector: 1/10 of track
- Time per track: 10 ms
- Transfer time: 10/10 = 1 ms

**Total:**
```
Total = 3.33 + 5 + 1 = 9.33 ms
```

### Improving Disk Performance

**Strategies:**

1. **Faster Rotation:**
   - Reduces rotational latency
   - Increases transfer rate
   - More expensive, more power

2. **Higher Data Density:**
   - More data per track
   - Higher transfer rates
   - Better capacity

3. **Multiple Platters:**
   - More surfaces
   - More capacity
   - Can access multiple surfaces in parallel

4. **Cache:**
   - Buffer frequently accessed data
   - Reduces access time for cached data

5. **Disk Scheduling:**
   - Optimize order of requests
   - Minimize seek time
   - Examples: FCFS, SSTF, SCAN, C-SCAN

---

## RAID Systems

### What is RAID?

**Definition:** **Redundant Array of Independent Disks**

**Key Concepts:**
- **Not a hierarchy:** All disks at same level
- **Logical drive:** Set of physical disks viewed as single logical drive by OS
- **Data distribution:** Data distributed across physical drives
- **Redundancy:** Can use redundant capacity for parity information

**Purpose:**
1. **Performance:** Increase speed through parallel access
2. **Reliability:** Provide fault tolerance through redundancy
3. **Capacity:** Combine multiple disks into larger volume

### RAID Levels Overview

**Seven RAID Levels:**
- **RAID 0:** Striping (no redundancy)
- **RAID 1:** Mirroring
- **RAID 2:** Bit-level striping with Hamming code
- **RAID 3:** Byte-level striping with dedicated parity
- **RAID 4:** Block-level striping with dedicated parity
- **RAID 5:** Block-level striping with distributed parity
- **RAID 6:** Block-level striping with dual distributed parity

**Common Levels:** RAID 0, 1, 5, 6 (most commonly used)

### RAID 0: Striping (No Redundancy)

**Concept:** Data **striped** across all disks.

**Organization:**
- **Round-robin striping:**
  - Stripe 0 → Disk 0
  - Stripe 1 → Disk 1
  - Stripe 2 → Disk 2
  - Stripe 3 → Disk 0 (wraps around)
  - And so on...

**Characteristics:**
- **No redundancy:** No fault tolerance
- **No parity:** No error correction
- **Performance improvement:**
  - Multiple data requests probably not on same disk
  - Disks seek in parallel
  - Set of data likely striped across multiple disks

**Advantages:**
- **High performance:** Parallel access
- **Full capacity:** No space lost to redundancy
- **Simple:** Easy to implement

**Disadvantages:**
- **No fault tolerance:** One disk failure = data loss
- **No reliability improvement:** Actually worse (more failure points)

**Use Cases:**
- Performance-critical applications
- Where data can be easily recreated
- Temporary data

**Capacity:** N disks → N × disk capacity (no overhead)

### RAID 1: Mirroring

**Concept:** **Mirrored disks** - two copies of each stripe on separate disks.

**Organization:**
- Data striped across disks
- **2 copies** of each stripe on separate disks
- Example: Stripe 0 on Disk 0 and Disk 1 (mirrored)

**Characteristics:**
- **Full redundancy:** Complete copy of data
- **Simple recovery:** Swap faulty disk and re-mirror
- **No downtime:** Can continue operating with one disk failed

**Read Performance:**
- **Read from either disk:**
  - Can balance read load
  - Can read from faster disk
  - Potentially 2x read performance

**Write Performance:**
- **Write to both disks:**
  - Must wait for both writes
  - No write performance improvement
  - May be slightly slower

**Advantages:**
- **High reliability:** Can survive one disk failure
- **Fast recovery:** Simple mirror rebuild
- **Good read performance:** Can read from either disk

**Disadvantages:**
- **Expensive:** 50% capacity overhead (2 disks for 1 disk capacity)
- **No write performance improvement:** Must write to both

**Use Cases:**
- Critical data
- Applications requiring high availability
- Small arrays (2 disks)

**Capacity:** N disks → (N/2) × disk capacity (50% overhead)

### RAID 2: Bit-Level Striping with Hamming Code

**Concept:** Very small strips (often single byte/word) with Hamming error correction.

**Organization:**
- **Bit-level striping:** Data split at bit level
- **Error correction:** Hamming code calculated across corresponding bits
- **Multiple parity disks:** Store Hamming code error correction

**Characteristics:**
- **Lots of redundancy:** Many parity disks needed
- **Expensive:** High overhead
- **Not used:** Rarely implemented

**Why Not Used:**
- Modern disks have built-in error correction
- Overhead too high
- Complexity not justified

**Capacity:** High overhead (many parity disks)

### RAID 3: Byte-Level Striping with Dedicated Parity

**Concept:** Similar to RAID 2, but **only one redundant disk** (parity disk).

**Organization:**
- **Byte-level striping:** Data split at byte level
- **Single parity disk:** Stores parity for each set of corresponding bytes
- **Simple parity:** XOR of corresponding bytes

**Characteristics:**
- **One parity disk:** No matter how large the array
- **Data reconstruction:** Failed drive data can be reconstructed from surviving data and parity
- **Synchronous access:** All disks must be accessed together

**Advantages:**
- **Low overhead:** Only one disk for parity
- **Good for large sequential transfers**

**Disadvantages:**
- **Parity disk bottleneck:** All writes must update parity disk
- **Synchronous access:** Less flexible than independent disk access

**Use Cases:**
- Large sequential data transfers
- Applications with synchronized access patterns

**Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)

### RAID 4: Block-Level Striping with Dedicated Parity

**Concept:** **Large stripes** (blocks) with **dedicated parity disk**.

**Organization:**
- **Block-level striping:** Data split at block level
- **Independent disk operation:** Each disk operates independently
- **Dedicated parity disk:** All parity stored on one disk
- **Bit-by-bit parity:** Parity calculated across stripes on each disk

**Characteristics:**
- **Good for high I/O request rate:**
  - Separate I/O requests can be satisfied in parallel
  - Independent disk access
- **Large stripes:** Better for random access

**Advantages:**
- **Independent access:** Disks can operate independently
- **Good random I/O:** Multiple requests in parallel
- **Low overhead:** Only one parity disk

**Disadvantages:**
- **Parity disk bottleneck:**
  - Every write must update parity disk
  - Parity disk becomes bottleneck
  - Limits write performance

**Use Cases:**
- High I/O rate applications
- Random access patterns
- Read-heavy workloads

**Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)

### RAID 5: Block-Level Striping with Distributed Parity

**Concept:** Like RAID 4, but **parity striped across all disks**.

**Organization:**
- **Block-level striping:** Data split at block level
- **Distributed parity:** Parity striped across all disks
- **Round-robin allocation:** Parity stripe rotates among disks

**Characteristics:**
- **Avoids RAID 4 bottleneck:**
  - Parity distributed, not on single disk
  - Better write performance
  - Better load balancing

**Advantages:**
- **No parity disk bottleneck:** Parity distributed
- **Good performance:** Both read and write
- **Good reliability:** Can survive one disk failure
- **Commonly used:** Very popular

**Disadvantages:**
- **Write penalty:** Must read old data and parity, calculate new parity, write both
- **Complexity:** More complex than RAID 1

**Use Cases:**
- **Network servers:** Very common
- General-purpose storage
- Balanced read/write workloads

**Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)

**Example:**
```
4 disks, parity distribution:
Disk 0: Data, Data, Parity, Data
Disk 1: Data, Parity, Data, Data
Disk 2: Parity, Data, Data, Data
Disk 3: Data, Data, Data, Parity
```

### RAID 6: Dual Distributed Parity

**Concept:** **Two parity calculations** stored in separate blocks on different disks.

**Organization:**
- **Block-level striping:** Data split at block level
- **Dual parity:** Two independent parity calculations
- **Distributed:** Both parities distributed across disks

**Characteristics:**
- **High data availability:**
  - Can survive **two disk failures**
  - Three disks must fail for data loss
- **Significant write penalty:**
  - Must calculate and write two parities
  - More complex than RAID 5

**Advantages:**
- **Very high reliability:** Can survive two failures
- **Good for critical data:** Maximum fault tolerance

**Disadvantages:**
- **High write penalty:** Two parities to calculate/write
- **Higher overhead:** Two disks for parity
- **More complex:** More calculations needed

**Use Cases:**
- Critical data requiring maximum reliability
- Large arrays (where two failures more likely)
- Long-term archival storage

**Capacity:** N disks → (N-2) × disk capacity (2 disks overhead)

### RAID Comparison Summary

| RAID Level | Redundancy | Fault Tolerance | Read Performance | Write Performance | Capacity Overhead | Common Use |
|------------|------------|-----------------|------------------|-------------------|-------------------|------------|
| **0** | None | 0 disks | High | High | 0% | Performance |
| **1** | Mirroring | 1 disk | High | Medium | 50% | Critical data |
| **2** | Hamming | 1 disk | Medium | Medium | High | Rarely used |
| **3** | Byte parity | 1 disk | Medium | Medium | 1 disk | Sequential |
| **4** | Block parity | 1 disk | High | Low | 1 disk | Read-heavy |
| **5** | Distributed parity | 1 disk | High | Medium | 1 disk | General |
| **6** | Dual parity | 2 disks | High | Low | 2 disks | Critical |

**Key Trade-offs:**
- **Performance vs. Reliability:** RAID 0 fast but no redundancy; RAID 1/5/6 slower but reliable
- **Capacity vs. Reliability:** More redundancy = less usable capacity
- **Write Performance:** Parity calculations slow writes (RAID 5/6)

**Modern Practice:**
- **RAID 0:** Performance-critical, non-critical data
- **RAID 1:** Small arrays, critical data
- **RAID 5:** Most common for general-purpose storage
- **RAID 6:** Large arrays, maximum reliability

---

## Solid State Drives (SSDs)

### What is an SSD?

**Definition:** **Solid State Drive** - storage device using **electronic circuitry** (semiconductors) instead of mechanical components.

**Technology:** Uses **NAND flash memory** (same as USB drives, memory cards).

**Significance:**
- Most significant development to complement or replace HDDs
- Used for both internal and external memory
- Increasingly competitive with HDDs as cost drops and performance increases

### SSD Advantages over HDD

**1. High IOPS (Input/Output Operations Per Second):**
- Much higher random I/O performance
- Can handle many small requests efficiently

**2. Durability:**
- **Less susceptible to physical shock and vibration:**
  - No moving parts
  - Can withstand drops and impacts
  - Better for mobile devices

**3. Longer Lifespan:**
- **Not susceptible to mechanical wear:**
  - No moving parts to wear out
  - No head crashes
  - No bearing failures

**4. Lower Power Consumption:**
- **Considerably less power** than comparable HDDs
- Important for laptops, mobile devices
- Lower energy costs

**5. Quieter and Cooler:**
- **No moving parts:** Silent operation
- **Less heat:** Lower power = less heat
- **Less space required:** Smaller form factors

**6. Lower Access Times and Latency:**
- **Over 10 times faster** than spinning disks
- **No seek time:** No head movement
- **No rotational latency:** No waiting for rotation
- **Random access:** Much faster than HDDs

### SSD Architecture

**Components:**

1. **Interface to Host System:**
   - SATA, PCIe, NVMe
   - Connects SSD to computer

2. **Controller:**
   - Manages flash memory
   - Handles wear leveling
   - Error correction
   - Address translation

3. **Addressing:**
   - Logical to physical address mapping
   - Handles bad block management

4. **Data Buffer/Cache:**
   - RAM buffer for temporary storage
   - Improves performance

5. **Error Correction:**
   - Detects and corrects errors
   - Critical for flash memory reliability

6. **Flash Memory Components:**
   - NAND flash chips
   - Organized in pages and blocks

### Practical Issues with SSDs

#### 1. Write Endurance

**Problem:**
- **Flash memory becomes unusable after certain number of writes**
- Each cell can only be written finite number of times
- Typical: 1,000 to 100,000 write cycles per cell

**Impact:**
- SSD performance may slow down as device is used
- Cells wear out over time
- Eventually, SSD may fail

#### 2. Write Amplification

**Problem:**
- **To write a page onto flash memory:**
  1. Entire **block** must be read from flash
  2. Placed in RAM buffer
  3. Entire block of flash memory must be **erased**
  4. Entire block from buffer written back to flash

**Result:**
- Writing small amount of data requires rewriting entire block
- **Write amplification:** More data written than requested
- Reduces performance and increases wear

#### 3. Solutions and Techniques

**Wear Leveling:**
- **Distribute writes evenly** across all blocks
- Prevents some blocks from wearing out faster
- Extends SSD lifespan

**Caching:**
- **Front-end flash with cache** (RAM buffer)
- **Delay and group write operations**
- Reduces number of erase operations
- Improves performance

**Over-Provisioning:**
- More flash memory than advertised capacity
- Provides spare blocks for wear leveling
- Handles bad blocks

**TRIM Command:**
- OS tells SSD which blocks are no longer needed
- Allows SSD to erase blocks in advance
- Improves write performance

**Lifetime Estimation:**
- **Most flash devices estimate remaining lifetime**
- Systems can anticipate failure
- Take preemptive action (backup, replace)

### Hybrid Magnetic-Flash Systems

**Concept:** Combine HDD and SSD for best of both worlds.

**Magnetic Disk Characteristics:**
- **Low $/GB:** Very cheap per gigabyte
- **Huge capacity:** Terabytes available
- **Power hungry:** High power consumption
- **Slow:** Mechanical movement (seek, rotation)
- **Sensitive to impacts:** Head crashes possible

**Flash Characteristics:**
- **Fast:** No mechanical delays
- **Power efficient:** Low power consumption
- **No moving parts:** Robust
- **Expensive:** Higher $/GB

**Hybrid Solution:**
- **Use flash as cache for disk**
- **Most data on disk:** Cheap, large capacity
- **Frequently accessed data on flash:** Fast access
- **Automatic management:** System moves hot data to flash

**Benefits:**
- **Best of both:** Speed of SSD, capacity of HDD
- **Cost-effective:** Smaller flash cache, large HDD
- **Transparent:** Works automatically

**Example:**
- 1 TB HDD + 32 GB flash cache
- Frequently accessed files cached in flash
- Rest of data on HDD

---

## Optical Storage

### Optical Disk Products

**Types:**
- **CD (Compact Disc):** 700 MB
- **DVD (Digital Versatile Disc):** 4.7-17 GB
- **Blu-ray:** 25-50 GB
- **HD DVD:** (discontinued)

**Categories:**
- **Read-only:** CD-ROM, DVD-ROM, BD-ROM
- **Write-once:** CD-R, DVD-R, BD-R
- **Rewritable:** CD-RW, DVD-RW, BD-RE

### CD-ROM (Compact Disk Read Only Memory)

**History:**
- Originally developed for audio
- Adapted for computer data storage

**Physical Structure:**
- **Polycarbonate disk** coated with highly reflective coat (usually aluminium)
- **Data read by reflecting laser:**
  - Pits and lands on surface
  - Laser reflects differently from pits vs. lands
  - Reflection pattern encodes data

**Track Organization:**
- **Single spiral track:**
  - Begins near center
  - Spirals out to outer edge
  - Different from magnetic disk (concentric tracks)

**Capacity:**
- **About 680 MB** (74 minutes of audio)
- Standard format

**Operation:**
- Laser shines on disk surface
- Reflection detected by photodetector
- Pits and lands create different reflection patterns
- Patterns decoded to data

**Advantages:**
- **Cheap:** Very low cost per disk
- **Portable:** Easy to distribute
- **Durable:** Resistant to magnetic fields
- **Standardized:** Universal format

**Disadvantages:**
- **Slow:** Sequential access, slow transfer rates
- **Low capacity:** Compared to modern storage
- **Read-only (for ROM):** Cannot modify

**Use Cases:**
- Software distribution
- Music distribution (historical)
- Data backup and archive
- Multimedia content

### DVD and Blu-ray

**DVD:**
- **Higher capacity:** 4.7-17 GB
- **Shorter wavelength laser:** Red laser (vs. infrared for CD)
- **Smaller pits:** Higher density
- **Multiple layers:** Can have 2 layers per side

**Blu-ray:**
- **Even higher capacity:** 25-50 GB
- **Blue laser:** Shorter wavelength than red
- **Even smaller pits:** Highest density
- **Multiple layers:** Up to 4 layers

**Evolution:**
- CD → DVD → Blu-ray
- Each generation: Higher capacity, shorter wavelength laser

---

## Magnetic Tape

### What is Magnetic Tape?

**Definition:** Sequential access storage medium using magnetic recording on tape.

**Characteristics:**
- **Backup and archive:** Secondary storage
- **Large capacity:** Terabytes per tape
- **Replaceable:** Can swap tapes
- **Slow:** Sequential access only
- **Sequential access:** Must read from beginning

### Tape Characteristics

**Advantages:**
- **Very large capacity:** Terabytes per tape
- **Very low cost per GB:** Cheapest storage
- **Portable:** Easy to transport
- **Durable:** Long-term storage (decades)
- **Reliable:** Good for archival

**Disadvantages:**
- **Very slow:** Sequential access only
- **Random access:** Impractical (must rewind)
- **Dying out:** Low production volume
- **Cost not dropping:** As rapidly as disks
- **Cheaper alternatives:** USB drives, cloud storage

### Tape vs. Disk

**When to Use Tape:**
- **Sequential access:** Reading entire files from start to end
- **Large files:** Terabyte-sized files
- **Archive:** Long-term storage
- **Backup:** Regular backups

**When to Use Disk:**
- **Random access:** Reading specific parts of files
- **Frequent access:** Regularly accessed data
- **Small files:** Many small files
- **Interactive use:** User applications

**Example Scenarios:**

1. **Read 1 GB file from start to end:**
   - **Tape:** Good (sequential access)
   - **Disk:** Also good, but more expensive

2. **Read just first and last byte of 1 GB file:**
   - **Disk:** Fast (random access)
   - **Tape:** Very slow (must read entire file)

3. **Make a cat happy:**
   - **Tape:** Perfect! (cats love playing with tape)
   - **Disk:** Not as fun

**Modern Status:**
- **Declining:** Being replaced by:
  - USB drives (cheap, portable)
  - Cloud storage (convenient, accessible)
  - Large HDDs (cheap, fast enough)
- **Still used:** Enterprise backup systems, archival storage

---

## Storage System Comparison

### Performance Comparison

| Storage Type | Sequential Read | Random Read | Sequential Write | Random Write | Access Time |
|-------------|----------------|-------------|------------------|--------------|-------------|
| **HDD** | 100-200 MB/s | 1-10 MB/s | 100-200 MB/s | 1-10 MB/s | 5-15 ms |
| **SSD** | 500-3000 MB/s | 500-3000 MB/s | 500-3000 MB/s | 500-3000 MB/s | 0.1 ms |
| **Optical** | 1-20 MB/s | N/A | 1-20 MB/s | N/A | 100-200 ms |
| **Tape** | 100-300 MB/s | N/A | 100-300 MB/s | N/A | Seconds |

### Cost Comparison

| Storage Type | Cost per GB | Typical Capacity |
|-------------|------------|------------------|
| **HDD** | $0.01-0.05 | 1-20 TB |
| **SSD** | $0.10-0.50 | 250 GB - 4 TB |
| **Optical** | $0.001-0.01 | 700 MB - 50 GB |
| **Tape** | $0.001-0.01 | 1-15 TB |

### Use Case Recommendations

**HDD:**
- Large capacity needs
- Cost-sensitive applications
- Archive storage
- Desktop computers

**SSD:**
- Performance-critical applications
- Operating system and programs
- Mobile devices
- High-performance workstations

**Optical:**
- Software distribution
- Music/movie distribution
- Long-term archive
- Backup (for small amounts)

**Tape:**
- Enterprise backup
- Long-term archive
- Very large sequential files
- Disaster recovery

---

## Key Concepts Summary

### External Memory Principles

1. **Diversity:** Many storage technologies for different needs
2. **Trade-offs:** Speed, capacity, cost cannot all be optimized
3. **Hierarchy:** External memory is slowest but largest and cheapest
4. **Performance:** Throughput and latency are key metrics

### Magnetic Disk Fundamentals

1. **Mechanical:** Rotating platters with magnetic recording
2. **Performance:** Seek time + rotational latency + transfer time
3. **Organization:** Tracks, sectors, cylinders
4. **Optimization:** Zoned bit recording improves capacity

### RAID Systems

1. **Purpose:** Performance and/or reliability
2. **Trade-offs:** Performance vs. reliability vs. capacity
3. **Common Levels:** RAID 0 (performance), 1 (mirroring), 5 (distributed parity), 6 (dual parity)
4. **Parity:** Enables data reconstruction after failure

### Solid State Drives

1. **Advantages:** Fast, durable, low power, no moving parts
2. **Limitations:** Write endurance, write amplification
3. **Solutions:** Wear leveling, caching, over-provisioning
4. **Hybrid:** Combine with HDD for best of both

### Storage Selection

1. **HDD:** Large capacity, low cost, moderate speed
2. **SSD:** High speed, moderate capacity, higher cost
3. **Optical:** Distribution, archive, low cost
4. **Tape:** Sequential access, very large capacity, very low cost

---

## Practice Problems and Examples

### Problem 1: Disk Access Time

**Question:** Disk has average seek time of 8 ms, rotates at 7200 RPM, and has 100 sectors per track. What is average access time to read one sector?

**Solution:**
```
Average seek time = 8 ms

Rotational latency:
Time per revolution = 60/7200 = 0.00833 s = 8.33 ms
Average latency = 8.33/2 = 4.17 ms

Transfer time:
Time per track = 8.33 ms
Time per sector = 8.33/100 = 0.0833 ms

Total access time = 8 + 4.17 + 0.0833 = 12.25 ms
```

**Answer:** 12.25 ms

### Problem 2: RAID Capacity

**Question:** RAID 5 array with 5 disks, each 1 TB. What is usable capacity?

**Solution:**
```
RAID 5: (N-1) × disk capacity
N = 5 disks
Usable capacity = (5-1) × 1 TB = 4 TB
```

**Answer:** 4 TB usable capacity

### Problem 3: RAID 1 Capacity

**Question:** RAID 1 array with 4 disks, each 500 GB. What is usable capacity?

**Solution:**
```
RAID 1: (N/2) × disk capacity (mirroring)
N = 4 disks
Usable capacity = (4/2) × 500 GB = 2 × 500 GB = 1 TB
```

**Answer:** 1 TB usable capacity

### Problem 4: Transfer Rate

**Question:** Disk rotates at 10,000 RPM, has 200 sectors per track, sector size 4 KB. What is sequential transfer rate?

**Solution:**
```
Time per revolution = 60/10000 = 0.006 s = 6 ms
Sectors per track = 200
Data per track = 200 × 4 KB = 800 KB

Transfer rate = 800 KB / 0.006 s = 133,333 KB/s = 133.3 MB/s
```

**Answer:** 133.3 MB/s

### Problem 5: Hybrid Storage Performance

**Question:** System has 1 TB HDD (100 MB/s sequential, 1 MB/s random) and 32 GB SSD cache (1000 MB/s). 90% of requests hit cache. What is effective transfer rate for random access?

**Solution:**
```
Cache hit rate = 90%
Cache miss rate = 10%

Cache hit: 1000 MB/s
Cache miss (HDD random): 1 MB/s

Effective rate = 0.9 × 1000 + 0.1 × 1
                = 900 + 0.1
                = 900.1 MB/s
```

**Answer:** 900.1 MB/s effective rate

### Problem 6: RAID Performance

**Question:** RAID 0 array with 4 disks, each capable of 150 MB/s. What is maximum sequential transfer rate?

**Solution:**
```
RAID 0: Data striped across all disks
All disks can transfer in parallel

Maximum rate = 4 × 150 MB/s = 600 MB/s
```

**Answer:** 600 MB/s

---

## Study Tips

1. **Understand Mechanical Components:**
   - How disks physically work
   - Seek time vs. rotational latency
   - Why SSDs are faster (no mechanics)

2. **Master RAID Levels:**
   - Know differences between levels
   - Understand parity concept
   - Calculate capacity overhead

3. **Compare Technologies:**
   - HDD vs. SSD trade-offs
   - When to use each technology
   - Cost vs. performance

4. **Performance Calculations:**
   - Access time components
   - Transfer rate calculations
   - RAID performance

5. **Real-World Context:**
   - Why different technologies exist
   - How they're used in practice
   - Evolution of storage technology

---

## Conclusion

Group 5 (External Memory & Storage Systems) covers the slowest but largest and cheapest level of the memory hierarchy:

1. **Magnetic disks** provide large capacity at low cost
2. **RAID systems** improve performance and reliability
3. **SSDs** offer high speed with no moving parts
4. **Optical storage** provides portable, cheap distribution
5. **Magnetic tape** offers very large capacity for archive

Understanding external memory is crucial because:
- It's the largest level of the memory hierarchy
- It's often the performance bottleneck
- Different technologies serve different needs
- Storage system design impacts overall system performance

Master these concepts, and you'll understand how modern computers store and access the vast amounts of data needed for today's applications!

---

*End of Group 5 Study Guide*

