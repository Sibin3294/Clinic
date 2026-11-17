import { DestroyRef, WritableSignal } from '@angular/core';

type CarouselOptions = {
  index: WritableSignal<number>;
  maxIndex: () => number;
  destroyRef: DestroyRef;
  intervalMs?: number;
};

/**
 * Looping carousel controls with autoplay + swipe helpers.
 */
export function createLoopCarousel({
  index,
  maxIndex,
  destroyRef,
  intervalMs = 5000,
}: CarouselOptions) {
  let timer: ReturnType<typeof setInterval> | undefined;
  let pointerX = 0;
  let pointerActive = false;

  const clampGo = (value: number) => {
    const max = maxIndex();
    if (max <= 0) {
      index.set(0);
      return;
    }
    const next = ((value % (max + 1)) + (max + 1)) % (max + 1);
    index.set(next);
  };

  const next = () => clampGo(index() + 1);
  const prev = () => clampGo(index() - 1);
  const go = (value: number) => clampGo(value);

  const stop = () => {
    if (timer !== undefined) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  const start = () => {
    stop();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    timer = setInterval(() => {
      if (maxIndex() <= 0) {
        return;
      }
      next();
    }, intervalMs);
  };

  const bump = () => {
    stop();
    start();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return;
    }
    pointerActive = true;
    pointerX = event.clientX;
    const target = event.currentTarget as HTMLElement | null;
    target?.setPointerCapture?.(event.pointerId);
    stop();
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!pointerActive) {
      return;
    }
    pointerActive = false;
    const dx = event.clientX - pointerX;
    if (Math.abs(dx) >= 40) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
    bump();
  };

  const onPointerCancel = () => {
    pointerActive = false;
    bump();
  };

  destroyRef.onDestroy(stop);

  return {
    next,
    prev,
    go,
    start,
    stop,
    bump,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
  };
}
