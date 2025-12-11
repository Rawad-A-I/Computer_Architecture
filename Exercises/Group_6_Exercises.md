# Group 6: Input/Output Systems & Interfaces
## Comprehensive Exercises

**Chapter 8: Input/Output**

---

## Table of Contents
1. [Multiple Choice Questions](#multiple-choice-questions)
2. [True/False Questions](#truefalse-questions)
3. [Short Answer Questions](#short-answer-questions)
4. [Calculation Problems](#calculation-problems)
5. [I/O Technique Analysis](#io-technique-analysis)
6. [Problem-Solving Exercises](#problem-solving-exercises)
7. [Conceptual Questions](#conceptual-questions)
8. [Answer Key](#answer-key)

---

## Multiple Choice Questions

### Section 1: I/O Systems Introduction

**1.1** I/O modules are needed because:

a) Peripherals are always faster than the processor
b) There's a wide variety of peripherals with different characteristics
c) All peripherals use the same data format
d) Peripherals don't need control logic

**1.2** The I/O module acts as:

a) Only a buffer
b) A translator and buffer between system and peripherals
c) Only a translator
d) A direct connection

**1.3** I/O modules interface with the processor via:

a) Only the data bus
b) The system bus or central switch
c) Only the address bus
d) Direct connection

**1.4** Speed mismatch between peripherals and processor means:

a) All peripherals are faster
b) Some peripherals are slower, some faster
c) All peripherals are slower
d) No mismatch exists

**1.5** I/O modules handle:

a) Only data transfer
b) Control, timing, data buffering, and error detection
c) Only error detection
d) Only timing

### Section 2: I/O Module Functions

**2.1** The control and timing function of I/O modules:

a) Only manages device speed
b) Coordinates flow between internal resources and external devices
c) Only handles timing
d) Only controls devices

**2.2** Data buffering in I/O modules:

a) Is not needed
b) Compensates for speed differences between system and devices
c) Only stores data temporarily
d) Only increases speed

**2.3** Error detection in I/O modules includes:

a) Only device errors
b) Device errors, data transmission errors, and protocol errors
c) Only transmission errors
d) Only protocol errors

**2.4** Processor communication involves:

a) Only sending commands
b) Command decoding, data transfer, status reporting, and address recognition
c) Only data transfer
d) Only status reporting

**2.5** Device communication involves:

a) Only sending data
b) Device-specific protocols, control signals, and status signals
c) Only control signals
d) Only status signals

### Section 3: External Devices

**3.1** Human-readable devices include:

a) Only keyboards
b) Keyboard, mouse, display, printer
c) Only displays
d) Only printers

**3.2** Machine-readable devices include:

a) Only disk drives
b) Disk drives, sensors, actuators
c) Only sensors
d) Only actuators

**3.3** Communication devices include:

a) Only network cards
b) Network cards, modems, wireless adapters
c) Only modems
d) Only wireless adapters

**3.4** External devices typically have:

a) Only data connections
b) Control, status, and data connections
c) Only control connections
d) Only status connections

**3.5** Device controllers:

a) Are not needed
b) Handle device-specific operations
c) Only transfer data
d) Only report status

### Section 4: I/O Techniques

**4.1** The three I/O techniques are:

a) Serial, parallel, and USB
b) Programmed I/O, interrupt-driven I/O, and DMA
c) Fast, medium, and slow
d) Direct, indirect, and buffered

**4.2** Programmed I/O means:

a) CPU waits for I/O to complete
b) CPU continues working while I/O operates
c) I/O operates independently
d) No CPU involvement

**4.3** Interrupt-driven I/O means:

a) CPU continuously polls device
b) Device interrupts CPU when ready
c) CPU never waits
d) No interrupts used

**4.4** DMA (Direct Memory Access) means:

a) CPU transfers data directly
b) I/O module transfers data directly to/from memory
c) Memory transfers data directly
d) No data transfer occurs

**4.5** Which I/O technique is most efficient for large transfers?

a) Programmed I/O
b) Interrupt-driven I/O
c) DMA
d) They're all the same

