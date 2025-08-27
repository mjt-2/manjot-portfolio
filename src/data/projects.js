// src/data/projects.js
export const PROJECTS = [
  {
    id: "decompressor",
    title: "Hardware Implementation of an Image Decompressor",
    summary:
      "Verilog pipeline on Altera DE2 that decompresses and renders images over VGA.",
    img: "/assets/decompressor.png",
    tags: ["Verilog", "FPGA", "VGA"],
  },
  {
    id: "sdr",
    title: "Software Defined Radio (FM Receiver)",
    summary:
      "Real-time FM receiver on Raspberry Pi 4 (RTL2832U) with demod and audio out.",
    img: "/assets/sdr.png",
    tags: ["Python", "DSP", "SDR"],
  },
  {
    id: "lidar",
    title: "Spatial Mapping System (3D Room Scanner)",
    summary:
      "Used ToF sensors with I2C communication to gather distance readings, combined in Python to generate a 3D environment.",
    img: "/assets/lidar1.jpeg",                  // cover image
    extraImgs: [                                 // slideshow images (ProjectDetail)
      "/assets/lidar1.jpg",
      "/assets/lidar2.jpeg",
      "/assets/lidar3.jpeg",
      "/assets/lidar4.jpeg",
    ],
    tags: ["Embedded", "Python", "Sensors"],
  },
  {
    id: "pacemaker",
    title: "Pacemaker Control Simulation",
    summary:
      "Simulated pacing logic in MATLAB Simulink with adjustable parameters for real-time rhythm modeling.",
    img: "/assets/pacemaker.png",
    tags: ["MATLAB", "Simulink", "Control Systems", "Biomedical"],
  },
  {
    id: "notion-legacy",
    title: "Older Coursework & Projects",
    summary:
      "A collection of earlier academic and side projects hosted on Notion.",
    img: "/assets/notion.png",
    tags: ["Archive", "Notion"],
    notionUrl:
      "https://www.notion.so/Welcome-To-My-Portfolio-dfa4a5179cb34b0aae26802bd6e77b3e",
  },
];
