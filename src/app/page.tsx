"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  DEFAULT_EARTH_SITES,
  DEFAULT_LUNAR_SITES,
  TRAJECTORY_PROFILES,
} from "@/config/missionData";
import { TEAM_DATA } from "@/config/teamData";
import { LocationPoint, TrajectoryType } from "@/types/mission";
import { LocationSelector } from "@/components/ui/LocationSelector";
import { MetricsPanel } from "@/components/ui/MetricsPanel";
import { PlaybackControls } from "@/components/ui/PlaybackControls";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rocket, Users } from "lucide-react";
import { TeamModal } from "@/components/ui/TeamModel";

const MissionCanvas = dynamic(
  () =>
    import("@/components/3d/MissionCanvas").then((mod) => mod.MissionCanvas),
  { ssr: false },
);

export default function Home() {
  const [earthSites, setEarthSites] =
    useState<LocationPoint[]>(DEFAULT_EARTH_SITES);
  const [lunarSites, setLunarSites] =
    useState<LocationPoint[]>(DEFAULT_LUNAR_SITES);

  const [earthSite, setEarthSite] = useState<LocationPoint>(
    DEFAULT_EARTH_SITES[0],
  );
  const [lunarSite, setLunarSite] = useState<LocationPoint>(
    DEFAULT_LUNAR_SITES[0],
  );
  const [trajectoryType, setTrajectoryType] =
    useState<TrajectoryType>("direct");
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Team Modal state
  const [isTeamOpen, setIsTeamOpen] = useState<boolean>(false);

  const handleAddCustomEarthSite = (newSite: LocationPoint) => {
    setEarthSites((prev) => [newSite, ...prev]);
    setEarthSite(newSite);
  };

  const handleAddCustomLunarSite = (newSite: LocationPoint) => {
    setLunarSites((prev) => [newSite, ...prev]);
    setLunarSite(newSite);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 0.005;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100">
      {/* Team Member Cards Pop-up Modal */}
      <TeamModal isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />

      {/* LEFT: 3D Viewport */}
      <section className="relative flex-1 h-full">
        <header className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl backdrop-blur shadow-2xl">
          <div className="p-2 bg-cyan-950 text-cyan-400 rounded-lg border border-cyan-800">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-bold tracking-wider text-slate-100">
                CLPS LUNAR MISSION BROWSER
              </h1>
              <Badge
                variant="outline"
                className="border-cyan-500/40 text-cyan-400 text-[10px] px-1.5 py-0"
              >
                CUSTOM COORDS
              </Badge>
            </div>

            {/* Team Name & Team Members Link Button */}
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-[10px] text-slate-400 font-mono">
                EARTH-MOON TRAJECTORY CALCULATOR
              </p>
              <span className="text-slate-600 text-xs">•</span>
              <Button
                variant="link"
                onClick={() => setIsTeamOpen(true)}
                className="p-0 h-auto text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 underline underline-offset-2"
              >
                <Users className="w-3 h-3" /> Team: {TEAM_DATA.teamName}
              </Button>
            </div>
          </div>
        </header>

        <MissionCanvas
          earthSite={earthSite}
          lunarSite={lunarSite}
          trajectoryType={trajectoryType}
          progress={progress}
        />
      </section>

      {/* RIGHT: Control Dashboard Panel */}
      <aside className="w-full max-w-xs h-full bg-slate-950 border-l border-slate-800 p-3 flex flex-col justify-between overflow-y-auto z-20 space-y-3">
        <div className="space-y-3">
          <LocationSelector
            earthSites={earthSites}
            lunarSites={lunarSites}
            selectedEarth={earthSite}
            selectedLunar={lunarSite}
            selectedTrajectory={trajectoryType}
            onSelectEarth={setEarthSite}
            onSelectLunar={setLunarSite}
            onSelectTrajectory={setTrajectoryType}
            onAddCustomEarthSite={handleAddCustomEarthSite}
            onAddCustomLunarSite={handleAddCustomLunarSite}
          />

          <MetricsPanel
            profile={TRAJECTORY_PROFILES[trajectoryType]}
            progress={progress}
          />
        </div>

        <PlaybackControls
          progress={progress}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onReset={() => {
            setIsPlaying(false);
            setProgress(0);
          }}
          onProgressChange={(val) => setProgress(val)}
        />
      </aside>
    </main>
  );
}
