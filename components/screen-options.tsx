import { ChangeEvent } from 'react';
import AudioBars from './audio-bars';
import Button from './button';

type DeviceItems = MediaDeviceInfo[];

type DeviceList = {
  video: DeviceItems;
  audio: DeviceItems;
};

type Props = {
  isLoadingPreview: boolean,
  isRecording: boolean,
  isMicDeviceEnabled: boolean,
  deviceList: DeviceList,
  audioLevel: number,
  selectAudio: (evt: ChangeEvent<HTMLSelectElement>) => void,
  enableMicForScreenshare: () => void,
  isMuted: boolean,
  muteAudioTrack: (muted: boolean) => void,
};

const ScreenOptions: React.FC<Props> = ({
  isLoadingPreview,
  isRecording,
  isMicDeviceEnabled,
  deviceList,
  audioLevel,
  selectAudio,
  enableMicForScreenshare,
  isMuted,
  muteAudioTrack,
}) => {
  // Filter out screen recording devices from the video device list
  const cameraDevices = deviceList.video.filter(device => device.kind === 'videoinput');

  return (
    <>
      <div>
        { isLoadingPreview && 'Loading preview...' }
      </div>
      {
        isMicDeviceEnabled ?
        <div className="device-pickers">
          <div className="audio-bars"><AudioBars muteAudioTrack={muteAudioTrack} isMuted={isMuted} audioLevel={audioLevel} /></div>
          <select onChange={selectAudio} disabled={isRecording} title={isRecording ? 'Cannot change audio devices while recording' : ''}>
            {
              deviceList.audio.map(({ label, deviceId }) => <option key={deviceId} value={deviceId}>{label}</option>)
            }
          </select>
          <select onChange={selectVideo} disabled={isRecording} title={isRecording ? 'Cannot change video devices while recording' : ''}>
            {
              cameraDevices.map(({ label, deviceId }) => <option key={deviceId} value={deviceId}>{label}</option>)
            }
          </select>
        </div> :
        <div className="button"><Button onClick={enableMicForScreenshare}>Enable microphone</Button></div>
      }
      <style jsx>{`
        .audio-bars {
          margin: 20px 0;
        }
        .button {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
};

export default ScreenOptions;
