# Group 5: External Memory & Storage Systems
## Comprehensive Exercise Solutions - Part 1

**Chapter 7: External Memory**

---

## Table of Contents
1. [Multiple Choice Solutions](#multiple-choice-solutions)
2. [True/False Solutions](#truefalse-solutions)
3. [Short Answer Solutions (Sections 1-4)](#short-answer-solutions-sections-1-4)

---

## Multiple Choice Solutions

### Section 1: External Memory Introduction

**1.1** External memory is characterized by:

**Answer: b) Slow access, large capacity, non-volatile**

**Explanation:**
- External memory characteristics:
  - Slow access: milliseconds (vs. nanoseconds for cache)
  - Large capacity: terabytes to petabytes
  - Non-volatile: data persists without power
  - Cheap per bit
- Contrasts with internal memory (fast, small, volatile)

---

**1.2** The primary purpose of external memory includes:

**Answer: b) File storage, virtual memory, and backup/archive**

**Explanation:**
- External memory serves three main purposes:
  1. **File Storage:** Programs, data files, documents
  2. **Virtual Memory:** Extension of main memory, swap space
  3. **Backup/Archive:** Long-term preservation, disaster recovery
- All three are important functions

---

**1.3** External memory access time is typically measured in:

**Answer: c) Milliseconds**

**Explanation:**
- External memory access times:
  - HDD: 5-15 ms
  - SSD: 0.1-1 ms
  - Optical: 100-200 ms
  - Tape: seconds
- Much slower than internal memory (nanoseconds)
- Milliseconds = 10^-3 seconds

---

**1.4** Which is NOT a type of external memory?

**Answer: c) Cache memory**

**Explanation:**
- External memory types:
  - Magnetic disk (HDD)
  - Solid state drive (SSD)
  - Optical disk (CD, DVD, Blu-ray)
  - Magnetic tape
- Cache memory is internal memory (between CPU and main memory)
- Not external memory

---

**1.5** External memory is typically:

**Answer: b) Non-volatile**

**Explanation:**
- External memory is non-volatile:
  - Data persists when power is removed
  - Essential for permanent storage
  - Examples: HDD, SSD, optical, tape
- Contrasts with main memory (DRAM) which is volatile

---

### Section 2: Magnetic Disk Fundamentals

**2.1** A magnetic disk stores data using:

**Answer: b) Magnetic fields**

**Explanation:**
- Magnetic disks use magnetic recording:
  - Data stored as magnetic patterns on disk surface
  - Read/write head creates/detects magnetic fields
  - Different from electrical (SSD) or optical (CD/DVD) storage

---

**2.2** The read/write head in a disk drive:

**Answer: b) Floats above the disk surface**

**Explanation:**
- Read/write head floats on air cushion above disk
  - Very close (nanometers) but doesn't touch
  - Prevents wear and damage
  - Air pressure from rotation keeps head floating
- If head touches disk (head crash), data loss occurs

---

**2.3** Disk platters are organized into:

**Answer: b) Tracks and sectors**

**Explanation:**
- Disk organization:
  - **Tracks:** Concentric circles on disk surface
  - **Sectors:** Angular divisions of tracks
  - Each sector stores fixed amount of data (typically 512 bytes or 4 KB)
- Cylinder = same track on all platters

---

**2.4** The outermost track on a disk has:

**Answer: b) The largest capacity**

**Explanation:**
- Outer tracks are longer (larger circumference)
- More sectors fit on outer tracks
- Outer tracks have more storage capacity
- But all tracks rotate at same speed
- Data density may be constant (constant angular velocity) or variable

---

**2.5** Multiple platters in a disk drive:

**Answer: b) Rotate together on the same spindle**

**Explanation:**
- All platters mounted on single spindle
- Rotate together at same speed
- All heads move together (same track on all surfaces)
- Forms a cylinder (same track across all platters)

---

### Section 3: Disk Performance

**3.1** Disk access time consists of:

**Answer: b) Seek time + rotational latency + transfer time**

**Explanation:**
- Total access time has three components:
  1. **Seek time:** Move head to correct track
  2. **Rotational latency:** Rotate disk to correct sector
  3. **Transfer time:** Read/write the data
- All three must complete for data access

---

**3.2** Seek time is:

**Answer: b) Time to move head to correct track**

**Explanation:**
- Seek time = time to position read/write head over correct track
- Depends on:
  - Distance head must travel
  - Head acceleration/deceleration
- Typical: 3-15 ms (average ~8 ms)
- Fastest for adjacent tracks, slowest for full stroke

---

**3.3** Rotational latency is:

**Answer: b) Time for disk to rotate to correct sector**

