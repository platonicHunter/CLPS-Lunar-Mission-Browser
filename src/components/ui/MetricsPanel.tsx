"use client";

import React from "react";
import { TrajectoryProfile } from "@/types/mission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Clock, Navigation, Flame } from "lucide-react";

export const MetricsPanel: React.FC<{
  profile: TrajectoryProfile;
  progress: number;
}> = ({ profile, progress }) => {
  const currentDistance = Math.round(
    profile.metrics.totalDistanceKm * progress,
  );
  const currentVelocity = (
    profile.metrics.maxVelocityKmS *
    (1 - Math.abs(progress - 0.5))
  ).toFixed(2);

  return (
    <Card className="bg-slate-900/90 border-slate-800 text-slate-100 backdrop-blur">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          Live Telemetry Data
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {/* Velocity */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Gauge className="w-3 h-3 text-amber-400" /> Velocity
            </div>
            <div className="text-base font-mono font-bold text-amber-400">
              {currentVelocity}{" "}
              <span className="text-[10px] font-normal text-slate-500">
                km/s
              </span>
            </div>
          </div>

          {/* Distance */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Navigation className="w-3 h-3 text-cyan-400" /> Distance
            </div>
            <div className="text-base font-mono font-bold text-cyan-400">
              {currentDistance.toLocaleString()}{" "}
              <span className="text-[10px] font-normal text-slate-500">km</span>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Clock className="w-3 h-3 text-emerald-400" /> Duration
            </div>
            <div className="text-base font-mono font-bold text-emerald-400">
              {profile.metrics.durationDays}{" "}
              <span className="text-[10px] font-normal text-slate-500">
                Days
              </span>
            </div>
          </div>

          {/* Delta-V */}
          <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5">
              <Flame className="w-3 h-3 text-rose-400" /> Delta-V
            </div>
            <div className="text-base font-mono font-bold text-rose-400">
              {profile.metrics.deltaV}{" "}
              <span className="text-[10px] font-normal text-slate-500">
                m/s
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
