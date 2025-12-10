# Chapter 6 - Internal Memory

## Page 1

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_1_img_1.png" alt="Image 1 from page 1" />

Internal Memory

Chapter 6

Based on: 
William Stallings 
Computer Organization and Architecture, 11th Global Edition


## Page 2

Memory Cell Operation

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_2_img_1.png" alt="Image 1 from page 2" />

2


## Page 3

Semiconductor Memory Types

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_3_img_1.png" alt="Image 1 from page 3" />

3


## Page 4

Semiconductor Memory


RAM

Misuse of the term as all semiconductor memory is random access
Read/Write
Volatile
Temporary storage
Static or dynamic

4


## Page 5

Dynamic RAM Structure

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_5_img_1.png" alt="Image 1 from page 5" />

5


## Page 6

DRAM Operation


Address line active when bit read or written

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_6_img_1.png" alt="Image 1 from page 6" />

Transistor switch closed (current flows)


Write

Voltage to bit line

High for 1, low for 0
Then signal address line

Transfers charge to capacitor


Read

Address line selected

Transistor turns on
Charge from capacitor fed via bit line to sense amplifier

Compares with reference value to determine 1 or 0
Capacitor charge must be restored

6


## Page 7

Dynamic RAM


Bits (data) stored as charge in capacitors

Presence or absence of charge in a capacitor is interpreted as a binary 1 or 0

Charges leak

Need periodic refreshing to maintain data storage

Dynamic: tendency of the stored charge to leak away, even with power continuously applied

Simpler construction

Smaller per bit

Less expensive

Need refresh circuits

Slower

Main memory

Essentially analogue: level of charge determines value

7


## Page 8

Static RAM


Bits stored as on/off switches


No charges to leak


No refreshing needed when powered


More complex construction


Larger per bit


More expensive


Does not need refresh circuits


Faster


Cache

8


## Page 9

Static RAM Structure

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_9_img_1.png" alt="Image 1 from page 9" />

9


## Page 10

Static RAM Operation


Transistor arrangement gives stable logic state

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_10_img_1.png" alt="Image 1 from page 10" />


State 1

C1 high, C2 low
T1 T4 off, T2 T3 on


State 0

C2 high, C1 low
T2 T3 off, T1 T4 on


Address line transistors T5 T6 is switch


Write

Apply value to B and complement to


Read

Value is on line B

10


## Page 11

SRAM vs DRAM


Both volatile

Power needed to preserve data


Dynamic cell

Simpler to build, smaller
More dense (smaller cells more cells per unit area)
Less expensive
Needs refresh
Tend to be favored for large memory requirements
Used for main memory


Static cell

Faster
Used for cache memory (on and off chip)

11


## Page 12

Organization in detail


A 16Mbit chip can be organized as 1M of 16 bit words


A bit per chip system has 16 lots of 1 Mbit chip with bit 1 of each word in chip 1 and so on


A 16 Mbit chip can be organized as a 2048 x 2048 x 4 bit array

Reduces number of address pins

Multiplex row and column address
11 pins to address (211 = 2048)
Adding one more pin doubles range of values so x4 capacity

12


## Page 13

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_13_img_1.png" alt="Image 1 from page 13" />

Typical 16 Mb 
DRAM (4M x 4)

13


## Page 14

Refreshing


Refresh circuit included on chip


Disable chip


Count through rows


Read and Write back


Takes time


Slows down apparent performance

14


## Page 15

Packaging

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_15_img_1.png" alt="Image 1 from page 15" />

15


## Page 16

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_16_img_1.png" alt="Image 1 from page 16" />

Module Organization

256-KByte memory organization

16


## Page 17

Module Organization

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_17_img_1.png" alt="Image 1 from page 17" />

1-MB memory organization

17


## Page 18

Interleaved Memory


Main memory is composed of a collection of DRAM memory chips.


A number of chips can be grouped together to form a memory bank.


It is possible to organize the memory banks as interleaved memory.

Each bank is independently able to service a memory read or write request.
A system with K banks can service K requests simultaneously, increasing memory read or

write rates by a factor of K.


If consecutive words of memory are stored in different banks, then the transfer of a block of 
memory is speeded up.

18


## Page 19

Error Correction


Hard failure

Permanent defect


Soft error

Random, non-destructive
No permanent damage to memory


Detected using Hamming error correcting code

19


## Page 20

Error Correcting Code Function

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_20_img_1.png" alt="Image 1 from page 20" />