**Explanation:**
- Rotational latency = time for disk to rotate so target sector is under head
- Depends on rotation speed
- Average = half rotation time
- Example: 7200 RPM = 8.33 ms per rotation, average latency = 4.17 ms

---

**3.4** The average rotational latency is:

**Answer: b) Half rotation time**

**Explanation:**
- Average rotational latency = 1/2 × rotation time
- Assumes random sector access
- Worst case: full rotation (sector just passed)
- Best case: 0 (sector just arriving)
- Average: halfway between = 1/2 rotation

---

**3.5** Transfer time depends on:

**Answer: b) Rotation speed and data density**

**Explanation:**
- Transfer time = amount of data / transfer rate
- Transfer rate depends on:
  - Rotation speed (faster = more data per second)
  - Data density (bits per inch on track)
  - Number of sectors to transfer
- Formula: Transfer time = (bytes to transfer) / (bytes per second)

---

### Section 4: RAID Systems

**4.1** RAID stands for:

**Answer: a) Redundant Array of Independent Disks**

**Explanation:**
- RAID = Redundant Array of Independent Disks
- Originally: Redundant Array of Inexpensive Disks
- Now: Independent (not necessarily inexpensive)
- Combines multiple disks for performance and/or reliability

---

**4.2** RAID 0 provides:

**Answer: b) No redundancy, only striping**

**Explanation:**
- RAID 0: Striping only
  - Data split across multiple disks
  - No redundancy (no fault tolerance)
  - Best performance
  - If one disk fails, all data lost
- Used when performance > reliability

---

**4.3** RAID 1 provides:

**Answer: b) Mirroring (duplication)**

**Explanation:**
- RAID 1: Mirroring
  - Data duplicated on multiple disks
  - Each disk has identical copy
  - Can survive disk failures (up to half disks)
  - Good read performance (can read from either)
  - Write performance = single disk
- High redundancy, lower capacity

---

**4.4** RAID 5 uses:

**Answer: b) Distributed parity across all disks**

**Explanation:**
- RAID 5: Block-level striping with distributed parity
  - Data striped across disks
  - Parity distributed (not on dedicated disk)
  - Can survive one disk failure
  - Good read performance
  - Write performance reduced (parity calculation)
- Efficient use of capacity

---

**4.5** Which RAID level provides the best read performance with redundancy?

**Answer: c) RAID 5**

**Explanation:**
- RAID 5 provides:
  - Redundancy (survive 1 disk failure)
  - Good read performance (can read from all disks in parallel)
  - Better than RAID 1 for reads (more disks contribute)
  - RAID 0 has best performance but no redundancy
  - RAID 1 has redundancy but lower read performance than RAID 5

---

### Section 5: Solid State Drives

**5.1** SSDs use:

**Answer: b) Flash memory (NAND)**

**Explanation:**
- SSDs use NAND flash memory
  - Non-volatile semiconductor memory
  - No moving parts (unlike HDD)
  - Electrical storage (vs. magnetic for HDD)
- Types: SLC, MLC, TLC, QLC (differing density and endurance)

---

**5.2** SSDs have advantages over HDDs in:

**Answer: c) Speed, power consumption, reliability**

**Explanation:**
- SSD advantages:
  - **Speed:** Much faster access (no seek, no rotation)
  - **Power:** Lower power consumption
  - **Reliability:** No moving parts, less mechanical failure
  - **Durability:** Shock resistant
- But: Higher cost per GB, limited write endurance

---

**5.3** A major issue with SSDs is:

**Answer: b) Write endurance (limited write cycles)**

**Explanation:**
- SSDs have limited write cycles:
  - Flash cells wear out after many writes
  - Typical: 1,000-10,000 write cycles per cell
  - Wear leveling distributes writes
  - Over-provisioning helps
- HDDs don't have this limitation (magnetic doesn't wear)

---

**5.4** Write amplification in SSDs refers to:

**Answer: b) Writing more data than requested due to block erasure**

**Explanation:**
- Write amplification:
  - Flash must erase entire block before writing
  - To write one page, may need to:
    - Read entire block
    - Erase block
    - Write updated block
  - Results in writing more data than requested
  - Reduces performance and endurance

---

**5.5** SSDs typically have:

**Answer: b) Lower latency than HDDs**

**Explanation:**
- SSD latency: 0.1-1 ms (very low)
- HDD latency: 5-15 ms (much higher)
- SSDs have no seek time or rotational latency
- Electrical access is much faster than mechanical

---

### Section 6: Optical Storage

**6.1** CD-ROM stands for:

**Answer: a) Compact Disk Read Only Memory**

**Explanation:**
- CD-ROM = Compact Disk Read Only Memory
- Read-only optical storage
- 650-700 MB capacity
- Uses pits and lands for data storage

