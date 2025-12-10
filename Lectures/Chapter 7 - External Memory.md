# Chapter 7 - External Memory

## Page 1

<img src="./Chapter%207%20-%20External%20Memory_images/page_1_img_1.png" alt="Image 1 from page 1" />

External Memory

Chapter 7

Based on: 
William Stallings 
Computer Organization and Architecture, 11th Global Edition


## Page 2

Storage


Files (programs, data, settings)


Virtual memory


Performance

Throughput (improving, not as quickly as processor speed)
Latency (improving but very slowly)


Reliability


Very diverse types of storage

Magnetic disks
Optical disks
Magnetic tapes

2


## Page 3

Magnetic Disk


Examples: hard disk (hard drive), floppy disks


Circular platter constructed of nonmagnetic material, called the substrate, coated with a 
magnetizable material


Substrate used to be aluminium


Now glass

Improvement in the uniformity of the magnetic film surface to increase disk reliability
Significant reduction in overall surface defects to help reduce read-write errors
Better stiffness to reduce disk dynamics
Greater ability to withstand shock and damage

3


## Page 4

<img src="./Chapter%207%20-%20External%20Memory_images/page_4_img_1.png" alt="Image 1 from page 4" />

Disk Data 
Layout

4


## Page 5

Magnetic Read and Write Mechanisms


Recording & retrieval via conductive coil called a head

May be single read/write head or separate ones
During read/write, head is stationary, platter rotates

Write

Current through coil produces magnetic field
Pulses sent to head
Magnetic pattern recorded on surface below

Read (traditional)

Magnetic field moving relative to coil produces current
Coil is the same for read and write

Read (contemporary)

Separate read head, close to write head
Partially shielded magneto resistive (MR) sensor
Electrical resistance depends on direction of magnetic field
High frequency operation

5


## Page 6

Data Organization and Formatting


Concentric rings or tracks

Gaps between tracks

Prevent, or at least minimize, errors due to misalignment of the head or interference of

magnetic fields
Reduce gap to increase capacity
Same number of bits per track (variable packing density)


Tracks divided into sectors


Minimum block size is one sector

6


## Page 7

Disk Velocity


Bit near center of rotating disk passes fixed point (such as a read-write head) slower than bit on 
outside of disk

Find a way to compensate for the variation in speed so that the head can read all data bits at the 
same rate

Increase spacing between bits in different tracks 

Rotate disk at constant angular velocity (CAV)

Gives pie shaped sectors and concentric tracks
Individual tracks and sectors addressable
Move head to given track and wait for given sector
Waste of space on outer tracks

Lower data density

Can use zones to increase capacity

Surface is divided into a number of concentric zones 
Each zone contains a number of contiguous tracks 
Within a zone, the number of bits per track is constant 
More complex circuitry

7


## Page 8

Comparison of Disk Layout Methods

<img src="./Chapter%207%20-%20External%20Memory_images/page_8_img_1.png" alt="Image 1 from page 8" />

Zones farther from the center 
contain more bits (more sectors) 
than zones closer to the center

15 tracks organized into 5

zones
innermost 2 zones have 2

tracks each, each track 
having 9 sectors
next zone has 3 tracks, each

with 12 sectors
outermost 2 zones have 4

tracks each, each track 
having 16 sectors

8


## Page 9

Finding Sectors


Must be able to identify start of track and sector


Format disk

Additional information not available to user
Marks tracks and sectors

<img src="./Chapter%207%20-%20External%20Memory_images/page_9_img_1.png" alt="Image 1 from page 9" />

Winchester Disk Format 
(Seagate ST506)

9


## Page 10

Physical Characteristics of Disk Systems

<img src="./Chapter%207%20-%20External%20Memory_images/page_10_img_1.png" alt="Image 1 from page 10" />

10


## Page 11

Characteristics


Fixed-head disk

One read-write head per track
Heads mounted on fixed ridged arm that extends across all tracks

Moveable-head disk

One read-write head per side
Mounted on a movable arm (can be extended or retracted)

Non-removable disk

Permanently mounted in the disk drive
E.g. Hard disk in a personal computer

Removable disk

Can be removed and replaced with another disk
Provides unlimited storage capacity
Easy data transfer between systems
E.g. floppy disks

Double sided disk

Magnetizable coating is applied to both sides of the platter

