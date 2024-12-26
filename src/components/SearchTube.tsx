import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Repeat, Search } from 'lucide-react';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

const SearchTube = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const playerRef = useRef<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Load YouTube IFrame Player API
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

        // Initialize player when API is ready
        window.onYouTubeIframeAPIReady = () => {
            if (videoId) {
                initializePlayer();
            }
        };
    }, []);

    useEffect(() => {
        if (videoId) {
            if (window.YT) {
                initializePlayer();
            }
        }
    }, [videoId]);

    const initializePlayer = () => {
        playerRef.current = new window.YT.Player('youtube-player', {
            height: '480',
            width: '100%',
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
            },
            events: {
                onStateChange: onPlayerStateChange,
            },
        });
    };

    const onPlayerStateChange = (event: any) => {
        setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
    };

    const extractVideoId = (url: string) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\s*(?:\S)*\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : '';
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(e.target.value);
        const id = extractVideoId(e.target.value);
        setVideoId(id);
    };

    const handleRotate = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
        }
    };

    const handleRepeat = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(0);
            playerRef.current.playVideo();
        }
    };

    const handlePlayPause = () => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                        <Search className="w-8 h-8 text-white-500" />
                        SearchTube
                    </h1>
                    <p className="text-gray-400">Loop any YouTube videos</p>
                </div>
            </div>

            {/* Search Input */}
            <div className="max-w-3xl mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Please paste YouTube URL or Video ID"
                    className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-white"
                    value={videoUrl}
                    onChange={handleUrlChange}
                />
            </div>

            {/* Video Player */}
            <div className="max-w-3xl mx-auto mb-8">
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                    {videoId ? (
                        <div id="youtube-player" className="aspect-video" />
                    ) : (
                        <div className="h-[480px] bg-gray-800 rounded-lg flex items-center justify-center">
                            <p className="text-gray-400">Enter a YouTube URL to preview</p>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        className="p-3 rounded-full bg-gray-800 hover:bg-gray-700"
                        onClick={handleRotate}
                    >
                        <RotateCcw className="w-6 h-6" />
                    </button>
                    <button
                        className="p-3 rounded-full bg-pink-500 hover:bg-pink-600"
                        onClick={handleRepeat}
                    >
                        <Repeat className="w-6 h-6" />
                    </button>
                    <button
                        className="p-3 rounded-full bg-gray-800 hover:bg-gray-700"
                        onClick={handlePlayPause}
                    >
                        <Play className={`w-6 h-6 ${isPlaying ? 'text-pink-500' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-3xl mx-auto mt-12">
                <h2 className="text-xl font-bold mb-4">What is SearchTube:</h2>
                <p className="text-gray-400 mb-8">
                    SearchTube is a free online tool to repeat any YouTube videos. Just select YouTube videos by typing a URL in the search bar, and you can set AB loop in any point of the video. This is useful when you want to learn some kind of skills (such as languages, sports, music, etc.) by watching a specific part over and over.
                </p>

                <h2 className="text-xl font-bold mb-4">Features:</h2>
                <ul className="text-gray-400 space-y-2 mb-8">
                    <li>• Select any YouTube videos by pasting the URL</li>
                    <li>• Repeat full or a part of YouTube video in infinite loop</li>
                    <li>• Control video with simple buttons </li>
                    <li>• Take notes while controlling video </li>
                </ul>

            </div>

            {/* Footer */}
            <footer className="mt-16 text-center text-gray-400 text-sm">
                <div className="mb-2">
                    <a href="#" className="mx-2 hover:text-white">HOME</a>
                    <a href="#" className="mx-2 hover:text-white">TERMS</a>
                    <a href="#" className="mx-2 hover:text-white">PRIVACY</a>
                    <a href="#" className="mx-2 hover:text-white">CONTACT</a>
                </div>
                <p>Made with ❤️ by BT</p>
                <p>©SearchTube 2024. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default SearchTube;