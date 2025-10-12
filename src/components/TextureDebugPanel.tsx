import React from 'react';

interface TextureDebugPanelProps {
  rotation: number;
  setRotation: (value: number) => void;
  repeatX: number;
  setRepeatX: (value: number) => void;
  repeatY: number;
  setRepeatY: (value: number) => void;
  offsetX: number;
  setOffsetX: (value: number) => void;
  offsetY: number;
  setOffsetY: (value: number) => void;
  flipY: boolean;
  setFlipY: (value: boolean) => void;
  // Lighting controls
  ambientIntensity: number;
  setAmbientIntensity: (value: number) => void;
  spotIntensity: number;
  setSpotIntensity: (value: number) => void;
  pointIntensity: number;
  setPointIntensity: (value: number) => void;
  envIntensity: number;
  setEnvIntensity: (value: number) => void;
  toneMappingExposure: number;
  setToneMappingExposure: (value: number) => void;
  // Material controls
  roughness: number;
  setRoughness: (value: number) => void;
  metalness: number;
  setMetalness: (value: number) => void;
  envMapIntensity: number;
  setEnvMapIntensity: (value: number) => void;
}

const TextureDebugPanel: React.FC<TextureDebugPanelProps> = ({
  rotation,
  setRotation,
  repeatX,
  setRepeatX,
  repeatY,
  setRepeatY,
  offsetX,
  setOffsetX,
  offsetY,
  setOffsetY,
  flipY,
  setFlipY,
  ambientIntensity,
  setAmbientIntensity,
  spotIntensity,
  setSpotIntensity,
  pointIntensity,
  setPointIntensity,
  envIntensity,
  setEnvIntensity,
  toneMappingExposure,
  setToneMappingExposure,
  roughness,
  setRoughness,
  metalness,
  setMetalness,
  envMapIntensity,
  setEnvMapIntensity,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.9)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px',
      maxHeight: '90vh',
      overflowY: 'auto',
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '14px' }}>Screen Texture Controls</h3>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Rotation: {(rotation * 180 / Math.PI).toFixed(0)}°
        </label>
        <input
          type="range"
          min="-360"
          max="360"
          step="1"
          value={rotation * 180 / Math.PI}
          onChange={(e) => setRotation(parseFloat(e.target.value) * Math.PI / 180)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Repeat X: {repeatX.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.05"
          value={repeatX}
          onChange={(e) => setRepeatX(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Repeat Y: {repeatY.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.05"
          value={repeatY}
          onChange={(e) => setRepeatY(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Offset X: {offsetX.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={offsetX}
          onChange={(e) => setOffsetX(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Offset Y: {offsetY.toFixed(2)}
        </label>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={offsetY}
          onChange={(e) => setOffsetY(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            checked={flipY}
            onChange={(e) => setFlipY(e.target.checked)}
          />
          Flip Y
        </label>
      </div>

      <hr style={{ margin: '15px 0', borderColor: '#444' }} />
      <h4 style={{ margin: '0 0 10px 0', fontSize: '13px' }}>Lighting</h4>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Ambient: {ambientIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={ambientIntensity}
          onChange={(e) => setAmbientIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Spot: {spotIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={spotIntensity}
          onChange={(e) => setSpotIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Point: {pointIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={pointIntensity}
          onChange={(e) => setPointIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Environment: {envIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={envIntensity}
          onChange={(e) => setEnvIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Exposure: {toneMappingExposure.toFixed(2)}
        </label>
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.05"
          value={toneMappingExposure}
          onChange={(e) => setToneMappingExposure(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <hr style={{ margin: '15px 0', borderColor: '#444' }} />
      <h4 style={{ margin: '0 0 10px 0', fontSize: '13px' }}>Material</h4>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Roughness: {roughness.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={roughness}
          onChange={(e) => setRoughness(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Metalness: {metalness.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={metalness}
          onChange={(e) => setMetalness(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Env Map: {envMapIntensity.toFixed(2)}
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={envMapIntensity}
          onChange={(e) => setEnvMapIntensity(parseFloat(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      <button
        onClick={() => {
          console.log('=== All Settings ===');
          console.log('Texture:');
          console.log(`  rotation: ${rotation}`);
          console.log(`  repeatX: ${repeatX}`);
          console.log(`  repeatY: ${repeatY}`);
          console.log(`  offsetX: ${offsetX}`);
          console.log(`  offsetY: ${offsetY}`);
          console.log(`  flipY: ${flipY}`);
          console.log('Lighting:');
          console.log(`  ambientIntensity: ${ambientIntensity}`);
          console.log(`  spotIntensity: ${spotIntensity}`);
          console.log(`  pointIntensity: ${pointIntensity}`);
          console.log(`  envIntensity: ${envIntensity}`);
          console.log(`  toneMappingExposure: ${toneMappingExposure}`);
          console.log('Material:');
          console.log(`  roughness: ${roughness}`);
          console.log(`  metalness: ${metalness}`);
          console.log(`  envMapIntensity: ${envMapIntensity}`);
        }}
        style={{
          width: '100%',
          padding: '8px',
          background: '#4CAF50',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Log All Settings
      </button>
    </div>
  );
};

export default TextureDebugPanel;
