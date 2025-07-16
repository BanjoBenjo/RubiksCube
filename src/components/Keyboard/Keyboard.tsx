import { Canvas } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import React, { useEffect, useState } from 'react';

const keyLayout = [
  { row: 0, keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='] },
  { row: 1, keys: ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', '[', ']', '\\'] },
  { row: 2, keys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''] },
  { row: 3, keys: ['Shift', 'y', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'] },
];

const actionKeys: Record<string, string> = {
  'Shift': 'Invert', 'SHIFT': 'Invert',
  f: 'Front', F: "Front'",
  b: 'Back', B: "Back'",
  u: 'Up', U: "Up'",
  d: 'Down', D: "Down'",
  r: 'Right', R: "Right'",
  l: 'Left', L: "Left'",
  m: 'Middle', M: "Middle'",
  x: 'X-Axis', X: "X-Axis'",
  y: 'Y-Axis', Y: "Y-Axis'",
  z: 'Z-Axis', Z: "Z-Axis'",
};

function Key({
  keyLabel,
  action,
  position,
  isPressed,
  hasAction,
}: {
  keyLabel: string;
  action?: string;
  position: [number, number, number];
  isPressed: boolean;
  hasAction: boolean;
}) {
  return (
    <group position={position}>

      <RoundedBox args={[1, 1, 0.2]} radius={0.1} >
        <meshStandardMaterial
          color={isPressed ? 'orange' : hasAction ? 'white' : 'gray'}
          transparent={!hasAction}
          opacity={hasAction ? 1 : 0.4}
        />
      </RoundedBox>

      <Text position={[0, 0.2, 0.15]} fontSize={0.35} color="black" anchorX="center">
        {keyLabel}
      </Text>
      {action && (
        <Text position={[0, -0.3, 0.15]} fontSize={0.2} color="black" anchorX="center">
          {action}
        </Text>
      )}
    </group>
  );
}

export default function Keyboard() {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(true);
      setPressedKeys((prev) => [...new Set([...prev, e.key])]);
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShiftHeld(false);
      setPressedKeys((prev) => prev.filter((k) => k !== e.key));
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  const keySpacing = 1.2;
  const rowSpacing = 1.1;

  const keys = keyLayout.flatMap(({ row, keys }) =>
    keys.map((k, i) => {
      const key = k;
      const isShift = key === 'ShiftLeft' || key === 'ShiftRight';
      const rawLabel = isShift ? 'Shift' : key;
      const label = shiftHeld && key.length === 1 ? key.toUpperCase() : rawLabel;

      let action = '';

      if (shiftHeld) {
        action = actionKeys[key.toUpperCase()] || '';
      } else {
        action = actionKeys[key] || '';
      }
      const hasAction = Boolean(action);
      const x = (i - keys.length / 2) * keySpacing;
      const y = -row * rowSpacing;
      const isPressed =
        pressedKeys.includes(key) ||
        pressedKeys.includes(key.toLowerCase()) ||
        pressedKeys.includes(key.toUpperCase());

      return (
        <Key
          key={key + row}
          keyLabel={label}
          action={action}
          position={[x, y, 0]}
          isPressed={isPressed}
          hasAction={hasAction}
        />
      );
    })
  );

  return (
    <group position={[0, 4, 0]}>{keys}</group>
  );
}