### Section 5: I/O Mapping

**5.1** Memory-mapped I/O means:

a) I/O devices have separate address space
b) I/O devices share memory address space
c) I/O devices don't need addresses
d) Memory is mapped to I/O

**5.2** Isolated I/O (port-mapped I/O) means:

a) I/O devices share memory address space
b) I/O devices have separate address space
c) I/O devices are isolated from system
d) I/O devices don't need addresses

**5.3** Memory-mapped I/O advantage is:

a) Simpler hardware
b) Same instructions for memory and I/O
c) Separate address space
d) More addresses available

**5.4** Isolated I/O advantage is:

a) Simpler instructions
b) Separate address space doesn't reduce memory space
c) Same address space
d) Faster access

**5.5** Most modern systems use:

a) Only memory-mapped I/O
b) Only isolated I/O
c) Both memory-mapped and isolated I/O
d) Neither

### Section 6: Interrupt-Driven I/O

**6.1** Interrupt-driven I/O improves efficiency by:

a) Making I/O faster
b) Allowing CPU to work while I/O operates
c) Eliminating I/O operations
d) Making CPU wait less

**6.2** Device identification in interrupt-driven I/O can use:

a) Only software polling
b) Multiple interrupt lines, daisy chain, bus arbitration, or software poll
c) Only hardware
d) Only interrupts

**6.3** Daisy chain interrupt identification:

a) Uses software polling
b) Uses hardware priority chain
c) Doesn't identify devices
d) Uses separate lines

**6.4** Interrupt priority handling:

a) Is not needed
b) Determines which interrupt to process first
c) Only affects speed
d) Only affects devices

**6.5** Vectored interrupts:

a) Don't identify the device
b) Provide device identification automatically
c) Require software polling
d) Are slower

### Section 7: Direct Memory Access (DMA)

**7.1** DMA is used for:

a) Small data transfers
b) Large block transfers
c) All transfers
d) No transfers

**7.2** DMA controller:

a) Replaces the CPU
b) Transfers data between I/O and memory without CPU
c) Only controls devices
d) Only controls memory

**7.3** During DMA transfer:

a) CPU is always idle
b) CPU can do other work (if bus available)
c) CPU must wait
d) CPU is not involved

**7.4** DMA breakpoint is:

a) Where DMA stops
b) Unit of data transferred in one DMA operation
c) Where DMA starts
d) DMA error point

**7.5** Fly-by DMA:

a) Transfers data through CPU
b) Transfers data directly between I/O and memory
c) Doesn't transfer data
d) Only transfers addresses

### Section 8: I/O Controllers

**8.1** A Programmable Interrupt Controller (PIC):

a) Only generates interrupts
b) Manages multiple interrupt sources and priorities
c) Only processes interrupts
d) Only identifies interrupts

**8.2** A Programmable Peripheral Interface (PPI):

a) Only interfaces one device
b) Provides flexible I/O port configuration
c) Only handles interrupts
d) Only handles DMA

**8.3** I/O controllers provide:

a) Only hardware interface
b) Hardware interface and programmability
c) Only software interface
d) Only device control

**8.4** Controllers handle:

a) Only data transfer
b) Data transfer, control, status, and protocol conversion
c) Only control
d) Only status

**8.5** Programmable controllers allow:

a) Fixed configuration only
b) Software configuration for different devices
c) Hardware configuration only
d) No configuration

### Section 9: Interconnection Standards

**9.1** USB stands for:

a) Universal Serial Bus
b) Unified Serial Bus
c) Universal System Bus
d) Unified System Bus

**9.2** USB advantages include:

a) Only speed
b) Hot-pluggable, standardized, multiple devices
c) Only standardization
d) Only multiple devices

**9.3** SATA is used for:

a) Only network connections
b) Storage devices (hard drives, SSDs)
c) Only USB devices
d) Only displays

**9.4** PCI Express (PCIe) is used for:

a) Only storage
b) High-speed expansion cards (graphics, network)
c) Only USB
d) Only memory

