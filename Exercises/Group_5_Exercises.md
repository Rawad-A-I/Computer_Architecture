# Group 5: External Memory & Storage Systems
## Comprehensive Exercises

**Chapter 7: External Memory**

---

## Table of Contents
1. [Multiple Choice Questions](#multiple-choice-questions)
2. [True/False Questions](#truefalse-questions)
3. [Short Answer Questions](#short-answer-questions)
4. [Calculation Problems](#calculation-problems)
5. [RAID Analysis Questions](#raid-analysis-questions)
6. [Problem-Solving Exercises](#problem-solving-exercises)
7. [Conceptual Questions](#conceptual-questions)
8. [Answer Key](#answer-key)

---

## Multiple Choice Questions

### Section 1: External Memory Introduction

**1.1** External memory is characterized by:

a) Fast access, small capacity
b) Slow access, large capacity, non-volatile
c) Fast access, large capacity
d) Slow access, small capacity

**1.2** The primary purpose of external memory includes:

a) Only file storage
b) File storage, virtual memory, and backup/archive
c) Only virtual memory
d) Only backup

**1.3** External memory access time is typically measured in:

a) Nanoseconds
b) Microseconds
c) Milliseconds
d) Seconds

**1.4** Which is NOT a type of external memory?

a) Magnetic disk
b) Solid state drive
c) Cache memory
d) Optical disk

**1.5** External memory is typically:

a) Volatile
b) Non-volatile
c) Faster than main memory
d) Smaller than main memory

### Section 2: Magnetic Disk Fundamentals

**2.1** A magnetic disk stores data using:

a) Electrical charges
b) Magnetic fields
c) Optical reflection
d) Mechanical switches

**2.2** The read/write head in a disk drive:

a) Touches the disk surface
b) Floats above the disk surface
c) Is embedded in the disk
d) Rotates with the disk

**2.3** Disk platters are organized into:

a) Only sectors
b) Tracks and sectors
c) Only tracks
d) Blocks only

**2.4** The outermost track on a disk has:

a) The smallest capacity
b) The largest capacity
c) The same capacity as inner tracks
d) No capacity

**2.5** Multiple platters in a disk drive:

a) Rotate independently
b) Rotate together on the same spindle
c) Don't rotate
d) Rotate at different speeds

### Section 3: Disk Performance

**3.1** Disk access time consists of:

a) Only seek time
b) Seek time + rotational latency + transfer time
c) Only transfer time
d) Seek time + transfer time only

**3.2** Seek time is:

a) Time for disk to rotate to the correct position
b) Time to move head to correct track
c) Time to transfer data
d) Time to start the disk

**3.3** Rotational latency is:

a) Time to move head to track
b) Time for disk to rotate to correct sector
c) Time to transfer data
d) Average time = half rotation time

**3.4** The average rotational latency is:

a) Full rotation time
b) Half rotation time
c) Quarter rotation time
d) Zero

**3.5** Transfer time depends on:

a) Only rotation speed
b) Rotation speed and data density
c) Only seek time
d) Only head movement

### Section 4: RAID Systems

**4.1** RAID stands for:

a) Redundant Array of Independent Disks
b) Random Access Integrated Disks
c) Rapid Array of Integrated Disks
d) Redundant Access Independent Disks

**4.2** RAID 0 provides:

a) Redundancy
b) No redundancy, only striping
c) Mirroring
d) Parity

**4.3** RAID 1 provides:

a) Striping
b) Mirroring (duplication)
c) Parity
d) No redundancy

**4.4** RAID 5 uses:

a) Dedicated parity disk
b) Distributed parity across all disks
c) No parity
d) Dual parity

**4.5** Which RAID level provides the best read performance with redundancy?

a) RAID 0
b) RAID 1
c) RAID 5
d) RAID 6

### Section 5: Solid State Drives

**5.1** SSDs use:

a) Magnetic storage
b) Flash memory (NAND)
c) Optical storage
d) Mechanical storage

**5.2** SSDs have advantages over HDDs in:

a) Only capacity
b) Only cost
c) Speed, power consumption, reliability
d) Only reliability

