# Group 5: External Memory & Storage Systems - Exam Summary

## Key Exam Topics

### 1. Magnetic Disk Fundamentals (MCQ/Short Answer)
**Physical Structure:**
- **Platter:** Circular disk with magnetizable coating
- **Substrate:** Modern = Glass (better than aluminum)
- **Read/Write Head:** Conductive coil, stationary while platter rotates
- **Tracks:** Concentric rings
- **Sectors:** Divisions of tracks
- **Cylinders:** Same track across all platters

**Key Point:** Head stationary, platter rotates.

### 2. Disk Organization (MCQ/Comparison)
**Constant Angular Velocity (CAV):**
- Constant rotation speed
- Same bits per track (waste on outer tracks)
- Simple addressing

**Zoned Bit Recording (ZBR):**
- Surface divided into zones
- Outer zones have more bits per track
- Better capacity utilization
- More complex circuitry

**Modern Practice:** ZBR for better capacity.

### 3. Disk Performance Parameters (Calculation)
**Access Time Components:**
```
Total Access Time = Seek Time + Rotational Latency + Transfer Time
```

**A. Seek Time:**
- Time to move head to correct track
- **Average:** 3-15 ms
- **Track-to-track:** 0.5-2 ms
- **Full stroke:** 10-25 ms
- **Average ≈ 1/3 of full stroke**

**B. Rotational Latency:**
- Time waiting for desired sector
- **Average = (1/2) × (60 / RPM) × 1000 ms**
- **5400 RPM:** 5.56 ms
- **7200 RPM:** 4.17 ms
- **10000 RPM:** 3.00 ms
- **15000 RPM:** 2.00 ms

**C. Transfer Time:**
- Time to actually transfer data
- Depends on rotation speed and sectors per track

**Example Calculation:**
- Seek: 8 ms
- 7200 RPM: 4.17 ms latency
- 100 sectors/track, 1 sector transfer: 0.083 ms
- **Total: 8 + 4.17 + 0.083 = 12.25 ms**

### 4. RAID Systems (MCQ/Calculation/Comparison)
**RAID 0 (Striping):**
- **Redundancy:** None
- **Fault Tolerance:** 0 disks
- **Capacity:** N × disk capacity (no overhead)
- **Performance:** High (parallel access)
- **Use:** Performance, non-critical data

**RAID 1 (Mirroring):**
- **Redundancy:** Full copy
- **Fault Tolerance:** 1 disk
- **Capacity:** (N/2) × disk capacity (50% overhead)
- **Performance:** Good read, medium write
- **Use:** Critical data, small arrays

**RAID 5 (Distributed Parity):**
- **Redundancy:** Parity distributed
- **Fault Tolerance:** 1 disk
- **Capacity:** (N-1) × disk capacity (1 disk overhead)
- **Performance:** Good read, medium write
- **Use:** General-purpose, network servers

**RAID 6 (Dual Parity):**
- **Redundancy:** Two parities
- **Fault Tolerance:** 2 disks
- **Capacity:** (N-2) × disk capacity (2 disks overhead)
- **Performance:** Good read, low write
- **Use:** Critical data, large arrays

**Capacity Calculation:**
- **RAID 0:** 5 disks × 1 TB = **5 TB**
- **RAID 1:** 4 disks × 500 GB = (4/2) × 500 GB = **1 TB**
- **RAID 5:** 5 disks × 1 TB = (5-1) × 1 TB = **4 TB**
- **RAID 6:** 6 disks × 1 TB = (6-2) × 1 TB = **4 TB**

### 5. Solid State Drives (SSD) (MCQ/Comparison)
**Advantages over HDD:**
- **High IOPS:** Much higher random I/O
- **Durability:** Less susceptible to shock/vibration
- **Longer Lifespan:** No mechanical wear
- **Lower Power:** Less power consumption
- **Quieter/Cooler:** No moving parts
- **Lower Latency:** 10x+ faster (no seek/rotation)

**Limitations:**
- **Write Endurance:** Finite write cycles (1K-100K per cell)
- **Write Amplification:** Must erase entire block to write page
- **Solutions:** Wear leveling, caching, over-provisioning, TRIM

