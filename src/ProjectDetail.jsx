// src/ProjectDetail.jsx
import { useParams, Link } from "react-router-dom";
import { PROJECTS } from "./data/projects.js";
import Gallery from "./components/Gallery.jsx";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return (
      <main className="min-h-screen text-white bg-black flex items-center justify-center">
        <p>Project not found</p>
      </main>
    );
  }

  // --- Point these to files in /public/assets/ ---
  const galleryImages =
    {
      lidar: [
        "/assets/lidar1.jpg",
        "/assets/lidar2.jpg",
        "/assets/lidar3.jpg",
        "/assets/lidar4.jpg",
      ],
      decompressor: [
        "/assets/decompressor1.jpg",
        "/assets/decompressor2.jpg",
        "/assets/decompressor3.jpg",
        "/assets/decompressor4.jpg",
      ],
      sdr: [
        "/assets/sdr1.jpg",
        "/assets/sdr2.jpg",
        "/assets/sdr3.jpg",
      ],
      pacemaker: [
        "/assets/pacemaker1.jpg",
        "/assets/pacemaker2.jpg",
      ],
    }[id] || [];

  const isLidar = id === "lidar";
  const isDecompressor = id === "decompressor";
  const isSDR = id === "sdr";
  const isPacemaker = id === "pacemaker";

  return (
    <main className="min-h-screen text-white bg-black">
      <section className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-24">
        <Link to="/projects" className="text-sm underline text-cyan-400">
          ← Back to Projects
        </Link>

        <h1 className="text-3xl font-bold mt-4 mb-4">{project.title}</h1>

        {project.summary && (
          <p className="text-neutral-300 leading-relaxed mb-6">{project.summary}</p>
        )}

        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/15"
              >
                {tag}
              </span>
            ))}
          </div>
        )}


        {/* ================= LIDAR (kept as you had it) ================= */}
        {isLidar && (
          <>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              I built a low-cost 3D room scanning device using a time-of-flight (ToF) sensor on a
              stepper motor. The sensor captures 360° distance readings that are reconstructed into a
              3D map. A TI MSP432E401Y microcontroller manages the sensor and data transfer; a Python
              pipeline converts readings to point clouds and meshes for visualization.
            </p>

            <h2 className="text-xl font-semibold mb-3">Motivation</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Commercial LiDAR is pricey and often overkill for small projects. This design targets a
              compact, affordable alternative for robotics navigation, indoor mapping, and exploration.
            </p>

            <h2 className="text-xl font-semibold mb-3">Hardware Components</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li><strong>VL53L1X ToF Sensor:</strong> Infrared distance up to ~4&nbsp;m.</li>
              <li><strong>28BYJ-48 Stepper Motor:</strong> 512 steps per 360° scan.</li>
              <li><strong>TI MSP432E401Y:</strong> ~60&nbsp;MHz; motor control, sensor I/O, UART.</li>
              <li><strong>PC (Python):</strong> Parses serial, builds point clouds (Open3D), exports mesh.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">How It Works</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              The sensor rotates in the y-z plane taking samples every ~11.25°. Data streams over
              UART at 115200 baud. Python converts readings into (x, y, z) coordinates (Open3D + NumPy),
              and MeshLab produces an STL mesh for the final 3D model.
            </p>

            <h2 className="text-xl font-semibold mb-3">Results</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Reconstructed rooms/hallways as accurate 3D models.</li>
              <li>Demonstrated embedded C, motor control, and Python visualization end-to-end.</li>
              <li>Validated a low-cost LiDAR-like workflow for indoor mapping.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Lessons Learned</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-10 space-y-1">
              <li>Keeping UART at 115200 stable and noise-free.</li>
              <li>Coordinating MCU timing, motor steps, and sensor latency.</li>
              <li>Trade-offs: scan time vs. resolution vs. complexity.</li>
            </ul>
          </>
        )}

        {/* ================= Decompressor (kept) ================= */}
        {isDecompressor && (
          <>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Built a hardware image <strong>decompression pipeline</strong> on an{" "}
              <strong>Altera DE2-115 FPGA</strong> using the <code>.mic17</code> format. Compressed
              data is received over UART, buffered in SRAM, decoded in Verilog (lossless decode →
              inverse quantization → 8×8 IDCT → chroma upsample → YUV→RGB), and displayed via VGA at
              320×240.
            </p>

            <h2 className="text-xl font-semibold mb-3">Objective</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Hands-on digital design + hardware image processing</li>
              <li>Implement <code>.mic17</code> decompression end-to-end in hardware</li>
              <li>Render decompressed images in real time over VGA</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Hardware Flow</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>UART → SRAM buffer for compressed bitstream</li>
              <li>Decode: variable-length → inverse quantization → 8×8 IDCT → chroma upsample → YUV→RGB</li>
              <li>VGA timing outputs final RGB frames</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Milestones</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li><strong>M1:</strong> YUV→RGB + VGA (optimized register preloading, ~78% multiplier use)</li>
              <li><strong>M2:</strong> 8×8 IDCT datapath (MAC/fixed-point); ModelSim-validated vs. software</li>
              <li><strong>M3:</strong> Lossless decode + inverse quant + full pipeline integration</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Tools & Techniques</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              <strong>Quartus II</strong> (synthesis), <strong>ModelSim</strong> (simulation),
              Verilog HDL, UART I/O, external SRAM buffering, and VGA timing.
            </p>

            <h2 className="text-xl font-semibold mb-3">Key Results</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Validated YUV→RGB and IDCT against a software model</li>
              <li>Good visual quality; minor U/V index artifacts tracked and noted</li>
              <li>Balanced DSP blocks, registers, and memory to hit timing</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Lessons Learned</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-10 space-y-1">
              <li>Resource budgeting on FPGA is critical for pipelined designs</li>
              <li>Incremental bring-up (VGA → IDCT → full decode) simplified debugging</li>
              <li>Fixed-point arithmetic + FSM design enable real-time throughput</li>
            </ul>
          </>
        )}
{/* ================= PACEMAKER (new) ================= */}
        {isPacemaker && (
          <>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Developed a pacemaker software model supporting multiple pacing modes (AOO, VOO, AAI,
              VVI, DOO, and adaptive AOOR/VOOR/DOOR). Focused on real-time embedded decision logic,
              configurable parameters, and adaptive rate pacing based on sensed activity.
            </p>

            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>User-programmable parameters: mode, pulse amplitude/width, refractory periods, AV delay.</li>
              <li>Asynchronous pacing (AOO, VOO, DOO).</li>
              <li>Demand pacing with sensing/inhibition (AAI, VVI).</li>
              <li>Rate-adaptive pacing (AOOR, VOOR, DOOR) with accelerometer input.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Architecture</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li><strong>Parameter Module:</strong> Converts DCM/user inputs into control variables.</li>
              <li><strong>Main State Flow:</strong> Core decision logic for init, sense, and pace states.</li>
              <li><strong>Hardware Abstraction:</strong> Handles sensor inputs and pacing pin outputs.</li>
              <li><strong>Serial Communication:</strong> Parameter updates + ECG echo via DCM.</li>
              <li><strong>Rate Adaptive Stateflow:</strong> Adjusts pacing rate based on accelerometer input.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Pacing Logic</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              AOO/VOO/DOO: Asynchronous pacing at fixed intervals.  
              AAI/VVI: Inhibition logic checks refractory periods and only paces when natural signals
              are absent.  
              DOO: Dual pacing with AV delays.  
              Adaptive: Rate increases during activity, slows during recovery.
            </p>

            <h2 className="text-xl font-semibold mb-3">Testing & Validation</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Verified all pacing modes with HeartView simulator.</li>
              <li>AAI/VVI: Pacemaker inhibited correctly on natural beats.</li>
              <li>AOO/VOO: Paced continuously as expected.</li>
              <li>DOO: Dual pacing and AV delay validated.</li>
              <li>Adaptive: Increased rate during activity; gradual recovery afterward.</li>
            </ul>

          
          </>
        )}

        {/* ================= SDR (new) ================= */}
        {isSDR && (
          <>
            <h2 className="text-xl font-semibold mb-3">Overview</h2>
            <p className="text-neutral-300 leading-relaxed mb-6">
              Implemented a real-time <strong>Software-Defined Radio (SDR)</strong> on a
              Raspberry&nbsp;Pi&nbsp;4 with an <strong>RTL2832U</strong> dongle. The system receives
              FM mono/stereo audio and partial <strong>RDS</strong> data, processes it with custom
              Python/C++ DSP blocks, and outputs live audio—built largely from scratch (no GNU Radio)
              to deepen DSP + real-time systems understanding.
            </p>

            <h2 className="text-xl font-semibold mb-3">Objectives</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Apply Fourier analysis, convolution, PLL, and resampling in practice</li>
              <li>Process live RF streams in the FM band (88.1–107.9&nbsp;MHz)</li>
              <li>Prototype in Python; optimize hot paths in C++</li>
              <li>Integrate DSP with SDR hardware + multithreading</li>
              <li>Profile bottlenecks and evaluate performance trade-offs</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Project Workflow</h2>
            <h3 className="font-semibold mb-2">1) RF Front End</h3>
            <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-1">
              <li>Captured raw I/Q samples; low-pass + decimation to an IF</li>
              <li>Combined convolution + downsampling into <code>convoDS</code> for efficiency</li>
              <li>Fixed state-handling bugs that caused distortion vs. Python baseline</li>
            </ul>

            <h3 className="font-semibold mb-2">2) Mono Path (0–15 kHz)</h3>
            <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-1">
              <li>Conditional modes: simple LPF+DS or resampling with <code>convoResample</code></li>
              <li>Float → 16-bit PCM output</li>
              <li>Fixed LPF cutoff normalization bug that introduced audible distortion</li>
            </ul>

            <h3 className="font-semibold mb-2">3) Stereo Path (23–53 kHz)</h3>
            <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-1">
              <li>Band-pass stereo subchannel; PLL locks to 19 kHz pilot → gen 38 kHz NCO</li>
              <li>Mix down L–R, combine with mono (L+R) → L/R audio</li>
              <li>Wrapped PLL state into a class for clean C++ invocation and tuning</li>
            </ul>

            <h3 className="font-semibold mb-2">4) RDS Path (54–60 kHz)</h3>
            <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-1">
              <li>Band-pass → PLL → resample → RRC filtering → Manchester + differential decoding</li>
              <li>Reached PLL lock; full decoding left for future work</li>
            </ul>

            <h3 className="font-semibold mb-2">5) Multithreading</h3>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Producer/consumer queues feed mono/stereo/RDS workers</li>
              <li>Mutex + condition variables for safe concurrency</li>
              <li>Limitation found: shared queue blocked RDS+mono → next step: multi-access queues</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Performance & Trade-offs</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Convolution is the main bottleneck across modes</li>
              <li>Stereo ≈ 2× runtime of mono; resampler modes cost more than straight DS</li>
              <li>Tap count trade-off: 13 fast/noisy vs. 301 slower/cleaner</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Key Results</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-6 space-y-1">
              <li>Real-time mono & stereo FM audio playback on Raspberry Pi</li>
              <li>PLL, convolution, and resampling validated against Python references</li>
              <li>Clear view of speed/quality/resource compromises in real-time DSP</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">Lessons Learned</h2>
            <ul className="list-disc list-inside text-neutral-300 mb-10 space-y-1">
              <li>Combine operations (e.g., convolution + DS) to meet timing</li>
              <li>Python models make DSP debugging dramatically faster</li>
              <li>Threading and synchronization are as important as the math</li>
            </ul>
          </>
        )}

        {/* Fallback for other projects until you add custom sections */}
        {!isLidar && !isDecompressor && !isSDR && !isPacemaker &&(
          <p className="text-neutral-300 leading-relaxed mb-10">
            More details coming soon. Below is a gallery for this project.
          </p>
        )}

        {/* Slideshow */}
        <Gallery images={galleryImages} showThumbs={true} />
      </section>
    </main>
  );
}
