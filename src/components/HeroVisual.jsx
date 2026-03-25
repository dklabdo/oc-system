// src/components/HeroVisual.jsx
import React, { useEffect, useRef } from "react";

export default function HeroVisual() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const particles = [];
    const NUM = 60;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(41,94,255,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < NUM; i++) particles.push(new Particle());

    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += 0.005;

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(41,94,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Morphing rings
      const cx = w / 2,
        cy = h / 2;
      for (let ring = 0; ring < 3; ring++) {
        const baseR = 80 + ring * 70;
        const wobble = 20 * Math.sin(t * (1 + ring * 0.3));
        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.05) {
          const r = baseR + wobble * Math.sin(a * (3 + ring) + t);
          const px = cx + r * Math.cos(a);
          const py = cy + r * Math.sin(a);
          a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(41,94,255,${0.06 - ring * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Center glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160);
      grd.addColorStop(0, "rgba(41,94,255,0.07)");
      grd.addColorStop(1, "rgba(41,94,255,0)");
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.fill();

      // Floating hexagons
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + t * 0.3;
        const r = 180;
        const hx = cx + r * Math.cos(angle);
        const hy = cy + r * Math.sin(angle);
        const size = 10 + 4 * Math.sin(t * 2 + i);
        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(t + i);
        ctx.beginPath();
        for (let s = 0; s < 6; s++) {
          const sa = (s / 6) * Math.PI * 2;
          const sx = size * Math.cos(sa);
          const sy = size * Math.sin(sa);
          s === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(41,94,255,${0.2 + 0.1 * Math.sin(t + i)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#111111] to-[#0a0a0a]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Center badge */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <svg
          width="250"
          height="80"
          viewBox="0 0 982 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M321.058 281.052C306.446 281.052 293.407 278.092 281.94 272.174C270.657 266.07 261.779 257.655 255.306 246.927C248.832 236.2 245.596 224.085 245.596 210.584C245.596 197.082 248.74 185.06 255.028 174.517C261.502 163.79 270.195 155.374 281.107 149.271C292.02 143.167 304.319 140.115 318.006 140.115C331.323 140.115 343.068 142.982 353.24 148.716C363.413 154.449 371.366 162.403 377.099 172.575C383.018 182.748 385.977 194.4 385.977 207.532C385.977 209.936 385.792 212.526 385.422 215.3C385.237 217.889 384.775 220.941 384.035 224.455L267.79 224.733L267.79 195.602L366.002 195.325L347.691 207.532C347.506 199.764 346.304 193.383 344.085 188.389C341.865 183.21 338.536 179.326 334.097 176.737C329.843 173.962 324.572 172.575 318.283 172.575C311.625 172.575 305.799 174.147 300.805 177.291C295.996 180.251 292.205 184.505 289.43 190.053C286.841 195.602 285.546 202.353 285.546 210.306C285.546 218.259 286.933 225.103 289.708 230.836C292.667 236.385 296.736 240.731 301.915 243.876C307.279 246.835 313.567 248.315 320.78 248.315C327.439 248.315 333.45 247.205 338.814 244.985C344.177 242.581 348.894 239.067 352.963 234.443L376.267 257.747C369.609 265.515 361.563 271.342 352.13 275.226C342.698 279.11 332.34 281.052 321.058 281.052ZM455.572 281.329C447.619 281.329 439.758 280.312 431.99 278.277C424.407 276.243 417.286 273.376 410.628 269.677C404.154 265.793 398.606 261.354 393.982 256.36L418.118 231.946C422.557 236.755 427.829 240.546 433.932 243.321C440.036 245.91 446.694 247.205 453.907 247.205C458.901 247.205 462.693 246.465 465.282 244.985C468.057 243.506 469.444 241.471 469.444 238.882C469.444 235.553 467.779 233.056 464.45 231.391C461.306 229.542 457.237 227.969 452.243 226.675C447.249 225.195 441.978 223.623 436.429 221.958C430.88 220.294 425.609 217.982 420.615 215.022C415.622 212.063 411.553 207.994 408.408 202.815C405.264 197.452 403.692 190.701 403.692 182.563C403.692 173.87 405.911 166.379 410.35 160.091C414.789 153.617 421.078 148.531 429.216 144.832C437.354 141.133 446.879 139.283 457.792 139.283C469.259 139.283 479.801 141.318 489.419 145.387C499.222 149.271 507.175 155.097 513.278 162.865L489.142 187.279C484.888 182.285 480.079 178.771 474.715 176.737C469.536 174.702 464.45 173.685 459.456 173.685C454.647 173.685 451.041 174.425 448.636 175.904C446.232 177.199 445.03 179.141 445.03 181.73C445.03 184.505 446.602 186.724 449.746 188.389C452.89 190.053 456.959 191.533 461.953 192.828C466.947 194.122 472.218 195.695 477.767 197.544C483.315 199.394 488.587 201.891 493.58 205.035C498.574 208.179 502.643 212.433 505.788 217.797C508.932 222.976 510.504 229.819 510.504 238.327C510.504 251.459 505.51 261.909 495.523 269.677C485.72 277.445 472.403 281.329 455.572 281.329ZM552.676 278L552.676 87.4029L595.123 87.4029L595.123 278L552.676 278ZM522.158 179.234L522.158 143.167L625.641 143.167L625.641 179.234L522.158 179.234ZM644.344 278L644.344 143.167L686.792 143.167L686.792 278L644.344 278ZM686.792 203.925L669.036 190.053C672.55 174.332 678.469 162.125 686.792 153.432C695.115 144.739 706.674 140.393 721.471 140.393C727.944 140.393 733.585 141.41 738.394 143.445C743.388 145.294 747.735 148.253 751.434 152.322L726.187 184.227C724.338 182.193 722.026 180.621 719.251 179.511C716.477 178.401 713.333 177.846 709.819 177.846C702.79 177.846 697.149 180.066 692.895 184.505C688.826 188.759 686.792 195.232 686.792 203.925ZM815.267 280.774C802.875 280.774 791.778 277.723 781.975 271.619C772.358 265.515 764.682 257.192 758.948 246.65C753.4 236.107 750.625 224.085 750.625 210.584C750.625 197.082 753.4 185.06 758.948 174.517C764.682 163.975 772.358 155.652 781.975 149.548C791.778 143.445 802.875 140.393 815.267 140.393C824.33 140.393 832.468 142.15 839.682 145.664C847.08 149.178 853.091 154.08 857.715 160.368C862.339 166.472 864.928 173.5 865.483 181.453L865.483 239.714C864.928 247.667 862.339 254.788 857.715 261.077C853.276 267.18 847.357 271.989 839.959 275.503C832.561 279.017 824.33 280.774 815.267 280.774ZM823.868 242.488C832.931 242.488 840.236 239.529 845.785 233.611C851.334 227.507 854.108 219.831 854.108 210.584C854.108 204.295 852.813 198.746 850.224 193.938C847.82 189.129 844.305 185.43 839.682 182.84C835.243 180.066 830.064 178.679 824.145 178.679C818.227 178.679 812.955 180.066 808.331 182.84C803.893 185.43 800.286 189.129 797.512 193.938C794.922 198.746 793.627 204.295 793.627 210.584C793.627 216.687 794.922 222.143 797.512 226.952C800.101 231.761 803.708 235.553 808.331 238.327C812.955 241.101 818.134 242.488 823.868 242.488ZM852.443 278L852.443 241.656L858.824 208.919L852.443 176.182L852.443 143.167L894.059 143.167L894.059 278L852.443 278ZM923.946 278L923.946 76.583L966.393 76.583L966.393 278L923.946 278Z"
            fill="#F5F5F5"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.9941 164.642C9.0226 105.445 63.5186 63.9657 122.715 71.9941C137.473 73.9957 151.131 78.8855 163.194 86.0165C153.957 87.1054 145.169 89.3488 136.831 92.7499C124.634 97.6184 113.977 104.492 104.857 113.37C95.7382 122.248 88.6128 132.769 83.4824 144.933C78.3526 156.914 75.7648 169.905 75.7187 183.903C75.6726 197.902 78.1753 211 83.2255 223.197C88.2764 235.212 95.3317 245.78 104.392 254.899C113.633 264.02 124.336 271.146 136.5 276.276C140.082 277.712 143.749 278.94 147.5 279.963C130.929 286.445 112.525 288.923 93.6416 286.362C34.4453 278.334 -7.03439 223.838 0.9941 164.642ZM176.814 124.242C186.268 124.273 194.534 125.846 201.614 128.96C202.677 129.416 203.716 129.897 204.731 130.403C214.29 149.284 218.421 171.158 215.362 193.715C212.896 211.899 206.043 228.411 196.018 242.33C190.169 243.982 183.636 244.798 176.417 244.774C168.055 244.747 160.333 243.267 153.253 240.335C146.354 237.403 140.368 233.293 135.295 228.004C130.404 222.716 126.516 216.34 123.632 208.877C120.929 201.414 119.593 193.138 119.623 184.048C119.652 175.14 121.042 166.963 123.794 159.519C126.727 152.074 130.657 145.725 135.583 140.469C140.691 135.213 146.704 131.233 153.621 128.529C160.721 125.644 168.452 124.215 176.814 124.242Z"
            fill="#F5F5F5"
          />
        </svg>

        <div className="mt-8 text-center px-8">
          <p className="text-xs font-mono tracking-[0.3em] text-white uppercase mb-2">
            About us ?
          </p>
          <h2 className="text-2xl font-display font-bold text-white/80 leading-tight">
            We Deliver smart & scalable digital solutions that empower
            businesses to grow in a connected, modern world.
            <br />
            <br />
            <span className="text-accent  text-glow">We &lt;3 our team</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="mt-10 flex gap-8">
          {[
            ["99.9%", "Optmize acces"],
            ["+ 12", "Team member"],
            ["< 50ms", "Latency"],
          ].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-sm font-mono font-medium text-white">
                {val}
              </div>
              <div className="text-xs text-ink-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 flex items-center gap-2 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-accent relative">
          <div className="absolute inset-0 rounded-full bg-accent ping opacity-75" />
        </div>
        <span className="text-xs font-mono text-accent">LIVE</span>
      </div>
    </div>
  );
}
