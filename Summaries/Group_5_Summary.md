# Group 5: External Memory & Storage Systems - Concise Summary

## Introduction to External Memory

### Purpose
1. **File Storage:** Programs, data files, system settings, user documents
2. **Virtual Memory:** Extension of main memory, swap space
3. **Backup and Archive:** Long-term data preservation, disaster recovery

### Characteristics
- **Largest capacity:** Terabytes to petabytes
- **Slowest access:** Milliseconds to seconds
- **Cheapest per bit:** Very low cost
- **Non-volatile:** Data persists without power
- **Performance:** Throughput and latency improving slowly (often bottleneck)

### Storage Types
- **Magnetic disks:** Hard disk drives (HDDs)
- **Solid state drives (SSDs):** Flash-based storage
- **Optical disks:** CD, DVD, Blu-ray
- **Magnetic tape:** Backup and archive

## Magnetic Disk Fundamentals

### What is a Magnetic Disk?
- **Definition:** Storage device using magnetic recording on rotating platters
- **Examples:** Hard disk drive (HDD), floppy disk (historical)

### Physical Structure
- **Platter:** Circular disk with magnetizable coating
- **Substrate:** Modern disks use glass (better uniformity, fewer defects, better stiffness)
- **Read/Write Head:** Conductive coil (head stationary, platter rotates)

### Read/Write Mechanisms
- **Write:** Current → Magnetic field → Magnetic pattern on disk
- **Read (Traditional):** Magnetic field → Current (inductive)
- **Read (Modern - MR):** Magneto resistive sensor (more sensitive, better performance)

### Disk Geometry
- **Tracks:** Concentric rings on platter surface
- **Sectors:** Divisions of tracks (minimum block size)
- **Cylinders:** Same track position across all platters
- **Blocks:** Minimum unit of data transfer (typically one sector)

## Disk Organization and Formatting

### Track Organization
- **Concentric rings:** Tracks are circles (not spiral)
- **Gaps between tracks:** Prevent interference
- **Variable packing density:** Same bits per track (outer tracks less dense)

### Sector Organization
- **Sectors:** Tracks divided into sectors
- **Minimum block size:** One sector (typically 512 bytes or 4 KB)
- **Sector addressing:** (Cylinder, Head, Sector) or LBA (Logical Block Addressing)

### Disk Velocity Solutions

#### 1. Constant Angular Velocity (CAV)
- **Method:** Rotate at constant angular velocity, pie-shaped sectors
- **Advantages:** Simple addressing, easy implementation, predictable
- **Disadvantages:** Waste of space on outer tracks, lower capacity

#### 2. Zoned Bit Recording (ZBR)
- **Method:** Surface divided into zones, outer zones have more bits per track
- **Advantages:** Better capacity utilization, higher data density
- **Disadvantages:** More complex circuitry, variable sectors per track
- **Modern Practice:** Most disks use ZBR

### Disk Formatting
- **Low-Level Formatting:** Physical formatting (done at factory)
- **High-Level Formatting:** Logical formatting, creates file system (done by OS)

### Physical Characteristics
- **Head Configuration:**
  - **Fixed-Head:** One head per track (no seek time, expensive)
  - **Moveable-Head:** One head per side (seek time required, cheaper) - **Most common**
- **Removability:** Most disks are non-removable (better performance, reliability)
- **Sidedness:** All modern disks are double-sided

## Disk Performance Parameters

### Access Time Components
```
Access Time = Seek Time + Rotational Latency
```

#### 1. Seek Time
- **Definition:** Time to move head to correct track
- **Factors:** Distance, speed, acceleration/deceleration
- **Typical Values:**
  - Average: 3-15 ms
  - Track-to-track: 0.5-2 ms
  - Full stroke: 10-25 ms
- **Average:** Typically 1/3 of full stroke time

#### 2. Rotational Latency
- **Definition:** Time waiting for desired sector to rotate under head
- **Calculation:** `Average latency = (1/2) × (60 seconds / RPM) × 1000 ms`
- **Typical Values:**
  - 5400 RPM: 5.56 ms
  - 7200 RPM: 4.17 ms
  - 10000 RPM: 3.00 ms
  - 15000 RPM: 2.00 ms

#### 3. Access Time
- **Formula:** `Access Time = Seek Time + Rotational Latency`
- **Does NOT include:** Transfer time
- **Typical:** 5-20 ms

### Transfer Time
- **Definition:** Time to actually transfer data
- **Factors:** Disk rotation speed, sectors per track, amount of data
- **Typical Transfer Rates:**
  - Sequential: 100-200 MB/s (modern HDDs)
  - Random: 1-10 MB/s

### Complete I/O Time
```
Total Time = Seek Time + Rotational Latency + Transfer Time
```

