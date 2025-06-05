import { useEffect } from 'react';

import {
  Engine3D,
  Scene3D,
  Object3D,
  Camera3D,
  View3D,
  LitMaterial,
  BoxGeometry,
  MeshRenderer,
  DirectLight,
  HoverCameraController,
  AtmosphericComponent,
} from '@orillusion/core';

interface IBdMapProps {}

const Orillusion: React.FC<IBdMapProps> = (props) => {
  const initialOrillusion = async () => {
    const canvas: any = document.getElementById('canvas');
    // // 初始化引擎
    // await Engine3D.init({
    //   canvasConfig: { canvas },
    // });
  };

  useEffect(() => {
    initialOrillusion();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <canvas id="canvas" style={{ width: 800, height: 500 }} />
    </div>
  );
};

export default Orillusion;
