'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Shuffle.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@&%!?';

export default function Shuffle({
  text = '',
  as: Tag = 'span',
  className = '',
  shuffleDirection = 'right',
  duration = 0.35,
  shuffleTimes = 1,
  ease = 'power3.out',
  stagger = 0.03,
  threshold = 0.1,
  triggerOnce = true,
  triggerOnHover = false,
}) {
  const ref = useRef(null);
  const animated = useRef(false);

  const play = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = el.querySelectorAll('.sh-char');

    if (prefersReduced) {
      chars.forEach((c, i) => {
        c.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      });
      el.classList.add('sh-done');
      return;
    }

    gsap.killTweensOf(chars);

    const order = Array.from({ length: chars.length }, (_, i) => i);
    if (shuffleDirection === 'left') order.reverse();

    const tl = gsap.timeline();

    order.forEach((i, seq) => {
      const ch = chars[i];
      const final = text[i];

      if (final === ' ') {
        ch.innerHTML = '&nbsp;';
        return;
      }

      const scrambleDur = duration * shuffleTimes;

      tl.to(
        ch,
        {
          duration: scrambleDur,
          ease: 'none',
          onUpdate() {
            ch.textContent = POOL[Math.floor(Math.random() * POOL.length)];
          },
          onComplete() {
            ch.textContent = final;
            gsap.fromTo(ch, { opacity: 0.6 }, { opacity: 1, duration: 0.15, ease });
          },
        },
        seq * stagger,
      );
    });

    tl.call(() => el.classList.add('sh-done'));
  }, [text, shuffleDirection, duration, shuffleTimes, stagger, ease]);

  /* scroll trigger */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll('.sh-char');
    chars.forEach((c) => {
      c.textContent = POOL[Math.floor(Math.random() * POOL.length)];
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${(1 - threshold) * 100}%`,
      onEnter: () => {
        if (!triggerOnce || !animated.current) {
          play();
          animated.current = true;
        }
      },
    });

    return () => st.kill();
  }, [play, threshold, triggerOnce]);

  /* hover re-trigger */
  useEffect(() => {
    if (!triggerOnHover) return;
    const el = ref.current;
    if (!el) return;
    const fn = () => play();
    el.addEventListener('mouseenter', fn);
    return () => el.removeEventListener('mouseenter', fn);
  }, [play, triggerOnHover]);

  return (
    <Tag ref={ref} className={`sh-root ${className}`}>
      {text.split('').map((ch, i) => (
        <span key={i} className="sh-char">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </Tag>
  );
}