**9.5** Ethernet is used for:

a) Only wireless networking
b) Wired local area networking
c) Only storage
d) Only USB

---

## True/False Questions

**T/F 1.1** I/O modules are needed because peripherals have different characteristics than the processor/memory.

**T/F 1.2** I/O modules act as translators and buffers between system and peripherals.

**T/F 1.3** All peripherals operate at the same speed as the processor.

**T/F 1.4** I/O modules interface with processor via system bus.

**T/F 2.1** I/O modules handle control, timing, data buffering, and error detection.

**T/F 2.2** Data buffering compensates for speed differences between system and devices.

**T/F 2.3** Error detection includes device errors, transmission errors, and protocol errors.

**T/F 2.4** Processor communication involves command decoding, data transfer, and status reporting.

**T/F 3.1** External devices can be human-readable, machine-readable, or communication devices.

**T/F 3.2** All external devices use the same interface.

**T/F 3.3** Device controllers handle device-specific operations.

**T/F 3.4** External devices have control, status, and data connections.

**T/F 4.1** Programmed I/O requires CPU to wait for I/O completion.

**T/F 4.2** Interrupt-driven I/O allows CPU to work while I/O operates.

**T/F 4.3** DMA transfers data directly between I/O and memory without CPU involvement.

**T/F 4.4** DMA is most efficient for large block transfers.

**T/F 5.1** Memory-mapped I/O shares address space with memory.

**T/F 5.2** Isolated I/O uses separate address space for I/O devices.

**T/F 5.3** Memory-mapped I/O allows same instructions for memory and I/O.

**T/F 5.4** Isolated I/O doesn't reduce available memory address space.

**T/F 6.1** Interrupt-driven I/O improves efficiency by allowing CPU to do other work.

**T/F 6.2** Device identification can use hardware (daisy chain, bus arbitration) or software polling.

**T/F 6.3** Vectored interrupts automatically identify the interrupting device.

**T/F 6.4** Interrupt priority determines which interrupt is processed first.

**T/F 7.1** DMA is used for large block transfers.

**T/F 7.2** DMA controller transfers data between I/O and memory without CPU.

**T/F 7.3** During DMA, CPU can do other work if bus is available.

**T/F 7.4** Fly-by DMA transfers data directly between I/O and memory.

**T/F 8.1** Programmable controllers allow software configuration.

**T/F 8.2** I/O controllers handle data transfer, control, status, and protocol conversion.

**T/F 8.3** A PIC manages multiple interrupt sources and priorities.

**T/F 8.4** Controllers provide only hardware interface.

**T/F 9.1** USB is hot-pluggable and supports multiple devices.

**T/F 9.2** SATA is used for storage devices.

**T/F 9.3** PCIe is used for high-speed expansion cards.

**T/F 9.4** Ethernet is used for wired networking.

---

## Short Answer Questions

### Section 1: I/O Systems Introduction

**SA 1.1** Why are I/O modules needed? List the main reasons.

**SA 1.2** What are the two major functions of I/O modules?

**SA 1.3** Explain the speed mismatch problem between peripherals and processor.

**SA 1.4** How do I/O modules solve the problem of different data formats?

### Section 2: I/O Module Functions

**SA 2.1** List and describe the major functions of I/O modules.

**SA 2.2** Explain the control and timing function.

**SA 2.3** How does data buffering work, and why is it needed?

**SA 2.4** What types of errors can I/O modules detect?

**SA 2.5** Describe processor communication in I/O modules.

### Section 3: External Devices

**SA 3.1** List the three categories of external devices and give examples.

**SA 3.2** What connections do external devices typically have?

**SA 3.3** What is the role of device controllers?

**SA 3.4** How do human-readable devices differ from machine-readable devices?

### Section 4: I/O Techniques

**SA 4.1** Compare the three I/O techniques: programmed, interrupt-driven, and DMA.

**SA 4.2** Explain how programmed I/O works and when it's used.

**SA 4.3** Explain how interrupt-driven I/O works and its advantages.

