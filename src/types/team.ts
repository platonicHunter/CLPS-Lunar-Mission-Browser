export interface TeamMember {
  id: string;
  name: string;
  age: number;
  role: string;
  photoUrl: string;
  profileUrl: string;
}

export interface TeamInfo {
  teamName: string;
  projectName: string;
  members: TeamMember[];
}