**5.3** A major issue with SSDs is:

a) Read speed
b) Write endurance (limited write cycles)
c) Capacity
d) Cost only

**5.4** Write amplification in SSDs refers to:

a) Faster writes
b) Writing more data than requested due to block erasure
c) Larger write blocks
d) Multiple write operations

**5.5** SSDs typically have:

a) Higher latency than HDDs
b) Lower latency than HDDs
c) Same latency as HDDs
d) Variable latency

### Section 6: Optical Storage

**6.1** CD-ROM stands for:

a) Compact Disk Read Only Memory
b) Computer Disk Read Only Memory
c) Compact Disk Random Only Memory
d) Computer Disk Random Only Memory

**6.2** Optical disks store data using:

a) Magnetic fields
b) Pits and lands (reflective surface)
c) Electrical charges
d) Mechanical switches

**6.3** DVD has greater capacity than CD because:

a) Larger physical size
b) Smaller pit size and multiple layers
c) Faster rotation
d) Different material

**6.4** Blu-ray uses:

a) Red laser
b) Blue-violet laser (shorter wavelength)
c) Infrared laser
d) No laser

**6.5** Optical storage is primarily used for:

a) Primary storage
b) Backup and distribution
c) Virtual memory
d) Cache

### Section 7: Magnetic Tape

**7.1** Magnetic tape is characterized by:

a) Fast random access
b) Slow sequential access
c) Fast sequential access
d) Random and sequential access

**7.2** Magnetic tape is primarily used for:

a) Primary storage
b) Backup and archive
c) Virtual memory
d) Cache

**7.3** Tape access is:

a) Random access
b) Sequential access
c) Direct access
d) Associative access

**7.4** Tape has advantages in:

a) Access speed
b) Capacity and cost per GB
c) Random access
d) Speed

**7.5** Tape is typically:

a) Faster than disk
b) Slower than disk but cheaper
c) Same speed as disk
d) Not used anymore

---

## True/False Questions

**T/F 1.1** External memory is non-volatile and has large capacity.

**T/F 1.2** External memory access time is typically in milliseconds.

**T/F 1.3** External memory is faster than main memory (DRAM).

**T/F 1.4** External memory is used for file storage, virtual memory, and backup.

**T/F 2.1** Magnetic disks store data using magnetic fields on rotating platters.

**T/F 2.2** The read/write head touches the disk surface during operation.

**T/F 2.3** Outer tracks on a disk have more capacity than inner tracks.

**T/F 2.4** Multiple platters in a disk drive rotate together on the same spindle.

**T/F 3.1** Disk access time = seek time + rotational latency + transfer time.

**T/F 3.2** Seek time is the time to move the head to the correct track.

**T/F 3.3** Average rotational latency equals half the rotation time.

**T/F 3.4** Transfer time depends on rotation speed and data density.

**T/F 4.1** RAID 0 provides redundancy through mirroring.

**T/F 4.2** RAID 1 provides mirroring (duplication) of data.

**T/F 4.3** RAID 5 uses distributed parity across all disks.

**T/F 4.4** RAID 6 provides dual distributed parity for fault tolerance.

**T/F 5.1** SSDs use flash memory (NAND) for storage.

**T/F 5.2** SSDs have lower latency than HDDs.

**T/F 5.3** SSDs have unlimited write endurance.

**T/F 5.4** Write amplification is a concern with SSDs.

**T/F 6.1** Optical disks store data using pits and lands.

**T/F 6.2** DVD has greater capacity than CD due to smaller pit size.

**T/F 6.3** Blu-ray uses a blue-violet laser for higher density.

**T/F 6.4** Optical storage is primarily used for backup and distribution.

**T/F 7.1** Magnetic tape provides fast random access.

**T/F 7.2** Tape is primarily used for backup and archive.

**T/F 7.3** Tape access is sequential, not random.

**T/F 7.4** Tape has advantages in capacity and cost per GB.

---

## Short Answer Questions

### Section 1: External Memory Introduction

**SA 1.1** What are the primary purposes of external memory?

**SA 1.2** Explain the characteristics of external memory in terms of speed, capacity, and cost.

