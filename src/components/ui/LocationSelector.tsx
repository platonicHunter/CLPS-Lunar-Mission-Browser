"use client";

import React, { useState } from "react";
import { LocationPoint, TrajectoryType } from "@/types/mission";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Globe } from "lucide-react";

interface LocationSelectorProps {
  earthSites: LocationPoint[];
  lunarSites: LocationPoint[];
  selectedEarth: LocationPoint;
  selectedLunar: LocationPoint;
  selectedTrajectory: TrajectoryType;
  onSelectEarth: (site: LocationPoint) => void;
  onSelectLunar: (site: LocationPoint) => void;
  onSelectTrajectory: (type: TrajectoryType) => void;
  onAddCustomEarthSite: (site: LocationPoint) => void;
  onAddCustomLunarSite: (site: LocationPoint) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  earthSites,
  lunarSites,
  selectedEarth,
  selectedLunar,
  selectedTrajectory,
  onSelectEarth,
  onSelectLunar,
  onSelectTrajectory,
  onAddCustomEarthSite,
  onAddCustomLunarSite,
}) => {
  // Mode toggles
  const [isEarthCustom, setIsEarthCustom] = useState<boolean>(false);
  const [isLunarCustom, setIsLunarCustom] = useState<boolean>(false);

  // Custom Earth Form State
  const [earthName, setEarthName] = useState<string>("");
  const [earthLat, setEarthLat] = useState<string>("");
  const [earthLng, setEarthLng] = useState<string>("");

  // Custom Lunar Form State
  const [lunarName, setLunarName] = useState<string>("");
  const [lunarLat, setLunarLat] = useState<string>("");
  const [lunarLng, setLunarLng] = useState<string>("");

  const handleCreateEarthSite = () => {
    if (!earthName || !earthLat || !earthLng) return;
    const newSite: LocationPoint = {
      id: `custom-earth-${Date.now()}`,
      name: `🚀 ${earthName}`,
      lat: parseFloat(earthLat) || 0,
      lng: parseFloat(earthLng) || 0,
      isCustom: true,
    };
    onAddCustomEarthSite(newSite);
    setIsEarthCustom(false);
    setEarthName("");
    setEarthLat("");
    setEarthLng("");
  };

  const handleCreateLunarSite = () => {
    if (!lunarName || !lunarLat || !lunarLng) return;
    const newSite: LocationPoint = {
      id: `custom-lunar-${Date.now()}`,
      name: `🎯 ${lunarName}`,
      lat: parseFloat(lunarLat) || 0,
      lng: parseFloat(lunarLng) || 0,
      isCustom: true,
    };
    onAddCustomLunarSite(newSite);
    setIsLunarCustom(false);
    setLunarName("");
    setLunarLat("");
    setLunarLng("");
  };

  return (
    <Card className="bg-slate-900/90 border-slate-800 text-slate-100 backdrop-blur">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
          Mission Target Coordinates
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-4">
        {/* ================= EARTH LAUNCH SITE SECTION ================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-400" /> Earth Launch Site
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEarthCustom(!isEarthCustom)}
              className="text-[10px] text-blue-400 h-5 px-1.5 hover:bg-slate-800"
            >
              {isEarthCustom ? "Select Presets" : "+ Custom Earth Coord"}
            </Button>
          </div>

          {isEarthCustom ? (
            <div className="space-y-2 p-2.5 bg-slate-950/80 border border-blue-500/30 rounded-lg">
              <Input
                placeholder="Site Name (e.g. Baikonur)"
                value={earthName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEarthName(e.target.value)
                }
                className="bg-slate-900 border-slate-800 text-xs h-8"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Lat (-90 to 90)"
                  type="number"
                  value={earthLat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEarthLat(e.target.value)
                  }
                  className="bg-slate-900 border-slate-800 text-xs h-8"
                />
                <Input
                  placeholder="Lng (-180 to 180)"
                  type="number"
                  value={earthLng}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEarthLng(e.target.value)
                  }
                  className="bg-slate-900 border-slate-800 text-xs h-8"
                />
              </div>
              <Button
                onClick={handleCreateEarthSite}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs h-7 mt-1"
              >
                Set Earth Launch Location
              </Button>
            </div>
          ) : (
            <Select
              value={selectedEarth.id}
              onValueChange={(val: string | null) => {
                if (!val) return;
                const site = earthSites.find((s) => s.id === val);
                if (site) onSelectEarth(site);
              }}
            >
              <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                {earthSites.map((site) => (
                  <SelectItem key={site.id} value={site.id} className="text-xs">
                    {site.name} ({site.lat}°, {site.lng}°)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* ================= LUNAR LANDING SITE SECTION ================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" /> Lunar Target Site
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLunarCustom(!isLunarCustom)}
              className="text-[10px] text-amber-400 h-5 px-1.5 hover:bg-slate-800"
            >
              {isLunarCustom ? "Select Presets" : "+ Custom Lunar Coord"}
            </Button>
          </div>

          {isLunarCustom ? (
            <div className="space-y-2 p-2.5 bg-slate-950/80 border border-amber-500/30 rounded-lg">
              <Input
                placeholder="Target Name (e.g. Tycho Crater)"
                value={lunarName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLunarName(e.target.value)
                }
                className="bg-slate-900 border-slate-800 text-xs h-8"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Lat (-90 to 90)"
                  type="number"
                  value={lunarLat}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLunarLat(e.target.value)
                  }
                  className="bg-slate-900 border-slate-800 text-xs h-8"
                />
                <Input
                  placeholder="Lng (-180 to 180)"
                  type="number"
                  value={lunarLng}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLunarLng(e.target.value)
                  }
                  className="bg-slate-900 border-slate-800 text-xs h-8"
                />
              </div>
              <Button
                onClick={handleCreateLunarSite}
                className="w-full bg-amber-600 hover:bg-amber-500 text-white text-xs h-7 mt-1"
              >
                Set Lunar Landing Location
              </Button>
            </div>
          ) : (
            <Select
              value={selectedLunar.id}
              onValueChange={(val: string | null) => {
                if (!val) return;
                const site = lunarSites.find((s) => s.id === val);
                if (site) onSelectLunar(site);
              }}
            >
              <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-xs h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
                {lunarSites.map((site) => (
                  <SelectItem key={site.id} value={site.id} className="text-xs">
                    {site.name} ({site.lat}°, {site.lng}°)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* ================= TRAJECTORY MODE SECTION ================= */}
        <div className="space-y-1 pt-1">
          <label className="text-[11px] text-slate-400">Trajectory Mode</label>
          <Select
            value={selectedTrajectory}
            onValueChange={(val: string | null) => {
              if (!val) return;
              onSelectTrajectory(val as TrajectoryType);
            }}
          >
            <SelectTrigger className="w-full bg-slate-950 border-slate-800 text-cyan-400 font-mono text-xs h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-slate-200">
              <SelectItem value="direct" className="text-xs">
                Direct Fast Transfer (3.2 Days)
              </SelectItem>
              <SelectItem value="hohmann" className="text-xs">
                Hohmann Transfer Orbit (4.8 Days)
              </SelectItem>
              <SelectItem value="wsb" className="text-xs">
                Low Energy WSB Transfer (110 Days)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
