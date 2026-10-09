"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

interface PlaybackControlsProps {
  progress: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onProgressChange: (val: number) => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  progress,
  isPlaying,
  onTogglePlay,
  onReset,
  onProgressChange,
}) => {
  return (
    <Card className="bg-slate-900/90 border-slate-800 text-slate-100 backdrop-blur">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Simulation Timeline</span>
          <span className="font-mono text-cyan-400">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Updated onValueChange callback to match SliderRoot type definition */}
        <Slider
          value={[progress]}
          min={0}
          max={1}
          step={0.001}
          onValueChange={(val) => {
            if (Array.isArray(val)) {
              if (typeof val[0] === "number") {
                onProgressChange(val[0]);
              }
            } else if (typeof val === "number") {
              onProgressChange(val);
            }
          }}
          className="cursor-pointer"
        />

        <div className="flex gap-2 pt-1">
          <Button
            onClick={onTogglePlay}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white text-xs h-9"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-1" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1" /> Launch Simulation
              </>
            )}
          </Button>

          <Button
            onClick={onReset}
            variant="outline"
            className="border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900 h-9 px-3"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
