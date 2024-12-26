import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

global.scroll = vi.fn();

process.env.TZ = 'Europe/Kyiv';