**SA 1.3** How does external memory fit into the memory hierarchy?

**SA 1.4** Why is external memory typically non-volatile?

### Section 2: Magnetic Disk Fundamentals

**SA 2.1** Describe the physical structure of a magnetic disk drive.

**SA 2.2** Explain how data is read from and written to a magnetic disk.

**SA 2.3** Describe disk geometry: tracks, sectors, and cylinders.

**SA 2.4** What is the relationship between track position and storage capacity?

### Section 3: Disk Performance

**SA 3.1** List and explain the three components of disk access time.

**SA 3.2** What is seek time, and what factors affect it?

**SA 3.3** What is rotational latency, and why is the average half the rotation time?

**SA 3.4** How is transfer time calculated?

**SA 3.5** Give the complete formula for total I/O time.

### Section 4: RAID Systems

**SA 4.1** What is RAID, and why is it used?

**SA 4.2** Compare RAID 0 and RAID 1 in terms of performance, capacity, and redundancy.

**SA 4.3** Explain how RAID 5 works, including parity distribution.

**SA 4.4** Compare RAID 5 and RAID 6.

**SA 4.5** When would you choose each RAID level?

### Section 5: Solid State Drives

**SA 5.1** What are the advantages of SSDs over HDDs?

**SA 5.2** Explain the architecture of an SSD.

**SA 5.3** What is write endurance, and why is it a concern for SSDs?

**SA 5.4** Explain write amplification and how it's addressed.

**SA 5.5** Compare SSDs and HDDs in terms of performance, cost, and use cases.

### Section 6: Optical Storage

**SA 6.1** How do optical disks store data?

**SA 6.2** Compare CD, DVD, and Blu-ray in terms of capacity and technology.

**SA 6.3** What are the advantages and disadvantages of optical storage?

**SA 6.4** When is optical storage most appropriate?

### Section 7: Magnetic Tape

**SA 7.1** What are the characteristics of magnetic tape?

**SA 7.2** Compare tape and disk storage.

**SA 7.3** When is magnetic tape most appropriate?

**SA 7.4** What are the advantages and disadvantages of tape?

---

## Calculation Problems

### Problem 1: Disk Access Time

**CP 1.1** A disk has:
- Average seek time: 8 ms
- Rotation speed: 7200 RPM
- Transfer rate: 100 MB/s
- Sector size: 512 bytes

Calculate:
- a) Average rotational latency
- b) Time to transfer one sector
- c) Total access time for one sector
- d) Total access time for 64 KB (128 sectors)

**CP 1.2** Compare two disks:

**Disk A:**
- Seek: 5 ms, 10,000 RPM, 150 MB/s

**Disk B:**
- Seek: 10 ms, 7200 RPM, 200 MB/s

For a 4 KB random access:
- a) Calculate access time for each
- b) Which is faster?
- c) For sequential access of 1 MB, which is faster?

### Problem 2: RAID Capacity and Performance

**CP 2.1** Calculate usable capacity for:
- a) RAID 0 with 4 × 1 TB disks
- b) RAID 1 with 4 × 1 TB disks
- c) RAID 5 with 4 × 1 TB disks
- d) RAID 6 with 4 × 1 TB disks

**CP 2.2** For RAID 5 with 5 × 500 GB disks:
- a) Usable capacity
- b) If one disk fails, can data be recovered?
- c) If two disks fail, can data be recovered?
- d) Read performance improvement over single disk?

### Problem 3: Transfer Rates

**CP 3.1** A disk rotates at 10,000 RPM and has:
- 500 sectors per track
- 512 bytes per sector
- 4 surfaces

Calculate:
- a) Maximum transfer rate (MB/s)
- b) Time to read one track
- c) Time to read entire disk (10,000 tracks)

**CP 3.2** An SSD has:
- Sequential read: 500 MB/s
- Sequential write: 400 MB/s
- Random read: 100,000 IOPS
- Random write: 80,000 IOPS

For:
- a) 1 GB sequential read, calculate time
- b) 1 GB sequential write, calculate time
- c) 1000 × 4 KB random reads, calculate time
- d) 1000 × 4 KB random writes, calculate time

