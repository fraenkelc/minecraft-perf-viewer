import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { ProfileReport, PctLine, CounterLine } from './../../../src/model';

// Specify here Quasar config you'll need to test your component
installQuasarPlugin();

describe('ProfileReport', () => {
  it('can parse simple reports', () => {
    const report = `--- BEGIN PROFILE DUMP ---
[00] tick(86/1) - 95.17%/95.17%
[01] |   levels(86/1) - 99.11%/94.32%
[00] unspecified(86/1) - 0.04%/0.04%
--- END PROFILE DUMP ---
`;
    const parser = new ProfileReport(report);

    expect(parser.root.children.length).toBe(2);
    expect((parser.root.children[0] as PctLine).pctTotal).toBe(95.17);
    expect(parser.root.children[0]?.children?.length).toBe(1);
  });
  it('skips the preamble', () => {
    const report = `---- Minecraft Profiler Results ----
// Maybe if you treated it better then it'll have more motivation to work faster! Poor server.

Version: 1.18.1
Time span: 10136 ms
Tick span: 86 ticks
// This is approximately 8.48 ticks per second. It should be 20 ticks per second
--- BEGIN PROFILE DUMP ---
[00] tick(86/1) - 95.17%/95.17%
[01] |   levels(86/1) - 99.11%/94.32%
[00] unspecified(86/1) - 0.04%/0.04%
--- END PROFILE DUMP ---
`;
    const parser = new ProfileReport(report);

    expect(parser.root.children.length).toBe(2);
  });
  it('skips the trailer', () => {
    const report = `--- BEGIN PROFILE DUMP ---
[00] tick(86/1) - 95.17%/95.17%
[01] |   levels(86/1) - 99.11%/94.32%
[00] unspecified(86/1) - 0.04%/0.04%
--- END PROFILE DUMP ---

--- BEGIN COUNTER DUMP ---

-- Counter: containersToTick --
[00] root total:0/43 average: 0/0
[01] |   tick total:0/43 average: 0/0
[02] |   |   levels total:0/43 average: 0/0
[03] |   |   |   ServerLevel[world] minecraft:overworld total:0/43 average: 0/0
[04] |   |   |   |   tick total:0/43 average: 0/0;
`;
    const parser = new ProfileReport(report);

    expect(parser.root.children.length).toBe(2);
  });
  it('can parse counter lines', () => {
    const report = `--- BEGIN PROFILE DUMP ---
[00] #getEntities 750/8
--- END PROFILE DUMP ---
`;
    const parser = new ProfileReport(report);

    expect(parser.root.children.length).toBe(1);
    const line = (parser.root.children[0] as CounterLine)
    expect(line.num1).toBe(750);
    expect(line.text).toBe('#getEntities');
  });

});