**SA 4.4** Explain how DMA works and when it's most beneficial.

**SA 4.5** When would you choose each I/O technique?

### Section 5: I/O Mapping

**SA 5.1** Explain memory-mapped I/O and its advantages/disadvantages.

**SA 5.2** Explain isolated I/O (port-mapped I/O) and its advantages/disadvantages.

**SA 5.3** Compare memory-mapped I/O and isolated I/O.

**SA 5.4** Which addressing scheme is more common in modern systems?

### Section 6: Interrupt-Driven I/O

**SA 6.1** Why is interrupt-driven I/O more efficient than programmed I/O?

**SA 6.2** List and explain the device identification techniques for interrupts.

**SA 6.3** What is a vectored interrupt, and how does it work?

**SA 6.4** Explain interrupt priority handling and why it's important.

**SA 6.5** Compare hardware and software methods for device identification.

### Section 7: Direct Memory Access

**SA 7.1** Why is DMA used? What problems does it solve?

**SA 7.2** Explain how DMA works, including the role of the DMA controller.

**SA 7.3** What is a DMA breakpoint, and how is it determined?

**SA 7.4** Explain fly-by DMA and its advantages.

**SA 7.5** What happens to the CPU during DMA transfer?

### Section 8: I/O Controllers

**SA 8.1** What is a Programmable Interrupt Controller (PIC), and what does it do?

**SA 8.2** What is a Programmable Peripheral Interface (PPI), and what does it do?

**SA 8.3** What are the advantages of programmable controllers?

**SA 8.4** What functions do I/O controllers typically provide?

### Section 9: Interconnection Standards

**SA 9.1** What are the advantages of USB?

**SA 9.2** Compare SATA, PCIe, and USB in terms of use and performance.

**SA 9.3** What is Ethernet used for, and what are its characteristics?

**SA 9.4** When would you use different interconnection standards?

---

## Calculation Problems

### Problem 1: I/O Technique Performance

**CP 1.1** Compare I/O techniques for transferring 1 MB of data:

**Programmed I/O:**
- CPU checks status every 1 μs
- Device ready after 10 ms
- Transfer rate: 10 MB/s

**Interrupt-Driven I/O:**
- CPU issues command, continues working
- Interrupt after 10 ms
- Handler: 100 cycles at 2 GHz
- Transfer rate: 10 MB/s

**DMA:**
- Setup: 50 cycles at 2 GHz
- Transfer: 10 MB/s
- Completion interrupt: 50 cycles

Calculate:
- a) Time for each technique
- b) CPU time used for each
- c) Efficiency comparison

**CP 1.2** For a device that transfers 100 KB blocks:
- Transfer rate: 50 MB/s
- Setup overhead: 100 μs
- Compare programmed I/O vs. DMA
- Calculate time and CPU overhead for each

### Problem 2: Interrupt Overhead

**CP 2.1** A system processes 1000 I/O interrupts per second:
- Each interrupt handler: 200 cycles
- Clock: 1 GHz
- Calculate:
  - a) Cycles per second for interrupts
  - b) Percentage of CPU time
  - c) If handler optimized to 100 cycles, new percentage

**CP 2.2** Compare interrupt-driven vs. polling:
- Device generates data every 10 ms
- Polling: check every 1 ms (10 cycles per check)
- Interrupt: 200 cycles per interrupt
- Calculate overhead for each over 1 second

### Problem 3: DMA Performance

**CP 3.1** DMA transfer of 1 MB:
- Setup: 50 cycles at 2 GHz
- Transfer rate: 100 MB/s
- Completion interrupt: 50 cycles
- Calculate:
  - a) Total transfer time
  - b) CPU cycles used
  - c) If CPU runs at 2 GHz, CPU time used

**CP 3.2** Compare DMA vs. programmed I/O for 10 MB transfer:
- DMA: 100 MB/s, 100 cycle setup, 50 cycle completion
- Programmed I/O: 50 MB/s, CPU involved throughout
- CPU: 2 GHz
- Calculate time and CPU overhead for each

### Problem 4: Memory-Mapped I/O Address Space

