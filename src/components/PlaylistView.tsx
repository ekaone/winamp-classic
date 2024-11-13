import { Track } from "../types";

interface PlaylistViewProps {
  playlist: Track[];
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
}

export function PlaylistView({
  playlist,
  currentTrackIndex,
  onTrackSelect,
}: PlaylistViewProps) {
  if (playlist.length === 0) {
    return <div className="playlist-empty">Drag and drop MP3 files here</div>;
  }

  return (
    <div className="playlist-items">
      {playlist.map((track, index) => (
        <div
          key={index}
          className={`playlist-item ${
            index === currentTrackIndex ? "active" : ""
          }`}
          onClick={() => onTrackSelect(index)}
        >
          {track.name}
        </div>
      ))}
    </div>
  );
}