### Improving Disk Performance
1. **Faster rotation:** Reduces latency, increases transfer rate
2. **Higher data density:** More data per track
3. **Multiple platters:** More capacity, parallel access
4. **Cache:** Buffer frequently accessed data
5. **Disk scheduling:** Optimize request order (FCFS, SSTF, SCAN, C-SCAN)

## RAID Systems

### What is RAID?
- **Definition:** Redundant Array of Independent Disks
- **Key Concepts:**
  - All disks at same level (not hierarchy)
  - Logical drive viewed as single drive by OS
  - Data distributed across physical drives
  - Redundancy for parity information
- **Purpose:** Performance, reliability, capacity

### RAID Levels

#### RAID 0: Striping (No Redundancy)
- **Concept:** Data striped across all disks (round-robin)
- **Advantages:** High performance, full capacity, simple
- **Disadvantages:** No fault tolerance, no reliability improvement
- **Capacity:** N disks → N × disk capacity (0% overhead)
- **Use:** Performance-critical, non-critical data

#### RAID 1: Mirroring
- **Concept:** Mirrored disks (two copies of each stripe)
- **Advantages:** High reliability, fast recovery, good read performance (2x)
- **Disadvantages:** Expensive (50% overhead), no write improvement
- **Capacity:** N disks → (N/2) × disk capacity (50% overhead)
- **Use:** Critical data, small arrays

#### RAID 2: Bit-Level Striping with Hamming Code
- **Concept:** Bit-level striping with Hamming error correction
- **Characteristics:** Lots of redundancy, expensive, rarely used
- **Why not used:** Modern disks have built-in error correction

#### RAID 3: Byte-Level Striping with Dedicated Parity
- **Concept:** Byte-level striping, single parity disk
- **Advantages:** Low overhead (1 disk), good for sequential transfers
- **Disadvantages:** Parity disk bottleneck, synchronous access
- **Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)

#### RAID 4: Block-Level Striping with Dedicated Parity
- **Concept:** Block-level striping, dedicated parity disk
- **Advantages:** Independent access, good random I/O, low overhead
- **Disadvantages:** Parity disk bottleneck (limits write performance)
- **Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)
- **Use:** High I/O rate, read-heavy workloads

#### RAID 5: Block-Level Striping with Distributed Parity
- **Concept:** Block-level striping, parity distributed across all disks
- **Advantages:** No parity bottleneck, good performance, commonly used
- **Disadvantages:** Write penalty (read old data/parity, calculate, write)
- **Capacity:** N disks → (N-1) × disk capacity (1 disk overhead)
- **Use:** Network servers, general-purpose storage (most common)

#### RAID 6: Dual Distributed Parity
- **Concept:** Two parity calculations, distributed across disks
- **Advantages:** Very high reliability (survives 2 disk failures)
- **Disadvantages:** High write penalty, higher overhead (2 disks)
- **Capacity:** N disks → (N-2) × disk capacity (2 disks overhead)
- **Use:** Critical data, large arrays, maximum reliability

### RAID Comparison

| RAID Level | Redundancy | Fault Tolerance | Read Performance | Write Performance | Capacity Overhead |
|------------|------------|-----------------|------------------|-------------------|-------------------|
| **0** | None | 0 disks | High | High | 0% |
| **1** | Mirroring | 1 disk | High | Medium | 50% |
| **5** | Distributed parity | 1 disk | High | Medium | 1 disk |
| **6** | Dual parity | 2 disks | High | Low | 2 disks |

**Modern Practice:**
- **RAID 0:** Performance-critical
- **RAID 1:** Small arrays, critical data
- **RAID 5:** Most common (general-purpose)
- **RAID 6:** Large arrays, maximum reliability

## Solid State Drives (SSDs)

### What is an SSD?
- **Definition:** Solid State Drive - uses electronic circuitry (semiconductors) instead of mechanical components
- **Technology:** NAND flash memory
- **Significance:** Most significant development to complement/replace HDDs

### SSD Advantages over HDD
1. **High IOPS:** Much higher random I/O performance
2. **Durability:** Less susceptible to shock/vibration (no moving parts)
3. **Longer lifespan:** Not susceptible to mechanical wear
4. **Lower power:** Considerably less power consumption
5. **Quieter and cooler:** No moving parts, less heat
6. **Lower access times:** Over 10x faster (no seek time, no rotational latency)

### SSD Architecture
- **Interface:** SATA, PCIe, NVMe
- **Controller:** Manages flash, wear leveling, error correction
- **Addressing:** Logical to physical mapping, bad block management
- **Data Buffer/Cache:** RAM buffer for temporary storage
- **Error Correction:** Detects and corrects errors
- **Flash Memory:** NAND flash chips (pages and blocks)

### Practical Issues with SSDs

#### 1. Write Endurance
- **Problem:** Flash memory becomes unusable after finite writes (1,000-100,000 cycles per cell)
- **Impact:** Performance may slow, cells wear out, eventual failure

#### 2. Write Amplification
- **Problem:** To write a page, entire block must be read, erased, and rewritten
- **Result:** More data written than requested, reduces performance, increases wear

