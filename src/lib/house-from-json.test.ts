import { getFloorMetrics, houseData } from './house-from-json';

function runUnitTests() {
  console.log('--- RUNNING UNIT TESTS FOR HOUSE 3D GEOMETRY ---');
  const metrics = getFloorMetrics();

  // Test 1: Floor 1 elevation and height
  if (metrics.T1.baseElevation !== 0) throw new Error('T1 base elevation must be 0');
  if (metrics.T1.height !== 3.6) throw new Error(`T1 height must be 3.6m (3600mm), got ${metrics.T1.height}`);
  console.log('✓ Test 1: T1 height = 3600mm (3.6m) PASS');

  // Test 2: Floor 2 elevation and height
  if (metrics.T2.baseElevation !== 3.6) throw new Error('T2 base elevation must be 3.6m');
  if (metrics.T2.height !== 3.4) throw new Error(`T2 height must be 3.4m (3400mm), got ${metrics.T2.height}`);
  console.log('✓ Test 2: T2 height = 3400mm (3.4m) PASS');

  // Test 3: Floor 3 elevation and height
  if (metrics.T3.baseElevation !== 7.0) throw new Error('T3 base elevation must be 7.0m');
  if (metrics.T3.height !== 3.4) throw new Error(`T3 height must be 3.4m (3400mm), got ${metrics.T3.height}`);
  console.log('✓ Test 3: T3 height = 3400mm (3.4m) PASS');

  // Test 4: Tum / Roof height
  if (metrics.MAI.baseElevation !== 10.4) throw new Error('MAI base elevation must be 10.4m');
  if (metrics.MAI.height !== 3.0) throw new Error(`MAI/Tum height must be 3.0m (3000mm), got ${metrics.MAI.height}`);
  console.log('✓ Test 4: Tum height = 3000mm (3.0m) PASS');

  // Test 5: Verify door library
  const doorsCount = Object.keys(houseData.cua).length;
  if (doorsCount !== 9) throw new Error(`Expected 9 door types, got ${doorsCount}`);
  console.log('✓ Test 5: Door catalog (D1-D4, S1-S5) verified PASS');

  console.log('ALL UNIT TESTS PASSED SUCCESSFULLY! ✅');
}

runUnitTests();