20


## Page 21

Hamming Error Correcting Code

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_21_img_1.png" alt="Image 1 from page 21" />

21


## Page 22

Increase in Word Length with Error Correction

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_22_img_1.png" alt="Image 1 from page 22" />

22


## Page 23

Layout of Data Bits and Check Bits

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_23_img_1.png" alt="Image 1 from page 23" />

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_23_img_2.png" alt="Image 2 from page 23" />

23


## Page 24

Check Bit Calculation

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_24_img_1.png" alt="Image 1 from page 24" />

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_24_img_2.png" alt="Image 2 from page 24" />

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_24_img_3.png" alt="Image 3 from page 24" />

24


## Page 25

Advanced DRAM Organization


Interface to main internal memory is the most critical bottleneck when using high performance 
processors


Traditional DRAM constrained by

Internal architecture
Interface to processor’s memory bus


Enhanced DRAM

SDRAM
DDR-DRAM

25


## Page 26

Synchronous DRAM (SDRAM)


Access is synchronized with an external clock


Address is presented to RAM


RAM finds data (CPU waits in conventional DRAM)


Since SDRAM moves data in time with system clock, CPU knows when data will be ready


CPU does not have to wait, it can do something else


Burst mode allows SDRAM to set up stream of data and fire it out in block

26


## Page 27

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_27_img_1.png" alt="Image 1 from page 27" />

256 Mb 
SDRAM

27


## Page 28

SDRAM Operation

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_28_img_1.png" alt="Image 1 from page 28" />

28


## Page 29

Double Data Rate SDRAM – DDR SDRAM


Sends data twice per clock cycle (leading and trailing edge)


Achieves higher data rates in 3 ways:

Data transfer is synchronized to both the rising and falling edge of the clock, rather than just

the rising edge
Uses higher clock rate on the bus to increase the transfer rate
Buffering scheme is used

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_29_img_1.png" alt="Image 1 from page 29" />

29


## Page 30

Read Only Memory (ROM)


Permanent storage

Nonvolatile


Microprogramming


Library subroutines


Systems programs (BIOS)


Function tables

30


## Page 31

Types of ROM

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_31_img_1.png" alt="Image 1 from page 31" />


Written during manufacture

Very expensive for small runs


Programmable (once)

PROM
Needs special equipment to program


Read “mostly”

Erasable Programmable (EPROM)

Erased by UV
Electrically Erasable (EEPROM)

Takes much longer to write than read
Flash memory

Erase whole memory electrically

31


## Page 32

Flash Memory


Used both for internal memory and external memory applications


First introduced in the mid 1980’s


Is intermediate between EPROM and EEPROM in both cost and functionality


Uses an electrical erasing technology like EEPROM


It is possible to erase just blocks of memory rather than an entire chip


Gets its name because the microchip is organized so that a section of memory cells are erased in 
a single action


Uses only one transistor per bit so it achieves the high density of EPROM


Persistent

Retains data when there is no power applied to the memory
Useful for secondary (external) storage, and as an alternative to random access memory

32


## Page 33

Flash Memory Structures

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_33_img_1.png" alt="Image 1 from page 33" />

33


## Page 34

Kiviat Graphs for Flash Memory

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_34_img_1.png" alt="Image 1 from page 34" />

34


## Page 35

Nonvolatile RAM within the Memory Hierarchy

<img src="./Chapter%206%20-%20Internal%20Memory_images/page_35_img_1.jpeg" alt="Image 1 from page 35" />

35


## Page 36

Nonvolatile RAM Technologies


STT-RAM


new type of magnetic RAM (MRAM), which features non-volatility, fast writing/reading speed, and high programming 
endurance and zero standby power

storage capability or programmability of MRAM from magnetic tunneling junction (MTJ), in which a thin tunneling 
dielectric is sandwiched between two ferromagnetic layers

good candidate for either cache or main memory

PCRAM


Phase-change RAM, the most mature of the new technologies

based on a chalcogenide alloy material, similar to those commonly used in optical storage media (compact discs and 
digital versatile discs)

good candidate to replace or supplement DRAM for main memory

ReRAM (also known as RRAM)


works by creating resistance rather than directly storing charge. An electric current is applied to a material, changing 
the resistance of that material. 

finding appropriate materials and measuring the resistance state of the cells 

low voltage, endurance is far superior to flash memory, and the cells are much smaller—at least in theory

good candidate to replace or supplement both secondary storage and main memory

36