### Problem 4: RAID Performance

**CP 4.1** Compare read performance:
- Single disk: 150 MB/s
- RAID 0 (4 disks): theoretical speedup?
- RAID 1 (2 disks): read performance?
- RAID 5 (5 disks): read performance?

**CP 4.2** For write operations:
- Single disk: 100 MB/s
- RAID 0 (4 disks): write performance?
- RAID 1 (2 disks): write performance?
- RAID 5 (5 disks): write performance (with parity calculation overhead)?

### Problem 5: Storage System Comparison

**CP 5.1** Compare storage systems for 1 TB capacity:

**HDD:**
- Cost: $50
- Sequential: 150 MB/s
- Random: 100 IOPS
- Latency: 10 ms

**SSD:**
- Cost: $100
- Sequential: 500 MB/s
- Random: 100,000 IOPS
- Latency: 0.1 ms

Calculate:
- a) Cost per GB for each
- b) Time to read 10 GB sequentially
- c) Time for 1000 random 4 KB reads
- d) Which is better for different workloads?

---

## RAID Analysis Questions

### Analysis 1: RAID Level Selection

**RA 1.1** For each scenario, recommend a RAID level and justify:
- a) Database server requiring high performance and redundancy
- b) Backup server requiring maximum capacity
- c) Web server requiring fast reads, some redundancy
- d) Archive system requiring maximum fault tolerance

**RA 1.2** Compare RAID 1+0 (striped mirrors) vs. RAID 0+1 (mirrored stripes):
- Configuration
- Performance
- Fault tolerance
- When to use each

### Analysis 2: RAID Performance

**RA 2.1** Analyze read performance for different RAID levels:
- 4 × 200 MB/s disks
- Calculate read speed for RAID 0, 1, 5
- Consider striping and mirroring effects

**RA 2.2** Analyze write performance:
- 4 × 150 MB/s disks
- Calculate write speed for RAID 0, 1, 5
- Consider parity calculation overhead for RAID 5

### Analysis 3: RAID Fault Tolerance

**RA 3.1** For RAID 5 with 5 disks:
- How many disk failures can it tolerate?
- What happens during recovery?
- Performance impact during recovery?

**RA 3.2** Compare fault tolerance:
- RAID 1: 2 disks
- RAID 5: 5 disks
- RAID 6: 6 disks
- Which provides best protection?

---

## Problem-Solving Exercises

### Problem 1: Disk Performance Optimization

**PS 1.1** A system has performance issues with disk I/O:
- Current: 7200 RPM, 8 ms seek, 100 MB/s transfer
- Options:
  - A: 10,000 RPM disk (same seek, 120 MB/s)
  - B: 15,000 RPM disk (6 ms seek, 150 MB/s)
  - C: SSD (0.1 ms latency, 500 MB/s)

For workload: 70% random 4 KB, 30% sequential 1 MB:
- a) Calculate average access time for each
- b) Calculate throughput for each
- c) Recommend best option
- d) Consider cost factors

**PS 1.2** Optimize disk layout for database:
- Random access pattern
- 4 KB block size
- High I/O rate required

Recommend:
- Disk type (HDD vs. SSD)
- RAID configuration
- Block size alignment
- Caching strategy

### Problem 2: RAID Design

**PS 2.1** Design RAID system for:
- Capacity: 10 TB usable
- Performance: 500 MB/s read, 400 MB/s write
- Fault tolerance: survive 1 disk failure minimum

Determine:
- a) RAID level
- b) Number and size of disks
- c) Expected performance
- d) Cost estimate

**PS 2.2** Compare two RAID configurations:

**Config A:** RAID 1 (2 × 2 TB)
**Config B:** RAID 5 (4 × 1 TB)

For:
- a) Usable capacity
- b) Read performance
- c) Write performance
- d) Fault tolerance
- e) Cost (assume $100 per TB)

### Problem 3: Hybrid Storage

**PS 3.1** Design hybrid HDD/SSD system:
- 1 TB SSD for hot data
- 4 TB HDD for cold data
- Automatic tiering

