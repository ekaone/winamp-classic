import React, { useRef, useState } from 'react';
import { AudioVisualizer } from './AudioVisualizer';
import { Controls } from './Controls';
import { PlaylistView } from './PlaylistView';
import { Track } from '../types';
import { useAudioContext } from '../hooks/useAudioContext';

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const analyzerNode = useAudioContext(audioRef.current);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newTracks = files
      .filter(file => file.type.includes('audio'))
      .map(file => ({
        name: file.name,
        url: URL.createObjectURL(file)
      }));
    
    setPlaylist([...playlist, ...newTracks]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const time = Number(e.target.value);
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePrevious = () => {
    setCurrentTrackIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentTrackIndex(prev => Math.min(playlist.length - 1, prev + 1));
  };

  return (
    <div 
      className="winamp-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="winamp-player">
        <div className="title-bar">
          <div className="title-bar-text">Winamp</div>
          <div className="window-controls">
            <button className="minimize">_</button>
            <button className="maximize">□</button>
            <button className="close">×</button>
          </div>
        </div>

        <div className="visualizer">
          <AudioVisualizer analyzerNode={analyzerNode} />
        </div>

        <Controls
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          volume={volume}
          onPlayPause={togglePlay}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onTogglePlaylist={() => setShowPlaylist(!showPlaylist)}
        />

        {showPlaylist && (
          <div className="playlist">
            <div className="playlist-header">Playlist</div>
            <PlaylistView
              playlist={playlist}
              currentTrackIndex={currentTrackIndex}
              onTrackSelect={setCurrentTrackIndex}
            />
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
    </div>
  );
}

export default Player;