---

**6.2** Optical disks store data using:

**Answer: b) Pits and lands (reflective surface)**

**Explanation:**
- Optical storage uses:
  - **Pits:** Depressions in reflective surface
  - **Lands:** Flat reflective areas
  - Laser reflects differently from pits vs. lands
  - Reflection pattern encodes data
- Different from magnetic (HDD) or electrical (SSD)

---

**6.3** DVD has greater capacity than CD because:

**Answer: b) Smaller pit size and multiple layers**

**Explanation:**
- DVD capacity > CD because:
  - Smaller pit size (shorter wavelength laser)
  - Tighter track spacing
  - Multiple layers (can have 2 layers per side)
  - Same physical size but more data density
- CD: 700 MB, DVD: 4.7-17 GB

---

**6.4** Blu-ray uses:

**Answer: b) Blue-violet laser (shorter wavelength)**

**Explanation:**
- Blu-ray uses blue-violet laser:
  - Shorter wavelength than red (CD/DVD)
  - Allows smaller pits and tighter tracks
  - Higher data density
  - Capacity: 25-50 GB per layer
- Name comes from blue laser

---

**6.5** Optical storage is primarily used for:

**Answer: b) Backup and distribution**

**Explanation:**
- Optical storage uses:
  - Software distribution
  - Media distribution (music, video)
  - Backup and archive
  - Not typically used for primary storage (too slow)
- Advantages: portable, durable, cheap

---

### Section 7: Magnetic Tape

**7.1** Magnetic tape is characterized by:

**Answer: b) Slow sequential access**

**Explanation:**
- Magnetic tape:
  - Sequential access (must read through in order)
  - Very slow random access (must rewind/fast-forward)
  - Fast sequential transfer (when already positioned)
  - Used for backup/archive where sequential is acceptable

---

**7.2** Magnetic tape is primarily used for:

**Answer: b) Backup and archive**

**Explanation:**
- Tape uses:
  - Long-term backup
  - Archive storage
  - Disaster recovery
  - Not for primary storage (too slow for random access)
- Advantages: very cheap per GB, high capacity

---

**7.3** Tape access is:

**Answer: b) Sequential access**

**Explanation:**
- Tape is sequential access:
  - Must read/write in order
  - Cannot jump to arbitrary location quickly
  - Must rewind or fast-forward to reach location
- Contrasts with random access (disk, SSD)

---

**7.4** Tape has advantages in:

**Answer: b) Capacity and cost per GB**

**Explanation:**
- Tape advantages:
  - Very high capacity (terabytes per tape)
  - Very low cost per GB
  - Durable for long-term storage
  - Energy efficient (not always powered)
- Disadvantages: slow access, sequential only

---

**7.5** Tape is typically:

**Answer: b) Slower than disk but cheaper**

**Explanation:**
- Tape vs. disk:
  - Tape: slower access, much cheaper per GB
  - Disk: faster access, more expensive
  - Tape: sequential access only
  - Disk: random access
- Different use cases (tape for archive, disk for active storage)

---

## True/False Solutions

**T/F 1.1** External memory is non-volatile and has large capacity.

**Answer: True**

**Explanation:**
- External memory is non-volatile (persists without power)
- Has very large capacity (terabytes to petabytes)
- These are defining characteristics

---

**T/F 1.2** External memory access time is typically in milliseconds.

**Answer: True**

**Explanation:**
- External memory access: milliseconds
- HDD: 5-15 ms
- SSD: 0.1-1 ms
- Much slower than internal memory (nanoseconds)

---

**T/F 1.3** External memory is faster than main memory (DRAM).

**Answer: False**

**Explanation:**
- External memory is much slower than main memory
- DRAM: 10-100 nanoseconds
- External: milliseconds
- External is slower but larger and non-volatile

---

**T/F 1.4** External memory is used for file storage, virtual memory, and backup.

**Answer: True**

**Explanation:**
- Three primary uses:
  1. File storage
  2. Virtual memory (swap)
  3. Backup and archive
- All are important functions

---

**T/F 2.1** Magnetic disks store data using magnetic fields on rotating platters.

**Answer: True**

**Explanation:**
- Magnetic recording on rotating platters
- Read/write head creates/detects magnetic fields
- Standard HDD technology

---

**T/F 2.2** The read/write head touches the disk surface during operation.

**Answer: False**

**Explanation:**
- Head floats above surface (air cushion)
- Very close but doesn't touch
- Touching would cause head crash and data loss

---

**T/F 2.3** Outer tracks on a disk have more capacity than inner tracks.

**Answer: True**

**Explanation:**
- Outer tracks are longer (larger circumference)
- More sectors fit on outer tracks
- More storage capacity per track

