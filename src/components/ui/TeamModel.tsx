"use client";

import React, { useState } from "react";
import { TEAM_DATA } from "@/config/teamData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, X, User } from "lucide-react";
import { TeamMember } from "@/types/team";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamModal: React.FC<TeamModalProps> = ({ isOpen, onClose }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-slate-100 space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold tracking-wider text-slate-100 uppercase">
              {TEAM_DATA.teamName} — Members Roster
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Members Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {TEAM_DATA.members.map((member: TeamMember) => {
            const hasError = imageErrors[member.id] || !member.photoUrl;

            return (
              <Card
                key={member.id}
                className="bg-slate-950 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-4 flex flex-col items-center text-center space-y-3">
                  {/* Member Photo with Fallback Avatar */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors flex items-center justify-center bg-slate-900">
                    {!hasError ? (
                      /* Standard img with onError handler */
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        onError={() => handleImageError(member.id)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Fallback Avatar Placeholder when photo is missing or fails to load */
                      <div className="flex flex-col items-center justify-center text-cyan-400">
                        <User className="w-8 h-8 opacity-80" />
                        <span className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase">
                          {member.name.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] text-cyan-400/90 font-mono">
                      {member.role}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-slate-800 text-slate-400 text-[10px] mt-1"
                    >
                      Age: {member.age}
                    </Badge>
                  </div>

                  {/* Profile Link Button */}
                  {member.profileUrl && (
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 pt-1 transition-colors"
                    >
                      View Profile <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
