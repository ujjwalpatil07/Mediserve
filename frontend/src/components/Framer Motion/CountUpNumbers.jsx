import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const CountUpNumber = ({ from = 0, to = 1000, duration = 3 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const start = performance.now();

    const update = (time) => {
      const progress = Math.min((time - start) / (duration * 1000), 1);
      const current = Math.floor(from + (to - from) * progress);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [from, to, duration]);

  return (
    <motion.div
      className="text-4xl font-bold"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {count}{"+"}
    </motion.div>
  );
};

export default CountUpNumber;
