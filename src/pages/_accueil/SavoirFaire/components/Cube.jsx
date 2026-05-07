import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Scene() {
  const mountRef = useRef(null);

  useEffect(() => {
    let cleanupFunc = null;
    let mounted = true;

    (async () => {
      if (!mountRef.current) return;

      const THREE = await import("three");
      if (!mounted) return;

      const mountEl = mountRef.current;

      // ===== SCENE =====
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(
        75,
        mountEl.clientWidth / mountEl.clientHeight,
        0.1,
        1000
      );

      camera.position.set(6, 6, 2);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.cursor = "grab";

      mountEl.appendChild(renderer.domElement);

      // ===== LIGHTS =====
      scene.add(new THREE.DirectionalLight(0xffffff, 1).position.set(5, 5, 5));
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      // ===== COLORS =====
      const colors = {
        right: 0xff0000,
        left: 0xffa500,
        top: 0xffffff,
        bottom: 0xffff00,
        front: 0x0000ff,
        back: 0x00ff00,
      };

      const cube = new THREE.Group();
      const cubes = [];

      const cubeSize = 2;
      const gap = 0.05;

      const createMat = (color) =>
        new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: 0.35,
          side: THREE.FrontSide,
        });

      // ===== 27 CUBES =====
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const geometry = new THREE.BoxGeometry(
              cubeSize,
              cubeSize,
              cubeSize
            );

            const materials = [
              createMat(x === 1 ? colors.right : 0x111111),
              createMat(x === -1 ? colors.left : 0x111111),
              createMat(y === 1 ? colors.top : 0x111111),
              createMat(y === -1 ? colors.bottom : 0x111111),
              createMat(z === 1 ? colors.front : 0x111111),
              createMat(z === -1 ? colors.back : 0x111111),
            ];

            const piece = new THREE.Mesh(geometry, materials);

            const finalPos = {
              x: x * (cubeSize + gap),
              y: y * (cubeSize + gap),
              z: z * (cubeSize + gap),
            };

            piece.position.set(
              (Math.random() - 0.5) * 120,
              (Math.random() - 0.5) * 120,
              (Math.random() - 0.5) * 120
            );

            piece.scale.set(0, 0, 0);

            const edges = new THREE.EdgesGeometry(geometry);
            const lines = new THREE.LineSegments(
              edges,
              new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.04,
              })
            );

            piece.add(lines);

            cube.add(piece);
            cubes.push({ mesh: piece, finalPos });
          }
        }
      }

      scene.add(cube);
      cube.rotation.set(1.2, 0.5, 1.5);

      // ===== ANIMATION ARRIVÉE =====
      cubes.forEach((c, i) => {
        gsap.to(c.mesh.position, {
          x: c.finalPos.x,
          y: c.finalPos.y,
          z: c.finalPos.z,
          duration: 1.4,
          ease: "power4.out",
          delay: i * 0.008,
        });

        gsap.to(c.mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.7,
          ease: "back.out(1.6)",
          delay: i * 0.008,
        });
      });

      // ===== INTERACTION + ROTATION =====
      let isDragging = false;
      let prev = { x: 0, y: 0 };

      let velocityX = 0;
      let velocityY = 0;

      let autoRotate = true;
      let raf;

      const animate = () => {
        raf = requestAnimationFrame(animate);

        if (isDragging) {
          cube.rotation.y += velocityX;
          cube.rotation.x += velocityY;
        } else {
          // inertie
          velocityX *= 0.95;
          velocityY *= 0.95;

          cube.rotation.y += velocityX;
          cube.rotation.x += velocityY;

          // rotation auto douce
          if (autoRotate) {
            cube.rotation.y += 0.006;
          }
        }

        renderer.render(scene, camera);
      };

      animate();

      const down = (e) => {
        isDragging = true;
        autoRotate = false;
        prev = { x: e.clientX, y: e.clientY };
        renderer.domElement.style.cursor = "grabbing";
      };

      const move = (e) => {
        if (!isDragging) return;

        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;

        velocityX = dx * 0.005;
        velocityY = dy * 0.005;

        prev = { x: e.clientX, y: e.clientY };
      };

      const up = () => {
        isDragging = false;
        autoRotate = true;
        renderer.domElement.style.cursor = "grab";
      };

      renderer.domElement.addEventListener("mousedown", down);
      renderer.domElement.addEventListener("mousemove", move);
      renderer.domElement.addEventListener("mouseup", up);
      renderer.domElement.addEventListener("mouseleave", up);

      // ===== CLEANUP =====
      cleanupFunc = () => {
        if (raf) cancelAnimationFrame(raf);

        renderer.domElement.removeEventListener("mousedown", down);
        renderer.domElement.removeEventListener("mousemove", move);
        renderer.domElement.removeEventListener("mouseup", up);
        renderer.domElement.removeEventListener("mouseleave", up);

        try {
          mountEl.removeChild(renderer.domElement);
        } catch {}

        renderer.dispose();
      };
    })();

    return () => {
      mounted = false;
      cleanupFunc?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}