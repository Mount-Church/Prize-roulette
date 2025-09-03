import '@testing-library/jest-dom';

// Mock para o Web Audio API
class AudioContextMock {
  createOscillator() {
    return {
      frequency: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
    };
  }
  createGain() {
    return {
      gain: { setValueAtTime: jest.fn(), exponentialRampToValueAtTime: jest.fn() },
      connect: jest.fn(),
    };
  }
  get destination() {
    return { connect: jest.fn() };
  }
  get currentTime() {
    return 0;
  }
}

// Configuração global para os testes
global.AudioContext = AudioContextMock;

// Mock para o canvas-confetti
jest.mock('canvas-confetti', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()),
}));

// Mock para o localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock para matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock para requestAnimationFrame
window.requestAnimationFrame = (callback) => {
  return setTimeout(callback, 0);
};

window.cancelAnimationFrame = (id) => {
  clearTimeout(id);
};