### 6. Optical Storage (MCQ/Short Answer)
**Types:**
- **CD:** 700 MB
- **DVD:** 4.7-17 GB
- **Blu-ray:** 25-50 GB

**Categories:**
- **Read-only:** CD-ROM, DVD-ROM, BD-ROM
- **Write-once:** CD-R, DVD-R, BD-R
- **Rewritable:** CD-RW, DVD-RW, BD-RE

**Physical Structure:**
- **Single spiral track** (not concentric like magnetic disk)
- **Pits and lands** encode data
- **Laser reflection** reads data

**Evolution:** CD → DVD → Blu-ray (shorter wavelength = higher capacity)

### 7. Magnetic Tape (MCQ/Short Answer)
**Characteristics:**
- **Sequential access only**
- **Very large capacity:** Terabytes per tape
- **Very low cost per GB**
- **Very slow:** Random access impractical
- **Use:** Backup, archive, large sequential files

**When to Use:**
- Sequential access (reading entire files)
- Large files (terabytes)
- Archive/long-term storage
- **Not for:** Random access, frequent access

### 8. Storage Comparison (MCQ/Comparison)
**Performance (Typical):**
- **HDD:** 100-200 MB/s sequential, 1-10 MB/s random, 5-15 ms access
- **SSD:** 500-3000 MB/s, 0.1 ms access
- **Optical:** 1-20 MB/s, 100-200 ms access
- **Tape:** 100-300 MB/s sequential, seconds access

**Cost per GB:**
- **HDD:** $0.01-0.05
- **SSD:** $0.10-0.50
- **Optical:** $0.001-0.01
- **Tape:** $0.001-0.01

**Use Cases:**
- **HDD:** Large capacity, cost-sensitive, desktop
- **SSD:** Performance-critical, OS/programs, mobile
- **Optical:** Distribution, archive, small backup
- **Tape:** Enterprise backup, long-term archive

---

## Common Exam Questions

### Calculation Questions:
1. **Disk Access Time:** Seek + Rotational Latency + Transfer
2. **Rotational Latency:** (1/2) × (60/RPM) × 1000 ms
3. **RAID Capacity:** Calculate usable capacity for different RAID levels
4. **Transfer Rate:** Sectors per track × sector size / time per revolution

### True/False:
- "RAID 0 provides fault tolerance" → **False** (no redundancy)
- "SSD has no moving parts" → **True**
- "Tape supports random access" → **False** (sequential only)

### MCQ Topics:
- Which RAID level has no redundancy? → **RAID 0**
- Which storage has fastest random access? → **SSD**
- What is average rotational latency for 7200 RPM? → **4.17 ms**

### Comparison Questions:
- Compare RAID levels (redundancy, capacity, performance)
- Compare storage technologies (speed, cost, use cases)
- Compare CAV vs. ZBR

### Diagram Questions:
- Label disk structure (platter, track, sector, cylinder)
- Show RAID organization (striping, mirroring, parity)
- Draw optical disk structure (spiral track, pits/lands)

---

## Key Formulas

1. **Access Time:** Seek Time + Rotational Latency + Transfer Time
2. **Average Rotational Latency:** (1/2) × (60 / RPM) × 1000 ms
3. **RAID 0 Capacity:** N × disk capacity
4. **RAID 1 Capacity:** (N/2) × disk capacity
5. **RAID 5 Capacity:** (N-1) × disk capacity
6. **RAID 6 Capacity:** (N-2) × disk capacity
7. **Transfer Rate:** Data per track / Time per revolution

---

## Critical Definitions

- **Seek Time:** Time to move head to track
- **Rotational Latency:** Time waiting for sector
- **RAID:** Redundant Array of Independent Disks
- **Striping:** Data distributed across disks
- **Mirroring:** Duplicate copy on separate disk
- **Parity:** Error correction information
- **Write Amplification:** Writing more data than requested (SSD)

---

## Performance Optimization

**Disk Performance:**
- Faster rotation → Lower latency, higher transfer rate
- Higher data density → More data per track
- Multiple platters → More capacity
- Cache → Faster access for cached data
- Disk scheduling → Minimize seek time

**RAID Selection:**
- **Performance:** RAID 0
- **Reliability:** RAID 1, 5, 6
- **Balance:** RAID 5 (most common)
- **Maximum Reliability:** RAID 6