Analyze:
- a) Cost comparison to all-SSD
- b) Performance for different access patterns
- c) When hybrid is beneficial

**PS 3.2** SSD caching for HDD:
- 256 GB SSD cache
- 2 TB HDD storage
- Analyze:
  - Effective performance
  - Cost vs. all-SSD
  - When beneficial

### Problem 4: Storage System Selection

**PS 4.1** Select storage for each workload:

**Workload A:** Video editing (large sequential files)
**Workload B:** Database (random small I/O)
**Workload C:** File server (mixed workload)
**Workload D:** Backup (large capacity, sequential)

Recommend storage type and configuration for each.

**PS 4.2** Cost-performance analysis:
- Need 5 TB storage
- Budget: $500
- Options:
  - All HDD (5 × 1 TB, $50 each)
  - All SSD (5 × 1 TB, $100 each)
  - Hybrid (1 TB SSD + 4 TB HDD)
- Analyze performance and cost for each

---

## Conceptual Questions

### Concept 1: External Memory Principles

**CQ 1.1** Why is external memory necessary in computer systems? What would happen without it?

**CQ 1.2** Explain the trade-offs between different external memory technologies (HDD, SSD, optical, tape).

**CQ 1.3** How does external memory performance affect overall system performance?

### Concept 2: Disk Technology

**CQ 2.1** Why do magnetic disks have mechanical components (rotation, head movement)? What are the implications?

**CQ 2.2** Explain how disk geometry (tracks, sectors) affects performance and capacity.

**CQ 2.3** Discuss the fundamental limitations of magnetic disk technology and how they're being addressed.

### Concept 3: RAID Systems

**CQ 3.1** Why are RAID systems important? What problems do they solve?

**CQ 3.2** Explain the fundamental trade-offs in RAID design (performance vs. capacity vs. reliability).

**CQ 3.3** How do different RAID levels balance performance, capacity, and fault tolerance?

### Concept 4: SSDs vs. HDDs

**CQ 4.1** Compare SSDs and HDDs. When is each technology preferred?

**CQ 4.2** Explain why SSDs have different performance characteristics than HDDs (especially for random vs. sequential access).

**CQ 4.3** Discuss the future of storage technology. Will SSDs replace HDDs completely?

### Concept 5: Storage System Design

**CQ 5.1** How do you design a storage system for a specific workload? What factors must be considered?

**CQ 5.2** Explain the concept of storage tiering and when it's beneficial.

**CQ 5.3** Discuss the role of caching in storage systems and how it improves performance.

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - b | 1.2 - b | 1.3 - c | 1.4 - c | 1.5 - b

**Section 2:**
2.1 - b | 2.2 - b | 2.3 - b | 2.4 - b | 2.5 - b

**Section 3:**
3.1 - b | 3.2 - b | 3.3 - b | 3.4 - b | 3.5 - b

**Section 4:**
4.1 - a | 4.2 - b | 4.3 - b | 4.4 - b | 4.5 - c

**Section 5:**
5.1 - b | 5.2 - c | 5.3 - b | 5.4 - b | 5.5 - b

**Section 6:**
6.1 - a | 6.2 - b | 6.3 - b | 6.4 - b | 6.5 - b

**Section 7:**
7.1 - b | 7.2 - b | 7.3 - b | 7.4 - b | 7.5 - b

### True/False Answers

**Section 1:**
1.1 - True | 1.2 - True | 1.3 - False | 1.4 - True

**Section 2:**
2.1 - True | 2.2 - False | 2.3 - True | 2.4 - True

**Section 3:**
3.1 - True | 3.2 - True | 3.3 - True | 3.4 - True

**Section 4:**
4.1 - False | 4.2 - True | 4.3 - True | 4.4 - True

**Section 5:**
5.1 - True | 5.2 - True | 5.3 - False | 5.4 - True

**Section 6:**
6.1 - True | 6.2 - True | 6.3 - True | 6.4 - True

**Section 7:**
7.1 - False | 7.2 - True | 7.3 - True | 7.4 - True

---

*End of Group 5 Exercises*

