import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, List } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePlaylist: () => void;
}

export function Controls({
  isPlaying,
  currentTime,
  duration,
  volume,
  onPlayPause,
  onPrevious,
  onNext,
  onSeek,
  onVolumeChange,
  onTogglePlaylist,
}: ControlsProps) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="controls">
      <div className="time-display">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="progress-bar">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={onSeek}
          className="seek-slider"
        />
      </div>

      <div className="buttons">
        <button onClick={onPrevious}>
          <SkipBack size={16} />
        </button>
        <button onClick={onPlayPause}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button onClick={onNext}>
          <SkipForward size={16} />
        </button>
        <button onClick={onTogglePlaylist}>
          <List size={16} />
        </button>
      </div>

      <div className="volume-control">
        <Volume2 size={16} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
}