**CP 4.1** A system has:
- 32-bit address bus
- Memory-mapped I/O uses 256 MB for I/O devices
- Calculate:
  - a) Maximum memory capacity
  - b) If isolated I/O used instead, memory capacity?
  - c) Address space trade-off

**CP 4.2** Compare address space usage:
- System A: Memory-mapped I/O (512 MB for I/O)
- System B: Isolated I/O (separate I/O space)
- Both have 32-bit address bus
- Calculate available memory for each

### Problem 5: I/O Throughput

**CP 5.1** A system has multiple I/O devices:
- Device 1: 10 MB/s, 10% of time active
- Device 2: 50 MB/s, 5% of time active
- Device 3: 100 MB/s, 2% of time active
- Bus bandwidth: 1 GB/s
- Calculate:
  - a) Average I/O bandwidth
  - b) Peak I/O bandwidth
  - c) Bus utilization

**CP 5.2** I/O system performance:
- Base system: 1000 IOPS (I/O operations per second)
- With DMA: 5000 IOPS
- With optimized interrupts: 3000 IOPS
- Calculate performance improvement for each

---

## I/O Technique Analysis

### Analysis 1: Technique Selection

**IA 1.1** For each scenario, recommend I/O technique and justify:
- a) Keyboard input (small, infrequent data)
- b) Disk file transfer (large blocks, frequent)
- c) Network packet reception (moderate size, frequent)
- d) Sensor reading (small, periodic)

**IA 1.2** Analyze I/O technique efficiency:
- Workload: 1000 × 4 KB transfers per second
- Compare programmed, interrupt-driven, and DMA
- Consider CPU overhead and total time

### Analysis 2: Interrupt Handling

**IA 2.1** Compare interrupt identification methods:
- 8 I/O devices
- Compare: multiple lines, daisy chain, software poll
- Analyze hardware complexity and speed

**IA 2.2** Interrupt priority analysis:
- 3 devices: High (network), Medium (disk), Low (keyboard)
- High: 100 interrupts/sec
- Medium: 50 interrupts/sec
- Low: 10 interrupts/sec
- Analyze priority handling and potential starvation

### Analysis 3: DMA Configuration

**IA 3.1** Compare DMA configurations:
- Single-bus detached DMA
- Single-bus integrated DMA-I/O
- I/O bus
- Analyze performance and complexity

**IA 3.2** DMA breakpoint analysis:
- Block size: 64 KB
- DMA breakpoint: 1 KB
- Calculate number of DMA operations
- Analyze overhead vs. flexibility

---

## Problem-Solving Exercises

### Problem 1: I/O System Design

**PS 1.1** Design I/O system for:
- 10 I/O devices
- Mix of fast (network) and slow (keyboard) devices
- High throughput required

Determine:
- a) I/O technique for each device type
- b) Interrupt handling method
- c) DMA usage
- d) Bus bandwidth requirements

**PS 1.2** Optimize I/O system:
- Current: Programmed I/O, 50% CPU time on I/O
- Target: < 10% CPU time on I/O
- Options:
  - A: Interrupt-driven I/O
  - B: DMA for large transfers
  - C: Both
- Analyze and recommend

### Problem 2: Performance Optimization

**PS 2.1** Current system:
- Programmed I/O: 1000 IOPS
- CPU utilization: 80%
- Upgrade options:
  - A: Interrupt-driven (2000 IOPS, 40% CPU)
  - B: DMA (5000 IOPS, 20% CPU)
  - C: Both (6000 IOPS, 15% CPU)

Analyze performance and cost for each.

**PS 2.2** I/O bottleneck analysis:
- System: 4 GHz CPU, 1 GB/s bus
- I/O: 10 devices, 50 MB/s each
- Identify bottlenecks
- Recommend solutions

### Problem 3: Interconnection Standards

**PS 3.1** Select interconnection for each device:
- High-speed storage (SSD)
- Graphics card
- Network adapter
- USB devices
- Justify each choice