#### 3. Solutions
- **Wear Leveling:** Distribute writes evenly across blocks
- **Caching:** RAM buffer delays and groups writes
- **Over-Provisioning:** More flash than advertised (spare blocks)
- **TRIM Command:** OS tells SSD which blocks are unused
- **Lifetime Estimation:** Systems can anticipate failure

### Hybrid Magnetic-Flash Systems
- **Concept:** Combine HDD and SSD for best of both
- **HDD:** Low $/GB, huge capacity, power hungry, slow
- **Flash:** Fast, power efficient, robust, expensive
- **Solution:** Use flash as cache for disk
- **Benefits:** Speed of SSD, capacity of HDD, cost-effective

## Optical Storage

### Optical Disk Products
- **CD:** 700 MB
- **DVD:** 4.7-17 GB
- **Blu-ray:** 25-50 GB
- **Categories:** Read-only (ROM), write-once (R), rewritable (RW/RE)

### CD-ROM
- **Physical Structure:** Polycarbonate disk with reflective coating
- **Data Reading:** Laser reflects from pits and lands
- **Track Organization:** Single spiral track (different from magnetic disk)
- **Capacity:** About 680 MB (74 minutes audio)
- **Advantages:** Cheap, portable, durable, standardized
- **Disadvantages:** Slow, low capacity, read-only (for ROM)

### DVD and Blu-ray
- **DVD:** Higher capacity (4.7-17 GB), red laser, smaller pits, multiple layers
- **Blu-ray:** Even higher capacity (25-50 GB), blue laser, smallest pits, up to 4 layers
- **Evolution:** CD → DVD → Blu-ray (higher capacity, shorter wavelength laser)

## Magnetic Tape

### What is Magnetic Tape?
- **Definition:** Sequential access storage using magnetic recording on tape
- **Characteristics:** Backup/archive, large capacity (terabytes), replaceable, slow, sequential access

### Tape Characteristics
- **Advantages:** Very large capacity, very low cost per GB, portable, durable (decades), reliable
- **Disadvantages:** Very slow, sequential access only, declining use, cheaper alternatives

### Tape vs. Disk
- **Use Tape For:** Sequential access, large files, archive, backup
- **Use Disk For:** Random access, frequent access, small files, interactive use

### Modern Status
- **Declining:** Replaced by USB drives, cloud storage, large HDDs
- **Still Used:** Enterprise backup systems, archival storage

## Storage System Comparison

### Performance Comparison

| Storage Type | Sequential Read | Random Read | Access Time |
|-------------|----------------|-------------|-------------|
| **HDD** | 100-200 MB/s | 1-10 MB/s | 5-15 ms |
| **SSD** | 500-3000 MB/s | 500-3000 MB/s | 0.1 ms |
| **Optical** | 1-20 MB/s | N/A | 100-200 ms |
| **Tape** | 100-300 MB/s | N/A | Seconds |

### Cost Comparison

| Storage Type | Cost per GB | Typical Capacity |
|-------------|------------|------------------|
| **HDD** | $0.01-0.05 | 1-20 TB |
| **SSD** | $0.10-0.50 | 250 GB - 4 TB |
| **Optical** | $0.001-0.01 | 700 MB - 50 GB |
| **Tape** | $0.001-0.01 | 1-15 TB |

### Use Case Recommendations
- **HDD:** Large capacity, cost-sensitive, archive, desktop computers
- **SSD:** Performance-critical, OS/programs, mobile devices, high-performance workstations
- **Optical:** Software distribution, music/movies, long-term archive, backup
- **Tape:** Enterprise backup, long-term archive, very large sequential files, disaster recovery

## Key Takeaways

1. **External memory:** Largest, slowest, cheapest level of memory hierarchy
2. **Magnetic disks:** Mechanical, seek time + rotational latency + transfer time
3. **RAID systems:** Improve performance and/or reliability through redundancy
4. **RAID levels:** 0 (performance), 1 (mirroring), 5 (distributed parity), 6 (dual parity)
5. **SSDs:** Fast, durable, low power, no moving parts, but write endurance issues
6. **SSD solutions:** Wear leveling, caching, over-provisioning, TRIM
7. **Optical storage:** Portable, cheap, sequential access, declining use
8. **Magnetic tape:** Very large capacity, very slow, sequential only, enterprise backup
9. **Hybrid systems:** Combine HDD capacity with SSD speed
10. **Performance:** Access time = Seek time + Rotational latency (mechanical delays)

## Performance Considerations

- **Disk access time:** Seek time + rotational latency (mechanical delays)
- **Transfer rate:** Depends on rotation speed and data density
- **RAID performance:** Striping improves throughput, parity reduces write performance
- **SSD advantages:** No mechanical delays (10x+ faster access)
- **SSD limitations:** Write endurance, write amplification
- **Storage selection:** Balance speed, capacity, cost, and use case
