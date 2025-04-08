import { TeamMembers } from "@/components/team/team-members"
import { TeamActivity } from "@/components/team/team-activity"

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">Manage your team and track member activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-4">
          <TeamMembers />
        </div>
        <div className="md:col-span-3">
          <TeamActivity />
        </div>
      </div>
    </div>
  )
}