---

**T/F 2.4** Multiple platters in a disk drive rotate together on the same spindle.

**Answer: True**

**Explanation:**
- All platters on single spindle
- Rotate together at same speed
- Heads move together (same track on all surfaces)

---

**T/F 3.1** Disk access time = seek time + rotational latency + transfer time.

**Answer: True**

**Explanation:**
- Complete access time includes all three components
- All must complete for data access
- Standard formula

---

**T/F 3.2** Seek time is the time to move the head to the correct track.

**Answer: True**

**Explanation:**
- Seek time = head positioning time
- Move head to correct track
- Depends on distance traveled

---

**T/F 3.3** Average rotational latency equals half the rotation time.

**Answer: True**

**Explanation:**
- Average = 1/2 rotation time
- Assumes random sector access
- Worst: full rotation, Best: 0, Average: 1/2

---

**T/F 3.4** Transfer time depends on rotation speed and data density.

**Explanation:**
- Transfer rate = rotation speed × data density
- Faster rotation = more data per second
- Higher density = more data per track
- Both affect transfer time

---

**T/F 4.1** RAID 0 provides redundancy through mirroring.

**Answer: False**

**Explanation:**
- RAID 0: striping only, no redundancy
- No mirroring, no parity
- Best performance but no fault tolerance

---

**T/F 4.2** RAID 1 provides mirroring (duplication) of data.

**Answer: True**

**Explanation:**
- RAID 1: complete duplication
- Each disk has identical copy
- High redundancy

---

**T/F 4.3** RAID 5 uses distributed parity across all disks.

**Answer: True**

**Explanation:**
- Parity distributed (not on dedicated disk)
- Each disk has some data and some parity
- Can survive one disk failure

---

**T/F 4.4** RAID 6 provides dual distributed parity for fault tolerance.

**Answer: True**

**Explanation:**
- RAID 6: two parity blocks per stripe
- Can survive two disk failures
- More fault tolerant than RAID 5

---

**T/F 5.1** SSDs use flash memory (NAND) for storage.

**Answer: True**

**Explanation:**
- SSDs use NAND flash memory
- Non-volatile semiconductor storage
- No moving parts

---

**T/F 5.2** SSDs have lower latency than HDDs.

**Answer: True**

**Explanation:**
- SSD: 0.1-1 ms latency
- HDD: 5-15 ms latency
- SSDs much faster (no mechanical delays)

---

**T/F 5.3** SSDs have unlimited write endurance.

**Answer: False**

**Explanation:**
- SSDs have limited write cycles
- Flash cells wear out after many writes
- Wear leveling helps but doesn't eliminate limit
- HDDs don't have this limitation

---

**T/F 5.4** Write amplification is a concern with SSDs.

**Answer: True**

**Explanation:**
- Write amplification: writing more than requested
- Due to block erasure requirement
- Reduces performance and endurance
- Managed through various techniques

---

**T/F 6.1** Optical disks store data using pits and lands.

**Answer: True**

**Explanation:**
- Pits and lands on reflective surface
- Laser reflection encodes data
- Standard optical storage method

---

**T/F 6.2** DVD has greater capacity than CD due to smaller pit size.

**Answer: True**

**Explanation:**
- Smaller pits (shorter wavelength laser)
- Tighter track spacing
- More data density
- Higher capacity

---

**T/F 6.3** Blu-ray uses a blue-violet laser for higher density.

**Answer: True**

**Explanation:**
- Blue-violet laser (shorter wavelength)
- Allows even smaller pits
- Highest density of optical formats
- Name comes from blue laser

---

**T/F 6.4** Optical storage is primarily used for backup and distribution.

**Answer: True**

**Explanation:**
- Software/media distribution
- Backup and archive
- Not primary storage (too slow)
- Portable and durable

---

**T/F 7.1** Magnetic tape provides fast random access.

**Answer: False**

**Explanation:**
- Tape: sequential access only
- Very slow random access (must rewind/fast-forward)
- Fast sequential when positioned correctly

---

**T/F 7.2** Tape is primarily used for backup and archive.

**Answer: True**

**Explanation:**
- Long-term backup
- Archive storage
- Disaster recovery
- Not for active/primary storage

---

**T/F 7.3** Tape access is sequential, not random.

**Answer: True**

**Explanation:**
- Must read/write in order
- Cannot jump to arbitrary location quickly
- Sequential access model

---

**T/F 7.4** Tape has advantages in capacity and cost per GB.

**Answer: True**

**Explanation:**
- Very high capacity (terabytes per tape)
- Very low cost per GB
- Best for large-scale archive storage

---

*[Continued in Part 2 with Short Answer Solutions...]*