11


## Page 12

Typical Hard Disk Drive Parameters

<img src="./Chapter%207%20-%20External%20Memory_images/page_12_img_1.png" alt="Image 1 from page 12" />

12


## Page 13

Disk Performance Parameters


To read or write, the head must be positioned at the desired track and at the beginning of the 
desired sector on the track


Seek time

Moving head to correct track


Rotational delay (rotational latency)

Waiting for data to rotate under head


Access time = Seek + Latency

Getting into position to read or write


Transfer time

Data transfer portion of the operation
Read until end of sector is seen by the head
Depends on how fast the disk is spinning and how many sectors per track

13


## Page 14

Timing of a Disk I/O Transfer

<img src="./Chapter%207%20-%20External%20Memory_images/page_14_img_1.png" alt="Image 1 from page 14" />

14


## Page 15

Timing of a Disk I/O Transfer

<img src="./Chapter%207%20-%20External%20Memory_images/page_15_img_1.png" alt="Image 1 from page 15" />


Access to disk are happening one at a time


Can’t access another track until we are done with this one and then move to another track

15


## Page 16

Example


1000 cylinders, 10 sectors/track


Head assembly at cylinder 0 initially


Head moves at 10 s/cylinder


Disk rotates 100 times/second


What is the average time to read a randomly chosen byte from this disk?

16


## Page 17

RAID


Redundant Array of Independent Disks


7 levels


Not a hierarchy


Set of physical disks viewed as single logical drive by OS


Data distributed across physical drives


Can use redundant capacity to store parity information

17


## Page 18

RAID Levels

<img src="./Chapter%207%20-%20External%20Memory_images/page_18_img_1.png" alt="Image 1 from page 18" />

18


## Page 19

RAID 0


No redundancy

<img src="./Chapter%207%20-%20External%20Memory_images/page_19_img_1.png" alt="Image 1 from page 19" />


Data striped across all disks


Round Robin striping


Increase speed

Multiple data requests probably not on same disk
Disks seek in parallel
A set of data is likely to be striped across multiple disks

19


## Page 20

Data Mapping for RAID 0

<img src="./Chapter%207%20-%20External%20Memory_images/page_20_img_1.png" alt="Image 1 from page 20" />

20


## Page 21

RAID 1


Mirrored Disks


Recovery is simple

Swap faulty disk & re-mirror
No down time


Data is striped across disks


2 copies of each stripe on separate disks


Expensive


Read from either


Write to both

<img src="./Chapter%207%20-%20External%20Memory_images/page_21_img_1.png" alt="Image 1 from page 21" />

21


## Page 22

RAID 2


Very small strips

Often single byte/word


Error correction calculated across corresponding bits on disks


Multiple parity disks store Hamming code error correction in corresponding positions


Lots of redundancy

Expensive
Not used

<img src="./Chapter%207%20-%20External%20Memory_images/page_22_img_1.png" alt="Image 1 from page 22" />

22


## Page 23

RAID 3


Similar to RAID 2


Only one redundant disk, no matter how large the array


Simple parity bit for each set of corresponding bits


Data on failed drive can be reconstructed from surviving data and parity info

<img src="./Chapter%207%20-%20External%20Memory_images/page_23_img_1.png" alt="Image 1 from page 23" />

23


## Page 24

RAID 4


Each disk operates independently


Good for high I/O request rate; separate I/O requests can be satisfied in parallel


Large stripes


Bit by bit parity calculated across stripes on each disk


Parity stored on parity disk

<img src="./Chapter%207%20-%20External%20Memory_images/page_24_img_1.png" alt="Image 1 from page 24" />

24


## Page 25

RAID 5


Like RAID 4


Parity striped across all disks


Round robin allocation for parity stripe


Avoids RAID 4 bottleneck at parity disk


Commonly used in network servers

<img src="./Chapter%207%20-%20External%20Memory_images/page_25_img_1.png" alt="Image 1 from page 25" />

25


## Page 26

RAID 6


Two parity calculations


Stored in separate blocks on different disks


User requirement of N disks needs N+2


High data availability

Three disks need to fail for data loss
Significant write penalty

<img src="./Chapter%207%20-%20External%20Memory_images/page_26_img_1.png" alt="Image 1 from page 26" />

26


## Page 27