**PS 3.2** Design system with multiple standards:
- Storage: SATA
- Graphics: PCIe
- Network: Ethernet
- Peripherals: USB
- Analyze bandwidth requirements and potential conflicts

### Problem 4: I/O Architecture

**PS 4.1** Compare I/O architectures:
- Memory-mapped I/O
- Isolated I/O
- Hybrid approach
- Analyze for 32-bit and 64-bit systems

**PS 4.2** Design interrupt system:
- 16 devices
- Mixed priorities
- High performance required
- Recommend hardware/software approach

---

## Conceptual Questions

### Concept 1: I/O System Principles

**CQ 1.1** Why can't peripherals be connected directly to the system bus? What problems would this cause?

**CQ 1.2** Explain the fundamental role of I/O modules in computer systems.

**CQ 1.3** How do I/O modules balance the needs of the processor and the needs of peripheral devices?

### Concept 2: I/O Techniques

**CQ 2.1** Explain the evolution from programmed I/O to interrupt-driven I/O to DMA. What problems does each solve?

**CQ 2.2** When is each I/O technique most appropriate? What are the trade-offs?

**CQ 2.3** How does DMA improve system performance, and what are its limitations?

### Concept 3: Interrupts and DMA

**CQ 3.1** Compare hardware and software methods for interrupt device identification. What are the trade-offs?

**CQ 3.2** Explain how interrupt priority affects system behavior and performance.

**CQ 3.3** How do interrupts and DMA work together in modern systems?

### Concept 4: I/O Addressing

**CQ 4.1** Compare memory-mapped I/O and isolated I/O. When is each preferred?

**CQ 4.2** How does I/O addressing affect system design and programming?

**CQ 4.3** Discuss the trade-offs in I/O address space allocation.

### Concept 5: Modern I/O Systems

**CQ 5.1** How have I/O systems evolved to meet modern performance requirements?

**CQ 5.2** Explain the role of different interconnection standards in modern systems.

**CQ 5.3** Discuss future trends in I/O system design and technology.

---

## Answer Key

### Multiple Choice Answers

**Section 1:**
1.1 - b | 1.2 - b | 1.3 - b | 1.4 - b | 1.5 - b

**Section 2:**
2.1 - b | 2.2 - b | 2.3 - b | 2.4 - b | 2.5 - b

**Section 3:**
3.1 - b | 3.2 - b | 3.3 - b | 3.4 - b | 3.5 - b

**Section 4:**
4.1 - b | 4.2 - a | 4.3 - b | 4.4 - b | 4.5 - c

**Section 5:**
5.1 - b | 5.2 - b | 5.3 - b | 5.4 - b | 5.5 - c

**Section 6:**
6.1 - b | 6.2 - b | 6.3 - b | 6.4 - b | 6.5 - b

**Section 7:**
7.1 - b | 7.2 - b | 7.3 - b | 7.4 - b | 7.5 - b

**Section 8:**
8.1 - b | 8.2 - b | 8.3 - b | 8.4 - b | 8.5 - b

**Section 9:**
9.1 - a | 9.2 - b | 9.3 - b | 9.4 - b | 9.5 - b

### True/False Answers

**Section 1:**
1.1 - True | 1.2 - True | 1.3 - False | 1.4 - True

**Section 2:**
2.1 - True | 2.2 - True | 2.3 - True | 2.4 - True

**Section 3:**
3.1 - True | 3.2 - False | 3.3 - True | 3.4 - True

**Section 4:**
4.1 - True | 4.2 - True | 4.3 - True | 4.4 - True

**Section 5:**
5.1 - True | 5.2 - True | 5.3 - True | 5.4 - True

**Section 6:**
6.1 - True | 6.2 - True | 6.3 - True | 6.4 - True

**Section 7:**
7.1 - True | 7.2 - True | 7.3 - True | 7.4 - True

**Section 8:**
8.1 - True | 8.2 - True | 8.3 - True | 8.4 - False

**Section 9:**
9.1 - True | 9.2 - True | 9.3 - True | 9.4 - True

---

*End of Group 6 Exercises*

