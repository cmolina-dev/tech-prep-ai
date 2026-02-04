# Tech Prep AI - Tests

## Running Tests

```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui
```

## Test Coverage

### Components
- **ChatBubble** - Message rendering and styling
- **StepIndicator** - Basic smoke test
- **Modal** - Open/close states

### Data
- **mockData** - Data structure validation

### API Routes
- **POST /api/chat** - Request validation and error handling

## Test Files

```
src/
├── components/
│   ├── ChatBubble/ChatBubble.test.tsx
│   ├── StepIndicator.test.tsx
│   └── Modal.test.tsx
├── data/
│   └── mockData.test.ts
└── app/
    └── api/
        └── chat/route.test.ts
```

## Current Status

✅ **14 tests passing** across 5 test files

## Adding New Tests

1. Create a `*.test.ts` or `*.test.tsx` file next to the code you're testing
2. Import from `vitest` for test utilities
3. Import from `@testing-library/react` for component testing
4. Run `npm test` to verify

## Configuration

- **Framework**: Vitest
- **Environment**: jsdom
- **Test Library**: React Testing Library
- **Setup**: `src/test/setup.ts`