RAID Comparison

<img src="./Chapter%207%20-%20External%20Memory_images/page_27_img_1.png" alt="Image 1 from page 27" />

27


## Page 28

RAID Comparison (cont’d)

<img src="./Chapter%207%20-%20External%20Memory_images/page_28_img_1.png" alt="Image 1 from page 28" />

28


## Page 29

Solid State Drives


Most significant development to complement or even replace hard disk drives (HDDs) both as 
internal and external memory


Solid state: electronic circuitry built with semiconductors


Use NAND flash memory


As the cost of flash-based SSDs has dropped and the performance and bit density increased, 
SSDs have become increasingly competitive with HDDs.

29


## Page 30

SSD Compared to HDD


SSDs have the following advantages over HDDs:

High-performance input/output operations per second (IOPS)
Durability:

Less susceptible to physical shock and vibration
Longer lifespan:

SSDs are not susceptible to mechanical wear
Lower power consumption:

SSDs use considerably less power than comparable size HDDs
Quieter and cooler running capabilities:

Less space required, lower energy costs, and a greener enterprise
Lower access times and latency rates:

Over 10 times faster than the spinning disks in an HDD

30


## Page 31

<img src="./Chapter%207%20-%20External%20Memory_images/page_31_img_1.png" alt="Image 1 from page 31" />

Solid State Drive Architecture

SSD contains the following components:

Interface to the host system

Controller

Addressing

Data buffer/cache

Error correction

Flash memory components

31


## Page 32

Practical Issues


Flash memory becomes unusable after a 
certain number of writes


SSD performance has a tendency to 
slow down as the device is used


Techniques for prolonging life:


To write a page onto flash memory

Front-ending the flash with a cache to

The entire block must be read from

delay and group write operations
Using wear-leveling algorithms that

the flash memory and placed in a 
RAM buffer
Before the block can be written back

evenly distribute writes across block 
of cells

to flash memory, the entire block of 
flash memory must be erased
The entire block from the buffer is


Most flash devices estimate their own 
remaining lifetimes so systems can 
anticipate failure and take preemptive 
action

now written back to the flash memory

32


## Page 33

Hybrid Magnetic-Flash


Magnetic disk

Low $/GB
Huge capacity
Power hungry
Slow (mechanical movement)
Sensitive to impacts while spinning (head likely to scratch surface of disk)


Flash


Have both

Fast
Power efficient
No moving parts

Use flash as cache for disk
Most of data is on disk
Data we frequently access is on

the flash

33


## Page 34

Flash vs Disk vs both - Example


Play game for 2 hours (reads to 2 GB, writes another 10MB)


Watch movie for 2 hours (read 1 GB sequentially)


Repeat 4 times!


Disk: read 100MB/s sequential, read/write 1 MB/s random


Flash: 1GB/s

1) total access time with disk

2) total access time with flash

3) total access time with disk and 4GB flash

34


## Page 35

Optical Disk Products

<img src="./Chapter%207%20-%20External%20Memory_images/page_35_img_1.png" alt="Image 1 from page 35" />

35


## Page 36

Compact Disk Read Only Memory (CD-ROM)


Originally for audio


Polycarbonate coated with highly reflective coat, usually aluminium


Data read by reflecting laser


To achieve greater capacity, the disk contains a single spiral track, beginning near the center and 
spiraling out to the outer edge of the disk


Data capacity about 680 MB

CD-ROM block format
CD operation

<img src="./Chapter%207%20-%20External%20Memory_images/page_36_img_1.png" alt="Image 1 from page 36" />

<img src="./Chapter%207%20-%20External%20Memory_images/page_36_img_2.png" alt="Image 2 from page 36" />

36


## Page 37

Magnetic Tape

<img src="./Chapter%207%20-%20External%20Memory_images/page_37_img_1.jpeg" alt="Image 1 from page 37" />


Backup and archive (secondary storage)


Large capacity, replaceable


Slow


Sequential access


Dying out

Low production volume

Cost not dropping as rapidly as disks
Cheaper to use disks

Image from IEEE Spectrum

USB drives

37


## Page 38

Disk, Tape, Both, Neither


Read 1 GB file from start to end

Disk                                         Tape


Read just first and last byte of 1 GB file

Disk                                          Tape


Make a cat happy

Disk                                          Tape

38

